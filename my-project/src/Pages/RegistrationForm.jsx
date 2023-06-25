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
  const [availableStates, setAvailableStates] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [confirmPassword, setConfirmPassword] = useState(false);
  const handleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    country: "",
    state: "",
    currency: "",
    account: "",
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

    if (name === "country") {
      const selectedCountry = countryOptions.find(
        (option) => option.value === newValue
      );

      setAvailableStates(selectedCountry ? selectedCountry.states : []);
    }

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
      currency,
      account,
    } = formData;
    if (
      firstName &&
      userName &&
      email &&
      password &&
      confirmPassword &&
      country &&
      state &&
      currency &&
      account
    ) {
      if (password === confirmPassword) {
        const registrationData = {
          firstName,
          userName,
          email,
          password,
          confirmPassword,
          country, // Add country property
          state,
          currency,
          account, // Add state property
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
    {
      label: "United States",
      value: "USA",
      states: [
        { label: "California", value: "CA" },
        { label: "New York", value: "NY" },
        { label: "Texas", value: "TX" },
        { label: "Florida", value: "FL" },
        { label: "Illinois", value: "IL" },
        { label: "Pennsylvania", value: "PA" },
        { label: "Ohio", value: "OH" },
        { label: "Georgia", value: "GA" },
        { label: "North Carolina", value: "NC" },
        { label: "Michigan", value: "MI" },
        { label: "New Jersey", value: "NJ" },
        { label: "Virginia", value: "VA" },
        { label: "Washington", value: "WA" },
        { label: "Arizona", value: "AZ" },
        { label: "Massachusetts", value: "MA" },
        { label: "Tennessee", value: "TN" },
        { label: "Indiana", value: "IN" },
        { label: "Missouri", value: "MO" },
        { label: "Maryland", value: "MD" },
        { label: "Wisconsin", value: "WI" },
        // Add more states...
      ],
    },
    {
      label: "United Kingdom",
      value: "UK",
      states: [
        { label: "England", value: "ENG" },
        { label: "Scotland", value: "SCT" },
        { label: "Wales", value: "WLS" },
        { label: "Northern Ireland", value: "NIR" },
        // Add more states...
      ],
    },
    {
      label: "Canada",
      value: "CANADA",
      states: [
        { label: "Ontario", value: "ON" },
        { label: "Quebec", value: "QC" },
        { label: "British Columbia", value: "BC" },
        { label: "Alberta", value: "AB" },
        { label: "Manitoba", value: "MB" },
        { label: "Saskatchewan", value: "SK" },
        { label: "Nova Scotia", value: "NS" },
        { label: "New Brunswick", value: "NB" },
        { label: "Newfoundland and Labrador", value: "NL" },
        { label: "Prince Edward Island", value: "PE" },
        // Add more states...
      ],
    },
    {
      label: "Australia",
      value: "AUSTRALIA",
      states: [
        { label: "New South Wales", value: "NSW" },
        { label: "Victoria", value: "VIC" },
        { label: "Queensland", value: "QLD" },
        { label: "Western Australia", value: "WA" },
        { label: "South Australia", value: "SA" },
        { label: "Tasmania", value: "TAS" },
        { label: "Northern Territory", value: "NT" },
        { label: "Australian Capital Territory", value: "ACT" },
        // Add more states...
      ],
    },
    {
      label: "Germany",
      value: "GERMANY",
      states: [
        { label: "Berlin", value: "BER" },
        { label: "Bavaria", value: "BAV" },
        { label: "Hamburg", value: "HAM" },
        { label: "North Rhine-Westphalia", value: "NRW" },
        // Add more states...
      ],
    },
    {
      label: "France",
      value: "FRANCE",
      states: [
        { label: "Île-de-France", value: "IDF" },
        { label: "Provence-Alpes-Côte d'Azur", value: "PACA" },
        { label: "Auvergne-Rhône-Alpes", value: "ARA" },
        { label: "Occitanie", value: "OCC" },
        // Add more states...
      ],
    },
    {
      label: "Japan",
      value: "JAPAN",
      states: [
        { label: "Tokyo", value: "TOK" },
        { label: "Kanagawa", value: "KAN" },
        { label: "Osaka", value: "OSA" },
        { label: "Aichi", value: "AIC" },
        // Add more states...
      ],
    },
    {
      label: "China",
      value: "CHINA",
      states: [
        { label: "Beijing", value: "BJ" },
        { label: "Shanghai", value: "SH" },
        { label: "Guangdong", value: "GD" },
        { label: "Zhejiang", value: "ZJ" },
      ],
    },
    {
      label: "India",
      value: "INDIA",
      states: [
        { label: "Maharashtra", value: "MH" },
        { label: "Delhi", value: "DL" },
        { label: "Karnataka", value: "KA" },
        { label: "Tamil Nadu", value: "TN" },
      ],
    },
    {
      label: "Brazil",
      value: "BRAZIL",
      states: [
        { label: "São Paulo", value: "SP" },
        { label: "Minas Gerais", value: "MG" },
        { label: "Rio de Janeiro", value: "RJ" },
        { label: "Bahia", value: "BA" },
      ],
    },
    {
      label: "Mexico",
      value: "MEXICO",
      states: [
        { label: "Mexico City", value: "MEX" },
        { label: "Jalisco", value: "JAL" },
        { label: "Nuevo León", value: "NL" },
        { label: "Veracruz", value: "VER" },
      ],
    },
    {
      label: "Italy",
      value: "ITALY",
      states: [
        { label: "Lombardy", value: "LOM" },
        { label: "Lazio", value: "LAZ" },
        { label: "Campania", value: "CAM" },
        { label: "Sicily", value: "SIC" },
      ],
    },
    {
      label: "Spain",
      value: "SPAIN",
      states: [
        { label: "Madrid", value: "MAD" },
        { label: "Catalonia", value: "CAT" },
        { label: "Andalusia", value: "AND" },
        { label: "Valencia", value: "VAL" },
      ],
    },
    {
      label: "Russia",
      value: "RUSSIA",
      states: [
        { label: "Moscow", value: "MOW" },
        { label: "Saint Petersburg", value: "SPB" },
        { label: "Krasnodar Krai", value: "KDA" },
        { label: "Novosibirsk Oblast", value: "NVS" },
      ],
    },
    {
      label: "South Korea",
      value: "SOUTH KOREA",
      states: [
        { label: "Seoul", value: "SEO" },
        { label: "Busan", value: "BUS" },
        { label: "Incheon", value: "INC" },
        { label: "Gyeonggi Province", value: "GGP" },
      ],
    },
    {
      label: "Netherlands",
      value: "NL",
      states: [
        { label: "North Holland", value: "NHO" },
        { label: "South Holland", value: "SHO" },
        { label: "Utrecht", value: "UTR" },
        { label: "Gelderland", value: "GEL" },
      ],
    },

    {
      label: "Switzerland",
      value: "CH",
      states: [
        { label: "Zurich", value: "ZUR" },
        { label: "Geneva", value: "GEN" },
        { label: "Bern", value: "BER" },
        { label: "Vaud", value: "VAU" },
      ],
    },
    {
      label: "Sweden",
      value: "SE",
      states: [
        { label: "Stockholm County", value: "STC" },
        { label: "Skåne County", value: "SKC" },
        { label: "Västra Götaland County", value: "VGC" },
        { label: "Östergötland County", value: "OGC" },
      ],
    },
    {
      label: "Norway",
      value: "NO",
      states: [
        { label: "Oslo", value: "OSL" },
        { label: "Akershus", value: "AKR" },
        { label: "Rogaland", value: "ROG" },
        { label: "Hordaland", value: "HOR" },
      ],
    },
    {
      label: "Denmark",
      value: "DK",
      states: [
        { label: "Capital Region of Denmark", value: "CRD" },
        { label: "Central Denmark Region", value: "CDR" },
        { label: "Region of Southern Denmark", value: "RSD" },
        { label: "North Denmark Region", value: "NDR" },
      ],
    },
    {
      label: "Finland",
      value: "FI",
      states: [
        { label: "Uusimaa", value: "UUS" },
        { label: "Southwest Finland", value: "SFI" },
        { label: "Pirkanmaa", value: "PIR" },
        { label: "Kanta-Häme", value: "KHA" },
      ],
    },
    {
      label: "Singapore",
      value: "SG",
      states: [
        { label: "Central Region", value: "CTR" },
        { label: "East Region", value: "EAS" },
        { label: "North Region", value: "NOR" },
        { label: "West Region", value: "WES" },
      ],
    },
    {
      label: "Hong Kong",
      value: "HK",
      states: [
        { label: "Hong Kong Island", value: "HKI" },
        { label: "Kowloon", value: "KLN" },
        { label: "New Territories", value: "NTR" },
      ],
    },
    {
      label: "United Arab Emirates",
      value: "AE",
      states: [
        { label: "Dubai", value: "DXB" },
        { label: "Abu Dhabi", value: "AUH" },
        { label: "Sharjah", value: "SHJ" },
        { label: "Ajman", value: "AJM" },
      ],
    },
    {
      label: "Saudi Arabia",
      value: "SA",
      states: [
        { label: "Riyadh", value: "RIY" },
        { label: "Mecca", value: "MEC" },
        { label: "Medina", value: "MED" },
        { label: "Eastern Province", value: "EAS" },
      ],
    },
    {
      label: "South Africa",
      value: "ZA",
      states: [
        { label: "Gauteng", value: "GAU" },
        { label: "Western Cape", value: "WCA" },
        { label: "KwaZulu-Natal", value: "KZN" },
        { label: "Eastern Cape", value: "ECP" },
      ],
    },
  ];

  const stateOptions = availableStates;

  const currencyOptions = [
    { label: "Select Currency Type *", value: "" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "GBP - British Pound Sterling", value: "GBP" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "CNY - Chinese Yuan", value: "CNY" },
    { label: "INR - Indian Rupee", value: "INR" },
    { label: "BRL - Brazilian Real", value: "BRL" },
    { label: "MXN - Mexican Peso", value: "MXN" },
    { label: "CHF - Swiss Franc", value: "CHF" },
    { label: "SEK - Swedish Krona", value: "SEK" },
    { label: "NOK - Norwegian Krone", value: "NOK" },
    { label: "DKK - Danish Krone", value: "DKK" },
    { label: "SGD - Singapore Dollar", value: "SGD" },
    { label: "HKD - Hong Kong Dollar", value: "HKD" },
    { label: "AED - United Arab Emirates Dirham", value: "AED" },
    { label: "SAR - Saudi Arabian Riyal", value: "SAR" },
    { label: "ZAR - South African Rand", value: "ZAR" },
    // Add more currency type options
  ];
  const accountOptions = [
    { label: "Checkings Account", value: "Checkings Account" },
    { label: "Savings Account", value: "Savings Account" },
    { label: "Fixed Deposit Account", value: "Fixed Deposit Account" },
    { label: "Current Account", value: "Current Account" },
    { label: "Crypto Currency Account", value: "Crypto Currency Account" },
    { label: "Business Account", value: "Business Account" },
    { label: "Non Resident Account", value: "Non Resident Account" },
    {
      label: "Cooperate Business Account",
      value: "Cooperate Business Account",
    },
    { label: "Investment Account", value: "Investment Account" },
  ];

  return (
    <div
      className="w-full absolute h-screen overflow-y-auto overflow-hidden bg-cover bg-center bg-opacity-10"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/1137281183/photo/stack-of-multicolored-credit-cards-close-up-view-with-selective-focus.jpg?b=1&s=170667a&w=0&k=20&c=F-ueJD2p9rtPwOnCwOeR9oqvdgtRjmhGf782EPdDc4g=)",
      }}
    >
      <div className="w-full overflow-y-auto h-screen px-2 py-10 bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20">
        <div className="max-w-lg w-full px-3  mx-auto bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20  py-6 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mt-8 text-[#E1FFA0]">
              FinFlow Registration
            </h1>
            <h1 className="text-3xl font-semibold text-white mt-4">
              Welcome To FinFlow.com!
            </h1>
          </div>
          <form className="mt-8 text-xs" onSubmit={handleSubmit}>
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
            <div className="mt-8">
              <Dropdown
                options={countryOptions}
                selectedOption={countryOptions.find(
                  (option) => option.value === formData.country
                )}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "country", value: option.value },
                  })
                }
              />
            </div>

            <div className="mt-8">
              <Dropdown
                options={stateOptions}
                selectedOption={stateOptions.find(
                  (option) => option.value === formData.state
                )}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "state", value: option.value },
                  })
                }
              />
            </div>

            <div className="mt-8">
              <Dropdown
                options={currencyOptions}
                selectedOption={currencyOptions.find(
                  (option) => option.value === formData.currency
                )}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "currency", value: option.value },
                  })
                }
              />
            </div>

            <div className="mt-8">
              <Dropdown
                options={accountOptions}
                selectedOption={accountOptions.find(
                  (option) => option.value === formData.account
                )}
                onOptionSelect={(option) =>
                  handleChange({
                    target: { name: "account", value: option.value },
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
                className="flex text-sm cursor-pointer bg-white p-3 rounded-r-md"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <BiShow color="#22706b" />
                ) : (
                  <BiHide color="#22706b" />
                )}
              </span>
            </div>

            <div className="mt-8 flex items-center bg-white rounded-md">
              <input
                type={confirmPassword ? "text" : "password"}
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
                className="flex text-sm cursor-pointer bg-white p-3 rounded-r-md"
                onClick={handleConfirmPassword}
              >
                {confirmPassword ? (
                  <BiShow color="#22706b" />
                ) : (
                  <BiHide color="#22706b" />
                )}
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
