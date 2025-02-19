import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className=" flex">
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className="flex-1">
          <Outlet context={sidebarToggle} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
