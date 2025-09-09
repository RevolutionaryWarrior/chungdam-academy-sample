import { Antonyms, Synonyms, WordPartners } from '@/components';
import { useCompletedWordsStore } from '@/store';
import { useState } from 'react';

const Vector = () => (
  <svg
    width="407"
    height="374"
    viewBox="0 0 407 374"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M401.279 240.118C379.736 321.68 299.731 367.91 215.882 373.408C130.813 378.985 42.2956 345.311 10.9152 265.711C-20.5976 185.776 19.6502 98.8656 86.4553 45.1031C150.182 -6.18227 237.829 -15.892 307.335 27.1628C380.082 72.2255 423.193 157.151 401.279 240.118Z"
      fill="url(#paint0_radial_2_860)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_2_860"
        cx="0"
        cy="0"
        r="1"
        gradientTransform="matrix(246.022 -1.30465 1.26354 239.35 189.181 166.126)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.120192" stopColor="#FFCCE5" />
        <stop offset="0.634615" stopColor="#FFA3CF" />
        <stop offset="0.92513" stopColor="#F56CAE" />
        <stop offset="1" stopColor="#F593C2" />
      </radialGradient>
    </defs>
  </svg>
);

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

  const showTooltipForSynonyms = completedWords.length === 0 && !active;
  const showTooltipForAntonyms = completedWords.length === 1 && !active;
  const showTooltipForWordPartners = completedWords.length === 2 && !active;

  return (
    <div className="flex h-[100%] w-full items-center justify-center">
      <div className="relative">
        <Synonyms
          isCompleted={isCompleted(KEYWORDS.SYNONYMS)}
          isActive={active === KEYWORDS.SYNONYMS}
          showTooltip={showTooltipForSynonyms}
          onClick={() => onClickButton(KEYWORDS.SYNONYMS)}
          onSubmitAnswer={onSubmitAnswer}
        />

        <Antonyms
          isCompleted={isCompleted(KEYWORDS.ANTONYMS)}
          isActive={active === KEYWORDS.ANTONYMS && !showTooltipForAntonyms}
          showTooltip={showTooltipForAntonyms}
          onClick={() => onClickButton(KEYWORDS.ANTONYMS)}
          onSubmitAnswer={onSubmitAnswer}
        />

        {completedWords.includes(KEYWORDS.SYNONYMS) &&
          completedWords.length === 3 && (
            <div
              className="absolute"
              style={{
                ...LINE_ANIMATION_SETTING,
                transform: 'rotate(125deg) translate(30px, 100px)',
              }}
            />
          )}

        {completedWords.includes(KEYWORDS.ANTONYMS) &&
          completedWords.length === 3 && (
            <div
              className="absolute"
              style={{
                ...LINE_ANIMATION_SETTING,
                transform: 'rotate(240deg) translate(10px, 170px)',
              }}
            />
          )}

        {completedWords.includes(KEYWORDS.WORD_PARTNERS) &&
          completedWords.length === 3 && (
            <div
              className="absolute"
              style={{
                ...LINE_ANIMATION_SETTING,
                transform: 'rotate(55deg) translate(-30px, 100px)',
              }}
            />
          )}

        <div className="relative h-[374px] w-[407px]">
          <Vector />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] font-[800] text-[#000]">
            {WORD}
          </p>
        </div>

        <WordPartners
          isCompleted={isCompleted(KEYWORDS.WORD_PARTNERS)}
          isActive={
            active === KEYWORDS.WORD_PARTNERS && !showTooltipForWordPartners
          }
          showTooltip={showTooltipForWordPartners}
          onClick={() => onClickButton(KEYWORDS.WORD_PARTNERS)}
          onSubmitAnswer={onSubmitAnswer}
        />
      </div>
    </div>
  );
}
