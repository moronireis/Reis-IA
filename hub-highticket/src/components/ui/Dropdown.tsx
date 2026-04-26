import { useState, useRef, useEffect, type ReactNode } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  onClick: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export default function Dropdown({ trigger, items, align = 'left', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className={`
            absolute top-full mt-1 z-50 min-w-[160px]
            ${align === 'right' ? 'right-0' : 'left-0'}
            bg-surface-1 border border-border rounded-lg shadow-lg
            py-1 animate-in fade-in slide-in-from-top-1 duration-150
          `}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`
                w-full flex items-center gap-2 px-3 py-2 text-sm text-left cursor-pointer
                transition-colors duration-150
                ${
                  item.danger
                    ? 'text-danger hover:bg-danger/10'
                    : 'text-text-primary hover:bg-surface-2'
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
