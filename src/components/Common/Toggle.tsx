type ToggleOption = {
  label: string;
  value: string;
};

type Props = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
};

export default function Toggle({ options, value, onChange }: Props) {
  return (
    <div className="flex w-full rounded-full bg-[#F3F4F6] p-1">
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-full px-4 py-1 text-[14px] font-medium transition-colors ${
              isActive
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-gray-500'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
