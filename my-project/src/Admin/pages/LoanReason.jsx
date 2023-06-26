import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
const apiUrl = `${apiBaseUrl}/admin/dynamic-values`; // Replace with your API endpoint

const LoanReason = () => {
  const [message, setMessage] = useState("");
  const [reasons, setReasons] = useState([]);

  const handleSave = () => {
    const dynamicValues = {
      message,
      reasons,
    };

    axios
      .post(apiUrl, dynamicValues)
      .then((response) => {
        toast.success(response.data.message); // Success message from the server
      })
      .catch((error) => {
        toast.error("Error:", error);
      });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Loan Reason" />
        <div className="flex flex-col gap-3 p-2 py-20 bg-[#fff]  dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />

          <label htmlFor="reasons">Reasons:</label>
          <input
            type="text"
            id="reasons"
            value={reasons}
            onChange={(e) => setReasons(e.target.value.split(","))}
            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
          <button
            onClick={handleSave}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
          >
            Save
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoanReason;
