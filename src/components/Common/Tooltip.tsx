import { ReactNode } from 'react';

type TooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type Props = {
  children: ReactNode;
  position?: TooltipPosition;
  bgColor?: string;
  isVisible?: boolean;
  className?: string;
};

export default function Tooltip({
  children,
  position = 'top-center',
  bgColor = '#36B3B1',
  isVisible = true,
  className,
}: Props) {
  const isPrimary = bgColor === '#36B3B1';

  const shouldShow = isVisible;

  const borderRadius = isPrimary ? '8px' : '24px';
  const textColor = isPrimary ? 'white' : 'black';

  const paddingClass = isPrimary ? 'px-[10px] py-[6px]' : 'px-6 py-5';

  const animationClass = isPrimary && shouldShow ? 'animate-bounce-gentle' : '';

  return (
    <div
      className={`inline-flex h-auto w-auto transition-opacity duration-300 ${
        shouldShow ? 'visible' : 'invisible'
      } ${className}`}
    >
      <div
        className={`relative ${paddingClass} ${animationClass}`}
        style={{
          backgroundColor: bgColor,
          borderRadius,
          color: textColor,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          zIndex: 1000,
        }}
      >
        {children}

        <span className={getArrowWrapperClass(position)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
          >
            <path
              d="M7.03644 7.15627C6.23685 8.11578 4.76315 8.11578 3.96356 7.15627L0.733642 3.28037C-0.351903 1.97772 0.574407 1.32605e-07 2.27008 -1.56351e-08L8.72992 -5.80372e-07C10.4256 -7.28613e-07 11.3519 1.97771 10.2664 3.28037L7.03644 7.15627Z"
              fill={bgColor}
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function getArrowWrapperClass(position: TooltipPosition): string {
  switch (position) {
    case 'bottom-left':
      return 'absolute -bottom-[6px] left-7';
    case 'bottom-center':
      return 'absolute -bottom-[6px] left-1/2 -translate-x-1/2';
    case 'bottom-right':
      return 'absolute -bottom-[6px] right-3';

    case 'top-left':
      return 'absolute -top-[6px] left-7 rotate-180';
    case 'top-center':
      return 'absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-180';
    case 'top-right':
      return 'absolute -top-[6px] right-3 rotate-180';

    default:
      return '';
  }
}
