import React from "react";
import Navbar from "../component/Navbar";
import WebsiteName from "../WebsiteName";
import Footer from "../component/Footer";
import AboutPageAbout from "../component/About/AboutPageAbout";
import AboutImage from "../component/About/AboutImage";

const AboutUsPage = () => {
  const backgroundImage = {
    backgroundImage: `url('https://images.unsplash.com/photo-1647462659133-7126b04b52ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFua2luZyUyMGdyZWVuJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="oveflow-hidden h-screen ">
      <div className="bg-gradient bg-gradient-to-br from-[#134341] to-[#277768]">
        <div className="about ">
          <Navbar />
          <div className="mx-auto  text-center flex flex-col justify-center leading-[20px] font-inter max-w-[800px] px-20 py-10 ">
            <div className=" py-20">
              <div>
                <h1 className="text-sm text-[#E1FEA3] uppercase font-medium mb-5">
                  About Us
                </h1>
                <h1 className="text-5xl text-white font-bold mb-8">
                  Your go to financial department
                </h1>

                <p className="text-sm mb-4 text-[#ccc]">
                  Welcome to <WebsiteName />! We are dedicated to providing
                  excellent banking services to our customers.
                </p>

                <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5">
                  <div className="flex flex-col items-center justify-center gap-2 bg-[#EEF0EF]   px-4 py-10  rounded-lg">
                    <h1 className="text-[#a3c853] text-3xl font-bold">2018</h1>
                    <p className="text-xs">Year founded</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 bg-[#EEF0EF]   px-4 py-10 rounded-lg">
                    <h1 className="text-[#a3c853] text-3xl font-bold">30M</h1>
                    <p className="text-xs">Monthly Users</p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 bg-[#EEF0EF]   px-4 py-10  rounded-lg">
                    <h1 className="text-[#a3c853] text-3xl font-bold">99.9%</h1>
                    <p className="text-xs">Successfull transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutPageAbout />
      <AboutImage />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
