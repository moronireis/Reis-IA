import { useState, useCallback } from 'react';

/**
 * StaggerGridDemo — Configurable stagger with delay and duration sliders.
 * Click "Replay" to see the stagger cascade. Shows code output.
 */
export default function StaggerGridDemo() {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [staggerDelay, setStaggerDelay] = useState(100);
  const [duration, setDuration] = useState(800);
  const [itemCount, setItemCount] = useState(6);

  const replay = useCallback(() => {
    setVisible(false);
    setKey(k => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, []);

  const items = Array.from({ length: itemCount }, (_, i) => ({
    label: ['Builder', 'Systems', 'Partners', 'Network', 'Academy', 'Labs', 'Media', 'Invest'][i] || `Item ${i + 1}`,
    desc: ['Direct services', 'AI implementation', 'Agency partners', 'Community', 'Education', 'R&D', 'Content', 'Portfolio'][i] || 'Description',
  }));

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <button onClick={replay} style={{
          padding: '6px 16px', borderRadius: '6px', border: '1px solid var(--accent-blue)',
          background: 'var(--blue-10)', color: 'var(--accent-blue)',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
        }}>Replay</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 150px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Delay</span>
          <input type="range" min="50" max="300" step="10" value={staggerDelay}
            onChange={(e) => setStaggerDelay(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Stagger delay per item"
          />
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', minWidth: '42px', textAlign: 'right' }}>{staggerDelay}ms</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 150px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Duration</span>
          <input type="range" min="200" max="1500" step="50" value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Animation duration"
          />
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', minWidth: '48px', textAlign: 'right' }}>{duration}ms</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Items</span>
          {[4, 6, 8].map(n => (
            <button key={n} onClick={() => { setItemCount(n); setVisible(false); }} style={{
              padding: '2px 8px', borderRadius: '4px', border: '1px solid',
              borderColor: itemCount === n ? 'var(--accent-blue)' : 'var(--border-default)',
              background: itemCount === n ? 'var(--blue-10)' : 'transparent',
              color: itemCount === n ? 'var(--accent-blue)' : 'var(--text-quaternary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', cursor: 'pointer',
            }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Timing summary */}
      <div style={{
        marginBottom: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)',
      }}>
        <span>Total cascade: {(itemCount - 1) * staggerDelay}ms</span>
        <span>Last item completes: {(itemCount - 1) * staggerDelay + duration}ms</span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1px', background: 'var(--border-default)', border: '1px solid var(--border-default)',
        borderRadius: '12px', overflow: 'hidden',
      }}>
        {items.map((item, i) => (
          <div
            key={`${key}-${i}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: visible
                ? `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
                : 'none',
              transitionDelay: visible ? `${i * staggerDelay}ms` : '0ms',
              background: 'var(--surface-0)',
              padding: '20px',
              minHeight: '100px',
            }}
          >
            <div style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 600,
              color: 'var(--accent-blue)', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '6px',
            }}>0{i + 1}</div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.label}</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{item.desc}</p>
            <div style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px',
              color: 'var(--text-muted)', marginTop: '8px',
            }}>delay: {i * staggerDelay}ms</div>
          </div>
        ))}
      </div>
    </div>
  );
}
