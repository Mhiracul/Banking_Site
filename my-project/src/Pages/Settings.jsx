import React, { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import { FaMoneyCheck } from "react-icons/fa";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import { apiBaseUrl } from "../../config";
import { ClipLoader } from "react-spinners";

const Settings = ({ onSettingsUpdate }) => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    bankName: "",
    accountNumber: "",
    bicSwiftCode: "",
    bitcoinWalletAddress: "",
    tetherWalletAddress: "",
    image: "",
  });
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const toggleBankDetails = () => {
    setShowBankDetails(!showBankDetails);
  };

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true initially
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Simulate a 2-second loading delay (adjust as needed)
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/profile`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const { data } = response; // Destructure the response data

        setFormData((prevFormData) => ({
          ...prevFormData,
          email: data.email,
          phoneNumber: data.phoneNumber,
          accountNumber: data.accountNumber,
          gender: data.gender,
          bitcoinWalletAddress: data.bitcoinWalletAddress,
          tetherWalletAddress: data.tetherWalletAddress,
        }));
      } catch (error) {
        console.error("Error retrieving profile data:", error);
        // Handle error
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${apiBaseUrl}/profile`, formData, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      console.log(response.data); // Success message
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      console.log(base64Image);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: base64Image,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex bg-[#116f6a] justify-center items-center h-screen">
          <ClipLoader color="#34a49f" size={35} />
        </div>
      ) : (
        <DefaultLayouts>
          <div className="mx-auto max-w-270 font-nunito">
            <UserTop pageName="Profile" />
            <div className=" mt-12 overflow-y-auto pb-4">
              <div className="settings__wrapper  rounded-lg ">
                <div className="details__form">
                  <div className="bg-white h-full rounded-md p-8 shadow-lg shadow-gray-600">
                    <h2 className="profile__title font-semibold mb-5 text-black">
                      Profile Settings
                    </h2>

                    <form onSubmit={handleSubmit} className="">
                      <div className="form__group  flex md:flex-row flex-col gap-8 mb-6 ">
                        <div className="w-1/2">
                          <label className="text-gray-500 text-xs">Email</label>
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="text-gray-500 text-xs ">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            placeholder="+880 17*******"
                            className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        className="w-full mb-3 py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                        value="Bank Details"
                        onClick={toggleBankDetails}
                        readOnly
                      />

                      {showBankDetails && (
                        <div className="bank-details">
                          <div className="form__group  mb-3">
                            <label className="text-gray-500 text-xs">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              placeholder="Bank Name"
                              className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                              name="bankName"
                              value={formData.bankName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form__group mb-3">
                            <label className="text-gray-500 text-xs">
                              Account Number
                            </label>
                            <input
                              type="text"
                              placeholder="Account Number"
                              className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                              name="accountNumber"
                              value={formData.accountNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form__group mb-3">
                            <label className="text-gray-500 text-xs">
                              BIC/Swift Code
                            </label>
                            <input
                              type="text"
                              placeholder="BIC/Swift Code"
                              className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                              name="bicSwiftCode"
                              value={formData.bicSwiftCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="form__group flex gap-8 mb-3">
                        <div className="w-1/2 relative">
                          <label className="text-gray-500 text-xs">
                            Bitcoin Wallet Address
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Bitcoin Wallet Address"
                              className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none pr-12"
                              name="bitcoinWalletAddress"
                              value={formData.bitcoinWalletAddress}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="w-1/2 relative">
                          <label className="text-gray-500 text-xs">
                            Tether Wallet Address
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Tether Wallet Address"
                              className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none pr-12"
                              name="tetherWalletAddress"
                              value={formData.tetherWalletAddress}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form__group mb-3">
                        <label className="text-gray-500 text-xs">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          name="image"
                          className="w-full py-3 px-4 rounded-lg bg-transparent border border-green-300 text-gray-800 text-xs outline-none"
                          onChange={handleImageUpload}
                        />
                      </div>

                      <div className=" flex gap-7">
                        <button className="bg-[#c12020] px-10 py-2 text-white text-xs rounded-md">
                          Delete
                        </button>
                        <button
                          type="submit"
                          className="bg-[#17774a] px-10 py-2 text-white text-xs rounded-md"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayouts>
      )}
    </div>
  );
};

export default Settings;
