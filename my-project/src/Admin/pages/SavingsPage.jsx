import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { apiBaseUrl } from "../../../config";

function SavingsPage() {
  const [interestRate, setInterestRate] = useState("");

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleUpdateInterestRate = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to the backend API to update the interest rate
      await axios.put(
        `${apiBaseUrl}/admin/interest-rate`,
        {
          interestRate,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // Pass the auth token
          },
        }
      ); // Pass the headers object as the third argument

      toast.success("Interest rate updated successfully.");
    } catch (error) {
      console.error("Error updating interest rate:", error);
      toast.error("An error occurred while updating the interest rate.");
    }
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Interest" />

        <div className="bg-[#fff]  dark:bg-boxdark w-full  border border-stroke dark:border-strokedark shadow-md py-6 px-4 rounded-md">
          <form onSubmit={handleUpdateInterestRate}>
            <label>
              Interest Rate (%):
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={handleInterestRateChange}
                className="w-full rounded border border-stroke mb-5 mt-4 bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                required
              />
            </label>
            <button
              type="submit"
              className="flex justify-center rounded bg-primary w-full py-2 px-6 font-medium text-gray hover:shadow-1"
            >
              Update Interest Rate
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default SavingsPage;
