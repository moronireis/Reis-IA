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
    first_name = name.split()[0] if name else "amigo"

    greetings = [
        f"{first_name}, parabéns por ter preenchido o Diagnóstico de IA.",
        f"Fala, {first_name}! Vi que você completou o Diagnóstico de IA. Parabéns pelo primeiro passo.",
        f"{first_name}, você fez algo que a maioria não faz: parou pra entender onde está. Parabéns pelo Diagnóstico.",
        f"Opa {first_name}, vi que você preencheu o Diagnóstico de IA. Isso já te coloca na frente de muita gente.",
        f"E aí, {first_name}! Parabéns por completar o Diagnóstico. Poucas pessoas têm essa atitude.",
        f"{first_name}, poucos têm a coragem de se avaliar de verdade. Parabéns pelo Diagnóstico de IA.",
    ]

    intros = [
        "Agora que você sabe onde está, eu quero te mostrar o próximo passo.",
        "Você já sabe onde está. Agora eu quero te mostrar pra onde ir.",
        "O diagnóstico te mostrou o cenário. Agora eu quero te mostrar a saída.",
        "Saber onde você está é o primeiro passo. O segundo é esse aqui.",
    ]

    body1_options = [
        "No dia <strong style=\"color: #fff;\">26 de março, às 19h</strong>, eu vou fazer uma imersão ao vivo onde abro a operação inteira — um time de agentes de IA que faz marketing, cria produtos, constrói sites e vende. Tudo na sua frente.",
        "Dia <strong style=\"color: #fff;\">26 de março, 19h</strong>, vou abrir ao vivo a operação completa — agentes de IA que fazem marketing, criam produtos, constroem plataformas e vendem. Você vai ver como transformar IA em lucro de verdade.",
        "No dia <strong style=\"color: #fff;\">26, às 19h</strong>, eu vou mostrar ao vivo como funciona um time de agentes de IA que faz o trabalho de 10 pessoas — marketing, copy, design, dev, vendas. E como você pode replicar.",
    ]

    body2_options = [
        "Essa imersão é pra quem quer sair do diagnóstico e entrar na ação. Sem teoria. Sem enrolação. Resultado real.",
        "Você já se avaliou. Agora é hora de agir. Essa imersão é o atalho pra transformar conhecimento em lucro.",
        "O diagnóstico mostrou o gap. Essa imersão fecha ele. Na prática, ao vivo, sem enrolação.",
        "Você fez o diagnóstico porque quer resultado. Essa imersão é onde o resultado começa.",
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
    closing = random.choice(closing_options)

    html = f'''<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000000; color: #ffffff; margin: 0; padding: 0;">

  <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">

    <div style="text-align: center; margin-bottom: 40px;">
      <span style="display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #4A90FF; background: rgba(74,144,255,0.08); border: 1px solid rgba(74,144,255,0.2); border-radius: 9999px; padding: 6px 16px;">Você completou o Diagnóstico &mdash; Convite Especial</span>
    </div>

    <div style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 48px 36px;">

      <p style="font-size: 16px; line-height: 1.7; color: #ffffff; margin: 0 0 24px;">{greeting}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{intro}</p>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body1}</p>

      <div style="background: rgba(74,144,255,0.04); border: 1px solid rgba(74,144,255,0.15); border-radius: 12px; padding: 24px 28px; margin: 32px 0; text-align: center;">
        <p style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.02em;">26 de Março &mdash; 19h</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Online e ao vivo &middot; Sem gravação</p>
      </div>

      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body2}</p>

      <div style="margin: 32px 0; padding: 0;">
        <p style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #4A90FF; margin: 0 0 16px;">O que você vai ver</p>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Imersão ao vivo</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Operação inteira aberta. Agentes de IA criando, vendendo e entregando na sua frente.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Do diagnóstico ao lucro</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Você já sabe onde está. Agora vai ver o caminho pra transformar IA em resultado financeiro.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Suas dúvidas resolvidas</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Traz tudo que está te travando. Ferramentas, estratégia, primeiro passo. Resolvo ao vivo.</p>
        </div>
      </div>

      <div style="background: rgba(74,144,255,0.04); border: 2px solid rgba(74,144,255,0.3); border-radius: 12px; padding: 28px; text-align: center; margin: 32px 0;">
        <p style="font-size: 13px; color: rgba(255,255,255,0.4); margin: 0 0 4px; text-decoration: line-through;">Valor real: R$ 10.000</p>
        <p style="font-size: 20px; font-weight: 700; color: #4A90FF; margin: 0 0 8px;">Convite especial pra quem fez o diagnóstico</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">O único investimento é o seu tempo e comprometimento.</p>
      </div>

      <div style="text-align: center; margin: 40px 0 32px;">
        <a href="https://reisia.moronireis.com.br/convite" style="display: inline-block; background: #4A90FF; color: #ffffff; text-decoration: none; padding: 18px 52px; border-radius: 9999px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">Confirmar minha presença</a>
      </div>

      <p style="font-size: 13px; color: rgba(255,255,255,0.35); text-align: center; margin: 0 0 8px;">Todas as informações e confirmação no link acima.</p>

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

No dia 26 de março, às 19h, eu vou fazer uma imersão ao vivo onde abro a operação inteira — um time de agentes de IA que faz marketing, cria produtos, constrói sites e vende. Tudo na sua frente.

26 de Março — 19h | Online e ao vivo | Sem gravação

{body2}

O que você vai ver:
- Imersão ao vivo — operação inteira aberta, sem replay
- Do diagnóstico ao lucro — o caminho pra transformar IA em resultado
- Suas dúvidas resolvidas ao vivo

Valor real: R$ 10.000 — Convite especial pra quem fez o diagnóstico.
O único investimento é o seu tempo e comprometimento.

Confirmar presença: https://reisia.moronireis.com.br/convite

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
        msg["Subject"] = "Você fez o Diagnóstico — Agora vem o próximo passo"
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

        with open("/Users/moronireis/Projetos vscode/diagnostico-disparo-lista.json", "r") as f:
            contacts = json.load(f)

        batch = contacts[start:]
        print(f"Enviando emails para {len(batch)} leads do diagnóstico...\n")

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
            msg["Subject"] = "Você fez o Diagnóstico — Agora vem o próximo passo"
            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            print(f"[{i}/{len(contacts)}] {name} ({email})...")
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
