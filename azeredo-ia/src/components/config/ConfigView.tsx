import { useState, useEffect, useRef, useCallback } from 'react';
import { Toast, useToast } from '../ui/Toast';

interface Instance {
  id: string;
  slot_number: number;
  display_name: string | null;
  uazapi_name: string;
  phone_number: string | null;
  status: string;
  qr_code: string | null;
  is_active: boolean;               // #15: desativado some do wizard e das listas
  owner_profile_id: string | null;
  restricted_at: string | null;     // B1: canário reprovado (aceita, não entrega)
  restricted_reason: string | null;
  vendedor_nome: string | null;     // F1: carteira Mercos vinculada (disparo por vendedor)
  bot_enabled?: boolean;            // #9: IA de atendimento neste número
  profile_name?: string | null;     // #14: nome/foto do WhatsApp persistidos
  profile_pic_url?: string | null;
}

interface AiConfig { prompt: string; knowledge: string; handoff_hours: number; model: string; }

interface ProfileOption { id: string; full_name: string | null; email: string; role: string; is_active?: boolean; }

// #18: papéis de acesso
const ROLE_LABEL: Record<string, string> = {
  admin: 'Admin',
  operacional: 'Operacional',
  vendedor: 'Vendedor',
  gerencia: 'Gerência',
};

interface LiveInfo {
  profile_name: string | null;
  profile_pic_url: string | null;
  phone_number: string | null;
}

const STATUS_LABEL: Record<string, string> = {
  connected:    'Conectado',
  disconnected: 'Desconectado',
  waiting_qr:  'Aguardando QR',
  connecting:   'Conectando...',
};

const STATUS_COLOR: Record<string, string> = {
  connected:    'var(--accent)',
  disconnected: 'var(--red)',
  waiting_qr:   'var(--amber)',
  connecting:   'var(--amber)',
};

