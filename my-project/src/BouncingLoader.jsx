import React from "react";

const BouncingLoader = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-12 h-12 bg-[#5321a8] rounded-md shadow-md shadow-black animate-bounce relative animate-spin">
        <div className="h-full w-full bg-[#5321a8] rounded-md absolute bottom-0 left-0 transform skew-y-6 opacity-30 animate-spin"></div>
      </div>
    </div>
  );
};

export default BouncingLoader;
