import React from "react";
import Cards from "../../assets/Cards.webp";

const Hero = () => {
  return (
    <div className="h-full  bg">
      <div>
        <div
          className="mx-auto text-center flex flex-col justify-center leading-[20px] font-inter max-w-[800px] px-10 py-20"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <p className="text-sm text-[#E1FFA0] font-medium">
            All-in-one banking for everyone
          </p>
          <div className="text-white text-center ">
            <h1 className="inline-block md:text-7xl text-4xl mr-2 font-bold">
              Smart and simple
            </h1>
            <span className="md:text-7xl text-4xl font-bold md:mt-2  md:inline-block">
              online banking
            </span>
          </div>
          <div className="max-w-[800px] items-center justify-center">
            <div className="text-white text-center ">
              <p className="inline-block text-gray mr-2 md:text-xl text-sm mt-2">
                With our secure online banking services, you can manage
              </p>
              <span className="text-gray md:text-xl text-sm md:mt-1 md:inline-block">
                your finances from anywhere, at any time.
              </span>
            </div>
            <div className="flex md:flex-row md:items-center md:justify-center flex-col mt-10 w-full">
              <button className="bg-[#fff] mx-auto  text-[#123432] p-4 md:rounded-r-md rounded-md border-l-4  border-r-4 border-t-4 border-b-4  border-[#689273]">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center">
          <img
            src={Cards}
            alt=""
            className="mx-auto lg:max-w-[50rem] md:max-w-[40rem] max-w-[20rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
