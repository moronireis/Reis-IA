import { Resend } from 'resend';
import { FORM_CONFIGS } from './form-configs';

const resend = new Resend(import.meta.env.RESEND_API_KEY || '');

const FROM_EMAIL = 'REIS [IA] HUB <moroni@moronireis.com.br>';
const ADMIN_EMAIL = 'moronireis@gmail.com';

interface FormEmailData {
  to: string;
  userName: string;
  formType: string;
  formData: Record<string, unknown>;
}

function buildFormResultsHtml(userName: string, formType: string, formData: Record<string, unknown>): string {
  const config = FORM_CONFIGS[formType];
  if (!config) return '';

  const firstName = userName.split(' ')[0] || 'aluno';
  const formTitle = config.title;

  // Build sections with answers
  let sectionsHtml = '';
  for (const section of config.sections) {
    let fieldsHtml = '';
    for (const field of section.fields) {
      const value = formData[field.id];
      if (!value) continue;
      const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
      fieldsHtml += `
        <tr>
          <td style="padding: 8px 12px; font-size: 13px; color: #999; vertical-align: top; width: 35%; border-bottom: 1px solid #1a1a1a;">${field.label}</td>
          <td style="padding: 8px 12px; font-size: 13px; color: #fff; border-bottom: 1px solid #1a1a1a;">${displayValue.replace(/\n/g, '<br>')}</td>
        </tr>`;
    }
    if (fieldsHtml) {
      sectionsHtml += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #4A90FF; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">${section.title}</h3>
          <table style="width: 100%; border-collapse: collapse; background: #111; border-radius: 8px; overflow: hidden;">
            ${fieldsHtml}
          </table>
        </div>`;
    }
  }

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin: 0; padding: 0; background: #000; font-family: 'Inter', -apple-system, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; padding: 32px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="font-size: 18px; font-weight: 300; color: #fff; letter-spacing: -0.02em;">
        REIS <span style="color: #4A90FF;">[IA]</span> <span style="color: #666; font-size: 14px;">HUB</span>
      </div>
    </div>

    <!-- Greeting -->
    <div style="background: #0F0F0F; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h1 style="font-size: 20px; font-weight: 600; color: #fff; margin: 0 0 8px 0;">
        ${firstName}, seu ${formTitle} foi enviado
      </h1>
      <p style="font-size: 14px; color: #999; line-height: 1.6; margin: 0;">
        Aqui esta o registro completo das suas respostas. Guarde este email — voce vai precisar dessas informacoes nos proximos passos.
      </p>
    </div>

    <!-- Form Results -->
    <div style="background: #0A0A0A; border: 1px solid #1a1a1a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 20px 0; padding-bottom: 12px; border-bottom: 1px solid #1a1a1a;">
        Suas Respostas — ${formTitle}
      </h2>
      ${sectionsHtml}
    </div>

    <!-- Next Steps -->
    <div style="background: rgba(74,144,255,0.05); border: 1px solid rgba(74,144,255,0.15); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h2 style="font-size: 16px; font-weight: 600; color: #4A90FF; margin: 0 0 16px 0;">
        Proximos passos
      </h2>
      <div style="font-size: 13px; color: #ccc; line-height: 1.8;">
        <p style="margin: 0 0 12px 0;">
          <strong style="color: #fff;">1. Revisao</strong> — Seu formulario sera revisado pela equipe. Voce recebera uma notificacao quando for aprovado.
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong style="color: #fff;">2. Voice DNA</strong> — Com base nas suas respostas, vamos extrair seu perfil de voz (tom, vocabulario, estilo de comunicacao). Esse perfil guia toda a copy e conteudo produzido pra voce.
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong style="color: #fff;">3. Design System</strong> — As respostas sobre visual, referencias e estilo alimentam a criacao do seu sistema de design (cores, tipografia, componentes).
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong style="color: #fff;">4. Posicionamento</strong> — Seu posicionamento, audiencia e diferencial viram a base da estrategia de comunicacao e marketing.
        </p>
        <p style="margin: 0;">
          <strong style="color: #fff;">5. Implementacao</strong> — Tudo isso se transforma em site, conteudo, copy e presenca digital construidos sob medida.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #1a1a1a;">
      <p style="font-size: 11px; color: #555; margin: 0;">
        REIS [IA] — O Tempo e Rei
      </p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendFormResultsEmail({ to, userName, formType, formData }: FormEmailData): Promise<boolean> {
  const config = FORM_CONFIGS[formType];
  if (!config) return false;

  const formTitle = config.title;
  const html = buildFormResultsHtml(userName, formType, formData);
  const subject = `${formTitle} — Suas respostas foram registradas`;

  try {
    // Send to student
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    // Send backup to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `[Backup] ${formTitle} — ${userName}`,
      html,
    });

    return true;
  } catch (err) {
    console.error('[email] Failed to send form results:', err);
    return false;
  }
}
