import { Outlet } from "react-router";
import Header from "./Header";
import "../../styles/AuthLayout.css";
import BackgroundImg from "../../assets/auth_background.svg";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <section
        className="flex justify-center items-center
          bg-no-repeat bg-cover bg-center relative
        "
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          height: "calc(100vh - 50px)",
        }}
      >
        <div className="absolute inset-0 blur"></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
