interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4 border',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-2',
};

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      className={`
        ${sizeStyles[size]} rounded-full
        border-surface-3 border-t-accent
        animate-spin
        ${className}
      `}
    />
  );
}

export function DotLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`dot-loading flex gap-1.5 ${className}`}>
      <span /><span /><span />
    </div>
  );
}
