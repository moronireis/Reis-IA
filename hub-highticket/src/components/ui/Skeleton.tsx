interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  className?: string;
}

export default function Skeleton({
  width = '100%',
  height = '16px',
  rounded = false,
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${rounded ? 'rounded-full' : ''} ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-surface-1 border border-border rounded-lg p-5 space-y-3 ${className}`}>
      <Skeleton width="40%" height="12px" />
      <Skeleton width="60%" height="28px" />
      <Skeleton width="30%" height="12px" />
    </div>
  );
}

export function SkeletonRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${className}`}>
      <Skeleton width="32px" height="32px" rounded />
      <div className="flex-1 space-y-1.5">
        <Skeleton width="50%" height="14px" />
        <Skeleton width="30%" height="10px" />
      </div>
      <Skeleton width="60px" height="14px" />
    </div>
  );
}
