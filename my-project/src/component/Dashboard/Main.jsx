import React, { useState, useEffect } from "react";
import VirtualCard from "./VirtualCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Make API requests to fetch account balance, total withdrawal, and total earnings
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setAccountBalance(0);
          setTotalWithdrawal(0);
          setTotalDeposit(0);
          setTotalEarnings(0);
          navigate("/login");
          return;
        }

        const accountResponse = await axios.get(
          "https://banking-6no4.onrender.com/account",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { accountBalance } = accountResponse.data;
        setAccountBalance(accountBalance);

        const withdrawalResponse = await axios.get(
          "https://banking-6no4.onrender.com/total-withdrawal",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { totalWithdrawal } = withdrawalResponse.data;
        setTotalWithdrawal(totalWithdrawal);

        const depositResponse = await axios.get(
          "https://banking-6no4.onrender.com/total-deposit",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { totalDeposit } = depositResponse.data;
        setTotalDeposit(totalDeposit);

        const earningsResponse = await axios.get(
          "https://banking-6no4.onrender.com/total-earnings",
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const { totalEarnings } = earningsResponse.data;
        setTotalEarnings(totalEarnings);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error appropriately
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className=" ">
      <main className=" flex-1">
        {/* Account Balance */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
          {/* Account Balance */}
          <div className="bg-[#102F2D] bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20 flex flex-col gap-10 text-white rounded-lg p-4 shadow-md">
            <h2 className="text-sm text-[#DBFF8E] font-medium">
              Account Balance
            </h2>
            <div className="flex-grow" />
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold">${accountBalance}</p>
              <p className="text-xs">Balance</p>
            </div>
          </div>

          {/* Total Deposit */}
          <div
            className="bg-[#102F2D] bg-gradient bg-gradient-to-br from-[#DBFF8E] to-[#102F2D]  
        bg-opacity-20 flex flex-col gap-10  text-white rounded-lg p-4 shadow-md"
          >
            <h2 className="text-sm text-white font-medium">Total Deposit</h2>
            <div className="flex-grow" />

            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold">${totalDeposit}</p>
              <p className="text-xs">Balance</p>
            </div>
          </div>
          {/* Total Earnings */}
          <div
            className="bg-[#102F2D] bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent  
        bg-opacity-20 flex flex-col gap-10   text-white rounded-lg p-4 shadow-lg"
          >
            <h2 className="text-sm text-white font-medium">Total Earnings</h2>
            <div className="flex-grow" />

            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
              <p className="text-xs">Balance</p>
            </div>
          </div>
          {/* Total Withdraw */}
          <div
            className="bg-[#102F2D] bg-gradient bg-gradient-to-br from-[#DBFF8E] to-[#102F2D]  
        bg-opacity-20 font-inter  flex flex-col gap-10  text-[#102F2D] rounded-lg p-4  shadow-lg"
          >
            <h2 className="text-sm text-white font-medium">Total Withdrawal</h2>
            <div className="flex-grow" />

            <div className="flex justify-between items-end">
              <p className="text-2xl text-white font-bold">
                ${totalWithdrawal}
              </p>
              <p className="text-xs text-white">Balance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
