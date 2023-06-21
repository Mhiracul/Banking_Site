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

      await axios.post("http://localhost:4000/admin/cryptos", cryptoData, {
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
    <div className="">
      <div className=" bg-[#fff] dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
        <div className="px-6 py-10 ">
          <h1 className="text-2xl text-black dark:text-white font-bold uppercase">
            Cryptocurrencies
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="crypto-list flex text-black flex-col  bg-gray-300 w-full md:h-96 h-[40vh] mt-6 overflow-y-scroll rounded-md shadow-lg shadow-gray-600">
              <Select
                value={selectedCrypto}
                onChange={handleCryptoChange}
                options={cryptoData}
                getOptionLabel={(option) => (
                  <div>
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
                isSearchable
                required
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              />

              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
