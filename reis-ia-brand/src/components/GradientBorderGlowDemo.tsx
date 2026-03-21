import { useState } from 'react';

/**
 * GradientBorderGlowDemo — Morningside-style gradient border glow adapted in blue.
 * Shows the background-clip technique with configurable glow intensity.
 */
export default function GradientBorderGlowDemo() {
  const [glowIntensity, setGlowIntensity] = useState(12);
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap',
        padding: '12px 16px', borderRadius: '8px', background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
      }}>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>Glow Intensity</span>
        <input type="range" min="0" max="30" step="1" value={glowIntensity}
          onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
          style={{ flex: '1 1 150px', accentColor: 'var(--accent-blue)', cursor: 'pointer', height: '4px' }}
          aria-label="Blue glow intensity percentage"
        />
        <span style={{
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '13px', fontWeight: 700,
          color: 'var(--accent-blue)', minWidth: '36px', textAlign: 'right',
        }}>{glowIntensity}%</span>
      </div>

      {/* Demo grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
        background: 'var(--border-default)', border: '1px solid var(--border-default)',
        borderRadius: '12px', overflow: 'hidden',
      }}>
        {/* Gradient border card */}
        <div style={{ background: 'var(--surface-0)', padding: '32px', minHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--accent-blue)', letterSpacing: '0.2em' }}>01</span>
            <span style={{ display: 'block', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginTop: '2px' }}>Gradient Border</span>
          </div>

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              background: `linear-gradient(135deg, var(--surface-2), var(--surface-3)) padding-box, linear-gradient(90deg, rgba(74,144,255,0.4) 0%, rgba(74,144,255,0) 50%, rgba(74,144,255,0.4) 100%) border-box`,
              border: '1px solid transparent',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '280px',
              width: '100%',
              cursor: 'pointer',
              boxShadow: hovered ? `0 0 ${glowIntensity * 4}px rgba(74, 144, 255, ${glowIntensity / 100})` : 'none',
              transition: 'box-shadow 500ms cubic-bezier(0.7, 0, 0, 1)',
            }}
          >
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Gradient Border</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              background-clip technique with blue sweep. Hover for glow effect at {glowIntensity}% intensity.
            </p>
          </div>

          <span style={{
            position: 'absolute', bottom: '12px', left: '12px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>hover me</span>
        </div>

        {/* Rotating border comparison */}
        <div style={{ background: 'var(--surface-0)', padding: '32px', minHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)', letterSpacing: '0.2em' }}>02</span>
            <span style={{ display: 'block', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginTop: '2px' }}>Static Glow</span>
          </div>

          <div style={{
            borderRadius: '12px', padding: '24px', maxWidth: '280px', width: '100%',
            background: 'var(--surface-2)', border: '1px solid var(--border-accent)',
            boxShadow: `0 0 ${glowIntensity * 3}px rgba(74, 144, 255, ${glowIntensity / 200})`,
            transition: 'box-shadow 300ms ease',
          }}>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Persistent Glow</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              border-accent + box-shadow glow. Always visible, no hover required.
            </p>
          </div>

          <span style={{
            position: 'absolute', bottom: '12px', left: '12px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
          }}>always on</span>
        </div>
      </div>
    </div>
  );
}
