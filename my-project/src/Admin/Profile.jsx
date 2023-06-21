import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { FaWhatsappSquare } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    accountNumber: "",
    gender: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const { data } = response; // Destructure the response data

        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: data.firstName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          accountNumber: data.accountNumber,
          gender: data.gender,
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
      const response = await axios.put(
        "http://localhost:4000/profile",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data); // Success message
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    }
  };
  return (
    <div className="bg-[#fff] shadow-md shadow-gray-600 w-full  duration-100 border py-10 rounded-md">
      <div className="p-2">
        <h1 className="text-xl font-bold text-center">{formData.firstName}</h1>
        <div className="px-4">
          <ul className="p-0 m-0  block list-none">
            <li className=" border-b border-[#E6E6E6] py-3 text-xs list-none">
              <span className="text-gray-400 ">Email</span>
              <p className="leading-6 font-medium">{formData.email}</p>
            </li>

            <li className=" border-b border-[#E6E6E6] py-3 text-xs">
              <span className="text-gray-400 ">Phone Number</span>
              <p className="leading-6 font-medium">{formData.phoneNumber}</p>
            </li>

            <li className=" border-b border-[#E6E6E6] py-2 text-xs">
              <span className="text-gray-400 ">Gender</span>
              <p className="leading-6 font-medium">{formData.gender}</p>
            </li>

            <li className="py-3 text-xs">
              <span className="text-gray-400 ">Social</span>

              <div className="flex gap-3 mt-3">
                <AiFillFacebook
                  size={30}
                  color="#39519A"
                  className="rounded-lg"
                />
                <AiFillTwitterSquare
                  size={30}
                  color="#0D4FB4"
                  className="rounded-lg"
                />
                <FaWhatsappSquare
                  size={30}
                  color="#22CB31"
                  className="rounded-lg"
                />
              </div>
            </li>
          </ul>
          <div className="flex justify-end">
            <button className="px-3 py-2 flex gap-1 outline-none items-center bg-[#277768] hover:bg-[#3dae99] text-white text-xs font-medium rounded-md">
              <BiEdit /> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
