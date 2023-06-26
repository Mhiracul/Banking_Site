import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownSelect from "react-dropdown-select";
import { MdOutlineSavings } from "react-icons/md";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../config";
function Savings() {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("30days");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [reasons, setReasons] = useState([]);
  const [interestRate, setInterestRate] = useState(5);

  const handleReasonClick = (selectedReason) => {
    if (selectedReason === reason) {
      setReason(""); // Deselect the reason
    } else {
      setReason(selectedReason); // Select the reason
    }
  };

  useEffect(() => {
    const fetchDynamicValues = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/dynamic-values`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        setReasons(response.data.reasons);
      } catch (error) {
        console.log("An error occurred while fetching dynamic values:", error);
      }
    };

    const fetchInterestRate = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/interest-rate`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        setInterestRate(response.data.interestRate);
        console.log(interestRate);
      } catch (error) {
        console.log(
          "An error occurred while fetching the interest rate:",
          error
        );
      }
    };

    fetchDynamicValues();
    fetchInterestRate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseUrl}/savings`,
        {
          amount,
          duration,
          reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      toast.success("Savings created successfully.");

      // Update the account balance in the database

      toast.success(
        "Dear customer, your savings will be processed or approved within 5 minutes."
      );
    } catch (error) {
      toast.error("An error occurred while creating savings.");
    }
  };

  const handleDurationChange = (selected) => {
    if (selected.length > 0) {
      setDuration(selected[0].value); // Update the duration state
    }
  };

  return (
    <DefaultLayouts>
      <div className="mx-auto max-w-270 ">
        <UserTop pageName="Savings" />
        <div className=" ">
          <div className="mt-8 px-10 py-8 h-full  overflow-y-auto bg-white rounded-md ">
            <h1 className="text-2xl font-bold mb-4 text-[#123831]">
              Savings App
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Savings amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="amount"
                  className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Min $1000 - Max $100,000,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={1000} // Set the minimum value to 1000
                  max={10000000} // Set the maximum value to 10000000
                  required
                />
                {amount < 1000 && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter an amount greater than or equal to $1000.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <DropdownSelect
                  options={[
                    { value: "30days", label: "30 days" },
                    { value: "3months", label: "3 months" },
                    { value: "6months", label: "6 months" },
                    { value: "1year", label: "1 year" },
                  ]}
                  value={[{ value: duration, label: duration }]}
                  onChange={handleDurationChange}
                  placeholder="Select duration"
                  className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="reason"
                >
                  Reason
                </label>
                <textarea
                  id="reason"
                  className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              <button
                className="bg-[#21635f] hover:bg-[#23867f] text-white w-full font-bold py-2 px-4 rounded mt-4"
                type="submit"
              >
                Create Savings
              </button>

              <div className="">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 w-full">
                  {reasons.map((dynamicReason, index) => (
                    <div
                      key={index}
                      className={`shadow-md shadow-gray-500 rounded-md items-center flex flex-col bg-[#d9d9d9] hover:bg-[#e3e2e2] w-full px-3 py-3 ${
                        reason === dynamicReason
                          ? "border-2 border-green-500"
                          : ""
                      }`}
                      onClick={() => handleReasonClick(dynamicReason)}
                    >
                      <MdOutlineSavings size={40} color="#e6a34b" />
                      <h1 className="text-[#e6a34b] font-bold mt-2">
                        {dynamicReason}
                      </h1>
                      <p className="text-gray-500 text-xs text-center mt-2">
                        Join 33,914 others saving towards this target
                      </p>
                      {reason === dynamicReason ? (
                        <button
                          className="border-2 border-green-500 hover:text-white font-bold text-white text-xs rounded-md px-3 py-1 mt-2"
                          onClick={() => handleReasonClick(dynamicReason)}
                        >
                          {reason === dynamicReason ? "Deselect" : "Selected"}
                        </button>
                      ) : (
                        <button
                          className="border-2 border-green-500 hover:text-white font-bold text-white text-xs rounded-md px-3 py-1 mt-2"
                          onClick={() => handleReasonClick(dynamicReason)}
                        >
                          Select
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayouts>
  );
}

export default Savings;
