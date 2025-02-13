import { Outlet } from "react-router";
import Header from "./Header";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <section className="flex justify-center items-center h-screen">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
