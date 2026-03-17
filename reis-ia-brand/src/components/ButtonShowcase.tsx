import { useState } from 'react';

/**
 * ButtonShowcase — Interactive button demo showing all states.
 * Renders a grid of button variants with live hover/focus/active/disabled states.
 */
export default function ButtonShowcase() {
  const [activeVariant, setActiveVariant] = useState<string>('primary');

  const variants = [
    { id: 'primary', label: 'Primary' },
    { id: 'hero', label: 'Hero' },
    { id: 'secondary', label: 'Secondary' },
    { id: 'ghost', label: 'Ghost' },
    { id: 'link', label: 'Link' },
  ];

  return (
    <div>
      {/* Variant selector */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-default)',
          overflowX: 'auto',
        }}
      >
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVariant(v.id)}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: activeVariant === v.id ? 600 : 500,
              color: activeVariant === v.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
              background: 'transparent',
              border: 'none',
              borderBottom: activeVariant === v.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 200ms, border-color 200ms',
              whiteSpace: 'nowrap',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Primary buttons */}
      {activeVariant === 'primary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)', marginBottom: '16px' }}>
              States
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button style={primaryStyle}>Book a Call</button>
              <button style={{ ...primaryStyle, background: 'var(--accent-blue-hover)', transform: 'translateY(-2px)' }}>Hover</button>
              <button style={{ ...primaryStyle, background: 'var(--accent-blue-muted)', transform: 'translateY(0)' }}>Active</button>
              <button style={{ ...primaryStyle, outline: '2px solid #4D65FF', outlineOffset: '2px' }}>Focused</button>
              <button style={{ ...primaryStyle, opacity: 0.5, cursor: 'not-allowed' }} disabled>Disabled</button>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: 'var(--text-quaternary)', marginBottom: '16px' }}>
              Interactive — hover, click, and tab to see real states
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <PrimaryButton>Agendar Reuniao</PrimaryButton>
              <PrimaryButton>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
                With Icon
              </PrimaryButton>
              <PrimaryButton>
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* Hero variant */}
      {activeVariant === 'hero' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={labelStyle}>States</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button style={heroStyle}>Book a Strategy Call</button>
              <button style={{ ...heroStyle, background: 'var(--accent-blue-hover)', transform: 'translateY(-2px)' }}>Hover</button>
              <button style={{ ...heroStyle, opacity: 0.5, cursor: 'not-allowed' }} disabled>Disabled</button>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Interactive</div>
            <HeroButton>Aplicar Agora</HeroButton>
          </div>
        </div>
      )}

      {/* Secondary buttons */}
      {activeVariant === 'secondary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={labelStyle}>States</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <button style={secondaryStyle}>Learn More</button>
              <button style={{ ...secondaryStyle, borderColor: 'var(--border-strong)', background: 'rgba(255,255,255,0.03)' }}>Hover</button>
              <button style={{ ...secondaryStyle, outline: '2px solid #4D65FF', outlineOffset: '2px' }}>Focused</button>
              <button style={{ ...secondaryStyle, opacity: 0.5, cursor: 'not-allowed' }} disabled>Disabled</button>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Interactive</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <SecondaryButton>View Details</SecondaryButton>
              <SecondaryButton>Cancel</SecondaryButton>
            </div>
          </div>
        </div>
      )}

      {/* Ghost buttons */}
      {activeVariant === 'ghost' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={labelStyle}>States</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
              <span style={ghostStyle}>Read more <span style={{ marginLeft: '4px' }}>&rarr;</span></span>
              <span style={{ ...ghostStyle, color: 'var(--text-primary)' }}>Hover <span style={{ marginLeft: '8px' }}>&rarr;</span></span>
              <span style={{ ...ghostStyle, opacity: 0.5 }}>Disabled <span style={{ marginLeft: '4px' }}>&rarr;</span></span>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Interactive</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
              <GhostButton>View case study</GhostButton>
              <GhostButton>See all services</GhostButton>
            </div>
          </div>
        </div>
      )}

      {/* Link buttons */}
      {activeVariant === 'link' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={labelStyle}>States</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
              <span style={linkStyle}>Inline link</span>
              <span style={{ ...linkStyle, color: 'var(--accent-blue-hover)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationThickness: '1px' }}>Hover</span>
            </div>
          </div>
          <div>
            <div style={labelStyle}>Interactive</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.65, maxWidth: '680px' }}>
              Reis IA helps businesses implement AI systems that multiply revenue.{' '}
              <LinkButton>Learn about our methodology</LinkButton>{' '}
              or{' '}
              <LinkButton>schedule a strategy call</LinkButton>{' '}
              to discuss your project.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Shared styles --- */

const primaryStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--accent-blue)',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  padding: '13px 32px 15px',
  borderRadius: '8px',
  border: 'none',
  minWidth: '200px',
  cursor: 'pointer',
  transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  fontFamily: 'inherit',
};

const heroStyle: React.CSSProperties = {
  ...primaryStyle,
  fontSize: '18px',
  padding: '17px 40px 19px',
  borderRadius: '10px',
};

const secondaryStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  color: 'var(--text-primary)',
  fontSize: '16px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  padding: '14px 32px',
  borderRadius: '8px',
  border: '1px solid var(--border-visible)',
  cursor: 'pointer',
  transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  fontFamily: 'inherit',
};

const ghostStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'var(--text-secondary)',
  fontSize: '16px',
  fontWeight: 500,
  padding: '8px 0',
  cursor: 'pointer',
  transition: 'color 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
};

const linkStyle: React.CSSProperties = {
  color: 'var(--accent-blue)',
  fontSize: '16px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 200ms',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  color: 'var(--text-quaternary)',
  marginBottom: '16px',
};

/* --- Interactive sub-components --- */

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={primaryStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue-hover)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue-muted)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue-hover)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
      }}
    >
      {children}
    </button>
  );
}

function HeroButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={heroStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue-hover)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-blue)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={secondaryStyle}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-visible)';
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        ...ghostStyle,
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span style={{ marginLeft: '4px', display: 'inline-block', transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1)' }}>&rarr;</span>
    </span>
  );
}

function LinkButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        color: hovered ? 'var(--accent-blue-hover)' : 'var(--accent-blue)',
        textDecoration: hovered ? 'underline' : 'none',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        cursor: 'pointer',
        transition: 'color 200ms',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}
