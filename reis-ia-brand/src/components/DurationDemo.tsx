import { useState, useRef, useCallback } from 'react';

interface DurationDemoProps {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

/**
 * DurationDemo — React island that animates a bar expanding over the specified duration.
 * Click/tap to replay.
 */
export default function DurationDemo({ name, cssVar, value, usage }: DurationDemoProps) {
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const durationMs = parseInt(value.replace('ms', ''), 10);
  // Clamp display duration for ambient (13s is too long for demo)
  const displayMs = Math.min(durationMs, 2000);

  const play = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPlaying(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlaying(true);
        timeoutRef.current = setTimeout(() => setPlaying(false), displayMs + 500);
      });
    });
  }, [displayMs]);

  return (
    <button
      onClick={play}
      className="w-full text-left"
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'border-color 200ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-visible)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
      }}
      title="Click to replay"
      aria-label={`Play ${name} duration animation`}
    >
      {/* Progress bar track */}
      <div
        style={{
          height: '6px',
          background: 'var(--surface-3)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: playing ? '100%' : '0%',
            background: 'var(--accent-blue)',
            borderRadius: '3px',
            transition: playing ? `width ${displayMs}ms linear` : 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              color: 'var(--text-quaternary)',
              marginLeft: '8px',
            }}
          >
            {value}
          </span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
        {usage}
      </div>
    </button>
  );
}
