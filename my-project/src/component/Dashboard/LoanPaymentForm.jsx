import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";

const LoanPaymentForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accountBalance < 10000) {
      alert("You must deposit at least $10,000 before applying for a loan.");
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/loans`, {
        name,
        amount,
        paymentDate,
      });
      alert("Loan payment recorded successfully");
      setName("");
      setAmount("");
      setPaymentDate("");
    } catch (error) {
      console.error("Error recording loan payment:", error);
      alert("Failed to record loan payment");
    }
  };
  useEffect(() => {
    // Make API request to fetch account balance
    const fetchAccountBalance = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/account`, {
          headers: {
            Authorization: localStorage.getItem("token"), // Send the JWT token in the request headers
          },
        });
        const { accountBalance } = response.data;
        setAccountBalance(accountBalance);
      } catch (error) {
        console.error("Failed to fetch account balance:", error);
      }
    };

    fetchAccountBalance();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="overflow-hidden h-screen  shadow-md shadow-black">
          <Sidebar />
        </div>
        <h2>Loan Payment Form</h2>
        <p>Account Balance: ${accountBalance}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label htmlFor="paymentDate">Payment Duration:</label>
          <input
            type="text"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />

          <button type="submit" disabled={accountBalance < 10000}>
            Submit
          </button>

          {accountBalance < 10000 && (
            <p>You must deposit at least $10,000 before applying for a loan.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoanPaymentForm;
