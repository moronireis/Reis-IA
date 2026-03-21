import { useState, useCallback } from 'react';

/**
 * TextRevealDemo — Words fade from 20% to 100% opacity on trigger.
 * Click to replay the reveal animation.
 */
export default function TextRevealDemo() {
  const [revealed, setRevealed] = useState(false);
  const [key, setKey] = useState(0);

  const replay = useCallback(() => {
    setRevealed(false);
    setKey(k => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRevealed(true);
      });
    });
  }, []);

  const words = 'Artificial intelligence is not a tool — it is a strategic multiplier that transforms how businesses create value'.split(' ');

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
          borderRadius: '12px',
          border: '1px solid var(--border-default)',
          padding: '48px 32px',
          background: 'var(--surface-0)',
          textAlign: 'center',
        }}
      >
        <p
          key={key}
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {words.map((word, i) => (
            <span
              key={`${key}-${i}`}
              style={{
                display: 'inline-block',
                color: revealed ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: `color 800ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${i * 60}ms`,
                marginRight: '0.3em',
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
