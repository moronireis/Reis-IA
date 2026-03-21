import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * ScrollRevealContainer — Simulated scroll container with items that reveal on scroll.
 * Uses IntersectionObserver inside a scrollable div to demonstrate scroll-triggered animations.
 */
export default function ScrollRevealContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [key, setKey] = useState(0);

  const reset = useCallback(() => {
    setVisibleItems(new Set());
    setKey(k => k + 1);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
            setVisibleItems(prev => new Set([...prev, idx]));
          }
        });
      },
      { root: container, threshold: 0.3 }
    );

    const items = container.querySelectorAll('[data-reveal-item]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [key]);

  const sections = [
    { title: 'Hero Section', desc: 'First element visible immediately. No delay needed.' },
    { title: 'About Section', desc: 'Fades up as user scrolls down. 800ms with ease-out.' },
    { title: 'Features Grid', desc: 'Four cards appear with 100ms stagger between each.' },
    { title: 'Testimonial', desc: 'Scale reveal for the quote card. 0.96 to 1.0.' },
    { title: 'CTA Section', desc: 'Final section with blue ambient pool behind the button.' },
    { title: 'Footer', desc: 'Subtle fade-in. The last element on the page.' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <button onClick={reset} style={{
          padding: '6px 16px', borderRadius: '6px', border: '1px solid var(--accent-blue)',
          background: 'var(--blue-10)', color: 'var(--accent-blue)',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', cursor: 'pointer',
        }}>Reset & Scroll</button>
        <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)' }}>
          Scroll down inside the container to see items reveal
        </span>
      </div>

      <div
        ref={containerRef}
        key={key}
        style={{
          height: '400px', overflowY: 'auto', borderRadius: '12px',
          border: '1px solid var(--border-default)', background: 'var(--surface-0)',
          position: 'relative',
        }}
      >
        <div style={{ padding: '24px', minHeight: '1200px' }}>
          {sections.map((section, i) => (
            <div
              key={i}
              data-reveal-item
              data-idx={i}
              style={{
                opacity: visibleItems.has(i) ? 1 : 0,
                transform: visibleItems.has(i) ? 'translateY(0)' : 'translateY(24px)',
                transition: visibleItems.has(i)
                  ? 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
                marginBottom: '40px',
                padding: '24px',
                borderRadius: '12px',
                background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-2)',
                border: '1px solid var(--border-default)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 700,
                  color: 'var(--accent-blue)', letterSpacing: '0.2em',
                }}>0{i + 1}</span>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{section.title}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{section.desc}</p>
              <div style={{
                marginTop: '8px', fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '9px', color: visibleItems.has(i) ? 'var(--color-success)' : 'var(--text-muted)',
              }}>{visibleItems.has(i) ? 'revealed' : 'waiting for scroll'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
