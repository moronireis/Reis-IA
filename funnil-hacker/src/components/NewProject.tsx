import { useState } from 'react';

const MODES = [
  {
    id: 'map_funnel',
    title: 'Mapear Funil',
    description: 'Analise completa de um funil especifico — todas as paginas, tech stack, copy, insights.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    fields: ['url'],
  },
  {
    id: 'discover',
    title: 'Descobrir Concorrentes',
    description: 'Encontra 20-40 concorrentes do seu nicho automaticamente.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    fields: ['niche', 'keywords', 'references'],
  },
  {
    id: 'scaled_offers',
    title: 'Ofertas Escaladas',
    description: 'Descobre quais produtos estao vendendo forte AGORA no seu nicho.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    fields: ['niche', 'keywords'],
  },
  {
    id: 'hack_top',
    title: 'Hackear Top Players',
    description: 'Analise completa dos top 5-10 que mais vendem. Precisa de uma lista de concorrentes.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    fields: ['references'],
  },
  {
    id: 'full_pipeline',
    title: 'Pipeline Completo',
    description: 'Roda TUDO: descobre concorrentes, encontra escalados, hackeia os melhores, mapeia funis.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    fields: ['niche', 'keywords', 'references'],
  },
];

export default function NewProject() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [niche, setNiche] = useState('');
  const [keywords, setKeywords] = useState('');
  const [references, setReferences] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const selectedModeConfig = MODES.find((m) => m.id === selectedMode);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedMode) return;

    setSubmitting(true);
    setError('');

    try {
      const body: Record<string, any> = {
        name: name || `${selectedModeConfig?.title} — ${niche || url || 'Sem nome'}`,
        mode: selectedMode,
      };

      if (url) body.target_url = url.startsWith('http') ? url : `https://${url}`;
      if (niche) body.niche = niche;
      if (keywords) body.keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      if (references) body.references = references.split('\n').map((r) => r.trim()).filter(Boolean);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Erro ao criar projeto');

      const data = await res.json();
      window.location.href = `/project/${data.project.id}`;
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
      setSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-2">Novo Projeto</h1>
      <p className="text-text-secondary text-sm mb-8">Escolha o modo de operacao e configure a analise.</p>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
              selectedMode === mode.id
                ? 'bg-accent-muted border-accent'
                : 'bg-surface-2 border-border hover:border-border-hover'
            }`}
          >
            <div className={`mt-0.5 ${selectedMode === mode.id ? 'text-accent' : 'text-text-muted'}`}>
              {mode.icon}
            </div>
            <div>
              <h3 className={`font-medium text-sm ${selectedMode === mode.id ? 'text-accent' : ''}`}>
                {mode.title}
              </h3>
              <p className="text-text-secondary text-xs mt-0.5">{mode.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Config Form */}
      {selectedMode && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-surface-2 border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
              Configuracao
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">Nome do projeto (opcional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Analise Nicho Emagrecimento"
                className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted"
              />
            </div>

            {/* URL field */}
            {selectedModeConfig?.fields.includes('url') && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">URL do concorrente</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://exemplo.com.br"
                  required
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted"
                />
              </div>
            )}

            {/* Niche field */}
            {selectedModeConfig?.fields.includes('niche') && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">Nicho / Mercado</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Ex: Emagrecimento feminino, Mentoria de negocios, Curso de ingles"
                  required
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted"
                />
              </div>
            )}

            {/* Keywords field */}
            {selectedModeConfig?.fields.includes('keywords') && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Palavras-chave (separadas por virgula)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Ex: emagrecer, dieta, perda de peso, metabolismo"
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted"
                />
              </div>
            )}

            {/* References field */}
            {selectedModeConfig?.fields.includes('references') && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Concorrentes de referencia (1 por linha, URL ou nome)
                </label>
                <textarea
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  placeholder={"https://concorrente1.com.br\nhttps://concorrente2.com.br"}
                  rows={3}
                  className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent placeholder:text-text-muted resize-none"
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Iniciando analise...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                Iniciar Projeto
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
