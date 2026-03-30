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

    # Variations for greeting line
    greetings = [
        f"{first_name}, você que é aluno da formação, esse convite é pra você.",
        f"Fala, {first_name}! Como membro da formação, você precisa ver isso.",
        f"{first_name}, você que é da formação, presta atenção nessa mensagem.",
        f"E aí, {first_name}! Você que é aluno da formação, isso aqui é pra você.",
        f"{first_name}, como aluno da formação você tem acesso a isso antes de todo mundo.",
        f"Fala {first_name}, tô mandando isso direto pra você que é da formação.",
        f"{first_name}, essa mensagem é exclusiva pra quem é da formação. Como você.",
        f"Opa {first_name}, você que é aluno da formação, olha isso aqui.",
    ]

    intros = [
        "Vou ser direto com você.",
        "Vou ser direto.",
        "Direto ao ponto.",
        "Sem rodeios.",
        "Olha, vou direto ao que interessa.",
    ]

    body1_options = [
        "Eu passei os últimos meses construindo algo que muda o jogo pra quem quer <strong style=\"color: #fff;\">lucrar de verdade com IA</strong>. Um time de agentes que faz o que uma equipe de 10 pessoas faria &mdash; marketing, copy, design, dev, vendas.",
        "Nos últimos meses eu construí algo que muda completamente o jogo. Um time de agentes que substitui o trabalho de 10 pessoas &mdash; marketing, copy, design, dev, vendas. E gera <strong style=\"color: #fff;\">lucro real</strong>.",
        "Passei meses montando algo diferente de tudo que você já viu em IA. Um sistema de agentes que entrega o que uma equipe de 10 entregaria. E transforma isso em <strong style=\"color: #fff;\">receita pro seu negócio</strong>.",
        "Construí um time de agentes de IA que faz o trabalho de 10 profissionais &mdash; marketing, copy, design, dev, vendas. Tudo isso gerando <strong style=\"color: #fff;\">resultado financeiro real</strong>.",
    ]

    body2_options = [
        "Sem mais cursos. Sem depender de conteúdo que outros te empurraram. Isso aqui é diferente.",
        "Nada de curso novo. Nada de depender de conteúdo que outros te empurram. É outro nível.",
        "Chega de curso. Chega de depender dos outros. Isso aqui é outra coisa.",
        "Esquece mais um curso. Isso é um sistema que gera resultado de verdade.",
    ]

    community_options = [
        "Além da imersão, você terá acesso a uma <strong style=\"color: #4A90FF;\">comunidade exclusiva de linha de frente</strong> &mdash; onde todos contribuem com novos agentes, técnicas avançadas e desenvolvimentos reais.",
        "Você também entra pra uma <strong style=\"color: #4A90FF;\">comunidade exclusiva</strong> de quem tá na linha de frente da IA. Troca real, contribuição mútua, crescimento de verdade.",
        "E tem mais: uma <strong style=\"color: #4A90FF;\">comunidade fechada</strong> pra quem quer estar na frente. Não é grupo de suporte. É um grupo onde todo mundo sabe o que tá fazendo.",
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

  <!-- Wrapper -->
  <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header badge -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #4A90FF; background: rgba(74,144,255,0.08); border: 1px solid rgba(74,144,255,0.2); border-radius: 9999px; padding: 6px 16px;">Convocação exclusiva &mdash; Alunos da Formação</span>
    </div>

    <!-- Main card -->
    <div style="background: #0A0A0A; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 48px 36px;">

      <!-- Greeting -->
      <p style="font-size: 16px; line-height: 1.7; color: #ffffff; margin: 0 0 24px;">{greeting}</p>

      <!-- Intro -->
      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{intro}</p>

      <!-- Body -->
      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body1}</p>

      <!-- Date highlight box -->
      <div style="background: rgba(74,144,255,0.04); border: 1px solid rgba(74,144,255,0.15); border-radius: 12px; padding: 24px 28px; margin: 32px 0; text-align: center;">
        <p style="font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 6px; letter-spacing: -0.02em;">26 de Março &mdash; 19h</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Online e ao vivo &middot; Sem gravação</p>
      </div>

      <!-- No more courses -->
      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 24px;">{body2}</p>

      <!-- What you get -->
      <div style="margin: 32px 0; padding: 0;">
        <p style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #4A90FF; margin: 0 0 16px;">O que você leva</p>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Imersão ao vivo</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Operação inteira aberta. Agentes criando, vendendo e entregando na sua frente.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px; margin-bottom: 8px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Comunidade de linha de frente</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Grupo exclusivo onde todos contribuem com novos agentes e técnicas avançadas.</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 16px 20px;">
          <p style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 4px;">Time de 20 agentes</p>
          <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">Marketing, produtos, plataformas e vendas. Enquanto você foca no que importa.</p>
        </div>
      </div>

      <!-- Community -->
      <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); margin: 0 0 32px;">{community}</p>

      <!-- Value box -->
      <div style="background: rgba(74,144,255,0.04); border: 2px solid rgba(74,144,255,0.3); border-radius: 12px; padding: 28px; text-align: center; margin: 32px 0;">
        <p style="font-size: 13px; color: rgba(255,255,255,0.4); margin: 0 0 4px; text-decoration: line-through;">Valor real: R$ 10.000</p>
        <p style="font-size: 20px; font-weight: 700; color: #4A90FF; margin: 0 0 8px;">Convite exclusivo pra você</p>
        <p style="font-size: 13px; color: rgba(255,255,255,0.5); margin: 0;">O único investimento é o seu tempo e comprometimento.</p>
      </div>

      <!-- CTA button -->
      <div style="text-align: center; margin: 40px 0 32px;">
        <a href="https://reisia.moronireis.com.br/convite" style="display: inline-block; background: #4A90FF; color: #ffffff; text-decoration: none; padding: 18px 52px; border-radius: 9999px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">Confirmar minha presença</a>
      </div>

      <p style="font-size: 13px; color: rgba(255,255,255,0.35); text-align: center; margin: 0 0 8px;">Todas as informações no link acima.</p>

      <!-- Closing -->
      <p style="font-size: 14px; color: rgba(255,255,255,0.4); text-align: center; margin: 0;">{closing}</p>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
      <p style="font-size: 14px; color: rgba(255,255,255,0.35); margin: 0 0 4px;">Moroni Reis</p>
      <p style="font-size: 12px; color: rgba(255,255,255,0.2); margin: 0;">Reis IA &middot; 2026</p>
    </div>

  </div>
