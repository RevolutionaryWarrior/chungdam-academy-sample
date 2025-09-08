import { LockButton, MissionContents } from '@/components';
import Vector from '@icons/vector.svg?react';
import { useState } from 'react';

const KEYWORDS = {
  SYNONYMS: 'synonyms',
  ANTONYMS: 'antonyms',
  WORD_PARTNERS: 'wordPartners',
} as const;

type Turn = (typeof KEYWORDS)[keyof typeof KEYWORDS];

const DATA = {
  word: 'depression',
  synonyms: {
    mission: {
      qustion: '"depression"과 가장 유사한 단어는?',
      choice: ['(a) joy', '(b) sadness'],
      answer: '(b) sadness',
    },
    degree: {
      sadness: {
        commentary: 'sadness_commentary',
        example: 'sadness_example',
      },
      despair: {
        commentary: 'despair_commentary',
        example: 'despair_example',
      },
      despondency: {
        commentary: 'despondency_commentary',
        example: 'despondency_example',
      },
      misery: {
        commentary: 'misery_commentary',
        example: 'misery_example',
      },
    },
  },
  antonyms: {
    mission: {
      qustion: '"depression"과 반대되는 단어는?',
      choice: ['(a) happiness', '(b) sadness'],
      answer: '(b) sadness',
    },
    degree: {},
  },
  wordPartners: {
    mission: {
      qustion: '"depression"과 함께 쓰이는 단어는?',
      choice: ['(a) deep', '(b) light'],
      answer: '(b) light',
    },
    degree: {},
  },
};

export default function VocabularyMap() {
  const [completedWords, setCompletedWords] = useState<Turn[]>([]);
  const [active, setActive] = useState<Turn | null>(null);

  const onClickButton = (word: Turn) => {
    setActive(word);
  };

  const onSubmitAnswer = (isCorrect: boolean) => {
    if (isCorrect && active) {
      setCompletedWords((prev) => [...prev, active]);
    }

    setActive(null);
  };

  return (
    <div className="flex h-[100%] w-full items-center justify-center">
      <div className="relative">
        <div className="absolute -top-40 -left-120">
          <LockButton
            isCompleted={completedWords.includes(KEYWORDS.SYNONYMS)}
            isActive={active === KEYWORDS.SYNONYMS}
            title="Synonyms"
            onClick={() => onClickButton(KEYWORDS.SYNONYMS)}
          />
        </div>
        {active && (
          <MissionContents
            question={DATA[active].mission.qustion}
            choice={DATA[active].mission.choice}
            answer={DATA[active].mission.answer}
            onSubmit={onSubmitAnswer}
          />
        )}
        <div className="absolute -top-40 -right-120">
          <LockButton
            isCompleted={completedWords.includes(KEYWORDS.ANTONYMS)}
            isActive={active === KEYWORDS.ANTONYMS}
            title="Antonyms"
            onClick={() => onClickButton(KEYWORDS.ANTONYMS)}
          />
        </div>
        <div className="relative h-[374px] w-[407px]">
          <Vector />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] font-[800] text-[#000]">
            {DATA.word}
          </p>
        </div>
        <div className="absolute -bottom-30 -left-120">
          <LockButton
            isCompleted={completedWords.includes(KEYWORDS.WORD_PARTNERS)}
            isActive={active === KEYWORDS.WORD_PARTNERS}
            title="Word Partners"
            onClick={() => onClickButton(KEYWORDS.WORD_PARTNERS)}
          />
        </div>
      </div>
    </div>
  );
}
