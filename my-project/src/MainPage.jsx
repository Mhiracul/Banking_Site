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
        <p onClick={handleLogout}>Please log in</p>
      )}
    </div>
  );
}

export default Main;
