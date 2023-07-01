import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../../../config";
import { toast } from "react-hot-toast";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import axios from "axios";
import { setUsers } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const PutFund = () => {
  const { userId } = useParams();
  const [penalties, setPenalties] = useState({});
  const [addition, setAddition] = useState({});
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const navigate = useNavigate(); // Use the useNavigate hook
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bitcoinWalletAddress, setBitcoinWalletAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/admin/users/${userId}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (res.status === 200) {
          const userData = res.data.data;
          setUserName(userData.userName);
          setEmail(userData.email);
          setBitcoinWalletAddress(userData.bitcoinWalletAddress);
          setAccountNo(userData.accountNo);
        } else {
          // Handle other response statuses
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Handle the error state or display an error message
      }
    };

    fetchUser();
  }, [userId]);

  const handlePenaltyChange = (userId, amount) => {
    setPenalties((prevPenalties) => ({
      ...prevPenalties,
      [userId]: amount,
    }));
  };

  const handleApplyPenalty = async (userId) => {
    const amount = penalties[userId];

    try {
      const res = await axios.post(
        `${apiBaseUrl}/admin/users/${userId}/penalty`,
        { amount },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // Penalty applied successfully
        toast.success("Penalty applied successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to apply penalty:", err);
      // Handle the error state or display an error message
    }
  };

  const handleAdditionChange = (userId, amount) => {
    setAddition((prevAddition) => ({
      ...prevAddition,
      [userId]: amount,
    }));
  };

  const handleApplyAddition = async (userId) => {
    const amount = addition[userId];

    try {
      const res = await axios.post(
        `${apiBaseUrl}/admin/users/${userId}/balance/add`,
        { amount },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // Addition applied successfully
        toast.success("Funds added successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to add funds:", err);
      // Handle the error state or display an error message
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 ">
        <Breadcrumb pageName="Edit User" />
        <div>
          <div className="flex bg-bodydark1 p-1 justify-between text-sm font-medium mb-3">
            <h1>UserName: </h1>
            <p className="md:text-sm text-[10px]">{userName}</p>
          </div>
          <div className="flex bg-bodydark1 p-1 justify-between text-sm font-medium mb-3">
            <h1>E-mail:</h1>
            <p className="md:text-sm text-[10px]">{email}</p>
          </div>
          <div className="flex bg-bodydark1 p-1 justify-between text-sm font-medium mb-3">
            <h1>Bitcoin Address:</h1>
            <p className="md:text-sm text-[10px]">{bitcoinWalletAddress}</p>
          </div>
          <div className="flex bg-bodydark1 p-1 justify-between text-sm font-medium mb-3">
            <h1>Account Number:</h1>
            <p className="md:text-sm text-[10px]">{accountNo}</p>
          </div>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="penalty">Penalty:</label>
            <input
              type="number"
              id="penalty"
              value={penalties[userId] || ""}
              onChange={(e) => handlePenaltyChange(userId, e.target.value)}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            <button
              type="button"
              onClick={() => handleApplyPenalty(userId)}
              className="flex justify-center rounded bg-primary  mt-2 py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Apply Penalty
            </button>
          </div>

          {/* Addition input and button */}
          <div className="mb-3">
            <label htmlFor="addition">Addition:</label>
            <input
              type="number"
              id="addition"
              value={addition[userId] || ""}
              onChange={(e) => handleAdditionChange(userId, e.target.value)}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            <button
              type="button"
              onClick={() => handleApplyAddition(userId)}
              className="flex justify-center rounded bg-primary  mt-2 py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Add Fund
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default PutFund;
