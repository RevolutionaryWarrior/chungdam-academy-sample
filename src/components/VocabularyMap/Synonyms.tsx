import { LockButton, MissionContents, Tooltip } from '@/components';

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
  return (
    <div className="absolute -top-40 -left-120 flex w-100 flex-col items-center gap-3">
      <Tooltip position="bottom-center" isVisible={showTooltip}>
        <p className="text-[14px]">클릭하여 잠금을 해제하세요</p>
      </Tooltip>

      <LockButton
        isCompleted={isCompleted}
        isActive={isActive}
        title="Synonyms"
        onClick={onClick}
      />

      {isActive && (
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
