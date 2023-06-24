import React, { useState, useEffect } from "react";
import Select from "react-select";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import { toast } from "react-hot-toast";
import axios from "axios";
import chip from "../assets/chip.png";
import verve from "../assets/Verve-Logo.svg";
import { apiBaseUrl } from "../../config";
const VirtualCardRegistrationForm = () => {
  const [cardType, setCardType] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const cardTypes = [
    { value: "mastercard", label: "Mastercard" },
    { value: "verve", label: "Verve" },
    { value: "visa", label: "Visa" },
  ];

  const handleCardTypeChange = (selectedOption) => {
    setCardType(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast(
      "Your Order is processing... Your Virtual Card will be available in 3 days"
    );

    const data = {
      cardType,
      name,
      expiryDate,
    };

    try {
      const response = await axios.post(`${apiBaseUrl}/virtual-cards`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Calculate the expiry date in 3 years from now
  const calculateExpiryDate = () => {
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.getFullYear() + 3,
      currentDate.getMonth()
    );
    setExpiryDate(expiryDate.toISOString().substr(0, 10));
  };

  // Set the expiry date on component mount
  useEffect(() => {
    calculateExpiryDate();
  }, []);

  // Render the card image based on the selected card type
  const renderCardImage = () => {
    if (cardType === "mastercard") {
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
          alt="Mastercard"
          className="w-12 h-10"
        />
      );
    } else if (cardType === "verve") {
      return <img src={verve} alt="Verve" className="w-12 h-10" />;
    } else if (cardType === "visa") {
      return (
        <img
          src="https://spponeimages.azureedge.net/prod/2df62105-9e81-464c-a5ce-ab608de237d1Visa_Brandmark%20Thumb.png?v=0"
          alt="Visa"
          className="w-12 h-10"
        />
      );
    } else {
      return null;
    }
  };

  return (
    <DefaultLayouts>
      <div className="mx-auto max-w-270 ">
        <UserTop pageName="Virtual Card form" />
        <form
          onSubmit={handleSubmit}
          className="bg-white border-stroke mt-5 rounded-lg py-6 px-8"
        >
          <div>
            Card Type:
            <Select
              options={cardTypes}
              value={cardTypes.find((option) => option.value === cardType)}
              onChange={handleCardTypeChange}
              placeholder="Select Card Type"
              className="mt-2 border-stroke"
            />
          </div>
          <br />
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 border w-full border-stroke rounded-md py-2"
            />
          </label>
          <br />
          <div className="border border-stroke p-4 mt-4">
            <div
              className="bg-[#DBFF8E] bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent  
        bg-opacity-20 rounded-lg p-8 shadow-md py-10 w-full px-8 text-white mx-auto max-w-md"
            >
              <div className="flex flex-col mt-4">
                <div>
                  <img src={chip} alt="" className="w-10 h-10 ml-3" />
                </div>
                <div className="text-sm text-white rounded-lg px-4 py-2 text-left">
                  1234 5678 9012 3456
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-xs">{name}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-xs">{expiryDate}</p>
                    {renderCardImage()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="bg-[#34a49f] w-full rounded-md text-white mt-4 p-2 outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </DefaultLayouts>
  );
};

export default VirtualCardRegistrationForm;
