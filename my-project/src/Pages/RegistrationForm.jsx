import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../config";

const Dropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white px-4 py-2 border rounded-md w-full flex items-center outline-none justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ${isOpen ? "transform rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M10.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-full bg-white shadow-lg rounded-md">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RegistrationForm = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    country: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    console.log("Updated form data:", {
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      userName,
      email,
      password,
      confirmPassword,
      country,
      state,
    } = formData;
    if (
      firstName &&
      userName &&
      email &&
      password &&
      confirmPassword &&
      country &&
      state
    ) {
      if (password === confirmPassword) {
        const registrationData = {
          firstName,
          userName,
          email,
          password,
          confirmPassword,
          country, // Add country property
          state, // Add state property
        };

        try {
          const response = await fetch(`${apiBaseUrl}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
          }

          const dataRes = await response.json();
          toast(dataRes.message);
          if (dataRes.message === "User registered successfully") {
            navigate(`/verify?userName=${encodeURIComponent(userName)}`);
          }
        } catch (error) {
          console.error("Error occurred while registering the user:", error);
        }
      } else {
        alert("Password and confirm password do not match");
      }
    } else {
      alert("Please enter all required fields");
    }
  };

  const countryOptions = [
    { value: "", label: "Select a country" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
  ];

  const stateOptions = [
    { value: "", label: "Select a state" },
    { value: "New York", label: "New York" },
    { value: "California", label: "California" },
  ];

  return (
    <div
      className="w-full absolute h-screen overflow-y-auto overflow-hidden bg-cover bg-center bg-opacity-10"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/1137281183/photo/stack-of-multicolored-credit-cards-close-up-view-with-selective-focus.jpg?b=1&s=170667a&w=0&k=20&c=F-ueJD2p9rtPwOnCwOeR9oqvdgtRjmhGf782EPdDc4g=)",
      }}
    >
      <div className="w-full h-screen px-2 py-10 bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20">
        <div className="max-w-lg w-full px-3  mx-auto bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20  py-6 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mt-8 text-[#E1FFA0]">
              FinFlow Registration
            </h1>
            <h1 className="text-3xl font-semibold text-white mt-4">
              Welcome To FinFlow.com!
            </h1>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder=" First Name *"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mt-8">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder=" Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mt-4">
              <Dropdown
                options={countryOptions}
                selectedOption={formData.country}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "country", value: option.value },
                  })
                }
              />
            </div>

            <div className="mt-4">
              <Dropdown
                options={stateOptions}
                selectedOption={formData.state}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "state", value: option.value },
                  })
                }
              />
            </div>

            <div className="mt-8">
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Username *"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mt-8">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="mt-8 flex items-center bg-white rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-l-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="8"
              />
              <span
                className="flex text-xl cursor-pointer bg-white p-3 rounded-r-md"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <div className="mt-8 flex items-center bg-white rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                minLength="8"
              />
              <span
                className="flex text-xl cursor-pointer bg-white p-3 rounded-r-md"
                onClick={handleConfirmPassword}
              >
                {confirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <div className="mt-8 text-center flex justify-center">
              <label htmlFor="agreeToTerms" className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <span className="text-sm text-white">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E1FFA0] underline"
                  >
                    Terms and Conditions
                  </a>
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full px-4 py-2 bg-[#E1FFA0] text-black rounded-md hover:bg-[#22706b] hover:text-white focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>

            <p className="text-white text-center mt-8">
              Already have an account?{" "}
              <span className="text-[#E1FFA0]">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
