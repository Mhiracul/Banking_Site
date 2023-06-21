import React, { useState } from "react";
import { MdAccountBalance } from "react-icons/md";

function EditPage({ user, onDelete, onSuspend, onDisable, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const { userName, email, password, accountBalance, isSuspended, isDisabled } =
    editedUser;

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedUser); // Pass the editedUser object as an argument
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  return (
    <div className="user-card px-20">
      <div className="user-details">
        <div>
          <strong>Username:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleInputChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          ) : (
            userName
          )}
        </div>
        <div>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          ) : (
            email
          )}
        </div>
        <div>
          <strong>Password:</strong>{" "}
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          ) : (
            password
          )}
        </div>
        <div>
          <strong>Account Balance:</strong>{" "}
          {isEditing ? (
            <input
              type="number"
              name="accountBalance"
              value={accountBalance}
              onChange={handleInputChange}
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          ) : (
            accountBalance
          )}
        </div>
      </div>

      <div className="user-actions">
        {isEditing ? (
          <>
            <button
              className="action-button save bg-[#5321a8] text-white px-2 py-1 rounded-md"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="action-button cancel bg-[#5321a8] text-white px-2 py-1 rounded-md"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="flex gap-6">
            <button
              className="action-button edit bg-[#b12828] text-white px-2 py-1 rounded-md"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="action-button delete bg-[#d72626] text-white px-2 py-1 rounded-md"
              onClick={onDelete}
            >
              Delete
            </button>
            {isSuspended ? (
              <button
                className="action-button activate bg-[#5321a8] text-white px-2 py-1 rounded-md "
                onClick={onActivate}
              >
                Activate
              </button>
            ) : (
              <>
                <button
                  className="action-button suspend bg-[#5321a8] text-white px-2 py-1 rounded-md "
                  onClick={onSuspend}
                >
                  Suspend
                </button>
                <button
                  className="action-button disable bg-[#5321a8] text-white px-2 py-1 rounded-md"
                  onClick={onDisable}
                >
                  Disable
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditPage;
