import Check from '@icons/check.svg';
import Key from '@icons/key.svg';

type Props = {
  isCompleted: boolean;
  title: string;
  onClick?: () => void;
};

export default function LockButton({ isCompleted, title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${isCompleted ? 'border-[2px] border-[#F882BA] bg-white' : 'bg-[#E6E7EB]'} flex cursor-pointer items-center gap-2 rounded-[20px] px-5 py-3`}
    >
      <div className="px-1">
        <img src={isCompleted ? Check : Key} />
      </div>
      <p
        className={`${isCompleted ? 'text-[#313233]' : 'text-[#666]'} text-[28px] font-[500]`}
      >
        {title}
      </p>
    </button>
  );
}
