import { create } from "zustand";

interface RedirectState {
  shouldRedirect: boolean;
  setRedirect: (value: boolean) => void;
}

export const useRedirectStore = create<RedirectState>((set) => ({
  shouldRedirect: false,
  setRedirect: (value) => set({ shouldRedirect: value }),
}));
