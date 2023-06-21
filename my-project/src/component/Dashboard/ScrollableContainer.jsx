import React from "react";
import VirtualCard from "./VirtualCard";
import { Link } from "react-router-dom";
const ScrollableContainer = () => {
  return (
    <div className="h-96 bg-white col-span-12 xl:col-span-4 rounded-md shadow-md ">
      {/* Content */}
      <div className="px-2 py-2  rounded-md">
        <VirtualCard />

        <div className="flex items-center justify-center mt-2">
          <Link
            to="card"
            className="bg-[#0f4642] hover:bg-[#156c66]   text-sm p-2 rounded-md text-white"
          >
            Get Card
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center  mt-2">
          <div>
            <h5 className="font-medium text-center">
              Why You Should Get Our Virtual Card
            </h5>
            <p>
              <span className="text-xs text-center px-2 text-bodydark">
                Virtual cards can be linked to various payment platforms, making
                it easier to manage your online purchases and track your
                spending.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableContainer;
