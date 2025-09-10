import { useProgressStore } from '@/store';
import ChevronRightIcon from '@icons/chevron-right.svg?react';
import CloseIcon from '@icons/x-mark.svg?react';
import ProgressBar from './ProgressBar';

type Props = {
  title?: string;
  max?: number;
};

export default function Header({ title, max = 2 }: Props) {
  const { progress, resetToOne } = useProgressStore();

  const onClickClose = () => {
    resetToOne();
  };

  return (
    <header className="w-full bg-[#fff]">
      <div className="flex items-center justify-between gap-3 px-10 py-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-[99px] border border-[#E1E2E5] bg-[#F7F8FA] px-3 py-1 text-[18px] text-[#4B4B4D]">
            Unit 1
            <ChevronRightIcon className="size-5 fill-[#D7D8DB]" />
            Activity {progress} of {max}
          </span>
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold text-[#313233]">
          {title}
        </h1>

        <button
          type="button"
          onClick={onClickClose}
          className="flex cursor-pointer items-center gap-1 rounded-[99px] border border-[#C8C9CC] px-3 py-1 text-base text-[#4B4B4D] transition hover:bg-black/5 active:scale-[0.98]"
          aria-label="Close"
        >
          Close
          <CloseIcon width={20} height={20} />
        </button>
      </div>

      <div>
        <ProgressBar max={max} />
      </div>
    </header>
  );
}
