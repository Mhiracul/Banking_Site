import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiPhoneFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import Finflow from "../assets/finfloww.webp";
import WebsiteName from "../WebsiteName";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentURL = window.location.hostname;
  const domainExtension = currentURL.split(".")[1];

  const urlName = currentURL.split(".")[0];
  return (
    <footer className="bg-gradient-to-r from-[#134341] via-[#3b6563] to-[#134341]  rounded-t-[40px] py-10">
      <div className="" data-aos="fade-up" data-aos-duration="2000">
        <div className="flex justify-center px-10">
          <div className="flex md:flex-row md:justify-between flex-col gap-8 w-full  max-w-[1224px]">
            <div className="flex flex-col text-left font-inter">
              <h1 className="text-white font-medium text-4xl font-inter">
                Contact information
              </h1>
              <p className="text-gray mt-4 w-[70%] text-sm font-medium">
                For any inquiries or assistance, you can reach out to us using
                the contact details below.
              </p>
            </div>
            <div className=" ">
              <ul className="flex flex-col gap-3 text-left ">
                <li className="flex text-white gap-4  items-center  hover:text-[#DBFF8E]">
                  <AiOutlineMail size={18} color="#DBFF8E" />
                  hello@finflow.com
                </li>
                <li className="flex text-white gap-4  items-center hover:text-[#DBFF8E]">
                  <RiPhoneFill size={18} color="#DBFF8E" />
                  (239) 555-0108
                </li>
                <li className="flex text-white gap-4 items-center hover:text-[#DBFF8E]">
                  <MdLocationOn size={18} color="#DBFF8E" />
                  4140 Parker Rd. Allentown, New Mexico 31134
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto border-t border-body  mt-16 px-10">
          <div className="flex md:flex-row md:justify-between flex-col gap-20 mx-auto   mt-10 max-w-[1224px] text-white ">
            <div>
              <h3 className="md:text-sm text-sm  text-[#DBFF8E] capitalize font-bold">
                Company
              </h3>
              <ul className="mt-4 md:text-sm text-xs">
                <Link to="/about">
                  <li className="mb-2 hover:text-[#DBFF8E]">About us</li>
                </Link>
                <li className="mb-2 hover:text-[#DBFF8E]">Careers</li>
                <li className="mb-2 hover:text-[#DBFF8E]">Press</li>
                <li className="mb-2 hover:text-[#DBFF8E]">News</li>
                <li className="mb-2 hover:text-[#DBFF8E]">Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="md:text-sm text-sm  text-[#DBFF8E] capitalize font-bold">
                Social
              </h3>
              <ul className="mt-4 md:text-sm text-xs">
                <li className="mb-2 hover:text-[#DBFF8E]">Telegram</li>
                <li className="mb-2 hover:text-[#DBFF8E]">Whatsapp</li>
              </ul>
            </div>
            <div>
              <h3 className="md:text-sm text-sm  text-[#DBFF8E] capitalize font-bold">
                Terms
              </h3>
              <ul className="mt-4 md:text-sm text-xs">
                <Link to="/terms">
                  <li className="mb-2 hover:text-[#DBFF8E]">Terms</li>
                </Link>
                <Link to="/privacy">
                  <li className="mb-2 hover:text-[#DBFF8E]">Privacy</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-gray-500 ">
            <div className="flex md:flex-row justify-between flex-col items-center mt-3">
              <img src={Finflow} alt="" className="w-48 h-10 " />
              <p className="md:text-[17px] text-[12px] text-[#DBFF8E] mt-3">
                Copyright &copy; {new Date().getFullYear()} {urlName}.
                {domainExtension} All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
