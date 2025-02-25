import { create } from "zustand";

interface SideManagerStore {
  checkedManagers: string[];
  handleAllClick: (managers: string[]) => void;
  handleUnAllClick: () => void;
  handleManagerClick: (name: string) => void;
}

export const useSideManagerStore = create<SideManagerStore>((set) => ({
  checkedManagers: [],
  handleAllClick: (managers) => set({ checkedManagers: managers }),

  handleUnAllClick: () => set(() => ({ checkedManagers: [] })),

  handleManagerClick: (name) =>
    set((state) => ({
      checkedManagers: state.checkedManagers.includes(name)
        ? state.checkedManagers.filter((manager) => manager !== name)
        : [...state.checkedManagers, name],
    })),
}));
