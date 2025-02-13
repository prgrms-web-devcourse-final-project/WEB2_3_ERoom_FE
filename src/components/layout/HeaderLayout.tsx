import { Outlet } from "react-router";
import Header from "./Header";

const HeaderLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
