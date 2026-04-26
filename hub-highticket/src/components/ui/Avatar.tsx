type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-14 h-14 text-lg',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeStyles[size]} rounded-full object-cover ring-2 ring-border ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeStyles[size]} rounded-full
        bg-accent/15 text-accent font-semibold
        flex items-center justify-center ring-2 ring-border
        ${className}
      `}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: { src?: string; name: string }[];
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((a, i) => (
        <Avatar key={i} src={a.src} name={a.name} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${sizeStyles[size]} rounded-full
            bg-surface-3 text-text-muted font-medium
            flex items-center justify-center ring-2 ring-surface-0
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
