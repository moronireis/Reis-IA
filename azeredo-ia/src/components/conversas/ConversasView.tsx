import { useState, useEffect, useRef, useCallback } from 'react';
import MessageContent from './MessageContent';

interface Instance {
  id: string;
  slot_number: number;
  display_name: string | null;
  uazapi_name: string;
  phone_number: string | null;
  status: string;
  owner_profile_id?: string | null;
}

interface Me { id: string; role: string; }

// Local DB conversation (from webhook)
interface Conversation {
  id: string;
  remote_jid: string;
  remote_name: string | null;
  last_message: string | null;
  last_message_at: string | null;
  last_direction: string;
  unread_count: number;
  status: string;
  instance_id: string;
  instance: { slot_number: number; display_name: string | null; uazapi_name: string } | null;
}

// Live chat from UazapiGO
interface LiveChat {
  jid: string;
  name: string | null;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
  is_group: boolean;
  last_direction: 'inbound' | 'outbound';
}

interface Message {
  id: string;
  body: string | null;
  content_type: string;
  media_url: string | null;
  media_mime: string | null;
  direction: 'inbound' | 'outbound';
  sent_at: string;
  metadata?: any;
}

function timeAgo(iso: string | null): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'agora';
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function initials(name: string | null): string {
  if (!name) return '?';
  const p = name.trim().split(' ');
  if (p.length === 1) return p[0][0]?.toUpperCase() ?? '?';
  return ((p[0][0] ?? '') + (p[p.length - 1][0] ?? '')).toUpperCase();
}

function phoneDisplay(phone: string | null): string {
  if (!phone) return '';
  const d = phone.replace(/\D/g, '');
  if (d.length === 13) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,9)}-${d.slice(9)}`;
  if (d.length === 12) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,8)}-${d.slice(8)}`;
  return phone;
}

