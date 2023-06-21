import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`px-10 py-6 font-inter  ${
          isScrolled
            ? "fixed top-0 left-0 w-full bg-white  text-black"
            : "bg-gradient bg-gradient-to-br from-[#134341] to-[#277768] text-white "
        }`}
      >
        <div className=" justify-between hidden lg:flex gap-8">
          <h1 className=" text-2xl font-bold hidden md:block container">
            FinFlow
          </h1>
          <div className=" gap-10 text-sm items-center justify-center hidden md:flex ">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/register">Register</Link>

            <Link
              to={"/login"}
              className="whitespace-nowrap cursor-pointer px-2"
            >
              Login
            </Link>
          </div>
          <Link to={"/login"}>
            <button
              className={` font-[700] font-inter text-sm rounded-md lg:w-40  md:w-60 w-52 px-2   hover:bg-[#E1FFA0] hover:text-[#0C231F] flex-end ${
                isScrolled
                  ? "bg-[#206554] text-[#CDF88C]"
                  : "bg-white text-black"
              }`}
            >
              Get Started
            </button>
          </Link>
        </div>

        <div
          onClick={handleClick}
          className="z-10 flex justify-between w-full lg:hidden"
        >
          <h1 className=" text-2xl font-bold">FinFlow</h1>
          <div onClick={handleClick} className="lg:hidden z-10  ">
            {!nav ? <FaBars /> : <FaTimes />}
          </div>
        </div>

        {/* Hamburger */}

        {/* Mobile menu */}
        <ul
          className={
            !nav
              ? "hidden"
              : "relative top-0 left-0 w-full h-96 bg-[#fff] flex flex-col justify-center items-start"
          }
        >
          <Link
            to="/"
            className="px-4 py-2 lg:py-0 text-[#03032B] font-medium hover:text-[#5100EE] cursor-pointer block lg:inline-block "
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 lg:py-0 text-[#03032B] font-medium hover:text-[#5100EE] cursor-pointer block lg:inline-block "
          >
            About
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 lg:py-0 text-[#03032B] font-medium hover:text-[#5100EE] cursor-pointer block lg:inline-block "
          >
            Contact
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 lg:py-0 text-[#03032B] font-medium hover:text-[#5100EE] cursor-pointer block lg:inline-block "
          >
            Register
          </Link>

          <Link
            to={"/login"}
            className="px-4 py-2 lg:py-0 text-[#03032B] font-medium hover:text-[#5100EE] cursor-pointer block lg:inline-block "
          >
            Login
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
