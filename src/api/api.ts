import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
//   // headers: {
//   //   Authorization: `Bearer ${import.meta.env.VITE_JSESSION}`,
//   // },
// });

// 요청 인터셉터 - 매 요청마다 accessToken 추가
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 - accessToken이 만료되면 refreshToken으로 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("리프레쉬 토큰 시작");

    const originalRequest = error.config;

    // `_retry` 속성이 없으면 false로 초기화
    if (originalRequest._retry === undefined) {
      originalRequest._retry = false;
    }

    console.log("originalRequest._retry 값:", originalRequest._retry);

    const { refreshToken, login, logout } = useAuthStore.getState();

    // 401 (Unauthorized) 또는 403 (Forbidden) 에러가 발생한 경우 처리
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      console.log("401 또는 403 에러 감지, 리프레시 토큰 실행");
      originalRequest._retry = true; // 이제 안전하게 true로 변경 가능

      if (refreshToken) {
        try {
          console.log("리프레시 요청 보냄", refreshToken);

          // 기존 accessToken을 제거한 후 새로 요청
          useAuthStore.getState().login(null, null, refreshToken, null);

          const res = await api.post("/api/auth/refresh", { refreshToken });

          // 새 accessToken 저장
          login(
            res.data.idToken,
            res.data.accessToken,
            res.data.refreshToken,
            res.data.member
          );

          // 요청 헤더 업데이트 후 재시도
          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("리프레시 토큰 만료됨, 로그아웃");
          logout();
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
