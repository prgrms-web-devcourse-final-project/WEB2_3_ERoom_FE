import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

interface ManagersType {
  id: number;
  username: string;
  profile: string;
  email?: string;
}

export interface OutletContextType {
  setManagers: React.Dispatch<React.SetStateAction<ManagersType[]>>;
}

const Layout = () => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  const [managers, setManagers] = useState<ManagersType[]>([]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className=" flex">
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          managers={managers}
        />
        <div className="flex-1">
          <Outlet context={{ setManagers }} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
