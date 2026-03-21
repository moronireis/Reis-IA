import { useState } from 'react';

/**
 * AuroraDemo — Live demo of the Aurora Background effect.
 * Three slow-moving gradient orbs creating an ethereal backdrop.
 */
export default function AuroraDemo() {
  const [running, setRunning] = useState(true);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={() => setRunning(!running)}
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: running ? 'var(--accent-blue)' : 'var(--border-default)',
            background: running ? 'var(--blue-10)' : 'transparent',
            color: running ? 'var(--accent-blue)' : 'var(--text-quaternary)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          {running ? 'Pause' : 'Play'}
        </button>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)' }}>
          20s cycle, ease-in-out, infinite alternate
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          minHeight: '360px',
          background: 'var(--surface-0)',
        }}
      >
        {/* Aurora gradient layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74, 144, 255, 0.08) 0%, transparent 60%)',
              'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(141, 196, 255, 0.05) 0%, transparent 60%)',
              'radial-gradient(ellipse 50% 60% at 50% 80%, rgba(53, 112, 204, 0.06) 0%, transparent 60%)',
            ].join(', '),
            animation: running ? 'aurora-shift 20s ease-in-out infinite alternate' : 'none',
            pointerEvents: 'none',
          }}
        />

        {/* Content overlay */}
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Aurora Background
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Three gradient orbs slowly drift and scale, creating an ethereal atmospheric backdrop. Used behind hero sections for ambient depth.
          </p>
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes aurora-shift {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            33% { transform: translate(-5%, 3%) scale(1.05); opacity: 0.8; }
            66% { transform: translate(3%, -2%) scale(0.98); opacity: 1; }
            100% { transform: translate(-2%, 5%) scale(1.02); opacity: 0.9; }
          }
        `}</style>
      </div>
    </div>
  );
}
