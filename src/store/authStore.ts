import { create } from "zustand";
import { persist } from "zustand/middleware";

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   organization: string;
//   profileImage?: string;
// }

interface AuthState {
  isAuthenticated: boolean;
  idToken: null | string;
  accessToken?: null | string;
  refreshToken?: null | string;
  member: Member | null;
  registered?: boolean;
  // user: User | null;
  // login: (userData: User | null, token: null | string) => void;
  user: any;
  login: (
    idToken: string | null,
    accessToken: string | null,
    refreshToken: string | null,
    member: Member | null
  ) => void;
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
      idToken: null,
      accessToken: null,
      member: null,
      // user: null,
      // login: (userData, token?) =>
      //   set(() => ({ user: userData, token, isAuthenticated: true })),
      // logout: () =>
      //   set(() => {
      //     return { user: null, token: null, isAuthenticated: false };
      //   }),
      user: null,
      login: (idToken, accessToken, refreshToken, member) =>
        set(() => ({
          idToken,
          accessToken,
          refreshToken,
          member,
          isAuthenticated: true,
        })),
      logout: () =>
        set(() => {
          return { user: null, accessToken: null, isAuthenticated: false };
        }),
    }),
    {
      name: "userData",
    }
  )
);
