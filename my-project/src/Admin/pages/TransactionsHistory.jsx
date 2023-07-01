import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { apiBaseUrl } from "../../../config";
import ReactPaginate from "react-paginate";

const TransactionsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [updated, setUpdated] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20; //
  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/transaction`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      console.log(response.data); // Check the value of response.data
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateStatus = async (transactionId) => {
    try {
      const updatedStatus = "success"; // Set the desired updated status here
      setUpdated(updatedStatus);
      await axios.patch(
        `${apiBaseUrl}/admin/transaction/${transactionId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchTransaction();
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const offset = currentPage * perPage;
  const currentData = transactions.slice(offset, offset + perPage);
  const pageCount = Math.ceil(transactions.length / perPage);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Transaction history" />
        <div>
          <div className="h-full   py-6 ">
            <div className="bg-[#fff] w-full overflow-x-auto border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark     text-black rounded-md">
              <table className="w-full   text-black dark:text-white">
                <thead>
                  <tr>
                    <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                      Date
                    </th>
                    <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                      Type
                    </th>
                    <th className="font-medium text-left shadow-md uppercase text-xs px-4">
                      Status
                    </th>
                    <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                      Amount
                    </th>
                    <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-[8px]  w-40">
                        {transaction.date}
                      </td>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                        {transaction.type}
                      </td>
                      <td className="shadow-md shadow-[#ccc]  px-4 py-2 text-xs  w-48">
                        {transaction.status === "pending" ? (
                          <span className=" bg-[#FED5D6] text-[#FC444C] text-[11px] flex justify-center items-center w-16 h-4 font-bold rounded-full">
                            {transaction.status}
                          </span>
                        ) : (
                          <span className=" bg-[#D2F3E0] text-[#34C164]  flex justify-center items-center font-bold w-16 h-4 rounded-full">
                            {transaction.status}
                          </span>
                        )}
                      </td>
                      <td
                        className={`shadow-md shadow-[#ccc] px-4 font-bold py-2 text-xs w-48 ${
                          transaction.type === "withdrawal" ||
                          transaction.type === "savings"
                            ? "text-red"
                            : "text-green"
                        }`}
                      >
                        ${transaction.amount}
                      </td>

                      <td className="py-2 px-4 shadow-md shadow-[#ccc]  text-xs">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleUpdateStatus(transaction._id)}
                            className="bg-[#000] hover:bg-[#D2F3E0] hover:text-[#34C164] text-white text-xs rounded-md px-2 py-1 ml-2"
                          >
                            Update
                          </button>
                        </div>
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
      </div>
    </DefaultLayout>
  );
};

export default TransactionsHistory;
