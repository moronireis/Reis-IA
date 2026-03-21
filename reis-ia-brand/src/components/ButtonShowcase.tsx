import { useState } from 'react';

/**
 * ButtonShowcase — Interactive button demo showing all variants and states.
 * Renders each variant in a hairline grid with live hover/focus/active/disabled states.
 * Users can interact with the buttons to see real CSS transitions.
 */

const variants = ['primary', 'hero', 'secondary', 'ghost', 'link'] as const;
type Variant = typeof variants[number];

export default function ButtonShowcase() {
  const [activeVariant, setActiveVariant] = useState<Variant>('primary');

  return (
    <div>
      {/* Variant selector tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: '1px solid var(--border-default)', overflowX: 'auto' }}>
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVariant(v)}
            style={{
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: activeVariant === v ? 600 : 500,
              color: activeVariant === v ? 'var(--text-primary)' : 'var(--text-tertiary)',
              background: 'transparent',
              border: 'none',
              borderBottom: activeVariant === v ? '2px solid var(--accent-blue)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'color 200ms, border-color 200ms',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize' as const,
              fontFamily: 'inherit',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {activeVariant === 'primary' && <PrimaryPanel />}
      {activeVariant === 'hero' && <HeroPanel />}
      {activeVariant === 'secondary' && <SecondaryPanel />}
      {activeVariant === 'ghost' && <GhostPanel />}
      {activeVariant === 'link' && <LinkPanel />}
    </div>
  );
}

/* ==========================================================================
   PRIMARY PANEL
   ========================================================================== */

function PrimaryPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Static states in hairline grid */}
      <div>
        <div style={sectionLabelStyle}>All States</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Default', style: primaryStyle, extra: {} },
            { label: 'Hover', style: primaryStyle, extra: { background: 'var(--accent-blue-hover)', transform: 'translateY(-2px)' } },
            { label: 'Active', style: primaryStyle, extra: { background: 'var(--accent-blue-muted)', transform: 'translateY(0)' } },
            { label: 'Focused', style: primaryStyle, extra: { outline: '2px solid #4D65FF', outlineOffset: '2px' } },
            { label: 'Disabled', style: primaryStyle, extra: { opacity: 0.5, cursor: 'not-allowed' } },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-0)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={cellLabelStyle}>{item.label}</span>
              <button style={{ ...item.style, ...item.extra }} disabled={item.label === 'Disabled'}>
                Book a Call
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive */}
      <div>
        <div style={sectionLabelStyle}>Interactive -- hover, click, and tab to see real states</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <PrimaryButton>Agendar Reuniao</PrimaryButton>
          <PrimaryButton>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
            With Left Icon
          </PrimaryButton>
          <PrimaryButton>
            Get Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </PrimaryButton>
        </div>
      </div>

      {/* As link */}
      <div>
        <div style={sectionLabelStyle}>Button as &lt;a&gt; tag</div>
        <a
          href="/agendar"
          style={{ ...primaryStyle, textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-blue-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Agendar Reuniao
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   HERO PANEL
   ========================================================================== */

function HeroPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <div style={sectionLabelStyle}>All States</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: 'var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Default', extra: {} },
            { label: 'Hover', extra: { background: 'var(--accent-blue-hover)', transform: 'translateY(-2px)' } },
            { label: 'Disabled', extra: { opacity: 0.5, cursor: 'not-allowed' } },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-0)', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={cellLabelStyle}>{item.label}</span>
              <button style={{ ...heroStyle, ...item.extra }} disabled={item.label === 'Disabled'}>
                Book a Strategy Call
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Interactive</div>
        <HeroButton>Aplicar Agora</HeroButton>
      </div>
    </div>
  );
}

/* ==========================================================================
   SECONDARY PANEL
   ========================================================================== */

function SecondaryPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <div style={sectionLabelStyle}>All States</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Default', extra: {} },
            { label: 'Hover', extra: { borderColor: 'var(--border-strong)', background: 'rgba(255,255,255,0.03)' } },
            { label: 'Focused', extra: { outline: '2px solid #4D65FF', outlineOffset: '2px' } },
            { label: 'Disabled', extra: { opacity: 0.5, cursor: 'not-allowed' } },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-0)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={cellLabelStyle}>{item.label}</span>
              <button style={{ ...secondaryStyle, ...item.extra }} disabled={item.label === 'Disabled'}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Interactive</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <SecondaryButton>View Details</SecondaryButton>
          <SecondaryButton>Cancel</SecondaryButton>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   GHOST PANEL
   ========================================================================== */

function GhostPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <div style={sectionLabelStyle}>All States</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Default', color: 'var(--text-secondary)', arrowX: '0' },
            { label: 'Hover', color: 'var(--text-primary)', arrowX: '4px' },
            { label: 'Disabled', color: 'var(--text-quaternary)', arrowX: '0' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-0)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={cellLabelStyle}>{item.label}</span>
              <span style={{ ...ghostStyle, color: item.color }}>
                Read more
                <span style={{ marginLeft: '4px', display: 'inline-block', transform: `translateX(${item.arrowX})`, transition: 'transform 200ms' }}>&rarr;</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Interactive</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          <GhostButton>View case study</GhostButton>
          <GhostButton>See all services</GhostButton>
          <GhostButton>Learn more</GhostButton>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   LINK PANEL
   ========================================================================== */

function LinkPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <div style={sectionLabelStyle}>All States</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--border-default)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--border-default)',
        }}>
          {[
            { label: 'Default', color: 'var(--accent-blue)', decoration: 'none' },
            { label: 'Hover', color: 'var(--accent-blue-hover)', decoration: 'underline' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--surface-0)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={cellLabelStyle}>{item.label}</span>
              <span style={{ color: item.color, textDecoration: item.decoration, textUnderlineOffset: '3px', textDecorationThickness: '1px', fontSize: '16px', cursor: 'pointer' }}>
                Inline link
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div style={sectionLabelStyle}>Interactive — inline within body text</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.65, maxWidth: '680px' }}>
          Reis IA helps businesses implement AI systems that multiply revenue.{' '}
          <LinkButton>Learn about our methodology</LinkButton>{' '}
          or{' '}
          <LinkButton>schedule a strategy call</LinkButton>{' '}
          to discuss your project.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   SHARED STYLES
   ========================================================================== */

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
  minWidth: '240px',
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

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--text-quaternary)',
  marginBottom: '16px',
};

const cellLabelStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '10px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--text-muted)',
};

/* ==========================================================================
   INTERACTIVE SUB-COMPONENTS
   ========================================================================== */

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={primaryStyle}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-blue-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseDown={(e) => { e.currentTarget.style.background = 'var(--accent-blue-muted)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseUp={(e) => { e.currentTarget.style.background = 'var(--accent-blue-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    >
      {children}
    </button>
  );
}

function HeroButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={heroStyle}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-blue-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={secondaryStyle}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-visible)'; e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{ ...ghostStyle, color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)' }}
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
