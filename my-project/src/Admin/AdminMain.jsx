import React from "react";
import Wallet from "./Wallet";
import Profile from "./Profile";
import Top from "./Top";
import Withdrawals from "./Withdrawals";
import MainUsers from "./MainUsers";

const AdminMain = () => {
  return (
    <div className="w-full flex-1 ">
      <div className=" overflow-hidden">
        <Top />
        <div className="flex flex-col gap-7 px-10">
          <div className="mt-8 lg:flex md:grid md:grid-cols-1 lg:gap-5 md:gap-10 grid grid-cols-1 gap-10">
            <Profile />
            <Withdrawals />
          </div>
          <div className="flex">
            <MainUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
