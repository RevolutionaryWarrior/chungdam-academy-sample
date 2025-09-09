import { LockButton, MissionContents, Tooltip } from '@/components';
import { useCompletedWordsStore } from '@/store';

const DATA = {
  antonyms: {
    mission: {
      qustion: '"depression"과 반대되는 단어는?',
      choice: ['(a) happiness', '(b) sadness'],
      answer: '(b) sadness',
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

export default function Antonyms({
  isCompleted,
  isActive,
  showTooltip,
  onClick,
  onSubmitAnswer,
}: Props) {
  const completedWords = useCompletedWordsStore(
    (state) => state.completedWords,
  );

  const canShowMissionContents = completedWords.length === 1;

  return (
    <div className="absolute -top-40 -right-120 flex w-100 flex-col items-center gap-3">
      <Tooltip position="bottom-center" isVisible={showTooltip}>
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      <LockButton
        isCompleted={isCompleted}
        isActive={isActive}
        title="Antonyms"
        onClick={onClick}
      />

      {isActive && canShowMissionContents && (
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
