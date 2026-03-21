import { useState, useRef, useCallback } from 'react';

interface DurationDemoProps {
  name: string;
  cssVar: string;
  value: string;
  usage: string;
}

/**
 * DurationDemo — Hairline grid cell with animated progress bar at actual timing.
 * Click to replay. AIOX-style layout with metadata and copy.
 */
export default function DurationDemo({ name, cssVar, value, usage }: DurationDemoProps) {
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const durationMs = parseInt(value.replace('ms', ''), 10);
  const displayMs = Math.min(durationMs, 3000); // Cap visual at 3s for ambient

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
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement('textarea'); ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [cssVar]);

  // Width relative to slowest non-ambient (1200ms)
  const relWidth = durationMs <= 1200 ? (durationMs / 1200) * 100 : 100;

  return (
    <div
      onClick={play}
      style={{
        background: 'var(--surface-0)',
        cursor: 'pointer',
        position: 'relative',
        padding: '16px 20px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } }}
      aria-label={`Play ${name} duration animation`}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '12px', fontWeight: 600,
            color: 'var(--text-secondary)',
          }}>{name}</span>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '14px', fontWeight: 700,
            color: 'var(--accent-blue)',
          }}>{value}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 8px',
            borderRadius: '4px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px',
            color: copied ? 'var(--color-success)' : 'var(--text-quaternary)', transition: 'color 200ms',
          }}
          title={`Copy: var(${cssVar})`}
        >{copied ? 'copied' : 'copy'}</button>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px', background: 'var(--surface-3)', borderRadius: '3px',
        overflow: 'hidden', marginBottom: '8px',
      }}>
        <div style={{
          height: '100%',
          width: playing ? `${relWidth}%` : '0%',
          background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-blue-bright, #8DC4FF))',
          borderRadius: '3px',
          transition: playing ? `width ${displayMs}ms cubic-bezier(0.16, 1, 0.3, 1)` : 'none',
        }} />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: 1.3 }}>{usage}</span>
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px',
          color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
        }}>click to replay</span>
      </div>
    </div>
  );
}
