import { useState, useEffect, useRef, useCallback } from 'react';
import MessageContent from './MessageContent';

/**
 * Conversas — chat live via UazapiGO (sem webhook: polling).
 *
 * #1 (backlog GitHub 17/07) — guias por perfil:
 *   Vendedor (perfil com número vinculado): guias BASE e CAMPANHA da própria
 *   instância. Operador/Admin (ex.: Tati): vê TODOS os vendedores, porém
 *   apenas a guia CAMPANHA (a Base some) — default "Todos os números".
 * #3 — chat completo: foto de perfil, mídia inline (proxy decripta), envio de
 *   imagem/PDF e áudio gravado (voice note).
 */

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
  image?: string | null;                // #3: foto de perfil (quando o servidor manda)
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
  is_group: boolean;
  last_direction: 'inbound' | 'outbound';
  campaign?: { id: string; name: string } | null; // F5: disparo que originou a conversa
  instance_id?: string;                 // #1: no modo "Todos", o número dono do chat
  instance_name?: string;
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

interface Attach { url: string; type: 'image' | 'video' | 'document'; mime: string; name: string | null; }

const ALL_ID = 'all';

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

// Avatar com foto de perfil e fallback para iniciais
function Avatar({ image, name, size = 38, active = false, unread = false, isGroup = false }: {
  image?: string | null; name: string | null; size?: number; active?: boolean; unread?: boolean; isGroup?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const showImg = !!image && !broken;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: active ? 'rgba(37,211,102,0.15)' : 'var(--bg-secondary)',
      border: `1px solid ${active ? 'rgba(37,211,102,0.3)' : 'var(--border)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.34, fontWeight: 700, color: active ? 'var(--accent-light)' : 'var(--text-muted)',
      position: 'relative', overflow: 'visible',
    }}>
      {showImg ? (
        <img
          src={image!}
          alt=""
          onError={() => setBroken(true)}
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : isGroup ? (
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ) : (
        initials(name)
      )}
      {unread && (
        <div style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', border: '2px solid #060a07' }} />
      )}
    </div>
  );
}

export default function ConversasView() {
  const [instances, setInstances]         = useState<Instance[]>([]);
  const [activeInstId, setActiveInstId]   = useState<string | null>(null); // UUID, 'all' ou null (modo salvo)

  // M1: operador com instância vinculada fica travado nela
  const [me, setMe]                       = useState<Me | null>(null);
  // #1: guia ativa — vendedor alterna Base/Campanha; operador/admin só Campanha
  const [guide, setGuide]                 = useState<'base' | 'campaign'>('campaign');
  // F5: filtrar por campanha específica (dropdown na guia Campanha)
  const [campaignFilter, setCampaignFilter] = useState('');
  const [campaignOptions, setCampaignOptions] = useState<{ id: string; name: string }[]>([]);
  const autoSelectedRef                   = useRef(false);

  const myInstance = me && me.role !== 'admin'
    ? instances.find(i => i.owner_profile_id === me.id) || null
    : null;
  const isVendedor  = !!myInstance;               // guias Base + Campanha, travado no número
  const isSupervisor = !!me && !isVendedor;       // admin/operacional sem número: só Campanha, vê todos
  // #18: vendedor/gerência SEM número vinculado não pode cair na visão agregada
  // (veria conversas de todo mundo) — bloqueia com aviso até o admin vincular.
  const semVinculo = !!me && (me.role === 'vendedor' || me.role === 'gerencia') && instances.length > 0 && !myInstance;

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
  const [selectedChat, setSelectedChat]   = useState<LiveChat | null>(null);
  const [headerPhoto, setHeaderPhoto]     = useState<string | null>(null);
  const photoCacheRef                     = useRef<Map<string, string | null>>(new Map());

  // Shared
  const [messages, setMessages]           = useState<Message[]>([]);
  const [selectedConv, setSelectedConv]   = useState<Conversation | null>(null);
  const [loading, setLoading]             = useState(true);
  const [loadingMsgs, setLoadingMsgs]     = useState(false);
  const [sending, setSending]             = useState(false);
  const [text, setText]                   = useState('');
  const [openedIds, setOpenedIds]         = useState<Set<string>>(new Set());

  // #3: anexo + gravação de áudio
  const [attach, setAttach]               = useState<Attach | null>(null);
  const [uploadingAttach, setUploadingAttach] = useState(false);
  const [recording, setRecording]         = useState(false);
  const [recSeconds, setRecSeconds]       = useState(0);
  const recorderRef  = useRef<MediaRecorder | null>(null);
  const recChunksRef = useRef<Blob[]>([]);
  const recTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const attachInputRef = useRef<HTMLInputElement>(null);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const msgPollRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const listPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeInst = activeInstId === ALL_ID
    ? null
    : instances.find(i => i.id === activeInstId) || null;
  const allMode = activeInstId === ALL_ID;
  const liveMode = !!activeInstId;

  // Instância dona do chat selecionado (no modo Todos vem do próprio chat)
  const chatInstId = selectedChat?.instance_id || activeInst?.id || null;

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

  const loadLiveChats = useCallback(async (instId: string) => {
    setLiveLoading(true);
    setLiveError('');
    setLiveChats([]);
    try {
      const p = new URLSearchParams({ instance_id: instId });
      if (instId !== ALL_ID && guide === 'base') p.set('base_only', '1');
      if (guide === 'campaign') p.set('campaign_only', '1');
      if (guide === 'campaign' && campaignFilter) p.set('campaign_id', campaignFilter);
      const r = await fetch(`/api/conversations/live?${p}`);
      const d = await r.json();
      if (!r.ok) { setLiveError(d.error || 'Erro ao carregar chats'); return; }
      setLiveChats(d.chats || []);
    } catch (e: any) {
      setLiveError(e.message);
    } finally {
      setLiveLoading(false);
    }
  }, [guide, campaignFilter]);

  // F5: opções do dropdown de campanha (só campanhas que já dispararam)
  useEffect(() => {
    if (guide !== 'campaign' || campaignOptions.length > 0) return;
    fetch('/api/campaigns?limit=50')
      .then(r => (r.ok ? r.json() : { campaigns: [] }))
      .then(d => setCampaignOptions(
        (d.campaigns || [])
          .filter((c: any) => c.status !== 'draft')
          .map((c: any) => ({ id: c.id, name: c.name }))
      ))
      .catch(() => {});
  }, [guide, campaignOptions.length]);

  const loadLiveMessages = useCallback(async (instId: string, jid: string) => {
    const r = await fetch(`/api/conversations/live-messages?instance_id=${instId}&jid=${encodeURIComponent(jid)}&limit=60`);
    if (r.ok) {
      const d = await r.json();
      if (Array.isArray(d)) setMessages(d);
    }
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

  // #1: seleção inicial por papel.
  // Vendedor → própria instância + guia Base. Operador/Admin → Todos + Campanha.
  useEffect(() => {
    if (autoSelectedRef.current || !me || instances.length === 0) return;
    // #18: vendedor/gerência sem vínculo não carrega a visão agregada
    if ((me.role === 'vendedor' || me.role === 'gerencia') && !myInstance) return;
    autoSelectedRef.current = true;
    if (myInstance) {
      setGuide('base');
      if (myInstance.status === 'connected') setActiveInstId(myInstance.id);
    } else {
      setGuide('campaign');
      setActiveInstId(ALL_ID);
    }
    setSelectedJid(null);
    setSelectedName(null);
    setSelectedChat(null);
    setSelectedConv(null);
  }, [me, myInstance, instances.length]);

  // Stored convs polling (when no live instance selected)
  useEffect(() => {
    if (liveMode) return;
    setLoading(true);
    loadConvs();
    if (listPollRef.current) clearInterval(listPollRef.current);
    listPollRef.current = setInterval(loadConvs, 10000);
    return () => { if (listPollRef.current) clearInterval(listPollRef.current); };
  }, [loadConvs, liveMode]);

  // Live chat polling
  useEffect(() => {
    if (!activeInstId) return;
    loadLiveChats(activeInstId);
    if (listPollRef.current) clearInterval(listPollRef.current);
    listPollRef.current = setInterval(() => loadLiveChats(activeInstId), 15000);
    return () => { if (listPollRef.current) clearInterval(listPollRef.current); };
  }, [activeInstId, loadLiveChats]);

  // Message polling
  useEffect(() => {
    if (msgPollRef.current) clearInterval(msgPollRef.current);
    setMessages([]);

    if (chatInstId && selectedJid) {
      setLoadingMsgs(true);
      loadLiveMessages(chatInstId, selectedJid).then(() => setLoadingMsgs(false));
      msgPollRef.current = setInterval(() => loadLiveMessages(chatInstId, selectedJid), 4000);
    } else if (selectedConv) {
      setLoadingMsgs(true);
      loadStoredMessages(selectedConv.id).then(() => setLoadingMsgs(false));
      setOpenedIds(s => new Set([...s, selectedConv.id]));
      msgPollRef.current = setInterval(() => loadStoredMessages(selectedConv.id), 3000);
    }

    return () => { if (msgPollRef.current) clearInterval(msgPollRef.current); };
  }, [chatInstId, selectedJid, selectedConv, loadLiveMessages, loadStoredMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // #3: foto de perfil do chat aberto (cache por jid; usa a da lista se veio)
  useEffect(() => {
    setHeaderPhoto(null);
    if (!selectedJid || !chatInstId) return;
    if (selectedChat?.image) { setHeaderPhoto(selectedChat.image); return; }
    const cached = photoCacheRef.current.get(selectedJid);
    if (cached !== undefined) { setHeaderPhoto(cached); return; }
    const number = selectedJid.split('@')[0];
    fetch(`/api/conversations/chat-photo?instance_id=${chatInstId}&number=${encodeURIComponent(number)}`)
      .then(r => (r.ok ? r.json() : { image: null }))
      .then(d => {
        photoCacheRef.current.set(selectedJid, d.image || null);
        setHeaderPhoto(d.image || null);
      })
      .catch(() => {});
  }, [selectedJid, chatInstId, selectedChat]);

  // ── Anexo + áudio (#3) ────────────────────────────────────────────────────

  const pickAttach = () => attachInputRef.current?.click();

  const onAttachFile = async (f: File) => {
    setUploadingAttach(true);
    try {
      const fd = new FormData();
      fd.append('file', f);
      const r = await fetch('/api/media/upload', { method: 'POST', body: fd });
      const d = await r.json();
      if (!r.ok) { alert(d.error || 'Falha no upload'); return; }
      if (d.media_type === 'audio') {
        // áudio anexado vira voice note direto
        await sendMedia(d.url, 'ptt', null, null);
      } else {
        setAttach({ url: d.url, type: d.media_type, mime: d.mime, name: d.name });
      }
    } catch {
      alert('Erro de conexão no upload');
    } finally {
      setUploadingAttach(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '';
      const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      recChunksRef.current = [];
      rec.ondataavailable = e => { if (e.data.size > 0) recChunksRef.current.push(e.data); };
      rec.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (recTimerRef.current) clearInterval(recTimerRef.current);
        const type = (rec.mimeType || 'audio/webm').split(';')[0];
        const blob = new Blob(recChunksRef.current, { type });
        if (blob.size < 1200) return; // gravação acidental (< ~0.1s)
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        await onAttachFile(new File([blob], `audio.${ext}`, { type }));
      };
      recorderRef.current = rec;
      rec.start();
      setRecSeconds(0);
      recTimerRef.current = setInterval(() => setRecSeconds(s => s + 1), 1000);
      setRecording(true);
    } catch {
      alert('Não foi possível acessar o microfone — verifique a permissão do navegador.');
    }
  };

  const stopRecording = (cancel = false) => {
    const rec = recorderRef.current;
    setRecording(false);
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (!rec) return;
    if (cancel) recChunksRef.current = [];
    if (rec.state !== 'inactive') rec.stop();
    recorderRef.current = null;
  };

  // ── Send ──────────────────────────────────────────────────────────────────

  const sendMedia = async (mediaUrl: string, mediaType: string, caption: string | null, docName: string | null) => {
    if (!chatInstId || !selectedJid) return;
    setSending(true);
    try {
      const r = await fetch('/api/conversations/send-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instance_id: chatInstId, jid: selectedJid,
          text: caption || undefined, media_url: mediaUrl, media_type: mediaType,
          doc_name: docName || undefined,
        }),
      });
      if (r.ok) {
        const msg = await r.json();
        setMessages(m => [...m, msg]);
      } else {
        const d = await r.json().catch(() => ({}));
        alert(d.error || 'Falha ao enviar');
      }
    } finally {
      setSending(false);
    }
  };

  const send = async () => {
    if (sending) return;
    const t = text.trim();

    // Com anexo: envia a mídia (texto vira legenda)
    if (attach) {
      const a = attach;
      setAttach(null);
      setText('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
      await sendMedia(a.url, a.type, t || null, a.name);
      return;
    }

    if (!t) return;
    setSending(true);
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    try {
      let msg: Message | null = null;

      if (chatInstId && selectedJid) {
        // Live mode: send direct
        const r = await fetch('/api/conversations/send-direct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instance_id: chatInstId, jid: selectedJid, text: t }),
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

  const selectInstance = (instId: string) => {
    // Vendedor travado na própria instância
    if (isVendedor) {
      if (instId !== myInstance!.id) return;
    }
    if (activeInstId === instId) {
      // Vendedor não desmarca; supervisor volta para "Todos"
      if (isSupervisor && instId !== ALL_ID) setActiveInstId(ALL_ID);
    } else {
      setActiveInstId(instId);
    }
    setSelectedJid(null);
    setSelectedName(null);
    setSelectedChat(null);
    setSelectedConv(null);
  };

  const selectLiveChat = (chat: LiveChat) => {
    setSelectedJid(chat.jid);
    setSelectedName(chat.name);
    setSelectedChat(chat);
    setSelectedConv(null);
  };

  const selectStoredConv = (c: Conversation) => {
    setSelectedConv(c);
    setSelectedJid(null);
    setSelectedName(null);
    setSelectedChat(null);
    setConvs(prev => prev.map(x => x.id === c.id ? { ...x, unread_count: 0 } : x));
  };

  // Active chat info for header
  const activeName = liveMode && selectedJid
    ? selectedName || selectedJid.replace('@s.whatsapp.net', '').replace('@g.us', '')
    : selectedConv
    ? selectedConv.remote_name || selectedConv.remote_jid.replace('@s.whatsapp.net', '')
    : null;

  const activePhone = liveMode && selectedJid
    ? selectedJid.replace('@s.whatsapp.net', '').replace('@g.us', '')
    : selectedConv
    ? selectedConv.remote_jid.replace('@s.whatsapp.net', '')
    : null;

  const chatInstance = instances.find(i => i.id === chatInstId) || null;
  const activeViaLabel = liveMode && selectedJid
    ? (selectedChat?.instance_name || chatInstance?.display_name || chatInstance?.uazapi_name || activeInst?.display_name || null)
    : selectedConv?.instance
    ? (selectedConv.instance.display_name || selectedConv.instance.uazapi_name)
    : null;

  const hasActiveChat = !!(selectedJid || selectedConv);

  // Filtered live chats by search
  const filteredLiveChats = liveChats.filter(c =>
    !search || (c.name || c.jid).toLowerCase().includes(search.toLowerCase())
  );

  // #18: vendedor/gerência sem número vinculado — nada de visão agregada
  if (semVinculo) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="card-surface" style={{ maxWidth: 420, padding: '28px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Nenhum número vinculado ao seu perfil
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Seu papel ({me?.role === 'gerencia' ? 'Gerência' : 'Vendedor'}) mostra as conversas do SEU número de WhatsApp.
            Peça a um administrador para vincular um número ao seu usuário em Configurações → Números WhatsApp → Vendedor.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', flexDirection: 'column' }}>

      {/* ── Instance bar (always visible) ── */}
      <div style={{
        background: 'rgba(10, 16, 12, 0.62)', borderBottom: '1px solid var(--hairline)',
        padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'center',
        flexShrink: 0, overflowX: 'auto',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#3a4a3e', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', marginRight: 4 }}>
          Números:
        </span>

        {/* #1: chip "Todos" para operador/admin */}
        {isSupervisor && (
          <button
            onClick={() => selectInstance(ALL_ID)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 12px', borderRadius: 20,
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
              background: allMode ? 'rgba(37,211,102,0.18)' : 'rgba(37,211,102,0.06)',
              border: `1px solid ${allMode ? 'rgba(37,211,102,0.4)' : 'rgba(37,211,102,0.15)'}`,
              transition: 'all 0.15s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={allMode ? 'var(--accent-light)' : 'var(--text-muted)'} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: allMode ? 'var(--accent-light)' : 'var(--text-secondary)' }}>
              Todos os números
            </span>
            {allMode && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            )}
          </button>
        )}

        {instances.length === 0 ? (
          <span style={{ fontSize: 12, color: '#3a4a3e' }}>Nenhum número cadastrado</span>
        ) : (
          instances.map(inst => {
            const connected = inst.status === 'connected';
            const active    = activeInstId === inst.id;
            const lockedOut = isVendedor && inst.id !== myInstance!.id;
            return (
              <button
                key={inst.id}
                onClick={() => connected && !lockedOut && selectInstance(inst.id)}
                title={lockedOut ? 'Seu perfil está vinculado a outro número' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '6px 12px', borderRadius: 20,
                  cursor: connected && !lockedOut ? 'pointer' : 'default',
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                  opacity: lockedOut ? 0.35 : 1,
                  background: active
                    ? 'rgba(37,211,102,0.18)'
                    : connected
                    ? 'rgba(37,211,102,0.06)'
                    : 'var(--bg-secondary)',
                  border: `1px solid ${active ? 'rgba(37,211,102,0.4)' : connected ? 'rgba(37,211,102,0.15)' : 'var(--border)'}`,
                  transition: 'all 0.15s',
                }}
              >
                {/* Status dot */}
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: connected ? 'var(--accent)' : '#3a4a3e',
                  boxShadow: connected ? '0 0 6px rgba(37,211,102,0.6)' : 'none',
                }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active ? 'var(--accent-light)' : connected ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                    {inst.display_name || inst.uazapi_name}
                  </div>
                  {inst.phone_number && (
                    <div style={{ fontSize: 10, color: active ? 'rgba(77,224,140,0.7)' : '#3a4a3e', marginTop: 1 }}>
                      {phoneDisplay(inst.phone_number)}
                    </div>
                  )}
                </div>
                {active && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })
        )}

        {/* Mode label */}
        <div style={{ marginLeft: 'auto', fontSize: 10, color: '#3a4a3e', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {isVendedor && <span style={{ color: 'var(--accent-light)', marginRight: 8 }}>Seu número: {myInstance!.display_name || myInstance!.uazapi_name}</span>}
          {allMode ? 'Live · Todos os números' : activeInst ? `Live · ${activeInst.display_name || activeInst.uazapi_name}` : 'Conversas salvas'}
        </div>
      </div>

      {/* ── Body: list + chat ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left: conversation list ── */}
        <div style={{ width: 320, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0, background: 'rgba(10, 16, 12, 0.62)' }}>

          {/* List header */}
          <div style={{ padding: '12px 14px 0', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                {liveMode ? 'Chats ao vivo' : 'Conversas'}
              </div>
              <button
                onClick={() => activeInstId ? loadLiveChats(activeInstId) : loadConvs()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a4a3e', padding: 4 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </button>
            </div>

            {/* #1: guias por papel — vendedor: Base | Campanha; supervisor: só Campanha */}
            {liveMode && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {isVendedor ? (
                  <div style={{ display: 'flex', gap: 0, background: 'var(--bg-card-translucent)', borderRadius: 8, padding: 3 }}>
                    {([['base', 'Base'], ['campaign', 'Campanha']] as const).map(([g, label]) => (
                      <button key={g} onClick={() => setGuide(g)} style={{
                        padding: '5px 14px', fontSize: 11, fontWeight: 600, borderRadius: 6, border: 'none',
                        cursor: 'pointer', background: guide === g ? 'var(--accent)' : 'transparent',
                        color: guide === g ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s', fontFamily: 'inherit',
                      }}>
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span style={{
                    padding: '4px 12px', borderRadius: 12, fontSize: 10, fontWeight: 700,
                    border: '1px solid rgba(106,173,255,0.35)', background: 'rgba(106,173,255,0.1)', color: '#6AADFF',
                  }}>
                    Guia Campanha
                  </span>
                )}
                {/* F5: campanha específica */}
                {guide === 'campaign' && campaignOptions.length > 0 && (
                  <select
                    value={campaignFilter}
                    onChange={e => setCampaignFilter(e.target.value)}
                    style={{
                      padding: '3px 8px', borderRadius: 12, fontSize: 10, fontWeight: 600,
                      fontFamily: 'inherit', cursor: 'pointer', outline: 'none', maxWidth: 170,
                      border: `1px solid ${campaignFilter ? 'rgba(106,173,255,0.4)' : 'var(--border)'}`,
                      background: campaignFilter ? 'rgba(106,173,255,0.1)' : 'var(--bg-secondary)',
                      color: campaignFilter ? '#6AADFF' : 'var(--text-muted)',
                    }}
                  >
                    <option value="">Todas as campanhas</option>
                    {campaignOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
              </div>
            )}

            {/* Tabs — only in stored mode */}
            {!liveMode && (
              <div style={{ display: 'flex', gap: 0, marginBottom: 8, background: 'var(--bg-card-translucent)', borderRadius: 8, padding: 3 }}>
                {(['open', 'resolved'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: '5px 0', fontSize: 11, fontWeight: 600, borderRadius: 6, border: 'none',
                    cursor: 'pointer', background: tab === t ? 'var(--accent)' : 'transparent',
                    color: tab === t ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s', fontFamily: 'inherit',
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
                style={{ width: '100%', background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 8, padding: '6px 10px 6px 28px', color: 'var(--text-primary)', fontSize: 12, outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>
          </div>

          {/* List body */}
          <div style={{ flex: 1, overflowY: 'auto' }}>

            {/* ── LIVE MODE ── */}
            {liveMode ? (
              liveLoading ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>Carregando chats...</div>
              ) : liveError ? (
                <div style={{ padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--red)', marginBottom: 12 }}>{liveError}</div>
                  <button onClick={() => activeInstId && loadLiveChats(activeInstId)} style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Tentar novamente
                  </button>
                </div>
              ) : filteredLiveChats.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                  {guide === 'campaign' ? 'Nenhuma conversa de campanha encontrada' : 'Nenhum chat encontrado'}
                </div>
              ) : (
                filteredLiveChats.map(chat => {
                  const isActive = selectedJid === chat.jid && (!allMode || selectedChat?.instance_id === chat.instance_id);
                  const hasUnread = chat.unread_count > 0;
                  return (
                    <div key={`${chat.instance_id || 'i'}-${chat.jid}`} onClick={() => selectLiveChat(chat)} style={{
                      padding: '11px 14px', cursor: 'pointer', borderBottom: '1px solid var(--bg-secondary)',
                      background: isActive ? 'rgba(37,211,102,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <Avatar image={chat.image} name={chat.name} active={isActive} unread={hasUnread} isGroup={chat.is_group} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: hasUnread ? 700 : 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {chat.name || chat.jid.replace('@s.whatsapp.net', '').replace('@g.us', '')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                              {hasUnread && (
                                <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: 10, padding: '1px 5px', fontSize: 9, fontWeight: 700 }}>
                                  {chat.unread_count}
                                </span>
                              )}
                              <span style={{ fontSize: 10, color: '#3a4a3e' }}>{timeAgo(chat.last_message_at)}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                            {chat.last_direction === 'outbound' && <span style={{ color: 'var(--accent)' }}>Você: </span>}
                            {chat.last_message || '...'}
                          </div>
                          {/* Badges: campanha de origem + número (no modo Todos) */}
                          {(chat.campaign || (allMode && chat.instance_name)) && (
                            <div style={{ marginTop: 3, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {chat.campaign && (
                                <span title={`Originada pelo disparo "${chat.campaign.name}"`} style={{
                                  fontSize: 9, fontWeight: 700, color: '#6AADFF',
                                  background: 'rgba(106,173,255,0.1)', border: '1px solid rgba(106,173,255,0.25)',
                                  borderRadius: 100, padding: '1px 6px',
                                  display: 'inline-block', maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                  {chat.campaign.name}
                                </span>
                              )}
                              {allMode && chat.instance_name && (
                                <span title="Número que atende esta conversa" style={{
                                  fontSize: 9, fontWeight: 700, color: 'var(--text-secondary)',
                                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                  borderRadius: 100, padding: '1px 6px',
                                }}>
                                  {chat.instance_name}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )
            ) : (

              /* ── STORED MODE ── */
              loading ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>Carregando...</div>
              ) : convs.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                  <div>Nenhuma conversa {tab === 'open' ? 'em aberto' : 'resolvida'}</div>
                  <div style={{ marginTop: 6, fontSize: 11 }}>Selecione um número acima para ver chats ao vivo</div>
                </div>
              ) : (
                convs.filter(c => !search || (c.remote_name || c.remote_jid).toLowerCase().includes(search.toLowerCase())).map(c => {
                  const isActive  = selectedConv?.id === c.id;
                  const hasUnread = c.unread_count > 0 && !openedIds.has(c.id);
                  return (
                    <div key={c.id} onClick={() => selectStoredConv(c)} style={{
                      padding: '11px 14px', cursor: 'pointer', borderBottom: '1px solid var(--bg-secondary)',
                      background: isActive ? 'rgba(37,211,102,0.06)' : 'transparent',
                      borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <Avatar name={c.remote_name} active={isActive} unread={hasUnread} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: hasUnread ? 700 : 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.remote_name || c.remote_jid.replace('@s.whatsapp.net', '')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                              {hasUnread && (
                                <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: 10, padding: '1px 5px', fontSize: 9, fontWeight: 700 }}>{c.unread_count}</span>
                              )}
                              <span style={{ fontSize: 10, color: '#3a4a3e' }}>{timeAgo(c.last_message_at)}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, gap: 4 }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.last_direction === 'outbound' && <span style={{ color: 'var(--accent)' }}>Você: </span>}
                              {c.last_message || '...'}
                            </div>
                            {c.instance && (
                              <span style={{ fontSize: 9, color: 'var(--border-light)', flexShrink: 0 }}>
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'transparent' }}>
          {hasActiveChat ? (
            <>
              {/* Chat header */}
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(10, 16, 12, 0.62)', flexShrink: 0 }}>
                <Avatar image={headerPhoto || selectedChat?.image} name={activeName} size={36} active isGroup={selectedChat?.is_group} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {activeName}
                    {selectedChat?.campaign && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: '#6AADFF',
                        background: 'rgba(106,173,255,0.1)', border: '1px solid rgba(106,173,255,0.25)',
                        borderRadius: 100, padding: '1px 7px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {selectedChat.campaign.name}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {activePhone}
                    {activeViaLabel && ` · via ${activeViaLabel}`}
                    {liveMode && <span style={{ marginLeft: 6, color: 'var(--accent)', fontSize: 9, fontWeight: 700 }}>● LIVE</span>}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${activePhone}`}
                  target="_blank" rel="noreferrer"
                  style={{ background: 'var(--surface-btn)', border: '1px solid var(--hairline)', borderRadius: 7, padding: '5px 12px', fontSize: 11, color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 600, flexShrink: 0 }}
                >
                  WA ↗
                </a>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {loadingMsgs && messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, padding: 40 }}>Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, padding: 40 }}>Nenhuma mensagem</div>
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
                            background: out ? 'rgba(37,211,102,0.13)' : 'var(--bg-secondary)',
                            border: `1px solid ${out ? 'rgba(37,211,102,0.2)' : 'var(--border)'}`,
                          }}>
                            <MessageContent msg={msg} />
                            <div style={{ fontSize: 10, color: out ? 'rgba(37,211,102,0.6)' : '#3a4a3e', marginTop: 4, textAlign: 'right' }}>
                              {new Date(msg.sent_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              {out && <span style={{ marginLeft: 4, color: 'var(--accent)' }}>✓</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* #3: preview do anexo pendente */}
              {attach && (
                <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', background: 'rgba(10, 16, 12, 0.62)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {attach.type === 'image' ? (
                    <img src={attach.url} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }} />
                  ) : attach.type === 'video' ? (
                    <video src={attach.url} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} muted />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {attach.name || (attach.type === 'image' ? 'Imagem' : attach.type === 'video' ? 'Vídeo' : 'Documento')}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Pronto para enviar — a mensagem digitada vai como legenda</div>
                  </div>
                  <button onClick={() => setAttach(null)} title="Remover anexo" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)', padding: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              )}

              {/* Input */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', background: 'rgba(10, 16, 12, 0.62)', display: 'flex', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                {/* #3: anexar arquivo (imagem/vídeo/PDF/áudio) — só no modo live */}
                {liveMode && (
                  <>
                    <input
                      ref={attachInputRef} type="file" style={{ display: 'none' }}
                      accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,application/pdf,audio/*"
                      onChange={e => { const f = e.target.files?.[0]; if (f) onAttachFile(f); e.target.value = ''; }}
                    />
                    <button
                      onClick={pickAttach}
                      disabled={uploadingAttach || sending}
                      title="Anexar imagem, vídeo ou PDF"
                      style={{
                        width: 38, height: 38, borderRadius: 10, border: '1px solid var(--hairline)',
                        background: 'var(--bg-card-translucent)', cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: uploadingAttach ? 'var(--accent)' : 'var(--text-muted)',
                      }}
                    >
                      {uploadingAttach ? (
                        <div style={{ width: 13, height: 13, border: '2px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                      )}
                    </button>
                  </>
                )}

                {recording ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '9px 14px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', animation: 'pulse-dot 1s ease-in-out infinite' }} />
                    <span style={{ fontSize: 13, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                      Gravando… {Math.floor(recSeconds / 60)}:{String(recSeconds % 60).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }} />
                    <button onClick={() => stopRecording(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)', fontSize: 11, fontWeight: 600, fontFamily: 'inherit' }}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                    placeholder={attach ? 'Legenda (opcional)… Enter envia' : 'Mensagem... (Enter envia, Shift+Enter quebra linha)'}
                    rows={1}
                    style={{
                      flex: 1, background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 10,
                      padding: '9px 12px', color: 'var(--text-primary)', fontSize: 13, outline: 'none',
                      resize: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, maxHeight: 100,
                    }}
                    onInput={e => {
                      const el = e.currentTarget;
                      el.style.height = 'auto';
                      el.style.height = Math.min(el.scrollHeight, 100) + 'px';
                    }}
                  />
                )}

                {/* #3: gravar áudio (voice note) — aparece sem texto/anexo */}
                {liveMode && !text.trim() && !attach && (
                  <button
                    onClick={() => recording ? stopRecording(false) : startRecording()}
                    disabled={sending || uploadingAttach}
                    title={recording ? 'Parar e enviar o áudio' : 'Gravar áudio'}
                    style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      cursor: 'pointer', transition: 'all 0.15s',
                      background: recording ? 'var(--red)' : 'var(--bg-card-translucent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: recording ? '#fff' : 'var(--text-muted)',
                      border: recording ? 'none' : '1px solid var(--hairline)',
                    }}
                  >
                    {recording ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                    )}
                  </button>
                )}

                {(text.trim() || attach) && !recording && (
                  <button onClick={send} disabled={sending} style={{
                    width: 38, height: 38, borderRadius: 10, border: 'none',
                    cursor: !sending ? 'pointer' : 'not-allowed',
                    background: !sending ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: !sending ? '#fff' : '#3a4a3e',
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
                )}
              </div>
            </>
          ) : (
            /* Empty state */
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--border-light)" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>Selecione uma conversa</div>
                <div style={{ fontSize: 12, color: 'var(--border-light)' }}>
                  {connectedInstances.length > 0
                    ? isSupervisor
                      ? 'A guia Campanha mostra as conversas originadas pelos disparos'
                      : 'Clique em um número acima para ver chats ao vivo'
                    : 'Nenhum número conectado'}
                </div>
              </div>
              {connectedInstances.length === 0 && (
                <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 10, padding: '10px 18px', fontSize: 12, color: 'var(--amber)', textAlign: 'center' }}>
                  <a href="/config" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Conecte um número em Configurações</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
      `}</style>
    </div>
  );
}
