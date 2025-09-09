import { create } from 'zustand';

const KEYWORDS = {
  SYNONYMS: 'synonyms',
  ANTONYMS: 'antonyms',
  WORD_PARTNERS: 'wordPartners',
} as const;

type Turn = (typeof KEYWORDS)[keyof typeof KEYWORDS];

type CompletedWordsState = {
  completedWords: Turn[];
  addCompletedWord: (word: Turn) => void;
  isCompleted: (word: Turn) => boolean;
};

export const useCompletedWordsStore = create<CompletedWordsState>()(
  (set, get) => ({
    completedWords: [],
    addCompletedWord: (word) =>
      set((state) => ({
        completedWords: [...state.completedWords, word],
      })),
    isCompleted: (word) => get().completedWords.includes(word),
  }),
);

export { KEYWORDS };
export type { Turn };
