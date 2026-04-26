export default function GlowLine({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-px relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
        style={{
          animation: 'text-shimmer 3s linear infinite',
          backgroundSize: '200% auto',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
