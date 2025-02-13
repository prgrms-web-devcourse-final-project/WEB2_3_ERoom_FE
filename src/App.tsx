import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />

      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
