import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../config";
import DefaultLayout from "../layout/DefaultLayout";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "../componentAdmin/Breadcrumb";

const SavingsTransactions = () => {
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true initially
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Simulate a 2-second loading delay (adjust as needed)
  }, []);

  useEffect(() => {
    // Fetch savings transactions when the component mounts
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/savings-transactions`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      setSavings(response.data.savings);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateStatus = async (savingsId) => {
    try {
      setUpdatedStatus("success"); // Set updatedStatus to "success"
      await axios.patch(
        `${apiBaseUrl}/admin/savings/${savingsId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchSavings(); // Refetch the withdrawals to display updated data
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#21635f" size={35} />
        </div>
      ) : (
        <DefaultLayout>
          <Breadcrumb pageName="Savings" />
          <div>
            <table className="bg-white w-full">
              <thead>
                <tr>
                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Transaction ID
                  </th>

                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Amount
                  </th>
                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Date
                  </th>
                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {savings.map((saving) => (
                  <tr key={saving._id}>
                    <td className=" border border-[#ccc] px-4 py-2 text-xs  w-48">
                      {saving._id}
                    </td>

                    <td className=" border border-[#ccc] px-4 py-2 text-xs  w-48">
                      ${saving.amount}
                    </td>
                    <td className="border border-[#ccc] px-4 py-2 text-xs  w-48">
                      {new Date(saving.date).toLocaleDateString()}
                    </td>
                    <td className="border border-[#ccc]  px-4 py-2 text-xs  w-48">
                      {saving.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DefaultLayout>
      )}
    </div>
  );
};

export default SavingsTransactions;
