#!/usr/bin/env node
/**
 * Claude Code Helper — write analysis results to Supabase
 *
 * Usage:
 *   node scripts/claude-write.mjs <command> <json-payload>
 *
 * Commands:
 *   create-project  → creates a new project, returns ID
 *   add-page        → adds a page to a project
 *   add-tech        → adds tech stack items
 *   add-insight     → adds strategic insights
 *   add-company     → adds/updates company intel
 *   add-ad          → adds captured ad
 *   set-status      → updates project status
 *   add-competitor  → adds discovered competitor
 *
 * Example:
 *   node scripts/claude-write.mjs create-project '{"name":"Test","mode":"map_funnel","target_url":"https://instagram.com/user"}'
 */

import { createClient } from '@supabase/supabase-js';

const SB_URL = process.env.SUPABASE_URL || 'https://weirdpigeon-supabase.cloudfy.live';
const SB_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM3Njg1MTYsImV4cCI6MTgwNTMwNDUxNn0.Hziwx8ocWnFVLHvt5DhT8nTkL2XVMa58ofjL-0hCMxw';

const supabase = createClient(SB_URL, SB_KEY);

const [, , command, ...args] = process.argv;
const payloadStr = args.join(' ');

if (!command) {
  console.error('Usage: node claude-write.mjs <command> <json-payload>');
  process.exit(1);
}

let payload = {};
if (payloadStr) {
  try {
    payload = JSON.parse(payloadStr);
  } catch {
    console.error('Invalid JSON payload');
    process.exit(1);
  }
}

