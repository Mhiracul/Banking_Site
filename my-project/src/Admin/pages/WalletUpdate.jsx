import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { apiBaseUrl } from "../../../config";

function WalletUpdate() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Fetch the list of cryptocurrencies from the database and update the state
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      const response = await axios.get(`${apiBaseUrl}/admin/cryptos`, {
        headers,
      });
      const fetchedCryptos = response.data;
      setCryptos(fetchedCryptos);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
    }
  };

  const handleToggleStatus = async (cryptoId) => {
    try {
      const updatedCryptos = cryptos.map((crypto) => {
        if (crypto._id === cryptoId) {
          return {
            ...crypto,
            active: !crypto.active,
          };
        }
        return crypto;
      });

      setCryptos(updatedCryptos);

      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      // Update the status of the cryptocurrency in the database
      await axios.put(
        `${apiBaseUrl}/admin/cryptos/${cryptoId}`,
        {
          active: updatedCryptos.find((crypto) => crypto._id === cryptoId)
            ?.active,
        },
        { headers }
      );
    } catch (error) {
      console.error("Error toggling cryptocurrency status:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Wallet " />
      <div className="">
        <div className="bg-[#fff] f dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
          <div className="crypto-list w-full md:h-96 h-[40vh] mt-6 overflow-y-scroll">
            <table className="w-full  bg-gray-300 rounded-md shadow-lg shadow-gray-600">
              <thead>
                <tr className="text-left bg-gray-300">
                  <th className="font-medium   px-20  uppercase text-xs ">
                    Logo
                  </th>
                  <th className="font-medium w-60 px-20 uppercase text-xs ">
                    Name
                  </th>
                  <th className="font-medium flex justify-center  uppercase text-xs px-4">
                    Wallet Address
                  </th>
                  <th className="font-medium   uppercase text-xs w-60 px-20">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {cryptos.map((crypto, index) => (
                  <tr key={index} className="bg-gray-300">
                    <td className="py-2  w-60 px-20 shadow-md shadow-[#ccc]  text-sm">
                      <div className=" w-10  shadow-lg shadow-black rounded-full p-2">
                        <img
                          src={crypto.logo}
                          alt="Crypto Logo"
                          width="25"
                          height="25"
                          className="bg-white"
                        />
                      </div>
                    </td>
                    <td className="py-2  w-60 px-20 shadow-md shadow-[#ccc]  text-sm">
                      {crypto.name}
                    </td>
                    <td className="py-2  w-50 px-10 shadow-md shadow-[#ccc]  text-sm">
                      <input
                        type="text"
                        placeholder="Wallet Address"
                        value={crypto.address || ""}
                        className="rounded-md py-1 px-1 text-sm mt-2 shadow-md"
                        disabled
                      />
                    </td>
                    <td className="py-2 px-20 shadow-md shadow-[#ccc]  text-sm">
                      <button
                        onClick={() => handleToggleStatus(crypto._id)}
                        className={`status-btn bg-black text-white p-2 rounded-full shadow-lg shadow-black outline-none ${
                          crypto.active ? "active" : ""
                        }`}
                      >
                        {crypto.active ? "ON" : "OFF"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
export default WalletUpdate;
