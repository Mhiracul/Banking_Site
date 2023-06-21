import React, { useState, useEffect } from "react";
import { FaFlag } from "react-icons/fa";

const RandomTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch random data initially
    fetchData();

    // Fetch new random data every 5 seconds
    const interval = setInterval(fetchData, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    // Simulating the fetching of random data
    const flagImageURLs = [
      "https://flagsapi.com/BE/flat/64.png",
      "https://flagsapi.com/AF/flat/64.png",
      "https://flagsapi.com/AE/flat/64.png",
      "https://flagsapi.com/BF/flat/64.png",
      "https://flagsapi.com/CU/flat/64.png",
      "https://flagsapi.com/DE/flat/64.png",
      "https://flagsapi.com/GH/flat/64.png",
      "https://flagsapi.com/ML/flat/64.png",
      "https://flagsapi.com/KY/flat/64.png",
      "https://flagsapi.com/US/flat/64.png",
      "https://flagsapi.com/NU/flat/64.png",
      // Add more flag image URLs here
    ];

    const randomData = [
      { id: 1, amount: 1266, name: "Caley", flag: flagImageURLs[0] },
      { id: 2, amount: 20, name: "Harnek", flag: flagImageURLs[1] },
      { id: 3, amount: 1009, name: "Roger", flag: flagImageURLs[2] },
      { id: 4, amount: 535, name: "Erickson", flag: flagImageURLs[3] },
      { id: 5, amount: 229, name: "Wright", flag: flagImageURLs[4] },
      { id: 6, amount: 1827, name: "Dickson", flag: flagImageURLs[5] },
      { id: 7, amount: 677, name: "Sudais", flag: flagImageURLs[6] },
      { id: 8, amount: 880, name: "Fernandez", flag: flagImageURLs[7] },
      { id: 9, amount: 1629, name: "Sami", flag: flagImageURLs[8] },
      { id: 10, amount: 1289, name: "Fauzaan", flag: flagImageURLs[9] },
    ];

    // Shuffle the data randomly
    const shuffledData = shuffleArray(randomData);
    setData(shuffledData);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="py-10 bg">
      <h1 className="text-white font-bold text-2xl text-center">
        TRANSACTIONS WITH US
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 mt-4">
        <div>
          <h2 className="text-2xl py-2 text-white text-center">
            LATEST DEPOSIT
          </h2>
          <table className="min-w-full divide-y divide-gray-200 mt-8">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    {item.name}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    <img
                      src={item.flag}
                      alt=""
                      className="md:w-8 md:h-8 w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="text-2xl py-2 text-white text-center">
            LATEST WITHDRAWAL
          </h2>
          <table className="min-w-full divide-y divide-gray-200 mt-8">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    ${item.amount}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    {item.name}
                  </td>
                  <td className="px-6 py-2 whitespace-no-wrap text-white border border-[#DBFF8E]">
                    <img
                      src={item.flag}
                      alt=""
                      className="md:w-8 md:h-8 w-6 h-6"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RandomTable;
