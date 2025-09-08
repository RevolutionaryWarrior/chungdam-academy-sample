import { LockButton, MissionContents, Tooltip } from '@/components';

const DATA = {
  antonyms: {
    mission: {
      qustion: '"depression"과 반대되는 단어는?',
      choice: ['(a) happiness', '(b) sadness'],
      answer: '(a) happiness',
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
  showTooltip: boolean;
  onClick: () => void;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

export default function Antonyms({
  isCompleted,
  isActive,
  showTooltip,
  onClick,
  onSubmitAnswer,
}: Props) {
  const antonymWords = Object.keys(DATA.antonyms.degree);

  return (
    <div className="absolute -top-40 -right-120 z-10 flex w-100 flex-col items-center gap-3">
      <Tooltip position="bottom-center" isVisible={showTooltip}>
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      <LockButton
        isCompleted={isCompleted}
        isActive={isActive}
        title="Antonyms"
        onClick={onClick}
      />

      {isCompleted && (
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
              className={`absolute rounded-[16px] border-[2px] border-[#FFA5A5] bg-[#FFD7D7] px-4 py-1 text-[22px] font-[500] text-[#E50E0E] ${
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

      {isActive && (
        <Tooltip position="bottom-center" bgColor="#ffffff" isVisible={true}>
          <MissionContents
            question={DATA.antonyms.mission.qustion}
            choice={DATA.antonyms.mission.choice}
            answer={DATA.antonyms.mission.answer}
            onSubmit={onSubmitAnswer}
          />
        </Tooltip>
      )}
    </div>
  );
}
