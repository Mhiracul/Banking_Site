import React from "react";
import LoginForm from "./LoginForm";

const ParentComponent = () => {
  const apiBaseUrl = "https://banking-6no4.onrender.com"; // Your API base URL

  return (
    <div>
      {/* Other components or content */}
      <LoginForm apiBaseUrl={apiBaseUrl} />
    </div>
  );
};

export default ParentComponent;
