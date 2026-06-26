// Centralized notification endpoint — Email (Resend) + WhatsApp (Evolution)
// Called by all forms and webhooks

const RESEND_KEY = 're_MTugi3Pt_Pks8TtxzvaZWYiPxRSKmdfbs';
const EVOLUTION_URL = 'https://weirdpigeon-evolution.cloudfy.live';
const EVOLUTION_KEY = 'tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp';
const EVOLUTION_INSTANCE = 'Reis';
const NOTIFY_PHONES = ['5511963341710', '5511967615987'];
const PADRINHOS_PHONES = ['5511914871992', '5511982245661', '5535991924824'];
const NOTIFY_EMAILS = ['moronif.reis@gmail.com', 'daphine.oliveira@gmail.com'];

export default async function handler(req, res) {
  // CORS headers for client-side calls
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { event, nome, whatsapp, fonte, valor, detalhes, telefone, presentes, outro, mesa, familia } = req.body;

    // Build messages based on event type
    let emailSubject, emailBody, whatsappMsg;

    switch (event) {
      case 'cadastro':
        emailSubject = `Novo cadastro — ${nome} (${fonte})`;
        emailBody = `
          <h2>Novo cadastro no site do casamento</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
          <p><strong>Fonte:</strong> ${fonte}</p>
          ${detalhes ? `<p><strong>Detalhes:</strong> ${detalhes}</p>` : ''}
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <hr><p><a href="https://moroniedaphine.vercel.app/admin">Abrir painel de convidados</a></p>
        `;
        whatsappMsg = `🔔 *Novo Cadastro — ${fonte}*\n\n👤 *${nome}*\n📱 ${whatsapp || 'N/A'}\n📍 Fonte: ${fonte}\n⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n🔗 moroniedaphine.vercel.app/admin`;
        break;

      case 'inicio_pagamento':
        emailSubject = `🛒 Início de pagamento — ${nome} (${detalhes || ''})`;
        emailBody = `
          <h2>Alguém iniciou um pagamento!</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
          <p><strong>Valor:</strong> ${valor}</p>
          <p><strong>Método:</strong> ${detalhes}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <hr><p><a href="https://moroniedaphine.vercel.app/admin">Abrir painel</a></p>
        `;
        whatsappMsg = `🛒 *Início de Pagamento!*\n\n👤 *${nome}*\n📱 ${whatsapp || 'N/A'}\n💵 ${valor}\n💳 ${detalhes || ''}\n⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`;
        break;

      case 'pagamento':
        emailSubject = `✅ Pagamento CONFIRMADO — R$ ${valor}`;
        emailBody = `
          <h2>Pagamento confirmado!</h2>
          <p><strong>Valor:</strong> R$ ${valor}</p>
          <p><strong>Pagador:</strong> ${nome || 'N/A'}</p>
          <p><strong>Método:</strong> ${detalhes || 'N/A'}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <hr><p><a href="https://moroniedaphine.vercel.app/admin">Abrir painel</a></p>
        `;
        whatsappMsg = `✅ *Pagamento CONFIRMADO!*\n\n💵 *R$ ${valor}*\n👤 ${nome || 'N/A'}\n💳 ${detalhes || 'N/A'}\n⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`;
        break;

      case 'rsvp':
        emailSubject = `RSVP confirmado — ${nome}`;
        emailBody = `
          <h2>Presença confirmada!</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
          ${detalhes ? `<p><strong>Detalhes:</strong> ${detalhes}</p>` : ''}
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
          <hr><p><a href="https://moroniedaphine.vercel.app/admin">Abrir painel</a></p>
        `;
        whatsappMsg = `✅ *Presença Confirmada!*\n\n👤 *${nome}*\n📱 ${whatsapp || 'N/A'}\n⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}\n\n🔗 moroniedaphine.vercel.app/admin`;
        break;

      case 'presente_mesa': {
        const mesaLabel = mesa ? `Mesa ${mesa}` : 'Mesa não informada';
        const familiaLabel = familia || '';
        const presentesList = (presentes && presentes.length > 0) ? presentes.join(', ') : 'Nenhum da lista';
        const outroLabel = outro ? outro : '';
        const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        emailSubject = `🎁 Presente — ${nome} (${mesaLabel})`;
        emailBody = `
          <h2>Novo presente registrado na mesa!</h2>
          <p><strong>Mesa:</strong> ${mesaLabel}${familiaLabel ? ` — ${familiaLabel}` : ''}</p>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Telefone:</strong> ${telefone || 'N/A'}</p>
          <p><strong>Presentes:</strong> ${presentesList}</p>
          ${outroLabel ? `<p><strong>Outro:</strong> ${outroLabel}</p>` : ''}
          <p><strong>Data:</strong> ${dataHora}</p>
          <hr><p><a href="https://moroniedaphine.vercel.app/admin">Abrir painel</a></p>
        `;
        whatsappMsg = `🎁 *Presente Registrado!*\n\n🪑 *${mesaLabel}*${familiaLabel ? ` — ${familiaLabel}` : ''}\n👤 *${nome}*\n📱 ${telefone || 'N/A'}\n\n📦 *Presentes:*\n${presentes && presentes.length > 0 ? presentes.map(p => `  • ${p}`).join('\n') : '  Nenhum da lista'}${outroLabel ? `\n\n✏️ *Outro:* ${outroLabel}` : ''}\n\n⏰ ${dataHora}`;
        break;
      }

      default:
        emailSubject = `Notificação — ${event || 'evento'}`;
        emailBody = `<h2>${event}</h2><p>${JSON.stringify(req.body)}</p>`;
        whatsappMsg = `🔔 *${event}*\n\n${JSON.stringify(req.body, null, 2)}`;
    }

    // Send email via Resend
    const emailPromise = fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_KEY}`
      },
      body: JSON.stringify({
        from: 'Casamento MD <onboarding@resend.dev>',
        to: NOTIFY_EMAILS,
        subject: emailSubject,
        html: emailBody
      })
    }).catch(e => console.log('Email error:', e));

    // Send WhatsApp via Evolution API (noivos)
    const whatsappPromises = NOTIFY_PHONES.map(phone =>
      fetch(`${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_KEY
        },
        body: JSON.stringify({
          number: phone,
          text: whatsappMsg
        })
      }).catch(e => console.log('WhatsApp error:', e))
    );

    // Send to padrinhos for presente_mesa events
    const padrinhosPromises = event === 'presente_mesa'
      ? PADRINHOS_PHONES.map(phone =>
          fetch(`${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': EVOLUTION_KEY
            },
            body: JSON.stringify({
              number: phone,
              text: whatsappMsg
            })
          }).catch(e => console.log('Padrinho WhatsApp error:', e))
        )
      : [];

    // Fire all in parallel
    await Promise.all([emailPromise, ...whatsappPromises, ...padrinhosPromises]);

    return res.status(200).json({ sent: true });
  } catch (error) {
    console.error('Notify error:', error);
    return res.status(200).json({ sent: false, error: error.message });
  }
}
