import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { apiBaseUrl } from "../../config";
//import UserOne from "../../assets/bay.svg";
import axios from "axios";
const DropdownUsers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // If user data exists in local storage, update Redux state
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  }, []);

  useEffect(() => {
    // Fetch user image from backend
    const fetchUserImage = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/image`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        setUserImage(response.data.image);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserImage();
  }, []);

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
    localStorage.removeItem("user"); // Remove user data from local storage on logout
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-white ">
            {userData.userName}
          </span>
          <span className="block text-xs text-[#ccc] capitalize">
            {userData.role}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full border-2 border-white">
          {userImage ? (
            <img src={userImage} alt="User" className="rounded-full" />
          ) : (
            <div className="rounded-full bg-gray-300"></div>
          )}
        </span>

        <svg
          className={`hidden fill-current sm:block text-[#ccc] ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col text-xs rounded-sm border border-stroke bg-white shadow-default   ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <Link to="/dash" className="px-4 py-2.5 ">
          My Dashboard
        </Link>
        <Link to="/settings" className="px-4 py-2.5">
          Settings
        </Link>
        {userData.userName ? (
          <Link onClick={handleLogout} to="" className="px-4 py-2.5">
            Logout
          </Link>
        ) : (
          <Link to={"/login"} className="px-4 py-2.5">
            Login
          </Link>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUsers;
