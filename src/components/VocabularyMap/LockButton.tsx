import Check from '@icons/check.svg?react';
import Key from '@icons/key.svg?react';

type Props = {
  isCompleted: boolean;
  isActive: boolean;
  title: string;
  onClick: () => void;
};

const buttonVariants = Object.freeze({
  locked: Object.freeze({
    box: 'bg-[#E6E7EB]',
    text: 'text-[#666]',
  }),
  active: Object.freeze({
    box: 'bg-[#E5F2F2] border-[2px] border-[#99D1D0]',
    text: 'text-[#00807E]',
  }),
  completed: Object.freeze({
    box: 'bg-white border-[2px] border-[#FFCCE4] ',
    text: 'text-[#313233]',
  }),
});

export default function LockButton({
  isCompleted,
  isActive,
  title,
  ...props
}: Props) {
  const getVariant = () => {
    if (isActive) return 'active';
    if (isCompleted) return 'completed';

    return 'locked';
  };

  const variant = buttonVariants[getVariant()];

  return (
    <button
      {...props}
      className={`${variant.box} relative z-10 flex cursor-pointer items-center gap-2 rounded-[20px] px-5 py-3`}
    >
      <div className="relative px-1">
        <div
          className={`${isCompleted ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'} transition-all duration-500`}
        >
          <Key />
        </div>
        <div
          className={`${isCompleted ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0'} absolute inset-0 transition-all delay-200 duration-500`}
        >
          <Check />
        </div>
      </div>
      <p className={`${variant.text} text-[28px] font-[500]`}>{title}</p>
    </button>
  );
}
