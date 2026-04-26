type StepStatus = 'completed' | 'active' | 'pending';

interface TimelineStepProps {
  title: string;
  description?: string;
  status: StepStatus;
  isLast?: boolean;
  className?: string;
}

const statusStyles: Record<StepStatus, { dot: string; line: string; text: string }> = {
  completed: {
    dot: 'bg-accent border-accent shadow-[0_0_12px_rgba(0,230,96,0.3)]',
    line: 'bg-gradient-to-b from-accent to-accent/50',
    text: 'text-text-primary',
  },
  active: {
    dot: 'bg-surface-0 border-accent animate-glow-pulse',
    line: 'bg-border',
    text: 'text-accent',
  },
  pending: {
    dot: 'bg-surface-2 border-border',
    line: 'bg-border',
    text: 'text-text-muted',
  },
};

export default function TimelineStep({
  title,
  description,
  status,
  isLast = false,
  className = '',
}: TimelineStepProps) {
  const s = statusStyles[status];

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-300 ${s.dot}`}>
          {status === 'completed' && (
            <svg className="w-full h-full text-surface-0" viewBox="0 0 12 12" fill="none">
              <path d="M3 6l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {status === 'active' && (
            <div className="w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-[1px]" />
          )}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 min-h-[32px] ${s.line}`} />}
      </div>
      <div className="pb-6">
        <p className={`text-sm font-medium ${s.text}`}>{title}</p>
        {description && <p className="text-xs text-text-muted mt-1">{description}</p>}
      </div>
    </div>
  );
}
