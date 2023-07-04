import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import DefaultLayout from "../layout/DefaultLayout";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import axios from "axios";
const TabGroup = () => {
  const [
    registrationConfirmationTemplate,
    setRegistrationConfirmationTemplate,
  ] = useState("");

  const [withdrawalConfirmationTemplate, setWithdrawalConfirmationTemplate] =
    useState("");

  const [loanConfirmationTemplate, setLoanConfirmationTemplate] = useState("");
  const [savingsContent, setSavingsContent] = useState("");
  const [depositConfirmationTemplate, setDepositConfirmationTemplate] =
    useState("");

  useEffect(() => {
    getEmailTemplate();
  }, []);
  const getEmailTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/get-email-template`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { registrationConfirmationTemplate } = response.data;
      setRegistrationConfirmationTemplate(registrationConfirmationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  const updateRegistrationConfirmationTemplate = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-template`,
        {
          updatedRegistrationConfirmationTemplate:
            registrationConfirmationTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Email Template Updated Successfully"); // Success message from the server
    } catch (error) {
      console.log(error);
      // Handle the error, show an error message, etc.
    }
  };

  // ...

  const handleTemplateChange = (e) => {
    setRegistrationConfirmationTemplate(e.target.value);
  };

  useEffect(() => {
    getWithdrawalTemplate();
  }, []);
  const getWithdrawalTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/get-email-withdrawal`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { withdrawalConfirmationTemplate } = response.data;
      setWithdrawalConfirmationTemplate(withdrawalConfirmationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  const updateWithdrawalConfirmationTemplate = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-withdrawal`,
        {
          updatedWithdrawalConfirmationTemplate: withdrawalConfirmationTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Email Template Updated Successfully"); // Success message from the server
    } catch (error) {
      console.log(error);
      // Handle the error, show an error message, etc.
    }
  };

  const handleWithdrawChange = (e) => {
    setWithdrawalConfirmationTemplate(e.target.value);
  };

  useEffect(() => {
    getLoanTemplate();
  }, []);
  const getLoanTemplate = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/get-email-loan`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const { loanConfirmationTemplate } = response.data;
      setLoanConfirmationTemplate(loanConfirmationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  const updateLoanConfirmationTemplate = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-loan`,
        {
          updatedLoanConfirmationTemplate: loanConfirmationTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Email Template Updated Successfully"); // Success message from the server
    } catch (error) {
      console.log(error);
      // Handle the error, show an error message, etc.
    }
  };

  const handleLoanChange = (e) => {
    setLoanConfirmationTemplate(e.target.value);
  };

  useEffect(() => {
    getSavingsTemplate();
  }, []);

  const getSavingsTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/get-email-savings`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { savingsContent } = response.data;
      setSavingsContent(savingsContent);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  const updateSavingsContent = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-savings`,
        {
          updatedSavingsContent: savingsContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Email Template Updated Successfully"); // Success message from the server
    } catch (error) {
      console.log(error);
      // Handle the error, show an error message, etc.
    }
  };

  const handleSavingsChange = (e) => {
    setSavingsContent(e.target.value);
  };

  useEffect(() => {
    getDepositTemplate();
  }, []);

  const getDepositTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/get-email-deposit`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { depositConfirmationTemplate } = response.data;
      setDepositConfirmationTemplate(depositConfirmationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  const updateDepositConfirmationTemplate = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-deposit`,
        {
          updatedDepositConfirmationTemplate: depositConfirmationTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Email Template Updated Successfully"); // Success message from the server
    } catch (error) {
      console.log(error);
      // Handle the error, show an error message, etc.
    }
  };

  const handleDepositChange = (e) => {
    setDepositConfirmationTemplate(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Mail" />
        <div className=" gap-6">
          <div className="col-span-1">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-lg font-bold mb-2">Mail Templates</h4>
              <p className="text-gray-500 mb-4">Edit Mail Templates</p>
              <Tab.Group>
                <div className="">
                  <Tab.List className="flex border-b overflow-x-auto border-gray-200 mb-4">
                    <Tab
                      className={({ selected }) =>
                        `py-2 px-4 font-medium outline-none flex items-center ${
                          selected
                            ? "border-b-2 outline-none border-blue-500"
                            : ""
                        }`
                      }
                    >
                      <i className="fa fa-info mr-2"></i> Registration
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `py-2 px-4 font-medium outline-none flex items-center ${
                          selected ? "border-b-2 border-blue-500" : ""
                        }`
                      }
                    >
                      <i className="fa fa-user mr-2"></i> Withdrawal
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `py-2 px-4 font-medium outline-none flex items-center ${
                          selected ? "border-b-2 border-blue-500" : ""
                        }`
                      }
                    >
                      <i className="fa fa-cube mr-2"></i> Loan
                    </Tab>

                    <Tab
                      className={({ selected }) =>
                        `py-2 px-4 font-medium outline-none flex items-center ${
                          selected ? "border-b-2 border-blue-500" : ""
                        }`
                      }
                    >
                      <i className="fa fa-cube mr-2"></i> Savings
                    </Tab>

                    <Tab
                      className={({ selected }) =>
                        `py-2 px-4 font-medium outline-none flex items-center ${
                          selected ? "border-b-2 border-blue-500" : ""
                        }`
                      }
                    >
                      <i className="fa fa-cube mr-2"></i> Deposit
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels>
                  <Tab.Panel>
                    <div>
                      <h1>Edit Email Template</h1>
                      <textarea
                        value={registrationConfirmationTemplate}
                        onChange={handleTemplateChange}
                        rows={10}
                        cols={50}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={updateRegistrationConfirmationTemplate}
                        className=" w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      >
                        Save Registration Template
                      </button>
                    </div>

                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Instructions
                      </h2>
                      <p>
                        To edit the registration email templates, replace the
                        placeholders
                        <span className="font-mono bg-gray-200 p-1">
                          {"{accountNo}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{password}"}
                        </span>{" "}
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{otp}"}
                        </span>
                        , and
                        <span className="font-mono bg-gray-200 p-1">
                          {"{userName}"}
                        </span>{" "}
                        with the actual values you want to include in the email.
                      </p>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div>
                      <h1>Edit Withdrawal Mail Template</h1>
                      <textarea
                        value={withdrawalConfirmationTemplate}
                        onChange={handleWithdrawChange}
                        rows={10}
                        cols={50}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={updateWithdrawalConfirmationTemplate}
                        className=" w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      >
                        Save Withdrawal Template
                      </button>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Instructions
                      </h2>
                      <p>
                        To edit the withdrawal email templates, replace the
                        placeholders
                        <span className="font-mono bg-gray-200 p-1">
                          {"{amount}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{balance}"}
                        </span>{" "}
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{transactionId}"}
                        </span>{" "}
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{type}"}
                        </span>{" "}
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{wallet}"}
                        </span>{" "}
                        <span className="font-mono bg-gray-200 p-1">
                          {"{userName}"}
                        </span>
                        , and
                        <span className="font-mono bg-gray-200 p-1">
                          {"{date}"}
                        </span>{" "}
                        with the actual values you want to include in the email.
                      </p>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div>
                      <h1 className="font-medium">Edit Loan Mail Template</h1>
                      <textarea
                        value={loanConfirmationTemplate}
                        onChange={handleLoanChange}
                        rows={10}
                        cols={50}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={updateLoanConfirmationTemplate}
                        className=" w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      >
                        Save Loan Template
                      </button>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Instructions
                      </h2>
                      <p>
                        To edit the loan email templates, replace the
                        placeholders
                        <span className="font-mono bg-gray-200 p-1">
                          {"{userName}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{amount}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{installments}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{date}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{transactionId}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{balance}"}
                        </span>{" "}
                        with the actual values you want to include in the email.
                      </p>
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <div>
                      <h1 className="font-medium">
                        Edit Savings Mail Template
                      </h1>
                      <textarea
                        value={savingsContent}
                        onChange={handleSavingsChange}
                        rows={10}
                        cols={50}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={updateSavingsContent}
                        className="w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      >
                        Save Savings Template
                      </button>
                    </div>

                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Instructions
                      </h2>
                      <p>
                        To edit the savings email templates, replace the
                        placeholders
                        <span className="font-mono bg-gray-200 p-1">
                          {"{userName}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{amount}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{duration}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{reason}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{date}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{transactionId}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{balance}"}
                        </span>{" "}
                        with the actual values you want to include in the email.
                      </p>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div>
                      <h1 className="font-medium">
                        Edit Deposit Mail Template
                      </h1>
                      <textarea
                        value={depositConfirmationTemplate}
                        onChange={handleDepositChange}
                        rows={10}
                        cols={50}
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <button
                        onClick={updateDepositConfirmationTemplate}
                        className="w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      >
                        Save Deposit Template
                      </button>
                    </div>
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Instructions
                      </h2>
                      <p>
                        To edit the deposit email templates, replace the
                        placeholders
                        <span className="font-mono bg-gray-200 p-1">
                          {"{userName}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{amount}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{selectedMethod}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{selectedCrypto}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{bankName}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{bankNumber}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{date}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{transactionId}"}
                        </span>
                        ,
                        <span className="font-mono bg-gray-200 p-1">
                          {"{balance}"}
                        </span>{" "}
                        with the actual values you want to include in the email.
                      </p>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default TabGroup;
