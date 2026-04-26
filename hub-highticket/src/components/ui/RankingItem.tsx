import Avatar from './Avatar';

interface RankingItemProps {
  position: number;
  name: string;
  avatar?: string;
  value: string;
  subtitle?: string;
  className?: string;
}

export default function RankingItem({
  position,
  name,
  avatar,
  value,
  subtitle,
  className = '',
}: RankingItemProps) {
  const posColor =
    position === 1
      ? 'text-accent font-bold'
      : position === 2
        ? 'text-text-primary font-semibold'
        : position === 3
          ? 'text-text-secondary font-medium'
          : 'text-text-muted font-medium';

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3
        border-b border-border last:border-0
        hover:bg-surface-2 transition-colors
        ${className}
      `}
    >
      <span className={`w-6 text-center text-sm ${posColor}`}>
        {position}
      </span>
      <Avatar name={name} src={avatar} size="sm" />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-text-primary truncate block">{name}</span>
        {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
      </div>
      <span className="text-sm font-semibold text-accent">{value}</span>
    </div>
  );
}
