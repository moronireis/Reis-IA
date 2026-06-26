import type { Message } from '../../lib/types';
import { AudioPlayer } from './AudioPlayer';
import { formatTime } from '../../lib/utils';

export function MessageBubble({ message }: { message: Message }) {
  const outbound = message.direction === 'outbound';
  const meta = (message.metadata || {}) as Record<string, string>;
  const senderName = meta.sender_name;

  const bubbleStyle: React.CSSProperties = {
    maxWidth: '70%',
    padding: '0.5rem 0.75rem',
    background: outbound ? '#2F4A3A' : 'rgba(201,169,110,0.08)',
    border: outbound ? '1px solid rgba(201,169,110,0.25)' : '1px solid rgba(244,239,230,0.1)',
    alignSelf: outbound ? 'flex-end' : 'flex-start',
    borderRadius: 2,
  };

  const renderContent = () => {
    if (message.content_type === 'image') {
      return (
        <div>
          {message.media_url
            ? <img src={message.media_url} alt="Imagem" style={{ maxWidth: '100%', display: 'block', borderRadius: 1 }} />
            : <span style={{ color: 'rgba(244,239,230,0.6)', fontSize: '0.8rem' }}>[Imagem indisponível]</span>
          }
          {message.body && <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{message.body}</p>}
        </div>
      );
    }
    if (message.content_type === 'audio') {
      return <AudioPlayer src={message.media_url} mime={message.media_mime} />;
    }
    if (message.content_type === 'video') {
      return message.media_url
        ? <video controls src={message.media_url} style={{ maxWidth: '100%', borderRadius: 1 }} />
        : <span style={{ color: 'rgba(244,239,230,0.6)', fontSize: '0.8rem' }}>[Vídeo indisponível]</span>;
    }
    if (message.content_type === 'document') {
      return (
        <a
          href={message.media_url || '#'}
          target="_blank"
          rel="noreferrer"
          style={{ color: '#C9A96E', fontSize: '0.85rem', textDecoration: 'underline' }}
        >
          Documento — {message.body || 'Abrir'}
        </a>
      );
    }
    if (message.content_type === 'sticker') {
      return message.media_url
        ? <img src={message.media_url} alt="Sticker" style={{ maxWidth: 120, display: 'block' }} />
        : null;
    }
    return <p style={{ fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{message.body}</p>;
  };

  return (
    <div style={{ display: 'flex', justifyContent: outbound ? 'flex-end' : 'flex-start' }}>
      <div style={bubbleStyle}>
        {!outbound && senderName && (
          <div style={{ fontSize: '0.72rem', color: '#C9A96E', marginBottom: '0.2rem', fontWeight: 500 }}>
            {senderName}
          </div>
        )}
        {renderContent()}
        <div style={{ fontSize: '0.68rem', color: 'rgba(244,239,230,0.6)', textAlign: 'right', marginTop: '0.25rem' }}>
          {formatTime(message.created_at)}
          {outbound && <span style={{ marginLeft: '0.3rem' }}>&#10003;</span>}
        </div>
      </div>
    </div>
  );
}
