import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: '98%+', label: 'Precisão', sublabel: 'na detecção IA' },
  { value: '24/7', label: 'Monitoramento', sublabel: 'sem intervalos' },
  { value: '100x', label: 'Menos alarmes', sublabel: 'falsos vs convencional' },
  { value: '<5min', label: 'Resposta', sublabel: 'tempo de reação' },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4"
      style={{
        gap: '1px',
        background: 'rgba(230,57,70,0.06)',
        border: '1px solid rgba(230,57,70,0.08)',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: '#0a0a0e',
            padding: '20px 16px',
            textAlign: 'center',
            cursor: 'default',
            transition: 'all 0.4s ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${i * 100}ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(230,57,70,0.04)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(230,57,70,0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0a0a0e';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '6px',
            textShadow: '0 0 30px rgba(230,57,70,0.15)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {stat.value}
          </div>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            color: '#e63946',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2px',
          }}>
            {stat.label}
          </div>
          <div style={{ fontSize: '0.55rem', color: '#555' }}>
            {stat.sublabel}
          </div>
        </div>
      ))}
    </div>
  );
}
