import React, { useEffect, useState } from "react";

const AdComponent = () => {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        alt="Ad"
        className="w-full h-80"
      />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
        <h2 className="text-white text-2xl font-bold">Get Your Loan</h2>
      </div>
    </div>
  );
};

export default AdComponent;
