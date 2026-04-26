import { useState, useEffect } from 'react';

interface SwipeEntry {
  projectName: string;
  projectId: string;
  pageUrl: string;
  pageType: string;
  hookType: string;
  framework: string;
  headlineScore: number;
  swipeWorthy: string[];
  summary: string;
}

export default function CopySwipeFile() {
  const [entries, setEntries] = useState<SwipeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadSwipeFile();
  }, []);

  async function loadSwipeFile() {
    try {
      const projectsRes = await fetch('/api/projects');
      const { projects } = await projectsRes.json();

      const allEntries: SwipeEntry[] = [];

      for (const project of projects || []) {
        if (project.status !== 'complete') continue;
        const res = await fetch(`/api/projects/${project.id}`);
        const data = await res.json();

        for (const page of data.pages || []) {
          if (!page.copy_analysis) continue;
          const ca = page.copy_analysis;
          allEntries.push({
            projectName: project.name,
            projectId: project.id,
            pageUrl: page.url,
            pageType: page.page_type || 'other',
            hookType: ca.hookType || 'unknown',
            framework: ca.framework || 'unknown',
            headlineScore: ca.headlineScore || 0,
            swipeWorthy: ca.swipeWorthy || [],
            summary: ca.summary || '',
          });
        }
      }

      setEntries(allEntries);
    } catch (err) {
      console.error('Error loading swipe file:', err);
    } finally {
      setLoading(false);
    }
  }

  const hookTypes = [...new Set(entries.map((e) => e.hookType))].filter(Boolean);

  const filtered = entries.filter((e) => {
    if (filterType !== 'all' && e.hookType !== filterType) return false;
    if (filter) {
      const q = filter.toLowerCase();
      return (
        e.projectName.toLowerCase().includes(q) ||
        e.pageUrl.toLowerCase().includes(q) ||
        e.swipeWorthy.some((s) => s.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold mb-2">Swipe File</h1>
      <p className="text-text-secondary text-sm mb-6">
        Colecao de copy, hooks e patterns extraidos de todos os projetos analisados.
      </p>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar por texto, URL ou projeto..."
          className="flex-1 bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent text-text-primary"
        >
          <option value="all">Todos os hooks</option>
          {hookTypes.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-2 border border-border rounded-xl p-3">
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Paginas</p>
          <p className="text-lg font-semibold">{entries.length}</p>
        </div>
        <div className="bg-surface-2 border border-border rounded-xl p-3">
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Snippets</p>
          <p className="text-lg font-semibold">{entries.reduce((sum, e) => sum + e.swipeWorthy.length, 0)}</p>
        </div>
        <div className="bg-surface-2 border border-border rounded-xl p-3">
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Hook mais comum</p>
          <p className="text-lg font-semibold">
            {hookTypes.length > 0
              ? hookTypes.reduce((a, b) =>
                  entries.filter((e) => e.hookType === a).length >= entries.filter((e) => e.hookType === b).length ? a : b
                )
              : '-'}
          </p>
        </div>
        <div className="bg-surface-2 border border-border rounded-xl p-3">
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Score medio</p>
          <p className="text-lg font-semibold">
            {entries.length > 0
              ? (entries.reduce((sum, e) => sum + e.headlineScore, 0) / entries.length).toFixed(1)
              : '-'}
          </p>
        </div>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="bg-surface-2 border border-border rounded-xl p-12 text-center">
          <p className="text-text-muted text-sm">
            {entries.length === 0
              ? 'Nenhuma analise de copy disponivel. Execute scans com AI ativada para coletar dados.'
              : 'Nenhum resultado para o filtro aplicado.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, i) => (
            <div key={i} className="bg-surface-2 border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`/project/${entry.projectId}`}
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    {entry.projectName}
                  </a>
                  <span className="text-text-muted text-xs">·</span>
                  <span className="text-xs text-text-muted font-mono">{new URL(entry.pageUrl).pathname}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-accent-muted text-accent text-xs px-2 py-0.5 rounded">
                    {entry.hookType}
                  </span>
                  <span className="bg-surface-3 text-text-secondary text-xs px-2 py-0.5 rounded">
                    {entry.framework}
                  </span>
                  <span className="text-xs text-text-muted">
                    {entry.headlineScore}/10
                  </span>
                </div>
              </div>

              {entry.summary && (
                <p className="text-text-secondary text-sm mb-3">{entry.summary}</p>
              )}

              {entry.swipeWorthy.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Swipe-worthy</p>
                  {entry.swipeWorthy.map((snippet, j) => (
                    <div
                      key={j}
                      className="bg-surface-3 rounded-lg px-3 py-2 text-sm text-text-primary border-l-2 border-accent"
                    >
                      "{snippet}"
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
