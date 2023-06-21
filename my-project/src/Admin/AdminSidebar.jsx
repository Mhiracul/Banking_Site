import { useState, useEffect } from "react";
import { RxLightningBolt } from "react-icons/rx";
import { TfiDashboard, TfiPlus } from "react-icons/tfi";
import { TbRadioactive } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiSliderHorizontal } from "react-icons/ci";
import Icon from "../component/Icon";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { BiSubdirectoryLeft } from "react-icons/bi";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import Wallet from "./Wallet";
import Withdrawals from "./Withdrawals";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
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
    localStorage.removeItem("user"); // Remove user data from local storage on logout
  };

  const Menus = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <TfiDashboard size={20} color="#000" />,
    },
    {
      title: "Users",
      path: "/users",
      icon: <CiSliderHorizontal size={20} color="#000" />,
    },
    {
      title: "Savings",
      path: "/dash",
      icon: <RxLightningBolt size={20} color="#000" />,
    },
    {
      title: "Transactions ",
      path: "/dash",
      icon: <FiUsers size={20} color="#000" />,
    },
    {
      title: "Card Payments",
      path: "/sss",
      icon: <AiOutlineUserAdd size={20} color="#000" />,
    },
    {
      title: "Loan",
      path: "/bat",
      icon: <TbRadioactive size={20} color="#000" />,
    },
    {
      title: "Crypto ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
    },
    {
      title: "Penalty ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
    },
    {
      title: "Account Balance",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
      gap: true,
    },
    {
      title: "Loan Form ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
    },
    {
      title: "Crypto ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
      gap: true,
    },
    {
      title: "Crypto ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
      gap: true,
    },
    {
      title: "Loan Form ",
      path: "/wall",
      icon: <RxLightningBolt size={20} color="#000" />,
    },

    {
      title: userData.userName ? "Logout" : "Login",
      path: userData.userName ? "/dash" : "/login",
      icon: <FiUsers size={20} color="#000" />,
      onClick: handleLogout, // Add onClick handler for Logout button
    },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-[#FFFFFF] h-full shadow-md overflow-auto flex flex-col justify-between px-2 py-10 relative duration-300 `}
      >
        <BiSubdirectoryLeft
          size={20}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-[#45269C] bg-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="bg-[#DBFF8E] rounded-md mx-auto mb-4 flex items-center justify-center text-center p-[6px] ">
          {open && (
            <>
              <Icon icon={RxLightningBolt} size={20} color="#000" />
              <h1 className="text-center p-2 text-[#000000] text-[12px] font-[400]">
                Welcome {userData.userName}
              </h1>
            </>
          )}
          {!open && <RxLightningBolt size={20} color="#D4B2FF" />}
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-[#000000] text-sm items-center gap-x-4 ml-4
            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
            >
              <Link to={Menu.path} className="flex gap-4">
                {Menu.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
              {Menu.onClick && userData.userName && (
                <span
                  onClick={Menu.onClick}
                  className={`cursor-pointer text-xs text-[#000000] hover:text-[#D4B2FF] ${
                    !open && "hidden"
                  }`}
                >
                  (Logout)
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto mx-auto"></div>
      </div>
    </div>
  );
};
export default Sidebar;
