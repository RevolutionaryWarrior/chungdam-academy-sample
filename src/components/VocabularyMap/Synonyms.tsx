import { LockButton, MissionContents, Tooltip } from '@/components';
import { useCompletedWordsStore } from '@/store';
import { useState } from 'react';
import SynonymsSelector from './SynonymsSelecter';

type WordsType = 'sadness' | 'despair' | 'despondency' | 'misery';

const DATA = {
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
};

type Props = {
  isCompleted: boolean;
  isActive: boolean;
  showTooltip: boolean;
  onClick: () => void;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

export default function Synonyms({
  isCompleted,
  isActive,
  showTooltip,
  onClick,
  onSubmitAnswer,
}: Props) {
  const completedWords = useCompletedWordsStore(
    (state) => state.completedWords,
  );

  const [selected, setSelected] = useState<
    'sadness' | 'despair' | 'despondency' | 'misery' | null
  >(null);
  const [openAnswer, setOpenAnswer] = useState<boolean>(false);
  const canShowMissionContents = completedWords.length === 0;

  const handleLockButtonClick = () => {
    if (isCompleted) {
      setOpenAnswer(!openAnswer);
    }
    onClick();
  };
  const synonymWords = Object.keys(DATA.synonyms.degree);

  return (
    <div className="absolute -top-40 -left-120 z-10 flex w-100 flex-col items-center gap-3">
      <Tooltip position="bottom-center" isVisible={showTooltip}>
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      <LockButton
        isCompleted={isCompleted}
        isActive={isActive}
        title="Synonyms"
        onClick={handleLockButtonClick}
      />

      {/* 단어 선택 보기 */}
      {openAnswer && (
        <Tooltip
          position="top-left"
          bgColor="#ffffff"
          isVisible={openAnswer}
          className="absolute top-33 left-25"
          disableOutsideClick
        >
          <SynonymsSelector
            selected={selected}
            onSelect={(word: WordsType) => setSelected(word)}
            degree={DATA.synonyms.degree}
            isVisible={openAnswer}
          />
        </Tooltip>
      )}

      {/* 문제 보기 */}
      {completedWords.length === 3 && (
        <div className="relative">
          {synonymWords.map((word, index) => {
            const lineConfigs = [
              {
                transform: 'rotate(170deg) translate(-10px, 80px)',
                length: '90px',
              },
              {
                transform: 'rotate(-250deg) translate(-25px, 100px)',
                length: '100px',
              },
              {
                transform: 'rotate(70deg) translate(-50px, 70px)',
                length: '90px',
              },
              {
                transform: 'rotate(15deg) translate(0px, -15px)',
                length: '100px',
              },
            ];

            return (
              <div
                key={`line-${word}`}
                className="absolute"
                style={
                  {
                    top: '50%',
                    left: '50%',
                    width: '3px',
                    height: '0px',
                    backgroundColor: '#ADAEB2',
                    transform: lineConfigs[index].transform,
                    transformOrigin: 'center top',
                    animation: `drawLineSmall 0.5s ease-out ${index * 0.15 + 0.3}s forwards`,
                    opacity: 0,
                    ['--line-Height' as any]: lineConfigs[index].length,
                  } as React.CSSProperties
                }
              />
            );
          })}

          {synonymWords.map((word, index) => (
            <div
              key={word}
              className={`absolute rounded-[16px] border-[2px] border-[#A5C5FA] bg-[#D7E4FA] px-4 py-1 text-[22px] font-[500] text-[#0E5EE5] ${
                index === 0
                  ? '-top-50 -left-16'
                  : index === 1
                    ? '-top-30 -left-70'
                    : index === 2
                      ? '-bottom-8 -left-80'
                      : '-bottom-30 -left-20'
              }`}
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      )}

      {isActive && canShowMissionContents && (
        <Tooltip position="top-center" bgColor="#ffffff" isVisible={true}>
          <MissionContents
            question={DATA.synonyms.mission.qustion}
            choice={DATA.synonyms.mission.choice}
            answer={DATA.synonyms.mission.answer}
            onSubmit={onSubmitAnswer}
          />
        </Tooltip>
      )}
    </div>
  );
}
