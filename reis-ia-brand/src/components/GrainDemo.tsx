import { useState, useCallback } from 'react';

/**
 * GrainDemo — Grain texture with continuous opacity slider (0-25%).
 * Side-by-side comparison: with grain vs without grain.
 */
export default function GrainDemo() {
  const [enabled, setEnabled] = useState(true);
  const [opacity, setOpacity] = useState(3);
  const [copied, setCopied] = useState(false);

  const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

  const handleCopy = useCallback(async () => {
    const code = `opacity: ${(opacity / 100).toFixed(2)};`;
    try { await navigator.clipboard.writeText(code); } catch {
      const ta = document.createElement('textarea'); ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [opacity]);

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <button onClick={() => setEnabled(!enabled)} style={{
          padding: '4px 14px', borderRadius: '6px', border: '1px solid',
          borderColor: enabled ? 'var(--accent-blue)' : 'var(--border-default)',
          background: enabled ? 'var(--blue-10)' : 'transparent',
          color: enabled ? 'var(--accent-blue)' : 'var(--text-quaternary)',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
        }}>{enabled ? 'Grain ON' : 'Grain OFF'}</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 200px', minWidth: '160px' }}>
          <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Opacity</span>
          <input
            type="range" min="0" max="25" step="1" value={opacity}
            onChange={(e) => setOpacity(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
            aria-label="Grain opacity percentage"
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

      {/* Hairline grid: with grain vs without */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
        background: 'var(--border-default)', border: '1px solid var(--border-default)',
        borderRadius: '12px', overflow: 'hidden',
      }}>
        {/* With grain */}
        <div style={{ position: 'relative', padding: '32px', background: 'var(--surface-0)', minHeight: '220px' }}>
          {enabled && (
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              opacity: opacity / 100, backgroundImage: grainSvg, zIndex: 1,
            }} />
          )}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px',
                color: enabled ? 'var(--accent-blue)' : 'var(--text-muted)', padding: '2px 8px',
                borderRadius: '4px', background: enabled ? 'var(--blue-10)' : 'transparent',
              }}>opacity: {(opacity / 100).toFixed(2)}</span>
            </div>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600,
              textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)',
            }}>With Grain</span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: 1.6 }}>
              SVG feTurbulence noise adds analog texture to the flat dark background. Prevents the digital void feel.
            </p>
            <div style={{
              marginTop: '24px', padding: '16px', borderRadius: '8px',
              background: 'var(--surface-2)', border: '1px solid var(--border-default)',
            }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Card on grained surface</span>
            </div>
          </div>
        </div>

        {/* Without grain */}
        <div style={{ padding: '32px', background: 'var(--surface-0)', minHeight: '220px' }}>
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600,
            textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)',
          }}>Without Grain</span>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '16px', lineHeight: 1.6 }}>
            Pure flat black. Compare with the left side to see the texture difference at the current opacity level.
          </p>
          <div style={{
            marginTop: '24px', padding: '16px', borderRadius: '8px',
            background: 'var(--surface-2)', border: '1px solid var(--border-default)',
          }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Card on flat surface</span>
          </div>
        </div>
      </div>

      {/* Recommended range indicator */}
      <div style={{
        marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-muted)',
      }}>
        <div style={{ height: '2px', flex: 1, background: 'var(--border-subtle)', position: 'relative', borderRadius: '1px' }}>
          <div style={{
            position: 'absolute', left: `${(2 / 25) * 100}%`, width: `${((4 - 2) / 25) * 100}%`,
            height: '100%', background: 'var(--accent-blue)', borderRadius: '1px', opacity: 0.5,
          }} />
        </div>
        <span>Recommended: 2-4%</span>
      </div>
    </div>
  );
}
