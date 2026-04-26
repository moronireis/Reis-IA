interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  category?: string;
  className?: string;
}

export default function ChecklistItem({
  label,
  checked,
  onChange,
  category,
  className = '',
}: ChecklistItemProps) {
  return (
    <label
      className={`
        flex items-center gap-3 px-4 py-3
        border-b border-border last:border-0
        hover:bg-surface-2 transition-colors cursor-pointer
        ${className}
      `}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-200
            flex items-center justify-center
            ${
              checked
                ? 'bg-accent border-accent'
                : 'border-border-hover bg-surface-2 peer-hover:border-accent/50'
            }
          `}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6l2.5 2.5 4.5-5"
                stroke="var(--surface-0)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm block ${
            checked ? 'text-text-muted line-through' : 'text-text-primary'
          }`}
        >
          {label}
        </span>
        {category && <span className="text-xs text-text-muted">{category}</span>}
      </div>
    </label>
  );
}
