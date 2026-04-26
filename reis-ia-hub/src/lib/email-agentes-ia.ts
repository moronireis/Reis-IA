/**
 * AGENTES [IA] — branded transactional emails sent via Resend.
 *
 * Why a separate file (vs reusing src/lib/email.ts):
 *   - email.ts is wired to FORM_CONFIGS for branding-form result emails
 *     (different audience, different layout, different sender).
 *   - AGENTES [IA] buyers need a distinct sender ("REIS [IA] · AGENTES [IA]"),
 *     a distinct visual identity (cover image + price strip), and a magic-link
 *     CTA — not a form-results table.
 *
 * Sender uses the same domain (moroni@moronireis.com.br) so DKIM/SPF carry over.
 */

import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY || '');

const FROM_EMAIL = 'REIS [IA] · AGENTES [IA] <moroni@moronireis.com.br>';
const REPLY_TO = 'suporte@moronireis.com.br';
const ADMIN_BCC = 'moronireis@gmail.com';

const COVER_URL =
  'https://github.com/moronireis/Reis-IA/raw/claude/low-ticket-ai-agents-NLWih/agent-squad-lp/covers/agentes-ia-cover-1080x1080.png';

interface WelcomeEmailInput {
  to: string;
  name: string;
  magicLink: string;
  orderId: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildWelcomeHtml({ name, magicLink, orderId }: Omit<WelcomeEmailInput, 'to'>): string {
  const firstName = (name || '').split(' ')[0] || 'aluno(a)';
  const safeLink = escapeHtml(magicLink);
  const safeName = escapeHtml(firstName);
  const safeOrder = escapeHtml(orderId);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bem-vindo ao AGENTES [IA]</title></head>
<body style="margin:0;padding:0;background:#000;font-family:Inter,-apple-system,Segoe UI,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">

    <!-- Brand header -->
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;font-size:14px;color:#666;letter-spacing:0.08em;text-transform:uppercase;font-family:'JetBrains Mono',ui-monospace,monospace;">
        REIS <span style="color:#4A90FF;">[IA]</span> · AGENTES <span style="color:#4A90FF;">[IA]</span>
      </div>
    </div>

    <!-- Cover -->
    <div style="border-radius:16px;overflow:hidden;margin-bottom:28px;border:1px solid #1a1a1a;">
      <img src="${COVER_URL}" alt="AGENTES [IA]" width="600" style="display:block;width:100%;height:auto;" />
    </div>

    <!-- Greeting -->
    <div style="background:#0F0F0F;border:1px solid #1a1a1a;border-radius:14px;padding:28px;margin-bottom:24px;">
      <h1 style="font-size:24px;font-weight:700;color:#fff;margin:0 0 12px 0;letter-spacing:-0.02em;">
        ${safeName}, seu acesso está liberado.
      </h1>
      <p style="font-size:15px;color:#bdbdbd;line-height:1.65;margin:0 0 20px 0;">
        Bem-vindo ao <strong style="color:#fff;">AGENTES <span style="color:#4A90FF;">[IA]</span></strong>. Você comprou os 7 squads completos: <strong style="color:#fff;">40+ agentes especializados</strong> em copy, design, estratégia, branding e tráfego, prontos pra rodar dentro do Claude Code.
      </p>

      <!-- Magic Link CTA -->
      <div style="text-align:center;margin:28px 0 12px 0;">
        <a href="${safeLink}" style="display:inline-block;background:#4A90FF;color:#000;font-weight:700;font-size:16px;text-decoration:none;padding:16px 36px;border-radius:10px;letter-spacing:0.01em;">
          Entrar na área dos AGENTES [IA] →
        </a>
      </div>
      <p style="font-size:12px;color:#666;text-align:center;margin:8px 0 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;">
        Esse link entra direto, sem senha. Válido por 24 horas.
      </p>
    </div>

    <!-- Próximos passos -->
    <div style="background:rgba(74,144,255,0.05);border:1px solid rgba(74,144,255,0.18);border-radius:14px;padding:24px;margin-bottom:24px;">
      <h2 style="font-size:14px;font-weight:600;color:#4A90FF;margin:0 0 14px 0;text-transform:uppercase;letter-spacing:0.12em;">
        Próximos passos
      </h2>
      <ol style="margin:0;padding:0 0 0 18px;font-size:14px;color:#ccc;line-height:1.85;">
        <li style="margin-bottom:8px;"><strong style="color:#fff;">Aula 1</strong> — Visão geral dos 7 squads (12min)</li>
        <li style="margin-bottom:8px;"><strong style="color:#fff;">Aula 2</strong> — Instalando o Claude Code e os agentes (22min)</li>
        <li style="margin-bottom:8px;"><strong style="color:#fff;">Aula 3</strong> — Pipeline de copy completo (28min)</li>
        <li style="margin-bottom:0;"><strong style="color:#fff;">Aula 4</strong> — Próximos passos + Comunidade (18min)</li>
      </ol>
    </div>

    <!-- Garantia + suporte -->
    <div style="background:#0A0A0A;border:1px solid #1a1a1a;border-radius:14px;padding:20px 22px;margin-bottom:24px;">
      <p style="font-size:13px;color:#999;line-height:1.7;margin:0 0 8px 0;">
        <strong style="color:#fff;">Garantia de 7 dias</strong> — instale, teste tudo. Se não valer cada centavo dos R$47, responda este email pedindo reembolso. Devolvemos 100%, sem perguntas.
      </p>
      <p style="font-size:13px;color:#999;line-height:1.7;margin:0;">
        <strong style="color:#fff;">Suporte</strong> — <a href="mailto:${REPLY_TO}" style="color:#4A90FF;text-decoration:none;">${REPLY_TO}</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:18px 0 4px 0;border-top:1px solid #1a1a1a;">
      <p style="font-size:11px;color:#555;margin:0 0 4px 0;font-family:'JetBrains Mono',ui-monospace,monospace;">
        Pedido #${safeOrder}
      </p>
      <p style="font-size:11px;color:#555;margin:0;">
        REIS [IA] · O Tempo é Rei
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildWelcomeText({ name, magicLink, orderId }: Omit<WelcomeEmailInput, 'to'>): string {
  const firstName = (name || '').split(' ')[0] || 'aluno(a)';
  return `${firstName}, seu acesso ao AGENTES [IA] está liberado.

40+ agentes especializados em copy, design, estratégia, branding e tráfego.
Prontos pra rodar dentro do Claude Code.

Entre direto pelo link abaixo (sem senha, válido por 24h):
${magicLink}

Próximos passos:
1. Aula 1 — Visão geral dos 7 squads (12min)
2. Aula 2 — Instalando o Claude Code e os agentes (22min)
3. Aula 3 — Pipeline de copy completo (28min)
4. Aula 4 — Próximos passos + Comunidade (18min)

Garantia de 7 dias. Se não valer cada centavo dos R$47, responda este email pedindo reembolso.
Suporte: ${REPLY_TO}

Pedido #${orderId}
REIS [IA] · O Tempo é Rei`;
}

export async function sendAgentesIaWelcomeEmail(input: WelcomeEmailInput): Promise<boolean> {
  const html = buildWelcomeHtml(input);
  const text = buildWelcomeText(input);
  const subject = 'Seu acesso ao AGENTES [IA] está liberado →';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: input.to,
      bcc: ADMIN_BCC,
      replyTo: REPLY_TO,
      subject,
      html,
      text,
      headers: {
        'X-Entity-Ref-ID': `agentes-ia-welcome-${input.orderId}`,
      },
    });
    return true;
  } catch (err) {
    console.error('[email-agentes-ia] welcome send failed', err);
    return false;
  }
}
