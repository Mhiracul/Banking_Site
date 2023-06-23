import React, { useState, useEffect } from "react";
import { BsClipboard, BsX } from "react-icons/bs";
import { TiClipboard } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { WiDirectionDown } from "react-icons/wi";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import DropdownSelect from "react-dropdown-select";
import icon from "../assets/icons8-done.gif";
const DepositForm = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedCryptoAddress, setSelectedCryptoAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [bankName, setBankName] = useState(""); // Add bankName state variable
  const [successMessage, setSuccessMessage] = useState(""); // Add successMessage state variable
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Add showSuccessMessage state variable

  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const api_url = "https://banking-6no4.onrender.com";
  const handleMethodChange = (selectedOptions) => {
    setSelectedMethod(selectedOptions[0]);
  };

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      const response = await axios.get("api_url/cryptos");
      setCryptocurrencies(response.data);
      if (response.data.length > 0) {
        setSelectedCryptoAddress(response.data[0].address);
        setSelectedCrypto(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(selectedCryptoAddress)
      .then(() => {
        toast.success("Crypto address copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying address:", error);
        toast.error("Failed to copy crypto address");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      toast.error("Please log in to deposit.");
      return;
    }
    try {
      const response = await axios.post(
        "api_url/deposits",
        {
          depositAmount,
          selectedCryptoAddress,
          selectedMethod: selectedMethod.value,
          bankName,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // Pass the auth token
          },
        }
      );
      // Handle the response as needed
      console.log(response.data);
      toast.success("Deposit successful");
      setSuccessMessage(
        "Thank you for using FinFlow, your deposit is processing...."
      );
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error depositing:", error);
      toast.error("Failed to deposit");
    }
  };

  const handleCryptoChange = (selectedOptions) => {
    const selectedCryptoOption = selectedOptions[0];
    setSelectedCrypto(selectedCryptoOption);
    setSelectedCryptoAddress(selectedCryptoOption?.address || "");
  };
  const isLoggedIn = () => {
    const authToken = localStorage.getItem("token");
    return authToken !== null;
  };

  const renderForm = () => {
    return (
      <>
        <div className="mt-4 text-sm bg-white  border-gray-400 w-full">
          <label htmlFor="paymentMethod" className="font-medium text-sm p-2 ">
            Payment Method:
          </label>

          <DropdownSelect
            id="paymentMethod"
            options={[
              { label: "Cryptocurrency", value: "crypto" },
              { label: "Wire Transfer", value: "wire" },
            ]}
            values={selectedMethod ? [selectedMethod] : []}
            onChange={(selectedOptions) => handleMethodChange(selectedOptions)}
            labelField="label"
            valueField="value"
            clearable={false}
            dropdownHandleRenderer={() => (
              <WiDirectionDown size={20} className="text-gray-600" />
            )}
            dropdownGap={0}
            searchable={false}
            dropdownHeight="auto"
            direction="ltr"
            dropdownPosition="bottom"
            keepSelectedInList={false}
            closeOnSelect={true}
            style={{
              control: (base) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                width: "100%",
              }),
            }}
          />
        </div>

        {/* Cryptocurrency Form */}
        {selectedMethod && selectedMethod.value === "crypto" && (
          <div className="mt-4 w-full ">
            <label htmlFor="cryptoSelect" className="font-medium text-sm">
              Select Cryptocurrency:
            </label>
            <DropdownSelect
              id="cryptoSelect"
              options={cryptocurrencies.map((crypto) => ({
                label: crypto.name,
                value: crypto._id,
                logo: crypto.logo,
                address: crypto.address,
                active: crypto.active,
              }))}
              values={selectedCrypto ? [selectedCrypto] : []}
              onChange={(selectedOptions) =>
                handleCryptoChange(selectedOptions)
              }
              labelField="label"
              valueField="value"
              clearable={false}
              dropdownHandleRenderer={() => (
                <WiDirectionDown size={20} className="text-gray-600" />
              )}
              dropdownGap={0}
              searchable={false}
              dropdownHeight="auto"
              direction="ltr"
              dropdownPosition="bottom"
              keepSelectedInList={false}
              closeOnSelect={true}
              style={{
                control: (base) => ({
                  ...base,
                  border: "none",
                  boxShadow: "none",
                  width: "100%",
                }),
              }}
            />
          </div>
        )}

        {/* Wire Transfer Form */}
        {selectedMethod && selectedMethod.value === "wire-transfer" && (
          <div className="mt-4">
            <label htmlFor="bankName" className="font-medium text-sm">
              Bank Name:
            </label>
            <input
              type="text"
              id="bankName"
              className="border border-gray-300 rounded-md px-2 py-1 mt-1"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            {/* Add other wire transfer form fields here */}
          </div>
        )}
      </>
    );
  };
  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false); // Hide the success message
  };
  return (
    <DefaultLayouts>
      <div className="mx-auto max-w-270 ">
        <UserTop pageName="Deposit" />
        {showSuccessMessage && ( // Check if the success message should be shown
          <div className="relative">
            <p className="bg-gradient bg-gradient-to-br from-[#043f34] to-transparent bg-opacity-20  text-[#fff] font-medium p-2 text-center rounded-md py-6  mt-2">
              ✅ {successMessage}
              <button
                className="absolute top-1 right-1 text-[#fff] focus:outline-none"
                onClick={handleCloseSuccessMessage}
              >
                <BsX />
              </button>
            </p>
          </div>
        )}

        <div className="">
          <div className="mt-6">
            <div className="bg-[#fff] rounded-md h-[548px] shadow-md p-4">
              <div className="grid grid-cols-1 gap-8">
                <div className="">
                  <h3 className="text-xl font-medium text-gray-800">
                    Deposit to your account
                  </h3>
                </div>
                <div className="">
                  <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                      <label
                        htmlFor="depositAmount"
                        className="font-medium text-sm"
                      >
                        Amount:
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <BsClipboard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="depositAmount"
                          id="depositAmount"
                          className=" outline-none  p-2 border-stroke block w-full pl-10 sm:text-sm  rounded-md"
                          placeholder="Enter deposit amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {renderForm()}

                    <div className="flex items-center mt-4">
                      <button
                        type="submit"
                        className="bg-[#21635f] hover:bg-[#23867f]  text-white w-full font-medium py-2 px-4 rounded-md outline-none"
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                  <p className="mt-4 bg-[#21635f]  text-white p-4 text-xs rounded-md">
                    Note: Please copy the Wallet Address provided below and make
                    the payment. After completing the payment, click on the "I
                    have paid" button to proceed. Please ensure that you copy
                    the address accurately and double-check before making the
                    payment. Once the payment is made, click on the "I have
                    paid" button to continue with the process.
                    <br />
                    <div className="flex md:flex-row flex-col  items-center mt-4">
                      {selectedCryptoAddress && (
                        <>
                          Wallet Address: {selectedCryptoAddress}
                          <button
                            className="ml-2 focus:outline-none gap-1 flex "
                            onClick={handleCopyClick}
                          >
                            <TiClipboard size={15} color="white" />{" "}
                            <p className="text-[#45dcd4] hover:text-[#57f4ec] font-medium capitalize">
                              {" "}
                              copy here
                            </p>
                          </button>
                        </>
                      )}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayouts>
  );
};

export default DepositForm;
