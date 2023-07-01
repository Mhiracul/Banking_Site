import React, { useState, useEffect } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import UserTop from "../../component/UserTop";
import Sidebar from "../../component/Sidebar";
import Header from "../Headers";

const DefaultLayouts = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/cdxhzrlz1wpauoqjmkpxxqu2ik2rthsq.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="h-screen w-full absolute bg-[#34a49f]">
      <div className=" dark:bg-boxdark-2 dark:text-bodydark relative">
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
                <div className="icon-container  rounded-full">
                  <div className="icon-wrapper">
                    <div className="icon animate-spin-slow"></div>
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

export default DefaultLayouts;
