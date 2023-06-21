import React from "react";
import { IconContext } from "react-icons";

const Icon = ({ icon, size, color }) => {
  const IconComponent = icon;
  return (
    <IconContext.Provider value={{ size, color }}>
      <IconComponent />
    </IconContext.Provider>
  );
};

export default Icon;
