import React from "react";
import CardOne from "../Admin/componentAdmin/CardOne.jsx";
import CardThree from "../Admin/componentAdmin/CardThree.jsx";
import CardTwo from "../Admin/componentAdmin/CardTwo.jsx";
//import ChartOne from "../../components/ChartOne.tsx";
//import ChatCard from "../../components/ChatCard.tsx";
import DefaultLayout from "../Admin/layout/DefaultLayout.jsx";
import Withdrawals from "./Withdrawals.jsx";
import Wallet from "./Wallet.jsx";

const Admins = () => {
  return (
    <div className="overflow-hidden fixed w-full">
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 rounded-md md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardOne />
          <CardTwo />
          <CardThree />
        </div>
        <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <Withdrawals />
          <Wallet />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Admins;
