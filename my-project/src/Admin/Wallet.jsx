import React, { useState } from "react";
import axios from "axios";
import bitcoinLogo from "../assets/btc.svg";
import EthLogo from "../assets/eth.svg";
import TetherLogo from "../assets/usd.svg";
import aave from "../assets/aave.svg";
import ltc from "../assets/ltc.svg";
import bnb from "../assets/bnb.svg";
import PM from "../assets/PM.svg";
import btg from "../assets/btg.svg";
import bcch from "../assets/bcch.svg";
import pBTC from "../assets/pBTC.svg";
import doge from "../assets/doge.svg";
import dash from "../assets/dash.svg";
import whale from "../assets/whale.svg";
import xrp from "../assets/xrp.svg";
import paypal from "../assets/paypal.svg";
import berty from "../assets/berty.svg";
import Sidebar from "./AdminSidebar";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../config";

const cryptoData = [
  { id: 1, name: "Bitcoin", logo: bitcoinLogo },
  { id: 2, name: "Ethereum", logo: EthLogo },
  { id: 3, name: "Tether ERC20", logo: TetherLogo },
  { id: 4, name: "Aave", logo: aave },
  { id: 5, name: "Litecoin", logo: ltc },
  { id: 6, name: "BNB", logo: bnb },
  { id: 7, name: "Perfect Money", logo: PM },
  { id: 8, name: "Bitcoin Gold", logo: btg },
  { id: 9, name: "Bitcoin Cash", logo: bcch },
  { id: 10, name: "Pay BTC", logo: pBTC },
  { id: 11, name: "Doge", logo: doge },
  { id: 12, name: "Dash", logo: dash },
  { id: 13, name: "Whale", logo: whale },
  { id: 14, name: "Ripple", logo: xrp },
  { id: 15, name: "PayPal", logo: paypal },
  { id: 16, name: "Berty", logo: berty },
  // Add other crypto data here
];

function Wallet() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [address, setAddress] = useState("");

  const handleCryptoChange = (selectedOption) => {
    setSelectedCrypto(selectedOption);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!selectedCrypto) {
        throw new Error("Please select a crypto");
      }

      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      const cryptoData = {
        name: selectedCrypto.name,
        logo: selectedCrypto.logo,
        address,
      };

      await axios.post(`${apiBaseUrl}/admin/cryptos`, cryptoData, {
        headers,
      });

      toast.success("Wallet addresses saved successfully");
      // Clear the form
      setSelectedCrypto(null);
      setAddress("");
    } catch (error) {
      console.error("Error saving wallet addresses:", error);
      toast.error("Failed to save wallet addresses");
    }
  };

  return (
    <div className="w-full ">
      <div className="overflow-hidden">
        <div className=" bg-[#fff] px-6 dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
          <div className="px-6  ">
            <h1 className="text-2xl text-black dark:text-white font-bold uppercase">
              Cryptocurrencies
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className="crypto-list flex text-black flex-col   w-full md:h-96 h-[40vh] mt-6 overflow-y-scroll rounded-md ">
                <Select
                  value={selectedCrypto}
                  onChange={handleCryptoChange}
                  options={cryptoData}
                  getOptionLabel={(option) => (
                    <div className=" px-6 dark:text-black">
                      <img
                        src={option.logo}
                        alt={option.name}
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      {option.name}
                    </div>
                  )}
                  getOptionValue={(option) => option.value}
                  placeholder="Select a crypto"
                  className="w-full rounded border border-stroke  bg-[#fff]  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  isSearchable
                  required
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5  mt-7 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  required
                />

                <button
                  type="submit"
                  className="flex justify-center rounded w-full mt-3 bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
