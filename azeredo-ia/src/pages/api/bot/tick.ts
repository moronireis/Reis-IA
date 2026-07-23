/**
 * POST /api/bot/tick — motor da IA de primeiro atendimento (#9, 22/07).
 * Substitui o chatbot de menu (#7): em vez de saudação + botões, uma IA
 * conversacional (OpenAI) com prompt de comportamento + base de conhecimento
 * universais (az_settings key 'ai_config'), ligada por número (bot_enabled).
 *
 * O servidor UazapiGO não entrega webhooks, então funciona por VARREDURA:
 * a cada tick, para cada número com IA ligada, olha os chats 1:1 com mensagem
 * não lida e:
 *   inbound novo (depois da última resposta da IA) → gera resposta com o
 *     histórico recente da conversa e envia
 *   humano respondeu → detectado por fromMe posterior ao último envio da IA
 *     → handoff automático (a IA silencia por N horas)
 *   anti-loop → acima de MAX_AI_REPLIES respostas seguidas sem humano, entra
 *     em handoff sozinho (az_bot_state.bot_msg_count)
 *
 * Quem chama:
 *   - Frontend do Dashboard (pump a cada polling — latência de segundos com a
 *     plataforma aberta), autenticado por sessão
 *   - Cron GitHub Actions a cada 15 min (fallback com a plataforma fechada),
 *     autenticado por x-worker-key = WEBHOOK_KEY
 *
 * Throttle: no máximo 1 varredura a cada 20s (lock em az_settings.bot_last_tick).
 */
import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

const UAZAPI_URL = (import.meta.env.UAZAPI_URL || 'https://u4digital.uazapi.com').trim();
const TICK_MIN_INTERVAL_MS = 20_000;
const BUDGET_MS = 40_000;          // orçamento total da varredura (serverless 60s)
const MAX_CHATS_PER_INSTANCE = 10; // chats não lidos examinados por número
const MAX_ACTIONS_PER_TICK = 6;    // respostas da IA por tick (anti-tempestade)
const MAX_AI_REPLIES = 8;          // respostas seguidas sem humano → handoff
const RECENT_WINDOW_MS = 24 * 60 * 60 * 1000; // só conversa com atividade nas últimas 24h
const HISTORY_MSGS = 12;           // mensagens da conversa enviadas como contexto

interface AiConfig { prompt: string; knowledge: string; handoff_hours: number; model: string; }

