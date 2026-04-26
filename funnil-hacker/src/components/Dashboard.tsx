import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  target_url: string | null;
  mode: string;
  niche: string | null;
  status: string;
  competitor_count: number;
  created_at: string;
}

const MODE_LABELS: Record<string, string> = {
  discover: 'Descobrir Concorrentes',
  scaled_offers: 'Ofertas Escaladas',
  hack_top: 'Hackear Top Players',
  map_funnel: 'Mapear Funil',
  full_pipeline: 'Pipeline Completo',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500/15 text-yellow-400',
  discovering: 'bg-blue-500/15 text-blue-400',
  analyzing: 'bg-accent-muted text-accent',
  complete: 'bg-green-500/15 text-green-400',
  error: 'bg-red-500/15 text-red-400',
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-text-secondary text-sm mt-1">
            Inteligencia competitiva e analise de funis
          </p>
        </div>
        <a
          href="/project/new"
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Projeto
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Projetos', value: projects.length, icon: '{}' },
          { label: 'Completos', value: projects.filter((p) => p.status === 'complete').length, icon: '{}' },
          { label: 'Em Analise', value: projects.filter((p) => ['analyzing', 'discovering'].includes(p.status)).length, icon: '{}' },
          { label: 'Concorrentes', value: projects.reduce((sum, p) => sum + (p.competitor_count || 0), 0), icon: '{}' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-2 border border-border rounded-xl p-4">
            <p className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Project List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-surface-2 border border-border rounded-xl p-12 text-center">
          <svg className="w-12 h-12 text-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h3 className="text-lg font-medium mb-2">Nenhum projeto ainda</h3>
          <p className="text-text-secondary text-sm mb-6">
            Comece hackeando o funil de um concorrente ou descobrindo players do seu nicho.
          </p>
          <a
            href="/project/new"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Criar Primeiro Projeto
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/project/${project.id}`}
              className="block bg-surface-2 border border-border hover:border-border-hover rounded-xl p-5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-medium group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-text-secondary text-sm mt-0.5">
                      {project.target_url || project.niche || 'Sem URL'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted">
                    {MODE_LABELS[project.mode] || project.mode}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_COLORS[project.status] || 'bg-surface-3 text-text-muted'}`}>
                    {project.status}
                  </span>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
