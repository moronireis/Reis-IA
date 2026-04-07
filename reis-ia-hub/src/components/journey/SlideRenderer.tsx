import React, { useState, useEffect, useCallback } from 'react';

interface SlideRendererProps {
  content: string;
  accentColor: string;
}

/**
 * Renders HTML slide presentations inside journey nodes.
 * Slides are separated by `---` on its own line.
 * Each slide supports full HTML + inline styles.
 */
export default function SlideRenderer({ content, accentColor }: SlideRendererProps): React.ReactElement {
  // Parse slides — split by --- on its own line
  const rawSlides = content
    .split(/\n---\n/)
    .map(s => s.trim())
    .filter(Boolean);

  const slides = rawSlides.length > 0 ? rawSlides : [content];
  const total = slides.length;

  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent(prev => Math.min(prev + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const slideHtml = slides[current] || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Slide content area */}
      <div
        style={{
          background: '#0D0D12',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '32px 28px',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Slide number indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '14px',
          fontSize: '10px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.20)',
          letterSpacing: '0.06em',
        }}>
          {current + 1}/{total}
        </div>

        {/* Rendered HTML */}
        <div
          className="slide-content"
          dangerouslySetInnerHTML={{ __html: slideHtml }}
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
          }}
        />
      </div>

      {/* Navigation */}
      {total > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 4px 0',
        }}>
          <button
            onClick={goPrev}
            disabled={current === 0}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: current === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: current === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: current === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Anterior
          </button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === current ? accentColor : 'rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={current === total - 1}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: current === total - 1 ? 'rgba(255,255,255,0.03)' : `${accentColor}15`,
              border: `1px solid ${current === total - 1 ? 'rgba(255,255,255,0.06)' : `${accentColor}25`}`,
              color: current === total - 1 ? 'rgba(255,255,255,0.15)' : accentColor,
              fontSize: '12px',
              fontWeight: 500,
              cursor: current === total - 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Proximo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Inject slide styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .slide-content h1 {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px 0;
          line-height: 1.3;
        }
        .slide-content h2 {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 12px 0;
          padding-left: 12px;
          border-left: 3px solid ${accentColor};
          line-height: 1.4;
        }
        .slide-content h3 {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin: 16px 0 8px 0;
        }
        .slide-content p {
          margin: 0 0 12px 0;
          color: rgba(255,255,255,0.65);
        }
        .slide-content strong, .slide-content b {
          color: ${accentColor};
          font-weight: 600;
        }
        .slide-content code {
          background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.20);
          border-radius: 4px;
          padding: 1px 6px;
          font-family: monospace;
          font-size: 13px;
          color: #8B5CF6;
        }
        .slide-content pre {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 14px 16px;
          font-size: 13px;
          overflow-x: auto;
          margin: 12px 0;
          color: rgba(255,255,255,0.75);
        }
        .slide-content ul, .slide-content ol {
          margin: 0 0 12px 0;
          padding-left: 0;
          list-style: none;
        }
        .slide-content li {
          padding: 6px 0 6px 20px;
          position: relative;
          color: rgba(255,255,255,0.65);
        }
        .slide-content ul li::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 14px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${accentColor};
        }
        .slide-content ol { counter-reset: slide-counter; }
        .slide-content ol li { counter-increment: slide-counter; }
        .slide-content ol li::before {
          content: counter(slide-counter);
          position: absolute;
          left: 0;
          top: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${accentColor}18;
          border: 1px solid ${accentColor}35;
          color: ${accentColor};
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-content .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 16px;
          margin: 10px 0;
        }
        .slide-content .highlight {
          background: ${accentColor}12;
          border-left: 3px solid ${accentColor};
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          margin: 12px 0;
          font-style: italic;
          color: rgba(255,255,255,0.60);
        }
        .slide-content .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 12px 0;
        }
        @media (max-width: 640px) {
          .slide-content .grid-2 { grid-template-columns: 1fr; }
        }
        .slide-content .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .slide-content .badge-blue { background: rgba(74,144,255,0.12); color: #4A90FF; }
        .slide-content .badge-green { background: rgba(34,197,94,0.12); color: #22C55E; }
        .slide-content .badge-purple { background: rgba(139,92,246,0.12); color: #8B5CF6; }
        .slide-content .badge-amber { background: rgba(245,158,11,0.12); color: #F59E0B; }
        .slide-content .center { text-align: center; }
        .slide-content .big-number {
          font-size: 48px;
          font-weight: 700;
          color: ${accentColor};
          line-height: 1;
          text-shadow: 0 0 30px ${accentColor}40;
        }
        .slide-content .diagram {
          background: #080810;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          margin: 12px 0;
          font-family: monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.50);
          white-space: pre;
          line-height: 1.6;
        }
      `}} />
    </div>
  );
}
