import React from "react";
import { CiHome } from "react-icons/ci";

const Top = () => {
  return (
    <div className=" bg-[#fff] border">
      <div className="flex justify-between px-10 py-2 font-nunito ">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <li className="flex gap-2 items-center">
            <CiHome size={17} />
            <p className="text-xs text-gray-400">Home</p>
          </li>
        </div>
        <div>
          <p className="text-xs">Add Task</p>
        </div>
      </div>
    </div>
  );
};

export default Top;
