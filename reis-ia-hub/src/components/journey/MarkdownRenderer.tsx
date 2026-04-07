import React from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string;
  accentColor: string;
}

type Block =
  | { type: 'code'; language: string; code: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'hr' }
  | { type: 'paragraph'; text: string };

// ── Inline Formatting ─────────────────────────────────────────────────────────

function parseInline(text: string, accentColor: string): React.ReactNode[] {
  // Process bold and inline code patterns
  const parts: React.ReactNode[] = [];
  // Combined regex: **bold** or `code`
  const pattern = /(\*\*(.+?)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[0].startsWith('**')) {
      // Bold
      parts.push(
        <span
          key={match.index}
          style={{ color: accentColor, fontWeight: 600 }}
        >
          {match[2]}
        </span>
      );
    } else {
      // Inline code
      parts.push(
        <span
          key={match.index}
          style={{
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.20)',
            borderRadius: '4px',
            padding: '1px 7px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#8B5CF6',
          }}
        >
          {match[3]}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

// ── Parser ────────────────────────────────────────────────────────────────────

function parseContent(content: string): Block[] {
  const blocks: Block[] = [];

  // First: extract code blocks (they can span multiple \n\n)
  const codeBlockRegex = /^```(\w*)\n([\s\S]*?)^```/gm;
  const segments: Array<{ isCode: boolean; text: string; language?: string; code?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ isCode: false, text: content.slice(lastIndex, match.index) });
    }
    segments.push({ isCode: true, text: match[0], language: match[1], code: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ isCode: false, text: content.slice(lastIndex) });
  }

  for (const segment of segments) {
    if (segment.isCode) {
      blocks.push({ type: 'code', language: segment.language || '', code: segment.code || '' });
      continue;
    }

    // Split non-code segments by double newlines
    const rawBlocks = segment.text.split(/\n\n+/);

    for (const raw of rawBlocks) {
      const trimmed = raw.trim();
      if (!trimmed) continue;

      // Horizontal rule
      if (/^---+$/.test(trimmed)) {
        blocks.push({ type: 'hr' });
        continue;
      }

      // H2 heading
      if (/^## /.test(trimmed)) {
        blocks.push({ type: 'h2', text: trimmed.replace(/^## /, '') });
        continue;
      }

      // H3 heading
      if (/^### /.test(trimmed)) {
        blocks.push({ type: 'h3', text: trimmed.replace(/^### /, '') });
        continue;
      }

      // Blockquote — one or more lines starting with >
      if (/^> /.test(trimmed)) {
        const lines = trimmed
          .split('\n')
          .filter((l) => /^> /.test(l))
          .map((l) => l.replace(/^> /, ''));
        blocks.push({ type: 'blockquote', lines });
        continue;
      }

      // Numbered list — lines starting with digit+dot
      if (/^\d+\. /.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^\d+\. /.test(l))
          .map((l) => l.replace(/^\d+\. /, ''));
        blocks.push({ type: 'ol', items });
        continue;
      }

      // Bullet list — lines starting with - or *
      if (/^[*-] /.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .filter((l) => /^[*-] /.test(l))
          .map((l) => l.replace(/^[*-] /, ''));
        blocks.push({ type: 'ul', items });
        continue;
      }

      // Default: paragraph
      blocks.push({ type: 'paragraph', text: trimmed });
    }
  }

  return blocks;
}

// ── Block Renderers ───────────────────────────────────────────────────────────

function renderBlock(block: Block, index: number, accentColor: string): React.ReactElement {
  switch (block.type) {
    case 'code':
      return (
        <pre
          key={index}
          style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '16px 18px',
            fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
            fontSize: '13px',
            color: 'rgba(255,255,255,0.80)',
            overflowX: 'auto',
            whiteSpace: 'pre',
            marginBottom: '16px',
          }}
        >
          {block.code}
        </pre>
      );

    case 'h2':
      return (
        <h2
          key={index}
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginTop: '28px',
            marginBottom: '12px',
            paddingLeft: '14px',
            borderLeft: `3px solid ${accentColor}`,
            lineHeight: 1.4,
          }}
        >
          {parseInline(block.text, accentColor)}
        </h2>
      );

    case 'h3':
      return (
        <h3
          key={index}
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            marginTop: '20px',
            marginBottom: '8px',
            lineHeight: 1.4,
          }}
        >
          {parseInline(block.text, accentColor)}
        </h3>
      );

    case 'blockquote':
      return (
        <blockquote
          key={index}
          style={{
            background: `${accentColor}08`,
            borderLeft: `3px solid ${accentColor}`,
            borderRadius: '0 8px 8px 0',
            padding: '14px 16px',
            marginBottom: '16px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '14px',
            lineHeight: '1.7',
            margin: '0 0 16px 0',
          }}
        >
          {block.lines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {parseInline(line, accentColor)}
            </span>
          ))}
        </blockquote>
      );

    case 'ol':
      return (
        <div key={index} style={{ marginBottom: '12px' }}>
          {block.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  borderRadius: '50%',
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}35`,
                  color: accentColor,
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.70)',
                }}
              >
                {parseInline(item, accentColor)}
              </span>
            </div>
          ))}
        </div>
      );

    case 'ul':
      return (
        <div key={index} style={{ marginBottom: '12px' }}>
          {block.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                marginBottom: '6px',
                paddingLeft: '4px',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  minWidth: '5px',
                  borderRadius: '50%',
                  background: accentColor,
                  marginTop: '8px',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                {parseInline(item, accentColor)}
              </span>
            </div>
          ))}
        </div>
      );

    case 'hr':
      return (
        <hr
          key={index}
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            margin: '24px 0',
            border: 'none',
          }}
        />
      );

    case 'paragraph':
    default:
      return (
        <p
          key={index}
          style={{
            fontSize: '14px',
            lineHeight: '1.75',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '14px',
            margin: '0 0 14px 0',
          }}
        >
          {parseInline(block.text, accentColor)}
        </p>
      );
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MarkdownRenderer({ content, accentColor }: MarkdownRendererProps): React.ReactElement {
  if (!content) {
    return <div />;
  }

  const blocks = parseContent(content);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {blocks.map((block, index) => renderBlock(block, index, accentColor))}
    </div>
  );
}
