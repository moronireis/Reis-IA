/**
 * SectionTransitionDemo — Shows gradient fade overlays between sections.
 */
export default function SectionTransitionDemo() {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      {/* Section A (Surface-0) */}
      <div
        style={{
          position: 'relative',
          padding: '40px 32px',
          background: 'var(--surface-0)',
          minHeight: '120px',
        }}
      >
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)' }}>
          Section A -- Surface-0
        </span>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Content on the void background.
        </p>
        {/* Gradient fade to next section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, var(--surface-1))',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Section B (Surface-1) */}
      <div
        style={{
          position: 'relative',
          padding: '40px 32px',
          background: 'var(--surface-1)',
          minHeight: '120px',
        }}
      >
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)' }}>
          Section B -- Surface-1
        </span>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          The gradient creates a smooth visual transition between the two surface tiers, avoiding a hard edge.
        </p>
        {/* Gradient fade to next section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, var(--surface-0))',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Section C (Surface-0 again) */}
      <div
        style={{
          padding: '40px 32px',
          background: 'var(--surface-0)',
          minHeight: '80px',
        }}
      >
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)' }}>
          Section C -- Surface-0
        </span>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Back to void. The cycle continues.
        </p>
      </div>
    </div>
  );
}
