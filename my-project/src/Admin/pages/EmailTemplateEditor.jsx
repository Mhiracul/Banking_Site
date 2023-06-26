import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";
import { apiBaseUrl } from "../../../config";
import axios from "axios";
const EmailTemplateEditor = () => {
  const [
    registrationConfirmationTemplate,
    setRegistrationConfirmationTemplate,
  ] = useState("");
  useEffect(() => {
    getEmailTemplate();
  }, []);
  const getEmailTemplate = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/admin/get-email-template`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const { registrationConfirmationTemplate } = response.data;
      setRegistrationConfirmationTemplate(registrationConfirmationTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRegistrationConfirmationTemplate = async () => {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/admin/update-email-template`,
        {
          registrationConfirmationTemplate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data); // Success message from the server
    } catch (error) {
      console.log(error);
    }
  };

  const handleTemplateChange = (e) => {
    setRegistrationConfirmationTemplate(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Mail" />
        <div>
          <h1>Edit Email Template</h1>
          <textarea
            value={registrationConfirmationTemplate}
            onChange={handleTemplateChange}
            rows={10}
            cols={50}
            className="w-full outline-none"
          />
          <button
            onClick={updateRegistrationConfirmationTemplate}
            className=" w-full flex justify-center rounded bg-[#5321a8] py-2 px-6 font-medium text-gray hover:bg-opacity-70"
          >
            Save Template
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EmailTemplateEditor;
