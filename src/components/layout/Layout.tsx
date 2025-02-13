import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