</body>
</html>'''

    # Plain text fallback
    text = f"""{greeting}

{intro}

Eu passei os últimos meses construindo algo que muda o jogo pra quem quer lucrar de verdade com IA. Um time de agentes que faz o trabalho de uma equipe de 10 — marketing, copy, design, dev, vendas.

26 de Março — 19h | Online e ao vivo | Sem gravação

{body2}

O que você leva:
- Imersão ao vivo — operação inteira aberta, sem replay
- Comunidade exclusiva de linha de frente em multiagentes
- Time de 20 agentes que geram receita e tempo pra você

Valor real: R$ 10.000 — Convite exclusivo pra você.
O único investimento é o seu tempo e comprometimento.

Confirmar presença: https://reisia.moronireis.com.br/convite

{closing}

Moroni Reis
Reis IA"""

    return html, text


def generate_subject():
    subjects = [
        "ALUNOS FORMAÇÃO - IA - Comunicado Exclusivo",
    ]
    return random.choice(subjects)


def send_email(to_email, name, html_body, text_body):
    subject = generate_subject().replace("{name}", name.split()[0] if name else "amigo")

    msg = MIMEMultipart("alternative")
    msg["From"] = "Moroni Reis <moronireis@gmail.com>"
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    server.send_message(msg)
    server.quit()


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"

    if mode == "test":
        name = "Moroni"
        to = "moronireis@gmail.com"
        html, text = generate_html_email(name)
        print(f"Enviando teste para {to}...")
        try:
            send_email(to, name, html, text)
            print("Email enviado com sucesso!")
        except Exception as e:
            print(f"ERRO: {e}")

    elif mode == "disparo":
        start = int(sys.argv[2]) if len(sys.argv) > 2 else 0
        end = int(sys.argv[3]) if len(sys.argv) > 3 else None

        with open("/Users/moronireis/Projetos vscode/whatsapp-disparo-lista.json", "r") as f:
            contacts = json.load(f)

        # Filter only contacts with email
        contacts_with_email = [c for c in contacts if c.get("email")]
        batch = contacts_with_email[start:end]

        print(f"Enviando emails para {len(batch)} contatos (de {start} a {end or len(contacts_with_email)})...")

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)

        for i, contact in enumerate(batch, start + 1):
            name = contact["name"]
            email = contact["email"]
            html, text = generate_html_email(name)
            subject = generate_subject().replace("{name}", name.split()[0] if name else "amigo")

            msg = MIMEMultipart("alternative")
            msg["From"] = "Moroni Reis <moronireis@gmail.com>"
            msg["To"] = email
            msg["Subject"] = subject
            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            print(f"[{i}/{len(contacts_with_email)}] {name} ({email})...")
            try:
                server.send_message(msg)
                print(f"  OK")
            except Exception as e:
                print(f"  ERRO: {e}")

            if contact != batch[-1]:
                delay = random.uniform(3, 6)
                print(f"  Aguardando {delay:.1f}s...")
                time.sleep(delay)

        server.quit()
        print(f"\nDisparo finalizado!")


if __name__ == "__main__":
    main()
