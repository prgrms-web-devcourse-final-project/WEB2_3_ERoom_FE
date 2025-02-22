import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, // 기본적으로 로그인 상태가 아님
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
