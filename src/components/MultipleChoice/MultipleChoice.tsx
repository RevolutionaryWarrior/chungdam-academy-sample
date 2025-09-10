import { useProgressStore } from '@/store';
import ChevronRightIcon from '@icons/chevron-right.svg?react';
import { useState } from 'react';

const DATA = {
  questionNumber: 'Q5',
  question: '빈칸에 들어갈 가장 적절한 단어 쌍을 고르세요.',
  innerContents: [
    'While simple',
    'an be a normal reaction to loss, clinical',
    'is a more serious condition that requires medical attention.',
  ],
  choice: [
    '(a) fatigue / depression',
    '(b) sadness / depression',
    '(c) therapy / sadness',
    '(d) despair / joy',
  ],
  answer: '(b) sadness / depression',
};

type ChoiceState = 'default' | 'selected' | 'correct' | 'incorrect';

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
});

export default function MultipleChoice() {
  const { increaseProgress } = useProgressStore();
  const [activeChoice, setActiveChoice] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const onClickChoice = (selectedChoice: string) => {
    if (!isSubmitted) {
      setActiveChoice(selectedChoice);
    }
  };

  const onClickNext = () => {
    if (!isSubmitted && activeChoice) {
      const correct = activeChoice === DATA.answer;
      setIsCorrect(correct);
      setIsSubmitted(true);
      return;
    }

    if (isSubmitted && isCorrect) {
      increaseProgress();
      return;
    }

    if (isSubmitted && !isCorrect) {
      setActiveChoice(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      return;
    }
  };

  return (
    <div className="mt-10 flex h-[100%] w-full scale-95 flex-col items-center justify-start">
      <div
        className="max-h-[726px] w-[1000px] rounded-[32px] px-[100px] py-11"
        style={{
          boxShadow: '0 4px 40px 0 rgba(199, 135, 166, 0.18)',
        }}
      >
        <div className="flex items-center gap-2">
          <p className="rounded-[20px] bg-[#0B2626] px-3 py-1.5 text-[20px] leading-[20px] font-[600] text-[#E5F2F2]">
            {DATA.questionNumber}
          </p>
          <p className="text-[24px] leading-[36px] font-[600] text-[#313233]">
            {DATA.question}
          </p>
        </div>
        <div className="mt-[26px] flex max-w-[800px] flex-wrap items-center gap-[6px] rounded-[20px] bg-[#F0F0F2] px-10 py-4">
          {DATA.innerContents.map((item, index) => (
            <>
              <p
                key={`text-${index}`}
                className="text-[18px] leading-[27px] text-[#313233]"
              >
                {item}
              </p>
              {index < DATA.innerContents.length - 1 && (
                <div
                  key={`gap-${index}`}
                  className="h-[36px] w-[100px] rounded-[12px] border border-[#C8C9CC] bg-white"
                />
              )}
            </>
          ))}
        </div>
        <ul className="mt-[30px] flex flex-col gap-3">
          {DATA.choice.map((item, index) => {
            const letter = String.fromCharCode(97 + index); // a, b, c, d...

            const getChoiceState = (): ChoiceState => {
              if (isSubmitted) {
                if (item === activeChoice) {
                  return activeChoice === DATA.answer ? 'correct' : 'incorrect';
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
                key={`choice-${index}`}
                onClick={() => onClickChoice(item)}
                className={`${activeChoice && 'transition-all active:scale-95'} ${variant.container} flex cursor-pointer items-center justify-between rounded-[20px] border p-3`}
              >
                <div className="flex items-center gap-2.5">
                  <p
                    className={`${variant.label} rounded-[12px] px-3 py-[7px] text-[18px] font-[600]`}
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
      </div>
      <button
        onClick={onClickNext}
        disabled={!activeChoice && !isSubmitted}
        className={`mt-7 flex w-[223px] items-center justify-center gap-1 rounded-[20px] px-5 py-3 text-[20px] font-[500] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#08191A]/20 active:scale-95 ${
          activeChoice || isSubmitted
            ? 'cursor-pointer bg-[#24B3B1]'
            : 'cursor-not-allowed bg-[#D7D8DB]'
        }`}
      >
        <span>
          {isSubmitted ? (isCorrect ? 'Next' : '다시 풀기') : '제출하기'}
        </span>
        <ChevronRightIcon className="relative bottom-[1px] size-6 fill-white" />
      </button>
    </div>
  );
}
