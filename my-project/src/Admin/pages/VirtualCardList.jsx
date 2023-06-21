import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";

function VirtualCardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchVirtualCards();
  }, []);

  const fetchVirtualCards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/virtual-cards",
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const fetchedCards = response.data;
      setCards(fetchedCards);
    } catch (error) {
      console.error("Error fetching virtual cards:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Card" />
        <div className=" px-4 py-6  bg-[#fff]  dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
          <table className="mx-auto w-full">
            <thead>
              <tr>
                <th className="font-medium shadow-md uppercase text-xs px-4">
                  Card Type
                </th>
                <th className="font-medium shadow-md uppercase text-xs px-4">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card._id}>
                  <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                    {card.cardType}
                  </td>
                  <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-sm  w-48">
                    {card.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default VirtualCardList;
