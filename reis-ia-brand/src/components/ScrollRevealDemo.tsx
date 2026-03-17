import { useState, useCallback } from 'react';

/**
 * ScrollRevealDemo — Demonstrates entrance animations (fade-up, fade-in, scale-in).
 * Click to replay each animation type.
 */
export default function ScrollRevealDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const demos = [
    {
      id: 'fade-up',
      name: 'Fade Up',
      description: 'Primary entrance. translateY(24px) + opacity 0 to visible.',
      initial: { opacity: 0, transform: 'translateY(24px)' },
      final: { opacity: 1, transform: 'translateY(0)' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    {
      id: 'fade-in',
      name: 'Fade In',
      description: 'Opacity only. For subtle reveals without movement.',
      initial: { opacity: 0, transform: 'none' },
      final: { opacity: 1, transform: 'none' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    {
      id: 'scale-in',
      name: 'Scale Reveal',
      description: 'scale(0.96) + opacity 0 to visible. For images/visuals.',
      initial: { opacity: 0, transform: 'scale(0.96)' },
      final: { opacity: 1, transform: 'scale(1)' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
    },
    {
      id: 'perspective',
      name: '3D Perspective',
      description: 'translateY(80px) rotateX(8deg) to visible. Hero sections only.',
      initial: { opacity: 0, transform: 'translateY(80px) rotateX(8deg)' },
      final: { opacity: 1, transform: 'translateY(0) rotateX(0)' },
      transition: 'all 1200ms cubic-bezier(0.65, 0, 0.35, 1)',
    },
  ];

  const replay = useCallback((id: string) => {
    setActiveDemo(null);
    setKey(k => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setActiveDemo(id);
      });
    });
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
      }}
    >
      {demos.map(demo => {
        const isActive = activeDemo === demo.id;
        const style = isActive ? demo.final : demo.initial;

        return (
          <button
            key={demo.id}
            onClick={() => replay(demo.id)}
            style={{
              textAlign: 'left',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'border-color 200ms',
              perspective: demo.id === 'perspective' ? '1200px' : undefined,
            }}
          >
            <div
              key={`${demo.id}-${key}`}
              style={{
                ...style,
                transition: isActive ? demo.transition : 'none',
                transformOrigin: demo.id === 'perspective' ? 'bottom center' : undefined,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  borderRadius: '8px',
                  background: 'var(--blue-08)',
                  border: '1px solid var(--blue-20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <span style={{ fontSize: '24px', color: 'var(--accent-blue)', fontWeight: 700 }}>
                  Aa
                </span>
              </div>
            </div>
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent-blue)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {demo.name}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', display: 'block', lineHeight: 1.5 }}>
              {demo.description}
            </span>
            <span
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '10px',
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: '8px',
              }}
            >
              Click to replay
            </span>
          </button>
        );
      })}
    </div>
  );
}
