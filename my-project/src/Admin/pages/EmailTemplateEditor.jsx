import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../componentAdmin/Breadcrumb";

const EmailTemplateEditor = () => {
  const [adminNote, setAdminNote] = useState(
    "A new withdrawal request just occurred in your finflow account."
  );

  const handleAdminNoteChange = (event) => {
    setAdminNote(event.target.value);
  };

  const handleSaveTemplate = () => {
    // Save the updated email template to the server
    // You can use an API request or any other method to send the updated template to the backend for storage

    // Example API request using fetch:
    fetch("http://localhost:4000/admin/update-email-template", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ adminNote }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email template updated successfully", data);
        // Optionally, show a success message to the admin
      })
      .catch((error) => {
        console.error("Failed to update email template", error);
        // Optionally, show an error message to the admin
      });
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Mail" />
        <div>
          <h2>Email Template Editor</h2>
          <label htmlFor="adminNote">Admin Note:</label>
          <textarea
            id="adminNote"
            value={adminNote}
            onChange={handleAdminNoteChange}
          />

          <button onClick={handleSaveTemplate}>Save Template</button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EmailTemplateEditor;
