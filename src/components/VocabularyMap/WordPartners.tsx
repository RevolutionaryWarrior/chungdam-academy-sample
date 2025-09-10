import { LockButton, MissionContents, Tooltip } from '@/components';
import { useDetectClose } from '@/hooks';
import { useCompletedWordsStore } from '@/store';
import { useEffect } from 'react';

const DATA = {
  wordPartners: {
    mission: {
      qustion: '"depression"과 함께 쓰이는 단어는?',
      choice: ['deep', 'clinical'],
      answer: 'clinical',
    },
    degree: {
      clinical: {
        commentary: 'clinical_commentary',
        example: 'clinical_example',
      },
      'overcome ~': {
        commentary: 'overcome_commentary',
        example: 'overcome_example',
      },
      'suffer from ~': {
        commentary: 'suffer_commentary',
        example: 'suffer_example',
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

export default function WordPartners({
  isCompleted,
  isActive,
  onClick,
  onSubmitAnswer,
}: Props) {
  const completedWords = useCompletedWordsStore(
    (state) => state.completedWords,
  );

  const canShowMissionContents = completedWords.length === 2;
  const wordPartnerWords = Object.keys(DATA.wordPartners.degree);
  const {
    ref: missionRef,
    isOpen: isMissionOpen,
    setIsOpen: setIsMissionOpen,
  } = useDetectClose();

  useEffect(() => {
    setIsMissionOpen(isActive && canShowMissionContents);
  }, [isActive, canShowMissionContents, setIsMissionOpen]);

  return (
    <div className="absolute -bottom-24 -left-96 z-10 flex w-100 flex-col items-center gap-3">
      <Tooltip
        position="bottom-center"
        isVisible={completedWords.length === 2 && !isMissionOpen}
      >
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      {completedWords.length === 3 && (
        <div className="relative">
          {wordPartnerWords.map((word, index) => {
            const lineConfigs = [
              {
                transform: 'rotate(-185deg) translate(10px, -15px)',
                length: '80px',
              },
              {
                transform: 'rotate(110deg) translate(60px, 90px)',
                length: '90px',
              },
              {
                transform: 'rotate(20deg) translate(-10px, 50px)',
                length: '85px',
              }, // suffer from ~로
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

          {wordPartnerWords.map((word, index) => (
            <div
              key={word}
              className={`absolute rounded-[16px] border-[2px] border-[#9ADB95] bg-[#D0EBCE] px-4 py-1 text-[22px] font-[500] text-nowrap text-[#25911D] ${
                index === 0
                  ? '-top-24 -right-8'
                  : index === 1
                    ? '-top-10 -left-80'
                    : '-right-10 -bottom-40'
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
              question={DATA.wordPartners.mission.qustion}
              choice={DATA.wordPartners.mission.choice}
              answer={DATA.wordPartners.mission.answer}
              onSubmit={onSubmitAnswer}
            />
          </div>
        </Tooltip>
      )}

      <LockButton
        isCompleted={isCompleted}
        isActive={isMissionOpen}
        title="Word Partners"
        onClick={onClick}
      />
    </div>
  );
}
