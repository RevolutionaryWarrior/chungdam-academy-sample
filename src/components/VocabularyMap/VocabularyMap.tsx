import { Antonyms, Synonyms, WordPartners } from '@/components';
import { useCompletedWordsStore } from '@/store';
import Circle1 from '@icons/subtract-1.svg?react';
import Circle2 from '@icons/subtract-2.svg?react';
import Circle3 from '@icons/subtract-3.svg?react';
import Circle4 from '@icons/subtract-4.svg?react';
import { useState } from 'react';

const KEYWORDS = Object.freeze({
  SYNONYMS: 'synonyms',
  ANTONYMS: 'antonyms',
  WORD_PARTNERS: 'wordPartners',
});

type Turn = (typeof KEYWORDS)[keyof typeof KEYWORDS];

const LINE_ANIMATION_SETTING = {
  top: '50%',
  left: '50%',
  width: '3px',
  backgroundColor: '#ADAEB2',
  transformOrigin: 'center top',
  animation: 'drawLineDiagonal 0.8s ease-out forwards',
};

const CIRCLE_ANIMATION_STYLE = {
  animation: 'circleRotate 4s linear infinite',
};

const WORD = 'depression';

export default function VocabularyMap() {
  const { completedWords, addCompletedWord, isCompleted } =
    useCompletedWordsStore();
  const [active, setActive] = useState<Turn | null>(null);

  const onClickButton = (word: Turn) => {
    setActive(active === word ? null : word);
  };

  const onSubmitAnswer = (isCorrect: boolean) => {
    if (isCorrect && active) {
      addCompletedWord(active);
    }

    setActive(null);
  };

  return (
    <>
      <style>
        {`
          @keyframes circleRotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="flex h-[100vh] w-full items-center justify-center overflow-hidden">
        <div className="relative -translate-y-[50px] scale-80 transform">
          <Synonyms
            isCompleted={isCompleted(KEYWORDS.SYNONYMS)}
            isActive={active === KEYWORDS.SYNONYMS}
            onClick={() => onClickButton(KEYWORDS.SYNONYMS)}
            onSubmitAnswer={onSubmitAnswer}
          />

          <Antonyms
            isCompleted={isCompleted(KEYWORDS.ANTONYMS)}
            isActive={
              active === KEYWORDS.ANTONYMS && completedWords.length === 1
            }
            onClick={() => onClickButton(KEYWORDS.ANTONYMS)}
            onSubmitAnswer={onSubmitAnswer}
          />

          {completedWords.includes(KEYWORDS.SYNONYMS) &&
            completedWords.length === 3 && (
              <div
                className="absolute"
                style={{
                  ...LINE_ANIMATION_SETTING,
                  transform: 'rotate(125deg) translate(30px, 10px)',
                }}
              />
            )}

          {completedWords.includes(KEYWORDS.ANTONYMS) &&
            completedWords.length === 3 && (
              <div
                className="absolute"
                style={{
                  ...LINE_ANIMATION_SETTING,
                  transform: 'rotate(240deg) translate(10px, 10px)',
                }}
              />
            )}

          {completedWords.includes(KEYWORDS.WORD_PARTNERS) &&
            completedWords.length === 3 && (
              <div
                className="absolute"
                style={{
                  ...LINE_ANIMATION_SETTING,
                  transform: 'rotate(55deg) translate(-30px, 10px)',
                }}
              />
            )}

          <div className="relative h-[374px] w-[407px] rounded-full bg-white">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={CIRCLE_ANIMATION_STYLE}
            >
              <Circle1 />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={CIRCLE_ANIMATION_STYLE}
            >
              <Circle2 />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={CIRCLE_ANIMATION_STYLE}
            >
              <Circle3 />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={CIRCLE_ANIMATION_STYLE}
            >
              <Circle4 />
            </div>

            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[44px] font-[800] text-[#000]">
              {WORD}
            </p>
          </div>

          <WordPartners
            isCompleted={isCompleted(KEYWORDS.WORD_PARTNERS)}
            isActive={
              active === KEYWORDS.WORD_PARTNERS && completedWords.length === 2
            }
            onClick={() => onClickButton(KEYWORDS.WORD_PARTNERS)}
            onSubmitAnswer={onSubmitAnswer}
          />
        </div>
      </div>
    </>
  );
}