export const POST: APIRoute = async ({ request, locals }) => {
  // Auth: worker-key (cron) OU sessão logada (pump do dashboard)
  const workerKey = request.headers.get('x-worker-key');
  const isWorker = !!workerKey && workerKey === (import.meta.env.WEBHOOK_KEY || '').trim();
  const hasSession = !!(locals as any)?.profile;
  if (!isWorker && !hasSession) return json({ error: 'Unauthorized' }, 401);

  const sb = createServerClient();
  const deadline = Date.now() + BUDGET_MS;

  // Throttle global — vários pumps simultâneos não geram varredura dupla
  const nowIso = new Date().toISOString();
  const { data: lastTickRow } = await sb.from('az_settings').select('value').eq('key', 'bot_last_tick').maybeSingle();
  const lastTick = lastTickRow?.value ? new Date(String(lastTickRow.value).replace(/"/g, '')).getTime() : 0;
  if (Date.now() - lastTick < TICK_MIN_INTERVAL_MS) {
    return json({ ok: true, skipped: 'throttled' });
  }
  await sb.from('az_settings').upsert({ key: 'bot_last_tick', value: JSON.stringify(nowIso) as any, updated_at: nowIso });

  // Números com IA ligada, conectados e ativos
  const { data: insts } = await sb
    .from('az_whatsapp_instances')
    .select('id, token, display_name, uazapi_name, status, bot_enabled, is_active, deleted_at')
    .eq('bot_enabled', true)
    .eq('status', 'connected')
    .is('deleted_at', null);
  const active = (insts || []).filter((i: any) => i.is_active !== false);
  if (active.length === 0) return json({ ok: true, skipped: 'no_ai_instances' });

  // Config universal da IA
  const { data: cfgRow } = await sb.from('az_settings').select('value').eq('key', 'ai_config').maybeSingle();
  const cfg: AiConfig = {
    prompt: String(cfgRow?.value?.prompt || '').trim(),
    knowledge: String(cfgRow?.value?.knowledge || '').trim(),
    handoff_hours: Number(cfgRow?.value?.handoff_hours) || 24,
    model: String(cfgRow?.value?.model || 'gpt-4o-mini'),
  };
  if (!cfg.prompt) return json({ ok: true, skipped: 'no_prompt_configured' });

  const apiKey = (import.meta.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) return json({ ok: true, skipped: 'no_openai_key' });

  let actions = 0;
  const report: any[] = [];

  for (const inst of active) {
    if (Date.now() > deadline || actions >= MAX_ACTIONS_PER_TICK) break;

    // Chats com não lidas e atividade recente (nunca grupo)
    let chats: any[] = [];
    try {
      const r = await fetch(`${UAZAPI_URL}/chat/find`, {
        method: 'POST',
        headers: { token: inst.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
        signal: AbortSignal.timeout(10_000),
      });
      const raw = await r.json();
      chats = (Array.isArray(raw) ? raw : raw?.chats ?? raw?.data ?? [])
        .filter((c: any) => {
          const jid = c.wa_chatid ?? c.jid ?? '';
          if (!jid.includes('@s.whatsapp.net')) return false; // só 1:1 (nunca grupo)
          if (!(c.wa_unreadCount > 0)) return false;
          const ts = c.wa_lastMsgTimestamp ?? 0;
          const tsMs = ts > 1e12 ? ts : ts * 1000;
          return tsMs > Date.now() - RECENT_WINDOW_MS;
        })
        .slice(0, MAX_CHATS_PER_INSTANCE);
    } catch { continue; }

    for (const chat of chats) {
      if (Date.now() > deadline || actions >= MAX_ACTIONS_PER_TICK) break;
      const jid = chat.wa_chatid ?? chat.jid;

      // Estado da IA neste chat
      const { data: st } = await sb
        .from('az_bot_state')
        .select('*')
        .eq('instance_id', inst.id)
        .eq('chatid', jid)
        .maybeSingle();

      if (st?.handoff_until && new Date(st.handoff_until).getTime() > Date.now()) continue;

      // Últimas mensagens do chat (fresco, com o fix do chatid)
      let msgs: any[] = [];
      try {
        const r = await fetch(`${UAZAPI_URL}/message/find`, {
          method: 'POST',
          headers: { token: inst.token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatid: jid, limit: HISTORY_MSGS }),
          signal: AbortSignal.timeout(8_000),
        });
        const raw = await r.json();
        msgs = (Array.isArray(raw) ? raw : raw?.messages ?? raw?.data ?? [])
          .map((m: any) => {
            const ts = Number(m.messageTimestamp ?? m.timestamp ?? 0);
            return {
              fromMe: m.fromMe ?? m.key?.fromMe ?? false,
              text: (m.text ?? m.content?.text ?? m.body ?? m.caption ?? '').toString().trim(),
              at: ts > 1e12 ? ts : ts * 1000,
            };
          })
          .filter((m: any) => m.at > 0)
          .sort((a: any, b: any) => a.at - b.at);
      } catch { continue; }

      const lastInbound = [...msgs].reverse().find(m => m.fromMe === false);
      if (!lastInbound) continue;

      const lastBotAt = st?.last_bot_at ? new Date(st.last_bot_at).getTime() : 0;

      // Humano respondeu depois da IA? → handoff automático (a IA não atropela)
      const humanAfterBot = msgs.find(m => m.fromMe === true && m.at > lastBotAt + 10_000);
      if (humanAfterBot) {
        await upsertState(sb, inst.id, jid, {
          handoff_until: new Date(Date.now() + cfg.handoff_hours * 3600_000).toISOString(),
          bot_msg_count: 0,
        });
        report.push({ inst: inst.uazapi_name, jid, action: 'handoff_humano' });
        continue;
      }

      // Já respondeu esse inbound? (só age quando chega mensagem NOVA do cliente)
      if (lastInbound.at <= lastBotAt) continue;

      // Anti-loop: conversa longa demais sem humano → passa o bastão
      const count = Number(st?.bot_msg_count) || 0;
      if (count >= MAX_AI_REPLIES) {
        await upsertState(sb, inst.id, jid, {
          handoff_until: new Date(Date.now() + 4 * 3600_000).toISOString(),
        });
        report.push({ inst: inst.uazapi_name, jid, action: 'handoff_limite_ia' });
        continue;
      }

      // Gera a resposta com o histórico recente
      const reply = await aiReply(apiKey, cfg, inst.display_name || inst.uazapi_name, msgs);
      if (!reply) { report.push({ inst: inst.uazapi_name, jid, action: 'ia_sem_resposta' }); continue; }

      const sent = await sendText(inst.token, jid, reply);
      if (sent) {
        actions++;
        const now = new Date().toISOString();
        await upsertState(sb, inst.id, jid, {
          greeted_at: st?.greeted_at || now,
          last_bot_at: now,
          bot_msg_count: count + 1,
        });
        report.push({ inst: inst.uazapi_name, jid, action: 'resposta_ia', chars: reply.length });
      }
    }
  }

  return json({ ok: true, actions, report });
};

/** Monta o contexto e chama a OpenAI. Retorna null em qualquer falha (o tick
 *  seguinte tenta de novo — nunca manda mensagem de erro para o cliente). */
async function aiReply(apiKey: string, cfg: AiConfig, numberName: string, msgs: any[]): Promise<string | null> {
  const system =
    `${cfg.prompt}\n\n` +
    `Contexto operacional: você atende clientes pelo WhatsApp do número "${numberName}" da Azeredo Representações. ` +
    `Responda SEMPRE em português do Brasil, em tom natural de WhatsApp: direto, cordial e curto (1 a 3 frases; nunca mais de 500 caracteres). ` +
    `Sem markdown, sem listas longas, sem emojis em excesso. ` +
    `Use APENAS a base de conhecimento abaixo para responder sobre produtos, preços, prazos e condições — se a informação não estiver nela, diga que vai verificar com a equipe e que alguém retorna em breve. Nunca invente valores ou prazos.` +
    (cfg.knowledge ? `\n\nBASE DE CONHECIMENTO:\n${cfg.knowledge}` : '');

  const history = msgs
    .filter(m => m.text)
    .slice(-HISTORY_MSGS)
    .map(m => ({ role: m.fromMe ? 'assistant' : 'user', content: String(m.text).slice(0, 1000) }));
  if (history.length === 0 || history[history.length - 1].role !== 'user') return null;

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: 'system', content: system }, ...history],
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!r.ok) return null;
    const d = await r.json();
    const text = String(d?.choices?.[0]?.message?.content || '').trim();
    return text ? text.slice(0, 1200) : null;
  } catch {
    return null;
  }
}

async function sendText(token: string, jid: string, text: string): Promise<boolean> {
  try {
    const r = await fetch(`${UAZAPI_URL}/send/text`, {
      method: 'POST',
      headers: { token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: jid, text }),
      signal: AbortSignal.timeout(15_000),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function upsertState(sb: any, instance_id: string, chatid: string, patch: Record<string, any>) {
  await sb.from('az_bot_state').upsert(
    { instance_id, chatid, ...patch, updated_at: new Date().toISOString() },
    { onConflict: 'instance_id,chatid' }
  );
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
