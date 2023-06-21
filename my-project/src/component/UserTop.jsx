import React from "react";
import { AiFillHome } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import { WiDirectionRight } from "react-icons/wi";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const UserTop = ({ pageName }) => {
  return (
    <div className=" bg-[#fff] w-full rounded-md">
      <div className="flex  px-10 py-2 font-nunito p-3  flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-xsm font-semibold text-black dark:text-white">
          {pageName}
        </h2>
        <nav>
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="flex items-center gap-3 font-bold">
                <AiFillHome size={13} color="#34a49f" />{" "}
                <MdKeyboardArrowRight color="#ccc" /> Dashboard{" "}
                <MdKeyboardArrowRight color="#ccc" />{" "}
              </Link>
            </li>
            <li className="text-[#34a49f]">{pageName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default UserTop;
