import { useState, useRef, useCallback } from 'react';

/**
 * RotatingBorderDemo — Sapphire Scanner with continuous speed slider (2s-16s).
 * Hairline grid layout showing rotating card + static comparison.
 */
export default function RotatingBorderDemo() {
  const [speed, setSpeed] = useState(8);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleCopy = useCallback(async () => {
    const code = `animation: rotate-border ${speed}s linear infinite;`;
    try { await navigator.clipboard.writeText(code); } catch {
      const ta = document.createElement('textarea'); ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [speed]);

  return (
    <div>
      {/* Controls bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 200px', minWidth: '200px' }}>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 600,
            textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-tertiary)', whiteSpace: 'nowrap',
          }}>Speed</span>
          <input
            ref={sliderRef}
            type="range" min="2" max="16" step="0.5" value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Rotation speed in seconds"
          />
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '13px', fontWeight: 700,
            color: 'var(--accent-blue)', minWidth: '40px', textAlign: 'right',
          }}>{speed}s</span>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          style={{
            padding: '4px 14px', borderRadius: '6px', border: '1px solid',
            borderColor: paused ? 'var(--color-warning)' : 'var(--border-default)',
            background: paused ? 'rgba(245, 158, 11, 0.10)' : 'transparent',
            color: paused ? 'var(--color-warning)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
          }}
        >{paused ? 'Resume' : 'Pause'}</button>
        <button
          onClick={handleCopy}
          style={{
            padding: '4px 14px', borderRadius: '6px', border: '1px solid var(--border-default)',
            background: 'transparent', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px',
            cursor: 'pointer', color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
          }}
        >{copied ? 'Copied!' : 'Copy CSS'}</button>
      </div>

      {/* Hairline grid: rotating card vs static */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
        background: 'var(--border-default)', border: '1px solid var(--border-default)',
        borderRadius: '12px', overflow: 'hidden',
      }}>
        {/* Rotating border card */}
        <div style={{ background: 'var(--surface-0)', padding: '32px', position: 'relative', minHeight: '260px' }}>
          {/* Top metadata */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--accent-blue)', letterSpacing: '0.2em' }}>01</span>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Sapphire Scanner</span>
          </div>
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const }}>{speed}s cycle</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '20px' }}>
            <div
              className="card-rotating-border"
              style={{
                borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '280px',
                animationDuration: `${speed}s`, animationPlayState: paused ? 'paused' : 'running',
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--blue-10)', border: '1px solid var(--blue-20)', marginBottom: '12px',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Featured Card</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Blue beam sweeps ~15% of the perimeter.</p>
            </div>
          </div>

          <span style={{
            position: 'absolute', bottom: '12px', left: '12px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>active</span>
        </div>

        {/* Static comparison */}
        <div style={{ background: 'var(--surface-0)', padding: '32px', position: 'relative', minHeight: '260px' }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', letterSpacing: '0.2em' }}>02</span>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Standard Card</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: '20px' }}>
            <div style={{
              borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '280px',
              background: 'var(--surface-2)', border: '1px solid var(--border-default)',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-default)', marginBottom: '12px',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-quaternary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Standard Card</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Static 8% white border for comparison.</p>
            </div>
          </div>

          <span style={{
            position: 'absolute', bottom: '12px', left: '12px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>comparison</span>
        </div>
      </div>
    </div>
  );
}
