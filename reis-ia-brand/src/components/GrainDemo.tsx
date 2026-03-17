import { useState } from 'react';

/**
 * GrainDemo — Live demo of the grain/noise texture overlay.
 * Allows toggling grain on/off and adjusting opacity.
 */
export default function GrainDemo() {
  const [enabled, setEnabled] = useState(true);
  const [opacity, setOpacity] = useState(0.03);

  return (
    <div>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setEnabled(!enabled)}
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: enabled ? 'var(--accent-blue)' : 'var(--border-default)',
            background: enabled ? 'var(--blue-10)' : 'transparent',
            color: enabled ? 'var(--accent-blue)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          {enabled ? 'Grain ON' : 'Grain OFF'}
        </button>
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            color: 'var(--text-tertiary)',
          }}
        >
          Opacity:
        </span>
        {[0.02, 0.03, 0.05, 0.08].map(o => (
          <button
            key={o}
            onClick={() => setOpacity(o)}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: opacity === o ? 'var(--accent-blue)' : 'var(--border-default)',
              background: opacity === o ? 'var(--blue-10)' : 'transparent',
              color: opacity === o ? 'var(--accent-blue)' : 'var(--text-quaternary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            {(o * 100).toFixed(0)}%
          </button>
        ))}
      </div>

      {/* Demo area */}
      <div
        style={{
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          minHeight: '240px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* With grain */}
        <div
          style={{
            position: 'relative',
            padding: '32px',
            background: 'var(--surface-0)',
          }}
        >
          {enabled && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                zIndex: 1,
              }}
            />
          )}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                color: 'var(--text-quaternary)',
              }}
            >
              Surface-0 with grain
            </span>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
              The noise overlay adds analog texture to flat dark backgrounds, preventing the "digital void" feel.
            </p>
          </div>
        </div>

        {/* Without grain */}
        <div
          style={{
            padding: '32px',
            background: 'var(--surface-0)',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.04em',
              color: 'var(--text-quaternary)',
            }}
          >
            Surface-0 without grain
          </span>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
            Pure flat black. Compare with the left side to see the subtle texture difference at the current opacity level.
          </p>
        </div>
      </div>
    </div>
  );
}
