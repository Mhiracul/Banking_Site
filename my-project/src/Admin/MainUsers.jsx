import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { setUsers } from "../redux/userSlice";
import axios from "axios";
import EditPage from "./pages/EditPage";

import DefaultLayout from "../Admin/layout/DefaultLayout";
import Breadcrumb from "../Admin/componentAdmin/Breadcrumb";

function MainUsers() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/admin/users", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (res.status === 200) {
          dispatch(setUsers(res.data.data));
        } else {
          // Handle other response statuses
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Handle the error state or display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleEditUser = async (editedUser) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/admin/users/${editedUser._id}`,
        editedUser,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data); // Handle the response as needed

      if (res.status === 200) {
        // User edited successfully
        // Update the user list by dispatching a new action
        const updatedUsers = myUsers.map((user) =>
          user._id === editedUser._id ? editedUser : user
        );
        dispatch(setUsers(updatedUsers));
        setEditingUserId(null); // Reset the editing state
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      console.error("Failed to edit user:", err);
      // Handle the error state or display an error message
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex justify-center w-full rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="py-10 h-[650px] rounded-lg overflow-x-auto overflow-y-auto">
              <table className="bg-[#fff] shadow-lg w-full rounded-lg">
                <thead>
                  <tr className="shadow-md text-xs">
                    <th className="p-2">Username</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Password</th>
                    <th className="p-2">Balance</th>
                    <th className="p-8">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myUsers.map((data) => (
                    <React.Fragment key={data._id}>
                      {editingUserId === data._id ? (
                        <EditPage
                          user={data}
                          onCancel={() => setEditingUserId(null)}
                          onEdit={handleEditUser}
                          userName={data.userName}
                          email={data.email}
                          password={data.password}
                          accountBalance={data.accountBalance}
                          key={data._id}
                          onDelete={() => deleteUser(data._id)}
                          onSuspend={() => suspendUser(data._id)}
                          onDisable={() => disableUser(data._id)}
                          onActivate={() => activateUser(data._id)}
                        />
                      ) : (
                        <tr className="shadow-md">
                          <td className="p-6  text-xs">{data.userName}</td>
                          <td className="p-6 text-xs">{data.email}</td>
                          <td className="p-6 text-xs">{data.password}</td>
                          <td className="p-6 text-xs">{data.accountBalance}</td>
                          <td className="p-6 text-xs">
                            {" "}
                            <button
                              className="action-button edit bg-[#5321a8] text-white px-4 py-2 rounded-md"
                              onClick={() => setEditingUserId(data._id)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainUsers;
