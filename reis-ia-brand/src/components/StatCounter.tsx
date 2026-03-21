import { useState, useEffect, useRef } from 'react';

interface StatCounterProps {
  /** The final number to count up to */
  value: number;
  /** Text before the number (e.g., "$") */
  prefix?: string;
  /** Text after the number (e.g., "%", "K", "+") */
  suffix?: string;
  /** Duration in ms */
  duration?: number;
  /** Accent blue color on the number */
  accent?: boolean;
}

/**
 * StatCounter — Animated number that counts up when scrolled into view.
 * Uses IntersectionObserver for scroll trigger, requestAnimationFrame for smooth animation.
 */
export default function StatCounter({ value, prefix = '', suffix = '', duration = 1500, accent = true }: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span
      ref={ref}
      style={{
        fontSize: 'clamp(40px, 5vw, 56px)',
        fontWeight: 700,
        color: accent ? 'var(--accent-blue)' : 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
      }}
    >
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}
