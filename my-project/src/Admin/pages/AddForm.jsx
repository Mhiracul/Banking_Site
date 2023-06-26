import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
const AddForm = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${apiBaseUrl}/${userId}/balance/add`,
        { amount },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      // Handle success
      toast.success("Account added successfully");
    } catch (error) {
      // Handle error
      toast.error("Error adding: " + error.message);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Add" />
        <div className="rounded-lg h-96 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="h-96 max-w-sm mx-auto flex flex-col justify-center"
          >
            <label>
              User ID:
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border border-stroke rounded-md p-2 w-full outline-none"
                required
              />
            </label>
            <br />
            <label className="block mb-4">
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border border-stroke rounded-md p-2 w-full outline-none"
              />
            </label>
            <button
              type="submit"
              className="bg-primary outline-none text-white py-2 px-4 rounded-md"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddForm;
