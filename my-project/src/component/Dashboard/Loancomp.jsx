import React from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { RxLightningBolt } from "react-icons/rx";
import { Link } from "react-router-dom";
const Loancomp = () => {
  return (
    <div className="font-nunita bg-[#116f6a] rounded-md p-3 h-96 col-span-12 sm:px-7.5 xl:col-span-8">
      <div>
        <h1 className="text-xl font-bold text-center py-2 text-white">
          Flexi Cash
        </h1>
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 py-6 px-4 text-center">
          <p>Get up to</p>
          <h1 className="font-bold text-2xl">$10,000 </h1>
          <span>Loan</span>
          <p className="text-gray-300 text-xs mt-3">
            Min Interest rate <span className="text-[#39ae41]"> 0.30%</span> |
            Up to 3 months
          </p>

          <Link to="/loan">
            <button className="px-20 py-2 outline-none text-white bg-[#277768] hover:bg-[#156c66] mt-3 rounded-lg">
              Apply
            </button>
          </Link>
          <p className="text-xs text-[#b2afaf] mt-2">
            I have read & agreed{" "}
            <span className="text-[#39ae41]">Terms and Condition</span>
          </p>
        </div>
        <div className="text-white">
          <h1 className="font-medium text-white text-center mt-2 text-sm">
            Product Benefits
          </h1>
          <div className="flex justify-between mt-4 px-7">
            <li className="flex flex-col items-center">
              <RxLightningBolt color="#39ae41" />
              <p className="text-xs">fast & easy</p>
            </li>

            <li className="flex flex-col items-center">
              <MdOutlineVerifiedUser color="#39ae41" />
              <p className="text-xs">no collateral</p>
            </li>

            <li className="flex flex-col items-center">
              <RiExchangeDollarLine color="#39ae41" />
              <p className="text-xs">borrow safely</p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loancomp;
