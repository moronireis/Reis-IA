/**
 * Disparo de lembrete WhatsApp — Casamento Moroni & Daphine
 * Instância: Casal (+55 11 99367-2965)
 *
 * Usage:
 *   node disparo-lembrete.js test       → envia só para Moroni (teste)
 *   node disparo-lembrete.js disparar   → envia para todos os confirmados
 */

const EVOLUTION_URL = 'https://weirdpigeon-evolution.cloudfy.live';
const EVOLUTION_KEY = 'tqXOKoUIAH0llngaxg9k2dYnx5CpHrnp';
const EVOLUTION_INSTANCE = 'Casal';

const SUPABASE_URL = 'https://weirdpigeon-supabase.cloudfy.live';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzM3Njg1MTYsImV4cCI6MTgwNTMwNDUxNn0.Hziwx8ocWnFVLHvt5DhT8nTkL2XVMa58ofjL-0hCMxw';

const MORONI_TEST_NUMBER = '5511963341710';

// --- Helpers ---

function normalizePhone(raw) {
  let num = raw.replace(/[\s\-\+\(\)]/g, '');
  if (!num.startsWith('55')) num = '55' + num;
  return num;
}

function firstName(fullName) {
  return fullName.trim().split(/\s+/)[0];
}

function buildGreeting(guest, companions) {
  const names = [firstName(guest.nome)];
  for (const c of companions) {
    names.push(firstName(c.nome));
  }
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} e ${names[1]}`;
  const last = names.pop();
  return `${names.join(', ')} e ${last}`;
}

function buildMessage(guest, companions) {
  const greeting = buildGreeting(guest, companions);

  let confirmados = '';
  if (companions.length > 0) {
    const allNames = [guest.nome, ...companions.map(c => c.nome)];
    if (allNames.length === 2) {
      confirmados = `\n\n✅ *Confirmados:* ${allNames[0]} e ${allNames[1]}`;
    } else {
      const last = allNames.pop();
      confirmados = `\n\n✅ *Confirmados:* ${allNames.join(', ')} e ${last}`;
    }
  }

  return `Olá ${greeting}, tudo bem?

Estamos mandando essa mensagem para lembrar que *HOJE É O GRANDE DIA!* ✨

*O CASAMENTO DO MORONI E DA DAPHINE!*

📍 *Data:* 12/06/2026 (hoje, quinta-feira)
📍 *Local:* Castelo dos Lagos
📍 *Endereço:* Rua Bonfim, 754 - Ribeirão Pires, SP
🕗 *Recepção dos convidados:* 20h
🕘 *Cerimônia:* 21h (pontualmente)
🍽️ *Jantar:* 22h
🎉 *Festa:* 23h às 01h${confirmados}

Algumas informações importantes:
• Cheguem com pelo menos 20 minutos de antecedência
• Traje: esporte fino / casual chic (evento noturno)
• Mulheres não devem vestir branco ou offwhite
• Pedimos que não usem celulares durante a cerimônia
• O local possui estacionamento

Sua presença é o maior presente! Mas caso deseje presentear os noivos, acesse:
https://moroniedaphine.vercel.app/presentes

Qualquer dúvida, estamos à disposição!
Nos vemos logo mais! ✨`;
}

async function fetchGuests() {
  const url = `${SUPABASE_URL}/rest/v1/wedding_guests?status=eq.confirmado&select=id,nome,whatsapp,wedding_companions(nome,idade)&order=nome.asc`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  return res.json();
}

async function sendWhatsApp(number, text) {
  const res = await fetch(`${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': EVOLUTION_KEY
    },
    body: JSON.stringify({
      number: number,
      text: text
    })
  });
  return res.json();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Main ---

async function main() {
  const mode = process.argv[2];

  if (!mode || !['test', 'disparar'].includes(mode)) {
    console.log('Usage:');
    console.log('  node disparo-lembrete.js test       → envia teste para Moroni');
    console.log('  node disparo-lembrete.js disparar   → envia para todos os confirmados');
    process.exit(1);
  }

  const guests = await fetchGuests();
  console.log(`\n📋 ${guests.length} convidados confirmados encontrados\n`);

  if (mode === 'test') {
    // Use first guest as example, but send to Moroni's number
    const testGuest = { nome: 'Moroni Reis', whatsapp: MORONI_TEST_NUMBER };
    const testCompanions = [{ nome: 'Daphine Oliveira' }];
    const msg = buildMessage(testGuest, testCompanions);

    console.log('🧪 MODO TESTE — Enviando para Moroni (' + MORONI_TEST_NUMBER + ')');
    console.log('---');
    console.log(msg);
    console.log('---\n');

    const result = await sendWhatsApp(MORONI_TEST_NUMBER, msg);
    console.log('✅ Resultado:', JSON.stringify(result, null, 2));
    return;
  }

  if (mode === 'disparar') {
    console.log('🚀 MODO DISPARO — Enviando para todos os confirmados\n');

    let success = 0;
    let fail = 0;
    const errors = [];

    for (let i = 0; i < guests.length; i++) {
      const g = guests[i];
      const companions = g.wedding_companions || [];
      const phone = normalizePhone(g.whatsapp);
      const msg = buildMessage(g, companions);

      console.log(`[${i + 1}/${guests.length}] ${g.nome} → ${phone} (${companions.length} acomp.)`);

      try {
        const result = await sendWhatsApp(phone, msg);
        if (result.key || result.status === 'PENDING') {
          console.log(`  ✅ Enviado`);
          success++;
        } else {
          console.log(`  ⚠️ Resposta:`, JSON.stringify(result));
          errors.push({ nome: g.nome, phone, error: JSON.stringify(result) });
          fail++;
        }
      } catch (err) {
        console.log(`  ❌ Erro: ${err.message}`);
        errors.push({ nome: g.nome, phone, error: err.message });
        fail++;
      }

      // Delay 4 seconds between messages
      if (i < guests.length - 1) {
        await sleep(4000);
      }
    }

    console.log(`\n📊 RESULTADO FINAL`);
    console.log(`  ✅ Sucesso: ${success}`);
    console.log(`  ❌ Falha: ${fail}`);
    if (errors.length > 0) {
      console.log(`\n⚠️ Erros:`);
      errors.forEach(e => console.log(`  - ${e.nome} (${e.phone}): ${e.error}`));
    }
  }
}

main().catch(console.error);
