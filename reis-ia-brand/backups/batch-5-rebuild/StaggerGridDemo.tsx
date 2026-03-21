import { useState, useCallback } from 'react';

/**
 * StaggerGridDemo — Demonstrates staggered grid entrance animation.
 * Cards appear with cascading delays (100ms per item).
 */
export default function StaggerGridDemo() {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  const replay = useCallback(() => {
    setVisible(false);
    setKey(k => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, []);

  const items = [
    { label: 'Builder', desc: 'Direct client services' },
    { label: 'Systems', desc: 'AI implementation' },
    { label: 'Partners', desc: 'Agency partnerships' },
    { label: 'Network', desc: 'Community ecosystem' },
    { label: 'Academy', desc: 'Education platform' },
    { label: 'Labs', desc: 'R&D and experiments' },
  ];

  return (
    <div>
      <button
        onClick={replay}
        style={{
          padding: '6px 16px',
          borderRadius: '6px',
          border: '1px solid var(--border-default)',
          background: 'transparent',
          color: 'var(--text-quaternary)',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '11px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Click to replay
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {items.map((item, i) => (
          <div
            key={`${key}-${i}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: visible
                ? `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)`
                : 'none',
              transitionDelay: visible ? `${i * 100}ms` : '0ms',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent-blue)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}
            >
              0{i + 1}
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {item.label}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
