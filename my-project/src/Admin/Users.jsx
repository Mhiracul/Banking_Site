import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { setUsers } from "../redux/userSlice";
import Sidebar from "./AdminSidebar";
import axios from "axios";
import Top from "./Top";
function Users() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/admin/users", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (res.status === 401) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        dispatch(setUsers(data.data));
      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Handle the error state or display an error message
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex bg-[#ebeaea] h-full shadow-lg rounded-md">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ">
        <Top />
        <h1 className="font-bold text-center  text-2xl bg-[#fff]">
          Users Page
        </h1>
        {myUsers.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="py-10 px-40  flex flex-col justify-center items-center  rounded-lg p-4 my-4">
            <table className=" shadow-lg ">
              <thead>
                <tr style={{}} className="shadow-md">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Balance</th>
                  <th className="p-2">Role</th>
                  <th className="p-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myUsers.map((data) => (
                  <UserCard
                    key={data._id}
                    id={data._id}
                    firstName={data.firstName}
                    lastName={data.lastName}
                    userName={data.userName}
                    email={data.email}
                    password={data.password}
                    accountBalance={data.accountBalance}
                    role={data.role}
                    onDelete={() => console.log("delete user")}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
