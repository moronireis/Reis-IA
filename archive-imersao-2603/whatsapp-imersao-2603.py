import json
import random
import time
import requests
import sys

API_URL = "https://weirdpigeon-evolution.cloudfy.live/message/sendText/Reis"
API_KEY = "tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp"

GRUPO_WHATSAPP = "https://chat.whatsapp.com/HiqWoC9fHN1GaT5yBIqUJz?mode=gi_t"


def generate_message_imersao(name):
    """Mensagem para confirmados da Imersão 26/03 (leads gerais)"""
    first = name.split()[0] if name else "amigo"

    opener = f"*É AMANHÃ, {first}, 19h.*"

    confirmations = [
        "Sua presença tá *confirmada*. Aqui é o Moroni.",
        "Sua vaga tá *garantida*. Moroni aqui.",
        "Você tá dentro. Aqui é o Moroni.",
    ]

    tema = [
        "Vou abrir o *Plano 100K com IA* — o passo a passo pra chegar nos primeiros R$100K usando inteligência artificial.",
        "Amanhã eu abro o *Plano 100K com IA* — como chegar nos R$100K com IA de verdade.",
        "O *Plano 100K com IA*. O caminho real pra faturar R$100K com inteligência artificial.",
    ]

    bonus = [
        "Quem participar recebe acesso a uma *comunidade exclusiva* + um *time de agentes de IA* pra acelerar seus resultados.",
        "Quem estiver lá ganha acesso a uma *comunidade exclusiva* e um *time de agentes de IA* trabalhando por você.",
        "Bônus: acesso a uma *comunidade exclusiva* + *time de agentes de IA* na prática.",
    ]

    instructions = [
        "Entra no grupo abaixo. É lá que eu mando o *link da sala às 19h*.",
        "Entra nesse grupo. Às *19h eu mando o link da sala* lá dentro.",
        "Acessa o grupo abaixo. O *link da sala sai às 19h* por lá.",
    ]

    parts = [
        opener,
        "",
        random.choice(confirmations),
        "",
        random.choice(tema),
        "",
        random.choice(bonus),
        "",
        random.choice(instructions),
        "",
        GRUPO_WHATSAPP,
    ]

    return "\n".join(parts)


def generate_message_hunters(name):
    """Mensagem para AI Hunters confirmados (tom exclusivo)"""
    first = name.split()[0] if name else "Hunter"

    opener = f"*É AMANHÃ, {first}, 19h.*"

    confirmations = [
        "Sua presença tá *confirmada*. Aqui é o Moroni.",
        "Sua vaga tá *garantida*. Moroni aqui.",
        "Você tá dentro. Aqui é o Moroni.",
    ]

    hunters_touch = [
        "Como AI Hunter, você vai ter acesso a tudo ao vivo — sem filtro.",
        "Você que é Hunter vai ver a operação por dentro. Sem corte.",
    ]

    tema = [
        "Vou abrir o *Plano 100K com IA* — o passo a passo pra chegar nos primeiros R$100K usando inteligência artificial.",
        "Amanhã eu abro o *Plano 100K com IA* — como chegar nos R$100K com IA de verdade.",
        "O *Plano 100K com IA*. O caminho real pra faturar R$100K com inteligência artificial.",
    ]

    bonus = [
        "Quem participar recebe acesso a uma *comunidade exclusiva* + um *time de agentes de IA* pra acelerar seus resultados.",
        "Quem estiver lá ganha acesso a uma *comunidade exclusiva* e um *time de agentes de IA* trabalhando por você.",
        "Bônus: acesso a uma *comunidade exclusiva* + *time de agentes de IA* na prática.",
    ]

    instructions = [
        "Entra no grupo abaixo. É lá que eu mando o *link da sala às 19h*.",
        "Entra nesse grupo. Às *19h eu mando o link da sala* lá dentro.",
        "Acessa o grupo abaixo. O *link da sala sai às 19h* por lá.",
    ]

    parts = [
        opener,
        "",
        random.choice(confirmations),
        "",
        random.choice(hunters_touch),
        "",
        random.choice(tema),
        "",
        random.choice(bonus),
        "",
        random.choice(instructions),
        "",
        GRUPO_WHATSAPP,
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
    group = sys.argv[2] if len(sys.argv) > 2 else "imersao"

    if mode == "test":
        phone = "5511967615987"
        if group == "hunters":
            msg = generate_message_hunters("Moroni")
            print("--- TESTE: AI HUNTERS ---")
        else:
            msg = generate_message_imersao("Moroni")
            print("--- TESTE: IMERSÃO 26/03 ---")
        print(msg)
        print("---")
        status, resp = send_message(phone, msg)
        print(f"Status: {status}")
        print(f"Response: {resp.get('key', {}).get('id', 'N/A')}")

    elif mode == "disparo":
        if group == "hunters":
            list_file = "/Users/moronireis/Projetos vscode/imersao-hunters-disparo-lista.json"
            gen_fn = generate_message_hunters
            label = "AI HUNTERS"
        elif group == "hunters-all":
            list_file = "/Users/moronireis/Projetos vscode/hunters-all-imersao-disparo.json"
            gen_fn = generate_message_hunters
            label = "AI HUNTERS (TODOS)"
        elif group == "formacao":
            list_file = "/Users/moronireis/Projetos vscode/formacao-imersao-disparo.json"
            gen_fn = generate_message_imersao
            label = "FORMAÇÃO"
        else:
            list_file = "/Users/moronireis/Projetos vscode/imersao-2603-disparo-lista.json"
            gen_fn = generate_message_imersao
            label = "IMERSÃO 26/03"

        with open(list_file, "r") as f:
            contacts = json.load(f)

        # Filtrar apenas quem tem telefone
        contacts_with_phone = [c for c in contacts if c.get("phone")]

        print(f"=== DISPARO {label} ===")
        print(f"Total na lista: {len(contacts)}")
        print(f"Com telefone: {len(contacts_with_phone)}")
        print(f"Sem telefone (só email): {len(contacts) - len(contacts_with_phone)}")
        print(f"Tempo estimado: ~{len(contacts_with_phone) * 12 // 60} minutos\n")

        sent = 0
        errors = 0
        for i, contact in enumerate(contacts_with_phone, 1):
            first = contact["name"].split()[0] if contact["name"] else "amigo"
            phone = contact["phone"]
            msg = gen_fn(contact["name"])

            print(f"[{i}/{len(contacts_with_phone)}] {first} ({phone})...")
            try:
                status, resp = send_message(phone, msg)
                msg_id = resp.get("key", {}).get("id", "N/A")
                print(f"  OK — ID: {msg_id}")
                sent += 1
            except Exception as e:
                print(f"  ERRO: {e}")
                errors += 1

            if i < len(contacts_with_phone):
                delay = random.uniform(10, 15)
                print(f"  Aguardando {delay:.1f}s...")
                time.sleep(delay)

        print(f"\n=== FINALIZADO ===")
        print(f"Enviados: {sent}/{len(contacts_with_phone)}")
        if errors:
            print(f"Erros: {errors}")

        # Listar quem não tem telefone (precisa email)
        no_phone = [c for c in contacts if not c.get("phone")]
        if no_phone:
            print(f"\n--- SEM TELEFONE (precisam receber por email) ---")
            for c in no_phone:
                print(f"  {c['name']} — {c['email']}")


if __name__ == "__main__":
    main()
