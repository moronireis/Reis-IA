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
      momento_vida,
      objetivo_principal,
      dificuldades,
      feedback_curso,
      sugestoes_aulas,
      observacoes,
    } = body;

    if (!nome || !email || !whatsapp) {
      return new Response(
        JSON.stringify({ error: 'Nome, email e WhatsApp são obrigatórios' }),
        { status: 400, headers }
      );
    }

    const content = [
      `## Dados do Aluno`,
      `- **Nome:** ${nome}`,
      `- **Email:** ${email}`,
      `- **WhatsApp:** ${whatsapp}`,
      `- **Negócio/Cargo:** ${negocio || 'Não informado'}`,
      `- **Faturamento:** ${faturamento || 'Não informado'}`,
      ``,
      `## Momento e Objetivos`,
      `- **Momento de vida:** ${momento_vida}`,
      `- **Objetivo principal:** ${objetivo_principal}`,
      `- **Dificuldades:** ${dificuldades || 'Não informado'}`,
      ``,
      `## Sobre o MDV`,
      `- **Feedback do curso atual:** ${feedback_curso || 'Não informado'}`,
      `- **Sugestões de aulas:** ${sugestoes_aulas}`,
      `- **Observações:** ${observacoes || 'Nenhuma'}`,
    ].join('\n');

    const summary = `${nome} (${whatsapp}) - Fat: ${faturamento || '?'} - Objetivo: ${objetivo_principal?.substring(0, 80)}`;

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
          source: 'pesquisa-mdv-form',
          title: `Pesquisa MDV: ${nome}`,
          summary,
          content,
          tags: ['mdv', 'pesquisa', 'aluno'],
          metadata: {
            nome,
            email,
            whatsapp,
            negocio,
            faturamento,
            momento_vida,
            objetivo_principal,
            dificuldades,
            feedback_curso,
            sugestoes_aulas,
            observacoes,
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
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Pesquisa MDV <leads@moronireis.com.br>',
            to: 'moronif.reis@gmail.com',
            subject: `Pesquisa MDV: ${nome} — ${faturamento || 'sem faturamento'}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
                <h2 style="border-bottom:2px solid #4A90FF;padding-bottom:8px">Pesquisa MDV — ${nome}</h2>
                <table style="width:100%;border-collapse:collapse;margin:16px 0">
                  <tr><td style="padding:6px 12px;font-weight:bold;width:140px">Nome</td><td style="padding:6px 12px">${nome}</td></tr>
                  <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Email</td><td style="padding:6px 12px">${email}</td></tr>
                  <tr><td style="padding:6px 12px;font-weight:bold">WhatsApp</td><td style="padding:6px 12px">${whatsapp}</td></tr>
                  <tr style="background:#f9f9f9"><td style="padding:6px 12px;font-weight:bold">Negócio</td><td style="padding:6px 12px">${negocio || '-'}</td></tr>
                  <tr><td style="padding:6px 12px;font-weight:bold">Faturamento</td><td style="padding:6px 12px">${faturamento || '-'}</td></tr>
                </table>
                <h3 style="color:#4A90FF;margin-top:20px">Momento e Objetivos</h3>
                <p><strong>Momento:</strong> ${momento_vida}</p>
                <p><strong>Objetivo:</strong> ${objetivo_principal}</p>
                <p><strong>Dificuldades:</strong> ${dificuldades || '-'}</p>
                <h3 style="color:#4A90FF;margin-top:20px">Sobre o MDV</h3>
                <p><strong>Feedback:</strong> ${feedback_curso || '-'}</p>
                <p><strong>Quer aprender:</strong> ${sugestoes_aulas}</p>
                <p><strong>Observações:</strong> ${observacoes || '-'}</p>
                <hr style="margin:20px 0;border:none;border-top:1px solid #eee">
                <p style="font-size:12px;color:#999"><a href="https://hub-reisia.vercel.app/admin/knowledge">Ver todas as respostas no Hub</a></p>
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

    // At least one delivery method must succeed
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
