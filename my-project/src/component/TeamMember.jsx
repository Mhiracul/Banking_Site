import React from "react";

const TeamMember = ({ name, position, image }) => {
  return (
    <div className="w-64 h-80 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="transform rotate-y-180">
            <h3 className="text-white text-2xl font-semibold">{name}</h3>
            <p className="text-gray-300">{position}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500">{position}</p>
      </div>
    </div>
  );
};

export default TeamMember;
