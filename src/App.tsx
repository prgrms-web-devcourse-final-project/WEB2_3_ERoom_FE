import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/layout/AuthLayout";
import SignUpCompanyInfo from "./pages/SignUpCompanyInfo";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";
import ProjectRoom from "./pages/ProjectRoom/ProjectRoom";
import HeaderLayout from "./components/layout/HeaderLayout";
import ProjectRoomDetail from "./pages/ProjectRoom/ProjectRoomDetail";
import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      {/* 로그인, 회원가입, 소속등록 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUpCompanyInfo" element={<SignUpCompanyInfo />} />
      </Route>

      {/* 헤더와 사이드바가 있는 페이지 */}
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/projectRoom/:projectId" element={<ProjectRoomDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* 헤더만 있는 페이지 */}
      <Route element={<HeaderLayout />}>
        <Route path="/projectRoom" element={<ProjectRoom />} />
        <Route path="/myPage" element={<MyPage />} />
      </Route>
    </Routes>
  );
};

export default App;
