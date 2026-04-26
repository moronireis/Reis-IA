import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  change?: { value: string; positive: boolean };
  icon?: ReactNode;
  glow?: boolean;
  className?: string;
}

export default function StatCard({ label, value, change, icon, glow = false, className = '' }: StatCardProps) {
  return (
    <div
      className={`
        bg-surface-1 border border-border rounded-lg p-5
        flex flex-col gap-3 relative overflow-hidden
        transition-all duration-300
        hover:border-border-hover hover:bg-surface-2
        card-glow
        ${glow ? 'animate-border-glow' : ''}
        ${className}
      `}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-text-primary count-up">{value}</span>
        {change && (
          <span
            className={`text-xs font-semibold mb-1 px-1.5 py-0.5 rounded ${
              change.positive
                ? 'text-success bg-success/10'
                : 'text-danger bg-danger/10'
            }`}
          >
            {change.positive ? '+' : ''}{change.value}
          </span>
        )}
      </div>
    </div>
  );
}
