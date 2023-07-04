import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { apiBaseUrl } from "../../../config";
import BouncingLoader from "../../BouncingLoader";
import ReactPaginate from "react-paginate";

function WalletUpdate() {
  const [cryptos, setCryptos] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20;
  useEffect(() => {
    // Fetch the list of cryptocurrencies from the database and update the state
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      const response = await axios.get(`${apiBaseUrl}/admin/cryptos`, {
        headers,
      });
      const fetchedCryptos = response.data;
      setCryptos(fetchedCryptos);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching cryptocurrencies:", error);
      setLoading(false);
    }
  };

  const handleToggleStatus = async (cryptoId) => {
    try {
      const updatedCryptos = cryptos.map((crypto) => {
        if (crypto._id === cryptoId) {
          return {
            ...crypto,
            active: !crypto.active,
          };
        }
        return crypto;
      });
      setCryptos([...updatedCryptos]);

      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      // Update the status of the cryptocurrency in the database
      await axios.put(
        `${apiBaseUrl}/admin/cryptos/${cryptoId}`,
        {
          active: updatedCryptos.find((crypto) => crypto._id === cryptoId)
            ?.active,
        },
        { headers }
      );
    } catch (error) {
      console.error("Error toggling cryptocurrency status:", error);
    }
  };

  const handleAddressChange = async (cryptoId, event) => {
    const updatedCryptos = cryptos.map((crypto) => {
      if (crypto._id === cryptoId) {
        return {
          ...crypto,
          address: event.target.value,
          bankName:
            crypto.name === "Wire Transfer"
              ? event.target.value
              : crypto.bankName,
          bankNumber:
            crypto.name === "Wire Transfer"
              ? event.target.value
              : crypto.bankNumber,
        };
      }
      return crypto;
    });

    setCryptos(updatedCryptos);

    try {
      const authToken = localStorage.getItem("token");
      const headers = { "auth-token": authToken };

      // Update the address and bank information of the cryptocurrency in the database
      await axios.put(
        `${apiBaseUrl}/admin/cryptos/${cryptoId}`,
        {
          address: updatedCryptos.find((crypto) => crypto._id === cryptoId)
            ?.address,
          bankName: updatedCryptos.find((crypto) => crypto._id === cryptoId)
            ?.bankName,
          bankNumber: updatedCryptos.find((crypto) => crypto._id === cryptoId)
            ?.bankNumber,
        },
        { headers }
      );
    } catch (error) {
      console.error("Error updating cryptocurrency address:", error);
    }
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const offset = currentPage * perPage;
  const currentData = cryptos.slice(offset, offset + perPage);
  const pageCount = Math.ceil(cryptos.length / perPage);

  return (
    <DefaultLayout>
      {loading ? (
        <BouncingLoader />
      ) : (
        <>
          <Breadcrumb pageName="Wallet " />
          <div className="">
            <div className="bg-[#fff] f dark:bg-boxdark w-full rounded-md border border-stroke dark:border-strokedark shadow-md">
              <div className="crypto-list w-full h-full mt-6 overflow-y-scroll">
                <table className="w-full  bg-gray-300 rounded-md shadow-lg shadow-gray-600">
                  <thead>
                    <tr className="text-left bg-gray-300">
                      <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                        Logo
                      </th>
                      <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2 ">
                        Name
                      </th>
                      <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                        Wallet Address
                      </th>
                      <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((crypto, index) => (
                      <tr key={index} className="bg-gray-300">
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                          <div className=" w-10  shadow-lg shadow-black rounded-full p-2">
                            <img
                              src={crypto.logo}
                              alt="Crypto Logo"
                              width="25"
                              height="25"
                              className="bg-white"
                            />
                          </div>
                        </td>
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                          {crypto.name}
                        </td>
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                          <input
                            type="text"
                            placeholder={
                              crypto.name === "Wire Transfer"
                                ? "Account Details"
                                : "Wallet Address"
                            }
                            value={crypto.address || ""}
                            className="rounded-md py-1 px-1 text-sm mt-2 shadow-md"
                            onChange={(event) =>
                              handleAddressChange(crypto._id, event)
                            }
                            style={{
                              display:
                                crypto.name === "Wire Transfer"
                                  ? "none"
                                  : "block",
                            }}
                          />

                          {crypto.name === "Wire Transfer" ? (
                            <>
                              <div>
                                <label className="mr-4 text-[8px]">
                                  Bank Name:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Bank Name"
                                  value={crypto.bankName || ""}
                                  className="rounded-md py-1 px-1 text-sm mt-2 shadow-md"
                                  onChange={(event) =>
                                    handleAddressChange(crypto._id, {
                                      target: { value: event.target.value },
                                    })
                                  }
                                />
                                <div>
                                  <label className="mr-2 text-[8px]">
                                    Bank Number:
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Bank Number"
                                    value={crypto.bankNumber || ""}
                                    className="rounded-md py-1 px-1 text-sm mt-2 shadow-md"
                                    onChange={(event) =>
                                      handleAddressChange(crypto._id, {
                                        target: { value: event.target.value },
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </>
                          ) : null}
                        </td>
                        <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                          <button
                            onClick={() => handleToggleStatus(crypto._id)}
                            className={`status-btn bg-black text-white px-10 rounded-full shadow-lg shadow-black outline-none ${
                              crypto.active ? "active" : ""
                            }`}
                          >
                            {crypto.active ? "ON" : "OFF"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-row items-center justify-center mt-4 outline-none">
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="pagination flex  items-center border border-[#ccc]  rounded-md outline-none mb-4 outline-none"
                    previousClassName="pagination__prev flex items-center outline-none justify-center px-2 py-2 bg-transparent border border-[#ccc] text-primary text-xs  outline-none "
                    nextClassName="pagination__next flex items-center outline-none justify-center px-2 py-2 bg-transparent border border-[#ccc] text-primary text-xs outline-none focus:border-transparent"
                    activeClassName="pagination__active"
                    disabledClassName="pagination__disabled"
                    pageClassName="pagination__page border border-[#ccc] bg-[#5321a8] text-xs flex items-center gap-7 outline-none text-white px-3 py-2"
                    breakClassName="pagination__break"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}
export default WalletUpdate;
