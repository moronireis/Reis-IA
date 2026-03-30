import json
import random
import time
import smtplib
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_USER = "moronireis@gmail.com"
SMTP_PASS = "rwcy uklj szhd modt"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

GRUPO_WHATSAPP = "https://chat.whatsapp.com/HiqWoC9fHN1GaT5yBIqUJz?mode=gi_t"


def generate_html_email(name):
    first = name.split()[0] if name else "amigo"

    confirmations = [
        f"Sua presença tá confirmada, {first}. Aqui é o Moroni.",
        f"Sua vaga tá garantida, {first}. Moroni aqui.",
        f"Você tá dentro, {first}. Aqui é o Moroni.",
    ]

    temas = [
        "Vou abrir o <strong style=\"color: #fff;\">Plano 100K com IA</strong> — o passo a passo pra chegar nos primeiros R$100K usando inteligência artificial.",
        "Amanhã eu abro o <strong style=\"color: #fff;\">Plano 100K com IA</strong> — como chegar nos R$100K com IA de verdade.",
        "O <strong style=\"color: #fff;\">Plano 100K com IA</strong>. O caminho real pra faturar R$100K com inteligência artificial.",
    ]

    bonus_options = [
        "Quem participar recebe acesso a uma <strong style=\"color: #4A90FF;\">comunidade exclusiva</strong> + um <strong style=\"color: #4A90FF;\">time de agentes de IA</strong> pra acelerar seus resultados.",
        "Quem estiver lá ganha acesso a uma <strong style=\"color: #4A90FF;\">comunidade exclusiva</strong> e um <strong style=\"color: #4A90FF;\">time de agentes de IA</strong> trabalhando por você.",
        "Bônus: acesso a uma <strong style=\"color: #4A90FF;\">comunidade exclusiva</strong> + <strong style=\"color: #4A90FF;\">time de agentes de IA</strong> na prática.",
    ]

    confirmation = random.choice(confirmations)
    tema = random.choice(temas)
    bonus = random.choice(bonus_options)

    html = f'''<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000000; color: #ffffff; margin: 0; padding: 0;">

  <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">

    <div style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 48px 36px;">

      <p style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 28px; letter-spacing: -0.02em;">É HOJE, {first}, 19h.</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{confirmation}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{tema}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 32px;">{bonus}</p>

      <div style="background: rgba(74,144,255,0.04); border: 1px solid rgba(74,144,255,0.15); border-radius: 12px; padding: 24px 28px; margin: 0 0 32px; text-align: center;">
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0 0 4px;">Entra no grupo abaixo. É lá que eu mando o link da sala às 19h.</p>
      </div>

      <div style="text-align: center; margin: 0 0 32px;">
        <a href="{GRUPO_WHATSAPP}" style="display: inline-block; background: #4A90FF; color: #ffffff; text-decoration: none; padding: 18px 52px; border-radius: 9999px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">Entrar no grupo</a>
      </div>

    </div>

    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
      <p style="font-size: 14px; color: rgba(255,255,255,0.35); margin: 0 0 4px;">Moroni Reis</p>
      <p style="font-size: 12px; color: rgba(255,255,255,0.2); margin: 0;">Reis IA</p>
    </div>

  </div>
</body>
</html>'''

    text = f"""É HOJE, {first}, 19h.

{confirmation}

{tema.replace('<strong style="color: #fff;">', '').replace('<strong style="color: #4A90FF;">', '').replace('</strong>', '')}

{bonus.replace('<strong style="color: #4A90FF;">', '').replace('</strong>', '')}

Entra no grupo abaixo. É lá que eu mando o link da sala às 19h.

{GRUPO_WHATSAPP}

Moroni Reis
Reis IA"""

    return html, text


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"

    if mode == "test":
        name = "Moroni"
        to = "moronif.reis@gmail.com"
        html, text = generate_html_email(name)

        msg = MIMEMultipart("alternative")
        msg["From"] = "Moroni Reis <moronireis@gmail.com>"
        msg["To"] = to
        msg["Subject"] = "É HOJE, 19h — Plano 100K com IA"
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))

        print(f"Enviando teste para {to}...")
        try:
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
            server.quit()
            print("Email enviado com sucesso!")
        except Exception as e:
            print(f"ERRO: {e}")

    elif mode == "disparo":
        list_file = sys.argv[2] if len(sys.argv) > 2 else "/Users/moronireis/Projetos vscode/imersao-2603-disparo-lista.json"
        start = int(sys.argv[3]) if len(sys.argv) > 3 else 0

        with open(list_file, "r") as f:
            contacts = json.load(f)

        # Filter only contacts with email
        contacts_with_email = [c for c in contacts if c.get("email")]
        batch = contacts_with_email[start:]

        print(f"=== DISPARO EMAIL — IMERSÃO 26/03 ===")
        print(f"Total na lista: {len(contacts_with_email)}")
        print(f"Iniciando do: {start}")
        print(f"A enviar: {len(batch)}\n")

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)

        sent = 0
        errors = 0
        for i, contact in enumerate(batch, start + 1):
            name = contact.get("name", "")
            email = contact["email"]
            html, text = generate_html_email(name)

            msg = MIMEMultipart("alternative")
            msg["From"] = "Moroni Reis <moronireis@gmail.com>"
            msg["To"] = email
            msg["Subject"] = "É HOJE, 19h — Plano 100K com IA"
            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            print(f"[{i}/{len(contacts_with_email)}] {name or '—'} ({email})...")
            try:
                server.send_message(msg)
                print(f"  OK")
                sent += 1
            except Exception as e:
                print(f"  ERRO: {e}")
                errors += 1
                # Reconnect on error
                try:
                    server.quit()
                except:
                    pass
                server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
                server.starttls()
                server.login(SMTP_USER, SMTP_PASS)

            if contact != batch[-1]:
                delay = random.uniform(2, 4)
                time.sleep(delay)

        server.quit()
        print(f"\n=== FINALIZADO ===")
        print(f"Enviados: {sent}/{len(batch)}")
        if errors:
            print(f"Erros: {errors}")


if __name__ == "__main__":
    main()
