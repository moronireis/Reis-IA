import { useState } from 'react';

/**
 * FormDemo — Interactive form component showcasing all input states.
 * Renders working form inputs with focus, validation, and disabled states.
 */
export default function FormDemo() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (field: string, value: string) => {
    switch (field) {
      case 'name': return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email': return !value.includes('@') ? 'Please enter a valid email' : '';
      case 'message': return value.length > 0 && value.length < 10 ? 'Message must be at least 10 characters' : '';
      default: return '';
    }
  };

  const getError = (field: string) => {
    if (!touched[field]) return '';
    return validate(field, formState[field as keyof typeof formState]);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, company: true, message: true, budget: true });
    const hasErrors = ['name', 'email'].some((f) => validate(f, formState[f as keyof typeof formState]));
    if (!hasErrors) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div>
      {/* Section 1: All input states */}
      <div style={{ marginBottom: '48px' }}>
        <div style={labelStyle}>Input States</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Default */}
          <div>
            <label style={fieldLabelStyle}>Default</label>
            <input
              type="text"
              placeholder="Enter your name..."
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <span style={helperStyle}>Standard text input</span>
          </div>

          {/* Hover */}
          <div>
            <label style={fieldLabelStyle}>Hover State</label>
            <input
              type="text"
              placeholder="Hover to see..."
              style={{ ...inputStyle, borderColor: 'var(--border-visible)' }}
              readOnly
            />
            <span style={helperStyle}>Border brightens on hover</span>
          </div>

          {/* Focus */}
          <div>
            <label style={fieldLabelStyle}>Focus State</label>
            <input
              type="text"
              placeholder="Click to focus..."
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <span style={helperStyle}>Blue border + glow ring on focus</span>
          </div>

          {/* Error */}
          <div>
            <label style={fieldLabelStyle}>Error State</label>
            <input
              type="text"
              value="bad@"
              style={{ ...inputStyle, borderColor: 'var(--color-error)', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' }}
              readOnly
            />
            <span style={{ ...helperStyle, color: 'var(--color-error)' }}>Please enter a valid email</span>
          </div>

          {/* Success */}
          <div>
            <label style={fieldLabelStyle}>Success State</label>
            <input
              type="text"
              value="moroni@reis.ia"
              style={{ ...inputStyle, borderColor: 'var(--color-success)' }}
              readOnly
            />
            <span style={{ ...helperStyle, color: 'var(--color-success)' }}>Email verified</span>
          </div>

          {/* Disabled */}
          <div>
            <label style={fieldLabelStyle}>Disabled</label>
            <input
              type="text"
              value="Not editable"
              style={{ ...inputStyle, background: 'var(--surface-2)', borderColor: 'var(--border-subtle)', color: 'var(--text-quaternary)', cursor: 'not-allowed', opacity: 0.7 }}
              disabled
            />
            <span style={helperStyle}>Non-interactive state</span>
          </div>
        </div>
      </div>

      {/* Section 2: Other input types */}
      <div style={{ marginBottom: '48px' }}>
        <div style={labelStyle}>Input Types</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Textarea */}
          <div>
            <label style={fieldLabelStyle}>Textarea</label>
            <textarea
              placeholder="Tell us about your project..."
              style={{ ...inputStyle, height: 'auto', minHeight: '120px', resize: 'vertical' as const }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Select */}
          <div>
            <label style={fieldLabelStyle}>Select Dropdown</label>
            <select
              style={{
                ...inputStyle,
                appearance: 'none',
                paddingRight: '40px',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-blue)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="">Select budget range...</option>
              <option value="10k">R$ 10,000 - R$ 25,000</option>
              <option value="25k">R$ 25,000 - R$ 50,000</option>
              <option value="50k">R$ 50,000 - R$ 100,000</option>
              <option value="100k">R$ 100,000+</option>
            </select>
          </div>

          {/* Input with icon */}
          <div>
            <label style={fieldLabelStyle}>Input with Icon</label>
            <div style={{ position: 'relative' }}>
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="var(--text-quaternary)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                style={{ ...inputStyle, paddingLeft: '48px' }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Interactive form */}
      <div>
        <div style={labelStyle}>Interactive Form — Try It</div>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name */}
            <div>
              <label style={fieldLabelStyle}>Name *</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formState.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                style={{
                  ...inputStyle,
                  ...(getError('name') ? { borderColor: 'var(--color-error)', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' } : {}),
                }}
                onFocus={(e) => {
                  if (!getError('name')) {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
                  }
                }}
              />
              {getError('name') && <span style={{ ...helperStyle, color: 'var(--color-error)' }}>{getError('name')}</span>}
            </div>

            {/* Email */}
            <div>
              <label style={fieldLabelStyle}>Email *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formState.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                style={{
                  ...inputStyle,
                  ...(getError('email') ? { borderColor: 'var(--color-error)', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' } : {}),
                }}
                onFocus={(e) => {
                  if (!getError('email')) {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
                  }
                }}
              />
              {getError('email') && <span style={{ ...helperStyle, color: 'var(--color-error)' }}>{getError('email')}</span>}
            </div>

            {/* Message */}
            <div>
              <label style={fieldLabelStyle}>Message</label>
              <textarea
                placeholder="Tell us about your AI implementation goals..."
                value={formState.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                rows={4}
                style={{
                  ...inputStyle, height: 'auto', minHeight: '120px', resize: 'vertical' as const,
                  ...(getError('message') ? { borderColor: 'var(--color-error)', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' } : {}),
                }}
                onFocus={(e) => {
                  if (!getError('message')) {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74, 144, 255, 0.15)';
                  }
                }}
              />
              {getError('message') && <span style={{ ...helperStyle, color: 'var(--color-error)' }}>{getError('message')}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: submitted ? 'var(--color-success)' : 'var(--accent-blue)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '13px 32px 15px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms',
                fontFamily: 'inherit',
                width: 'fit-content',
              }}
            >
              {submitted ? 'Sent!' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: '48px',
  padding: '12px 16px',
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: 1.5,
  color: 'var(--text-primary)',
  background: 'var(--surface-3)',
  border: '1px solid var(--border-default)',
  borderRadius: '8px',
  transition: 'border-color 200ms, box-shadow 200ms',
  outline: 'none',
  boxSizing: 'border-box' as const,
};

const fieldLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: '8px',
};

const helperStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  color: 'var(--text-tertiary)',
  marginTop: '6px',
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
