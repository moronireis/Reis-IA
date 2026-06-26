const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');

const LEADS_FILE = join('/tmp', 'castelo-leads.json');
const EVOLUTION_API_URL = 'https://weirdpigeon-evolution.cloudfy.live/message/sendText/Reis';
const EVOLUTION_API_KEY = 'tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp';
const MORONI_WHATSAPP = '5511967615987';
const CASTELO_WHATSAPP = '5511933166819';

function readLeads() {
  try {
    if (existsSync(LEADS_FILE)) {
      return JSON.parse(readFileSync(LEADS_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function writeLeads(leads) {
  writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function generateId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CDL-${ts}${rand}`;
}

const TIPO_LABELS = {
  casamento: 'Casamento',
  debutante: 'Festa de 15 Anos',
  corporativo: 'Evento Corporativo',
  outro: 'Outro',
};

const CONVIDADOS_LABELS = {
  'ate-100': 'Até 100',
  '100-200': '100 a 200',
  '200-350': '200 a 350',
  '350+': 'Mais de 350',
};

const PERIODO_LABELS = {
  '2026': 'Ainda em 2026',
  'inicio-2027': 'Início de 2027',
  'meio-2027': 'Meio de 2027',
  'fim-2027': 'Final de 2027',
  '2028+': '2028 em diante',
  'indefinido': 'Ainda não decidiu',
};

async function sendWhatsApp(number, text) {
  try {
    await fetch(EVOLUTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({ number, text }),
    });
  } catch (err) {
    console.error(`[castelo-lp] WhatsApp to ${number} failed:`, err);
  }
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // GET — return all leads
  if (req.method === 'GET') {
    const leads = readLeads();
    return res.status(200).json({ leads, total: leads.length });
  }

  // POST — save lead + notify
  if (req.method === 'POST') {
    const { nome, whatsapp, tipo, convidados, periodo, sonho, source, utm_medium, utm_campaign, utm_content, utm_term, fbclid } = req.body || {};

    if (!nome || !whatsapp) {
      return res.status(422).json({ error: 'Nome e WhatsApp são obrigatórios' });
    }

    const id = generateId();
    const lead = {
      id,
      createdAt: new Date().toISOString(),
      nome,
      whatsapp,
      tipo: tipo || '',
      tipoLabel: TIPO_LABELS[tipo] || tipo || '',
      convidados: convidados || '',
      convidadosLabel: CONVIDADOS_LABELS[convidados] || convidados || '',
      periodo: periodo || '',
      periodoLabel: PERIODO_LABELS[periodo] || periodo || '',
      sonho: sonho || '',
      source: source || 'direto',
      utm_medium: utm_medium || '',
      utm_campaign: utm_campaign || '',
      utm_content: utm_content || '',
      utm_term: utm_term || '',
      fbclid: fbclid || '',
      status: 'novo',
    };

    // Save
    try {
      const leads = readLeads();
      leads.push(lead);
      writeLeads(leads);
    } catch (err) {
      console.error('[castelo-lp] Save failed:', err);
    }

    // Build notification message
    const msg =
      `*Novo Lead — Castelo dos Lagos*\n\n` +
      `*Nome:* ${lead.nome}\n` +
      `*WhatsApp:* ${lead.whatsapp}\n` +
      `*Evento:* ${lead.tipoLabel}\n` +
      `*Convidados:* ${lead.convidadosLabel}\n` +
      `*Período:* ${lead.periodoLabel}\n` +
      (lead.sonho ? `*O que mais importa:* ${lead.sonho}\n` : '') +
      `\n*Ref:* ${lead.id}\n` +
      (lead.utm_content ? `*Criativo:* ${lead.utm_content}\n` : '') +
      (lead.utm_campaign ? `*Campanha:* ${lead.utm_campaign}\n` : '') +
      `*Fonte:* ${lead.source === 'meta' ? 'Meta Ads' : lead.source}`;

    // Send to Castelo + Moroni in parallel
    await Promise.all([
      sendWhatsApp(CASTELO_WHATSAPP, msg),
      sendWhatsApp(MORONI_WHATSAPP, msg),
    ]);

    return res.status(200).json({ success: true, id: lead.id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
