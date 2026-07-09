import type { createServerClient } from './supabase-server';

type SB = ReturnType<typeof createServerClient>;

/**
 * Varredura de RESPOSTAS (Fase 2 do backlog).
 *
 * O servidor UazapiGO (u4digital.uazapi.com) não entrega webhook de espécie
 * alguma — inbound, fromMe ou ACK (comprovado 02/07). Então as respostas dos
 * clientes são capturadas ativamente: para cada recipient já enviado e ainda
 * sem replied_at, consulta POST /message/find no chat e procura mensagens
 * inbound posteriores ao envio. Grava em az_messages (direction=inbound,
 * dedupe pelo índice único de wa_message_id) e marca recipient.replied_at.
 *
 * Chamada pelo worker (orçamento pequeno por hop) e pelo endpoint do
 * dashboard (polling 5s enquanto a tela está aberta). Se o webhook um dia
 * funcionar, os handlers v7 alimentam o mesmo dado — sem retrabalho.
 */

export interface ReplyScanRow {
  id: string;                 // az_campaign_recipients.id
  phone: string;
  sent_at: string | null;
  contact_id: string | null;
  campaign_id: string;
  instance_id: string | null;
  token: string | null;       // token da instância da campanha
}

interface ScanResult { scanned: number; replies: number; }

export async function scanReplies(
  sb: SB,
  uazUrl: string,
  fallbackToken: string,
  rows: ReplyScanRow[],
  deadlineMs: number
): Promise<ScanResult> {
  let scanned = 0;
  let replies = 0;
  if (!uazUrl || rows.length === 0) return { scanned, replies };

  // Um fetch por chat: agrupa recipients que compartilham fone+token
  const byChat = new Map<string, ReplyScanRow[]>();
  for (const r of rows) {
    const key = `${r.token || fallbackToken}|${r.phone}`;
    byChat.set(key, [...(byChat.get(key) || []), r]);
  }

  for (const [key, group] of byChat) {
    if (Date.now() > deadlineMs) break;
    const token = key.split('|')[0];
    const phone = group[0].phone;
    if (!token) continue;

    let messages: any[] = [];
    try {
      const res = await fetch(`${uazUrl}/message/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ chatid: `${phone}@s.whatsapp.net`, limit: 30 }),
        signal: AbortSignal.timeout(6_000),
      });
      const data = await res.json().catch(() => null);
      messages = data?.messages || [];
    } catch {
      continue; // tenta no próximo ciclo — nem marca checked
    }

    const nowIso = new Date().toISOString();

    // Mensagens inbound do chat (fromMe === false explícito, para não gerar
    // falso positivo se o campo não vier)
    const inbound = messages
      .map((m: any) => {
        const fromMe = m.fromMe ?? m.key?.fromMe ?? m.fromme;
        const ts = Number(m.messageTimestamp ?? m.timestamp ?? 0);
        const tsMs = ts > 1e12 ? ts : ts * 1000;
        const rawText = m.text ?? m.content?.text ?? m.body ?? m.caption ?? null;
        return {
          fromMe,
          id: m.messageid || m.id || null,
          at: tsMs > 0 ? new Date(tsMs) : null,
          text: typeof rawText === 'string' && rawText.trim() ? rawText.trim().slice(0, 2000) : null,
          mediaType: m.mediaType || m.type || null,
        };
      })
      .filter(m => m.fromMe === false && m.at);

    for (const r of group) {
      scanned++;
      const sentAt = r.sent_at ? new Date(r.sent_at).getTime() : 0;
      const after = inbound.filter(m => (m.at as Date).getTime() >= sentAt);

      if (after.length > 0) {
        const first = after.reduce((a, b) => ((a.at as Date) < (b.at as Date) ? a : b));

        await sb.from('az_campaign_recipients')
          .update({ replied_at: (first.at as Date).toISOString(), reply_checked_at: nowIso })
          .eq('id', r.id)
          .is('replied_at', null);
        replies++;

        // Log das respostas — insert simples: o índice único parcial de
        // wa_message_id rejeita duplicata (upsert onConflict não casa com
        // índice parcial no PostgREST), e o erro 23505 é ignorado.
        for (const m of after.slice(0, 5)) {
          if (!m.id) continue;
          const { error } = await sb.from('az_messages').insert({
            contact_id: r.contact_id,
            campaign_id: r.campaign_id,
            instance_id: r.instance_id,
            phone: r.phone,
            wa_message_id: m.id,
            direction: 'inbound',
            body: m.text || (m.mediaType ? `[${m.mediaType}]` : '[mensagem]'),
            status: 'received',
            created_at: (m.at as Date).toISOString(),
          });
          if (error && !`${error.code}`.includes('23505') && !`${error.message}`.includes('duplicate')) {
            console.error('[reply-scan] insert inbound falhou:', error.message);
          }
        }
      } else {
        await sb.from('az_campaign_recipients')
          .update({ reply_checked_at: nowIso })
          .eq('id', r.id);
      }
    }
  }

  return { scanned, replies };
}
