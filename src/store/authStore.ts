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
  login: (
    idToken: string | null,
    accessToken: string | null,
    refreshToken: string | null,
    member: Member | null
  ) => void;
  logout: () => void;
  updateMember: (updateInfo: Partial<Member>) => void;
  setIsAuthenticated: () => void;
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
      login: (idToken, accessToken, refreshToken, member) =>
        set(() => ({
          idToken,
          accessToken,
          refreshToken,
          member,
        })),
      logout: () =>
        set(() => {
          return { member: null, accessToken: null, isAuthenticated: false };
        }),
      updateMember: (updateInfo: Partial<Member>) =>
        set((state) => ({
          member: state.member ? { ...state.member, ...updateInfo } : null,
        })),
      setIsAuthenticated: () => set(() => ({ isAuthenticated: true })),
    }),
    {
      name: "userData",
    }
  )
);
