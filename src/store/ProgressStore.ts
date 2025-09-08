import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  progress: number;
  setProgress: (value: number) => void;
  resetToOne: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: 1,
      setProgress: (value) => set({ progress: value }),
      resetToOne: () => set({ progress: 1 }),
    }),
    {
      name: "progress-store",
      version: 1,
    }
  )
);
