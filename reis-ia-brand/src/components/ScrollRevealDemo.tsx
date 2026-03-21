import { useState, useCallback } from 'react';

/**
 * ScrollRevealDemo — Hairline grid of 4 entrance animation types.
 * Each cell is click-to-replay with metadata labels.
 */
export default function ScrollRevealDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const demos = [
    {
      id: 'fade-up', num: '01', name: 'Fade Up', badge: '800ms',
      description: 'Primary entrance. translateY(24px) + opacity.',
      initial: { opacity: 0, transform: 'translateY(24px)' },
      final: { opacity: 1, transform: 'translateY(0)' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
      css: 'translateY(24px) + opacity',
    },
    {
      id: 'fade-in', num: '02', name: 'Fade In', badge: '800ms',
      description: 'Opacity only. For subtle reveals without movement.',
      initial: { opacity: 0, transform: 'none' },
      final: { opacity: 1, transform: 'none' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)',
      css: 'opacity only',
    },
    {
      id: 'scale-in', num: '03', name: 'Scale Reveal', badge: '800ms',
      description: 'scale(0.96) + opacity. For images and visuals.',
      initial: { opacity: 0, transform: 'scale(0.96)' },
      final: { opacity: 1, transform: 'scale(1)' },
      transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
      css: 'scale(0.96) + opacity',
    },
    {
      id: 'perspective', num: '04', name: '3D Perspective', badge: '1200ms',
      description: 'translateY(80px) rotateX(8deg). Hero sections only.',
      initial: { opacity: 0, transform: 'translateY(80px) rotateX(8deg)' },
      final: { opacity: 1, transform: 'translateY(0) rotateX(0)' },
      transition: 'all 1200ms cubic-bezier(0.65, 0, 0.35, 1)',
      css: 'translateY(80px) rotateX(8deg)',
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
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
      background: 'var(--border-default)', border: '1px solid var(--border-default)',
      borderRadius: '12px', overflow: 'hidden',
    }}>
      {demos.map(demo => {
        const isActive = activeDemo === demo.id;
        const style = isActive ? demo.final : demo.initial;

        return (
          <div
            key={demo.id}
            onClick={() => replay(demo.id)}
            style={{
              background: 'var(--surface-0)',
              padding: '24px',
              cursor: 'pointer',
              position: 'relative',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              perspective: demo.id === 'perspective' ? '1200px' : undefined,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); replay(demo.id); } }}
            aria-label={`Replay ${demo.name} animation`}
          >
            {/* Top metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--accent-blue)', letterSpacing: '0.2em' }}>{demo.num}</span>
                <span style={{ display: 'block', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '10px', color: 'var(--text-quaternary)', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginTop: '2px' }}>{demo.name}</span>
              </div>
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px', color: 'var(--text-muted)' }}>{demo.badge}</span>
            </div>

            {/* Animation area */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                key={`${demo.id}-${key}`}
                style={{
                  ...style,
                  transition: isActive ? demo.transition : 'none',
                  transformOrigin: demo.id === 'perspective' ? 'bottom center' : undefined,
                  width: '100%', maxWidth: '200px',
                }}
              >
                <div style={{
                  width: '100%', height: '80px', borderRadius: '8px',
                  background: 'var(--blue-08)', border: '1px solid var(--blue-20)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '20px', color: 'var(--accent-blue)', fontWeight: 700 }}>Aa</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.4, display: 'block' }}>{demo.description}</span>
              <span style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '9px', color: 'var(--text-muted)',
                display: 'block', marginTop: '4px',
              }}>{demo.css}</span>
            </div>

            {/* Replay label */}
            <span style={{
              position: 'absolute', bottom: '8px', right: '12px',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
              opacity: 0.6,
            }}>click to replay</span>
          </div>
        );
      })}
    </div>
  );
}
