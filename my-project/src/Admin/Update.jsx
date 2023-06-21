import React, { useEffect, useState } from "react";
import axios from "axios";

function Update() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBalance, setNewBalance] = useState(""); // Initialize newBalance as an empty string

  useEffect(() => {
    fetchWithdrawals();
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateAccountBalance = async (userName) => {
    try {
      const parsedBalance = parseFloat(newBalance); // Parse the newBalance string to a floating-point number

      if (isNaN(parsedBalance)) {
        console.error("Invalid balance value:", newBalance);
        return;
      }

      await axios.put(`http://localhost:4000/users/${userName}`, {
        newBalance: parsedBalance,
      });
      console.log("Account balance updated successfully");
      // Update the account balance in the local state or refetch the user data
    } catch (error) {
      console.error("Error updating account balance:", error);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get("http://localhost:4000/withdrawals");
      setWithdrawals(response.data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const updateStatus = async (withdrawalId) => {
    const newStatus = prompt("Enter the new status:");

    try {
      const response = await axios.patch(
        `http://localhost:4000/withdrawals/${withdrawalId}`,
        {
          status: newStatus,
        }
      );
      console.log("Withdrawal updated:", response.data.withdrawal);

      // Update the UI accordingly, e.g., update the status value in the withdrawals array
      const updatedWithdrawals = withdrawals.map((withdrawal) => {
        if (withdrawal._id === withdrawalId) {
          return { ...withdrawal, status: newStatus };
        }
        return withdrawal;
      });
      setWithdrawals(updatedWithdrawals);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Withdrawals</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td className="border px-4 py-2">{withdrawal.type}</td>
              <td className="border px-4 py-2">{withdrawal.date}</td>
              <td className="border px-4 py-2">{withdrawal.status}</td>
              <td className="border px-4 py-2">{withdrawal.amount}</td>
              <td className="border px-4 py-2">{withdrawal.user.userName}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => updateStatus(withdrawal._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.userName}, Account Balance: {user.accountBalance}
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
            />
            <button onClick={() => updateAccountBalance(user.userName)}>
              Update Balance
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Update;
