import { useState, useEffect, useRef } from 'react';
import { Toast, useToast } from '../ui/Toast';

interface Template {
  id: string;
  name: string;
  body: string;
  category: string;
  media_url: string | null;
  media_type: 'image' | 'video' | null;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: 'geral',      label: 'Geral' },
  { value: 'promocao',   label: 'Promoção' },
  { value: 'reativacao', label: 'Reativação' },
  { value: 'tabela',     label: 'Troca de Tabela' },
  { value: 'lancamento', label: 'Lançamento' },
  { value: 'follow_up',  label: 'Follow-up' },
];

const VARIABLES = [
  { token: '{{nome_fantasia}}', label: 'Nome Fantasia' },
  { token: '{{primeiro_nome}}', label: 'Primeiro nome' },
  { token: '{{cidade}}',        label: 'Cidade' },
  { token: '{{estado}}',        label: 'Estado' },
  { token: '{{contato}}',       label: 'Contato' },
  { token: '{{segmento}}',      label: 'Segmento' },
  { token: '{{periodo_dia}}',   label: 'Período do dia' },
];

const CAT_COLORS: Record<string, string> = {
  geral: 'var(--text-muted)', promocao: '#4A90FF', reativacao: 'var(--amber)',
  tabela: 'var(--green)', lancamento: '#8b5cf6', follow_up: '#06b6d4',
};

