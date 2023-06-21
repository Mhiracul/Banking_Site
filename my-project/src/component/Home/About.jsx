import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsCalculator } from "react-icons/bs";
import WebsiteName from "../../WebsiteName";
const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#0C1C19] to-[#102F2D] rounded-t-[60px] pb-30">
      <div>
        <div className="w-full h-full mx-auto text-center  justify-center leading-[20px] font-inter ">
          <div className=" px-20 py-20">
            <p className="text-sm text-[#E1FFA0] font-medium">
              Why <WebsiteName />?
            </p>
            <h1 className="text-white md:flex-col flex flex-row items-center justify-center gap-1 md:text-5xl text-xl font-medium mt-3">
              The only fintech app
              <span className="text-white md:text-5xl text-xl font-medium space-x-7">
                you’ll ever need
              </span>
            </h1>

            <p className="text-[#afaeae] md:text-xl text-sm mt-3">
              Our online banking platform is user-friendly and easy to navigate.
            </p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-30 px-20 py-5 items-center justify-center">
            <div className="">
              <div className="justify-center items-center flex bg-[#517353] rounded-full w-16 h-16 border-8 border-[#284D3D] mx-auto">
                <FaMoneyBillAlt size={20} color="#E1FFA0" />
              </div>
              <h2 className="text-white text-xl mt-2">Checkings account</h2>
              <p className="text-[#afaeae] text-sm font-medium mt-2">
                Facilisis id diam eget quam. Nisi vestibulum accumsan lectus.
              </p>
            </div>
            <div className="items-center ">
              <div className="justify-center items-center flex bg-[#517353] rounded-full w-16 h-16 border-8 border-[#284D3D] mx-auto">
                <BsCalculator size={20} color="#E1FFA0" />
              </div>
              <h2 className="text-white text-xl mt-2">Savings account</h2>
              <p className="text-[#afaeae] text-sm mt-2">
                Facilisis id diam eget quam. Nisi vestibulum accumsan lectus.
              </p>
            </div>
            <div className="items-center ">
              <div className="justify-center items-center flex bg-[#517353] rounded-full w-16 h-16 border-8 border-[#284D3D] mx-auto">
                <BsCalculator size={20} color="#E1FFA0" />
              </div>
              <h2 className="text-white text-xl mt-2">Low Interest Loan</h2>
              <p className="text-[#afaeae] text-sm mt-2">
                Facilisis id diam eget quam. Nisi vestibulum accumsan lectus.
              </p>
            </div>
            <div className="items-center ">
              <div className="justify-center items-center flex bg-[#517353] rounded-full w-16 h-16 border-8 border-[#284D3D] mx-auto">
                <BsCalculator size={20} color="#E1FFA0" />
              </div>
              <h2 className="text-white text-xl mt-2">Flexible Credit Cards</h2>
              <p className="text-[#afaeae] text-sm mt-2">
                Facilisis id diam eget quam. Nisi vestibulum accumsan lectus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
