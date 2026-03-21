/**
 * MarqueeDemo — Continuously scrolling logo strip with hover pause.
 * Uses CSS animation with duplicated items for seamless loop.
 * Edge fade mask via CSS gradient.
 */
export default function MarqueeDemo() {
  const logos = ['OpenAI', 'Anthropic', 'Google AI', 'Meta AI', 'Vercel', 'Stripe', 'Linear', 'Notion'];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Edge fade mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(90deg, var(--surface-0) 0%, transparent 8%, transparent 92%, var(--surface-0) 100%)',
        }}
      />

      {/* Track */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
          padding: '24px 0',
          animation: 'marquee 35s linear infinite',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = 'running'; }}
      >
        {/* First set */}
        {logos.map((name, i) => (
          <LogoItem key={`a-${i}`} name={name} />
        ))}
        {/* Duplicate for seamless loop */}
        {logos.map((name, i) => (
          <LogoItem key={`b-${i}`} name={name} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function LogoItem({ name }: { name: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 24px',
        height: '40px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '6px',
        color: 'var(--text-quaternary)',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        transition: 'opacity 200ms, color 200ms, border-color 200ms',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.borderColor = 'var(--border-visible)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-quaternary)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {name}
    </div>
  );
}
