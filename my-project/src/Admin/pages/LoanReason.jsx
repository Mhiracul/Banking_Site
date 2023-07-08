import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
const apiUrl = `${apiBaseUrl}/admin/dynamic-values`; // Replace with your API endpoint

const LoanReason = () => {
  const [newMinimumLoanAmount, setNewMinimumLoanAmount] = useState("");

  useEffect(() => {
    fetchMinimumLoanAmount();
  }, []);

  const fetchMinimumLoanAmount = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/admin/minimum-loan-amount`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setNewMinimumLoanAmount(data.NewminimumLoanAmount);
    } catch (error) {
      console.error("Error retrieving minimum loan amount:", error);
      // Handle error state or display an error message
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiBaseUrl}/admin/minimum-loan-amount`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ newMinimumLoanAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      toast.success("Minimum loan amount updated successfully!");
      setNewMinimumLoanAmount("");
    } catch (error) {
      toast.error("Failed to update minimum loan amount: " + error.message);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Loan Reason" />

        <div>
          <form onSubmit={handleFormSubmit} className="mt-6 text-sm">
            <label htmlFor="minimumLoanAmount">Minimum Loan Amount:</label>
            <input
              type="number"
              id="minimumLoanAmount"
              name="minimumLoanAmount"
              value={newMinimumLoanAmount}
              onChange={(e) => setNewMinimumLoanAmount(e.target.value)}
              className="w-full mt-2 rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              required
            />
            <button
              type="submit"
              className="flex mt-3 outline-none justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoanReason;
