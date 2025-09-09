import { Modal, Toggle } from '@/components';
import indicator from '@images/ellipse_11_1x.webp?url';
import frame from '@images/frame_145_1x.webp?url';
import React, { useCallback, useRef, useState } from 'react';

type WordsType = 'sadness' | 'despair' | 'despondency' | 'misery';

type DegreeData = {
  [key in WordsType]: {
    commentary: string;
    example: string;
  };
};

interface Props {
  selected: WordsType | null;
  onSelect: (word: WordsType | null) => void;
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
  const [openModal, setOpenModal] = useState<WordsType | null>(null);
  const [tab, setTab] = useState<'commentary' | 'example'>('commentary');

  // 드래그 관련 상태
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLImageElement>(null);

  // 버튼 위치에 맞는 % 값 매핑
  const positionMap: Record<WordsType, string> = {
    sadness: '12%',
    despair: '35.5%',
    despondency: '62.5%',
    misery: '88.5%',
  };

  const handleClick = (word: WordsType) => {
    if (selected === word) {
      // 같은 단어를 다시 클릭하면 선택 초기화 및 모달 닫기
      onSelect(null);
      setOpenModal(null);
    } else {
      // 다른 단어를 클릭하면 선택 및 모달 열기
      onSelect(word);
      setOpenModal(word);
    }
  };

  // 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragPosition(null);
  }, []);

  // 드래그 중
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const sliderRect = sliderRef.current.getBoundingClientRect();
      const relativeX = e.clientX - sliderRect.left;
      const percentage = Math.max(
        0,
        Math.min(100, (relativeX / sliderRect.width) * 100),
      );

      setDragPosition(percentage);
    },
    [isDragging],
  );

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragPosition !== null) {
      // 가장 가까운 단어 찾기
      const positions = Object.entries(positionMap).map(([word, pos]) => ({
        word: word as WordsType,
        position: parseFloat(pos.replace('%', '')),
      }));

      const closestWord = positions.reduce((closest, current) =>
        Math.abs(current.position - dragPosition) <
        Math.abs(closest.position - dragPosition)
          ? current
          : closest,
      );

      onSelect(closestWord.word);
      setOpenModal(closestWord.word);
    }

    setDragPosition(null);
  }, [isDragging, dragPosition, onSelect, positionMap]);

  // 마우스 이벤트 리스너 등록/해제
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex w-[745px] flex-col items-center gap-2">
      {/* bar */}
      <div className="relative w-full" ref={sliderRef}>
        <div className="flex flex-row items-center gap-3 text-[14px]">
          <span className="whitespace-nowrap">약함</span>
          <img src={frame} alt="line" className="w-full" />
          <span className="whitespace-nowrap">강함</span>
        </div>

        {/* indicator */}
        {selected && (
          <img
            ref={indicatorRef}
            src={indicator}
            alt="indicator"
            className={`absolute top-0 h-5 w-5 cursor-grab select-none active:cursor-grabbing ${
              isDragging ? 'z-10' : ''
            } ${
              isVisible && !isDragging
                ? 'transition-[left] duration-300 ease-in-out'
                : ''
            }`}
            style={{
              left:
                isDragging && dragPosition !== null
                  ? `${dragPosition}%`
                  : positionMap[selected],
              transform: 'translateX(-50%)',
              opacity: isDragging ? 0.8 : 1,
            }}
            onMouseDown={handleMouseDown}
          />
        )}
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
                className={`relative cursor-pointer rounded-2xl px-4 pt-[6px] pb-2 text-[22px] transition-colors ${
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
