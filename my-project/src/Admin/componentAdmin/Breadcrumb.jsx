import { AiFillHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 bg-[#fff] rounded-lg border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-xsm font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/" className="flex items-center gap-3 font-bold">
              <AiFillHome size={13} color="#5321A8" />{" "}
              <MdKeyboardArrowRight color="#ccc" /> Dashboard{" "}
              <MdKeyboardArrowRight color="#ccc" />{" "}
            </Link>
          </li>
          <li className="text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
