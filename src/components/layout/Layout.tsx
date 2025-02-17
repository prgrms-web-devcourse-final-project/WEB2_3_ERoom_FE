import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
      </div>
      <Outlet context={sidebarToggle} />
    </div>
  );
};

export default Layout;
