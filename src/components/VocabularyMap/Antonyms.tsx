import { LockButton, MissionContents, Tooltip } from '@/components';
import { useDetectClose } from '@/hooks';
import { useCompletedWordsStore } from '@/store';
import { useEffect } from 'react';

const DATA = {
  antonyms: {
    mission: {
      qustion: '"depression"과 반대되는 단어는?',
      choice: ['happiness', 'sadness'],
      answer: 'happiness',
    },
    degree: {
      happiness: {
        commentary: 'happiness_commentary',
        example: 'happiness_example',
      },
      joy: {
        commentary: 'joy_commentary',
        example: 'joy_example',
      },
      cheerfulness: {
        commentary: 'cheerfulness_commentary',
        example: 'cheerfulness_example',
      },
      hopefulness: {
        commentary: 'hopefulness_commentary',
        example: 'hopefulness_example',
      },
    },
  },
};

type Props = {
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

export default function Antonyms({
  isCompleted,
  isActive,
  onClick,
  onSubmitAnswer,
}: Props) {
  const completedWords = useCompletedWordsStore(
    (state) => state.completedWords,
  );
  const canShowMissionContents = completedWords.length === 1;
  const antonymWords = Object.keys(DATA.antonyms.degree);
  const {
    ref: missionRef,
    isOpen: isMissionOpen,
    setIsOpen: setIsMissionOpen,
  } = useDetectClose();

  useEffect(() => {
    setIsMissionOpen(isActive && canShowMissionContents);
  }, [isActive, canShowMissionContents, setIsMissionOpen]);

  return (
    <div className="absolute -top-32 -right-96 z-10 flex w-100 flex-col items-center gap-3">
      <Tooltip
        position="bottom-center"
        isVisible={completedWords.length === 1 && !isMissionOpen}
      >
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      <LockButton
        isCompleted={isCompleted}
        isActive={isMissionOpen}
        title="Antonyms"
        onClick={onClick}
      />

      {completedWords.length === 3 && (
        <div className="relative">
          {antonymWords.map((word, index) => {
            const lineConfigs = [
              {
                transform: 'rotate(210deg) translate(-10px, 100px)',
                length: '90px',
              },
              {
                transform: 'rotate(155deg) translate(10px, 90px)',
                length: '90px',
              },
              {
                transform: 'rotate(295deg) translate(60px, 60px)',
                length: '90px',
              },
              {
                transform: 'rotate(-5deg) translate(25px, -10px)',
                length: '95px',
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

          {antonymWords.map((word, index) => (
            <div
              key={word}
              className={`absolute rounded-[16px] border-[2px] border-[#FAA8A5] bg-[#FAD8D7] px-4 py-1 text-[22px] font-[500] text-[#EB1E17] ${
                index === 0
                  ? '-top-50 left-16'
                  : index === 1
                    ? '-top-50 right-16'
                    : index === 2
                      ? '-bottom-10 left-40'
                      : '-right-20 -bottom-30'
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
        <Tooltip
          position="top-center"
          bgColor="#ffffff"
          isVisible={isMissionOpen}
        >
          <div ref={missionRef}>
            <MissionContents
              question={DATA.antonyms.mission.qustion}
              choice={DATA.antonyms.mission.choice}
              answer={DATA.antonyms.mission.answer}
              onSubmit={onSubmitAnswer}
            />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