const S = {
  root: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', background: 'var(--bg-primary)' },
  header: {
    padding: '20px 24px', borderBottom: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  },
  title: { fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' },
  btnPrimary: {
    padding: '8px 16px', borderRadius: '8px', border: 'none',
    background: '#4A90FF', color: '#fff', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px',
  },
  grid: { flex: 1, overflow: 'auto', padding: '20px 24px', display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', alignContent: 'start' },
  card: {
    background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px',
    padding: '16px', display: 'flex', flexDirection: 'column' as const, gap: '10px',
    transition: 'border-color 0.15s',
  },
  cardHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' },
  cardName: { fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 },
  badge: (color: string) => ({
    display: 'inline-flex', padding: '2px 8px', borderRadius: '4px',
    fontSize: '11px', fontWeight: 500, background: color + '18', color,
    border: `1px solid ${color}33`, flexShrink: 0,
  }),
  body: {
    fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6,
    background: 'var(--bg-primary)', borderRadius: '6px', padding: '10px 12px',
    fontFamily: 'inherit', whiteSpace: 'pre-wrap' as const,
    maxHeight: '100px', overflow: 'hidden',
  },
  actions: { display: 'flex', gap: '8px' },
  btnSm: (danger?: boolean) => ({
    padding: '5px 10px', borderRadius: '6px', border: `1px solid ${danger ? 'var(--red)33' : 'var(--border)'}`,
    background: 'transparent', color: danger ? 'var(--red)' : 'var(--text-muted)',
    fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit',
  }),
  empty: { padding: '60px 24px', textAlign: 'center' as const, color: 'var(--text-faint)', fontSize: '14px' },
  // Modal
  overlay: {
    position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px',
  },
  modal: {
    background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px',
    width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column' as const, gap: '20px', padding: '24px',
  },
  modalTitle: { fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' },
  label: { fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block', letterSpacing: '0.01em' },
  fieldInput: {
    width: '100%', padding: '9px 12px', background: 'var(--bg-primary)',
    border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)',
    fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  fieldSelect: {
    width: '100%', padding: '9px 12px', background: 'var(--bg-primary)',
    border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)',
    fontSize: '13px', outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
  },
  fieldTextarea: {
    width: '100%', padding: '9px 12px', background: 'var(--bg-primary)',
    border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)',
    fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' as const,
    minHeight: '120px',
  },
  varChips: { display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginTop: '8px' },
  varChip: {
    padding: '3px 8px', borderRadius: '4px', fontSize: '11px',
    background: 'rgba(74,144,255,0.1)', color: '#6AADFF',
    border: '1px solid rgba(74,144,255,0.2)', cursor: 'pointer', fontFamily: 'monospace',
  },
  preview: {
    background: 'var(--bg-primary)', borderRadius: '8px', padding: '10px 12px',
    fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6,
    whiteSpace: 'pre-wrap' as const, minHeight: '60px',
    border: '1px solid var(--border)',
  },
  modalFooter: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  btnCancel: {
    padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)',
    background: 'transparent', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnSave: {
    padding: '8px 16px', borderRadius: '8px', border: 'none',
    background: '#4A90FF', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
  },
};

interface ModalState {
  open: boolean;
  mode: 'create' | 'edit';
  template: Template | null;
}

export default function TemplatesView() {
  const { toasts, dismiss, success, error: showError } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ open: false, mode: 'create', template: null });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formCat, setFormCat] = useState('geral');
  const [formMediaUrl, setFormMediaUrl]   = useState<string | null>(null);
  const [formMediaType, setFormMediaType] = useState<'image' | 'video' | null>(null);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // M2: mídia do template — sobe para o bucket az-media e guarda a URL pública
  async function uploadMedia(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Falha no upload');
      setFormMediaUrl(d.url);
      setFormMediaType(d.media_type);
      success('Mídia anexada.');
    } catch (e: any) {
      showError(e.message);
    } finally {
      setUploading(false);
    }
  }

  function load() {
    setLoading(true);
    fetch('/api/templates')
      .then(r => r.json())
      .then(d => { setTemplates(d.templates || []); setLoading(false); })
      .catch(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setFormName(''); setFormBody(''); setFormCat('geral');
    setFormMediaUrl(null); setFormMediaType(null);
    setModal({ open: true, mode: 'create', template: null });
  }

  function openEdit(t: Template) {
    setFormName(t.name); setFormBody(t.body); setFormCat(t.category);
    setFormMediaUrl(t.media_url || null); setFormMediaType(t.media_type || null);
    setModal({ open: true, mode: 'edit', template: t });
  }

  function closeModal() {
    setModal({ open: false, mode: 'create', template: null });
  }

  function insertVariable(token: string) {
    const el = textareaRef.current;
    if (!el) { setFormBody(prev => prev + token); return; }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = formBody.slice(0, start) + token + formBody.slice(end);
    setFormBody(next);
    setTimeout(() => {
      el.selectionStart = el.selectionEnd = start + token.length;
      el.focus();
    }, 0);
  }

  async function save() {
    if (!formName.trim() || !formBody.trim()) return;
    setSaving(true);
    try {
      const isEdit = modal.mode === 'edit' && modal.template;
      const url = isEdit ? `/api/templates/${modal.template!.id}` : '/api/templates';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName, body: formBody, category: formCat,
          media_url: formMediaUrl, media_type: formMediaType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar');
      success(isEdit ? 'Template atualizado!' : 'Template criado!');
      load();
      closeModal();
    } catch (e: any) {
      showError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteTemplate(id: string) {
    try {
      const res = await fetch(`/api/templates/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover');
      success('Template removido.');
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (e: any) {
      showError(e.message);
    } finally {
      setDeleteConfirm(null);
    }
  }

  const catLabel = (c: string) => CATEGORIES.find(x => x.value === c)?.label || c;

  return (
    <div style={S.root}>
      <Toast toasts={toasts} onDismiss={dismiss} />

      <div style={S.header}>
        <span style={S.title}>Templates ({templates.length})</span>
        <button style={S.btnPrimary} onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo template
        </button>
      </div>

      <div style={S.grid}>
        {loading ? (
          <div style={S.empty}>Carregando...</div>
        ) : templates.length === 0 ? (
          <div style={{ ...S.empty, gridColumn: '1 / -1' }}>Nenhum template criado ainda.</div>
        ) : templates.map(t => (
          <div key={t.id} style={S.card}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2e')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={S.cardHeader}>
              <span style={S.cardName}>{t.name}</span>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {t.media_url && (
                  <span style={S.badge('var(--accent)')} title={t.media_type === 'video' ? 'Template com vídeo' : 'Template com imagem'}>
                    {t.media_type === 'video' ? 'vídeo' : 'imagem'}
                  </span>
                )}
                <span style={S.badge(CAT_COLORS[t.category] || 'var(--text-muted)')}>{catLabel(t.category)}</span>
              </div>
            </div>
            {t.media_url && t.media_type === 'image' && (
              <img src={t.media_url} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }} />
            )}
            <div style={S.body}>{t.body}</div>
            <div style={S.actions}>
              <button style={S.btnSm()} onClick={() => openEdit(t)}>Editar</button>
              {deleteConfirm === t.id ? (
                <>
                  <button style={S.btnSm(true)} onClick={() => deleteTemplate(t.id)}>Confirmar</button>
                  <button style={S.btnSm()} onClick={() => setDeleteConfirm(null)}>Cancelar</button>
                </>
              ) : (
                <button style={S.btnSm(true)} onClick={() => setDeleteConfirm(t.id)}>Remover</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal.open && (
        <div style={S.overlay} onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div style={S.modal}>
            <span style={S.modalTitle}>{modal.mode === 'create' ? 'Novo template' : 'Editar template'}</span>

            <div>
              <label style={S.label}>Nome</label>
              <input
                style={S.fieldInput}
                placeholder="Ex: Promoção de Março"
                value={formName}
                onChange={e => setFormName(e.target.value)}
              />
            </div>

            <div>
              <label style={S.label}>Categoria</label>
              <select style={S.fieldSelect} value={formCat} onChange={e => setFormCat(e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div>
              <label style={S.label}>Corpo da mensagem</label>
              <textarea
                ref={textareaRef}
                style={S.fieldTextarea}
                placeholder="Olá, {{primeiro_nome}}! ..."
                value={formBody}
                onChange={e => setFormBody(e.target.value)}
              />
              <div style={S.varChips}>
                {VARIABLES.map(v => (
                  <span key={v.token} style={S.varChip} onClick={() => insertVariable(v.token)} title={v.label}>
                    {v.token}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label style={S.label}>Imagem ou vídeo (opcional — enviado com a mensagem)</label>
              {formMediaUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {formMediaType === 'image' ? (
                    <img src={formMediaUrl} alt="mídia do template" style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }} />
                  ) : (
                    <video src={formMediaUrl} style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }} muted />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formMediaType === 'image' ? 'Imagem anexada' : 'Vídeo anexado'}</span>
                    <button style={S.btnSm(true)} onClick={() => { setFormMediaUrl(null); setFormMediaType(null); }}>
                      Remover mídia
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  style={{ ...S.btnSm(), padding: '8px 14px', opacity: uploading ? 0.6 : 1 }}
                  disabled={uploading}
                  onClick={() => mediaInputRef.current?.click()}
                >
                  {uploading ? 'Enviando…' : '+ Anexar imagem/vídeo'}
                </button>
              )}
              <input
                ref={mediaInputRef} type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) uploadMedia(f); e.target.value = ''; }}
              />
              <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 6 }}>
                JPG/PNG/WebP até 5MB · MP4/MOV até 16MB. A mensagem vira legenda da mídia no WhatsApp.
              </div>
            </div>

            {formBody && (
              <div>
                <label style={S.label}>Preview</label>
                <div style={S.preview}>
                  {formBody
                    .replace(/\{\{nome_fantasia\}\}/gi, 'Loja Exemplo')
                    .replace(/\{\{primeiro_nome\}\}/gi, 'João')
                    .replace(/\{\{cidade\}\}/gi, 'Porto Alegre')
                    .replace(/\{\{estado\}\}/gi, 'RS')
                    .replace(/\{\{contato\}\}/gi, 'João Silva')
                    .replace(/\{\{segmento\}\}/gi, 'Papelaria')
                    .replace(/\{\{periodo_dia\}\}/gi, 'Bom dia')}
                </div>
              </div>
            )}

            <div style={S.modalFooter}>
              <button style={S.btnCancel} onClick={closeModal}>Cancelar</button>
              <button
                style={{ ...S.btnSave, opacity: saving || !formName.trim() || !formBody.trim() ? 0.6 : 1 }}
                onClick={save}
                disabled={saving || !formName.trim() || !formBody.trim()}
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