async function run() {
  switch (command) {
    case 'create-project': {
      const { data, error } = await supabase.from('fh_projects').insert({
        name: payload.name,
        mode: payload.mode || 'map_funnel',
        target_url: payload.target_url || null,
        niche: payload.niche || null,
        keywords: payload.keywords || null,
        status: 'analyzing',
      }).select().single();
      if (error) throw error;
      console.log(JSON.stringify({ id: data.id, url: `https://funnil-hacker.vercel.app/project/${data.id}` }));
      break;
    }

    case 'add-page': {
      const { data, error } = await supabase.from('fh_pages').insert({
        project_id: payload.projectId,
        url: payload.url,
        final_url: payload.finalUrl || payload.url,
        title: payload.title,
        page_type: payload.pageType || 'other',
        funnel_stage: payload.funnelStage || 'entrada',
        screenshot_desktop: payload.screenshotDesktop || null,
        screenshot_mobile: payload.screenshotMobile || null,
        text_content: (payload.textContent || '').slice(0, 10000),
        copy_analysis: payload.copyAnalysis || null,
        tech_detected: payload.techDetected || null,
        status_code: payload.statusCode || 200,
      }).select().single();
      if (error) throw error;
      console.log(JSON.stringify({ pageId: data.id }));
      break;
    }

    case 'add-tech': {
      const items = Array.isArray(payload.items) ? payload.items : [payload];
      const rows = items.map((t) => ({
        project_id: payload.projectId || t.projectId,
        tech_name: t.name || t.tech_name,
        tech_type: t.type || t.tech_type,
        identifier: t.identifier || null,
      }));
      const { error } = await supabase.from('fh_techstack').insert(rows);
      if (error) throw error;
      console.log(JSON.stringify({ added: rows.length }));
      break;
    }

    case 'add-insight': {
      const items = Array.isArray(payload.items) ? payload.items : [payload];
      const rows = items.map((i) => ({
        project_id: payload.projectId || i.projectId,
        category: i.category || 'intelligence',
        title: i.title,
        content: i.content,
        source: i.source || 'claude',
        priority: i.priority || 'medium',
      }));
      const { error } = await supabase.from('fh_insights').insert(rows);
      if (error) throw error;
      console.log(JSON.stringify({ added: rows.length }));
      break;
    }

    case 'add-company': {
      // Check if exists
      const { data: existing } = await supabase
        .from('fh_company_intel').select('id').eq('project_id', payload.projectId).single();

      const values = {
        domain: payload.domain,
        whois_data: payload.whoisData || payload.rawData || {},
        company_name: payload.companyName,
        cnpj: payload.cnpj || null,
        social_profiles: payload.socialProfiles || {},
        hosting_provider: payload.hostingProvider || null,
        notes: payload.notes || null,
      };

      if (existing) {
        const { error } = await supabase.from('fh_company_intel').update(values).eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('fh_company_intel').insert({ project_id: payload.projectId, ...values });
        if (error) throw error;
      }
      console.log(JSON.stringify({ success: true }));
      break;
    }

    case 'add-ad': {
      const items = Array.isArray(payload.items) ? payload.items : [payload];
      const rows = items.map((a) => ({
        project_id: payload.projectId || a.projectId,
        platform: a.platform || 'meta',
        ad_id: a.adId || `claude-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        creative_url: a.creativeUrl || null,
        video_url: a.videoUrl || null,
        copy_text: a.copyText || '',
        hook_type: a.hookType || null,
        started_at: a.startedAt || null,
        status: a.status || 'active',
        ai_analysis: a.aiAnalysis || null,
      }));
      const { error } = await supabase.from('fh_ads').insert(rows);
      if (error) throw error;
      console.log(JSON.stringify({ added: rows.length }));
      break;
    }

    case 'add-competitor': {
      const items = Array.isArray(payload.items) ? payload.items : [payload];
      const rows = items.map((c) => ({
        project_id: payload.projectId || c.projectId,
        name: c.name,
        url: c.url || null,
        niche: c.niche || null,
        scale_score: c.scaleScore || 5,
        active_ads_count: c.activeAdsCount || null,
        status: 'discovered',
        overview: { description: c.description, ...c.overview },
      }));
      const { error } = await supabase.from('fh_competitors').insert(rows);
      if (error) throw error;
      console.log(JSON.stringify({ added: rows.length }));
      break;
    }

    case 'set-status': {
      const { error } = await supabase.from('fh_projects').update({
        status: payload.status,
        competitor_count: payload.competitorCount,
        updated_at: new Date().toISOString(),
      }).eq('id', payload.projectId);
      if (error) throw error;
      console.log(JSON.stringify({ success: true }));
      break;
    }

    case 'get-project': {
      const { data, error } = await supabase.from('fh_projects').select('*').eq('id', payload.projectId).single();
      if (error) throw error;
      console.log(JSON.stringify(data));
      break;
    }

    case 'list-projects': {
      const { data } = await supabase.from('fh_projects').select('id, name, target_url, status, mode').order('created_at', { ascending: false }).limit(20);
      console.log(JSON.stringify(data));
      break;
    }

    case 'add-funnel-nodes': {
      // payload: { projectId, nodes: [{ label, nodeType, url, pageType, techCount, positionX, positionY }] }
      const rows = payload.nodes.map((n, i) => ({
        project_id: payload.projectId,
        label: n.label,
        node_type: n.nodeType || 'other',
        position_x: n.positionX ?? (i % 3) * 280 + 100,
        position_y: n.positionY ?? Math.floor(i / 3) * 180,
        metadata: { url: n.url, pageType: n.pageType, techCount: n.techCount || 0 },
      }));
      const { data, error } = await supabase.from('fh_funnel_nodes').insert(rows).select();
      if (error) throw error;
      console.log(JSON.stringify({ added: data.length, ids: data.map((n) => ({ label: n.label, id: n.id, url: (n.metadata).url })) }));
      break;
    }

    case 'add-funnel-edges': {
      // payload: { projectId, edges: [{ fromNodeId, toNodeId, label, edgeType }] }
      const rows = payload.edges.map((e) => ({
        project_id: payload.projectId,
        from_node: e.fromNodeId,
        to_node: e.toNodeId,
        label: e.label || null,
        edge_type: e.edgeType || 'click',
      }));
      const { error } = await supabase.from('fh_funnel_edges').insert(rows);
      if (error) throw error;
      console.log(JSON.stringify({ added: rows.length }));
      break;
    }

    case 'clear-project-data': {
      // Wipes pages/tech/funnel/insights/ads for a project — useful for re-runs
      const pid = payload.projectId;
      await supabase.from('fh_funnel_edges').delete().eq('project_id', pid);
      await supabase.from('fh_funnel_nodes').delete().eq('project_id', pid);
      await supabase.from('fh_pages').delete().eq('project_id', pid);
      await supabase.from('fh_techstack').delete().eq('project_id', pid);
      await supabase.from('fh_insights').delete().eq('project_id', pid);
      await supabase.from('fh_ads').delete().eq('project_id', pid);
      await supabase.from('fh_company_intel').delete().eq('project_id', pid);
      console.log(JSON.stringify({ cleared: true }));
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

run().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
