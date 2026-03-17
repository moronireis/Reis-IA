import { useState, useRef, useCallback, useEffect } from 'react';

interface CounterDemoProps {
  targets?: { value: number; suffix: string; label: string }[];
}

/**
 * CounterDemo — Animated number counter that counts up from 0.
 * Click to replay the animation.
 */
export default function CounterDemo({ targets }: CounterDemoProps) {
  const defaultTargets = [
    { value: 97, suffix: '%', label: 'Client Retention' },
    { value: 150, suffix: '+', label: 'AI Implementations' },
    { value: 3, suffix: 'x', label: 'Average ROI' },
  ];
  const items = targets || defaultTargets;
  const [values, setValues] = useState<number[]>(items.map(() => 0));
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<number>(0);

  const play = useCallback(() => {
    setValues(items.map(() => 0));
    setPlaying(true);
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setValues(items.map(item => Math.round(item.value * eased)));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setPlaying(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [items]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div>
      <button
        onClick={play}
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
          transition: 'border-color 200ms',
        }}
      >
        {playing ? 'Playing...' : 'Click to replay'}
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          padding: '32px',
          background: 'var(--surface-1)',
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--accent-blue)',
                lineHeight: 1.1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {values[i]}{item.suffix}
            </div>
            <div
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.05em',
                color: 'var(--text-tertiary)',
                marginTop: '8px',
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
