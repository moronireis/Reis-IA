/**
 * POST /api/leads — Save lead data
 * GET  /api/leads — List all leads
 *
 * Uses /tmp for serverless persistence within function lifecycle
 * + sends data to external webhook for permanent storage.
 *
 * Database name: reis-ia-leads
 * CRM ref format: REIS-LEAD-XXXXXX
 */

export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  email: string;
  company: string;
  segment: string;
  role: string;
  revenue: string;
  employees: string;
  booking: { date: string; time: string } | null;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  crmRef: string;
}

function generateId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${ts}${rand}`;
}

const LEADS_FILE = join('/tmp', 'reis-ia-leads.json');

function readLeads(): Lead[] {
  try {
    if (existsSync(LEADS_FILE)) {
      return JSON.parse(readFileSync(LEADS_FILE, 'utf-8')) as Lead[];
    }
  } catch {}
  return [];
}

function writeLeads(leads: Lead[]): void {
  writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

// Evolution API config for WhatsApp notifications
const EVOLUTION_API_URL = 'https://weirdpigeon-evolution.cloudfy.live/message/sendText/Reis';
const EVOLUTION_API_KEY = 'tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp';
const MORONI_WHATSAPP = '5511967615987';

// Send WhatsApp notification to Moroni for ALL leads
async function sendWhatsAppNotification(lead: Lead): Promise<void> {
  const isBooking = lead.booking !== null;

  const message = isBooking
    ? `*Novo agendamento REIS [IA]*\n\n` +
      `*Nome:* ${lead.name}\n` +
      `*WhatsApp:* ${lead.whatsapp}\n` +
      `*Email:* ${lead.email}\n` +
      `*Empresa:* ${lead.company}\n` +
      `*Segmento:* ${lead.segment}\n` +
      `*Cargo:* ${lead.role}\n` +
      `*Faturamento:* ${lead.revenue}\n` +
      `*Colaboradores:* ${lead.employees}\n` +
      `*Data:* ${lead.booking!.date} às ${lead.booking!.time}\n` +
      `*Fonte:* ${lead.source}\n` +
      `*Ref:* ${lead.crmRef}`
    : `*Novo lead REIS [IA] — Grupo WhatsApp*\n\n` +
      `*Nome:* ${lead.name}\n` +
      `*WhatsApp:* ${lead.whatsapp}\n` +
      `*Email:* ${lead.email}\n` +
      `*Empresa:* ${lead.company}\n` +
      `*Segmento:* ${lead.segment}\n` +
      `*Cargo:* ${lead.role}\n` +
      `*Faturamento:* ${lead.revenue}\n` +
      `*Colaboradores:* ${lead.employees}\n` +
      `*Fonte:* ${lead.source}\n` +
      `*Direcionado:* Grupo de conteúdos\n` +
      `*Ref:* ${lead.crmRef}`;

  try {
    await fetch(EVOLUTION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY,
      },
      body: JSON.stringify({
        number: MORONI_WHATSAPP,
        text: message,
      }),
    });
  } catch (err) {
    console.error('[leads] WhatsApp notification failed:', err);
  }
}

// Send lead to external webhook for permanent storage
async function sendToWebhook(lead: Lead): Promise<void> {
  const webhookUrl = import.meta.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error('[leads] Webhook failed:', err);
  }
}

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/HiqWoC9fHN1GaT5yBIqUJz';

// Send notification emails via Resend
async function sendEmails(lead: Lead): Promise<void> {
  const resendKey = import.meta.env.RESEND_API_KEY;
  const notifyEmail = import.meta.env.NOTIFY_EMAIL;
  if (!resendKey) return;

  const isBooking = lead.booking !== null;
  const firstName = lead.name.split(' ')[0];

  // 1. Notification to admin (Moroni)
  if (notifyEmail) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
        body: JSON.stringify({
          from: 'REIS [IA] <leads@reisia.com.br>',
          to: notifyEmail,
          subject: isBooking
            ? `Sessão agendada: ${lead.name} — ${lead.company} (${lead.booking!.date} ${lead.booking!.time})`
            : `Novo lead (grupo): ${lead.name} — ${lead.company}`,
          html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#333">
              <h2 style="color:#1a1a1a">${isBooking ? 'Sessão agendada' : 'Novo lead — direcionado ao grupo'}</h2>
              <table style="width:100%;border-collapse:collapse;margin:16px 0">
                <tr><td style="padding:6px 0;color:#888;width:140px">Nome</td><td style="padding:6px 0;font-weight:600">${lead.name}</td></tr>
                <tr><td style="padding:6px 0;color:#888">WhatsApp</td><td style="padding:6px 0">${lead.whatsapp}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Email</td><td style="padding:6px 0">${lead.email}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Empresa</td><td style="padding:6px 0">${lead.company}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Segmento</td><td style="padding:6px 0">${lead.segment}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Cargo</td><td style="padding:6px 0">${lead.role}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Faturamento</td><td style="padding:6px 0">${lead.revenue}</td></tr>
                <tr><td style="padding:6px 0;color:#888">Colaboradores</td><td style="padding:6px 0">${lead.employees}</td></tr>
                ${isBooking ? `<tr><td style="padding:6px 0;color:#888">Agendamento</td><td style="padding:6px 0;font-weight:600;color:#4A90FF">${lead.booking!.date} às ${lead.booking!.time}</td></tr>` : ''}
                <tr><td style="padding:6px 0;color:#888">Fonte</td><td style="padding:6px 0">${lead.source}</td></tr>
                <tr><td style="padding:6px 0;color:#888">CRM Ref</td><td style="padding:6px 0;font-family:monospace">${lead.crmRef}</td></tr>
              </table>
              <p style="color:#888;font-size:12px;margin-top:24px">REIS [IA] Lead System — ${lead.createdAt}</p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error('[leads] Admin email failed:', err);
    }
  }

  // 2. Confirmation email to the lead
  try {
    const leadEmailHtml = isBooking
      ? `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#333">
          <h2 style="color:#1a1a1a">Sessão confirmada</h2>
          <p>Olá, ${firstName}!</p>
          <p>Sua sessão está agendada para <strong>${lead.booking!.date} às ${lead.booking!.time}</strong>.</p>
          <p>Vamos conversar sobre como IA pode gerar resultados reais no seu negócio.</p>
          <div style="margin:24px 0;padding:20px;background:#f5f5f5;border-radius:8px">
            <p style="margin:0 0 4px;font-weight:600">Detalhes</p>
            <p style="margin:0;color:#555">Data: ${lead.booking!.date} às ${lead.booking!.time}</p>
            <p style="margin:4px 0 0;color:#555">O link da reunião será enviado antes do horário.</p>
          </div>
          <p>Até lá!</p>
          <p style="color:#888">— Equipe REIS [IA]</p>
        </div>
      `
      : `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#333">
          <h2 style="color:#1a1a1a">Bem-vindo à comunidade!</h2>
          <p>Olá, ${firstName}!</p>
          <p>Suas informações foram recebidas. Enquanto preparamos conteúdos personalizados pra você, entre no nosso grupo exclusivo de WhatsApp:</p>
          <div style="margin:24px 0;text-align:center">
            <a href="${WHATSAPP_GROUP_URL}" style="display:inline-block;padding:14px 28px;background:#25D366;color:#fff;font-weight:600;text-decoration:none;border-radius:8px;font-size:15px">Entrar no grupo de conteúdos</a>
          </div>
          <p>Lá você vai encontrar frameworks, cases e atualizações sobre como usar IA para gerar resultado.</p>
          <p>Até logo!</p>
          <p style="color:#888">— Equipe REIS [IA]</p>
        </div>
      `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: 'REIS [IA] <contato@reisia.com.br>',
        to: lead.email,
        subject: isBooking
          ? `Sessão confirmada — ${lead.booking!.date} às ${lead.booking!.time}`
          : 'Bem-vindo à comunidade REIS [IA]',
        html: leadEmailHtml,
      }),
    });
  } catch (err) {
    console.error('[leads] Lead email failed:', err);
  }
}

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
  }

  const required = ['name', 'whatsapp', 'email', 'company', 'segment', 'role', 'revenue', 'employees'];
  for (const field of required) {
    if (!body[field] || typeof body[field] !== 'string') {
      return new Response(JSON.stringify({ error: `Missing: ${field}` }), { status: 422, headers });
    }
  }

  const id = generateId();
  const isBookingUpdate = body.isBookingUpdate === true;
  const lead: Lead = {
    id,
    createdAt: new Date().toISOString(),
    name: body.name as string,
    whatsapp: body.whatsapp as string,
    email: body.email as string,
    company: body.company as string,
    segment: body.segment as string,
    role: body.role as string,
    revenue: body.revenue as string,
    employees: body.employees as string,
    booking: body.booking ? (body.booking as { date: string; time: string }) : null,
    source: typeof body.source === 'string' ? body.source : 'typebot-agendar',
    status: 'new',
    crmRef: `REIS-LEAD-${id}`,
  };

  // Save locally
  try {
    const leads = readLeads();
    leads.push(lead);
    writeLeads(leads);
  } catch (err) {
    console.error('[leads] Local save failed:', err);
  }

  // Send to external services
  // For booking updates, always send WhatsApp + emails
  // For initial leads (no booking), send webhook + emails only
  try {
    await sendToWebhook(lead);
  } catch {}
  try {
    await sendEmails(lead);
  } catch {}
  try {
    await sendWhatsAppNotification(lead);
  } catch {}

  return new Response(JSON.stringify({ success: true, id, crmRef: lead.crmRef }), { status: 200, headers });
};

export const GET: APIRoute = async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const leads = readLeads();
  return new Response(JSON.stringify({ leads, total: leads.length }), { status: 200, headers });
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
