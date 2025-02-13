import { Outlet } from "react-router";
import Header from "./Header";
import "../../styles/AuthLayout.css";
import BackgroundImg from "../../assets/auth_background.svg";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <section
        className="relative flex justify-center items-center h-screen bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(${BackgroundImg})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="relative z-10">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
