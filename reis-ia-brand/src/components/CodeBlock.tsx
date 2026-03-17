import { useState, useCallback } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

/**
 * CodeBlock — React island with syntax-highlighted code and copy button.
 * Displays code in a styled pre/code block with one-click copy.
 */
export default function CodeBlock({ code, language = 'css', label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--surface-2)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em',
            color: 'var(--text-quaternary)',
          }}
        >
          {label || language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: '11px',
            color: copied ? 'var(--color-success)' : 'var(--text-quaternary)',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'color 200ms',
          }}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          background: 'var(--surface-1)',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: 1.6,
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          color: 'var(--text-secondary)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
