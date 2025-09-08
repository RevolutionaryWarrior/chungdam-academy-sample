import { LockButton, MissionContents, Tooltip } from '@/components';

const DATA = {
  wordPartners: {
    mission: {
      qustion: '"depression"과 함께 쓰이는 단어는?',
      choice: ['(a) deep', '(b) light'],
      answer: '(b) light',
    },
    degree: {},
  },
};

type Props = {
  isCompleted: boolean;
  isActive: boolean;
  showTooltip: boolean;
  onClick: () => void;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

export default function WordPartners({
  isCompleted,
  isActive,
  showTooltip,
  onClick,
  onSubmitAnswer,
}: Props) {
  return (
    <div className="absolute -bottom-30 -left-120 flex w-100 flex-col items-center gap-3">
      <Tooltip position="bottom-center" isVisible={showTooltip}>
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      {isActive && showTooltip && (
        <Tooltip position="top-center" bgColor="#ffffff" isVisible={true}>
          <MissionContents
            question={DATA.wordPartners.mission.qustion}
            choice={DATA.wordPartners.mission.choice}
            answer={DATA.wordPartners.mission.answer}
            onSubmit={onSubmitAnswer}
          />
        </Tooltip>
      )}

      <LockButton
        isCompleted={isCompleted}
        isActive={isActive}
        title="Word Partners"
        onClick={onClick}
      />
    </div>
  );
}
