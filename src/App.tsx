import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import AuthLayout from "./components/layout/AuthLayout";
import SignUpCompanyInfo from "./pages/SignUpCompanyInfo";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";
import ProjectRoom from "./pages/ProjectRoom/ProjectRoom";
import HeaderLayout from "./components/layout/HeaderLayout";
import ProjectRoomDetail from "./pages/ProjectRoom/ProjectRoomDetail";
import MyPage from "./pages/MyPage";
import Admin from "./pages/Admin";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";

const App = () => {
  return (
    <Routes>
      {/* 로그인, 회원가입, 소속등록 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup-company-info" element={<SignUpCompanyInfo />} />
      </Route>

      {/* 헤더와 사이드바가 있는 페이지 */}
      <Route element={<Layout />}>
        <Route
          path="/project-room/:projectId"
          element={<ProjectRoomDetail />}
        />
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* 헤더만 있는 페이지 */}
      <Route element={<HeaderLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/project-room" element={<ProjectRoom />} />
        <Route path="/meeting-room/:projectId" element={<MeetingRoom />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
};

export default App;
