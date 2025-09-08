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
    box: 'bg-[#DDF0F0] border-[2px] border-[#7DD1D1]',
    text: 'text-[#008B8C]',
  }),
  completed: Object.freeze({
    box: 'bg-white border-[2px] border-[#FFCCE4]',
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

  console.log(variant);
  return (
    <button
      {...props}
      className={`${variant.box} flex cursor-pointer items-center gap-2 rounded-[20px] px-5 py-3`}
    >
      <div className="px-1">{isCompleted ? <Check /> : <Key />}</div>
      <p className={`${variant.text} text-[28px] font-[500]`}>{title}</p>
    </button>
  );
}
