import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditPage from "./EditPage";
import { setUsers } from "../../redux/userSlice";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
function MainPage() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [penalties, setPenalties] = useState({});
  const [addition, setAddition] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/admin/users`, {
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

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${apiBaseUrl}/admin/users/${userId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (res.status === 200) {
        // User deleted successfully
        toast.success("User deleted successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to delete user:", err);
      // Handle the error state or display an error message
    }
  };

  const suspendUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/suspend`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User suspended successfully
        toast.success("User suspended successfully");

        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to suspend user:", err);
      // Handle the error state or display an error message
    }
  };

  const disableUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/disable`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User disabled successfully
        toast.success(" User disabled successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to disable user:", err);
      // Handle the error state or display an error message
    }
  };

  const activateUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/activate`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User activated successfully
        toast.success("User activated successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to activate user:", err);
      // Handle the error state or display an error message
    }
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleEditUser = async (editedUser) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${editedUser._id}`,
        editedUser,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

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
  const handlePenaltyChange = (userId, amount) => {
    setPenalties((prevPenalties) => ({
      ...prevPenalties,
      [userId]: amount,
    }));
  };

  const handleApplyPenalty = async (userId) => {
    const amount = penalties[userId];

    try {
      const res = await axios.post(
        `${apiBaseUrl}/admin/users/${userId}/penalty`,
        { amount },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // Penalty applied successfully
        toast.success("Penalty applied successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to apply penalty:", err);
      // Handle the error state or display an error message
    }
  };

  const handleAdditionChange = (userId, amount) => {
    setAddition((prevAddition) => ({
      ...prevAddition,
      [userId]: amount,
    }));
  };

  const handleApplyAddition = async (userId) => {
    const amount = addition[userId];

    try {
      const res = await axios.post(
        `${apiBaseUrl}/admin/users/${userId}/balance/add`,
        { amount },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // Penalty applied successfully
        toast.success("Addition applied successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to apply addition:", err);
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
            <div className=" h-[650px] rounded-lg overflow-x-auto overflow-y-auto">
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
                      status={data.status}
                      // Handle user edit

                      key={data._id}
                      onDelete={() => deleteUser(data._id)}
                      onSuspend={() => suspendUser(data._id)}
                      onDisable={() => disableUser(data._id)}
                      onActivate={() => activateUser(data._id)}
                    />
                  ) : (
                    <div className="user-card p py-1">
                      {/* Render user details */}
                      <div className="bg-stroke rounded-md flex shadow-md w-full">
                        <div className="w-full">
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black f">
                            <strong>Username:</strong> {data.userName}
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <strong>Email:</strong> {data.email}
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <strong>Password:</strong> {data.password}
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <strong>Account Balance:</strong>{" "}
                            {data.accountBalance}
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <strong>status:</strong> {data.status}
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <input
                              type="number"
                              className="rounded-md border border-stroke py-1 px-2 text-black "
                              placeholder="Penalty amount"
                              value={penalties[data._id] || ""}
                              onChange={(e) =>
                                handlePenaltyChange(data._id, e.target.value)
                              }
                            />
                            <button
                              className="action-button edit bg-[#5321a8] text-white px-4 py-2 text-sm ml-2 rounded-md"
                              onClick={() => handleApplyPenalty(data._id)}
                            >
                              Apply Penalty
                            </button>
                          </div>
                          <div className="w-full mb-2 rounded border border-stroke  py-1 px-4.5 text-black ">
                            <input
                              type="number"
                              className="rounded-md border border-stroke py-1 px-2 text-black "
                              placeholder="Addition amount"
                              value={addition[data._id] || ""}
                              onChange={(e) =>
                                handleAdditionChange(data._id, e.target.value)
                              }
                            />
                            <button
                              className="action-button edit bg-[#5321a8] text-white px-4 py-2 text-sm ml-2 rounded-md"
                              onClick={() => handleApplyAddition(data._id)}
                            >
                              Apply Addition
                            </button>
                          </div>
                        </div>
                        {/* ... Render other user details */}
                        {/* ... */}
                        <div className="h-full  w-20 my-auto px-2">
                          <button
                            className="action-button edit bg-[#5321a8] text-white px-4 py-2 rounded-md"
                            onClick={() => setEditingUserId(data._id)}
                          >
                            Edit
                          </button>
                        </div>

                        {/* Render other action buttons */}
                        {/* ... */}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage;
