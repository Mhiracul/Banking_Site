import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import { apiBaseUrl } from "../../config";
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction data from the backend API
    fetch(`${apiBaseUrl}/transactions`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.log("Error fetching transaction data:", error);
      });
  }, []);

  return (
    <DefaultLayouts>
      <div className="mx-auto max-w-270 ">
        <UserTop pageName="Transaction History" />

        <div className="h-screen ">
          <div className="h-full px-6 md:px-20 py-10 mx-auto ">
            <h2 className="font-bold text-xl text-center mb-5 text-white">
              Transaction History
            </h2>
            {transactions.length === 0 ? (
              <div className="flex justify-center items-center text center  text-white text-sm font-medium">
                No transaction history available.
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[600px] md:max-h-[900px] w-full text-black rounded-md">
                <table className="w-full border-collapse border border-white">
                  <thead>
                    <tr>
                      <th className="shadow-md shadow-[#ccc] px-4 py-2 ">
                        Date
                      </th>
                      <th className="shadow-md shadow-[#ccc] px-4 py-2 ">
                        Type
                      </th>
                      <th className="shadow-md shadow-[#ccc] px-4 py-2 ">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                          {transaction.date}
                        </td>
                        <td className="capitalize shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                          {transaction.type}
                        </td>
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayouts>
  );
};

export default TransactionHistory;
