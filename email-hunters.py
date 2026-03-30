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


def generate_html_email(name):
    first_name = name.split()[0] if name else "Hunter"

    greetings = [
        f"{first_name}, você que é AI Hunter, essa mensagem é pra você.",
        f"Fala, {first_name}! Como membro dos AI Hunters, você precisa ver isso.",
        f"{first_name}, você que faz parte dos AI Hunters, presta atenção aqui.",
        f"E aí, {first_name}! Você que é Hunter, isso aqui é pra você.",
        f"{first_name}, como AI Hunter você tem acesso a isso antes de todo mundo.",
        f"Fala {first_name}, tô mandando isso direto pra você que é AI Hunter.",
        f"Opa {first_name}, você que é dos AI Hunters, olha isso aqui.",
        f"{first_name}, essa mensagem é exclusiva pra quem é AI Hunter. Como você.",
    ]

    intros = [
        "Vou ser direto com você.",
        "Vou ser direto.",
        "Direto ao ponto.",
        "Sem rodeios.",
        "Olha, vou direto ao que interessa.",
    ]

    body1_options = [
        "Eu sei que você está tentando. Testando ferramentas, assistindo conteúdos, mas os resultados ainda não vieram. Nessa imersão, eu vou resolver isso de uma vez. Você vai ver na prática como <strong style=\"color: #fff;\">lucrar com IA</strong> — e tirar todas as dúvidas que estão te travando.",
        "Você já deu o primeiro passo entrando nos AI Hunters. Agora é hora do resultado. Vou abrir a operação inteira ao vivo — um time de agentes de IA que faz marketing, cria produtos, constrói sites e vende. E vou te mostrar como <strong style=\"color: #fff;\">replicar isso</strong>.",
        "Cada dia tentando sozinho é um dia a mais sem resultado. Nessa imersão eu vou encurtar meses de tentativa e erro numa noite. Você vai ver na prática como pessoas comuns estão <strong style=\"color: #fff;\">lucrando com IA</strong> — e como fazer o mesmo.",
        "A comunidade já gerou mais de R$ 700K em contratos. Pessoas que começaram exatamente onde você está agora. Nessa imersão, eu vou te mostrar o caminho que funcionou pra eles — e como <strong style=\"color: #fff;\">você pode fazer igual</strong>.",
    ]

    body2_options = [
        "Sem mais dúvidas. Sem mais tentativa e erro. O caminho que funciona, mostrado ao vivo.",
        "Chega de tentar sozinho. Chega de assistir conteúdo que não gera resultado. Isso é diferente.",
        "Nada de teoria. Nada de enrolação. É operação real, ao vivo, na sua frente.",
        "Aquele bloqueio que não te deixa avançar? Aquela estratégia que não funciona? Traz tudo. Eu resolvo ao vivo.",
    ]

    community_options = [
        "Além da imersão, você terá acesso ao <strong style=\"color: #FF4444;\">caminho real pra lucrar com IA</strong> — o passo a passo que está gerando contratos de R$3K a R$35K. Sem teoria. Sem enrolação.",
        "Você também vai entender como ter um <strong style=\"color: #FF4444;\">time de agentes de IA</strong> que faz o trabalho pesado por você — marketing, produtos, sites e vendas. Tudo no automático.",
        "E o melhor: você vai poder <strong style=\"color: #FF4444;\">tirar todas as suas dúvidas ao vivo</strong>. Ferramentas, estratégia, primeiro cliente. Eu resolvo na hora com você.",
    ]

    closing_options = [
        "Não vai ficar gravado. Só quem confirmar e comparecer vai ter acesso.",
        "Sem gravação. Sem replay. Quem confirmar e estiver lá, terá seu lugar.",
        "Essa não vai ficar gravada. Única chance é ao vivo.",
        "Não terá replay. Só quem estiver lá vai ver.",
    ]

    greeting = random.choice(greetings)
    intro = random.choice(intros)
    body1 = random.choice(body1_options)
    body2 = random.choice(body2_options)
    community = random.choice(community_options)
    closing = random.choice(closing_options)

    html = f'''<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000000; color: #ffffff; margin: 0; padding: 0;">

  <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">

    <div style="text-align: center; margin-bottom: 40px;">
      <span style="display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #FF4444; background: rgba(255,68,68,0.08); border: 1px solid rgba(255,68,68,0.2); border-radius: 9999px; padding: 6px 16px;">Convocação exclusiva &mdash; AI Hunters</span>
    </div>

    <div style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 48px 36px;">

      <p style="font-size: 16px; line-height: 1.7; color: #ffffff; margin: 0 0 24px;">{greeting}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{intro}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body1}</p>

      <div style="background: rgba(255,68,68,0.04); border: 1px solid rgba(255,68,68,0.15); border-radius: 12px; padding: 24px 28px; margin: 32px 0; text-align: center;">
        <p style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.02em;">26 de Março &mdash; 19h</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Online e ao vivo &middot; Sem gravação</p>
      </div>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body2}</p>

      <div style="background: rgba(255,68,68,0.04); border: 1px solid rgba(255,68,68,0.12); border-radius: 12px; padding: 20px 24px; margin: 28px 0; text-align: center;">
        <p style="font-size: 28px; font-weight: 700; color: #FF4444; margin: 0 0 4px;">+R$ 700K</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">em contratos gerados pela comunidade &mdash; pessoas que começaram onde você está agora.</p>
      </div>

      <div style="margin: 32px 0; padding: 0;">
        <p style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #FF4444; margin: 0 0 16px;">O que você recebe</p>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Imersão ao vivo</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Todas as suas dúvidas resolvidas. Operação aberta na sua frente. Sem replay.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">O caminho pra lucrar</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">O passo a passo real que está gerando contratos de R$3K a R$35K.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Time de agentes de IA</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Que faz marketing, cria produtos, constrói sites e vende. O trabalho pesado por você.</p>
        </div>
      </div>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 32px;">{community}</p>

      <div style="background: rgba(255,68,68,0.04); border: 2px solid rgba(255,68,68,0.3); border-radius: 12px; padding: 28px; text-align: center; margin: 32px 0;">
        <p style="font-size: 13px; color: rgba(255,255,255,0.4); margin: 0 0 4px; text-decoration: line-through;">Valor real: R$ 10.000</p>
        <p style="font-size: 20px; font-weight: 700; color: #FF4444; margin: 0 0 8px;">Convite exclusivo pra você</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">O único investimento é o seu tempo e comprometimento.</p>
      </div>

      <div style="text-align: center; margin: 40px 0 32px;">
        <a href="https://reisia.moronireis.com.br/hunters" style="display: inline-block; background: #FF4444; color: #ffffff; text-decoration: none; padding: 18px 52px; border-radius: 9999px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">Confirmar minha presença</a>
      </div>

      <p style="font-size: 13px; color: rgba(255,255,255,0.35); text-align: center; margin: 0 0 8px;">Todas as informações no link acima.</p>

      <p style="font-size: 14px; color: rgba(255,255,255,0.4); text-align: center; margin: 0;">{closing}</p>

    </div>

    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
      <p style="font-size: 14px; color: rgba(255,255,255,0.35); margin: 0 0 4px;">Moroni Reis</p>
      <p style="font-size: 12px; color: rgba(255,255,255,0.2); margin: 0;">Reis IA &middot; 2026</p>
    </div>

  </div>
</body>
</html>'''

    text = f"""{greeting}

{intro}

{body1.replace('<strong style="color: #fff;">', '').replace('<strong style="color: #FF4444;">', '').replace('</strong>', '')}

26 de Março — 19h | Online e ao vivo | Sem gravação

{body2}

+R$ 700K em contratos gerados pela comunidade — pessoas que começaram onde você está agora.

O que você recebe:
- Imersão ao vivo — todas as suas dúvidas resolvidas, sem replay
- O caminho real pra lucrar com IA — do zero ao contrato
- Time de agentes de IA que faz o trabalho pesado por você

Valor real: R$ 10.000 — Convite exclusivo pra você.
O único investimento é o seu tempo e comprometimento.

Confirmar presença: https://reisia.moronireis.com.br/hunters

{closing}

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
        msg["Subject"] = "AI HUNTERS - IA - Comunicado Exclusivo"
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
        start = int(sys.argv[2]) if len(sys.argv) > 2 else 0

        with open("/Users/moronireis/Projetos vscode/hunters-disparo-lista.json", "r") as f:
            contacts = json.load(f)

        contacts_with_email = [c for c in contacts if c.get("email")]
        batch = contacts_with_email[start:]

        print(f"Enviando emails para {len(batch)} AI Hunters...\n")

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)

        sent = 0
        for i, contact in enumerate(batch, start + 1):
            name = contact["name"]
            email = contact["email"]
            html, text = generate_html_email(name)

            msg = MIMEMultipart("alternative")
            msg["From"] = "Moroni Reis <moronireis@gmail.com>"
            msg["To"] = email
            msg["Subject"] = "AI HUNTERS - IA - Comunicado Exclusivo"
            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            print(f"[{i}/{len(contacts_with_email)}] {name} ({email})...")
            try:
                server.send_message(msg)
                print(f"  OK")
                sent += 1
            except Exception as e:
                print(f"  ERRO: {e}")

            if contact != batch[-1]:
                delay = random.uniform(3, 6)
                time.sleep(delay)

        server.quit()
        print(f"\nFinalizado! {sent}/{len(batch)} enviados.")


if __name__ == "__main__":
    main()
