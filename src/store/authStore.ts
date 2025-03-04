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
  token: null | string;
  accessToken?: null | string;
  refreshToken?: null | string;
  member: Member | null;
  registered?: boolean;
  // user: User | null;
  // login: (userData: User | null, token: null | string) => void;
  user: any;
  login: (accessToken: string | null, member: Member | null) => void;
  logout: () => void;
}

interface Member {
  createdAt: string;
  deleteStatus: string;
  email: string;
  id: number;
  memberGrade: string;
  organization: string;
  password: string | null;
  profile: string;
  username: string;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      //카카오 로그인 주석 처리
      token: null,
      accessToken: null,
      member: {
        createdAt: "",
        deleteStatus: "",
        email: "",
        id: 0,
        memberGrade: "",
        organization: "",
        password: "",
        profile: "",
        username: "",
      },
      // user: null,
      // login: (userData, token?) =>
      //   set(() => ({ user: userData, token, isAuthenticated: true })),
      // logout: () =>
      //   set(() => {
      //     return { user: null, token: null, isAuthenticated: false };
      //   }),
      user: null,
      login: (accessToken, user) =>
        set(() => ({
          accessToken,
          user,
          isAuthenticated: true,
        })),
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
