import { useProgressStore } from '@/store';
import ChevronRightIcon from '@icons/chevron-right.svg?react';

const DATA = {
  questionNumber: 'Q5',
  question: '빈칸에 들어갈 가장 적절한 단어 쌍을 고르세요.',
  innerContents: [
    'While simple',
    'an be a normal reaction to loss, clinical',
    'is a more serious condition that requires medical attention.',
  ],
  choice: [
    '(a) A feeling of great happiness and joy.',
    '(b) A feeling of being very tired or having no energy.',
    '(c) A feeling of hunger or thirst.',
    '(d) A feeling of excitement and anticipation.',
  ],
};

export default function MultipleChoice() {
  const { increaseProgress } = useProgressStore();

  const onClickNext = () => {
    increaseProgress();
  };
  return (
    <div className="flex h-[100%] w-full flex-col items-center justify-center">
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
          {DATA.choice.map((item, index) => (
            <li
              key={`choice-${index}`}
              className="flex cursor-pointer items-center gap-2.5 rounded-[20px] border border-[#E1E2E5] p-3 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-[#08191A]/20 active:scale-95"
            >
              <p className="rounded-[12px] bg-[#F0F0F2] px-3 py-[7px] text-[18px] font-[600] text-[#4B4B4D]">
                a
              </p>
              <p className="text-[18px] leading-[27px] text-[#4B4B4D]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClickNext}
        className="mt-7 flex w-[223px] cursor-pointer items-center justify-center gap-1 rounded-[20px] bg-[#24B3B1] px-5 py-3 text-[20px] font-[500] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#08191A]/20 active:scale-95"
      >
        <span>Next</span>
        <ChevronRightIcon className="relative bottom-[1px] size-6 fill-white" />
      </button>
    </div>
  );
}
