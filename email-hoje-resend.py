import json
import random
import time
import sys
import requests

RESEND_API_KEY = "re_MTugi3Pt_Pks8TtxzvaZWYiPxRSKmdfbs"
RESEND_URL = "https://api.resend.com/emails"
FROM_EMAIL = "Moroni Reis <moroni@moronireis.com.br>"

GRUPO_WHATSAPP = "https://chat.whatsapp.com/HiqWoC9fHN1GaT5yBIqUJz?mode=gi_t"


def generate_email(name):
    first = name.split()[0] if name else "amigo"

    confirmations = [
        f"Aqui é o Moroni, {first}.",
        f"Moroni aqui, {first}.",
        f"{first}, aqui é o Moroni.",
    ]

    temas = [
        "Vou abrir o <strong style=\"color: #fff;\">Plano 100K com IA</strong> — o passo a passo pra chegar nos primeiros R$100K usando inteligência artificial.",
        "Hoje eu abro o <strong style=\"color: #fff;\">Plano 100K com IA</strong> — como chegar nos R$100K com IA de verdade.",
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
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Entra no grupo abaixo. É lá que eu mando o link da sala às 19h.</p>
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

    return html


def send_email(to, html):
    resp = requests.post(RESEND_URL, headers={
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }, json={
        "from": FROM_EMAIL,
        "to": to,
        "subject": "É HOJE, 19h — Plano 100K com IA",
        "html": html,
    })
    return resp.status_code, resp.json()


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"

    if mode == "test":
        html = generate_email("Moroni")
        status, resp = send_email("moronif.reis@gmail.com", html)
        print(f"Status: {status}")
        print(f"Response: {resp}")

    elif mode == "disparo":
        list_file = sys.argv[2] if len(sys.argv) > 2 else "/Users/moronireis/Projetos vscode/email-hoje-toda-base.json"
        start = int(sys.argv[3]) if len(sys.argv) > 3 else 0

        with open(list_file, "r") as f:
            contacts = json.load(f)

        batch = contacts[start:]

        print(f"=== DISPARO EMAIL VIA RESEND — É HOJE ===")
        print(f"From: {FROM_EMAIL}")
        print(f"Total: {len(contacts)}")
        print(f"Início: {start}")
        print(f"A enviar: {len(batch)}\n")

        sent = 0
        errors = 0
        for i, contact in enumerate(batch, start + 1):
            name = contact.get("name", "")
            email = contact["email"]
            html = generate_email(name)

            print(f"[{i}/{len(contacts)}] {name or '—'} ({email})...")
            try:
                status, resp = send_email(email, html)
                if status in (200, 201):
                    print(f"  OK")
                    sent += 1
                else:
                    print(f"  ERRO {status}: {resp.get('message', resp)}")
                    errors += 1
            except Exception as e:
                print(f"  ERRO: {e}")
                errors += 1

            if i < len(contacts):
                delay = random.uniform(0.3, 0.8)
                time.sleep(delay)

        print(f"\n=== FINALIZADO ===")
        print(f"Enviados: {sent}/{len(batch)}")
        if errors:
            print(f"Erros: {errors}")


if __name__ == "__main__":
    main()
