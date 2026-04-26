export default function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        opacity: 0.3,
        maskImage: 'radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%)',
      }}
    />
  );
}
