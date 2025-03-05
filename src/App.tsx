import { Route, Routes } from "react-router";
import SignIn from "./pages/SignIn.tsx";
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
import ProtectedRoute from "./pages/ProtectedRoute";
import KakaoRedirect from "./pages/KakaoRedirect";
import NotFound from "./pages/NotFound";
import useWebSocketStore from "./store/useWebSocketStore";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore.ts";

const App = () => {
  const { connectWebSocket } = useWebSocketStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = useAuthStore((state) => state.member?.id);

  useEffect(() => {
    console.log(" useEffect 실행 - WebSocket 연결 확인");
    console.log(" 현재 로그인한 사용자 ID:", memberId);
    console.log(" 현재 Access Token:", accessToken);

    if (accessToken && memberId) {
      console.log(" WebSocket 연결 시작...");
      connectWebSocket(accessToken, memberId);
    }
  }, [accessToken, memberId]);
  return (
    <Routes>
      {/* 로그인, 회원가입, 소속등록 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup-company-info" element={<SignUpCompanyInfo />} />
        <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />
      </Route>

      {/* 헤더와 사이드바가 있는 페이지 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route
            path="/project-room/:projectId"
            element={<ProjectRoomDetail />}
          />
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* 헤더만 있는 페이지 */}
        <Route element={<HeaderLayout />}>
          <Route path="/project-room" element={<ProjectRoom />} />
          <Route path="/meeting-room/:projectId" element={<MeetingRoom />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Route>
      <Route element={<HeaderLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
