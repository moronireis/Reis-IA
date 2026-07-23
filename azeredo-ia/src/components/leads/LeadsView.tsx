import { useState, useEffect, useCallback, useMemo } from 'react';
import { DndContext, DragOverlay, useDroppable, useDraggable, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';
import { Toast, useToast } from '../ui/Toast';

/**
 * Módulo Leads (F7, Checkpoint 10/07 atualizado 14/07).
 * Funil kanban com estágios personalizáveis; lead multi-segmento; conversão
 * lead → cliente no estágio ganho. Nasce no design Liquid Glass (AG).
 */

interface Stage { id: string; name: string; color: string; position: number; is_won: boolean; is_lost: boolean; }
interface Lead {
  id: string; nome: string; contato: string | null; telefone: string | null;
  cnpj: string | null; cidade: string | null; estado: string | null;
  endereco: string | null; situacao_receita: string | null; segmentos: string[];
  stage_id: string | null; position: number; notas: string | null;
  contact_id: string | null; created_at: string;
}

const SEGMENTO_SUGESTOES = ['Festa', 'Papelaria', 'Bazar', 'Brinquedos', 'Utilidades', 'Mercado'];
const STAGE_COLORS = ['#4A90FF', 'var(--amber)', 'var(--accent)', 'var(--green)', '#a78bfa', '#f472b6', 'var(--text-muted)', 'var(--red)'];

const ink = 'var(--text-primary)', sub = 'var(--text-secondary)', mut = 'var(--text-muted)';

// ─── Card ─────────────────────────────────────────────────────────────────────

function LeadCard({ lead, onOpen, dragging }: { lead: Lead; onOpen?: () => void; dragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: lead.id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onOpen}
      className="card-surface"
      style={{
        padding: '10px 12px', cursor: 'grab', userSelect: 'none',
        opacity: isDragging ? 0.35 : 1,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        boxShadow: dragging ? '0 18px 44px rgba(0,0,0,0.5)' : undefined,
        rotate: dragging ? '2deg' : undefined,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.nome}</span>
        {lead.contact_id && (
          <span title="Já virou cliente" style={{ fontSize: 9, fontWeight: 700, color: 'var(--accent-light)', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: 100, padding: '1px 6px', flexShrink: 0 }}>
            cliente
          </span>
        )}
      </div>
      {(lead.contato || lead.cidade) && (
        <div style={{ fontSize: 11, color: mut, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {[lead.contato, lead.cidade].filter(Boolean).join(' · ')}
        </div>
      )}
      {lead.segmentos.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
          {lead.segmentos.slice(0, 3).map(s => (
            <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: sub, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--hairline)', borderRadius: 100, padding: '1px 7px' }}>{s}</span>
          ))}
          {lead.segmentos.length > 3 && <span style={{ fontSize: 9.5, color: mut }}>+{lead.segmentos.length - 3}</span>}
        </div>
      )}
    </div>
  );
}

// ─── Coluna ───────────────────────────────────────────────────────────────────

function StageColumn({ stage, leads, onOpen }: { stage: Stage; leads: Lead[]; onOpen: (l: Lead) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  return (
    <div
      ref={setNodeRef}
      className="glass-panel"
      style={{
        width: 264, flexShrink: 0, display: 'flex', flexDirection: 'column',
        maxHeight: '100%', borderColor: isOver ? `${stage.color}66` : undefined,
        boxShadow: isOver ? `0 0 0 1px ${stage.color}44, 0 10px 30px rgba(0,0,0,0.35)` : undefined,
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ width: 8, height: 8, borderRadius: 3, background: stage.color, boxShadow: `0 0 8px ${stage.color}66`, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: ink, letterSpacing: '0.02em' }}>{stage.name}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: mut }}>{leads.length}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px 12px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 60 }}>
        {leads.map(l => <LeadCard key={l.id} lead={l} onOpen={() => onOpen(l)} />)}
        {leads.length === 0 && (
          <div style={{ fontSize: 11, color: mut, textAlign: 'center', padding: '18px 0', border: '1px dashed var(--hairline)', borderRadius: 10 }}>
            Arraste leads para cá
          </div>
        )}
      </div>
    </div>
  );
}

// ─── View ─────────────────────────────────────────────────────────────────────

