import React from "react";
import Sidebar from "./AdminSidebar";

const AccountBalance = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="px-10 py-20">
          <form action="" className="bg-white">
            <input type="text" />
            <div className="flex gap-4">
              <h1>Penalty :</h1>
              <input type="text" placeholder="input Amount" />
            </div>
            <div className="flex gap-4">
              <h1>Penalty :</h1>
              <input type="text" placeholder="input Amount" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountBalance;
