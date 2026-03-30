import React from 'react';

interface Props {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref?: string;
  currentRole: string;
  requiredRole: string;
}

export default function UpgradeCTA({
  title,
  description,
  features,
  ctaText,
  ctaHref = '/agendar',
  currentRole,
  requiredRole,
}: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
      padding: '48px 24px',
    }}>
      {/* Lock icon */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'rgba(74,144,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{title}</h2>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: 1.6, marginBottom: '24px' }}>
        {description}
      </p>

      {/* Feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px', textAlign: 'left' }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{f}</span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <a
        href={ctaHref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 32px',
          borderRadius: '10px',
          background: '#4A90FF',
          color: '#fff',
          fontSize: '15px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        {ctaText}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>

      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>
        Seu plano atual: {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
      </p>
    </div>
  );
}