export default function LeadsView() {
  const { toasts, dismiss, success, error: showError } = useToast();
  const [stages, setStages] = useState<Stage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'new' | 'edit' | 'stages' | null>(null);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/leads');
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro ao carregar leads');
      setStages(d.stages || []);
      setLeads(d.leads || []);
    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoading(false);
    }
  }, [showError]);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => leads.filter(l =>
    !search ||
    l.nome.toLowerCase().includes(search.toLowerCase()) ||
    (l.cidade || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.contato || '').toLowerCase().includes(search.toLowerCase())
  ), [leads, search]);

  const byStage = useMemo(() => {
    const map = new Map<string, Lead[]>();
    for (const s of stages) map.set(s.id, []);
    for (const l of filtered) {
      const key = l.stage_id && map.has(l.stage_id) ? l.stage_id : stages[0]?.id;
      if (key) map.get(key)!.push(l);
    }
    return map;
  }, [filtered, stages]);

  // ── Drag ──
  const onDragStart = (e: DragStartEvent) => {
    setActiveLead(leads.find(l => l.id === e.active.id) || null);
  };
  const onDragEnd = async (e: DragEndEvent) => {
    const lead = activeLead;
    setActiveLead(null);
    if (!lead || !e.over) return;
    const targetStage = String(e.over.id);
    if (targetStage === lead.stage_id) return;
    // Otimista
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage_id: targetStage } : l));
    const r = await fetch(`/api/leads/${lead.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage_id: targetStage }),
    });
    if (!r.ok) { showError('Erro ao mover o lead'); load(); return; }
    const st = stages.find(s => s.id === targetStage);
    if (st?.is_won && !lead.contact_id) {
      success(`${lead.nome} chegou em "${st.name}" — use "Virar cliente" no card para criar o contato.`);
    }
  };

  const openEdit = (l: Lead) => { setEditing(l); setModal('edit'); };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Toast toasts={toasts} onDismiss={dismiss} />

      {/* Toolbar */}
      <div className="glass-nav" style={{ margin: '14px 16px 0', borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: ink, letterSpacing: '-0.01em' }}>Funil</div>
          <div style={{ fontSize: 11, color: mut }}>{leads.length} lead{leads.length !== 1 ? 's' : ''} no funil</div>
        </div>
        <input
          className="input"
          style={{ width: 220, padding: '8px 12px', fontSize: 13 }}
          placeholder="Buscar nome, cidade, contato…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setModal('stages')}>Estágios</button>
          <button className="btn-primary btn" style={{ border: 'none' }} onClick={() => { setEditing(null); setModal('new'); }}>+ Novo lead</button>
        </div>
      </div>

      {/* Board */}
      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', padding: '14px 16px 18px' }}>
        {loading ? (
          <div style={{ display: 'flex', gap: 12 }}>
            {[0, 1, 2, 3].map(i => <div key={i} className="skeleton" style={{ width: 264, height: 300 }} />)}
          </div>
        ) : (
          <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', gap: 12, height: '100%', alignItems: 'stretch' }}>
              {stages.map((s, i) => (
                <div key={s.id} className="anim" style={{ ['--i' as any]: i, display: 'flex', maxHeight: '100%' }}>
                  <StageColumn stage={s} leads={byStage.get(s.id) || []} onOpen={openEdit} />
                </div>
              ))}
            </div>
            <DragOverlay>
              {activeLead && <div style={{ width: 240 }}><LeadCard lead={activeLead} dragging /></div>}
            </DragOverlay>
          </DndContext>
        )}
      </div>

      {(modal === 'new' || modal === 'edit') && (
        <LeadModal
          lead={modal === 'edit' ? editing : null}
          stages={stages}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
          onDeleted={() => { setModal(null); load(); }}
          toast={{ success, showError }}
        />
      )}
      {modal === 'stages' && (
        <StagesModal stages={stages} onClose={() => setModal(null)} onChanged={load} toast={{ success, showError }} />
      )}
    </div>
  );
}

// ─── Modal de lead (novo/editar) ─────────────────────────────────────────────

function LeadModal({ lead, stages, onClose, onSaved, onDeleted, toast }: {
  lead: Lead | null; stages: Stage[];
  onClose: () => void; onSaved: () => void; onDeleted: () => void;
  toast: { success: (m: string) => void; showError: (m: string) => void };
}) {
  const [nome, setNome] = useState(lead?.nome || '');
  const [contato, setContato] = useState(lead?.contato || '');
  const [telefone, setTelefone] = useState(lead?.telefone || '');
  const [cnpj, setCnpj] = useState(lead?.cnpj || '');
  const [cidade, setCidade] = useState(lead?.cidade || '');
  const [estado, setEstado] = useState(lead?.estado || '');
  const [endereco, setEndereco] = useState(lead?.endereco || '');
  const [situacaoReceita, setSituacaoReceita] = useState(lead?.situacao_receita || '');
  const [segmentos, setSegmentos] = useState<string[]>(lead?.segmentos || []);
  const [segCustom, setSegCustom] = useState('');
  const [notas, setNotas] = useState(lead?.notas || '');
  const [stageId, setStageId] = useState(lead?.stage_id || stages[0]?.id || '');
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);

  const stage = stages.find(s => s.id === (lead?.stage_id || stageId));
  const canConvert = !!lead && !lead.contact_id;

  const toggleSeg = (s: string) =>
    setSegmentos(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  // #4 (backlog GitHub): busca automática pela Receita — auto-preenche os
  // campos (todos continuam editáveis) e mostra a situação cadastral.
  const cnpjDigits = cnpj.replace(/\D/g, '');
  const lookupCnpj = async () => {
    if (cnpjDigits.length !== 14) { toast.showError('Informe o CNPJ completo (14 dígitos)'); return; }
    setLookingUp(true);
    try {
      const r = await fetch(`/api/leads/cnpj-lookup?cnpj=${cnpjDigits}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro na consulta');
      if (d.razao_social && !nome.trim()) setNome(d.nome_fantasia || d.razao_social);
      else if (d.razao_social && nome.trim() && confirm(`Substituir o nome pelo da Receita?\n\n${d.nome_fantasia || d.razao_social}`)) setNome(d.nome_fantasia || d.razao_social);
      if (d.telefone && !telefone.trim()) setTelefone(d.telefone);
      if (d.cidade) setCidade(d.cidade);
      if (d.estado) setEstado(d.estado);
      if (d.endereco) setEndereco(d.endereco);
      setSituacaoReceita(d.situacao || '');
      toast.success(d.ativa
        ? 'Empresa ATIVA na Receita — dados preenchidos.'
        : `Atenção: situação na Receita é ${d.situacao || 'desconhecida'}.`);
    } catch (e: any) {
      toast.showError(e.message);
    } finally {
      setLookingUp(false);
    }
  };

  const save = async () => {
    if (!nome.trim()) { toast.showError('Nome é obrigatório'); return; }
    setSaving(true);
    try {
      const payload = { nome, contato, telefone, cnpj, cidade, estado, endereco, situacao_receita: situacaoReceita, segmentos, notas, stage_id: stageId || undefined };
      const r = lead
        ? await fetch(`/api/leads/${lead.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro ao salvar');
      toast.success(lead ? 'Lead atualizado.' : 'Lead criado.');
      onSaved();
    } catch (e: any) {
      toast.showError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const convert = async () => {
    if (!lead) return;
    setConverting(true);
    try {
      const r = await fetch(`/api/leads/${lead.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ convert: true }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Erro na conversão');
      toast.success(`${lead.nome} virou cliente — já está em Contatos.`);
      onSaved();
    } catch (e: any) {
      toast.showError(e.message);
    } finally {
      setConverting(false);
    }
  };

  const del = async () => {
    if (!lead || !confirm(`Excluir o lead "${lead.nome}"?`)) return;
    const r = await fetch(`/api/leads/${lead.id}`, { method: 'DELETE' });
    if (r.ok) { toast.success('Lead excluído.'); onDeleted(); }
    else toast.showError('Erro ao excluir');
  };

  const field = (label: string, value: string, set: (v: string) => void, placeholder = '') => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: sub, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <input className="input" style={{ padding: '9px 12px', fontSize: 13 }} value={value} onChange={e => set(e.target.value)} placeholder={placeholder} />
    </div>
  );

  return (
    <div className="overlay-glass" style={{ zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div className="glass-modal anim-scale" style={{ width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', padding: '24px 26px' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: ink }}>{lead ? 'Editar lead' : 'Novo lead'}</span>
          {stage && (
            <span style={{ fontSize: 10, fontWeight: 700, color: stage.color, background: `${stage.color}18`, border: `1px solid ${stage.color}44`, borderRadius: 100, padding: '2px 9px' }}>
              {stage.name}
            </span>
          )}
        </div>

        {/* CNPJ com busca automática (Receita via BrasilAPI) — UX de CEP */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: sub, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CNPJ
            {situacaoReceita && (
              <span style={{
                marginLeft: 8, textTransform: 'none', letterSpacing: 0,
                fontSize: 10, fontWeight: 700, padding: '1px 8px', borderRadius: 100,
                color: situacaoReceita === 'ATIVA' ? 'var(--accent-light)' : 'var(--amber)',
                background: situacaoReceita === 'ATIVA' ? 'rgba(37,211,102,0.12)' : 'rgba(245,158,11,0.12)',
                border: `1px solid ${situacaoReceita === 'ATIVA' ? 'rgba(37,211,102,0.3)' : 'rgba(245,158,11,0.3)'}`,
              }}>
                {situacaoReceita === 'ATIVA' ? 'Ativa na Receita' : `Receita: ${situacaoReceita}`}
              </span>
            )}
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="input"
              style={{ flex: 1, padding: '9px 12px', fontSize: 13 }}
              value={cnpj}
              onChange={e => { setCnpj(e.target.value); setSituacaoReceita(''); }}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); lookupCnpj(); } }}
              placeholder="00.000.000/0000-00"
            />
            <button
              className="btn"
              disabled={lookingUp || cnpjDigits.length !== 14}
              onClick={lookupCnpj}
              title="Buscar dados na Receita e preencher automaticamente"
              style={{ flexShrink: 0, opacity: cnpjDigits.length === 14 ? 1 : 0.5 }}
            >
              {lookingUp ? 'Buscando…' : 'Buscar dados'}
            </button>
          </div>
        </div>

        {field('Nome', nome, setNome, 'Nome da empresa/lead')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {field('Contato', contato, setContato, 'Pessoa de contato')}
          {field('Telefone', telefone, setTelefone, '55 55 9....')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
          {field('Cidade', cidade, setCidade)}
          {field('Estado', estado, setEstado, 'UF')}
        </div>
        {field('Endereço', endereco, setEndereco, 'Rua, número — bairro — CEP')}

        {/* Segmentos multi-select */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: sub, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Segmentos (um ou mais)</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[...new Set([...SEGMENTO_SUGESTOES, ...segmentos])].map(s => (
              <button key={s} onClick={() => toggleSeg(s)} style={{
                padding: '4px 11px', borderRadius: 20, fontSize: 11.5, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                border: segmentos.includes(s) ? 'none' : '1px solid rgba(255,255,255,0.1)',
                background: segmentos.includes(s) ? 'var(--accent)' : 'transparent',
                color: segmentos.includes(s) ? '#fff' : sub, transition: 'all 0.12s',
              }}>
                {s}
              </button>
            ))}
            <input
              className="input"
              style={{ width: 110, padding: '4px 10px', fontSize: 11.5, borderRadius: 20 }}
              placeholder="outro…"
              value={segCustom}
              onChange={e => setSegCustom(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && segCustom.trim()) {
                  toggleSeg(segCustom.trim());
                  setSegCustom('');
                }
              }}
            />
          </div>
        </div>

        {/* Estágio (só no novo — no editar arrasta no funil) */}
        {!lead && stages.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: sub, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estágio inicial</label>
            <select className="input" style={{ padding: '9px 12px', fontSize: 13, cursor: 'pointer' }} value={stageId} onChange={e => setStageId(e.target.value)}>
              {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        )}

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: sub, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notas</label>
          <textarea
            className="input"
            style={{ padding: '9px 12px', fontSize: 13, minHeight: 64, resize: 'vertical' }}
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Anotações do processo…"
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn-primary btn" style={{ border: 'none' }} disabled={saving} onClick={save}>
            {saving ? 'Salvando…' : (lead ? 'Salvar' : 'Criar lead')}
          </button>
          {canConvert && (
            <button className="btn" disabled={converting} onClick={convert} title="Cria o contato em Contatos a partir deste lead">
              {converting ? 'Convertendo…' : 'Virar cliente'}
            </button>
          )}
          <div style={{ flex: 1 }} />
          {lead && (
            <button className="btn" style={{ color: 'var(--red)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={del}>Excluir</button>
          )}
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal de estágios (criar/renomear/recolorir/reordenar/excluir) ──────────

function StagesModal({ stages, onClose, onChanged, toast }: {
  stages: Stage[]; onClose: () => void; onChanged: () => void;
  toast: { success: (m: string) => void; showError: (m: string) => void };
}) {
  const [list, setList] = useState<Stage[]>(stages);
  const [newName, setNewName] = useState('');
  const [busy, setBusy] = useState(false);

  const api = async (method: string, body?: any, qs = '') => {
    const r = await fetch(`/api/leads/stages${qs}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || 'Erro');
    return d;
  };

  const rename = async (s: Stage, name: string) => {
    if (!name.trim() || name === s.name) return;
    try { await api('PATCH', { id: s.id, name: name.trim() }); onChanged(); } catch (e: any) { toast.showError(e.message); }
  };
  const recolor = async (s: Stage, color: string) => {
    setList(prev => prev.map(x => x.id === s.id ? { ...x, color } : x));
    try { await api('PATCH', { id: s.id, color }); onChanged(); } catch (e: any) { toast.showError(e.message); }
  };
  const move = async (idx: number, dir: -1 | 1) => {
    const next = [...list];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setList(next);
    try { await api('PATCH', { order: next.map(s => s.id) }); onChanged(); } catch (e: any) { toast.showError(e.message); }
  };
  const remove = async (s: Stage) => {
    if (!confirm(`Excluir o estágio "${s.name}"? Os leads dele voltam para o primeiro estágio.`)) return;
    try {
      await api('DELETE', undefined, `?id=${s.id}`);
      setList(prev => prev.filter(x => x.id !== s.id));
      onChanged();
      toast.success('Estágio excluído.');
    } catch (e: any) { toast.showError(e.message); }
  };
  const add = async () => {
    if (!newName.trim()) return;
    setBusy(true);
    try {
      const d = await api('POST', { name: newName.trim(), color: STAGE_COLORS[list.length % STAGE_COLORS.length] });
      setList(prev => [...prev, d.stage]);
      setNewName('');
      onChanged();
    } catch (e: any) { toast.showError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="overlay-glass" style={{ zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div className="glass-modal anim-scale" style={{ width: '100%', maxWidth: 440, maxHeight: '86vh', overflowY: 'auto', padding: '24px 26px' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 16, fontWeight: 700, color: ink, marginBottom: 4 }}>Estágios do funil</div>
        <div style={{ fontSize: 12, color: mut, marginBottom: 16 }}>Renomeie, recolora, reordene ou crie estágios. O estágio marcado como GANHO é onde o lead pode "virar cliente".</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {list.map((s, i) => (
            <div key={s.id} className="card-surface" style={{ padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="color"
                value={s.color}
                onChange={e => recolor(s, e.target.value)}
                title="Cor do estágio"
                style={{ width: 22, height: 22, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, flexShrink: 0 }}
              />
              <input
                className="input"
                style={{ flex: 1, padding: '6px 10px', fontSize: 13 }}
                defaultValue={s.name}
                onBlur={e => rename(s, e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
              />
              {(s.is_won || s.is_lost) && (
                <span style={{ fontSize: 9, fontWeight: 700, color: s.is_won ? 'var(--accent-light)' : '#9ca3af', flexShrink: 0 }}>
                  {s.is_won ? 'GANHO' : 'PERDA'}
                </span>
              )}
              <button className="btn" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => move(i, -1)} disabled={i === 0}>▲</button>
              <button className="btn" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => move(i, 1)} disabled={i === list.length - 1}>▼</button>
              <button className="btn" style={{ padding: '4px 8px', fontSize: 11, color: 'var(--red)', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => remove(s)} disabled={list.length <= 1}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            className="input"
            style={{ flex: 1, padding: '8px 12px', fontSize: 13 }}
            placeholder="Nome do novo estágio…"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') add(); }}
          />
          <button className="btn-primary btn" style={{ border: 'none' }} disabled={busy || !newName.trim()} onClick={add}>Adicionar</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
