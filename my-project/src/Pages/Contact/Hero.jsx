import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-[#FFFFFF] to-[#E7FFB8] py-20">
      <div className=" flex justify-center ">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:gap-40 gap-10 px-10 py-20 w-full max-w-screen-lg">
          <div className="w-[390px]">
            <h1 className="">Contact</h1>
            <h1 className="text-black md:text-5xl text-2xl leading-[60px] md:mb-6 mb-2 font-bold capitalize mt-2">
              Dont hesitate to reach out to us
            </h1>
            <p className="text-xs text-black mt-2">
              If you have any questions or inquiries, feel free to contact us.{" "}
              <br />
              We're here to help!
            </p>

            <div className="mx-auto mt-6">
              <ul className="flex flex-col gap-3 text-left ">
                <li className="flex text-black font-medium gap-4 md:text-xl text-sm  items-center  hover:text-[#4a5f1d] ">
                  <div className="bg-[#0C1C19] rounded-full p-1">
                    <AiOutlineMail size={15} color="#DBFF8E" />
                  </div>
                  hello@finflow.com
                </li>
                <li className="flex text-black font-medium gap-4 md:text-xl text-sm items-center hover:text-[#4a5f1d]">
                  <div className="bg-[#0C1C19] rounded-full p-1">
                    <RiPhoneFill size={15} color="#DBFF8E" />
                  </div>
                  (239) 555-0108
                </li>
                <li className="flex text-black font-medium gap-4 md:text-xl text-sm items-center hover:text-[#4a5f1d]">
                  <div className="bg-[#0C1C19] rounded-full p-1">
                    <MdLocationOn size={15} color="#DBFF8E" />
                  </div>
                  4140 Parker Rd. Allentown, New Mexico 31134
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm md:w-[390px] w-[360px]">
            <form action="" className="px-6 py-10">
              <div className="form__group flex gap-3 mb-3 ">
                <div className="w-1/2">
                  <label className="font-medium text-xs">Your Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full py-3 px-4 rounded-lg bg-[#EEF0EF]  text-gray-800 text-xs outline-none"
                    name="name"
                  />
                </div>

                <div className="w-1/2 ">
                  <label className="font-medium text-xs">Your Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full py-3 px-4 rounded-lg bg-[#EEF0EF]   text-xs outline-none"
                    name="email"
                  />
                </div>
              </div>

              <label className="font-medium text-xs">Message</label>
              <textarea
                className="w-full rounded-lg text-xs outline-none  bg-[#EEF0EF] py-3 px-4   text-black "
                name="message"
                type="text"
                rows={6}
                placeholder="Your Message"
              ></textarea>
              <button className="text-[#DBFF8E] bg-[#0C1C19] rounded-md w-full p-2 font-medium mt-2">
                Contact Us
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
