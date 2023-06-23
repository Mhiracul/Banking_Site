import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import UserTop from "../../component/UserTop";
import Sidebar from "../../component/Sidebar";
import Header from "../Headers";

const DefaultLayouts = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" dark:bg-boxdark-2 dark:text-bodydark bg-[#34a49f] overflow-hidden fixed w-full">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto  max-w-screen-2xl rounded-lg  dark:border-strokedark  py-8 md:py-6 2xl:py-10  p-4 md:p-6 2xl:p-10">
              {children}
              <div className="icon-container bg-[#116f6a] rounded-full">
                <div className="icon-wrapper">
                  <div className="icon animate-spin-slow">
                    <AiOutlineSetting color="#fff" size={25} />
                  </div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
          </main>

          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayouts;
