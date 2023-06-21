import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import Logo from "../assets/bat.svg";
//import SidebarLinkGroup from "./SidebarLinkGroup";
import Finflow from "../assets/finfloww.webp";
import { RxLightningBolt } from "react-icons/rx";
import { TfiDashboard, TfiPlus } from "react-icons/tfi";
import { TbRadioactive } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  AiFillCreditCard,
  AiOutlineTransaction,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { CiSliderHorizontal } from "react-icons/ci";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { MdSavings } from "react-icons/md";
import {
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiLuggageDepositFill,
  RiProfileFill,
} from "react-icons/ri";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // If user data exists in local storage, update Redux state
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
    localStorage.removeItem("user");
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={` fixed left-0 top-0 z-9999 flex h-screen w-62.5 flex-col overflow-y-hidden  bg-[#21635f] text-white duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen
          ? "w-60 translate-x-0"
          : " w-20 -translate-x-full overflow-y-auto"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="text-black dark:text-white">
          <img src={Finflow} alt="Logo" className="w-28 h-6 " />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div className="bg-[#DBFF8E] rounded-md mx-auto mb-4 flex items-center justify-center text-center p-[6px]">
            <>
              <RxLightningBolt size={20} color="#D4B2FF" />
              <h1 className="text-center p-2 text-[#000000] text-[12px] font-[400]">
                Welcome {userData.userName}
              </h1>
            </>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <NavLink
                  to="/dash"
                  className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2 font-medium text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out   ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <TfiDashboard />
                  Dashboard
                </NavLink>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/deposit"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiLuggageDepositFill />
                  Deposit
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/savings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3]  ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdSavings />
                  Savings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/card"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3]  ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiFillCreditCard />
                  Card
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}
              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/transact"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                    pathname.includes("tables") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <AiOutlineTransaction color="#fff" />
                  Transactions
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/loan"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BsFillCalendarCheckFill />
                  Loan
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <NavLink
                  to="/withdraw"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  duration-300 ease-in-out  text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] ${
                    pathname.includes("chart") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BiMoneyWithdraw />
                  Withdrawal
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white  hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                    pathname.includes("chart") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <CgProfile />
                  Profile
                </NavLink>
              </li>

              <li>
                <div
                  className={`group relative  rounded-sm  py-2 font-medium text-white hover:text-[#34a49f] hover:bg-[#E8E1F3] duration-300 ease-in-out dark:hover:bg-meta-4 ${
                    pathname.includes("chart") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  {userData.userName ? (
                    <p
                      className="cursor-pointer text-white px-4 flex items-center gap-2.5"
                      onClick={handleLogout}
                    >
                      <RiLogoutCircleLine />
                      Logout
                    </p>
                  ) : (
                    <Link
                      to={"/login"}
                      className="whitespace-nowrap cursor-pointer px-4 flex items-center gap-2.5"
                    >
                      <RiLoginCircleLine />
                      Login
                    </Link>
                  )}
                </div>
              </li>

              {/* <!-- Menu Item Chart --> */}

              {/* <!-- Menu Item Ui Elements --> */}

              {/* <!-- Menu Item Auth Pages --> */}

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
