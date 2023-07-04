import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/userSlice";
import axios from "axios";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { toast } from "react-hot-toast";
import { apiBaseUrl } from "../../../config";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function MainPage() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use the useNavigate hook
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10; //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/admin/users`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (res.status === 200) {
          dispatch(setUsers(res.data.data));
        } else {
          // Handle other response statuses
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        // Handle the error state or display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${apiBaseUrl}/admin/users/${userId}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (res.status === 200) {
        // User deleted successfully
        toast.success("User deleted successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to delete user:", err);
      // Handle the error state or display an error message
    }
  };

  const suspendUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/suspend`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User suspended successfully
        toast.success("User suspended successfully");

        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to suspend user:", err);
      // Handle the error state or display an error message
    }
  };

  const disableUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/disable`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User disabled successfully
        toast.success(" User disabled successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to disable user:", err);
      // Handle the error state or display an error message
    }
  };

  const activateUser = async (userId) => {
    try {
      const res = await axios.put(
        `${apiBaseUrl}/admin/users/${userId}/activate`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        // User activated successfully
        toast.success("User activated successfully");
        // You can update the user list by dispatching a new action
      } else {
        // Handle other response statuses
      }
    } catch (err) {
      toast.error("Failed to activate user:", err);
      // Handle the error state or display an error message
    }
  };

  const handleEditNavigation = (userId) => {
    navigate(`/admin-user/edit/${userId}`); // Navigate to the EditUserPage with the user ID
  };

  const handlePutFundNavigation = (userId) => {
    navigate(`/admin-user/put-fund/${userId}`); // Navigate to the PutFundPage with the user ID
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };
  const offset = currentPage * perPage;
  const currentData = myUsers.slice(offset, offset + perPage);
  const pageCount = Math.ceil(myUsers.length / perPage);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex justify-center w-full rounded-lg overflow-x-auto border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className=" h-full rounded-lg ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 md:text-xs text-[10px]">
                  <tr>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2 "
                    >
                      Username
                    </th>

                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Account Balance
                    </th>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-left shadow-md uppercase  px-4 py-2"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y md:text-xs text-[10px] divide-gray-200">
                  {currentData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-4 py-2">{data.userName}</td>

                      <td className="px-4 py-2">
                        {data.accountBalance.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{data.status}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-2">
                          <button
                            className="action-button edit bg-[#5321a8] text-white px-1 py-1 rounded-md"
                            onClick={() => handleEditNavigation(data._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-button put-fund bg-[#2127eb]   text-white px-1 py-1 rounded-md"
                            onClick={() => handlePutFundNavigation(data._id)}
                          >
                            Fund
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
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default MainPage;
