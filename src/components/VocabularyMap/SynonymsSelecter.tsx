import { Modal, Toggle } from '@/components';
import indicator from '@images/ellipse_11_1x.webp?url';
import frame from '@images/frame_145_1x.webp?url';
import { useState } from 'react';

type WordsType = 'sadness' | 'despair' | 'despondency' | 'misery';

type DegreeData = {
  [key in WordsType]: {
    commentary: string;
    example: string;
  };
};

interface Props {
  selected: WordsType;
  onSelect: (word: WordsType) => void;
  degree: DegreeData;
  isVisible?: boolean;
}

const words: WordsType[] = ['sadness', 'despair', 'despondency', 'misery'];

export default function SynonymsSelector({
  selected,
  onSelect,
  degree,
  isVisible = true,
}: Props) {
  const [openModal, setOpenModal] = useState<WordsType | null>(selected);

  const [tab, setTab] = useState<'commentary' | 'example'>('commentary');

  // 버튼 위치에 맞는 % 값 매핑
  const positionMap: Record<WordsType, string> = {
    sadness: '12%',
    despair: '35.5%',
    despondency: '62.5%',
    misery: '88.5%',
  };

  const handleClick = (word: WordsType) => {
    onSelect(word);
    setOpenModal((prev) => (prev === word ? null : word));
  };

  return (
    <div className="flex w-[745px] flex-col items-center gap-2">
      {/* bar */}
      <div className="relative w-full">
        <div className="flex flex-row items-center gap-3 text-[14px]">
          <span className="whitespace-nowrap">약함</span>
          <img src={frame} alt="line" className="w-full" />
          <span className="whitespace-nowrap">강함</span>
        </div>

        {/* indicator */}
        <img
          src={indicator}
          alt="indicator"
          className={`absolute top-0 h-5 w-5 ${
            isVisible ? 'transition-[left] duration-300 ease-in-out' : ''
          }`}
          style={{
            left: positionMap[selected],
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* buttons */}
      <div className="flex w-full justify-between px-[38px]">
        {words.map((word) => {
          const isActive = selected === word;
          const data = degree[word];
          return (
            <div key={word} className="relative flex flex-col items-center">
              <button
                onClick={() => handleClick(word)}
                className={`relative rounded-2xl px-4 pt-[6px] pb-2 text-[22px] transition-colors ${
                  isActive
                    ? 'border border-[#7DD1D1] bg-[#36B3B1] text-white'
                    : 'border border-[#E1E2E5] bg-white text-black'
                } `}
              >
                {word}
              </button>

              <Modal
                isOpen={openModal === word}
                className="absolute top-[80px] flex flex-col items-center gap-1"
              >
                <p className="text-[24px] font-[500]">{word}</p>
                <Toggle
                  options={[
                    { label: '뉘앙스 해설', value: 'commentary' },
                    { label: '비교 예문', value: 'example' },
                  ]}
                  value={tab}
                  onChange={(v) => setTab(v as 'commentary' | 'example')}
                />
                <p className="w-full p-1 text-[14px] text-[#19191A]">
                  {tab === 'commentary' ? data.commentary : data.example}
                </p>
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
