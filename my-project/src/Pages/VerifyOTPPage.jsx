import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../config";
const VerifyOTPPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get("userName");

  const [otp, setOTP] = useState("");

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform OTP verification using the userName and otp values
    const otpVerificationData = {
      userName,
      otp,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otpVerificationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const dataRes = await response.json();
      console.log(dataRes);
      navigate("/login");
      // Handle successful OTP verification
    } catch (error) {
      console.error("Error occurred while verifying OTP:", error);
      // Handle error
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-lg w-[80%] my-auto  mx-auto bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20 px-8 py-10 rounded-md">
        <h1 className="text-white font-bold text-xl text-center mb-2 uppercase">
          OTP Verification
        </h1>
        <p className=" bg-gradient bg-gradient-to-br from-[#04eac0] to-transparent bg-opacity-20  text-[#fff] font-medium p-2 rounded-md">
          Please enter the OTP sent to your email to complete the registration
          process.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={otp}
            onChange={handleOTPChange}
            placeholder="Enter OTP"
            className="border border-stroke rounded-md p-2 w-full outline-none"
          />
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-[#21635f] text-white rounded-md hover:bg-[#22706b] hover:text-white focus:outline-none focus:bg-blue-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
