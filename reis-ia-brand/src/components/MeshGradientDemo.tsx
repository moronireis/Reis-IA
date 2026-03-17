/**
 * MeshGradientDemo — Live demo of multi-stop radial gradients
 * creating organic flowing background patterns.
 */
export default function MeshGradientDemo() {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
        minHeight: '300px',
        position: 'relative',
        background: [
          'radial-gradient(at 40% 20%, rgba(74, 144, 255, 0.07) 0%, transparent 50%)',
          'radial-gradient(at 80% 0%, rgba(53, 112, 204, 0.05) 0%, transparent 50%)',
          'radial-gradient(at 0% 50%, rgba(141, 196, 255, 0.04) 0%, transparent 50%)',
          'radial-gradient(at 60% 100%, rgba(74, 144, 255, 0.06) 0%, transparent 50%)',
          'var(--surface-0)',
        ].join(', '),
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, padding: '48px 32px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Mesh Gradient
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
          Four overlapping radial gradients create an organic, flowing background. Each gradient uses a different blue shade and position for natural depth variation.
        </p>

        {/* Point indicators */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { pos: '40% 20%', color: '#4A90FF', opacity: '7%' },
            { pos: '80% 0%', color: '#3570CC', opacity: '5%' },
            { pos: '0% 50%', color: '#8DC4FF', opacity: '4%' },
            { pos: '60% 100%', color: '#4A90FF', opacity: '6%' },
          ].map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: point.color,
                  boxShadow: `0 0 8px ${point.color}40`,
                }}
              />
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)' }}>
                at {point.pos} ({point.opacity})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
