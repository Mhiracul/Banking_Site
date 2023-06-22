import React from "react";
import CountUp from "react-countup";

const AboutImage = () => {
  return (
    <div className="mybackg py-10 px-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 justify-center mt-20">
        <div>
          <p className="text-[#CDF88C] mb-2">OUR PROCESS</p>
          <h1 className="mt-2 mb-2">How We Work</h1>
          <p className="font-light text-xs text-bodydark">
            At our company, we prioritize efficient and reliable processes to
            deliver the best results. We combine our expertise and dedication to
            ensure customer satisfaction. Our team works diligently to meet and
            exceed client expectations.
          </p>
          <div className="flex md:flex-row flex-col gap-8 mt-5 w-full md:items-center items-start">
            <h1 className="font-bold text-8xl">
              <CountUp end={300} duration={1} separator="," />+
            </h1>
            <p className="text-[#CDF88C] text-sm">
              WE HAVE MORE THAN 300+ CLIENTS AROUND THE WORLD
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-8 items-center mb-5">
            <div className="bg-[#CDF88C] rounded-md p-5 w-60 h-20 flex items-center justify-center">
              <img
                src="https://templatekit.tokomoo.com/loankit2/wp-content/uploads/sites/94/2022/08/Money-Case.png"
                alt=""
                className="w-10 h-10 "
              />
            </div>

            <div className="">
              <h1 className="font-bold text-xl">Apply For a Bank Loan</h1>
              <p className="text-xs text-bodydark">
                Looking to secure financial assistance? Our team can help you
                apply for a bank loan tailored to your needs. We guide you
                through the process and ensure a smooth experience.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center mb-5">
            <div className="bg-[#CDF88C] rounded-md p-5 w-60 h-20 flex items-center justify-center">
              <img
                src="https://templatekit.tokomoo.com/loankit2/wp-content/uploads/sites/94/2022/08/Balance-2.png"
                alt=""
                className="w-10 h-10 "
              />
            </div>

            <div className="">
              <h1 className="font-bold text-xl text-[#CDF88C]">
                Check Your Balance
              </h1>
              <p className="text-xs text-bodydark">
                Stay on top of your finances by regularly checking your balance.
                Our user-friendly platform allows you to monitor your account
                and make informed financial decisions.
              </p>
            </div>
          </div>

          <div className="flex gap-8 items-center ">
            <div className="bg-[#CDF88C] rounded-md p-5 w-60 h-20 flex items-center justify-center">
              <img
                src="https://templatekit.tokomoo.com/loankit2/wp-content/uploads/sites/94/2022/08/Money-Bag.png"
                alt=""
                className="w-10 h-10 "
              />
            </div>

            <div className="">
              <h1 className="font-bold text-xl">Apply For a Credit Card</h1>
              <p className="text-xs text-bodydark">
                Enjoy the benefits of a credit card tailored to your lifestyle.
                Apply today and gain access to convenient payment options,
                rewards, and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutImage;
