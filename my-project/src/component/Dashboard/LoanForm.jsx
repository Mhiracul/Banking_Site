import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";
import UserTop from "../UserTop";
import AdComponent from "../AdComponent";
import axios from "axios";
import DefaultLayouts from "../../User/layoutt/DefaultLayouts";
import { apiBaseUrl } from "../../../config";
const override = css`
  display: block;
  margin: 0 auto;
`;

const LoanForm = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(0);

  const [showDepositMessage, setShowDepositMessage] = useState(false);
  const [selectedRepayDays, setSelectedRepayDays] = useState(null);
  const [presumedDueDate, setPresumedDueDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // Added state for selected option
  const [paymentPlan, setPaymentPlan] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let installmentCount = 0;
      let installmentAmount = 0;
      let installmentInterval = "";

      if (selectedRepayDays === 14) {
        installmentCount = 2;
        installmentAmount = Math.floor(loanAmount / installmentCount);
        installmentInterval = "7 days";
      } else if (selectedRepayDays === 30) {
        installmentCount = 2;
        installmentAmount = Math.floor(loanAmount / installmentCount);
        installmentInterval = "15 days";
      } else if (selectedRepayDays === 60) {
        installmentCount = 2;
        installmentAmount = Math.floor(loanAmount / installmentCount);
        installmentInterval = "1 month";
      } else if (selectedRepayDays === 90) {
        installmentCount = 3;
        installmentAmount = Math.floor(loanAmount / installmentCount);
        installmentInterval = "3 months";
      }

      const installments = Array.from(
        { length: installmentCount },
        (_, index) => {
          const daysToAdd = (index * selectedRepayDays) / installmentCount;
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + daysToAdd);
          return {
            amount: installmentAmount,
            dueDate,
          };
        }
      );

      const requestBody = {
        amount: loanAmount,
        installments,
      };
      console.log(requestBody);

      await axios.post(`${apiBaseUrl}/loans`, requestBody, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      setPaymentPlan(installments);

      alert("Loan payment recorded successfully");
      setLoanAmount("");
      setSelectedRepayDays(null);
    } catch (error) {
      console.error("Error recording loan payment:", error);
      alert("Failed to record loan payment");
    }
  };

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/account`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const { accountBalance } = response.data;
        setAccountBalance(accountBalance);

        if (accountBalance < 10000) {
          setShowDepositMessage(true);
        }
      } catch (error) {
        console.error("Failed to fetch account balance:", error);
      }
    };

    fetchAccountBalance();
  }, []);

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleRepayDaysClick = (days) => {
    setSelectedRepayDays(days);
    setSelectedOption(days);

    const totalAmount = Number(loanAmount) + Number(loanAmount) * 0.003;
    const installmentCount = Math.ceil(days / 30);
    const installment = Math.floor(totalAmount / installmentCount);

    setInstallmentAmount(installment);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    setPresumedDueDate(dueDate);
  };

  return (
    <DefaultLayouts>
      <div className="mx-auto max-w-270 font-nunito">
        <UserTop pageName="Loan" />

        <div className="mt-8  overflow-scroll overflow-y-auto md:flex md:flex-row flex flex-col gap-8">
          <div className="w-full px-4 py-6 bg-white rounded-md">
            <label className="block  md:text-sm text-xs ">Loan Amount</label>
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="absolute inset-0 w-full h-full px-2 py-2 border-b border-gray-300 outline-none bg-transparent text-sm"
                  placeholder="Enter Loan Amount"
                />
                <div className="absolute inset-0 pointer-events-none"></div>
              </div>
            </div>

            <label className="block mt-10  text-xs">
              Repay Day{" "}
              {selectedRepayDays ? `(${selectedRepayDays} days)` : null}
            </label>
            <div className="flex justify-between mb-4 mt-4">
              <button
                className={`${
                  selectedRepayDays === 14
                    ? "bg-[#277768] text-white"
                    : "bg-transparent border "
                } text-[#277768] hover:bg-[#3dae99] hover:text-white text-xs rounded-md px-3 py-1`}
                onClick={() => handleRepayDaysClick(14)}
              >
                14 days {selectedOption === 14 && "(Selected)"}
              </button>
              <button
                className={`${
                  selectedRepayDays === 30
                    ? "bg-[#277768] text-white"
                    : "bg-transparent border"
                } text-[#277768] hover:bg-[#3dae99] hover:text-white text-xs rounded-md px-3 py-1`}
                onClick={() => handleRepayDaysClick(30)}
              >
                30 days {selectedOption === 30 && "(Selected)"}
              </button>
              <button
                className={`${
                  selectedRepayDays === 60
                    ? "bg-[#277768] text-white"
                    : "bg-transparent border"
                } text-[#277768] hover:bg-[#3dae99] hover:text-white text-xs rounded-md px-3 py-1`}
                onClick={() => handleRepayDaysClick(60)}
              >
                60 days {selectedOption === 60 && "(Selected)"}
              </button>
              <button
                className={`${
                  selectedRepayDays === 90
                    ? "bg-[#277768] text-white"
                    : "bg-transparent border "
                } text-[#277768]  hover:bg-[#3dae99] hover:text-white text-xs rounded-md px-3 py-1`}
                onClick={() => handleRepayDaysClick(90)}
              >
                90 days {selectedOption === 90 && "(Selected)"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xs">
                Installment Amount: $
                {installmentAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs">
                Presumed Due Date:{" "}
                {presumedDueDate && presumedDueDate.toDateString()}
              </p>
            </div>

            <button
              className={`${
                loanAmount === "" || selectedRepayDays === null
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#277768]  hover:bg-[#3dae99] hover:text-white"
              } block w-full mt-4 p-3 rounded-md text-white font-bold text-xs`}
              onClick={handleSubmit}
              disabled={loanAmount === "" || selectedRepayDays === null}
            >
              {isSubmitting ? (
                <ScaleLoader
                  color={"#ffffff"}
                  loading={isSubmitting}
                  css={override}
                  size={150}
                />
              ) : (
                "Submit"
              )}
            </button>

            <>
              <h2 className="text-lg font-bold mb-2">Payment Plan</h2>

              <ul>
                {paymentPlan.map((installment, index) => (
                  <li key={index}>
                    Installment{index + 1}: $
                    {installment.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    <br />
                    Due Date: {installment.dueDate.toDateString()}
                  </li>
                ))}
              </ul>
            </>
          </div>
          <div className="w-full px-4 py-6 bg-white rounded-md">
            {showDepositMessage ? (
              <div>
                <h2 className="text-lg font-bold mb-2">
                  Deposit Required: $10,000
                </h2>
                <p className="text-sm mb-4">
                  Your account balance is below the required amount to take a
                  loan. Please make a deposit to proceed.
                </p>
                <button className="bg-[#277768] hover:bg-[#3dae99] hover:text-white text-white text-xs rounded-md px-3 py-1">
                  Deposit Now
                </button>
              </div>
            ) : (
              <AdComponent />
            )}
          </div>
        </div>
      </div>
    </DefaultLayouts>
  );
};

export default LoanForm;
