import Puzzle from '@icons/puzzle-piece.svg?react';
import { useEffect, useState } from 'react';

type ChoiceState =
  | 'default'
  | 'selected'
  | 'correct'
  | 'incorrect'
  | 'disabled';

const choiceVariants = Object.freeze({
  default: Object.freeze({
    container: 'border-[#E1E2E5] bg-white',
    label: 'bg-[#F0F0F2] text-[#4B4B4D]',
    text: 'text-[#4B4B4D]',
    labelStyle: undefined,
  }),
  selected: Object.freeze({
    container: 'border-[#00BABB] bg-[#00BABB]/10',
    label: 'text-[#19191A]',
    text: 'text-[#00BABB]',
    labelStyle: {
      background:
        'radial-gradient(79.06% 85.14% at 37.5% 29.69%, var(--teal-tint02, #CEEBEB) 12.02%, var(--teal-tint01, #99D1D0) 63.46%, var(--main-color, #24B3B1) 92.51%, var(--teal-tint03, #E5F2F2) 100%), radial-gradient(79.06% 85.14% at 37.5% 29.69%, #FFCCE5 12.02%, #FFA3CF 63.46%, #F56CAE 92.51%, #F593C2 100%)',
      boxShadow: '0 1px 8px -1px rgba(78, 153, 152, 0.35)',
    },
  }),
  correct: Object.freeze({
    container: 'border-[#1E90FF] bg-[#F0F7FF]',
    label: 'bg-[#0085FF] text-white',
    text: 'text-[#313233]',
    labelStyle: undefined,
  }),
  incorrect: Object.freeze({
    container: 'border-[#F66] bg-[#FFF0F0]',
    label: 'bg-red-500 text-white',
    text: 'text-red-700',
    labelStyle: undefined,
  }),
  disabled: Object.freeze({
    container: 'border-[#E1E2E5] bg-[#D7D8DB]',
    label: 'bg-[#F0F0F2] text-[#4B4B4D]',
    text: 'text-[#949599]',
    labelStyle: undefined,
  }),
});

type Props = {
  question: string;
  answer: string;
  choice: string[];
  onSubmit: (isCorrect: boolean) => void;
};

export default function MissionContents({
  question,
  answer,
  choice,
  onSubmit,
}: Props) {
  const [activeChoice, setActiveChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    setActiveChoice(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, []);

  const onClickChoice = (selectedChoice: string) => {
    setActiveChoice(selectedChoice);
  };

  const onClickSubmit = () => {
    if (isSubmitted && isCorrect) {
      setActiveChoice(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      onSubmit(true);
    } else if (isSubmitted && !isCorrect) {
      setActiveChoice(null);
      setIsSubmitted(false);
      setIsCorrect(false);
    } else if (activeChoice && !isSubmitted) {
      const correct = activeChoice === answer;
      setIsCorrect(correct);
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      <div className="flex w-fit items-center gap-1 rounded-[999px] bg-[#FFF4D9] px-3 py-1">
        <Puzzle />
        <p className="text-[18px] text-[#F70]">Mission</p>
      </div>
      <p className="mt-4 text-[20px] font-[500] whitespace-nowrap text-[#19191A]">
        {question}
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {choice.map((item, index) => {
          const letter = String.fromCharCode(97 + index);

          const getChoiceState = (): ChoiceState => {
            if (isSubmitted) {
              if (item === activeChoice) {
                return activeChoice === answer ? 'correct' : 'incorrect';
              }
              return 'default';
            }

            if (activeChoice === item) return 'selected';
            return 'default';
          };

          const choiceState = getChoiceState();
          const variant = choiceVariants[choiceState];

          return (
            <li
              key={`${item}-${index}`}
              onClick={() => !isSubmitted && onClickChoice(item)}
              className={`${activeChoice && 'transition-all active:scale-95'} ${variant.container} flex cursor-pointer items-center justify-between rounded-[16px] border p-3`}
            >
              <div className="flex items-center gap-2">
                <p
                  className={`${variant.label} rounded-[12px] px-2 py-[6px] text-[18px] leading-[16px] font-[600]`}
                  style={variant.labelStyle}
                >
                  {letter}
                </p>
                <p className={`${variant.text} text-[18px] leading-[27px]`}>
                  {item}
                </p>
              </div>
              <p
                className={`${activeChoice === item && isCorrect ? 'text-[#0085FF]' : 'text-[#F66]'} text-[14px] font-[500]`}
              >
                {activeChoice === item && isCorrect
                  ? '정답'
                  : activeChoice === item && isSubmitted
                    ? '오답'
                    : ''}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="my-4 h-[1px] w-full bg-[#E1E2E5]" />
      <button
        onClick={onClickSubmit}
        disabled={!activeChoice && !isSubmitted}
        className={`w-full rounded-[16px] py-4 ${
          activeChoice || isSubmitted
            ? 'cursor-pointer bg-[#24B3B1]'
            : 'cursor-not-allowed bg-[#D7D8DB]'
        }`}
      >
        <p
          className={`${
            activeChoice || isSubmitted ? 'text-white' : 'text-[#949599]'
          } text-[18px] font-[600]`}
        >
          {isSubmitted ? (isCorrect ? '잠금해제!' : '다시 풀기') : '제출하기'}
        </p>
      </button>
    </div>
  );
}
