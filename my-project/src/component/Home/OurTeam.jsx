import React from "react";
import { Glasses, Smith, Tylor } from "../../assets/cards";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
const Team = () => {
  return (
    <div className="bg-white w-full  py-10 border border-gray-400">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center">
          <div className="h-7 w-1 bg-gradient-to-r from-[#DBFF8E] via-[#DBFF8E] to-[#FFD7A6] "></div>
          <p className="text-[#1C1F35] bg-[#E8E8E880] w-30 text-sm p-1 text-center">
            The Operators
          </p>
        </div>
        <h1 className="font-extrabold text-[#1C1F35] text-3xl text-center mt-2">
          Meet the Expert Team
        </h1>
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-10 gap-4 px-10">
          <div className=" w-full mx-auto max-w-[350px]">
            <div className="relative w-full">
              <img src={Glasses} alt="" />
              <div className="bg-gradient-to-r from-[#DBFF8E] via-[#DBFF8E] to-[#FFD7A6] w-28 h-10 absolute bottom-0 translate-y-5 right-0">
                <h1 className="text-black text-xl font-bold absolute bottom-2 right-2">
                  <div className="flex gap-4">
                    <FaTwitter />
                    <FaFacebook />
                    <FaInstagram />
                  </div>
                </h1>
              </div>
            </div>
            <div className="bg-[#1C1F35] w-full h-20 text-white p-4 ">
              <h1 className="text-xl font-bold ">Jessica Arow</h1>
              <p className="text-xs">Designer</p>
            </div>
          </div>

          <div className=" w-full mx-auto max-w-[350px]">
            <div className="relative">
              <img src={Smith} alt="" />
              <div className="bg-gradient-to-r from-[#DBFF8E] via-[#DBFF8E] to-[#FFD7A6] w-20 h-10 absolute bottom-0 translate-y-5 right-0">
                <h1 className="text-black text-xl font-bold absolute bottom-2 right-2">
                  <div className="flex gap-4">
                    <FaLinkedin />
                    <FaTwitter />
                  </div>
                </h1>
              </div>
            </div>

            <div className="bg-[#1C1F35] h-20 text-white p-4 ">
              <h1 className="text-xl font-bold ">Kathleen Smith</h1>
              <p className="text-xs">Designer</p>
            </div>
          </div>
          <div className=" w-full mx-auto max-w-[350px]">
            <div className="relative ">
              <img src={Tylor} alt="" />
              <div className="bg-gradient-to-r from-[#DBFF8E] via-[#DBFF8E] to-[#FFD7A6] w-20 h-10 absolute bottom-0 translate-y-5 right-0">
                <h1 className="text-black text-xl font-bold absolute bottom-2 right-2">
                  <div className="flex gap-4">
                    <FaFacebook />
                    <FaInstagram />
                  </div>
                </h1>
              </div>
            </div>
            <div className="bg-[#1C1F35] h-20 w-full text-white p-4 ">
              <h1 className="text-xl font-bold ]">Rebecca Tylor</h1>
              <p className="text-xs">Designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
