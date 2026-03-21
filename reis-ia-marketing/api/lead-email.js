/**
 * Reis Marketing IA — Lead Thank-You Email
 * POST /api/lead-email — sends diagnostic result email to the lead
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const PROFILES = {
  systems: {
    title: 'Implementação Estratégica',
    color: '#4ADE80',
    desc: 'Seu perfil indica que você já tem um negócio estabelecido e está no momento certo para implementar IA de forma estratégica — focada em receita, não em experimentos.'
  },
  builders: {
    title: 'Construtor de IA',
    color: '#2D7AFF',
    desc: 'Você tem o perfil de quem quer dominar IA para construir serviços, vender implementações ou escalar uma operação própria. Está no ponto certo para acelerar.'
  },
  starter: {
    title: 'Fundação Estratégica',
    color: '#FB923C',
    desc: 'Você está construindo as bases da sua jornada com IA — e esse é o momento mais importante. Com a orientação certa agora, cada passo seguinte fica mais claro e mais rápido.'
  }
};

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildLeadEmail(nome, perfil, scores) {
  const prof = PROFILES[perfil] || PROFILES.starter;
  const maxScore = 21;
  const pctSys = Math.round((scores.systems / maxScore) * 100);
  const pctBld = Math.round((scores.builders / maxScore) * 100);
  const pctStr = Math.round((scores.starter / maxScore) * 100);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background: #000; font-family: -apple-system, 'Inter', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">

    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="font-size: 18px; font-weight: 300; color: #fff; letter-spacing: -0.01em;">
        <span style="color: #4A90FF; font-weight: 600;">⧖</span>&nbsp; Reis IA
      </div>
    </div>

    <!-- Greeting -->
    <div style="margin-bottom: 32px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 12px; line-height: 1.3;">
        ${escapeHtml(nome)}, obrigado por fazer o diagnóstico.
      </h1>
      <p style="font-size: 15px; color: #aaa; line-height: 1.7; margin: 0;">
        Analisamos suas respostas e identificamos o seu perfil dentro do ecossistema Reis IA. Aqui está o resumo:
      </p>
    </div>

    <!-- Profile Card -->
    <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 28px; margin-bottom: 24px; border-left: 4px solid ${prof.color};">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: ${prof.color}; margin-bottom: 8px;">
        Seu Perfil
      </div>
      <div style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">
        ${prof.title}
      </div>
      <p style="font-size: 14px; color: #aaa; line-height: 1.7; margin: 0;">
        ${prof.desc}
      </p>
    </div>

    <!-- Heat Map -->
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <div style="font-size: 13px; font-weight: 600; color: #888; margin-bottom: 16px;">Mapa de Compatibilidade</div>

      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span style="color: #4ADE80; font-weight: 600;">Systems</span>
          <span style="color: #666;">${pctSys}%</span>
        </div>
        <div style="background: #1a1a1a; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: #4ADE80; height: 100%; border-radius: 4px; width: ${pctSys}%;"></div>
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span style="color: #2D7AFF; font-weight: 600;">Builders</span>
          <span style="color: #666;">${pctBld}%</span>
        </div>
        <div style="background: #1a1a1a; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: #2D7AFF; height: 100%; border-radius: 4px; width: ${pctBld}%;"></div>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span style="color: #FB923C; font-weight: 600;">Starter</span>
          <span style="color: #666;">${pctStr}%</span>
        </div>
        <div style="background: #1a1a1a; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: #FB923C; height: 100%; border-radius: 4px; width: ${pctStr}%;"></div>
        </div>
      </div>
    </div>

    <!-- Next Steps -->
    <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <div style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 8px;">Próximos passos</div>
      <p style="font-size: 14px; color: #aaa; line-height: 1.7; margin: 0;">
        Nosso time vai analisar seu diagnóstico individualmente. Em breve, vamos te chamar para uma conversa personalizada — sem compromisso — para te ajudar a alcançar os resultados que você busca.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #111;">
      <div style="font-size: 12px; color: #444; margin-bottom: 4px;">
        Reis IA — O Tempo é Rei.
      </div>
      <div style="font-size: 11px; color: #333;">
        Você recebeu este email porque completou o diagnóstico em marketing.moronireis.com.br
      </div>
    </div>

  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { nome, email, perfil, scores } = req.body;

    if (!nome || !email || !perfil) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const html = buildLeadEmail(nome, perfil, scores || { systems: 0, builders: 0, starter: 0 });

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Reis IA <onboarding@resend.dev>',
        to: email,
        subject: `${nome}, seu diagnóstico Reis IA está pronto`,
        html: html
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Lead email error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
