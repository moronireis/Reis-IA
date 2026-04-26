import { useState, type ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const posStyles =
    position === 'top'
      ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
      : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`
            absolute ${posStyles} z-50
            px-2.5 py-1.5 text-xs font-medium
            bg-surface-3 text-text-primary border border-border
            rounded-md shadow-md whitespace-nowrap
            animate-in fade-in zoom-in-95 duration-150
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}
