import { useState, useEffect, lazy, Suspense } from 'react';

const FunnelMap = lazy(() => import('./FunnelMap'));
const autoLayoutModule = import('./FunnelMap').then((m) => m.autoLayoutNodes);

interface Project {
  id: string;
  name: string;
  target_url: string | null;
  mode: string;
  status: string;
  niche: string | null;
  keywords: string[] | null;
  created_at: string;
}

interface PageData {
  id: string;
  url: string;
  final_url: string | null;
  title: string | null;
  page_type: string | null;
  funnel_stage: string | null;
  screenshot_desktop: string | null;
  screenshot_mobile: string | null;
  copy_analysis: any;
  tech_detected: any;
  status_code: number | null;
}

interface CompanyIntel {
  domain: string | null;
  whois_data: any;
  company_name: string | null;
  cnpj: string | null;
  social_profiles: any;
  hosting_provider: string | null;
}

interface TechItem {
  tech_name: string;
  tech_type: string;
  identifier: string | null;
}

interface Insight {
  id: string;
  category: string;
  title: string;
  content: string;
  source: string;
  priority: string;
}

interface FunnelNode {
  id: string;
  label: string;
  node_type: string;
  position_x: number;
  position_y: number;
  metadata: any;
  page_id: string | null;
}

interface FunnelEdge {
  id: string;
  from_node: string;
  to_node: string;
  label: string | null;
  edge_type: string;
}

interface AdData {
  id: string;
  platform: string;
  ad_id: string;
  creative_url: string | null;
  video_url: string | null;
  copy_text: string;
  hook_type: string | null;
  started_at: string | null;
  status: string;
  ai_analysis: any;
}

type Tab = 'overview' | 'pages' | 'funnel' | 'tech' | 'ads' | 'insights';

const TAB_LIST: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pages', label: 'Paginas' },
  { id: 'funnel', label: 'Funil' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'ads', label: 'Anuncios' },
  { id: 'insights', label: 'Insights' },
];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  analyzing: 'Analisando...',
  complete: 'Completo',
  error: 'Erro',
};

