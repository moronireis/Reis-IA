import { useState, useRef, useCallback } from 'react';

interface DurationDemoProps {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

/**
 * DurationDemo — React island with animated progress bar that fills over the exact duration.
 * Click to replay. Shows value with copy functionality.
 */
export default function DurationDemo({ name, cssVar, value, usage }: DurationDemoProps) {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const durationMs = parseInt(value.replace('ms', ''), 10);
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

  const handleCopy = useCallback(async () => {
    const text = `var(${cssVar})`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cssVar]);

  // Visual width of duration relative to max (2000ms)
  const relWidth = Math.min((durationMs / 2000) * 100, 100);

  return (
    <div
      onClick={play}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        padding: '16px 20px',
        cursor: 'pointer',
        transition: 'border-color 200ms',
        position: 'relative',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-visible)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }}
      aria-label={`Play ${name} duration animation`}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)',
          }}>
            {name}
          </span>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '13px', fontWeight: 700, color: 'var(--accent-blue)',
          }}>
            {value}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
            borderRadius: '4px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px',
            color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
            transition: 'color 200ms',
          }}
          title={`Copy: var(${cssVar})`}
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>

      {/* Progress bar track */}
      <div style={{
        height: '8px', background: 'var(--surface-3)', borderRadius: '4px',
        overflow: 'hidden', marginBottom: '8px',
      }}>
        <div style={{
          height: '100%',
          width: playing ? `${relWidth}%` : '0%',
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-blue-bright, #8DC4FF))',
          borderRadius: '4px',
          transition: playing ? `width ${displayMs}ms cubic-bezier(0.16, 1, 0.3, 1)` : 'none',
        }} />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          {usage}
        </span>
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
        }}>
          click to replay
        </span>
      </div>
    </div>
  );
}
