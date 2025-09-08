import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};

export default function Modal({ isOpen, children, className }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className={`${className} w-[260px] rounded-2xl bg-white p-4`}
      style={{
        boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      {children}
    </div>
  );
}
