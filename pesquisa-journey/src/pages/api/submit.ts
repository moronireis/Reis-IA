import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const body = await request.json();

    const {
      nome,
      email,
      whatsapp,
      negocio,
      faturamento,
      equipe,
      usa_ia,
      experiencia_ia,
      objetivo_90dias,
      tempo_semanal,
      investimento,
      feedback_mdv,
      observacoes,
      score,
      qualified,
    } = body;

    if (!nome || !email || !whatsapp) {
      return new Response(
        JSON.stringify({ error: 'Nome, email e WhatsApp são obrigatórios' }),
        { status: 400, headers }
      );
    }

    const qualLabel = qualified ? 'QUALIFICADO' : 'AQUECIMENTO';

    const content = [
      `## Lead Journey — ${qualLabel} (Score: ${score}/15)`,
      ``,
      `### Dados`,
      `- **Nome:** ${nome}`,
      `- **Email:** ${email}`,
      `- **WhatsApp:** ${whatsapp}`,
      `- **Negócio:** ${negocio || 'Não informado'}`,
      `- **Faturamento:** ${faturamento || 'Não informado'}`,
      `- **Equipe:** ${equipe || 'Não informado'}`,
      ``,
      `### Relação com IA`,
      `- **Usa IA:** ${usa_ia || 'Não informado'}`,
      `- **Experiência:** ${experiencia_ia || 'Nenhuma'}`,
      ``,
      `### Objetivos e Compromisso`,
      `- **Objetivo 90 dias:** ${objetivo_90dias}`,
      `- **Tempo semanal:** ${tempo_semanal || 'Não informado'}`,
      `- **Investimento:** ${investimento || 'Não informado'}`,
      ``,
      `### Feedback MDV`,
      `- **Feedback:** ${feedback_mdv || 'Não informado'}`,
      `- **Observações:** ${observacoes || 'Nenhuma'}`,
    ].join('\n');

    const summary = `[${qualLabel}] ${nome} (${whatsapp}) — Score: ${score}/15 — Fat: ${faturamento || '?'} — ${investimento || '?'}`;

    // 1. Save to Hub via webhook
    let hubSaved = false;
    try {
      const hubRes = await fetch('https://hub-reisia.vercel.app/api/webhook/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-key': 'reisia-hub-webhook-2026',
        },
        body: JSON.stringify({
          source: 'pesquisa-journey',
          title: `Journey ${qualLabel}: ${nome}`,
          summary,
          content,
          tags: ['journey', 'pesquisa', qualified ? 'qualificado' : 'aquecimento'],
          metadata: {
            nome,
            email,
            whatsapp,
            negocio,
            faturamento,
            equipe,
            usa_ia,
            experiencia_ia,
            objetivo_90dias,
            tempo_semanal,
            investimento,
            feedback_mdv,
            observacoes,
            score,
            qualified,
            submitted_at: new Date().toISOString(),
          },
        }),
      });
      hubSaved = hubRes.ok;
      if (!hubRes.ok) {
        console.error('Hub webhook failed:', hubRes.status, await hubRes.text());
      }
    } catch (hubErr) {
      console.error('Hub webhook error:', hubErr);
    }

    // 2. Send email via Resend
    let emailSent = false;
    const resendKey = import.meta.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const scoreBar = '■'.repeat(score) + '□'.repeat(15 - score);
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Pesquisa Journey <leads@moronireis.com.br>',
            to: 'moronif.reis@gmail.com',
            subject: `${qualified ? '🔥 QUALIFICADO' : '📋 Aquecimento'} Journey: ${nome} — Score ${score}/15`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
                <div style="background:${qualified ? '#22C55E' : '#4A90FF'};color:#fff;padding:16px 20px;border-radius:8px 8px 0 0">
                  <h2 style="margin:0;font-size:18px">${qualified ? 'LEAD QUALIFICADO — Agendar call' : 'Lead em aquecimento — Enviado pra aula'}</h2>
                  <p style="margin:4px 0 0;font-size:14px;opacity:0.9">Score: ${score}/15 ${scoreBar}</p>
                </div>
                <div style="padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px">
                  <table style="width:100%;border-collapse:collapse;margin:0 0 16px">
                    <tr><td style="padding:6px 12px;font-weight:bold;width:140px">Nome</td><td style="padding:6px 12px">${nome}</td></tr>
                    <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
                    <tr><td style="padding:6px 12px;font-weight:bold">WhatsApp</td><td style="padding:6px 12px">${whatsapp}</td></tr>
                    <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Negócio</td><td style="padding:6px 12px">${negocio || '-'}</td></tr>
                    <tr><td style="padding:6px 12px;font-weight:bold">Faturamento</td><td style="padding:6px 12px">${faturamento || '-'}</td></tr>
                    <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Equipe</td><td style="padding:6px 12px">${equipe || '-'}</td></tr>
                  </table>
                  <h3 style="color:#4A90FF;margin:16px 0 8px;font-size:15px">Relação com IA</h3>
                  <p><strong>Usa IA:</strong> ${usa_ia || '-'}</p>
                  <p><strong>Experiência:</strong> ${experiencia_ia || '-'}</p>
                  <h3 style="color:#4A90FF;margin:16px 0 8px;font-size:15px">Objetivos</h3>
                  <p><strong>Meta 90 dias:</strong> ${objetivo_90dias}</p>
                  <p><strong>Tempo semanal:</strong> ${tempo_semanal || '-'}</p>
                  <p><strong>Investimento:</strong> ${investimento || '-'}</p>
                  ${feedback_mdv ? `<h3 style="color:#4A90FF;margin:16px 0 8px;font-size:15px">Feedback MDV</h3><p>${feedback_mdv}</p>` : ''}
                  ${observacoes ? `<p><strong>Obs:</strong> ${observacoes}</p>` : ''}
                  <hr style="margin:20px 0;border:none;border-top:1px solid #eee">
                  <p style="font-size:12px;color:#999"><a href="https://hub-reisia.vercel.app/admin/knowledge">Ver no Hub</a></p>
                </div>
              </div>
            `,
          }),
        });
        emailSent = emailRes.ok;
        if (!emailRes.ok) {
          console.error('Resend failed:', emailRes.status, await emailRes.text());
        }
      } catch (emailErr) {
        console.error('Email error:', emailErr);
      }
    }

    if (!hubSaved && !emailSent) {
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar resposta. Tente novamente.' }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true, hub: hubSaved, email: emailSent }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error('Submit error:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno' }),
      { status: 500, headers }
    );
  }
};
