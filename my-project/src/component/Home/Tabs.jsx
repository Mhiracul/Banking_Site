import React from "react";
import { FaFilter } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
const Tabs = ({ selectedTab, onTabClick }) => {
  const handleTabClick = (event, tab) => {
    event.preventDefault();
    onTabClick(tab);
  };

  return (
    <div
      className="bdt-tab "
      data-bdt-tab="connect: #bdt-tab-content-c1a523e; media: 768;"
      data-bdt-height-match="target: > .bdt-tabs-item > .bdt-tabs-item-title; row: false;"
    >
      <div
        className={`bdt-tabs-item ${
          selectedTab === "Income-and-expenses-tracker" ? "bdt-active" : ""
        }`}
      >
        <a
          data-title="Income-and-expenses-tracker"
          className="bdt-tabs-item-title"
          id="bdt-tab-Income-and-expenses-tracker"
          data-tab-index="0"
          href="#"
          aria-expanded={
            selectedTab === "Income-and-expenses-tracker" ? "true" : "false"
          }
          onClick={(event) =>
            handleTabClick(event, "Income-and-expenses-tracker")
          }
        >
          <div className="bdt-tab-text-wrapper bdt-flex-column mb-3  md:w-[80%] w-full">
            <div className="bdt-tab-title-icon-wrapper flex items-center gap-2">
              <span className="bdt-button-icon-align-left">
                <FaFilter />
              </span>
              <span className="bdt-tab-text text-[#0C231F] text-xl">
                Income and expenses tracker
              </span>
            </div>
            <span className="bdt-tab-sub-title bdt-text-small text-[#6E7674] text-sm">
              Manage and track your income and expenses
            </span>
          </div>
        </a>
      </div>
      <div
        className={`bdt-tabs-item ${
          selectedTab === "Automated-invoicing" ? "bdt-active" : ""
        }`}
      >
        <a
          data-title="Automated-invoicing"
          className="bdt-tabs-item-title"
          id="bdt-tab-Automated-invoicing"
          data-tab-index="1"
          href="#"
          aria-expanded={
            selectedTab === "Automated-invoicing" ? "true" : "false"
          }
          onClick={(event) => handleTabClick(event, "Automated-invoicing")}
        >
          <div className="bdt-tab-text-wrapper bdt-flex-column mb-3 md:w-[80%] w-full">
            <div className="bdt-tab-title-icon-wrapper flex items-center gap-2 ">
              <span className="bdt-button-icon-align-left">
                <FaUpload />
              </span>
              <span className="bdt-tab-text text-[#0C231F] text-xl">
                Automated invoicing
              </span>
            </div>
            <span className="bdt-tab-sub-title bdt-text-small text-[#6E7674] text-sm ">
              Generate and manage invoices automatically with this tool.
            </span>
          </div>
        </a>
      </div>
      <div
        className={`bdt-tabs-item ${
          selectedTab === "Crypto-connection" ? "bdt-active" : ""
        }`}
      >
        <a
          data-title="Crypto-connection"
          className="bdt-tabs-item-title"
          id="bdt-tab-Crypto-connection"
          data-tab-index="2"
          href="#"
          aria-expanded={selectedTab === "Crypto-connection" ? "true" : "false"}
          onClick={(event) => handleTabClick(event, "Crypto-connection")}
        >
          <div className="bdt-tab-text-wrapper bdt-flex-column  md:w-[80%] w-full">
            <div className="bdt-tab-title-icon-wrapper flex items-center gap-2">
              <span className="bdt-button-icon-align-left">
                <FaQrcode />
              </span>
              <span className="bdt-tab-text text-[#0C231F] text-xl">
                Crypto connection
              </span>
            </div>
            <span className="bdt-tab-sub-title bdt-text-small text-[#6E7674] text-sm">
              Connect with the world of cryptocurrencies using this tool.
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Tabs;