export default function ConversasView() {
  const [instances, setInstances]         = useState<Instance[]>([]);
  const [activeInst, setActiveInst]       = useState<Instance | null>(null); // selected instance for live mode

  // M1: operador com instância vinculada fica travado nela; filtros de
  // pertinência limitam o chat live à base de contatos / campanhas
  const [me, setMe]                       = useState<Me | null>(null);
  const [baseOnly, setBaseOnly]           = useState(false);
  const [campaignOnly, setCampaignOnly]   = useState(false);
  const autoSelectedRef                   = useRef(false);

  const myInstance = me && me.role !== 'admin'
    ? instances.find(i => i.owner_profile_id === me.id) || null
    : null;
  const lockedToMyInstance = !!myInstance;

  // Local DB mode
  const [convs, setConvs]                 = useState<Conversation[]>([]);
  const [tab, setTab]                     = useState<'open' | 'resolved'>('open');
  const [search, setSearch]               = useState('');

  // Live mode
  const [liveChats, setLiveChats]         = useState<LiveChat[]>([]);
  const [liveLoading, setLiveLoading]     = useState(false);
  const [liveError, setLiveError]         = useState('');
  const [selectedJid, setSelectedJid]     = useState<string | null>(null);
  const [selectedName, setSelectedName]   = useState<string | null>(null);

  // Shared
  const [messages, setMessages]           = useState<Message[]>([]);
  const [selectedConv, setSelectedConv]   = useState<Conversation | null>(null);
  const [loading, setLoading]             = useState(true);
  const [loadingMsgs, setLoadingMsgs]     = useState(false);
  const [sending, setSending]             = useState(false);
  const [text, setText]                   = useState('');
  const [openedIds, setOpenedIds]         = useState<Set<string>>(new Set());

  const bottomRef   = useRef<HTMLDivElement>(null);
  const msgPollRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const listPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Loaders ──────────────────────────────────────────────────────────────

  const loadInstances = useCallback(async () => {
    const r = await fetch('/api/instances');
    if (r.ok) setInstances(await r.json());
  }, []);

  const loadConvs = useCallback(async () => {
    const p = new URLSearchParams({ status: tab, limit: '80' });
    if (search) p.set('q', search);
    if (activeInst) p.set('instance_id', activeInst.id);
    const r = await fetch(`/api/conversations?${p}`);
    if (r.ok) setConvs(Array.isArray(await r.clone().json()) ? await r.json() : []);
    setLoading(false);
  }, [tab, search, activeInst]);

  const loadLiveChats = useCallback(async (inst: Instance) => {
    setLiveLoading(true);
    setLiveError('');
    setLiveChats([]);
    try {
      const p = new URLSearchParams({ instance_id: inst.id });
      if (baseOnly) p.set('base_only', '1');
      if (campaignOnly) p.set('campaign_only', '1');
      const r = await fetch(`/api/conversations/live?${p}`);
      const d = await r.json();
      if (!r.ok) { setLiveError(d.error || 'Erro ao carregar chats'); return; }
      setLiveChats(d.chats || []);
    } catch (e: any) {
      setLiveError(e.message);
    } finally {
      setLiveLoading(false);
    }
  }, [baseOnly, campaignOnly]);

  const loadLiveMessages = useCallback(async (inst: Instance, jid: string) => {
    const r = await fetch(`/api/conversations/live-messages?instance_id=${inst.id}&jid=${encodeURIComponent(jid)}&limit=60`);
    if (r.ok) setMessages(await r.json());
  }, []);

  const loadStoredMessages = useCallback(async (convId: string) => {
    const r = await fetch(`/api/conversations/messages?conversation_id=${convId}`);
    if (r.ok) setMessages(await r.json());
  }, []);

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => { loadInstances(); }, [loadInstances]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d?.profile) setMe({ id: d.profile.id, role: d.profile.role }); })
      .catch(() => {});
  }, []);

  // Operador com número vinculado: pré-seleciona a instância dele, trava e
  // liga o filtro "só contatos da base" por padrão
  useEffect(() => {
    if (autoSelectedRef.current || !myInstance) return;
    autoSelectedRef.current = true;
    setBaseOnly(true);
    if (myInstance.status === 'connected') {
      setActiveInst(myInstance);
      setSelectedJid(null);
      setSelectedName(null);
      setSelectedConv(null);
    }
  }, [myInstance]);

  // Stored convs polling (when no live instance selected)
  useEffect(() => {
    if (activeInst) return;
    setLoading(true);
    loadConvs();
    if (listPollRef.current) clearInterval(listPollRef.current);
    listPollRef.current = setInterval(loadConvs, 10000);
    return () => { if (listPollRef.current) clearInterval(listPollRef.current); };
  }, [loadConvs, activeInst]);

  // Live chat polling when instance selected
  useEffect(() => {
    if (!activeInst) return;
    loadLiveChats(activeInst);
    if (listPollRef.current) clearInterval(listPollRef.current);
    listPollRef.current = setInterval(() => loadLiveChats(activeInst), 15000);
    return () => { if (listPollRef.current) clearInterval(listPollRef.current); };
  }, [activeInst, loadLiveChats]);

  // Message polling
  useEffect(() => {
    if (msgPollRef.current) clearInterval(msgPollRef.current);
    setMessages([]);

    if (activeInst && selectedJid) {
      setLoadingMsgs(true);
      loadLiveMessages(activeInst, selectedJid).then(() => setLoadingMsgs(false));
      msgPollRef.current = setInterval(() => loadLiveMessages(activeInst, selectedJid), 4000);
    } else if (selectedConv) {
      setLoadingMsgs(true);
      loadStoredMessages(selectedConv.id).then(() => setLoadingMsgs(false));
      setOpenedIds(s => new Set([...s, selectedConv.id]));
      msgPollRef.current = setInterval(() => loadStoredMessages(selectedConv.id), 3000);
    }

    return () => { if (msgPollRef.current) clearInterval(msgPollRef.current); };
  }, [activeInst, selectedJid, selectedConv, loadLiveMessages, loadStoredMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // ── Send ──────────────────────────────────────────────────────────────────

  const send = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    const t = text.trim();
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      let msg: Message | null = null;

      if (activeInst && selectedJid) {
        // Live mode: send direct
        const r = await fetch('/api/conversations/send-direct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instance_id: activeInst.id, jid: selectedJid, text: t }),
        });
        if (r.ok) msg = await r.json();
      } else if (selectedConv) {
        // Stored mode: existing endpoint
        const r = await fetch('/api/conversations/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversation_id: selectedConv.id, text: t }),
        });
        if (r.ok) msg = await r.json();
      }

      if (msg) setMessages(m => [...m, { ...msg!, content_type: msg!.content_type ?? 'text' }]);
    } finally {
      setSending(false);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────

  const connectedInstances = instances.filter(i => i.status === 'connected');

  const selectInstance = (inst: Instance) => {
    // M1: operador travado na própria instância — não troca nem desmarca
    if (lockedToMyInstance) {
      if (inst.id !== myInstance!.id) return;
      if (activeInst?.id === inst.id) return;
      setActiveInst(inst);
      setSelectedJid(null);
      setSelectedName(null);
      setSelectedConv(null);
      return;
    }
    if (activeInst?.id === inst.id) {
      // Deselect → back to stored convs mode
      setActiveInst(null);
      setSelectedJid(null);
      setSelectedName(null);
      setSelectedConv(null);
      setLiveChats([]);
    } else {
      setActiveInst(inst);
      setSelectedJid(null);
      setSelectedName(null);
      setSelectedConv(null);
    }
  };

  const selectLiveChat = (chat: LiveChat) => {
    setSelectedJid(chat.jid);
    setSelectedName(chat.name);
    setSelectedConv(null);
  };

  const selectStoredConv = (c: Conversation) => {
    setSelectedConv(c);
    setSelectedJid(null);
    setSelectedName(null);
    setConvs(prev => prev.map(x => x.id === c.id ? { ...x, unread_count: 0 } : x));
  };

  // Active chat info for header
  const activeName = activeInst && selectedJid
    ? selectedName || selectedJid.replace('@s.whatsapp.net', '').replace('@g.us', '')
    : selectedConv
    ? selectedConv.remote_name || selectedConv.remote_jid.replace('@s.whatsapp.net', '')
    : null;

  const activePhone = activeInst && selectedJid
    ? selectedJid.replace('@s.whatsapp.net', '').replace('@g.us', '')
    : selectedConv
    ? selectedConv.remote_jid.replace('@s.whatsapp.net', '')
    : null;

  const activeViaLabel = activeInst
    ? (activeInst.display_name || activeInst.uazapi_name)
    : selectedConv?.instance
    ? (selectedConv.instance.display_name || selectedConv.instance.uazapi_name)
    : null;

  const hasActiveChat = !!(selectedJid || selectedConv);

  // Filtered live chats by search
  const filteredLiveChats = liveChats.filter(c =>
    !search || (c.name || c.jid).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', flexDirection: 'column' }}>

      {/* ── Instance bar (always visible) ── */}
      <div style={{
        background: '#060a07', borderBottom: '1px solid #1e2820',
        padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'center',
        flexShrink: 0, overflowX: 'auto',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#3a4a3e', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', marginRight: 4 }}>
          Números:
        </span>

        {instances.length === 0 ? (
          <span style={{ fontSize: 12, color: '#3a4a3e' }}>Nenhum número cadastrado</span>
        ) : (
          instances.map(inst => {
            const connected = inst.status === 'connected';
            const active    = activeInst?.id === inst.id;
            const lockedOut = lockedToMyInstance && inst.id !== myInstance!.id;
            return (
              <button
                key={inst.id}
                onClick={() => selectInstance(inst)}
                title={lockedOut ? 'Seu perfil está vinculado a outro número' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '6px 12px', borderRadius: 20, border: 'none',
                  cursor: connected && !lockedOut ? 'pointer' : 'default',
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                  opacity: lockedOut ? 0.35 : 1,
                  background: active
                    ? 'rgba(37,211,102,0.18)'
                    : connected
                    ? 'rgba(37,211,102,0.06)'
                    : '#0d1410',
                  border: `1px solid ${active ? 'rgba(37,211,102,0.4)' : connected ? 'rgba(37,211,102,0.15)' : '#1e2820'}`,
                  transition: 'all 0.15s',
                }}
              >
                {/* Status dot */}
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: connected ? '#25D366' : '#3a4a3e',
                  boxShadow: connected ? '0 0 6px rgba(37,211,102,0.6)' : 'none',
                }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active ? '#4de08c' : connected ? '#c9d5cc' : '#4b5a52' }}>
                    {inst.display_name || inst.uazapi_name}
                  </div>
                  {inst.phone_number && (
                    <div style={{ fontSize: 10, color: active ? 'rgba(77,224,140,0.7)' : '#3a4a3e', marginTop: 1 }}>
                      {phoneDisplay(inst.phone_number)}
                    </div>
                  )}
                </div>
                {active && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4de08c" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })
        )}

        {/* Mode label */}
        <div style={{ marginLeft: 'auto', fontSize: 10, color: '#3a4a3e', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {lockedToMyInstance && <span style={{ color: '#4de08c', marginRight: 8 }}>Seu número: {myInstance!.display_name || myInstance!.uazapi_name}</span>}
          {activeInst ? `Live · ${activeInst.display_name || activeInst.uazapi_name}` : 'Conversas salvas'}
        </div>
      </div>

      {/* ── Body: list + chat ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left: conversation list ── */}
        <div style={{ width: 320, borderRight: '1px solid #1e2820', display: 'flex', flexDirection: 'column', flexShrink: 0, background: '#060a07' }}>

          {/* List header */}
          <div style={{ padding: '12px 14px 0', borderBottom: '1px solid #1e2820' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f2' }}>
                {activeInst ? 'Chats ao vivo' : 'Conversas'}
              </div>
              <button
                onClick={() => activeInst ? loadLiveChats(activeInst) : loadConvs()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a4a3e', padding: 4 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
            </div>

            {/* M1: filtros de pertinência — only in live mode */}
            {activeInst && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                {[
                  { on: baseOnly, set: setBaseOnly, label: 'Só da base' },
                  { on: campaignOnly, set: setCampaignOnly, label: 'Com campanha' },
                ].map(f => (
                  <button
                    key={f.label}
                    onClick={() => f.set(!f.on)}
                    style={{
                      padding: '4px 10px', borderRadius: 12, fontSize: 10, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s',
                      border: `1px solid ${f.on ? 'rgba(37,211,102,0.4)' : '#1e2820'}`,
                      background: f.on ? 'rgba(37,211,102,0.12)' : 'transparent',
                      color: f.on ? '#4de08c' : '#4b5a52',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {/* Tabs — only in stored mode */}
            {!activeInst && (
              <div style={{ display: 'flex', gap: 0, marginBottom: 8, background: '#0d1410', borderRadius: 8, padding: 3 }}>
                {(['open', 'resolved'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: '5px 0', fontSize: 11, fontWeight: 600, borderRadius: 6, border: 'none',
                    cursor: 'pointer', background: tab === t ? '#25D366' : 'transparent',
                    color: tab === t ? '#fff' : '#4b5a52', transition: 'all 0.15s', fontFamily: 'inherit',
                  }}>
                    {t === 'open' ? 'Em aberto' : 'Resolvidos'}
                  </button>
                ))}
              </div>
            )}

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <svg style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#3a4a3e', pointerEvents: 'none' }}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
                style={{ width: '100%', background: '#0d1410', border: '1px solid #1e2820', borderRadius: 8, padding: '6px 10px 6px 28px', color: '#e2e8e4', fontSize: 12, outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>
          </div>

          {/* List body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>

            {/* ── LIVE MODE ── */}
            {activeInst ? (
              liveLoading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#4b5a52', fontSize: 12 }}>Carregando chats...</div>
              ) : liveError ? (
                <div style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#f87171', marginBottom: 12 }}>{liveError}</div>
                  <button onClick={() => loadLiveChats(activeInst)} style={{ fontSize: 11, color: '#25D366', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Tentar novamente
                  </button>
                </div>
              ) : filteredLiveChats.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#4b5a52', fontSize: 12 }}>
                  Nenhum chat encontrado
                </div>
              ) : (
                filteredLiveChats.map(chat => {
                  const isActive = selectedJid === chat.jid;
                  const hasUnread = chat.unread_count > 0;
                  return (
                    <div key={chat.jid} onClick={() => selectLiveChat(chat)} style={{
                      padding: '11px 14px', cursor: 'pointer', borderBottom: '1px solid #0d1410',
                      background: isActive ? 'rgba(37,211,102,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid #25D366' : '2px solid transparent',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                          background: isActive ? 'rgba(37,211,102,0.15)' : '#131a16',
                          border: `1px solid ${isActive ? 'rgba(37,211,102,0.3)' : '#1e2820'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, color: isActive ? '#4de08c' : '#6b7a72', position: 'relative',
                        }}>
                          {chat.is_group ? '👥' : initials(chat.name)}
                          {hasUnread && (
                            <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: '#25D366', border: '2px solid #060a07' }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: hasUnread ? 700 : 600, color: '#e2e8e4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {chat.name || chat.jid.replace('@s.whatsapp.net', '').replace('@g.us', '')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                              {hasUnread && (
                                <span style={{ background: '#25D366', color: '#fff', borderRadius: 10, padding: '1px 5px', fontSize: 9, fontWeight: 700 }}>
                                  {chat.unread_count}
                                </span>
                              )}
                              <span style={{ fontSize: 10, color: '#3a4a3e' }}>{timeAgo(chat.last_message_at)}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: '#4b5a52', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                            {chat.last_direction === 'outbound' && <span style={{ color: '#25D366' }}>Você: </span>}
                            {chat.last_message || '...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (

              /* ── STORED MODE ── */
              loading ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#4b5a52', fontSize: 12 }}>Carregando...</div>
              ) : convs.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#4b5a52', fontSize: 12 }}>
                  <div>Nenhuma conversa {tab === 'open' ? 'em aberto' : 'resolvida'}</div>
                  <div style={{ marginTop: 6, fontSize: 11 }}>Selecione um número acima para ver chats ao vivo</div>
                </div>
              ) : (
                convs.filter(c => !search || (c.remote_name || c.remote_jid).toLowerCase().includes(search.toLowerCase())).map(c => {
                  const isActive  = selectedConv?.id === c.id;
                  const hasUnread = c.unread_count > 0 && !openedIds.has(c.id);
                  return (
                    <div key={c.id} onClick={() => selectStoredConv(c)} style={{
                      padding: '11px 14px', cursor: 'pointer', borderBottom: '1px solid #0d1410',
                      background: isActive ? 'rgba(37,211,102,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid #25D366' : '2px solid transparent',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{
                          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                          background: isActive ? 'rgba(37,211,102,0.15)' : '#131a16',
                          border: `1px solid ${isActive ? 'rgba(37,211,102,0.3)' : '#1e2820'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, color: isActive ? '#4de08c' : '#6b7a72', position: 'relative',
                        }}>
                          {initials(c.remote_name)}
                          {hasUnread && (
                            <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: '#25D366', border: '2px solid #060a07' }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: hasUnread ? 700 : 600, color: '#e2e8e4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.remote_name || c.remote_jid.replace('@s.whatsapp.net', '')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                              {hasUnread && (
                                <span style={{ background: '#25D366', color: '#fff', borderRadius: 10, padding: '1px 5px', fontSize: 9, fontWeight: 700 }}>{c.unread_count}</span>
                              )}
                              <span style={{ fontSize: 10, color: '#3a4a3e' }}>{timeAgo(c.last_message_at)}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, gap: 4 }}>
                            <div style={{ fontSize: 11, color: '#4b5a52', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.last_direction === 'outbound' && <span style={{ color: '#25D366' }}>Você: </span>}
                              {c.last_message || '...'}
                            </div>
                            {c.instance && (
                              <span style={{ fontSize: 9, color: '#2a3a2e', flexShrink: 0 }}>
                                {c.instance.display_name || c.instance.uazapi_name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            )}
          </div>
        </div>

        {/* ── Right: chat panel ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#080c09' }}>
          {hasActiveChat ? (
            <>
              {/* Chat header */}
              <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e2820', display: 'flex', alignItems: 'center', gap: 10, background: '#060a07', flexShrink: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#4de08c', flexShrink: 0 }}>
                  {initials(activeName)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f2' }}>{activeName}</div>
                  <div style={{ fontSize: 10, color: '#4b5a52' }}>
                    {activePhone}
                    {activeViaLabel && ` · via ${activeViaLabel}`}
                    {activeInst && <span style={{ marginLeft: 6, color: '#25D366', fontSize: 9, fontWeight: 700 }}>● LIVE</span>}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${activePhone}`}
                  target="_blank" rel="noreferrer"
                  style={{ background: '#131a16', border: '1px solid #1e2820', borderRadius: 7, padding: '5px 12px', fontSize: 11, color: '#4de08c', textDecoration: 'none', fontWeight: 600, flexShrink: 0 }}
                >
                  WA ↗
                </a>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {loadingMsgs && messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#4b5a52', fontSize: 12, padding: 40 }}>Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#4b5a52', fontSize: 12, padding: 40 }}>Nenhuma mensagem</div>
                ) : (
                  messages.map((msg, i) => {
                    const out = msg.direction === 'outbound';
                    const prevMsg = messages[i - 1];
                    const showDate = !prevMsg || new Date(msg.sent_at).toDateString() !== new Date(prevMsg.sent_at).toDateString();
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div style={{ textAlign: 'center', margin: '8px 0', fontSize: 10, color: '#3a4a3e' }}>
                            {new Date(msg.sent_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start' }}>
                          <div style={{
                            maxWidth: '72%', padding: '8px 12px',
                            borderRadius: out ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                            background: out ? 'rgba(37,211,102,0.13)' : '#131a16',
                            border: `1px solid ${out ? 'rgba(37,211,102,0.2)' : '#1e2820'}`,
                          }}>
                            <MessageContent msg={msg} />
                            <div style={{ fontSize: 10, color: out ? 'rgba(37,211,102,0.6)' : '#3a4a3e', marginTop: 4, textAlign: 'right' }}>
                              {new Date(msg.sent_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              {out && <span style={{ marginLeft: 4, color: '#25D366' }}>✓</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid #1e2820', background: '#060a07', display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Mensagem... (Enter envia, Shift+Enter quebra linha)"
                  rows={1}
                  style={{
                    flex: 1, background: '#0d1410', border: '1px solid #1e2820', borderRadius: 10,
                    padding: '9px 12px', color: '#e2e8e4', fontSize: 13, outline: 'none',
                    resize: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, maxHeight: 100,
                  }}
                  onInput={e => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
                  }}
                />
                <button onClick={send} disabled={sending || !text.trim()} style={{
                  width: 38, height: 38, borderRadius: 10, border: 'none',
                  cursor: text.trim() && !sending ? 'pointer' : 'not-allowed',
                  background: text.trim() && !sending ? '#25D366' : '#131a16',
                  color: text.trim() && !sending ? '#fff' : '#3a4a3e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                }}>
                  {sending ? (
                    <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Empty state */
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#0d1410', border: '1px solid #1e2820', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2a3a2e" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#4b5a52', marginBottom: 4 }}>Selecione uma conversa</div>
                <div style={{ fontSize: 12, color: '#2a3a2e' }}>
                  {connectedInstances.length > 0
                    ? 'Clique em um número acima para ver chats ao vivo'
                    : 'Nenhum número conectado'}
                </div>
              </div>
              {connectedInstances.length === 0 && (
                <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 10, padding: '10px 18px', fontSize: 12, color: '#fcd34d', textAlign: 'center' }}>
                  <a href="/config" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 600 }}>Conecte um número em Configurações</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
