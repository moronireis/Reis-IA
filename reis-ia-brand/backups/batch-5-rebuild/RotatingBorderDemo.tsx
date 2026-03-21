import { useState } from 'react';

interface RotatingBorderDemoProps {
  speed?: number;
}

/**
 * RotatingBorderDemo — Live demo of the Sapphire Scanner rotating border effect.
 * Allows speed adjustment via buttons.
 */
export default function RotatingBorderDemo({ speed: initialSpeed = 8 }: RotatingBorderDemoProps) {
  const [speed, setSpeed] = useState(initialSpeed);
  const [paused, setPaused] = useState(false);

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
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em',
            color: 'var(--text-tertiary)',
          }}
        >
          Speed: {speed}s
        </span>
        {[4, 8, 13, 20].map(s => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            style={{
              padding: '4px 12px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: speed === s ? 'var(--accent-blue)' : 'var(--border-default)',
              background: speed === s ? 'var(--blue-10)' : 'transparent',
              color: speed === s ? 'var(--accent-blue)' : 'var(--text-quaternary)',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
          >
            {s}s
          </button>
        ))}
        <button
          onClick={() => setPaused(!paused)}
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-default)',
            background: 'transparent',
            color: 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>

      {/* Demo card with rotating border */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Card with rotating border */}
        <div
          className="card-rotating-border"
          style={{
            borderRadius: '12px',
            padding: '32px',
            animationDuration: `${speed}s`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--blue-10)',
              border: '1px solid var(--blue-20)',
              marginBottom: '16px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Sapphire Scanner
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A blue light segment sweeps the card perimeter at a configurable speed. The narrow beam (~15% of the circle) creates a scanning effect.
          </p>
        </div>

        {/* Static comparison */}
        <div
          style={{
            borderRadius: '12px',
            padding: '32px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-default)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-default)',
              marginBottom: '16px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-quaternary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Standard Card
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            For comparison: a standard card with a static border. The rotating border is reserved for 1-2 featured cards per page.
          </p>
        </div>
      </div>
    </div>
  );
}
