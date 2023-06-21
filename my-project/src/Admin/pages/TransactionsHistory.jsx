import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";

const TransactionsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/transaction",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data); // Check the value of response.data
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateStatus = async (transactionId) => {
    try {
      const updatedStatus = "success"; // Set the desired updated status here
      setUpdated(updatedStatus);
      await axios.patch(
        `http://localhost:4000/admin/transaction/${transactionId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchTransaction();
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Transaction history" />
        <div>
          <div className="h-full px-6 md:px-20 py-10 mx-auto">
            <div className="bg-[#fff] border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark  overflow-y-auto  md:h-[600px] h-[900px] w-full text-black rounded-md">
              <table className="w-full  text-black dark:text-white">
                <thead>
                  <tr>
                    <th className="font-medium shadow-md uppercase text-xs px-4 py-2">
                      Date
                    </th>
                    <th className="font-medium shadow-md uppercase text-xs px-4 py-2">
                      Type
                    </th>
                    <th className="font-medium shadow-md uppercase text-xs px-4">
                      Status
                    </th>
                    <th className="font-medium shadow-md uppercase text-xs px-4 py-2">
                      Amount
                    </th>
                    <th className="font-medium shadow-md uppercase text-xs px-4 py-2">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                        {transaction.date}
                      </td>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                        {transaction.type}
                      </td>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                        {transaction.status === "pending" ? (
                          <span className=" bg-[#FED5D6] text-[#FC444C]  flex justify-center items-center w-16 h-6 rounded-md">
                            {transaction.status}
                          </span>
                        ) : (
                          <span className=" bg-[#D2F3E0] text-[#34C164] flex justify-center items-center w-16 h-6 rounded-md">
                            {transaction.status}
                          </span>
                        )}
                      </td>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                        {transaction.amount}
                      </td>

                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleUpdateStatus(transaction._id)}
                            className="bg-[#000] hover:bg-[#D2F3E0] hover:text-[#34C164] text-white text-xs rounded-md px-2 py-1 ml-2"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TransactionsHistory;
