import { useProgressStore } from "../../store/ProgressStore";
import ProgressBar from "./ProgressBar";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import CloseIcon from "../../assets/icons/x-mark.svg?react";

type Props = {
  title?: string;
  max?: number;
};

export default function Header({ title = "Vocabulary Map", max = 2 }: Props) {
  const { progress, resetToOne } = useProgressStore();

  const onClickClose = () => {
    resetToOne();
  };

  return (
    <header className="w-full ">
      <div className="flex items-center justify-between gap-3 py-3 px-10">
        <div className="flex items-center gap-2 ">
          <span className="flex gap-2 items-center rounded-[99px] border border-[#E1E2E5] px-3 py-1 text-[18px] text-[#4B4B4D] bg-[#F7F8FA]">
            Unit 0
            <ChevronRightIcon width={20} height={20} />
            Activity {progress} of {max}
          </span>
        </div>

        <h1 className="text-[24px] font-semibold text-[#313233]">{title}</h1>

        <button
          type="button"
          onClick={onClickClose}
          className="cursor-pointer flex items-center gap-1 rounded-[99px] border border-[#C8C9CC] px-3 py-1 text-base text-[#4B4B4D] hover:bg-black/5 active:scale-[0.98] transition"
          aria-label="Close"
        >
          Close
          <CloseIcon width={20} height={20} />
        </button>
      </div>

      <div className="">
        <ProgressBar max={max} />
      </div>
    </header>
  );
}