export default function ConfigView() {
  const { toasts, dismiss, success, error: showError } = useToast();

  const [instances, setInstances]       = useState<Instance[]>([]);
  const [loading, setLoading]           = useState(true);
  const [qrMap, setQrMap]               = useState<Record<string, string | null>>({});
  const [loadingId, setLoadingId]       = useState<string | null>(null);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);
  const [liveInfo, setLiveInfo]         = useState<Record<string, LiveInfo>>({});
  const [editingId, setEditingId]       = useState<string | null>(null);
  const [editName, setEditName]         = useState('');
  const [savingId, setSavingId]         = useState<string | null>(null);
  const [blastDelay, setBlastDelay]     = useState(2000);
  const [maxDaily, setMaxDaily]         = useState(500);
  const [savingSettings, setSavingSettings] = useState(false);
  const pollRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  // M1: vínculo instância↔vendedor (admin) — filtra as conversas do operador
  const [isAdmin, setIsAdmin]           = useState(false);
  const [profiles, setProfiles]         = useState<ProfileOption[]>([]);
  const [savingOwnerId, setSavingOwnerId] = useState<string | null>(null);

  const [allProfiles, setAllProfiles] = useState<ProfileOption[]>([]);
  const loadProfiles = useCallback(() => {
    fetch('/api/profiles')
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        const all: ProfileOption[] = d?.profiles || [];
        setAllProfiles(all);
        setProfiles(all.filter(p => p.is_active !== false));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => (r.ok ? r.json() : null))
      .then(d => setIsAdmin(d?.profile?.role === 'admin'))
      .catch(() => {});
    loadProfiles();
  }, [loadProfiles]);

  // F1: vendedor da carteira Mercos (disparo por vendedor)
  const [vendedorNames, setVendedorNames] = useState<{ vendedor: string; count: number }[]>([]);
  const [savingVendedorId, setSavingVendedorId] = useState<string | null>(null);
  useEffect(() => {
    fetch('/api/contacts/segmentos')
      .then(r => (r.ok ? r.json() : { vendedores: [] }))
      .then(d => setVendedorNames(d.vendedores || []))
      .catch(() => {});
  }, []);

  const saveVendedorNome = async (inst: Instance, vendedor: string) => {
    setSavingVendedorId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, vendedor_nome: vendedor || null }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, vendedor_nome: vendedor || null } : i));
        success(vendedor
          ? `Carteira de ${vendedor} → ${inst.display_name || inst.uazapi_name}.`
          : `Carteira desvinculada de ${inst.display_name || inst.uazapi_name}.`);
      } else {
        showError('Erro ao salvar a carteira.');
      }
    } finally { setSavingVendedorId(null); }
  };

  const saveOwner = async (inst: Instance, ownerId: string) => {
    setSavingOwnerId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, owner_profile_id: ownerId || null }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, owner_profile_id: ownerId || null } : i));
        const who = profiles.find(p => p.id === ownerId);
        success(ownerId
          ? `${inst.display_name || inst.uazapi_name} vinculado a ${who?.full_name || who?.email}.`
          : `Vínculo removido de ${inst.display_name || inst.uazapi_name}.`);
      } else {
        showError('Erro ao salvar vínculo.');
      }
    } finally { setSavingOwnerId(null); }
  };

  const loadInstances = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/instances');
      if (r.ok) setInstances(await r.json());
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadInstances(); return () => { Object.values(pollRef.current).forEach(clearInterval); }; }, [loadInstances]);

  const fetchQR = async (inst: Instance) => {
    if (loadingId) return;
    setLoadingId(inst.id);
    try {
      const r = await fetch(`/api/instances/qr?id=${inst.id}`);
      const d = await r.json();

      if (d.status === 'connected') {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, status: 'connected' } : i));
        setQrMap(m => ({ ...m, [inst.id]: null }));
        success(`${inst.display_name || inst.uazapi_name} conectado!`);
        return;
      }

      if (d.qr) {
        setQrMap(m => ({ ...m, [inst.id]: d.qr }));
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, status: 'waiting_qr' } : i));
        startPolling(inst);
      } else {
        showError('Não foi possível gerar o QR code. Verifique se a instância está ativa no UazapiGO.');
      }
    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoadingId(null);
    }
  };

  const syncStatus = async (inst: Instance) => {
    try {
      const r = await fetch(`/api/instances/status?id=${inst.id}`);
      if (!r.ok) return;
      const d = await r.json();
      setInstances(prev => prev.map(i => i.id === inst.id
        ? { ...i, status: d.status, phone_number: d.phone_number ?? i.phone_number }
        : i
      ));
      if (d.profile_name || d.profile_pic_url || d.phone_number) {
        setLiveInfo(m => ({ ...m, [inst.id]: { profile_name: d.profile_name, profile_pic_url: d.profile_pic_url, phone_number: d.phone_number } }));
      }
    } catch {}
  };

  const disconnect = async (inst: Instance) => {
    if (!confirm(`Desconectar "${inst.display_name || inst.uazapi_name}"?`)) return;
    setDisconnectingId(inst.id);
    try {
      const r = await fetch('/api/instances/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, status: 'disconnected', phone_number: null } : i));
        setQrMap(m => ({ ...m, [inst.id]: null }));
        setLiveInfo(m => { const n = { ...m }; delete n[inst.id]; return n; });
        success(`${inst.display_name || inst.uazapi_name} desconectado.`);
      } else {
        showError('Erro ao desconectar.');
      }
    } finally { setDisconnectingId(null); }
  };

  // #15: desativar/reativar (some do wizard e das listas, preserva histórico)
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
  const toggleActive = async (inst: Instance) => {
    const next = inst.is_active === false;
    if (!next && !confirm(`Desativar "${inst.display_name || inst.uazapi_name}"?\n\nO número some do wizard de disparo e das listas, mas a sessão e o histórico ficam preservados. Dá para reativar quando quiser.`)) return;
    setTogglingActiveId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, is_active: next }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, is_active: next } : i));
        success(next
          ? `${inst.display_name || inst.uazapi_name} reativado.`
          : `${inst.display_name || inst.uazapi_name} desativado — não aparece mais nos disparos.`);
      } else {
        showError('Erro ao salvar.');
      }
    } finally { setTogglingActiveId(null); }
  };

  // #15: remover de vez (apaga no servidor UazapiGO + remoção lógica no banco)
  const [removingId, setRemovingId] = useState<string | null>(null);
  const removeInstance = async (inst: Instance) => {
    const nome = inst.display_name || inst.uazapi_name;
    if (!confirm(`REMOVER "${nome}" de vez?\n\nA instância é apagada no servidor UazapiGO (o WhatsApp desconecta) e some da plataforma. O histórico de campanhas e mensagens é preservado.`)) return;
    const typed = prompt(`Para confirmar, digite o nome técnico da instância: ${inst.uazapi_name}`);
    if (typed?.trim() !== inst.uazapi_name) { if (typed !== null) showError('Nome não confere — nada foi removido.'); return; }
    setRemovingId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id }),
      });
      const d = await r.json();
      if (r.ok) {
        setInstances(prev => prev.filter(i => i.id !== inst.id));
        success(`${nome} removido (${d.note || 'ok'}).`);
      } else {
        showError(d.error || 'Erro ao remover.');
      }
    } catch (e: any) {
      showError(e.message);
    } finally { setRemovingId(null); }
  };

  // #11: teste manual de entrega — revalida número com badge Restrita
  const [testingId, setTestingId] = useState<string | null>(null);
  const testDelivery = async (inst: Instance) => {
    const last = localStorage.getItem('az-test-phone') || '';
    const phone = prompt('Número de CONTROLE que vai receber a mensagem de teste (com DDD — use um WhatsApp seu, aberto agora):', last);
    if (!phone?.trim()) return;
    localStorage.setItem('az-test-phone', phone.trim());
    setTestingId(inst.id);
    try {
      const r = await fetch('/api/instances/test-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, phone: phone.trim() }),
      });
      const d = await r.json();
      if (!r.ok) { showError(d.error || 'Falha no teste'); return; }
      if (d.delivered) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, restricted_at: null, restricted_reason: null } : i));
        success(d.cleared_restriction
          ? `Entrega confirmada (${d.status}) — badge Restrita removido. Número liberado.`
          : `Entrega confirmada (${d.status}). Número saudável.`);
      } else {
        showError(`Envio aceito mas entrega NÃO confirmada em 40s (status: ${d.status}). ${inst.restricted_at ? 'O número segue Restrito — reaqueça, reconecte ou troque o chip.' : 'Confira o número de controle e tente de novo.'}`);
      }
    } catch (e: any) {
      showError(e.message);
    } finally { setTestingId(null); }
  };

  const startPolling = (inst: Instance) => {
    if (pollRef.current[inst.id]) clearInterval(pollRef.current[inst.id]);
    let attempts = 0;
    pollRef.current[inst.id] = setInterval(async () => {
      attempts++;
      if (attempts > 40) { clearInterval(pollRef.current[inst.id]); return; } // 2 min timeout
      try {
        const r = await fetch(`/api/instances/qr?id=${inst.id}`);
        const d = await r.json();
        if (d.status === 'connected') {
          clearInterval(pollRef.current[inst.id]);
          setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, status: 'connected' } : i));
          setQrMap(m => ({ ...m, [inst.id]: null }));
          success(`${inst.display_name || inst.uazapi_name} conectado com sucesso!`);
          // Sync profile info
          syncStatus(inst);
        }
      } catch {}
    }, 3000);
  };

  const saveName = async (inst: Instance) => {
    setSavingId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, display_name: editName.trim() || null }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, display_name: editName.trim() || null } : i));
        setEditingId(null);
        success('Nome atualizado.');
      } else {
        showError('Erro ao salvar nome.');
      }
    } finally { setSavingId(null); }
  };

  // #9 (backlog 22/07): IA de atendimento — toggle por número
  const [savingBotId, setSavingBotId] = useState<string | null>(null);
  const toggleBot = async (inst: Instance) => {
    const next = !inst.bot_enabled;
    if (next && !confirm(`Ligar a IA de atendimento em "${inst.display_name || inst.uazapi_name}"?\n\nEla passa a responder sozinha as mensagens NÃO LIDAS deste número (conversas 1:1 das últimas 24h), usando o prompt e a base de conhecimento configurados abaixo. Silencia sozinha quando um humano responder.`)) return;
    setSavingBotId(inst.id);
    try {
      const r = await fetch('/api/instances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inst.id, bot_enabled: next }),
      });
      if (r.ok) {
        setInstances(prev => prev.map(i => i.id === inst.id ? { ...i, bot_enabled: next } : i));
        success(next
          ? `IA LIGADA em ${inst.display_name || inst.uazapi_name} — responde as mensagens recebidas com a base de conhecimento.`
          : `IA desligada em ${inst.display_name || inst.uazapi_name}.`);
      } else {
        showError('Erro ao salvar a IA.');
      }
    } finally { setSavingBotId(null); }
  };

  // #5 (backlog GitHub 17/07): adicionar número novo (cria instância no
  // UazapiGO + registra no banco; conectar depois via QR no card)
  const [adding, setAdding] = useState(false);
  const addInstance = async () => {
    const display = prompt('Nome de exibição do número novo (ex.: "Gabriela IA Azeredo"):');
    if (!display?.trim()) return;
    const sugestao = `azeredo-${instances.length + 1}`;
    const name = prompt(`Nome técnico da instância no UazapiGO (letras/números/hífen):`, sugestao);
    if (!name?.trim()) return;
    setAdding(true);
    try {
      const r = await fetch('/api/instances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), display_name: display.trim() }),
      });
      const d = await r.json();
      if (!r.ok) { showError(d.error || 'Erro ao criar a instância'); return; }
      setInstances(prev => [...prev, d]);
      success(`${display.trim()} criado — clique em Conectar no card para escanear o QR.`);
    } catch (e: any) {
      showError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const connected = instances.filter(i => i.status === 'connected').length;
  const total = instances.length;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', background: 'transparent' }}>
      <Toast toasts={toasts} onDismiss={dismiss} />

      {/* Page header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--hairline)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Configurações</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {connected}/{total} números conectados
            </div>
          </div>
          <button onClick={loadInstances} style={{
            background: 'var(--surface-btn)', border: '1px solid var(--hairline)', borderRadius: 8,
            padding: '7px 14px', fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            Atualizar
          </button>
        </div>
      </div>

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* WhatsApp instances section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Números WhatsApp
            </div>
            {isAdmin && (
              <button
                onClick={addInstance}
                disabled={adding}
                style={{
                  background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
                  borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600,
                  color: 'var(--accent)', cursor: adding ? 'wait' : 'pointer', fontFamily: 'inherit',
                }}
              >
                {adding ? 'Criando…' : '+ Adicionar número'}
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Carregando instâncias...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {instances.map(inst => {
                const statusColor = STATUS_COLOR[inst.status] || 'var(--text-muted)';
                const statusLabel = STATUS_LABEL[inst.status] || inst.status;
                const qr = qrMap[inst.id];
                const isLoading = loadingId === inst.id;
                const isEditing = editingId === inst.id;
                const isSaving = savingId === inst.id;

                return (
                  <div key={inst.id} style={{
                    background: 'var(--bg-card-translucent)',
                    border: `1px solid ${inst.status === 'connected' ? 'rgba(37,211,102,0.2)' : 'var(--border)'}`,
                    borderRadius: 12, overflow: 'hidden',
                    transition: 'border-color 0.2s',
                    opacity: inst.is_active === false ? 0.55 : 1,   /* #15: desativado */
                  }}>
                    {/* Card header */}
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* Slot badge */}
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: inst.status === 'connected' ? 'rgba(37,211,102,0.12)' : 'var(--bg-secondary)',
                        border: `1px solid ${inst.status === 'connected' ? 'rgba(37,211,102,0.25)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700,
                        color: inst.status === 'connected' ? 'var(--accent-light)' : 'var(--text-muted)',
                      }}>
                        {inst.slot_number}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', gap: 6 }}>
                            <input
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') saveName(inst); if (e.key === 'Escape') setEditingId(null); }}
                              placeholder={inst.uazapi_name}
                              autoFocus
                              style={{
                                flex: 1, background: 'transparent', border: '1px solid rgba(37,211,102,0.3)',
                                borderRadius: 6, padding: '4px 8px', color: 'var(--text-primary)', fontSize: 13, outline: 'none',
                              }}
                            />
                            <button onClick={() => saveName(inst)} disabled={isSaving} style={{
                              background: 'var(--accent)', border: 'none', borderRadius: 6, padding: '4px 10px',
                              color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            }}>
                              {isSaving ? '...' : 'OK'}
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => { setEditingId(inst.id); setEditName(inst.display_name || ''); }}
                            title="Clique para editar o nome"
                            style={{ cursor: 'pointer' }}
                          >
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                              {inst.display_name || inst.uazapi_name}
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3a4a3e" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </div>
                            {inst.phone_number && (
                              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{inst.phone_number}</div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status dot */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                        {inst.is_active === false && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--amber)',
                            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                            padding: '1px 7px', borderRadius: 100,
                          }}>
                            Desativado
                          </span>
                        )}
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, boxShadow: inst.status === 'connected' ? '0 0 6px rgba(37,211,102,0.5)' : 'none' }} />
                        <span style={{ fontSize: 11, color: statusColor, fontWeight: 500 }}>{statusLabel}</span>
                      </div>
                    </div>

                    {/* B1: número restrito — aceita envio, não entrega (canário) */}
                    {inst.restricted_at && (
                      <div style={{
                        padding: '8px 16px', borderBottom: '1px solid var(--border)',
                        background: 'rgba(239,68,68,0.05)', display: 'flex', flexDirection: 'column', gap: 8,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--red)', flexShrink: 0, marginTop: 1,
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                            padding: '1px 7px', borderRadius: 100,
                          }}>
                            Restrita
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--red)', lineHeight: 1.5 }}>
                            {inst.restricted_reason || 'Envios aceitos mas não entregues.'}
                            {' '}Detectada em {new Date(inst.restricted_at).toLocaleDateString('pt-BR')} — desmarcada automaticamente na primeira entrega confirmada.
                          </span>
                        </div>
                        {/* #11: revalidação manual depois de reaquecer/trocar o chip */}
                        {inst.status === 'connected' && (
                          <button
                            onClick={() => testDelivery(inst)}
                            disabled={testingId === inst.id}
                            style={{
                              alignSelf: 'flex-start', background: 'rgba(239,68,68,0.08)',
                              border: '1px solid rgba(239,68,68,0.25)', borderRadius: 7,
                              padding: '5px 12px', fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
                              color: testingId === inst.id ? 'var(--text-muted)' : '#f0a0a0',
                              cursor: testingId === inst.id ? 'wait' : 'pointer',
                            }}
                          >
                            {testingId === inst.id ? 'Testando entrega (até 40s)…' : 'Testar entrega agora'}
                          </button>
                        )}
                      </div>
                    )}

                    {/* QR code area */}
                    {qr && inst.status === 'waiting_qr' && (
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                          Escaneie com o WhatsApp no celular
                        </div>
                        <div style={{ background: '#fff', borderRadius: 10, padding: 10 }}>
                          <img src={qr} alt="QR Code" style={{ width: 160, height: 160, display: 'block' }} />
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
                          Aguardando leitura... <span style={{ color: 'var(--accent)' }}>●</span>
                        </div>
                      </div>
                    )}

                    {/* Perfil do WhatsApp — #14: persistido no banco (não some mais
                        ao sair e voltar); o sync ao vivo só atualiza por cima */}
                    {inst.status === 'connected' && (() => {
                      const pic  = liveInfo[inst.id]?.profile_pic_url || inst.profile_pic_url || null;
                      const name = liveInfo[inst.id]?.profile_name || inst.profile_name || null;
                      const fone = liveInfo[inst.id]?.phone_number || inst.phone_number || null;
                      if (!pic && !name) return null;
                      return (
                        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                          {pic && (
                            <img
                              src={pic}
                              alt="perfil"
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                              style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(37,211,102,0.3)', flexShrink: 0 }}
                            />
                          )}
                          <div style={{ minWidth: 0 }}>
                            {name && (
                              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {name}
                              </div>
                            )}
                            {fone && (
                              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{fone}</div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* M1: vendedor vinculado (as conversas dele mostram só este número) */}
                    {isAdmin && (
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, flexShrink: 0 }}>
                          Vendedor
                        </span>
                        <select
                          value={inst.owner_profile_id || ''}
                          disabled={savingOwnerId === inst.id}
                          onChange={e => saveOwner(inst, e.target.value)}
                          style={{
                            flex: 1, background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 6,
                            padding: '5px 8px', color: inst.owner_profile_id ? 'var(--accent-light)' : 'var(--text-muted)',
                            fontSize: 11, outline: 'none', fontFamily: 'inherit',
                            cursor: savingOwnerId === inst.id ? 'wait' : 'pointer',
                          }}
                        >
                          <option value="">— sem vínculo (todos veem) —</option>
                          {profiles.map(p => (
                            <option key={p.id} value={p.id}>
                              {(p.full_name || p.email)}{p.role === 'admin' ? ' (admin)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* F1: vendedor da CARTEIRA Mercos — roteia o disparo por vendedor */}
                    {isAdmin && (
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, flexShrink: 0 }} title="Vendedor da carteira Mercos — os clientes dele recebem disparos por este número quando o disparo por vendedor está ativo">
                          Carteira
                        </span>
                        <select
                          value={inst.vendedor_nome || ''}
                          disabled={savingVendedorId === inst.id}
                          onChange={e => saveVendedorNome(inst, e.target.value)}
                          style={{
                            flex: 1, background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 6,
                            padding: '5px 8px', color: inst.vendedor_nome ? 'var(--accent-light)' : 'var(--text-muted)',
                            fontSize: 11, outline: 'none', fontFamily: 'inherit',
                            cursor: savingVendedorId === inst.id ? 'wait' : 'pointer',
                          }}
                        >
                          <option value="">— sem carteira —</option>
                          {vendedorNames.map(v => (
                            <option key={v.vendedor} value={v.vendedor}>{v.vendedor} ({v.count})</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* #9: IA de atendimento por número */}
                    {isAdmin && (
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, flexShrink: 0 }} title="Responde as mensagens recebidas com a IA (prompt + base de conhecimento configurados abaixo); silencia sozinha quando um humano responder">
                          IA
                        </span>
                        <span style={{ flex: 1, fontSize: 11, color: inst.bot_enabled ? 'var(--accent-light)' : 'var(--text-muted)' }}>
                          {inst.bot_enabled ? 'atendimento ativo' : 'desligada'}
                        </span>
                        <button
                          onClick={() => toggleBot(inst)}
                          disabled={savingBotId === inst.id}
                          style={{
                            width: 34, height: 19, borderRadius: 100, border: 'none', padding: 2,
                            cursor: savingBotId === inst.id ? 'wait' : 'pointer',
                            background: inst.bot_enabled ? 'var(--accent)' : 'var(--border)',
                            display: 'flex', justifyContent: inst.bot_enabled ? 'flex-end' : 'flex-start',
                            transition: 'all 0.15s', flexShrink: 0,
                          }}
                        >
                          <span style={{ width: 15, height: 15, borderRadius: '50%', background: '#fff', display: 'block' }} />
                        </button>
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                      {inst.status !== 'connected' ? (
                        <button
                          onClick={() => fetchQR(inst)}
                          disabled={!!isLoading}
                          style={{
                            flex: 1, background: isLoading ? 'var(--bg-secondary)' : 'rgba(37,211,102,0.12)',
                            border: '1px solid rgba(37,211,102,0.2)', borderRadius: 8,
                            padding: '8px 0', fontSize: 12, fontWeight: 600,
                            color: isLoading ? 'var(--text-muted)' : 'var(--accent)',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {isLoading ? 'Carregando...' : qr ? 'Atualizar QR' : 'Conectar'}
                        </button>
                      ) : (
                        <>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Pronto para disparar
                          </div>
                          {/* Disconnect button */}
                          <button
                            onClick={() => disconnect(inst)}
                            disabled={disconnectingId === inst.id}
                            title="Desconectar"
                            style={{
                              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                              borderRadius: 8, padding: '8px 10px', cursor: 'pointer',
                              color: disconnectingId === inst.id ? 'var(--text-muted)' : 'var(--red)',
                            }}
                          >
                            {/* Power icon */}
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                          </button>
                        </>
                      )}
                      {/* Sync/refresh button */}
                      <button
                        onClick={() => inst.status === 'connected' ? syncStatus(inst) : fetchQR(inst)}
                        title="Verificar status"
                        style={{ background: 'var(--surface-btn)', border: '1px solid var(--hairline)', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: 'var(--text-muted)' }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                      </button>
                    </div>

                    {/* #15: desativar/reativar + remover (admin) */}
                    {isAdmin && (
                      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => toggleActive(inst)}
                          disabled={togglingActiveId === inst.id}
                          style={{
                            flex: 1, background: 'transparent',
                            border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8,
                            padding: '6px 0', fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
                            color: togglingActiveId === inst.id ? 'var(--text-muted)' : 'var(--amber)',
                            cursor: togglingActiveId === inst.id ? 'wait' : 'pointer',
                          }}
                        >
                          {togglingActiveId === inst.id ? '…' : inst.is_active === false ? 'Reativar' : 'Desativar'}
                        </button>
                        <button
                          onClick={() => removeInstance(inst)}
                          disabled={removingId === inst.id}
                          title="Apaga a instância no servidor UazapiGO e remove da plataforma (histórico preservado)"
                          style={{
                            flex: 1, background: 'transparent',
                            border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8,
                            padding: '6px 0', fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
                            color: removingId === inst.id ? 'var(--text-muted)' : 'var(--red)',
                            cursor: removingId === inst.id ? 'wait' : 'pointer',
                          }}
                        >
                          {removingId === inst.id ? 'Removendo…' : 'Remover'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {connected > 0 && (
            <div style={{ marginTop: 14, background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.12)', borderRadius: 10, padding: '10px 16px', fontSize: 12, color: 'var(--accent-light)' }}>
              ✓ {connected} número{connected !== 1 ? 's' : ''} pronto{connected !== 1 ? 's' : ''} para disparos. Os disparos serão distribuídos automaticamente entre os números conectados.
            </div>
          )}
        </div>

        {/* Blast settings */}
        <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Configurações de Disparo</div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Intervalo entre mensagens</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Milissegundos entre cada envio (mínimo 1000ms)</div>
              </div>
              <input
                type="number" min={1000} max={10000} step={500}
                value={blastDelay}
                onChange={e => setBlastDelay(Number(e.target.value))}
                style={{ width: 120, background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13, outline: 'none', textAlign: 'right' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Máximo de mensagens por dia</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Limite diário de disparos por segurança</div>
              </div>
              <input
                type="number" min={10} max={2000} step={50}
                value={maxDaily}
                onChange={e => setMaxDaily(Number(e.target.value))}
                style={{ width: 120, background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13, outline: 'none', textAlign: 'right' }}
              />
            </div>
            <button
              onClick={async () => { setSavingSettings(true); await new Promise(r => setTimeout(r, 400)); setSavingSettings(false); success('Configurações salvas.'); }}
              disabled={savingSettings}
              style={{ background: 'var(--accent)', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, color: '#fff', cursor: savingSettings ? 'not-allowed' : 'pointer', opacity: savingSettings ? 0.6 : 1 }}
            >
              {savingSettings ? 'Salvando...' : 'Salvar configurações'}
            </button>
          </div>
        </div>

        {/* #9: IA de atendimento (config universal — o toggle é por número, acima) */}
        {isAdmin && <AIConfigCard onSaved={() => success('Configuração da IA salva.')} onError={showError} />}

        {/* #18: usuários e perfis de acesso */}
        {isAdmin && (
          <UsersCard
            profiles={allProfiles}
            onChanged={loadProfiles}
            onSaved={m => success(m)}
            onError={showError}
          />
        )}

      </div>
    </div>
  );
}

// ─── #18: usuários e perfis de acesso ────────────────────────────────────────

function UsersCard({ profiles, onChanged, onSaved, onError }: {
  profiles: ProfileOption[];
  onChanged: () => void;
  onSaved: (m: string) => void;
  onError: (m: string) => void;
}) {
  const [savingId, setSavingId] = useState<string | null>(null);

  const setRole = async (p: ProfileOption, role: string) => {
    if (role === p.role) return;
    setSavingId(p.id);
    try {
      const r = await fetch(`/api/profiles/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const d = await r.json();
      if (!r.ok) { onError(d.error || 'Erro ao salvar o papel'); return; }
      onChanged();
      onSaved(`${p.full_name || p.email} agora é ${ROLE_LABEL[role] || role}.`);
    } finally { setSavingId(null); }
  };

  return (
    <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Usuários e perfis de acesso</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Admin</strong>: tudo · {' '}
          <strong style={{ color: 'var(--text-secondary)' }}>Operacional</strong>: disparos, conversas (todos os números, só guia Campanha), contatos, funil, templates, ferramentas e configurações · {' '}
          <strong style={{ color: 'var(--text-secondary)' }}>Vendedor</strong>: disparos, conversas do próprio número, contatos, funil e templates · {' '}
          <strong style={{ color: 'var(--text-secondary)' }}>Gerência</strong>: vendedor + dashboard.
        </div>
      </div>
      <div style={{ padding: '8px 20px 14px' }}>
        {profiles.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: p.is_active === false ? 'var(--text-muted)' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.full_name || p.email}
                {p.is_active === false && <span style={{ marginLeft: 6, fontSize: 10, color: 'var(--amber)' }}>inativo</span>}
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.email}</div>
            </div>
            <select
              value={p.role}
              disabled={savingId === p.id}
              onChange={e => setRole(p, e.target.value)}
              style={{
                background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 6,
                padding: '5px 8px', color: p.role === 'admin' ? 'var(--accent-light)' : 'var(--text-secondary)',
                fontSize: 11, outline: 'none', fontFamily: 'inherit',
                cursor: savingId === p.id ? 'wait' : 'pointer',
              }}
            >
              {Object.entries(ROLE_LABEL).map(([v, label]) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── #9: IA de atendimento (substitui o chatbot de menu do #7) ───────────────

function AIConfigCard({ onSaved, onError }: { onSaved: () => void; onError: (m: string) => void }) {
  const [cfg, setCfg] = useState<AiConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/bot/ai-config')
      .then(r => (r.ok ? r.json() : { config: null }))
      .then(d => setCfg(d.config || { prompt: '', knowledge: '', handoff_hours: 24, model: 'gpt-4o-mini' }))
      .catch(() => setCfg({ prompt: '', knowledge: '', handoff_hours: 24, model: 'gpt-4o-mini' }));
  }, []);

  const save = async () => {
    if (!cfg) return;
    setSaving(true);
    try {
      const r = await fetch('/api/bot/ai-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cfg),
      });
      const d = await r.json();
      if (!r.ok) { onError(d.error || 'Erro ao salvar'); return; }
      onSaved();
    } finally { setSaving(false); }
  };

  if (!cfg) return null;

  const ta = (minHeight: number) => ({
    width: '100%', minHeight, background: 'transparent',
    border: '1px solid var(--hairline)', borderRadius: 8, padding: '9px 12px',
    color: 'var(--text-primary)', fontSize: 13, outline: 'none', resize: 'vertical' as const,
    fontFamily: 'inherit', lineHeight: 1.5, boxSizing: 'border-box' as const,
  });

  return (
    <div style={{ background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>IA de atendimento — comportamento e conhecimento</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.5 }}>
          Quando a IA está ligada num número (toggle nos cards acima), ela responde sozinha as mensagens
          recebidas usando o prompt e a base de conhecimento abaixo — que valem para TODOS os números.
          Assim que um humano responder na conversa, a IA silencia sozinha. Sem webhook do WhatsApp, a
          resposta leva alguns segundos com a plataforma aberta (e até ~15 min fora do expediente, via
          rotina automática).
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Prompt de comportamento (personalidade, tom, o que pode e o que não pode)
          </div>
          <textarea
            value={cfg.prompt}
            onChange={e => setCfg(c => c ? { ...c, prompt: e.target.value } : c)}
            placeholder={'Ex.: Você é a atendente virtual da Azeredo Representações (Santa Maria/RS). Seja cordial e objetiva. Colete o nome da loja e a cidade do cliente, responda dúvidas sobre as representadas usando a base de conhecimento e avise que um vendedor dá sequência ao pedido. Nunca negocie preços ou prazos por conta própria.'}
            style={ta(96)}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            Base de conhecimento (produtos, representadas, condições, horários, perguntas frequentes)
          </div>
          <textarea
            value={cfg.knowledge}
            onChange={e => setCfg(c => c ? { ...c, knowledge: e.target.value } : c)}
            placeholder={'Cole aqui o que a IA pode usar nas respostas — representadas e segmentos, condições comerciais, prazos de entrega, horário de atendimento, respostas para as perguntas mais comuns. A IA não inventa: o que não estiver aqui, ela diz que vai verificar com a equipe.'}
            style={ta(160)}
          />
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4, textAlign: 'right' }}>
            {cfg.knowledge.length.toLocaleString('pt-BR')} / 24.000 caracteres
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Modelo</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>gpt-4o-mini resolve o dia a dia; gpt-4o responde melhor perguntas difíceis (custa mais)</div>
          </div>
          <select
            value={cfg.model}
            onChange={e => setCfg(c => c ? { ...c, model: e.target.value } : c)}
            style={{ background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13, outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            <option value="gpt-4o-mini">gpt-4o-mini (padrão)</option>
            <option value="gpt-4o">gpt-4o</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Silêncio após atendimento humano (handoff)</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Horas que a IA fica quieta na conversa depois que um humano responder</div>
          </div>
          <input
            type="number" min={1} max={72}
            value={cfg.handoff_hours}
            onChange={e => setCfg(c => c ? { ...c, handoff_hours: Number(e.target.value) } : c)}
            style={{ width: 80, background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13, outline: 'none', textAlign: 'right' }}
          />
        </div>

        <button
          onClick={save}
          disabled={saving}
          style={{ background: 'var(--accent)', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Salvando…' : 'Salvar configuração da IA'}
        </button>
      </div>
    </div>
  );
}
