import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";

//import UserOne from "../../assets/bay.svg";

const DropdownUsers = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLfn6eqrsbTZ3N2/xMbN0dO0ubzW2drGysy7wMLc3+DS1dfKztDh4+Tq7O3d3uCKAAAC+0lEQVR4nO2a2XLkIAxFjQCzeOH//3bwkkwn7cYSLdFTNdynrrxwcpEESB6Grq6urq6urq6urq6u/01w6FPLp8HMi80K4zx9AANWH5XSX1IumKEpBazB5XUfpbWbG0JA+LX+SeF8agRg1BXADhHXJkaEVwAbg/LyDGALBBvELM0ArkzQgCHeEWSGUZLhbhdOBsF4gBlDkBlWMYQJR6CUk7IBIpJALByw27BLaCscnkAHCRtgJJggYwMQTMg2LAI2GApBFv+hCaXT6coGw46QiCYIBCS6LH3JcRMQ82GzgR2BGAoSwYAuzt8I7EWaVBV2BPZ4pBIoZbkRqKGgVOwIEghkAv5YIBPwZwS9LrAf15aMwP2kgYVcoNnvTZ6cEtwE9Ky07ASJeEhIPCWIFwb260LWSiNgr40D9lX9jeD5CfLtkeKCzMOWYoOMCTka0Aia/Yg6ha+Qcj2O+17XSSDYbcIlpraCTVjAvG11lAPYGBCnlZNrdh0M5oZBs78lLxiKMSm8CyfDWujA6qUBQVYaL8cRWx9+ajUUAQgXIwnt5kYTkQNiXZx68CL/jL7tcCpDDNNoj8VzHlq/fmRUCCkN62SmFdInZoR5zby68btMxhgacmxr+8U6d8TAPqXc9sLFMJtMIsyR/3kfotPXSbn9OdpZkAKSWeKL1X+AuGBEKGBafg9oCxSKfX4Mg48v56OvvBgZx6aQRuR16SeFCkz7AcOrIwFhheVwAuYaBx6ceDcmYELMRssQ7r1WR1pq9+ARItaHBEzv7MEjRO34FmaW9XeGuu4bvbtUYqh569MHEGUGR8+MdzPhSY54rwR2AuoTJ5E6KmgGigeckVjFQBrRU4TvfJCaSjQGZLFOTDXxkgG3DUKBcAhVovBNrRphjgvmqvgkRFbQ+rx03UektAmYvix5MEzWXWNWqir91V19orXbKxnKjZAkT3D3YQP5c5EahOIAk/65SI2KgzP5lNxUrk4Cl6Vnlc8q8mS6SsUbHDRR0YWurq6urn9FfwCAMR/QMmgl9QAAAABJRU5ErkJggg=="
            alt="User"
            className="rounded-full"
          />
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
        <Link to="/profile" className="px-4 py-2.5 ">
          My Profile
        </Link>
        <Link to="/set" className="px-4 py-2.5">
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
