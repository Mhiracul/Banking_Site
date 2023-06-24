import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiBaseUrl } from "../../config";
const TopBar = () => {
  const userData = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [accountNo, setAccountNo] = useState("");

  useEffect(() => {
    const fetchAccountNo = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/accountno`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const { accountNo } = response.data;
        setAccountNo(accountNo);
      } catch (error) {
        console.error("Error retrieving account number:", error);
        // Handle error
      }
    };

    fetchAccountNo();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform your search logic here
  };

  return (
    <div className="bg-[#21635f] text-white py-10 px-10 rounded-lg shadow-md mb-6">
      <div className="md:flex md:flex-row flex flex-col gap-4 justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl text-white font-bold">
            Hello,{userData.userName}
          </h1>
          <p className="text-[#DBFF8E]">Account Number: {accountNo}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
