/**
 * Reis Marketing IA — Form Submission API
 * Vercel Serverless Function
 * Receives form data, sends formatted email via Resend, returns JSON.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const TO_EMAIL = 'moronif.reis@gmail.com';

const TYPE_LABELS = {
  'personal-branding': 'Personal Branding',
  'movimento': 'Movimento e Comunidade',
  'empresa': 'Branding Empresarial',
  'produto': 'Product Branding'
};

const TYPE_COLORS = {
  'personal-branding': '#C084FC',
  'movimento': '#FB923C',
  'empresa': '#4ADE80',
  'produto': '#93C5FD'
};

const FIELD_LABELS = {
  nome: 'Nome', nome_empresa: 'Empresa', nome_movimento: 'Movimento', nome_produto: 'Produto',
  cargo: 'Cargo', empresa: 'Empresa', setor: 'Setor', bio: 'Bio',
  linkedin: 'LinkedIn', instagram: 'Instagram', site: 'Site',
  origem_carreira: 'Origem da carreira', momento_virada: 'Momento de virada',
  fracassos: 'Fracassos', conquistas: 'Conquistas',
  tres_palavras: '3 Palavras', outros_descrevem: 'Como outros descrevem',
  arquetipos: 'Arquétipos', anti_moroni: 'O que não é', valores: 'Valores',
  publico_ideal: 'Público ideal', conhecido_por: 'Conhecido por',
  concorrentes: 'Concorrentes', diferencial: 'Diferencial',
  frase_assinatura: 'Frase assinatura', conteudo: 'Conteúdo',
  pilares_conteudo: 'Pilares de conteúdo', tom_comunicacao: 'Tom de comunicação',
  frases_repete: 'Frases recorrentes', estetica: 'Estética visual',
  visual_referencias: 'Referências visuais', vestimenta: 'Vestimenta',
  cores: 'Cores', objetivo: 'Objetivo', visao_12_meses: 'Visão 12 meses',
  comunidade: 'Comunidade', observacoes: 'Observações',
  causa: 'Causa', frustracao_origem: 'Frustração de origem',
  mundo_ideal: 'Mundo ideal', inimigo_externo: 'Inimigo externo',
  inimigo_interno: 'Inimigo interno', alternativas_ruins: 'Alternativas ruins',
  perfil_tribo: 'Perfil da tribo', identidade_tribo: 'Identidade da tribo',
  exclusao: 'Quem não entra', tamanho_atual: 'Tamanho atual',
  lider: 'Líder', papel_lider: 'Papel do líder', historia_lider: 'História do líder',
  rituais: 'Rituais', vocabulario: 'Vocabulário', simbolos: 'Símbolos',
  slogan: 'Slogan', niveis: 'Níveis', niveis_descricao: 'Descrição dos níveis',
  plataforma: 'Plataforma', crencas: 'Crenças', manifesto_rascunho: 'Rascunho do manifesto',
  meta: 'Meta', descricao: 'Descrição', faturamento: 'Faturamento',
  tamanho: 'Tamanho da equipe', tempo: 'Tempo de existência',
  produtos: 'Produtos/Serviços', carro_chefe: 'Carro-chefe', submarcas: 'Sub-marcas',
  cliente_ideal: 'Cliente ideal', dores_clientes: 'Dores dos clientes',
  desejos_clientes: 'Desejos dos clientes', objecoes: 'Objeções',
  percepcao_atual: 'Percepção atual', percepcao_desejada: 'Percepção desejada',
  promessa: 'Promessa', personalidade: 'Personalidade', tom: 'Tom',
  nao_somos: 'O que não somos', estilo_visual: 'Estilo visual',
  referencias_visuais: 'Referências visuais', modo: 'Modo visual',
  logo_atual: 'Logo atual', objetivo_12m: 'Objetivo 12 meses',
  objetivo_marca: 'Objetivo da marca', visao_5_anos: 'Visão 5 anos',
  historia: 'História', estado_marca: 'Estado da marca',
  tipo_produto: 'Tipo de produto', empresa_mae: 'Empresa-mãe', preco: 'Preço',
  duracao: 'Duração', fase: 'Fase do produto', cliente_antes: 'Cliente antes',
  cliente_depois: 'Cliente depois', provas: 'Provas de resultado', icp: 'ICP',
  nao_para: 'Não é para', decisor: 'Decisor de compra',
  satisfeito_nome: 'Satisfeito com nome', ideias_nomes: 'Ideias de nomes',
  sensacao_nome: 'Sensação do nome', idioma_nome: 'Idioma do nome',
  relacao_marca: 'Relação com marca-mãe', modulos: 'Módulos/Fases',
  entregaveis: 'Entregáveis', garantia: 'Garantia', escassez: 'Escassez',
  bonus: 'Bônus', processo_venda: 'Processo de venda',
  posicionamento_visual: 'Posicionamento visual', referencias: 'Referências',
  onboarding: 'Onboarding', certificacao: 'Certificação',
  email: 'Email'
};

function getLabel(key) {
  return FIELD_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildEmailHtml(formType, name, data) {
  const color = TYPE_COLORS[formType] || '#4A90FF';
  const label = TYPE_LABELS[formType] || formType;
  const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const fields = Object.entries(data)
    .filter(([, v]) => v && (Array.isArray(v) ? v.join('').trim() : String(v).trim()))
    .map(([key, value]) => {
      const val = Array.isArray(value) ? value.join(', ') : String(value);
      return `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #1a1a1a; color: #999; font-size: 13px; width: 180px; vertical-align: top; font-weight: 500;">
            ${escapeHtml(getLabel(key))}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #1a1a1a; color: #e0e0e0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
            ${escapeHtml(val)}
          </td>
        </tr>`;
    }).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background: #000; font-family: -apple-system, 'Inter', sans-serif;">
  <div style="max-width: 680px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: ${color}; margin-bottom: 8px;">
        Nova Resposta
      </div>
      <div style="font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 4px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-size: 13px; color: #666;">
        ${escapeHtml(date)}
      </div>
    </div>

    <!-- Name highlight -->
    <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
      <div style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px;">Respondente</div>
      <div style="font-size: 20px; font-weight: 600; color: #fff;">${escapeHtml(name || 'Não informado')}</div>
    </div>

    <!-- Fields table -->
    <div style="background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden;">
      <table style="width: 100%; border-collapse: collapse;">
        ${fields}
      </table>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #111;">
      <div style="font-size: 12px; color: #444;">
        Reis Marketing IA — O Tempo é Rei.
      </div>
    </div>

  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { form_type, name, data } = req.body;

    if (!form_type || !data) {
      return res.status(400).json({ error: 'Missing form_type or data' });
    }

    const label = TYPE_LABELS[form_type] || form_type;
    const html = buildEmailHtml(form_type, name, data);

    // 1. Save to Supabase
    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ form_type, name: name || '', data })
    });

    if (!supabaseResponse.ok) {
      console.error('Supabase error:', await supabaseResponse.text());
    }

    // 2. Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Reis Marketing IA <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject: `[Reis Marketing] ${label} — ${name || 'Nova resposta'}`,
        html: html
      })
    });

    if (!emailResponse.ok) {
      console.error('Resend error:', await emailResponse.text());
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
