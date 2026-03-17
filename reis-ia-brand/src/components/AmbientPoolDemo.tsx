/**
 * AmbientPoolDemo — Live demo of Cool Ambient Pools effect.
 * Shows floating radial gradient blurs at section corners.
 */
export default function AmbientPoolDemo() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
        minHeight: '320px',
      }}
    >
      {/* Section simulation - Surface 0 */}
      <div
        style={{
          position: 'relative',
          padding: '48px 32px',
          background: 'var(--surface-0)',
          minHeight: '160px',
        }}
      >
        {/* Ambient pool - top left */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60%',
            height: '140%',
            background: 'radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em',
            color: 'var(--text-quaternary)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Section on Surface-0 -- Blue pool at top-left
        </span>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', position: 'relative', zIndex: 1 }}>
          Blue-tinted ambient pools appear on key sections (hero, CTA areas). The radial gradient uses rgba(74, 144, 255, 0.06) for a subtle glow.
        </p>
      </div>

      {/* Section simulation - Surface 1 */}
      <div
        style={{
          position: 'relative',
          padding: '48px 32px',
          background: 'var(--surface-1)',
          minHeight: '160px',
        }}
      >
        {/* Ambient pool - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '50%',
            height: '140%',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em',
            color: 'var(--text-quaternary)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Section on Surface-1 -- Neutral pool at bottom-right
        </span>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px', position: 'relative', zIndex: 1 }}>
          Secondary sections use neutral (white-alpha) pools. Corner positions alternate to create visual rhythm across the page.
        </p>
      </div>
    </div>
  );
}
