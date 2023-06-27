import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import UserTop from "../component/UserTop";
import Polite from "../assets/PoliteChicky.gif";
import { BsX } from "react-icons/bs";
import { apiBaseUrl } from "../../config";
import ReactTailwindTable from "../ReactTailwindTable";

const Dropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white px-4 py-2 border rounded-md w-full flex items-center outline-none justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M10.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-full bg-white shadow-lg rounded-md">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const WithdrawalForm = () => {
  const [withdrawalType, setWithdrawalType] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawals, setWithdrawals] = useState([]);
  const [userId, setUserId] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Add showSuccessMessage state variable
  const [successMessage, setSuccessMessage] = useState(""); // Add successMessage state variable

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/profile`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        setUserProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchAccountBalance = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/account`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const { accountBalance } = response.data;
        setAccountBalance(accountBalance);
      } catch (error) {
        console.error("Failed to fetch account balance:", error);
      }
    };

    fetchUserData();
    fetchAccountBalance();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/withdrawal`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        setWithdrawals(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleWithdrawalTypeChange = (selectedOption) => {
    setWithdrawalType(selectedOption);
  };

  const handleWithdrawalAmountChange = (e) => {
    setWithdrawalAmount(e.target.value);
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawalType) {
      toast.error("Please select a withdrawal type");
      return;
    }

    const amount = parseFloat(withdrawalAmount);

    if (amount > accountBalance) {
      toast.error("Withdrawal amount exceeds account balance");
      return;
    }

    const updatedBalance = accountBalance - amount;

    const withdrawalData = {
      type: withdrawalType.value,
      amount: amount,
      status: "pending",
      user: userId,
      wallet: selectedWallet ? selectedWallet.value : null,
    };

    try {
      const response = await axios.post(
        `${apiBaseUrl}/withdrawal`,
        withdrawalData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log("New withdrawal created:", response.data);
      setSuccessMessage(
        "Thank you for using FinFlow, your withdrawal is processing...."
      );
      setShowSuccessMessage(true);
      setAccountBalance(updatedBalance);

      const res = await axios.get(`${apiBaseUrl}/withdrawal`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      setWithdrawals(res.data.data);
      setWithdrawalType(null);
      setWithdrawalAmount("");
      setSelectedWallet(null);
    } catch (error) {
      console.error("Error creating withdrawal:", error);
    }
  };

  const walletOptions = [];

  if (userProfile && userProfile.tetherWalletAddress) {
    walletOptions.push({
      label: `Tether Wallet: ${userProfile.tetherWalletAddress}`,
      value: userProfile.tetherWalletAddress,
    });
  }

  if (userProfile && userProfile.bitcoinWalletAddress) {
    walletOptions.push({
      label: `Bitcoin Wallet: ${userProfile.bitcoinWalletAddress}`,
      value: userProfile.bitcoinWalletAddress,
    });
  }

  if (userProfile && userProfile.accountNumber) {
    walletOptions.push({
      label: `Wire Transfer Account Number: ${userProfile.accountNumber}`,
      value: userProfile.accountNumber,
    });
  }
  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false); // Hide the success message
  };

  return (
    <div className="w-full">
      <DefaultLayouts>
        <div className="mx-auto max-w-270 font-inter font-medium">
          <UserTop pageName="Withdrawal" />
          {showSuccessMessage && ( // Check if the success message should be shown
            <div className="relative">
              <p className="bg-gradient bg-gradient-to-br from-[#043f34] to-transparent bg-opacity-20  text-[#fff] font-medium p-2 text-center rounded-md py-6  mt-2">
                ✅ {successMessage}
                <button
                  className="absolute top-1 right-1 text-[#fff] focus:outline-none"
                  onClick={handleCloseSuccessMessage}
                >
                  <BsX />
                </button>
              </p>
            </div>
          )}
          <div className="bg-[#21635f]  px-10 py-10  mt-10 rounded-md shadow-md shadow-[#ccc] w-full">
            <div className="flex justify-between  items-center mb-5 text-white lg:text-xl md:text-sm text-xs">
              <h1 className="text-2xl ">Account Balance:</h1>
              <h1 className="text-2xl ">${accountBalance.toFixed(2)}</h1>
            </div>
            <form onSubmit={handleWithdrawalSubmit}>
              <div className="py-2">
                <label
                  htmlFor="withdrawalType"
                  className="text-white text-sm mb-2 md:mb-0 md:mr-4"
                >
                  Withdrawal Type:
                </label>
                <div className="w-full  text-[#21635f]">
                  <Dropdown
                    options={[
                      { label: "Tether", value: "tether" },
                      { label: "Bitcoin", value: "bitcoin" },
                      { label: "Wire Transfer", value: "wireTransfer" },
                    ]}
                    selectedOption={withdrawalType}
                    onOptionSelect={handleWithdrawalTypeChange}
                  />
                </div>
              </div>

              <div className="  py-2">
                <label
                  htmlFor="withdrawalAmount"
                  className="text-sm mb-2 md:mb-0 md:mr-4 text-white"
                >
                  Withdrawal Amount:
                </label>
                <div className="w-full text-[#21635f]">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={accountBalance}
                    className="w-full border px-4 py-2 rounded-md"
                    value={withdrawalAmount}
                    onChange={handleWithdrawalAmountChange}
                    required
                  />
                </div>
              </div>
              <div className=" py-2">
                <label
                  htmlFor="wallet"
                  className="text-sm mb-2 md:mb-0 md:mr-4 text-white"
                >
                  Wallet:
                </label>
                <div className="w-full text-[#21635f]">
                  <Dropdown
                    options={walletOptions}
                    selectedOption={selectedWallet}
                    onOptionSelect={setSelectedWallet}
                  />
                </div>
              </div>
              <div className=" mt-6 ">
                <button
                  type="submit"
                  className="bg-[#DBFF8E] hover:bg-[#23867f] text-[#23867f] hover:text-white w-full font-bold py-2 px-6 rounded-full outline-none"
                >
                  Submit Withdrawal
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-xl mt-10 mb-6 text-center">
              Withdrawal History
            </h1>
            <div className=" h-full mb-10  w-full  text-black rounded-md ">
              {withdrawals && withdrawals.length > 0 ? (
                <ReactTailwindTable data={withdrawals} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <img src={Polite} alt="PoliteChicky" className="mb-4" />
                  <p className="text-lg">No withdrawal history found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DefaultLayouts>
    </div>
  );
};

export default WithdrawalForm;
