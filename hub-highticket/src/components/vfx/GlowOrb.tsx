interface GlowOrbProps {
  size?: number;
  top?: string;
  left?: string;
  opacity?: number;
  delay?: number;
}

export default function GlowOrb({
  size = 200,
  top = '50%',
  left = '50%',
  opacity = 0.08,
  delay = 0,
}: GlowOrbProps) {
  return (
    <div
      className="absolute rounded-full pointer-events-none animate-float-slow"
      style={{
        width: size,
        height: size,
        top,
        left,
        opacity,
        background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
        filter: 'blur(60px)',
        animationDelay: `${delay}s`,
      }}
    />
  );
}
