import React from "react";
import { MdAccountBalance } from "react-icons/md";
import { Link } from "react-router-dom";

function UserCard({ userName, email, password, accountBalance, onDelete }) {
  return (
    <tr style={{}} className="shadow-md">
      <td className="p-6 text-xs">{userName}</td>
      <td className="p-6 text-xs">{email}</td>
      <td className="p-6 text-xs">{password}</td>
      <td className="p-6 text-xs">{accountBalance}</td>

      <td className="p-8">
        <Link to={"edit"}>
          <button className="bg-[#5321a8] text-white px-2 py-1 rounded-md mr-2">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  );
}

export default UserCard;
