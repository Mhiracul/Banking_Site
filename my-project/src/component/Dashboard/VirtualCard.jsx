import React, { useState, useEffect } from "react";
import axios from "axios";
import chip from "../../assets/chip.png";
import ClipLoader from "react-spinners/ClipLoader";
import { apiBaseUrl } from "../../../config";
const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderColor: "red",
  margin: "auto",
  backroundColor: "#116f6a",
};
const VirtualCard = () => {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchCardData();
  }, []);

  const fetchCardData = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/card`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setCardData(response.data);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  return (
    <div className="flex ">
      {cardData ? (
        <div
          className="bg-[#DBFF8E] bg-gradient bg-gradient-to-br from-[#102F2D] to-transparent  
        bg-opacity-20 rounded-lg p-8 shadow-md py-6 w-full px-8 text-white"
        >
          <div className="flex flex-col mt-4">
            <div>
              <img src={chip} alt="" className="w-10 h-10 ml-3" />
            </div>
            <div className="text-sm text-white rounded-lg px-4 py-2 text-left">
              {cardData.number}
            </div>
            <div className="ml-4">
              <p className="text-[8px]">VALID THRU</p>
              <p className="text-[10px] mt-3">CARD HOLDER</p>
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold">
                  {cardData.expMonth}/{cardData.expYear}
                </p>

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                  alt=""
                  className="w-12 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={override} className="flex  items-center justify-center">
          <ClipLoader color="#34a49f" loading={loading} size={25} />
        </div>
      )}
    </div>
  );
};

export default VirtualCard;
