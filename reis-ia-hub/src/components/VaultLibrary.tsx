import React, { useState, useMemo } from 'react';

type ResourceType = 'template' | 'framework' | 'prompt' | 'playbook' | 'tool' | 'agent';
type AccessLevel = 'all' | 'builders' | 'systems' | 'admin';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
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

interface VaultLibraryProps {
  categories: Category[];
  initialResources: Resource[];
}

const TYPE_LABELS: Record<ResourceType, string> = {
  template: 'Template',
  framework: 'Framework',
  prompt: 'Prompt',
  playbook: 'Playbook',
  tool: 'Ferramenta',
  agent: 'Agente',
};

const TYPE_COLORS: Record<ResourceType, { bg: string; color: string }> = {
  template: { bg: 'rgba(74,144,255,0.1)', color: '#4A90FF' },
  framework: { bg: 'rgba(34,197,94,0.1)', color: '#22C55E' },
  prompt: { bg: 'rgba(168,85,247,0.1)', color: '#A855F7' },
  playbook: { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  tool: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444' },
  agent: { bg: 'rgba(14,165,233,0.1)', color: '#0EA5E9' },
};

function TypeIcon({ type }: { type: ResourceType }) {
  const iconStyle = { width: '18px', height: '18px' };
  switch (type) {
    case 'template':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 'framework':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case 'prompt':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 'playbook':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'tool':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'agent':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="2" x2="9" y2="4" />
          <line x1="15" y1="2" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="22" />
          <line x1="15" y1="20" x2="15" y2="22" />
          <line x1="20" y1="9" x2="22" y2="9" />
          <line x1="20" y1="14" x2="22" y2="14" />
          <line x1="2" y1="9" x2="4" y2="9" />
          <line x1="2" y1="14" x2="4" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const [downloads, setDownloads] = useState(resource.downloads ?? 0);
  const [downloading, setDownloading] = useState(false);

  const typeStyle = TYPE_COLORS[resource.type] || { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);

    try {
      await fetch(`/api/vault/resources/${resource.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'download' }),
      });
      setDownloads(prev => prev + 1);

      if (resource.file_url) {
        window.open(resource.file_url, '_blank');
      } else if (resource.content) {
        // Download as text file
        const blob = new Blob([resource.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resource.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch { /* noop */ }
    finally { setDownloading(false); }
  };

  return (
    <div style={{
      borderRadius: '10px',
      background: '#111111',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      transition: 'border-color 200ms',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}
    >
      {/* Type badge + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: typeStyle.bg,
          color: typeStyle.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <TypeIcon type={resource.type} />
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: 500,
          padding: '3px 8px',
          borderRadius: '9999px',
          background: typeStyle.bg,
          color: typeStyle.color,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {TYPE_LABELS[resource.type] || resource.type}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '6px',
          lineHeight: 1.3,
        }}>
          {resource.title}
        </h3>
        {resource.description && (
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}>
            {resource.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
          <DownloadIcon />
          <span>{downloads} {downloads === 1 ? 'download' : 'downloads'}</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading || (!resource.file_url && !resource.content)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '7px',
            background: 'transparent',
            border: '1px solid rgba(74,144,255,0.25)',
            color: '#4A90FF',
            fontSize: '12px',
            fontWeight: 500,
            cursor: downloading || (!resource.file_url && !resource.content) ? 'not-allowed' : 'pointer',
            opacity: downloading || (!resource.file_url && !resource.content) ? 0.5 : 1,
            transition: 'background 150ms, border-color 150ms',
          }}
          onMouseEnter={e => {
            if (!downloading) {
              (e.currentTarget as HTMLElement).style.background = 'rgba(74,144,255,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,144,255,0.4)';
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,144,255,0.25)';
          }}
        >
          <DownloadIcon />
          {downloading ? 'Baixando...' : 'Baixar'}
        </button>
      </div>
    </div>
  );
}

export default function VaultLibrary({ categories, initialResources }: VaultLibraryProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    let list = initialResources;
    if (activeCategoryId !== 'all') {
      list = list.filter(r => r.category_id === activeCategoryId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
      );
    }
    return list;
  }, [initialResources, activeCategoryId, searchQuery]);

  return (
    <div>
      {/* Search + filter bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <svg
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Buscar recursos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 36px',
              borderRadius: '8px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 150ms',
            }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,144,255,0.3)'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCategoryId('all')}
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              background: activeCategoryId === 'all' ? '#4A90FF' : 'rgba(255,255,255,0.05)',
              color: activeCategoryId === 'all' ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: '13px',
              fontWeight: activeCategoryId === 'all' ? 500 : 400,
              border: '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '9999px',
                background: activeCategoryId === cat.id ? '#4A90FF' : 'rgba(255,255,255,0.05)',
                color: activeCategoryId === cat.id ? '#fff' : 'rgba(255,255,255,0.55)',
                fontSize: '13px',
                fontWeight: activeCategoryId === cat.id ? 500 : 400,
                border: '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
        {filteredResources.length} {filteredResources.length === 1 ? 'recurso' : 'recursos'}
        {searchQuery && ` para "${searchQuery}"`}
      </div>

      {/* Resources grid */}
      {filteredResources.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(74,144,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>
            {searchQuery ? 'Nenhum recurso encontrado.' : 'Nenhum recurso nesta categoria.'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
