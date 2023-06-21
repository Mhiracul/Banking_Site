import React, { useState } from "react";
import Tabs from "./Tabs";

const Service = () => {
  const [selectedTab, setSelectedTab] = useState("Income-and-expenses-tracker");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderImage = () => {
    switch (selectedTab) {
      case "Income-and-expenses-tracker":
        return (
          <img
            src="https://finflow.uicore.co/online-banking/wp-content/uploads/sites/2/2023/01/Online-Banking-Automated-Image.webp"
            alt=""
            className="h-96"
          />
        );
      case "Automated-invoicing":
        return (
          <div className="h-96 flex flex-col gap-6 px-6">
            <img
              src="https://finflow.uicore.co/online-banking/wp-content/uploads/sites/2/2023/01/Online-Banking-Income-Image-1.webp"
              alt=""
              className="rounded-lg"
            />
            <img
              src="https://finflow.uicore.co/online-banking/wp-content/uploads/sites/2/2023/01/Online-Banking-Income-Image.webp"
              alt=""
              className="rounded-lg"
            />
          </div>
        );
      case "Crypto-connection":
        return (
          <img
            src="https://finflow.uicore.co/online-banking/wp-content/uploads/sites/2/2023/01/Online-Banking-Crypto-Image-1.webp"
            alt=""
            className="h-96"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      <div className="px-20 py-20">
        <div className="text-left font-inter">
          <h1 className="text-[#102F2D] font-bold lg:text-5xl md:text-3xl text-xl font-inter">
            Super convenient online banking
          </h1>
          <p className="text-gray-500 mt-4 md:max-w-md w-full text-left">
            You can view your account balances, transaction history, and
            statements, and even set up custom alerts to help you stay on top of
            your finances.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 py-10 w-full">
          <Tabs selectedTab={selectedTab} onTabClick={handleTabClick} />
          <div className="bg-[#EAEFEF] md:w-[80%] w-full shadow-lg rounded-md flex justify-center items-center py-10">
            {renderImage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
