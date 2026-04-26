import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

/**
 * GET /api/export?projectId=xxx
 * Generate an HTML report that can be printed to PDF or shared.
 */
export const GET: APIRoute = async ({ url: requestUrl }) => {
  const projectId = requestUrl.searchParams.get('projectId');

  if (!projectId) {
    return new Response('projectId required', { status: 400 });
  }

  const [projectRes, pagesRes, companyRes, techRes, insightsRes, adsRes] = await Promise.all([
    supabase.from('fh_projects').select('*').eq('id', projectId).single(),
    supabase.from('fh_pages').select('*').eq('project_id', projectId).order('created_at'),
    supabase.from('fh_company_intel').select('*').eq('project_id', projectId).single(),
    supabase.from('fh_techstack').select('*').eq('project_id', projectId),
    supabase.from('fh_insights').select('*').eq('project_id', projectId).order('priority'),
    supabase.from('fh_ads').select('*').eq('project_id', projectId).order('created_at'),
  ]);

  if (projectRes.error) {
    return new Response('Project not found', { status: 404 });
  }

  const project = projectRes.data;
  const pages = pagesRes.data || [];
  const company = companyRes.data;
  const techStack = techRes.data || [];
  const insights = insightsRes.data || [];
  const ads = adsRes.data || [];

  const date = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${project.name} — Funnil Hacker Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #000; color: #fff; padding: 40px; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
    h2 { font-size: 18px; font-weight: 600; margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #2a2a2a; }
    h3 { font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
    p { font-size: 13px; color: #999; line-height: 1.6; }
    .accent { color: #4A90FF; }
    .subtitle { color: #666; font-size: 13px; margin-bottom: 24px; }
    .card { background: #111; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat { background: #111; border: 1px solid #2a2a2a; border-radius: 8px; padding: 12px; }
    .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #666; }
    .stat-value { font-size: 20px; font-weight: 600; margin-top: 4px; }
    .tag { display: inline-block; background: rgba(74,144,255,0.15); color: #4A90FF; font-size: 11px; padding: 2px 8px; border-radius: 4px; margin-right: 4px; }
    .tag-tech { background: #1a1a1a; color: #999; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1a; font-size: 13px; }
    .row-label { color: #666; }
    .row-value { color: #fff; font-family: monospace; font-size: 12px; }
    .insight { padding: 12px; background: #0a0a0a; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid; }
    .insight-intelligence { border-color: #4A90FF; }
    .insight-opportunity { border-color: #f59e0b; }
    .insight-breach { border-color: #22c55e; }
    .insight-title { font-size: 13px; font-weight: 500; margin-bottom: 4px; }
    .insight-content { font-size: 12px; color: #999; }
    .screenshot { max-width: 100%; border-radius: 8px; border: 1px solid #2a2a2a; margin-top: 8px; }
    .page-header { display: flex; justify-content: space-between; align-items: start; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #2a2a2a; font-size: 11px; color: #444; text-align: center; }
    @media print {
      body { padding: 20px; }
      .card { break-inside: avoid; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <h1>${project.name}</h1>
  <p class="subtitle">${project.target_url || project.niche || ''} · Gerado em ${date}</p>

  <!-- Stats -->
  <div class="stats">
    <div class="stat">
      <div class="stat-label">Paginas</div>
      <div class="stat-value">${pages.length}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Tecnologias</div>
      <div class="stat-value">${techStack.length}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Anuncios</div>
      <div class="stat-value">${ads.length}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Insights</div>
      <div class="stat-value">${insights.length}</div>
    </div>
  </div>

  ${company ? `
  <!-- Company Intel -->
  <h2>Quem esta por tras</h2>
  <div class="card">
    ${company.domain ? `<div class="row"><span class="row-label">Dominio</span><span class="row-value">${company.domain}</span></div>` : ''}
    ${company.company_name ? `<div class="row"><span class="row-label">Empresa</span><span class="row-value">${company.company_name}</span></div>` : ''}
    ${company.cnpj ? `<div class="row"><span class="row-label">CNPJ</span><span class="row-value">${company.cnpj}</span></div>` : ''}
    ${company.hosting_provider ? `<div class="row"><span class="row-label">Hosting</span><span class="row-value">${company.hosting_provider}</span></div>` : ''}
    ${company.whois_data?.registrarName ? `<div class="row"><span class="row-label">Registrar</span><span class="row-value">${company.whois_data.registrarName}</span></div>` : ''}
  </div>
  ` : ''}

  ${techStack.length > 0 ? `
  <!-- Tech Stack -->
  <h2>Tech Stack</h2>
  <div class="card">
    ${techStack.map((t: any) => `<span class="tag tag-tech">${t.tech_name}${t.identifier ? ` (${t.identifier})` : ''}</span>`).join(' ')}
  </div>
  ` : ''}

  ${insights.length > 0 ? `
  <!-- Insights -->
  <h2>Insights Estrategicos</h2>
  ${insights.map((i: any) => `
    <div class="insight insight-${i.category}">
      <div class="insight-title">${i.title}</div>
      <div class="insight-content">${i.content}</div>
    </div>
  `).join('')}
  ` : ''}

  ${pages.length > 0 ? `
  <!-- Pages -->
  <h2>Paginas Analisadas</h2>
  ${pages.map((p: any) => `
    <div class="card">
      <div class="page-header">
        <div>
          <h3>${p.title || 'Sem titulo'}</h3>
          <p style="font-family:monospace;font-size:11px;color:#666;">${p.url}</p>
        </div>
        <div>
          ${p.page_type ? `<span class="tag">${p.page_type}</span>` : ''}
          ${p.funnel_stage ? `<span class="tag tag-tech">${p.funnel_stage}</span>` : ''}
        </div>
      </div>
      ${p.copy_analysis?.summary ? `<p style="margin-top:12px;">${p.copy_analysis.summary}</p>` : ''}
      ${p.copy_analysis ? `
        <div style="margin-top:8px;display:flex;gap:8px;">
          ${p.copy_analysis.hookType ? `<span class="tag">Hook: ${p.copy_analysis.hookType}</span>` : ''}
          ${p.copy_analysis.framework ? `<span class="tag tag-tech">${p.copy_analysis.framework}</span>` : ''}
          ${p.copy_analysis.headlineScore ? `<span class="tag tag-tech">Score: ${p.copy_analysis.headlineScore}/10</span>` : ''}
        </div>
      ` : ''}
      ${p.screenshot_desktop ? `<img class="screenshot" src="${p.screenshot_desktop}" alt="Screenshot">` : ''}
    </div>
  `).join('')}
  ` : ''}

  ${ads.length > 0 ? `
  <!-- Ads -->
  <h2>Anuncios Capturados (${ads.length})</h2>
  ${ads.map((a: any) => `
    <div class="card">
      <p style="color:#fff;font-size:13px;">"${(a.copy_text || '').slice(0, 300)}"</p>
      ${a.hook_type ? `<span class="tag" style="margin-top:8px;display:inline-block;">Hook: ${a.hook_type}</span>` : ''}
      ${a.creative_url ? `<img class="screenshot" src="${a.creative_url}" alt="Creative" style="max-height:300px;margin-top:8px;">` : ''}
    </div>
  `).join('')}
  ` : ''}

  <!-- Footer -->
  <div class="footer">
    FUNNIL <span class="accent">HACKER</span> · Relatorio gerado automaticamente · ${date}
  </div>

</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
};
