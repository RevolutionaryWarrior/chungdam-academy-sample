import Puzzle from '@icons/puzzle-piece.svg?react';
import { useState } from 'react';

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

  const onClickChoice = (selectedChoice: string) => {
    setActiveChoice(selectedChoice);
    const isCorrect = selectedChoice === answer;
    onSubmit(isCorrect);
  };

  return (
    <div
      className="rounded-[24px] px-6 py-5"
      style={{
        boxShadow:
          '0 2px 16px 0 rgba(77, 75, 76, 0.08), 0 2px 32px 0 rgba(77, 75, 76, 0.12)',
      }}
    >
      <div className="flex w-fit items-center gap-1 rounded-[999px] bg-[#FFF4D9] px-3 py-1">
        <Puzzle />
        <p className="text-[18px] text-[#F70]">Mission</p>
      </div>
      <p className="mt-4 text-[20px] font-[500] text-[#19191A]">{question}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {choice.map((item, index) => (
          <li
            key={`${item}-${index}`}
            onClick={() => onClickChoice(item)}
            className={`${activeChoice === item ? 'bg-[#00BABB] text-white' : 'border border-[#E1E2E5] bg-white text-[#313233]'} cursor-pointer rounded-[12px] py-[14px] text-center`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
