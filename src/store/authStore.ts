import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
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
