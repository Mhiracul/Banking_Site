import React from "react";
import ReactPaginate from "react-paginate";

const ReactTailwindTable = ({ data }) => {
  const perPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(data.length / perPage); // Calculate the number of pages

  const [currentPage, setCurrentPage] = React.useState(0);
  const offset = currentPage * perPage;
  const currentData = data.slice(offset, offset + perPage);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  return (
    <div className=" w-full ">
      <table className=" max-w-md  mx-auto divide-y divide-gray-200 ">
        <thead className="bg-[#DBFF8E] text-[#21635f]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wallet
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#21635f] text-white divide-y divide-gray-200 font-light">
          {currentData.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
                {withdrawal.type}
              </td>
              <td className="px-6 py-4  whitespace-nowrap text-xs text-gray">
                {withdrawal.wallet}
              </td>
              <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
                ${withdrawal.amount}
              </td>
              <td className="px-6 py-4 capitalize whitespace-nowrap text-sm text-gray-500">
                {withdrawal.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-row justify-center items-center mt-4 font-light">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="pagination flex gap-3 items-center rounded-md"
          previousClassName="pagination__prev flex items-center justify-center px-4 py-1 bg-transparent border border-gray text-[#DBFF8E] text-xs   rounded-full"
          nextClassName="pagination__next flex items-center justify-center px-4 py-1 bg-transparent border border-gray text-[#DBFF8E] text-xs   rounded-full"
          activeClassName="pagination__active"
          disabledClassName="pagination__disabled"
          pageClassName="pagination__page border text-xs border-gray text-[#DBFF8E] px-2 py-1 rounded-full"
          breakClassName="pagination__break"
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      </div>
    </div>
  );
};

export default ReactTailwindTable;
