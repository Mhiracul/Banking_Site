import React, { useState, useEffect } from "react";
import axios from "axios";

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/withdrawals",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setWithdrawals(response.data.withdrawals);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const handleUpdateStatus = async (withdrawalId) => {
    try {
      setUpdatedStatus("success"); // Set updatedStatus to "success"
      await axios.patch(
        `http://localhost:4000/admin/withdrawals/${withdrawalId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchWithdrawals(); // Refetch the withdrawals to display updated data
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
    }
  };

  return (
    <div className="md:min-h-full h-[40vh] bg-[#fff] dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
      <div className="py-3 overflow-x-auto overflow-y-auto md:min-h-full h-[40vh]">
        <div className="w-full">
          <div className="px-6">
            <h3 className="border border-stroke dark:border-strokedark  px-1 py-2">
              Withdrawal History
            </h3>
            <div className="table-container">
              <table className="w-full mt-4 text-xs">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="font-medium uppercase text-xs py-2 px-4">
                      Type
                    </th>
                    <th className="font-medium uppercase text-xs px-4">Date</th>
                    <th className="font-medium uppercase text-xs px-4">
                      Status
                    </th>
                    <th className="font-medium uppercase text-xs px-4">
                      Amount
                    </th>
                    <th className="font-medium uppercase text-xs px-4">User</th>
                    <th className="font-medium uppercase text-xs px-4">
                      Update
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal._id}>
                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        {withdrawal.type}
                      </td>
                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        {withdrawal.date}
                      </td>
                      <td className="py-2 uppercase text-white px-4 shadow-md shadow-[#ccc]  text-xs">
                        {withdrawal.status === "pending" ? (
                          <span className=" bg-[#FED5D6] text-[#FC444C]  flex justify-center items-center w-16 h-6 rounded-md">
                            {withdrawal.status}
                          </span>
                        ) : (
                          <span className=" bg-[#D2F3E0] text-[#34C164] flex justify-center items-center w-16 h-6 rounded-md">
                            {withdrawal.status}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        {withdrawal.amount}
                      </td>
                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        {withdrawal.user.userName}
                      </td>
                      {/* Access the userName property */}
                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-sm">
                        <div className="flex items-center">
                          {/* Remove the input element */}
                          <button
                            onClick={() => handleUpdateStatus(withdrawal._id)}
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
            <p className="text-gray-600 text-sm mt-2">
              Showing 1 to {withdrawals.length} of {withdrawals.length} entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
