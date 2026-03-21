import { useState, useRef, useCallback } from 'react';

/**
 * ParallaxDemo — Simulates parallax layers within a scrollable container.
 * Three layers move at different speeds as user scrolls within the demo.
 */
export default function ParallaxDemo() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  }, []);

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
        Scroll within the container below to see three layers moving at different speeds.
      </p>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          height: '360px',
          overflowY: 'scroll',
          background: 'var(--surface-0)',
        }}
      >
        {/* Tall inner to enable scrolling */}
        <div style={{ height: '800px', position: 'relative' }}>
          {/* Slow layer (background) */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '10%',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(74, 144, 255, 0.06) 0%, transparent 70%)',
              transform: `translateY(${scrollY * -0.05}px)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '200px',
              right: '15%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(53, 112, 204, 0.05) 0%, transparent 70%)',
              transform: `translateY(${scrollY * -0.05}px)`,
              pointerEvents: 'none',
            }}
          />

          {/* Medium layer */}
          <div
            style={{
              position: 'absolute',
              top: '120px',
              left: '30%',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '80px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.03)',
              transform: `translateY(${scrollY * -0.1}px)`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            IA
          </div>

          {/* Fast layer (foreground content) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '32px',
              transform: `translateY(${scrollY * -0.15}px)`,
            }}
          >
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
              <span
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.04em',
                  color: 'var(--accent-blue)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                parallax-fast (-0.15)
              </span>
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Foreground Content
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  This content moves fastest relative to scroll. Background elements (orbs, watermarks) move slower, creating depth perception.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '120px' }}>
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Keep Scrolling
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Notice how the gradient orbs and "IA" watermark lag behind.
                </p>
              </div>
            </div>
          </div>

          {/* Speed labels */}
          <div
            style={{
              position: 'fixed',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 10,
            }}
          >
            {[
              { label: 'Slow', factor: '-0.05', color: 'rgba(74,144,255,0.3)' },
              { label: 'Medium', factor: '-0.10', color: 'rgba(74,144,255,0.5)' },
              { label: 'Fast', factor: '-0.15', color: 'rgba(74,144,255,0.7)' },
            ].map(l => (
              <span
                key={l.label}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  fontSize: '9px',
                  color: l.color,
                }}
              >
                {l.label}: {l.factor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
