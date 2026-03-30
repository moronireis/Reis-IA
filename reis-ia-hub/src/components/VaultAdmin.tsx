import React, { useState } from 'react';

type ResourceType = 'template' | 'framework' | 'prompt' | 'playbook' | 'tool' | 'agent';
type AccessLevel = 'all' | 'builders' | 'systems' | 'admin';

interface Category {
  id: string;
  name: string;
}

interface Resource {
  id: string;
  category_id: string;
  title: string;
  description: string;
  type: ResourceType;
  file_url?: string;
  content?: string;
  access_level: AccessLevel;
  downloads: number;
  created_at: string;
}

interface VaultAdminProps {
  initialResources: Resource[];
  categories: Category[];
}

const TYPE_LABELS: Record<string, string> = {
  template: 'Template',
  framework: 'Framework',
  prompt: 'Prompt',
  playbook: 'Playbook',
  tool: 'Ferramenta',
  agent: 'Agente',
};

const ACCESS_LABELS: Record<string, string> = {
  all: 'Todos',
  builders: 'Builders',
  systems: 'Systems',
  admin: 'Admin',
};

function inputStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    ...extra,
  };
}

function selectStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '10px 14px',
    borderRadius: '8px',
    background: '#161616',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    outline: 'none',
    ...extra,
  };
}

export default function VaultAdmin({ initialResources, categories }: VaultAdminProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'template' as ResourceType,
    category_id: categories[0]?.id || '',
    access_level: 'all' as AccessLevel,
    file_url: '',
    content: '',
  });

  const handleCreate = async () => {
    if (!newResource.title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/vault/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Erro ao criar recurso');
        return;
      }

      const created = await res.json();
      setResources(prev => [created, ...prev]);
      setNewResource({ title: '', description: '', type: 'template', category_id: categories[0]?.id || '', access_level: 'all', file_url: '', content: '' });
      setShowCreate(false);
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este recurso?')) return;
    try {
      const res = await fetch(`/api/vault/resources/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResources(prev => prev.filter(r => r.id !== id));
      }
    } catch {
      setError('Erro ao excluir recurso');
    }
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || id;

  return (
    <div>
      {error && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: '#EF4444',
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px' }}>×</button>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
          Recursos ({resources.length})
        </h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: '#4A90FF',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          + Novo Recurso
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div style={{
          padding: '20px',
          borderRadius: '12px',
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>Novo Recurso</h3>
          <input
            placeholder="Título"
            value={newResource.title}
            onChange={e => setNewResource(p => ({ ...p, title: e.target.value }))}
            style={inputStyle()}
          />
          <textarea
            placeholder="Descrição"
            value={newResource.description}
            onChange={e => setNewResource(p => ({ ...p, description: e.target.value }))}
            style={inputStyle({ resize: 'vertical', minHeight: '72px' })}
          />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select value={newResource.type} onChange={e => setNewResource(p => ({ ...p, type: e.target.value as ResourceType }))} style={selectStyle()}>
              <option value="template">Template</option>
              <option value="framework">Framework</option>
              <option value="prompt">Prompt</option>
              <option value="playbook">Playbook</option>
              <option value="tool">Ferramenta</option>
              <option value="agent">Agente</option>
            </select>
            <select value={newResource.category_id} onChange={e => setNewResource(p => ({ ...p, category_id: e.target.value }))} style={selectStyle()}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select value={newResource.access_level} onChange={e => setNewResource(p => ({ ...p, access_level: e.target.value as AccessLevel }))} style={selectStyle()}>
              <option value="all">Todos</option>
              <option value="builders">Builders</option>
              <option value="systems">Systems</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <input
            placeholder="URL do arquivo (opcional)"
            value={newResource.file_url}
            onChange={e => setNewResource(p => ({ ...p, file_url: e.target.value }))}
            style={inputStyle()}
          />
          <textarea
            placeholder="Conteúdo (se não houver URL, será baixado como .txt)"
            value={newResource.content}
            onChange={e => setNewResource(p => ({ ...p, content: e.target.value }))}
            style={inputStyle({ resize: 'vertical', minHeight: '100px' })}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowCreate(false)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '13px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button onClick={handleCreate} disabled={loading} style={{ padding: '8px 16px', borderRadius: '8px', background: '#4A90FF', color: '#fff', fontSize: '13px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Criando...' : 'Criar Recurso'}
            </button>
          </div>
        </div>
      )}

      {/* Resources table */}
      <div style={{
        borderRadius: '12px',
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 100px 80px 60px',
          gap: '16px',
          padding: '10px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          <span>Título</span>
          <span>Categoria</span>
          <span>Tipo</span>
          <span>Acesso</span>
          <span style={{ textAlign: 'right' }}>Ações</span>
        </div>

        {resources.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            Nenhum recurso. Crie o primeiro.
          </div>
        ) : (
          resources.map(resource => (
            <div key={resource.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 100px 80px 60px',
              gap: '16px',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              alignItems: 'center',
            }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {resource.title}
                </div>
                {resource.description && (
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {resource.description}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                {getCategoryName(resource.category_id)}
              </span>
              <span style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '9999px',
                background: 'rgba(74,144,255,0.08)',
                color: '#4A90FF',
                display: 'inline-block',
              }}>
                {TYPE_LABELS[resource.type] || resource.type}
              </span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                {ACCESS_LABELS[resource.access_level] || resource.access_level}
              </span>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleDelete(resource.id)}
                  style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.35)', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'color 150ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EF4444'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(239,68,68,0.35)'}
                  title="Excluir recurso"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
