import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../redux/userSlice";
import { apiBaseUrl } from "../../../config";
import { toast } from "react-hot-toast";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { ScaleLoader } from "react-spinners";

const NewsletterForm = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [newsletterContent, setNewsletterContent] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.users);
  const myUsers = Array.isArray(usersData) ? usersData : [];

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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/admin/newsletter`);
        if (res.status === 200) {
          const newsletter = res.data;
          if (newsletter) {
            setNewsletterContent(newsletter.newsletterContent);
          }
        } else {
          // Handle other response statuses
        }
      } catch (error) {
        console.error("Failed to fetch newsletter:", error);
        // Handle the error state or display an error message
      }
    };

    fetchNewsletter();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send the newsletter details to the backend
    axios
      .put(`${apiBaseUrl}/admin/newsletter`, {
        option: selectedOption,
        userName: selectedOption === "specificUser" ? userName : "",
        newsletterContent,
      })
      .then((response) => {
        console.log(response.data);
        // Display success message or perform further actions
        toast.success("Newsletter sent successfully");
      })
      .catch((error) => {
        console.error(error);
        // Display error message or perform error handling
        toast.error("Failed to send newsletter");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Newsletter" />
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label>
            Select Option:
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full text-sm rounded mt-2 border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            >
              <option value="all">All Users</option>
              <option value="deposit">Users who made a deposit</option>
              <option value="loan">Users who got a loan</option>
              <option value="savings">Users who got a savings</option>
              <option value="withdrawal">Users who got a withdrawals</option>
              <option value="virtualCard">Users who got a virtual card</option>
              <option value="specificUser">Specific User</option>
            </select>
          </label>
        </div>
        <br />
        {selectedOption === "specificUser" && (
          <div className="mb-2">
            <label className="mt-4">
              User Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-sm rounded mt-2 border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              />
            </label>
          </div>
        )}
        <br />

        <label>
          Newsletter Content:
          <textarea
            value={newsletterContent}
            onChange={(e) => setNewsletterContent(e.target.value)}
            rows={16}
            cols={80}
            className="w-full text-xs rounded mt-2 border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
        </label>
        <br />

        <br />

        {loading && (
          <div className="flex  justify-center items-center mt-1">
            <ScaleLoader
              color="#123abc"
              height={35}
              width={4}
              radius={2}
              margin={2}
            />
          </div>
        )}

        <br />

        <button
          type="submit"
          className="flex justify-center rounded-md bg-primary  w-full mt-2 py-2 px-6 font-medium text-gray hover:shadow-1"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Newsletter"}
        </button>
      </form>
    </DefaultLayout>
  );
};

export default NewsletterForm;
