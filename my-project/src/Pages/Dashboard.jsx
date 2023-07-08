import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../component/Dashboard/Main";
import ScrollableContainer from "../component/Dashboard/ScrollableContainer";
import Loancomp from "../component/Dashboard/Loancomp";
import TopBar from "../component/TopBar";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import ClipLoader from "react-spinners/ClipLoader";
import { apiBaseUrl } from "../../config";
const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor: "red",
  margin: "auto",
  backroundColor: "#116f6a",
};

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newBalance, setNewBalance] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Simulating an asynchronous API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateAccountBalance = async (userName) => {
    try {
      await axios.put(`${apiBaseUrl}/users/${userName}`, {
        newBalance,
      });
      console.log("Account balance updated successfully");
      // Update the account balance in the local state or refetch the user data
    } catch (error) {
      console.error("Error updating account balance:", error);
    }
  };

  return (
    <div className="w-full ">
      {loading ? ( // Display the loading spinner while loading is true
        <div
          style={override}
          className="flex bg-[#116f6a] fixed items-center justify-center h-screen"
        >
          <ClipLoader color="#34a49f" loading={loading} size={75} />
        </div>
      ) : (
        <DefaultLayouts>
          <div className=" ">
            <TopBar />
            <Main accountBalance={newBalance} />

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
              <Loancomp />
              <ScrollableContainer />
            </div>
          </div>
        </DefaultLayouts>
      )}
    </div>
  );
};

export default Dashboard;
