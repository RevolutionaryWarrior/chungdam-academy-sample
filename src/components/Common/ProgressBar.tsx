import { useProgressStore } from '@/store';

type Props = {
  max?: number;
};

export default function ProgressBar({ max = 8 }: Props) {
  const progress = useProgressStore((s) => s.progress);
  const clamped = Math.max(0, Math.min(progress, max));
  const percent = (clamped / max) * 100;

  return (
    <div className="w-full">
      <div
        className="w-full bg-[#E1E2E5]"
        style={{ height: 4, borderRadius: 3 }}
      >
        <div
          className="bg-[#00807E] transition-[width] duration-500 ease-out"
          style={{
            width: `${percent}%`,
            height: 4,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}
