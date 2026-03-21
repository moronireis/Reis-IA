import { useState } from 'react';

interface SectionBlock {
  name: string;
  surface: 0 | 1 | 2 | 3;
  height: string;
  accent?: boolean;
  children?: string;
}

interface TemplatePreviewProps {
  label: string;
  description: string;
  sections: SectionBlock[];
  breakpoints?: { label: string; width: number }[];
}

const defaultBreakpoints = [
  { label: 'Mobile', width: 320 },
  { label: 'Tablet', width: 768 },
  { label: 'Desktop', width: 1200 },
];

/**
 * TemplatePreview — Interactive mini-preview of a page template.
 * Shows scaled-down representation of section layout with breakpoint toggle.
 */
export default function TemplatePreview({
  label,
  description,
  sections,
  breakpoints = defaultBreakpoints,
}: TemplatePreviewProps) {
  const [activeBreakpoint, setActiveBreakpoint] = useState(2);

  const surfaceColors: Record<number, string> = {
    0: 'var(--surface-0)',
    1: 'var(--surface-1)',
    2: 'var(--surface-2)',
    3: 'var(--surface-3)',
  };

  return (
    <div
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'var(--surface-1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--surface-2)',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.04em',
              color: 'var(--accent-blue)',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              marginTop: '2px',
            }}
          >
            {description}
          </div>
        </div>

        {/* Breakpoint toggle */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {breakpoints.map((bp, i) => (
            <button
              key={bp.label}
              onClick={() => setActiveBreakpoint(i)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontWeight: 600,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.03em',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background:
                  activeBreakpoint === i
                    ? 'var(--accent-10)'
                    : 'transparent',
                color:
                  activeBreakpoint === i
                    ? 'var(--accent-blue)'
                    : 'var(--text-quaternary)',
                transition: 'all 200ms',
              }}
              aria-label={`Preview at ${bp.label} (${bp.width}px)`}
            >
              {bp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 16px',
          background: 'var(--surface-0)',
          minHeight: '300px',
        }}
      >
        <div
          style={{
            width: `${Math.min(breakpoints[activeBreakpoint].width / 12, 100)}%`,
            minWidth: '200px',
            maxWidth: `${breakpoints[activeBreakpoint].width}px`,
            border: '1px solid var(--border-visible)',
            borderRadius: '6px',
            overflow: 'hidden',
            transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Mini header */}
          <div
            style={{
              height: '24px',
              background: 'var(--surface-1)',
              borderBottom: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: '4px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-blue)',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--border-visible)',
              }}
            />
            <div style={{ flex: 1 }} />
            <div
              style={{
                width: '20px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--border-subtle)',
              }}
            />
            <div
              style={{
                width: '20px',
                height: '4px',
                borderRadius: '2px',
                background: 'var(--border-subtle)',
              }}
            />
          </div>

          {/* Section blocks */}
          {sections.map((section, i) => (
            <div
              key={i}
              style={{
                background: surfaceColors[section.surface],
                height: section.height,
                borderBottom:
                  i < sections.length - 1
                    ? '1px solid var(--border-default)'
                    : undefined,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 12px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {section.accent && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'radial-gradient(ellipse at center, rgba(74,144,255,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <div
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  fontSize: '9px',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.06em',
                  color: section.accent
                    ? 'var(--accent-blue)'
                    : 'var(--text-quaternary)',
                  textAlign: 'center',
                }}
              >
                {section.name}
              </div>
              {section.children && (
                <div
                  style={{
                    fontSize: '8px',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                    textAlign: 'center',
                  }}
                >
                  {section.children}
                </div>
              )}
            </div>
          ))}

          {/* Mini footer */}
          <div
            style={{
              height: '20px',
              background: 'var(--surface-1)',
              borderTop: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '3px',
                borderRadius: '2px',
                background: 'var(--border-subtle)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Width indicator */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--surface-2)',
          textAlign: 'center',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: '11px',
          color: 'var(--text-quaternary)',
        }}
      >
        {breakpoints[activeBreakpoint].width}px viewport
      </div>
    </div>
  );
}
