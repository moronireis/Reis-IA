interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export default function Progress({
  value,
  max = 100,
  label,
  showPercent = true,
  size = 'md',
  animated = true,
  striped = false,
  className = '',
}: ProgressProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-text-secondary">{label}</span>}
          {showPercent && <span className="text-accent font-semibold">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-surface-2 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`
            ${sizeStyles[size]} rounded-full
            bg-gradient-to-r from-accent-dark via-accent to-accent-light
            ${animated ? 'progress-animated' : ''}
            ${striped ? 'progress-striped' : ''}
          `}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
