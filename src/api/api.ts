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
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, login, logout } = useAuthStore.getState();

      if (refreshToken) {
        try {
          // 새 accessToken 요청
          const res = await axios.post("/api/auth/refresh", { refreshToken });

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
          console.error("리프레시 토큰 만료. 로그아웃 처리됨.");
          logout();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
