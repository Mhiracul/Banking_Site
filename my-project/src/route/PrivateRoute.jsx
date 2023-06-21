import React from "react";
import { Route, useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  // Check if the user's role is included in the allowed roles
  const isAuthorized = roles.includes(userRole);

  if (isAuthorized) {
    if (userRole === "admin") {
      // Navigate to admin page if the user is an admin
      navigate("/admin");
    } else if (userRole === "user") {
      // Navigate to user page if the user is a user
      navigate("/dash");
    }
  } else {
    // Navigate to login if not authorized
    navigate("/login");
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
