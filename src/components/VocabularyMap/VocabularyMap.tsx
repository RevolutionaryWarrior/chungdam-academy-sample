import { LockButton } from '@/components';
import Vector from '@icons/vector.svg?react';
import { useState } from 'react';

type Turn = 'synonyms' | 'antonyms' | 'wordPartners';

const DATA = {
  word: 'depression',
  synonyms: {
    mission: {
      qustion: '`depression`과 가장 유사한 단어는?',
      choice: ['joy', 'sadness'],
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
};

export default function VocabularyMap() {
  const [completedWords, setCompletedWords] = useState<Turn[]>([]);
  const [active, setActive] = useState<Turn>('synonyms');

  const onClickButton = (word: Turn) => {
    setActive(word);
  };

  return (
    <div className="flex h-[100%] w-full items-center justify-center">
      <div className="relative">
        <div className="absolute -top-40 -left-120">
          <LockButton
            isCompleted={completedWords.includes('synonyms')}
            isActive={active === 'synonyms'}
            title="Synonyms"
            onClick={() => onClickButton('synonyms')}
          />
        </div>
        <div className="absolute -top-40 -right-120">
          <LockButton
            isCompleted={completedWords.includes('antonyms')}
            isActive={active === 'antonyms'}
            title="Antonyms"
            onClick={() => onClickButton('antonyms')}
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
            isCompleted={completedWords.includes('wordPartners')}
            isActive={active === 'wordPartners'}
            title="Word Partners"
            onClick={() => onClickButton('wordPartners')}
          />
        </div>
      </div>
    </div>
  );
}
