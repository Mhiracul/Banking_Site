import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Admins from "./Admin/Admins";
import { apiBaseUrl } from "../config";
function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/login`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn) {
            setLoggedIn(true);
            setRole(data.role); // Update to access the 'role' property directly
          } else {
            navigate("/login"); // Navigate to login page if not logged in
          }
        } else {
          // Handle error
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        // Handle error
        console.log("Error:", error);
      }
    };

    fetchLoginStatus();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setRole("");
    navigate("/login");
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          {role === "admin" && <Admins />}
          {role === "user" && <Dashboard />}
        </div>
      ) : (
        <div className="h-screen fixed bg-[#34a49f]  w-full">
          <div className="flex items-center justify-center w-full px-8">
            <div className="bg-[#43ded7] flex flex-col justify-center items-center w-full border border-white rounded-[50px] h-screen ">
              <h1 className="text-[#116f6a] text-center font-bold text-xl mb-3">
                Your login was <br /> successful
              </h1>
              <p className="font-medium text-center text-sm text-[#1c5b57] mb-2">
                You have succesffully signed with our <br /> Finflow bank
                system.
              </p>

              <p className="font-light font-nunito text-[#1c5b57] text-xs">
                {" "}
                you are being redirected <span className="ellipsis">...</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
