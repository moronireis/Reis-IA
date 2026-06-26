import { useState, useRef, useEffect } from 'react';
import type { Template } from '../../lib/types';

interface MessageInputProps {
  contactId: string;
  onMessageSent: () => void;
}

export function MessageInput({ contactId, onMessageSent }: MessageInputProps) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateFilter, setTemplateFilter] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch('/api/templates')
      .then(r => r.json())
      .then((data: Template[]) => setTemplates(data))
      .catch(() => {});
  }, []);

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(templateFilter.toLowerCase()) ||
    (t.shortcut || '').includes(templateFilter)
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (val.startsWith('/')) {
      setTemplateFilter(val.slice(1));
      setShowTemplates(true);
    } else {
      setShowTemplates(false);
    }
  };

  const applyTemplate = (t: Template) => {
    setText(t.body);
    setShowTemplates(false);
    textareaRef.current?.focus();
  };

  const send = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_id: contactId, text: text.trim() }),
      });
      setText('');
      onMessageSent();
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
    if (e.key === 'Escape') setShowTemplates(false);
  };

  const disabled = sending || !text.trim();

  return (
    <div style={{ position: 'relative', borderTop: '1px solid rgba(201,169,110,0.25)', padding: '0.75rem 1rem', background: '#162019' }}>
      {showTemplates && filteredTemplates.length > 0 && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 0, right: 0,
          background: '#2F4A3A', border: '1px solid rgba(201,169,110,0.25)',
          maxHeight: 200, overflowY: 'auto', zIndex: 10,
        }}>
          {filteredTemplates.map(t => (
            <div
              key={t.id}
              onClick={() => applyTemplate(t)}
              style={{
                padding: '0.6rem 1rem', cursor: 'pointer',
                borderBottom: '1px solid rgba(244,239,230,0.05)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,169,110,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <div style={{ fontSize: '0.8rem', color: '#C9A96E' }}>{t.shortcut || t.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(244,239,230,0.6)', marginTop: 2 }}>
                {t.body.slice(0, 60)}{t.body.length > 60 ? '...' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          placeholder="Mensagem... (/ para templates)"
          rows={1}
          style={{
            flex: 1,
            background: '#1E2E24',
            border: '1px solid rgba(201,169,110,0.25)',
            color: '#F4EFE6',
            padding: '0.6rem 0.75rem',
            resize: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            outline: 'none',
            maxHeight: 120,
            overflowY: 'auto',
          }}
        />
        <button
          onClick={send}
          disabled={disabled}
          style={{
            background: disabled ? 'rgba(201,169,110,0.3)' : '#C9A96E',
            border: 'none',
            color: '#1E2E24',
            padding: '0.6rem 1rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          {sending ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
