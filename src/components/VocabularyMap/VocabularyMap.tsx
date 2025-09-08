import { Antonyms, Synonyms, WordPartners } from '@/components';
import Vector from '@icons/vector.svg?react';
import { useState } from 'react';

const KEYWORDS = {
  SYNONYMS: 'synonyms',
  ANTONYMS: 'antonyms',
  WORD_PARTNERS: 'wordPartners',
} as const;

type Turn = (typeof KEYWORDS)[keyof typeof KEYWORDS];

const WORD = 'depression';

export default function VocabularyMap() {
  const [completedWords, setCompletedWords] = useState<Turn[]>([]);
  const [active, setActive] = useState<Turn | null>(null);

  const onClickButton = (word: Turn) => {
    setActive(active === word ? null : word);
  };

  const onSubmitAnswer = (isCorrect: boolean) => {
    if (isCorrect && active) {
      setCompletedWords((prev) => [...prev, active]);
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
          isCompleted={completedWords.includes(KEYWORDS.SYNONYMS)}
          isActive={active === KEYWORDS.SYNONYMS}
          showTooltip={showTooltipForSynonyms}
          onClick={() => onClickButton(KEYWORDS.SYNONYMS)}
          onSubmitAnswer={onSubmitAnswer}
        />

        <Antonyms
          isCompleted={completedWords.includes(KEYWORDS.ANTONYMS)}
          isActive={active === KEYWORDS.ANTONYMS && !showTooltipForAntonyms}
          showTooltip={showTooltipForAntonyms}
          onClick={() => onClickButton(KEYWORDS.ANTONYMS)}
          onSubmitAnswer={onSubmitAnswer}
        />

        <div className="relative h-[374px] w-[407px]">
          <Vector />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[64px] font-[800] text-[#000]">
            {WORD}
          </p>
        </div>

        <WordPartners
          isCompleted={completedWords.includes(KEYWORDS.WORD_PARTNERS)}
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
