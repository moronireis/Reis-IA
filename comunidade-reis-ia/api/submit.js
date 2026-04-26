import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, whatsapp, entendeu_recado, recado_comentario, momento, expectativa } = req.body;

  // Validate required fields
  const required = { name, email, whatsapp, entendeu_recado, momento, expectativa };
  for (const [field, value] of Object.entries(required)) {
    if (!value) {
      return res.status(400).json({ error: `Campo obrigatorio: ${field}` });
    }
  }

  // Save to Supabase
  const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: contact, error: saveError } = await supabase
    .from('contacts')
    .insert({
      name,
      email,
      phone: whatsapp,
      source: 'comunidade-live',
      form_type: 'comunidade',
      tags: ['Comunidade', 'Live'],
      notes: `Entendeu o recado: ${entendeu_recado}${recado_comentario ? ` — ${recado_comentario}` : ''}\nMomento com AI: ${momento}\nExpectativa: ${expectativa}`,
    })
    .select()
    .single();

  if (saveError) {
    console.error('[comunidade] Save failed:', saveError);
    return res.status(500).json({ error: 'Erro ao salvar. Tente novamente.' });
  }

  // Send email notification via Resend
  if (process.env.RESEND_API_KEY) {
    const html = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#4A90FF;font-weight:400;font-size:18px;margin-bottom:24px;">Nova aplicacao — Comunidade REIS [IA]</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);width:140px;">Nome</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Email</td><td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">WhatsApp</td><td style="padding:8px 0;">${whatsapp}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Entendeu o recado?</td><td style="padding:8px 0;">${entendeu_recado}</td></tr>
          ${recado_comentario ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Comentario</td><td style="padding:8px 0;">${recado_comentario}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Momento com AI</td><td style="padding:8px 0;">${momento}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Expectativa</td><td style="padding:8px 0;">${expectativa}</td></tr>
        </table>
      </div>
    `;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'REIS [IA] <notificacoes@moronireis.com.br>',
          to: ['moronif.reis@gmail.com'],
          subject: `[Comunidade] Nova aplicacao: ${name}`,
          html,
        }),
      });
    } catch (err) {
      console.error('[comunidade] Email failed:', err);
    }
  }

  // Send WhatsApp notification via Evolution API (if configured)
  if (process.env.WHATSAPP_API_URL && process.env.WHATSAPP_API_KEY) {
    const message = `*Nova aplicacao — Comunidade REIS [IA]*\n\n*Nome:* ${name}\n*Email:* ${email}\n*WhatsApp:* ${whatsapp}\n*Entendeu o recado:* ${entendeu_recado}${recado_comentario ? `\n*Comentario:* ${recado_comentario}` : ''}\n*Momento com AI:* ${momento}\n*Expectativa:* ${expectativa}`;

    try {
      await fetch(`${process.env.WHATSAPP_API_URL}/message/sendText/${process.env.WHATSAPP_INSTANCE}`, {
        method: 'POST',
        headers: {
          'apikey': process.env.WHATSAPP_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: process.env.WHATSAPP_NOTIFY_NUMBER || '5511999999999',
          text: message,
        }),
      });
    } catch (err) {
      console.error('[comunidade] WhatsApp failed:', err);
    }
  }

  return res.status(201).json({ success: true, id: contact.id });
}
