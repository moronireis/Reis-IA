import { useState, useCallback } from 'react';

/**
 * WatermarkDemo — H1-B Hourglass "Open Intersection" watermark with opacity slider.
 * Correct SVG: 5 lines (2 horizontal bars + 2 crossing diagonals with open gap at center).
 */
export default function WatermarkDemo() {
  const [opacity, setOpacity] = useState(4);
  const [placement, setPlacement] = useState<'tr' | 'center' | 'bl'>('tr');
  const [copied, setCopied] = useState(false);

  const placements: Record<string, React.CSSProperties> = {
    tr: { top: '-10px', right: '-10px' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    bl: { bottom: '-10px', left: '-10px' },
  };

  const handleCopy = useCallback(async () => {
    const code = `opacity: ${(opacity / 100).toFixed(2)}; /* H1-B Hourglass watermark */`;
    try { await navigator.clipboard.writeText(code); } catch {
      const ta = document.createElement('textarea'); ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [opacity]);

  /* H1-B "Open Intersection" SVG: two horizontal bars + two crossing diagonals with open gap at center */
  const h1bSvg = (
    <svg viewBox="0 0 100 140" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" style={{
      position: 'absolute', ...placements[placement], width: '200px', height: '280px',
      pointerEvents: 'none', opacity: opacity / 100, transition: 'opacity 200ms, top 400ms, left 400ms, right 400ms, bottom 400ms',
    }}>
      {/* Top horizontal bar */}
      <line x1="15" y1="10" x2="85" y2="10" />
      {/* Bottom horizontal bar */}
      <line x1="15" y1="130" x2="85" y2="130" />
      {/* Left diagonal: top-left to near-center, then center to bottom-left */}
      <line x1="15" y1="10" x2="42" y2="62" />
      <line x1="42" y1="78" x2="15" y2="130" />
      {/* Right diagonal: top-right to near-center, then center to bottom-right */}
      <line x1="85" y1="10" x2="58" y2="62" />
      <line x1="58" y1="78" x2="85" y2="130" />
    </svg>
  );

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Placement</span>
        {(['tr', 'center', 'bl'] as const).map(p => (
          <button key={p} onClick={() => setPlacement(p)} style={{
            padding: '4px 10px', borderRadius: '6px', border: '1px solid',
            borderColor: placement === p ? 'var(--accent-blue)' : 'var(--border-default)',
            background: placement === p ? 'var(--blue-10)' : 'transparent',
            color: placement === p ? 'var(--accent-blue)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', cursor: 'pointer',
          }}>{p === 'tr' ? 'Top Right' : p === 'center' ? 'Center' : 'Bottom Left'}</button>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 180px', minWidth: '160px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Opacity</span>
          <input type="range" min="1" max="10" step="0.5" value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Watermark opacity percentage"
          />
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '13px', fontWeight: 700,
            color: 'var(--accent-blue)', minWidth: '36px', textAlign: 'right',
          }}>{opacity}%</span>
        </div>

        <button onClick={handleCopy} style={{
          padding: '4px 14px', borderRadius: '6px', border: '1px solid var(--border-default)',
          background: 'transparent', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px',
          cursor: 'pointer', color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
        }}>{copied ? 'Copied!' : 'Copy CSS'}</button>
      </div>

      {/* Demo area */}
      <div style={{
        position: 'relative', borderRadius: '12px', border: '1px solid var(--border-default)',
        overflow: 'hidden', minHeight: '300px', background: 'var(--surface-0)', padding: '40px 32px',
      }}>
        {h1bSvg}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Content sits above the watermark
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px' }}>
            The H1-B Hourglass "Open Intersection" mark at {opacity}% opacity is felt but never competes with readability. The open gap at center distinguishes it from a simple X or bowtie shape.
          </p>
          <div style={{
            marginTop: '24px', padding: '20px', borderRadius: '12px',
            background: 'var(--surface-2)', border: '1px solid var(--border-default)', maxWidth: '400px',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Card on watermarked surface</span>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Cards with opaque backgrounds naturally occlude the watermark beneath them.</p>
          </div>
        </div>

        {/* CSS value label */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '16px',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-muted)',
        }}>opacity: {(opacity / 100).toFixed(2)} | pointer-events: none</div>
      </div>

      {/* Recommended range */}
      <div style={{
        marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-muted)',
      }}>
        <div style={{ height: '2px', flex: 1, background: 'var(--border-subtle)', position: 'relative', borderRadius: '1px' }}>
          <div style={{
            position: 'absolute', left: `${(3 / 10) * 100}%`, width: `${((5 - 3) / 10) * 100}%`,
            height: '100%', background: 'var(--accent-blue)', borderRadius: '1px', opacity: 0.5,
          }} />
        </div>
        <span>Recommended: 3-5%</span>
      </div>
    </div>
  );
}
