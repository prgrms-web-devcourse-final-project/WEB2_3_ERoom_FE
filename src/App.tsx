import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layouts/AuthLayout";
import SignUpCompanyInfo from "./pages/SignUpCompanyInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route element={<AuthLayout />}>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signUpCompanyInfo" element={<SignUpCompanyInfo />} />
      </Route>
    </Routes>
  );
};

export default App;
