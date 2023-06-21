import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPage = ({ userId }) => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = () => {
    axios
      .get(`http://localhost:4000/withdrawals`, {
        headers: {
          "auth-token": localStorage.getItem("token"), // Include the authentication token
        },
      })
      .then((response) => {
        setWithdrawals(response.data.withdrawals);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const processWithdrawal = (withdrawalId) => {
    axios
      .put(
        `http://localhost:4000/withdrawals/${withdrawalId}/process`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // Include the authentication token
          },
        }
      )
      .then(() => {
        // Update the status of the processed withdrawal
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((withdrawal) => {
            if (withdrawal._id === withdrawalId) {
              return { ...withdrawal, status: "success" };
            }
            return withdrawal;
          })
        );
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <h2>Pending Withdrawal Requests</h2>
      {withdrawals.map((withdrawal) => (
        <div key={withdrawal._id}>
          <p>Type: {withdrawal.type}</p>
          <p>Amount: {withdrawal.amount}</p>
          {withdrawal.status === "pending" ? (
            <button onClick={() => processWithdrawal(withdrawal._id)}>
              Process
            </button>
          ) : (
            <p>Status: Success</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPage;
