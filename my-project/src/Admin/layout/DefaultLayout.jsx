import React, { useState } from "react";
import Header from "../componentAdmin/Header";
import Sidebar from "../Barr";
import { AiOutlineSetting } from "react-icons/ai";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full absolute bg-[#DCEFFC]">
      <div className=" dark:bg-boxdark-2 dark:text-bodydark relative">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen  overflow-hidden ">
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
              <div className="mx-auto  max-w-screen-2xl rounded-lg bg-[#DCEFFC] dark:border-strokedark  dark:bg-black p-4 md:p-6 2xl:p-10">
                {children}
                <div className="icon-container bg-[#5321a8] rounded-full">
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
    </div>
  );
};

export default DefaultLayout;
