import React, { useState, useRef, useEffect } from 'react';

interface Notification {
  id: string;
  user_id: string;
  type: 'comment' | 'reply' | 'project_update' | 'message' | 'task' | 'mentoria' | 'system';
  title: string;
  body: string;
  link: string;
  read: boolean;
  created_at: string;
}

interface NotificationBellProps {
  initialNotifications: Notification[];
  initialUnreadCount: number;
}

function getTypeColor(type: Notification['type']): string {
  switch (type) {
    case 'comment': return '#4A90FF';
    case 'reply': return '#4A90FF';
    case 'project_update': return '#F59E0B';
    case 'message': return '#8DC4FF';
    case 'task': return '#22C55E';
    case 'mentoria': return '#8B5CF6';
    case 'system': return 'rgba(255,255,255,0.35)';
    default: return 'rgba(255,255,255,0.35)';
  }
}

function TypeIcon({ type }: { type: Notification['type'] }) {
  const color = getTypeColor(type);

  if (type === 'comment' || type === 'reply') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (type === 'project_update') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    );
  }
  if (type === 'message') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  if (type === 'task') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    );
  }
  if (type === 'mentoria') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
      </svg>
    );
  }
  // system
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 604800)}sem`;
}

export default function NotificationBell({ initialNotifications, initialUnreadCount }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [open, setOpen] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Poll for new notifications every 30s
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setNotifications(data);
          setUnreadCount(data.filter((n: Notification) => !n.read).length);
        }
      } catch {}
    };

    const interval = setInterval(poll, 30000);
    return () => clearInterval(interval);
  }, []);

  async function handleMarkAllRead() {
    if (markingAll || unreadCount === 0) return;
    setMarkingAll(true);
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read_all: true }),
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (_) {
      // silent fail
    } finally {
      setMarkingAll(false);
    }
  }

  async function handleClickItem(notification: Notification) {
    if (!notification.read) {
      try {
        await fetch(`/api/notifications/${notification.id}`, { method: 'PATCH' });
        setNotifications(prev =>
          prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (_) {
        // silent fail
      }
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-tertiary)',
          position: 'relative',
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-3)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-tertiary)';
        }}
        aria-label="Notificacoes"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            minWidth: '16px',
            height: '16px',
            background: '#EF4444',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 600,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3px',
            lineHeight: 1,
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          top: '56px',
          right: '24px',
          width: '360px',
          maxHeight: '480px',
          background: '#0A0A0A',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          zIndex: 99998,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Notificacoes
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--accent-blue)',
                  background: 'transparent',
                  border: 'none',
                  cursor: markingAll ? 'not-allowed' : 'pointer',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  opacity: markingAll ? 0.5 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: 'var(--text-quaternary)',
                fontSize: 'var(--text-body-sm)',
              }}>
                Nenhuma notificacao
              </div>
            ) : (
              notifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => handleClickItem(n)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 16px',
                    background: n.read ? 'transparent' : 'var(--blue-04)',
                    border: 'none',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = n.read ? 'var(--surface-3)' : 'var(--blue-06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = n.read ? 'transparent' : 'var(--blue-04)';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: 'var(--surface-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    <TypeIcon type={n.type} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: n.read ? 400 : 500,
                        color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-quaternary)', flexShrink: 0 }}>
                        {relativeTime(n.created_at)}
                      </span>
                    </div>
                    {n.body && (
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-tertiary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                      }}>
                        {n.body}
                      </span>
                    )}
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-blue)',
                      flexShrink: 0,
                      marginTop: '6px',
                    }} />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
