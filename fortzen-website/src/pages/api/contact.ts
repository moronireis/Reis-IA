import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, phone, email, service, message } = data;

    if (!name || !phone || !email || !service) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const serviceLabels: Record<string, string> = {
      monitoramento: "Monitoramento e CFTV",
      alarme: "Sistema de Alarme",
      portaria: "Portaria Remota",
      completo: "Solução Completa",
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "BATALION Site <onboarding@resend.dev>",
      to: "contato@batalion.com.br",
      replyTo: email,
      subject: `Novo orçamento — ${serviceLabels[service] || service} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2A6FF2; border-bottom: 2px solid #2A6FF2; padding-bottom: 10px;">
            Novo pedido de orçamento
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; width: 140px;">Nome:</td>
              <td style="padding: 10px; color: #555;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Telefone:</td>
              <td style="padding: 10px; color: #555;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333;">E-mail:</td>
              <td style="padding: 10px; color: #555;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Serviço:</td>
              <td style="padding: 10px; color: #555;">${serviceLabels[service] || service}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Mensagem:</td>
              <td style="padding: 10px; color: #555;">${message.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Enviado pelo formulário do site batalion.com.br
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Email send error:", errMsg);
    return new Response(
      JSON.stringify({ error: "Erro ao enviar mensagem", detail: errMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
