import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "./AdminSidebar";

const Crypto = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [newCrypto, setNewCrypto] = useState({
    name: "",
    symbol: "",
    walletAddress: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/cryptocurrencies"
      );
      setCryptocurrencies(response.data);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCrypto((prevCrypto) => ({
      ...prevCrypto,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCrypto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/cryptocurrencies",
        newCrypto
      );
      setCryptocurrencies((prevCryptos) => [...prevCryptos, response.data]);
      setNewCrypto({
        name: "",
        symbol: "",
        walletAddress: "",
        isActive: true,
      });
    } catch (error) {
      console.error("Error adding cryptocurrency:", error);
    }
  };

  const handleToggleCrypto = async (cryptoId) => {
    try {
      const updatedCryptocurrencies = cryptocurrencies.map((crypto) => {
        if (crypto._id === cryptoId) {
          return {
            ...crypto,
            isActive: !crypto.isActive,
          };
        }
        return crypto;
      });

      const updatedCrypto = updatedCryptocurrencies.find(
        (crypto) => crypto._id === cryptoId
      );

      await axios.put(`http://localhost:4000/cryptocurrencies/${cryptoId}`, {
        isActive: updatedCrypto.isActive,
      });

      setCryptocurrencies(updatedCryptocurrencies);
    } catch (error) {
      console.error("Error toggling cryptocurrency:", error);
    }
  };

  return (
    <div className="flex  w-full h-full">
      <div className="fixed">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto py-10 px-6 md:px-20 lg:px-40 overflow-hidden">
        <h2 className="font-bold text-center text-white text-2xl mb-8">
          Admin Page
        </h2>
        <div className="max-w-lg mx-auto">
          <div className="max-w-lg shadow-md mx-auto bg-[#d4d4d4] p-6">
            <h3>Add Cryptocurrency</h3>
            <form onSubmit={handleAddCrypto} className="mt-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={newCrypto.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md outline-none"
                />
              </label>
              <label className="block mb-2">
                Symbol:
                <input
                  type="text"
                  name="symbol"
                  value={newCrypto.symbol}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md outline-none"
                />
              </label>
              <label className="block mb-2">
                Wallet Address:
                <input
                  type="text"
                  name="walletAddress"
                  value={newCrypto.walletAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md outline-none"
                />
              </label>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-[#000] text-white rounded-md hover:bg-[#22706b]"
              >
                Add
              </button>
            </form>
          </div>
          <div className="shadow-md max-w-lg mx-auto bg-[#d4d4d4] p-6 mt-4">
            <h3>Cryptocurrencies</h3>
            {cryptocurrencies.map((crypto) => (
              <div key={crypto._id} className="mt-4">
                <p className="px-4 py-2 bg-white rounded-md">
                  Name: {crypto.name}
                </p>
                <p className="px-4 py-2 bg-white rounded-md mt-3">
                  Symbol: {crypto.symbol}
                </p>
                <p className="px-4 py-2 bg-white rounded-md mt-3">
                  Wallet Address: {crypto.walletAddress}
                </p>
                <p className="mt-2">
                  Active:{" "}
                  <input
                    type="checkbox"
                    checked={crypto.isActive}
                    onChange={() => handleToggleCrypto(crypto._id)}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
