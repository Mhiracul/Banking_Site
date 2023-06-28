import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../config";
import ClipLoader from "react-spinners/ClipLoader";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const userData = useSelector((state) => state);
  console.log(userData.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(`${apiBaseUrl}/login`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setButtonClicked(true);
    const { userName, password } = formData;
    if (userName && password) {
      const fetchData = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.user) {
        if (dataRes.user.status === "disabled") {
          navigate("/error", {
            state: {
              message: "Your account has been disabled.",
              imagePath:
                "https://assets2.lottiefiles.com/packages/lf20_1dhXVSU9Tr.json",
            },
          });
          return;
        }
        if (dataRes.user.status === "suspended") {
          navigate("/error", {
            state: {
              message: "Your account has been suspended.",
              imagePath:
                "https://assets2.lottiefiles.com/packages/lf20_1dhXVSU9Tr.json",
            },
          });
          return;
        }
      } else if (dataRes.alert) {
        // Check if there is no error
        // Save token to local storage
        localStorage.setItem("token", dataRes.token);

        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/main"); // Redirect to user page
        }, 1000);
      } else {
        // Handle other error cases
        toast.error(dataRes.message);
      }

      if (dataRes.alert) {
        // Save token to local storage
        localStorage.setItem("token", dataRes.token);

        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/main"); // Redirect to user page
        }, 1000);
      }
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <div
      className="w-full h-screen absolute overflow-hidden bg-cover bg-center bg-opacity-10 "
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1137281183/photo/stack-of-multicolored-credit-cards-close-up-view-with-selective-focus.jpg?b=1&s=170667a&w=0&k=20&c=F-ueJD2p9rtPwOnCwOeR9oqvdgtRjmhGf782EPdDc4g=)`,
      }}
    >
      <div className="w-full  md:h-screen h-full px-2 py-10 bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20 flex items-center">
        <div className="flex justify-center items-center   my-auto">
          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-[#102F2D] bg-opacity-50">
              <ClipLoader color="#E1FFA0" loading={isLoading} size={50} />
            </div>
          ) : null}
        </div>
        <div className="max-w-lg w-full   mx-auto bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent bg-opacity-20 px-8 py-6 rounded-md ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mt-8 text-[#E1FFA0]">
              FinFlow Login
            </h1>
            <h1 className="text-3xl font-semibold text-white mt-4">
              Welcome Back!
            </h1>
          </div>
          <form className="mt-8 " onSubmit={handleSubmit}>
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

            <div className="mt-8 flex px-1 items-center py-1 bg-slate-200  bg-white rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2  border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white rounded-md"
                required
              />
              <span
                className="flex text-xl cursor-pointer bg-white p-3 rounded-r-md"
                onClick={handleShowPassword}
              >
                {" "}
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button
              type="submit"
              className={`mt-6 w-full px-4 py-2 bg-[#E1FFA0] text-black rounded-md hover:bg-[#22706b] hover:text-white focus:outline-none focus:bg-blue-600 ${
                buttonClicked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={buttonClicked}
            >
              {isLoading ? <span>Loading...</span> : "Login"}
            </button>

            <p className="text-white text-center mt-8">
              Don't have an account?{" "}
              <span className="text-[#E1FFA0]">
                {" "}
                <Link to="/register"> Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
