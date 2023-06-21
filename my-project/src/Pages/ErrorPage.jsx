import React from "react";

const ErrorPage = ({ message, imagePath }) => {
  return (
    <div>
      <h1>Error: {message}</h1>
      <img src={imagePath} alt="Error" />
    </div>
  );
};

export default ErrorPage;