export default function ProjectBoard({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [company, setCompany] = useState<CompanyIntel | null>(null);
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [funnelNodes, setFunnelNodes] = useState<FunnelNode[]>([]);
  const [funnelEdges, setFunnelEdges] = useState<FunnelEdge[]>([]);
  const [ads, setAds] = useState<AdData[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState('');

  useEffect(() => {
    loadProject();
  }, [projectId]);

  async function loadProject() {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      setProject(data.project);
      setPages(data.pages || []);
      setCompany(data.company || null);
      setTechStack(data.techStack || []);
      setInsights(data.insights || []);
      setFunnelNodes(data.funnelNodes || []);
      setFunnelEdges(data.funnelEdges || []);
      setAds(data.ads || []);
    } catch (err) {
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  }

  async function startScan() {
    setScanning(true);

    // Choose endpoint based on project mode
    const isDiscovery = project?.mode === 'discover' || project?.mode === 'scaled_offers' || project?.mode === 'full_pipeline';
    const isFunnelMap = project?.mode === 'map_funnel' || project?.mode === 'hack_top';

    try {
      if (isDiscovery && !project?.target_url) {
        setScanProgress('Descobrindo concorrentes...');
        const res = await fetch('/api/discover', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            niche: project?.niche,
            keywords: project?.keywords,
          }),
        });
        const result = await res.json();
        if (result.success) {
          setScanProgress(`${result.competitorsFound} concorrentes encontrados`);
        }
      } else if (project?.target_url) {
        setScanProgress('Iniciando crawler...');
        const res = await fetch('/api/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, url: project.target_url, maxPages: 15 }),
        });
        const result = await res.json();
        if (result.success) {
          setScanProgress(`${result.pagesScanned} paginas em ${Math.round(result.crawlTime / 1000)}s`);
        }
      }
      await loadProject();
    } catch (err) {
      console.error('Scan error:', err);
      setScanProgress('Erro no scan');
    } finally {
      setScanning(false);
    }
  }

  async function scrapeAds() {
    const searchTerm = project?.name || project?.niche || '';
    if (!searchTerm) return;
    setScanning(true);
    setScanProgress('Buscando anuncios no Meta Ad Library...');
    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, searchTerm }),
      });
      const result = await res.json();
      if (result.success) {
        setScanProgress(`${result.adsFound} anuncios capturados`);
      }
      await loadProject();
    } catch (err) {
      console.error('Ads scrape error:', err);
      setScanProgress('Erro ao buscar anuncios');
    } finally {
      setScanning(false);
    }
  }

  async function rescan() {
    setScanning(true);
    setScanProgress('Re-escaneando para detectar mudancas...');
    try {
      const res = await fetch('/api/rescan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const result = await res.json();
      if (result.success) {
        setScanProgress(`${result.changesCount} mudancas detectadas`);
      }
      await loadProject();
    } catch (err) {
      console.error('Rescan error:', err);
      setScanProgress('Erro no re-scan');
    } finally {
      setScanning(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-text-secondary">Projeto nao encontrado.</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{project.name}</h1>
            <p className="text-text-secondary text-sm mt-0.5">
              {project.target_url || project.niche || ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2.5 py-1 rounded-full ${
              project.status === 'complete' ? 'bg-green-500/15 text-green-400' :
              project.status === 'analyzing' ? 'bg-accent-muted text-accent' :
              'bg-yellow-500/15 text-yellow-400'
            }`}>
              {STATUS_LABELS[project.status] || project.status}
            </span>
            {scanProgress && (
              <span className="text-xs text-text-muted">{scanProgress}</span>
            )}
            {/* Action buttons */}
            {(project.status === 'pending' || project.status === 'complete') && !scanning && (
              <div className="flex items-center gap-2">
                {project.target_url && (
                  <button onClick={startScan} className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    {project.status === 'complete' ? 'Re-crawl' : 'Scan'}
                  </button>
                )}
                {project.status === 'complete' && (
                  <>
                    <button onClick={scrapeAds} className="flex items-center gap-1.5 bg-surface-3 hover:bg-surface-4 border border-border text-text-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                      Buscar Ads
                    </button>
                    <button onClick={rescan} className="flex items-center gap-1.5 bg-surface-3 hover:bg-surface-4 border border-border text-text-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                      Re-scan
                    </button>
                    <a href={`/api/export?projectId=${projectId}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-surface-3 hover:bg-surface-4 border border-border text-text-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                      Exportar
                    </a>
                  </>
                )}
              </div>
            )}
            {scanning && (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-text-muted">Processando...</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-5 -mb-px">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent bg-accent-muted'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
              {tab.id === 'pages' && pages.length > 0 && (
                <span className="ml-1.5 text-xs opacity-60">{pages.length}</span>
              )}
              {tab.id === 'tech' && techStack.length > 0 && (
                <span className="ml-1.5 text-xs opacity-60">{techStack.length}</span>
              )}
              {tab.id === 'ads' && ads.length > 0 && (
                <span className="ml-1.5 text-xs opacity-60">{ads.length}</span>
              )}
              {tab.id === 'insights' && insights.length > 0 && (
                <span className="ml-1.5 text-xs opacity-60">{insights.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={`flex-1 ${activeTab === 'funnel' ? '' : 'overflow-y-auto p-8'}`}>
        {activeTab === 'overview' && (
          <OverviewTab project={project} pages={pages} company={company} techStack={techStack} insights={insights} />
        )}
        {activeTab === 'pages' && <PagesTab pages={pages} />}
        {activeTab === 'funnel' && (
          <FunnelTab nodes={funnelNodes} edges={funnelEdges} pages={pages} />
        )}
        {activeTab === 'tech' && <TechTab techStack={techStack} />}
        {activeTab === 'ads' && <AdsTab ads={ads} onScrape={scrapeAds} scanning={scanning} />}
        {activeTab === 'insights' && <InsightsTab insights={insights} />}
      </div>
    </div>
  );
}

function OverviewTab({ project, pages, company, techStack, insights }: {
  project: Project; pages: PageData[]; company: CompanyIntel | null;
  techStack: TechItem[]; insights: Insight[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Stats */}
      <div className="col-span-2 grid grid-cols-4 gap-4">
        {[
          { label: 'Paginas', value: pages.length },
          { label: 'Tecnologias', value: techStack.length },
          { label: 'Insights', value: insights.length },
          { label: 'Status', value: project.status },
        ].map((s, i) => (
          <div key={i} className="bg-surface-2 border border-border rounded-xl p-4">
            <p className="text-text-muted text-xs uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Company Intel */}
      {company && (
        <div className="bg-surface-2 border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Quem esta por tras
          </h3>
          <div className="space-y-3 text-sm">
            {company.domain && <InfoRow label="Dominio" value={company.domain} />}
            {company.company_name && <InfoRow label="Empresa" value={company.company_name} />}
            {company.cnpj && <InfoRow label="CNPJ" value={company.cnpj} />}
            {company.hosting_provider && <InfoRow label="Hosting" value={company.hosting_provider} />}
            {company.whois_data?.registrarName && <InfoRow label="Registrar" value={company.whois_data.registrarName} />}
            {company.whois_data?.creationDate && <InfoRow label="Registrado em" value={company.whois_data.creationDate} />}
          </div>
        </div>
      )}

      {/* Top Tech */}
      {techStack.length > 0 && (
        <div className="bg-surface-2 border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t, i) => (
              <span key={i} className="bg-surface-3 border border-border px-2.5 py-1 rounded-md text-xs">
                {t.tech_name}
                {t.identifier && <span className="text-text-muted ml-1">({t.identifier})</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Insights */}
      {insights.length > 0 && (
        <div className="col-span-2 bg-surface-2 border border-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
            Insights Principais
          </h3>
          <div className="space-y-3">
            {insights.filter(i => i.priority === 'high').slice(0, 3).map((insight) => (
              <div key={insight.id} className="bg-surface-3 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    insight.category === 'intelligence' ? 'bg-accent' :
                    insight.category === 'opportunity' ? 'bg-warning' :
                    'bg-success'
                  }`} />
                  <span className="text-sm font-medium">{insight.title}</span>
                </div>
                <p className="text-text-secondary text-xs ml-4">{insight.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="text-text-primary font-mono text-xs">{value}</span>
    </div>
  );
}

function PagesTab({ pages }: { pages: PageData[] }) {
  if (pages.length === 0) {
    return <p className="text-text-muted text-sm">Nenhuma pagina escaneada ainda. Inicie o scan.</p>;
  }

  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <div key={page.id} className="bg-surface-2 border border-border rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-sm">{page.title || page.url}</h3>
              <p className="text-text-muted text-xs mt-0.5 font-mono">{page.url}</p>
            </div>
            <div className="flex gap-2">
              {page.page_type && (
                <span className="bg-accent-muted text-accent text-xs px-2 py-0.5 rounded">{page.page_type}</span>
              )}
              {page.funnel_stage && (
                <span className="bg-surface-3 text-text-secondary text-xs px-2 py-0.5 rounded">{page.funnel_stage}</span>
              )}
            </div>
          </div>

          {/* Screenshots side by side */}
          {(page.screenshot_desktop || page.screenshot_mobile) && (
            <div className="flex gap-4 mt-3">
              {page.screenshot_desktop && (
                <div className="flex-1">
                  <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Desktop 1440px</p>
                  <img src={page.screenshot_desktop} alt="Desktop" className="w-full rounded-lg border border-border" />
                </div>
              )}
              {page.screenshot_mobile && (
                <div className="w-24">
                  <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">Mobile 390px</p>
                  <img src={page.screenshot_mobile} alt="Mobile" className="w-full rounded-lg border border-border" />
                </div>
              )}
            </div>
          )}

          {/* Copy Analysis */}
          {page.copy_analysis && (
            <div className="mt-4 bg-surface-3 rounded-lg p-3">
              <p className="text-xs font-medium text-text-secondary mb-2">Analise de Copy</p>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {page.copy_analysis.hookType && (
                  <div>
                    <span className="text-text-muted">Hook:</span>{' '}
                    <span className="text-accent">{page.copy_analysis.hookType}</span>
                  </div>
                )}
                {page.copy_analysis.framework && (
                  <div>
                    <span className="text-text-muted">Framework:</span>{' '}
                    <span>{page.copy_analysis.framework}</span>
                  </div>
                )}
                {page.copy_analysis.headlineScore && (
                  <div>
                    <span className="text-text-muted">Headline:</span>{' '}
                    <span>{page.copy_analysis.headlineScore}/10</span>
                  </div>
                )}
              </div>
              {page.copy_analysis.summary && (
                <p className="text-text-secondary text-xs mt-2">{page.copy_analysis.summary}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TechTab({ techStack }: { techStack: TechItem[] }) {
  if (techStack.length === 0) {
    return <p className="text-text-muted text-sm">Nenhuma tecnologia detectada ainda.</p>;
  }

  const grouped = techStack.reduce<Record<string, TechItem[]>>((acc, t) => {
    if (!acc[t.tech_type]) acc[t.tech_type] = [];
    acc[t.tech_type].push(t);
    return acc;
  }, {});

  const TYPE_LABELS: Record<string, string> = {
    analytics: 'Analytics & Tracking',
    checkout: 'Checkout & Pagamento',
    video: 'Video Players',
    email: 'Email & CRM',
    builder: 'Page Builders',
    cdn: 'CDN & Hosting',
    whatsapp: 'WhatsApp',
    remarketing: 'Remarketing',
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type}>
          <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
            {TYPE_LABELS[type] || type}
          </h3>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="bg-surface-2 border border-border rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium">{item.tech_name}</span>
                {item.identifier && (
                  <span className="text-xs font-mono text-text-muted bg-surface-3 px-2 py-0.5 rounded">
                    {item.identifier}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdsTab({ ads, onScrape, scanning }: { ads: AdData[]; onScrape: () => void; scanning: boolean }) {
  if (ads.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-10 h-10 text-text-muted mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
        <h3 className="text-sm font-medium text-text-secondary mb-2">Nenhum anuncio capturado</h3>
        <p className="text-text-muted text-xs mb-4">Busque anuncios na Meta Ad Library para este concorrente.</p>
        <button
          onClick={onScrape}
          disabled={scanning}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
        >
          Buscar Anuncios
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-text-secondary text-sm">{ads.length} anuncios capturados</p>
        <button
          onClick={onScrape}
          disabled={scanning}
          className="text-xs text-accent hover:text-accent-hover transition-colors"
        >
          Atualizar
        </button>
      </div>
      {ads.map((ad) => (
        <div key={ad.id} className="bg-surface-2 border border-border rounded-xl p-5">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${ad.status === 'active' ? 'bg-success' : 'bg-text-muted'}`} />
              <span className="text-xs text-text-muted uppercase">{ad.platform}</span>
              {ad.hook_type && (
                <span className="bg-accent-muted text-accent text-xs px-2 py-0.5 rounded">{ad.hook_type}</span>
              )}
            </div>
            {ad.started_at && (
              <span className="text-xs text-text-muted">{ad.started_at}</span>
            )}
          </div>

          {ad.copy_text && (
            <p className="text-sm text-text-primary leading-relaxed mb-3">"{ad.copy_text.slice(0, 500)}"</p>
          )}

          {ad.creative_url && (
            <img src={ad.creative_url} alt="Creative" className="rounded-lg border border-border max-h-64 object-contain" />
          )}

          {ad.ai_analysis && (
            <div className="mt-3 bg-surface-3 rounded-lg p-3 text-xs">
              {ad.ai_analysis.commonPattern && (
                <p className="text-text-secondary"><span className="text-text-muted">Padrao:</span> {ad.ai_analysis.commonPattern}</p>
              )}
              {ad.ai_analysis.overallStrategy && (
                <p className="text-text-secondary mt-1"><span className="text-text-muted">Estrategia:</span> {ad.ai_analysis.overallStrategy}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FunnelTab({ nodes, edges, pages }: { nodes: FunnelNode[]; edges: FunnelEdge[]; pages: PageData[] }) {
  // Transform DB data into FunnelMap props
  const mapNodes = nodes.map((n) => ({
    id: n.id,
    label: n.label,
    nodeType: n.node_type,
    url: (n.metadata as any)?.url,
    techCount: (n.metadata as any)?.techCount || 0,
    positionX: n.position_x,
    positionY: n.position_y,
  }));

  const mapEdges = edges.map((e) => ({
    id: e.id,
    from: e.from_node,
    to: e.to_node,
    label: e.label || undefined,
    edgeType: e.edge_type,
  }));

  // If nodes have default positions (0,0), auto-layout them
  const needsLayout = mapNodes.every((n) => n.positionX === 0 && n.positionY === 0);
  if (needsLayout && mapNodes.length > 0) {
    const pageData = pages.map((p) => ({
      id: nodes.find((n) => n.page_id === p.id)?.id || p.id,
      url: p.url,
      title: p.title || undefined,
      pageType: p.page_type || undefined,
      techCount: Array.isArray(p.tech_detected) ? p.tech_detected.length : 0,
    }));

    // Simple auto-layout: stack vertically, spread horizontally per level
    let y = 0;
    mapNodes.forEach((node, i) => {
      node.positionX = (i % 3) * 280 + 100;
      node.positionY = Math.floor(i / 3) * 180;
    });
  }

  return (
    <div className="h-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <FunnelMap nodes={mapNodes} edges={mapEdges} />
      </Suspense>
    </div>
  );
}

function InsightsTab({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) {
    return <p className="text-text-muted text-sm">Nenhum insight gerado ainda.</p>;
  }

  const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    intelligence: { label: 'Inteligencia', color: 'text-accent', icon: 'bg-accent' },
    opportunity: { label: 'Oportunidade', color: 'text-warning', icon: 'bg-warning' },
    breach: { label: 'Brecha', color: 'text-success', icon: 'bg-success' },
  };

  return (
    <div className="space-y-4">
      {insights.map((insight) => {
        const config = CATEGORY_CONFIG[insight.category] || CATEGORY_CONFIG.intelligence;
        return (
          <div key={insight.id} className="bg-surface-2 border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${config.icon}`} />
              <span className={`text-xs uppercase tracking-wider font-medium ${config.color}`}>
                {config.label}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ml-auto ${
                insight.priority === 'high' ? 'bg-red-500/15 text-red-400' :
                insight.priority === 'medium' ? 'bg-yellow-500/15 text-yellow-400' :
                'bg-surface-3 text-text-muted'
              }`}>
                {insight.priority}
              </span>
            </div>
            <h3 className="font-medium text-sm mb-1">{insight.title}</h3>
            <p className="text-text-secondary text-sm">{insight.content}</p>
          </div>
        );
      })}
    </div>
  );
}
