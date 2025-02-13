import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <>
      <div>헤더 자리</div>
      <section className="flex justify-center items-center h-screen">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
