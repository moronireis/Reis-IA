import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  target_url: string | null;
  status: string;
}

interface CompareData {
  project: Project;
  pages: Array<{ page_type: string; title: string; url: string }>;
  techStack: Array<{ tech_name: string; tech_type: string; identifier: string | null }>;
  company: { domain: string; company_name: string; hosting_provider: string } | null;
  insights: Array<{ category: string; title: string; content: string; priority: string }>;
}

export default function CompareView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [compareData, setCompareData] = useState<CompareData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setProjects((data.projects || []).filter((p: Project) => p.status === 'complete')));
  }, []);

  async function loadComparison() {
    if (selected.length < 2) return;
    setLoading(true);

    const results: CompareData[] = [];
    for (const id of selected) {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      results.push(data);
    }
    setCompareData(results);
    setLoading(false);
  }

  function toggleProject(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }

  return (
    <div className="p-8 max-w-7xl">
      <h1 className="text-2xl font-semibold mb-2">Comparar Concorrentes</h1>
      <p className="text-text-secondary text-sm mb-6">Selecione 2 a 4 projetos completos para comparar side-by-side.</p>

      {/* Project selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => toggleProject(p.id)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              selected.includes(p.id)
                ? 'bg-accent-muted border-accent text-accent'
                : 'bg-surface-2 border-border text-text-secondary hover:border-border-hover'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {selected.length >= 2 && (
        <button
          onClick={loadComparison}
          disabled={loading}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors mb-8"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          )}
          Comparar {selected.length} Projetos
        </button>
      )}

      {/* Comparison Table */}
      {compareData.length >= 2 && (
        <div className="space-y-8">
          {/* Company Intel */}
          <CompareSection title="Empresa">
            <CompareRow label="Dominio" values={compareData.map((d) => d.company?.domain || '-')} />
            <CompareRow label="Empresa" values={compareData.map((d) => d.company?.company_name || '-')} />
            <CompareRow label="Hosting" values={compareData.map((d) => d.company?.hosting_provider || '-')} />
          </CompareSection>

          {/* Pages */}
          <CompareSection title="Paginas">
            <CompareRow label="Total" values={compareData.map((d) => String(d.pages.length))} />
            {['landing', 'sales', 'checkout', 'upsell', 'thankyou'].map((type) => (
              <CompareRow
                key={type}
                label={type}
                values={compareData.map((d) => String(d.pages.filter((p) => p.page_type === type).length))}
              />
            ))}
          </CompareSection>

          {/* Tech Stack */}
          <CompareSection title="Tech Stack">
            {(() => {
              const allTech = [...new Set(compareData.flatMap((d) => d.techStack.map((t) => t.tech_name)))];
              return allTech.map((tech) => (
                <CompareRow
                  key={tech}
                  label={tech}
                  values={compareData.map((d) => {
                    const found = d.techStack.find((t) => t.tech_name === tech);
                    return found ? (found.identifier || 'sim') : '-';
                  })}
                  highlight
                />
              ));
            })()}
          </CompareSection>

          {/* Insights */}
          <CompareSection title="Insights de Alta Prioridade">
            {compareData.map((d, i) => (
              <div key={i} className="mb-4">
                <p className="text-xs font-medium text-accent mb-2">{d.project.name}</p>
                {d.insights
                  .filter((ins) => ins.priority === 'high')
                  .slice(0, 3)
                  .map((ins, j) => (
                    <div key={j} className="bg-surface-3 rounded-lg p-2 mb-1.5 text-xs">
                      <span className="font-medium">{ins.title}</span>
                      <span className="text-text-muted ml-1">— {ins.content.slice(0, 100)}</span>
                    </div>
                  ))}
                {d.insights.filter((ins) => ins.priority === 'high').length === 0 && (
                  <p className="text-text-muted text-xs">Sem insights de alta prioridade</p>
                )}
              </div>
            ))}
          </CompareSection>
        </div>
      )}

      {projects.length === 0 && (
        <div className="bg-surface-2 border border-border rounded-xl p-12 text-center">
          <p className="text-text-muted text-sm">Nenhum projeto completo para comparar.</p>
        </div>
      )}
    </div>
  );
}

function CompareSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface-2 border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function CompareRow({ label, values, highlight }: { label: string; values: string[]; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
        {values.map((v, i) => (
          <span
            key={i}
            className={`text-xs font-mono ${
              highlight && v !== '-' ? 'text-accent' : v === '-' ? 'text-text-muted' : 'text-text-primary'
            }`}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}
