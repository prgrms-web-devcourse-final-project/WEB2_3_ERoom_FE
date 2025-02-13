import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/layout/AuthLayout";
import SignUpCompanyInfo from "./pages/SignUpCompanyInfo";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signUpCompanyInfo" element={<SignUpCompanyInfo />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
