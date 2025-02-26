import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name: string;
  organization: string;
  profileImage?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  // token: null | string;
  // user: User | null;
  // login: (userData: User | null, token: null | string) => void;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      //카카오 로그인 주석 처리
      // token: null,
      // user: null,
      // login: (userData, token?) =>
      //   set(() => ({ user: userData, token, isAuthenticated: true })),
      // logout: () =>
      //   set(() => {
      //     return { user: null, token: null, isAuthenticated: false };
      //   }),
      user: null,
      login: (userData) =>
        set(() => ({ user: userData, isAuthenticated: true })),
      logout: () =>
        set(() => {
          return { user: null, isAuthenticated: false };
        }),
    }),
    {
      name: "userData",
    }
  )
);
