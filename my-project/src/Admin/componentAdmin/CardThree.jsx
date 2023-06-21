import React from "react";

const CardThree = () => {
  return (
    <div className="flex flex-col gap-6  shadow-default dark:border-strokedark  dark:bg-boxdar">
      <div className=" bg-gradient-to-br from-[#1B71DE] to-[#4894f9]  flex rounded-md px-3.5 py-4">
        <div>
          <h2 className="text-white font-bold">$230k</h2>
          <p className="text-[#eae7e7]">Total Income</p>
        </div>
      </div>

      <div className="bg-[#FFFFFF] dark:border-strokedark dark:bg-boxdark flex px-3.5 py-4 rounded-md">
        <div>
          <h2 className="text-white font-bold">$230k</h2>
          <p className="text-[#eae7e7]">Total Income</p>
        </div>
      </div>
    </div>
  );
};

export default CardThree;
