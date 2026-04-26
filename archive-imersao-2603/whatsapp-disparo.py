import json
import random
import time
import requests
import sys

API_URL = "https://weirdpigeon-evolution.cloudfy.live/message/sendText/Reis"
API_KEY = "tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp"

def generate_message(name):
    # Greetings - heavy rotation, many variations
    greetings = [
        f"Opa, {name}, aqui é o Moroni",
        f"Fala, {name}! Aqui é o Moroni",
        f"E aí, {name}! Moroni aqui",
        f"{name}, você que é aluno da formação, aqui é o Moroni",
        f"{name}, aqui é o Moroni. Você que é da formação precisa ver isso",
        f"Fala {name}, Moroni aqui. Você que é aluno da formação vai querer saber disso",
        f"{name}, você que é aluno da formação, presta atenção nessa mensagem",
        f"Opa {name}, Moroni aqui. Tô mandando isso pra você que é da formação",
        f"{name}, como aluno da formação você precisa saber disso. Aqui é o Moroni",
        f"Fala, {name}! Moroni aqui, mandando direto pra quem é da formação",
        f"{name}, aqui é o Moroni. Como você é aluno da formação, esse papo é com você",
        f"E aí {name}, Moroni aqui. Isso aqui é pra você que é da formação",
    ]

    intro = [
        "Vou ser direto com você.",
        "Vou ser direto.",
        "Direto ao ponto.",
        "Sem rodeios.",
        "Vou ser breve e direto.",
        "Olha, vou direto ao que interessa.",
    ]

    body1 = [
        "Eu passei os últimos meses construindo algo que muda o jogo pra quem tá nesse mundo da IA. Um time de agentes que faz o que uma equipe de 10 pessoas faria — marketing, copy, design, dev, vendas.",
        "Nos últimos meses eu construí algo que muda completamente o jogo pra quem quer *lucrar* com IA de verdade. Um time de agentes que substitui o trabalho de 10 pessoas — marketing, copy, design, dev, vendas.",
        "Passei os últimos meses montando algo diferente de tudo que você já viu em IA. Um time de agentes que entrega o que uma equipe de 10 pessoas entregaria — marketing, copy, design, dev, vendas. Isso gera resultado real.",
        "Eu passei meses construindo algo que vai mudar o jogo pra quem quer transformar IA em lucro. Um sistema de agentes que faz o trabalho de uma equipe de 10 — marketing, copy, design, dev, vendas.",
        "Construí nos últimos meses um sistema que muda tudo pra quem quer faturar com IA. Um time de agentes que entrega o que 10 profissionais entregariam — marketing, copy, design, dev, vendas.",
        "Nos últimos meses eu montei algo que ninguém tá fazendo no mercado. Um time de agentes de IA que faz o trabalho de 10 pessoas — marketing, copy, design, dev, vendas. E gera *lucro* de verdade.",
    ]

    body2 = [
        "No dia *26, às 19h*, eu vou abrir tudo. Por dentro. Ao vivo.",
        "Dia *26, 19h*, vou mostrar tudo. Por dentro. Ao vivo.",
        "No dia *26 às 19h* eu vou abrir isso ao vivo. Tudo por dentro.",
        "*Dia 26, 19h.* Vou abrir tudo ao vivo. Sem filtro.",
        "*26 de março, 19h.* Vou mostrar o sistema inteiro ao vivo.",
        "Dia *26, às 19h*, vou revelar tudo ao vivo. Sem corte.",
    ]

    body3 = [
        "Sem mais cursos. Sem mais fluxos do n8n. Sem depender de conteúdo que outros te empurraram.",
        "Nada de curso novo. Nada de fluxo do n8n. Nada de depender de conteúdo que outros te empurram.",
        "Sem curso. Sem fluxo de n8n. Sem ficar dependendo do conteúdo que outros empurram por aí.",
        "Chega de curso. Chega de fluxo de n8n. Chega de depender de conteúdo que outros te vendem.",
        "Isso aqui não é mais um curso. Não é fluxo de n8n. É um sistema que gera resultado.",
        "Esquece curso. Esquece fluxo de n8n. Isso é outra coisa.",
    ]

    exclusive = [
        "Esse é um convite *exclusivo* pra nossa comunidade da formação.",
        "Isso é *exclusivo* pra quem é da formação. Pra nossa comunidade.",
        "Esse convite é *exclusivo* pra quem é aluno da formação — como você.",
        "Como aluno da formação, esse convite é *exclusivo* pra você. Não tô mandando isso pra qualquer pessoa.",
        "Você faz parte de um grupo seleto. Esse convite é *exclusivo* pra alunos da formação.",
        "Tô abrindo isso primeiro pra quem é da formação. Convite *exclusivo* pra nossa comunidade.",
    ]

    cta = [
        "Todas as informações tão aqui:\nhttps://reisia.moronireis.com.br/convite",
        "Entra aqui pra saber tudo e confirmar:\nhttps://reisia.moronireis.com.br/convite",
        "Abre o link, vê os detalhes e confirma:\nhttps://reisia.moronireis.com.br/convite",
        "Mais informações e confirmação aqui:\nhttps://reisia.moronireis.com.br/convite",
        "Clica aqui pra ver tudo e garantir sua vaga:\nhttps://reisia.moronireis.com.br/convite",
        "Tá tudo explicado aqui, só abrir:\nhttps://reisia.moronireis.com.br/convite",
    ]

    closing = [
        "Não vai ficar gravado.",
        "Não vai ter gravação.",
        "Essa não vai ficar gravada.",
        "Sem gravação.",
        "Ao vivo e sem replay.",
        "Só quem tiver lá vai ver.",
    ]

    parts = [
        random.choice(greetings),
        "",
        random.choice(intro),
        "",
        random.choice(body1),
        "",
        random.choice(body2),
        "",
        random.choice(body3),
        "",
        random.choice(exclusive),
        "",
        random.choice(cta),
        "",
        random.choice(closing),
    ]

    return "\n".join(parts)


def send_message(phone, text):
    headers = {
        "apikey": API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "number": phone,
        "text": text,
    }
    resp = requests.post(API_URL, headers=headers, json=payload)
    return resp.status_code, resp.json()


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "test"

    if mode == "test":
        name = "Moroni"
        phone = "5511967615987"
        msg = generate_message(name)
        print(f"--- MENSAGEM TESTE para {name} ({phone}) ---")
        print(msg)
        print("---")
        status, resp = send_message(phone, msg)
        print(f"Status: {status}")
        print(f"Response: {resp.get('key', {}).get('id', 'N/A')}")

    elif mode == "disparo":
        with open("/Users/moronireis/Projetos vscode/whatsapp-disparo-lista.json", "r") as f:
            contacts = json.load(f)

        print(f"Iniciando disparo para {len(contacts)} contatos...")
        print(f"Tempo estimado: {len(contacts) * 12 // 60} minutos\n")

        for i, contact in enumerate(contacts, 1):
            name = contact["name"].split()[0] if contact["name"] else "amigo"
            phone = contact["phone"]
            msg = generate_message(name)

            print(f"[{i}/{len(contacts)}] Enviando para {name} ({phone})...")
            try:
                status, resp = send_message(phone, msg)
                msg_id = resp.get("key", {}).get("id", "N/A")
                print(f"  OK — ID: {msg_id}")
            except Exception as e:
                print(f"  ERRO: {e}")

            if i < len(contacts):
                delay = random.uniform(10, 15)
                print(f"  Aguardando {delay:.1f}s...")
                time.sleep(delay)

        print(f"\nDisparo finalizado. {len(contacts)} mensagens enviadas.")


if __name__ == "__main__":
    main()
