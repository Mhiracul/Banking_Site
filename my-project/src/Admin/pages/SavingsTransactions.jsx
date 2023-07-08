import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../../config";
import DefaultLayout from "../layout/DefaultLayout";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import ReactPaginate from "react-paginate";

const SavingsTransactions = () => {
  const [savings, setSavings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 20; //
  useEffect(() => {
    setIsLoading(true); // Set isLoading to true initially
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Simulate a 2-second loading delay (adjust as needed)
  }, []);

  useEffect(() => {
    // Fetch savings transactions when the component mounts
    fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/savings-transactions`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      setSavings(response.data.savings);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleUpdateStatus = async (savingsId) => {
    try {
      const updatedStatus = "success"; // Set the desired updated status here
      setUpdatedStatus(updatedStatus);
      await axios.patch(
        `${apiBaseUrl}/admin/savings/${savingsId}`,
        {
          status: updatedStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      fetchSavings(); // Refetch the savings to display updated data
    } catch (error) {
      console.error("Error updating savings status:", error);
    }
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const offset = currentPage * perPage;
  const currentData = savings.slice(offset, offset + perPage);
  const pageCount = Math.ceil(savings.length / perPage);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#21635f" size={35} />
        </div>
      ) : (
        <DefaultLayout>
          <Breadcrumb pageName="Savings" />
          <div>
            <table className="bg-white dark:bg-boxdark w-full">
              <thead>
                <tr>
                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Transaction ID
                  </th>

                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    User
                  </th>

                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Amount
                  </th>

                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Status
                  </th>

                  <th className="font-medium text-left shadow-md uppercase text-xs px-4 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((saving) => (
                  <tr key={saving._id}>
                    <td className=" border border-[#ccc] dark:border-strokedark px-4 py-2 text-xs  w-48">
                      {saving._id}
                    </td>
                    <td className=" border border-[#ccc] dark:border-strokedark px-4 py-2 text-xs  w-48">
                      {saving.user ? saving.user.userName : ""}
                    </td>

                    <td className=" border border-[#ccc] dark:border-strokedark px-4 py-2 text-xs  w-48">
                      ${saving.amount}
                    </td>

                    <td className="border border-[#ccc] dark:border-strokedark  px-4 py-2 text-xs  w-48">
                      {saving.status}
                    </td>
                    <td className="border border-[#ccc] dark:border-strokedark  px-4 py-2 text-xs  w-48">
                      <div className="flex items-center">
                        {/* Remove the input element */}
                        <button
                          onClick={() => handleUpdateStatus(saving._id)}
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
        </DefaultLayout>
      )}
    </div>
  );
};

export default SavingsTransactions;
