import { useState } from 'react';
import type { Contact } from '../../lib/types';
import { formatTime, formatPhone } from '../../lib/utils';

interface ContactListProps {
  contacts: Contact[];
  allContacts: Contact[];
  loadingAll: boolean;
  hasMoreAll: boolean;
  onLoadMoreAll: () => void;
  selectedId: string | null;
  onSelect: (contact: Contact) => void;
  onRefresh: () => void;
}

function avatarColor(phone: string): string {
  const colors = ['#2D6A4F','#1B4332','#40916C','#52796F','#354F52','#2F3E46','#3A5A40','#588157'];
  let hash = 0;
  for (let i = 0; i < phone.length; i++) hash = (hash * 31 + phone.charCodeAt(i)) >>> 0;
  return colors[hash % colors.length];
}

export function ContactList({
  contacts, allContacts, loadingAll, hasMoreAll, onLoadMoreAll,
  selectedId, onSelect, onRefresh,
}: ContactListProps) {
  const [tab, setTab] = useState<'conversations' | 'all'>('conversations');
  const [search, setSearch] = useState('');

  const filterBySearch = (list: Contact[]) => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.push_name || '').toLowerCase().includes(q) ||
      (c.phone || '').includes(q)
    );
  };

  const convos = filterBySearch(contacts);
  const allFiltered = filterBySearch(allContacts);
  const displayList = tab === 'conversations' ? convos : allFiltered;

  return (
    <div style={{ width: 300, borderRight: '1px solid var(--gold-dim)', display: 'flex', flexDirection: 'column', background: '#162019', flexShrink: 0, height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '0.75rem 1rem 0', borderBottom: '1px solid var(--gold-dim)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: 'var(--gold)', fontWeight: 300, letterSpacing: '0.04em' }}>
            Castelo dos Lagos
          </span>
          <button onClick={onRefresh} title="Atualizar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream-dim)', padding: 0 }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{
            width: '100%', background: 'var(--forest-deep)', border: '1px solid var(--gold-dim)',
            color: 'var(--cream)', padding: '0.4rem 0.6rem', fontSize: '0.8rem',
            fontFamily: 'Inter, sans-serif', outline: 'none', marginBottom: '0.6rem',
            boxSizing: 'border-box',
          }}
        />
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: '-1px' }}>
          {(['conversations', 'all'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, background: 'none', border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--gold)' : 'transparent'}`,
                color: tab === t ? 'var(--gold)' : 'var(--cream-dim)', cursor: 'pointer',
                fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '0.4rem 0', fontFamily: 'Inter, sans-serif', fontWeight: 500,
              }}
            >
              {t === 'conversations' ? `Conversas ${contacts.length > 0 ? `(${contacts.length})` : ''}` : `Todos (${allContacts.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {displayList.length === 0 && (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--cream-dim)', fontSize: '0.8rem' }}>
            {tab === 'conversations' ? 'Nenhuma conversa ainda.\nAguardando mensagens.' : 'Nenhum contato encontrado.'}
          </div>
        )}
        {displayList.map(contact => {
          const isSelected = contact.id === selectedId;
          const label = contact.name || contact.push_name || formatPhone(contact.phone);
          const initial = label.trim().slice(0, 1).toUpperCase();
          const bg = avatarColor(contact.phone);
          const badge = contact.instance_id === 'castelo1' ? '1' : '2';
          const hasUnread = (contact.unread_count || 0) > 0;

          return (
            <div
              key={contact.id}
              onClick={() => onSelect(contact)}
              style={{
                padding: '0.6rem 1rem', cursor: 'pointer', display: 'flex', gap: '0.65rem',
                alignItems: 'center', borderBottom: '1px solid rgba(244,239,230,0.04)',
                background: isSelected ? 'rgba(201,169,110,0.1)' : 'transparent',
                borderLeft: isSelected ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'background 0.1s',
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 40, height: 40, background: bg, borderRadius: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {contact.photo_url
                    ? <img src={contact.photo_url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    : <span style={{ color: 'rgba(244,239,230,0.9)', fontSize: '0.9rem', fontWeight: 600 }}>{initial}</span>
                  }
                </div>
                <span style={{
                  position: 'absolute', bottom: -2, right: -2,
                  background: 'var(--gold)', color: 'var(--forest-deep)',
                  fontSize: '0.5rem', width: 13, height: 13,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                }}>{badge}</span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 4 }}>
                  <span style={{
                    fontSize: '0.83rem', fontWeight: hasUnread ? 600 : 400,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    color: 'var(--cream)',
                    flex: 1,
                  }}>
                    {label}
                  </span>
                  {contact.last_message_at && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--cream-dim)', flexShrink: 0 }}>
                      {formatTime(contact.last_message_at)}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                  <span style={{ fontSize: '0.73rem', color: 'var(--cream-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {contact.last_message_preview || (tab === 'all' && !contact.last_message_at ? formatPhone(contact.phone) : '')}
                  </span>
                  {hasUnread && (
                    <span style={{
                      background: 'var(--gold)', color: 'var(--forest-deep)', borderRadius: '50%',
                      width: 17, height: 17, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.6rem', fontWeight: 700, flexShrink: 0, marginLeft: 4,
                    }}>
                      {(contact.unread_count || 0) > 9 ? '9+' : contact.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Load more (tab Todos) */}
        {tab === 'all' && hasMoreAll && !search && (
          <button
            onClick={onLoadMoreAll}
            disabled={loadingAll}
            style={{
              width: '100%', background: 'transparent', border: 'none',
              borderTop: '1px solid var(--gold-dim)', color: 'var(--gold)',
              padding: '0.75rem', cursor: loadingAll ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {loadingAll ? 'Carregando...' : 'Carregar mais'}
          </button>
        )}
      </div>
    </div>
  );
}
