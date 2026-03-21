import { useState, useRef, useCallback } from 'react';

interface EasingDemoProps {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

/**
 * EasingDemo — React island that animates a ball using the specified easing curve.
 * Click/tap to replay the animation. Shows the CSS cubic-bezier value.
 */
export default function EasingDemo({ name, cssVar, value, description }: EasingDemoProps) {
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPlaying(false);
    // Force reflow to reset animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlaying(true);
        timeoutRef.current = setTimeout(() => setPlaying(false), 1500);
      });
    });
  }, []);

  return (
    <button
      onClick={play}
      className="w-full text-left group"
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'border-color 200ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-visible)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
      }}
      title="Click to replay animation"
      aria-label={`Play ${name} easing animation`}
    >
      {/* Track */}
      <div
        style={{
          height: '4px',
          background: 'var(--surface-3)',
          borderRadius: '2px',
          position: 'relative',
          marginBottom: '16px',
          overflow: 'visible',
        }}
      >
        {/* Ball */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: playing ? 'calc(100% - 12px)' : '0',
            transform: 'translateY(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--accent-blue)',
            boxShadow: '0 0 12px rgba(74, 144, 255, 0.4)',
            transition: playing ? `left 1200ms ${value}` : 'none',
          }}
        />
      </div>

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em',
            color: 'var(--accent-blue)',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px',
            color: 'var(--text-muted)',
          }}
        >
          {cssVar}
        </span>
      </div>
      <div
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '11px',
          color: 'var(--text-quaternary)',
          marginBottom: '6px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
        {description}
      </div>
      <div
        style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '8px',
        }}
      >
        Click to replay
      </div>
    </button>
  );
}
