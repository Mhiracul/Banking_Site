import React, { useEffect, useState } from "react";
import handImage from "../assets/img1.jpg";
import houseImage from "../assets/img2.jpg";
import welcomeImage from "../assets/img3.jpeg";
import moneyImage from "../assets/img4.webp";
import shakingImage from "../assets/img5.jpeg";

const AdComponent = () => {
  const [adImage, setAdImage] = useState(handImage);

  useEffect(() => {
    const adImages = [
      handImage,
      houseImage,
      welcomeImage,
      moneyImage,
      shakingImage,
    ];
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * adImages.length);
      setAdImage(adImages[randomIndex]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      <img src={adImage} alt="Ad" className="w-full h-80" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
        <h2 className="text-white text-2xl font-bold">Get Your Loan</h2>
      </div>
    </div>
  );
};

export default AdComponent;
