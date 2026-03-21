import { useState, useCallback } from 'react';

/**
 * AuroraDemo — Live aurora with controls for orb count, speed, and play/pause.
 * 3 gradient orbs slowly drift creating ethereal atmospheric depth.
 */
export default function AuroraDemo() {
  const [running, setRunning] = useState(true);
  const [orbCount, setOrbCount] = useState(3);
  const [speed, setSpeed] = useState(20);
  const [key, setKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const orbs = [
    { gradient: 'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74, 144, 255, 0.08) 0%, transparent 60%)', delay: '0s' },
    { gradient: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(141, 196, 255, 0.05) 0%, transparent 60%)', delay: '-7s' },
    { gradient: 'radial-gradient(ellipse 50% 60% at 50% 80%, rgba(53, 112, 204, 0.06) 0%, transparent 60%)', delay: '-14s' },
  ].slice(0, orbCount);

  const handleCopy = useCallback(async () => {
    const code = `animation: aurora-shift ${speed}s ease-in-out infinite alternate;`;
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
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <button onClick={() => setRunning(!running)} style={{
          padding: '4px 14px', borderRadius: '6px', border: '1px solid',
          borderColor: running ? 'var(--accent-blue)' : 'var(--color-warning)',
          background: running ? 'var(--blue-10)' : 'rgba(245, 158, 11, 0.10)',
          color: running ? 'var(--accent-blue)' : 'var(--color-warning)',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
        }}>{running ? 'Pause' : 'Play'}</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Orbs</span>
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => { setOrbCount(n); setKey(k => k + 1); }} style={{
              padding: '2px 8px', borderRadius: '4px', border: '1px solid',
              borderColor: orbCount === n ? 'var(--accent-blue)' : 'var(--border-default)',
              background: orbCount === n ? 'var(--blue-10)' : 'transparent',
              color: orbCount === n ? 'var(--accent-blue)' : 'var(--text-quaternary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', cursor: 'pointer',
            }}>{n}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 150px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Speed</span>
          <input type="range" min="10" max="40" step="2" value={speed}
            onChange={(e) => { setSpeed(parseInt(e.target.value)); setKey(k => k + 1); }}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Aurora cycle speed"
          />
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', minWidth: '32px', textAlign: 'right' }}>{speed}s</span>
        </div>

        <button onClick={handleCopy} style={{
          padding: '4px 14px', borderRadius: '6px', border: '1px solid var(--border-default)',
          background: 'transparent', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px',
          cursor: 'pointer', color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
        }}>{copied ? 'Copied!' : 'Copy CSS'}</button>
      </div>

      {/* Demo area */}
      <div key={key} style={{
        position: 'relative', borderRadius: '12px', border: '1px solid var(--border-default)',
        overflow: 'hidden', minHeight: '360px', background: 'var(--surface-0)',
      }}>
        {/* Aurora orbs */}
        {orbs.map((orb, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, background: orb.gradient,
            animation: running ? `aurora-shift-${i} ${speed}s ease-in-out infinite alternate` : 'none',
            animationDelay: orb.delay,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Aurora Background
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            {orbCount} gradient orb{orbCount > 1 ? 's' : ''} slowly drift and scale at a {speed}s cycle, creating atmospheric depth behind hero sections.
          </p>
        </div>

        {/* Orb indicators */}
        <div style={{
          position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px',
        }}>
          {orbs.map((_, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: ['#4A90FF', '#8DC4FF', '#3570CC'][i],
              boxShadow: `0 0 8px ${['rgba(74,144,255,0.4)', 'rgba(141,196,255,0.3)', 'rgba(53,112,204,0.3)'][i]}`,
              animation: running ? 'pulse 2s ease-in-out infinite' : 'none',
              animationDelay: `${i * 0.3}s`,
            }} />
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: '16px', right: '16px',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px', color: 'var(--text-muted)',
        }}>GPU-composited (transform + opacity only)</div>

        <style>{`
          @keyframes aurora-shift-0 {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            33% { transform: translate(-5%, 3%) scale(1.05); opacity: 0.8; }
            66% { transform: translate(3%, -2%) scale(0.98); opacity: 1; }
            100% { transform: translate(-2%, 5%) scale(1.02); opacity: 0.9; }
          }
          @keyframes aurora-shift-1 {
            0% { transform: translate(2%, -1%) scale(1.02); opacity: 0.9; }
            33% { transform: translate(-3%, 4%) scale(0.97); opacity: 1; }
            66% { transform: translate(5%, -3%) scale(1.04); opacity: 0.85; }
            100% { transform: translate(-1%, 2%) scale(1); opacity: 1; }
          }
          @keyframes aurora-shift-2 {
            0% { transform: translate(-2%, 2%) scale(0.98); opacity: 1; }
            33% { transform: translate(4%, -3%) scale(1.03); opacity: 0.9; }
            66% { transform: translate(-3%, 1%) scale(1); opacity: 0.95; }
            100% { transform: translate(2%, -2%) scale(1.05); opacity: 0.85; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
