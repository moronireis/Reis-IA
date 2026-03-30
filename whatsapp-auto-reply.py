import json
import time
import requests
import random
from datetime import datetime

API_BASE = "https://weirdpigeon-evolution.cloudfy.live"
API_KEY = "tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp"
INSTANCE = "Reis"
HEADERS = {"apikey": API_KEY, "Content-Type": "application/json"}

# Our own push names to ignore
OUR_NAMES = {"Você", "Moroni Reis IA", "Moroni"}

# Load contact names for matching
with open("/Users/moronireis/Projetos vscode/whatsapp-oi-lista.json", "r") as f:
    contacts = json.load(f)

# Build name lookup - first names and full names
contact_first_names = set()
contact_full_names = set()
for c in contacts:
    name = c.get("name", "").strip()
    if name:
        contact_full_names.add(name.lower())
        first = name.split()[0].lower()
        contact_first_names.add(first)

# Track who already got the reply (by lid jid)
REPLIED_FILE = "/Users/moronireis/Projetos vscode/whatsapp-replied.json"
try:
    with open(REPLIED_FILE, "r") as f:
        replied = set(json.load(f))
except:
    replied = set()

# Track processed message IDs
processed_ids = set()


def save_replied():
    with open(REPLIED_FILE, "w") as f:
        json.dump(list(replied), f)


def generate_reply(name):
    first = name.split()[0] if name else "amigo"

    greetings = [
        f"{first}, beleza?",
        f"Fala {first}!",
        f"{first}, tudo certo?",
        f"E aí {first}, tudo bem?",
    ]

    greeting = random.choice(greetings)

    msg = f"""{greeting}

Tenho um convite exclusivo pra você que é da formação.

Estou criando uma nova comunidade e vou fazer uma imersão ao vivo onde abro toda a operação — um time de agentes de IA que faz marketing, cria produtos, constrói sites e vende.

*26 de março, 19h.* Ao vivo. Sem gravação.

Todas as informações e confirmação aqui:
https://reisia.moronireis.com.br/convite

Confirma lá que eu te vejo na imersão."""

    return msg


def send_message_to_jid(jid, text):
    """Send message using the jid directly (works with @lid)"""
    # Use sendText with the number extracted or remoteJid
    number = jid.replace("@s.whatsapp.net", "").replace("@lid", "")

    # For @lid, we need to use the jid approach
    if "@lid" in jid:
        # Try sending via chat endpoint with remoteJid
        resp = requests.post(
            f"{API_BASE}/message/sendText/{INSTANCE}",
            headers=HEADERS,
            json={"number": jid, "text": text}
        )
    else:
        resp = requests.post(
            f"{API_BASE}/message/sendText/{INSTANCE}",
            headers=HEADERS,
            json={"number": number, "text": text}
        )
    return resp.status_code, resp.json()


def fetch_messages():
    try:
        resp = requests.post(
            f"{API_BASE}/chat/findMessages/{INSTANCE}",
            headers=HEADERS,
            json={"where": {}, "limit": 50}
        )
        data = resp.json()
        return data.get("messages", {}).get("records", [])
    except Exception as e:
        print(f"[ERRO] Fetch: {e}", flush=True)
        return []


def is_incoming_reply(msg):
    """Check if message is an incoming reply from a contact (not from us)"""
    push = msg.get("pushName", "")
    jid = msg.get("key", {}).get("remoteJid", "")
    from_me = msg.get("key", {}).get("fromMe", True)

    # Skip our own messages
    if from_me:
        return False
    if push in OUR_NAMES:
        return False

    # Must be a person (not group)
    if "@g.us" in jid:
        return False

    return True


def main():
    print(f"=== AUTO-REPLY ATIVO ===", flush=True)
    print(f"Monitorando respostas...", flush=True)
    print(f"Já respondidos: {len(replied)}", flush=True)
    print(f"Checando a cada 10 segundos...\n", flush=True)

    # First run: mark all existing messages as processed
    first_run = True

    while True:
        try:
            messages = fetch_messages()
            now = datetime.now().strftime("%H:%M:%S")

            for msg in messages:
                msg_id = msg.get("key", {}).get("id", "")
                jid = msg.get("key", {}).get("remoteJid", "")
                push = msg.get("pushName", "")

                if msg_id in processed_ids:
                    continue

                # On first run, just mark everything as processed
                if first_run:
                    processed_ids.add(msg_id)
                    continue

                if not is_incoming_reply(msg):
                    processed_ids.add(msg_id)
                    continue

                # Already replied to this jid
                if jid in replied:
                    processed_ids.add(msg_id)
                    continue

                text = (msg.get("message", {}).get("conversation", "") or
                        msg.get("message", {}).get("extendedTextMessage", {}).get("text", "") or
                        "[media]")

                print(f"[{now}] Nova resposta de {push} ({jid}): \"{text[:60]}\"", flush=True)

                # Wait before replying
                delay = random.uniform(8, 20)
                print(f"  Aguardando {delay:.0f}s antes de responder...", flush=True)
                time.sleep(delay)

                # Send reply
                reply = generate_reply(push)
                status, resp = send_message_to_jid(jid, reply)

                if status == 201:
                    print(f"  Convite enviado para {push}!", flush=True)
                    replied.add(jid)
                    save_replied()
                else:
                    print(f"  ERRO ao enviar: status {status} - {resp}", flush=True)

                processed_ids.add(msg_id)

            if first_run:
                first_run = False
                print(f"[{now}] Inicialização completa. {len(processed_ids)} mensagens existentes ignoradas.", flush=True)
                print(f"[{now}] Aguardando novas respostas...\n", flush=True)

            time.sleep(10)

        except KeyboardInterrupt:
            print(f"\nParando... {len(replied)} contatos respondidos no total.", flush=True)
            save_replied()
            break
        except Exception as e:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Erro: {e}", flush=True)
            time.sleep(30)


if __name__ == "__main__":
    main()
