import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProgressState = {
  progress: number;
  setProgress: (value: number) => void;
  increaseProgress: () => void;
  resetToOne: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: 1,
      setProgress: (value) => set({ progress: value }),
      increaseProgress: () =>
        set((state) => ({ progress: state.progress + 1 })),
      resetToOne: () => set({ progress: 1 }),
    }),
    {
      name: 'progress-store',
      version: 1,
    },
  ),
);
