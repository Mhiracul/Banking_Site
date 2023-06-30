import React from "react";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = (props) => {
  const location = useLocation();
  const { state } = location || {};
  const { message, imagePath, image } = state || {};

  if (!message || !imagePath) {
    return <div>Something went wrong. Please try again.</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen fixed  w-full bg-gradient-to-r from-[#134341] via-[#3b6563] to-[#134341] ">
      <h1 className="text-4xl font-bold text-center text-white mb-3">
        Opps! You have some <br /> problems
      </h1>
      {imagePath && (
        <div className="relative w-64 h-64">
          <img
            src={imagePath}
            alt="Error"
            className="w-full h-full object-contain"
          />
          {image && (
            <img
              src={image}
              alt="Eye"
              className="absolute top-8 left-24 w-6 h-6"
            />
          )}
        </div>
      )}
      <h1 className="text-3xl font-semibold text-[#DBFF8E] mt-4">{message}</h1>
      <div className="flex gap-6 mt-3">
        <Link to="/">
          <button className=" bg-[#DBFF8E] hover:bg-[#134341] text-[#134341] hover:text-[#DBFF8E] hover:shadow-md px-4 py-2 font-medium rounded-sm ">
            Back to Home
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-[#134341] hover:bg-[#DBFF8E] text-[#DBFF8E] hover:text-[#134341] shadow-md px-4 py-2 font-medium rounded-sm ">
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
