import { useEffect, useRef } from 'react';
import type { Message } from '../../lib/types';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface MessageThreadProps {
  messages: Message[];
  contactId: string;
  onSent: () => void;
}

export function MessageThread({ messages, contactId, onSent }: MessageThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{
        flex: 1, overflowY: 'auto', padding: '1rem',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center', color: 'rgba(244,239,230,0.6)',
            fontSize: '0.85rem', marginTop: '2rem',
          }}>
            Nenhuma mensagem ainda
          </div>
        )}
        {messages.map(m => <MessageBubble key={m.id} message={m} />)}
        <div ref={bottomRef} />
      </div>
      <MessageInput contactId={contactId} onMessageSent={onSent} />
    </div>
  );
}
