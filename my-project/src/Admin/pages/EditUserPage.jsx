import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import bitcoinLogo from "../../assets/btc.svg";
import { toast } from "react-hot-toast";
import axios from "axios";
import { apiBaseUrl } from "../../../config";
import { setUsers } from "../../redux/userSlice";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";

function EditUserPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bitcoinWalletAddress, setBitcoinWalletAddress] = useState("");

  const [accountBalance, setAccountBalance] = useState("");
  const [status, setStatus] = useState("");
  const [penalties, setPenalties] = useState({});
  const [addition, setAddition] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook

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
          setPassword(userData.password);
          setAccountBalance(userData.accountBalance.toFixed(2)); // Format the account balance with two decimal places
          setBitcoinWalletAddress(userData.bitcoinWalletAddress);
          setAccountNo(userData.accountNo);
          setStatus(userData.status);
        } else {
          // Handle other response statuses
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Handle the error state or display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditUser = async () => {
    const editedUser = {
      userName,
      email,
      password,
      bitcoinWalletAddress,
      accountNo,
      accountBalance,
      status,
    };

    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}`,
        editedUser,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.data.message === "User updated successfully") {
        // User edited successfully
        // Update the user list by dispatching a new action
        const updatedUsers = myUsers.map((user) =>
          user._id === userId ? editedUser : user
        );
        dispatch(setUsers(updatedUsers));
        toast.success("User updated successfully");
      } else {
        // Handle other response statuses
        console.log("Failed to edit user");
      }
    } catch (err) {
      console.error("Failed to edit user:", err);
      toast.error("Failed to edit user");
      // Handle the error state or display an error message
    }
  };

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
        toast.success("Addition applied successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to apply addition:", err);
      // Handle the error state or display an error message
    }
  };

  const handleGoBack = () => {
    navigate("/admin-user/edit"); // Navigate back to the MainPage
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270 ">
        <Breadcrumb pageName="Edit User" />
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="text-sm">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="text-sm">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="text-sm">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="accountBalance" className="text-sm">
                    Account Balance:
                  </label>
                  <input
                    type="number"
                    id="accountBalance"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="text-sm">
                    Status:
                  </label>
                  <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="bitcoinWalletAddress"
                    className="flex gap-2 mb-1 items-center text-sm"
                  >
                    Bitcoin Address:{" "}
                    <img src={bitcoinLogo} alt="" className="w-4 h-4" />
                  </label>
                  <input
                    type="text"
                    id="bitcoinWalletAddress"
                    value={bitcoinWalletAddress}
                    onChange={(e) => setBitcoinWalletAddress(e.target.value)}
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleEditUser}
                  className="flex justify-center rounded-full bg-primary  w-full mt-5 py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Save
                </button>
              </form>

              <button
                className="action-button primary bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EditUserPage;
