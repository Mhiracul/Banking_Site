import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import UserTop from "../component/UserTop";
import DefaultLayouts from "../User/layoutt/DefaultLayouts";
import { apiBaseUrl } from "../../config";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20; // Number of items to display per page

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true initially
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Simulate a 2-second loading delay (adjust as needed)
  }, []);

  useEffect(() => {
    // Fetch transaction data from the backend API
    fetch(`${apiBaseUrl}/transactions`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.log("Error fetching transaction data:", error);
      });
  }, []);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const offset = currentPage * perPage;
  const currentData = transactions.slice(offset, offset + perPage);
  const pageCount = Math.ceil(transactions.length / perPage);

  return (
    <div>
      {isLoading ? (
        <div className="flex bg-[#116f6a] justify-center items-center h-screen">
          <ClipLoader color="#34a49f" size={35} />
        </div>
      ) : (
        <DefaultLayouts>
          <div className="mx-auto max-w-270">
            <UserTop pageName="Transaction History" />

            <div className="h-screen">
              <div className="h-full px-6 md:px-20 py-10 mx-auto">
                <h2 className="font-bold text-xl text-center mb-5 text-white">
                  Transaction History
                </h2>
                {transactions.length === 0 ? (
                  <div className="flex justify-center items-center text center  text-white text-sm font-medium">
                    No transaction history available.
                  </div>
                ) : (
                  <div className=" h-full w-full text-black rounded-md">
                    <table className=" min-w-full divide-y divide-gray">
                      <thead className="bg-[#DBFF8E] text-[#21635f]">
                        <tr>
                          <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  ">
                            Date
                          </th>
                          <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#21635f] text-white divide-y divide-gray font-light">
                        {currentData.map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="capitalize px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="capitalize px-6 py-4  whitespace-nowrap text-sm text-gray-500">
                              {transaction.type}
                            </td>
                            <td className="px-6 py-4  capitalize whitespace-nowrap text-sm text-gray-500">
                              {transaction.amount}
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
                        containerClassName="pagination flex gap-3 items-center rounded-md outline-none"
                        previousClassName="pagination__prev flex items-center outline-none justify-center px-2 py-1 bg-transparent border border-gray text-[#DBFF8E] text-xs  outline-none rounded-full"
                        nextClassName="pagination__next flex items-center outline-none justify-center px-2 py-1 bg-transparent border border-gray text-[#DBFF8E] text-xs outline-none  rounded-full"
                        activeClassName="pagination__active"
                        disabledClassName="pagination__disabled"
                        pageClassName="pagination__page border border-gray text-xs flex items-center gap-7 outline-none text-[#DBFF8E] px-2 py-1 rounded-full"
                        breakClassName="pagination__break"
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DefaultLayouts>
      )}
    </div>
  );
};

export default TransactionHistory;
