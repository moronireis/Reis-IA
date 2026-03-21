import { useRef, useCallback } from 'react';

/**
 * MagneticDemo — Live demo of the magnetic hover effect.
 * Button follows cursor position within bounds (max 8px offset).
 */
export default function MagneticDemo() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxOffset = 8;
    const offsetX = Math.max(-maxOffset, Math.min(maxOffset, x * 0.15));
    const offsetY = Math.max(-maxOffset, Math.min(maxOffset, y * 0.15));
    btnRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate(0, 0)';
  }, []);

  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
        background: 'var(--surface-0)',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Move your cursor over the button to see the magnetic pull effect (max 8px offset).
      </p>
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ padding: '32px', cursor: 'pointer' }}
      >
        <button
          ref={btnRef}
          style={{
            padding: '14px 32px',
            borderRadius: '8px',
            background: 'var(--accent-blue)',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 30px rgba(74, 144, 255, 0.12)',
          }}
        >
          Magnetic CTA
        </button>
      </div>
      <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', color: 'var(--text-quaternary)' }}>
        transition: transform 300ms var(--ease-out)
      </span>
    </div>
  );
}
