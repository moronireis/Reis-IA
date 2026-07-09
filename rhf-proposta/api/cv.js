/**
 * CV Unified Handler — Vercel Serverless Function
 *
 * POST /api/cv?action=generate      → { candidate_id, vacancy_id?, complementar?, user_id?, user_name? }
 * GET  /api/cv?action=query         → list/fetch CVs
 * GET  /api/cv?action=query&id=X    → single CV
 * POST /api/cv?action=send-email    → { cv_id, to, cc?, candidate_name? }
 * POST /api/cv?action=upload-chatguru → { cv_id, phone, file_base64?, file_name?, caption? }
 *                                      with file_base64: uploads PDF to Supabase Storage
 *                                      and sends via ChatGuru message_file_send;
 *                                      without: legacy formatted-text message_send
 * POST /api/cv?action=import-pdf    → { pdf_text, file_name? }
 *                                      extracts structured data from a Pandapé CV PDF
 *                                      (OpenAI structured outputs) and upserts the candidate
 *
 * complementar object fields:
 *   pretensao, idiomas, data_nascimento, cidade, estado_civil,
 *   filhos, cnh, veiculo, disponibilidade, ultimo_salario, info_extra
 */

import { select, insert, update, uploadToStorage } from '../lib/supabase.js';
import { getVacancy } from '../lib/pandape.js';
import { sendMessage as chatguruSendMessage, sendFileUrl as chatguruSendFileUrl } from '../lib/chatguru.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const IMPORT_MODEL = process.env.OPENAI_IMPORT_MODEL || 'gpt-4o-mini';
const CV_BUCKET = 'rhf-cvs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action;

  if (action === 'generate' && req.method === 'POST') return handleGenerate(req, res);
  if (action === 'query' && req.method === 'GET') return handleQuery(req, res);
  if (action === 'update' && req.method === 'POST') return handleUpdate(req, res);
  if (action === 'send-email' && req.method === 'POST') return handleSendEmail(req, res);
  if (action === 'upload-chatguru' && req.method === 'POST') return handleUploadChatguru(req, res);
  if (action === 'import-pdf' && req.method === 'POST') return handleImportPdf(req, res);

  return res.status(400).json({ error: 'Use action=generate (POST) | query (GET) | update (POST) | send-email (POST) | upload-chatguru (POST) | import-pdf (POST)' });
}

// ─── Query ────────────────────────────────────────────────────────────────────

async function handleQuery(req, res) {
  try {
    const { id, candidate_id, limit = '20' } = req.query;

    if (id) {
      const rows = await select('generated_cvs', `id=eq.${id}&limit=1`);
      if (!Array.isArray(rows) || rows.length === 0) return res.status(404).json({ status: 'error', message: `CV ${id} not found` });
      return res.status(200).json({ status: 'ok', data: rows[0] });
    }

    const parsedLimit = Math.min(parseInt(limit, 10) || 20, 100);
    const parts = [`order=created_at.desc&limit=${parsedLimit}`];
    if (candidate_id) parts.push(`candidate_id=eq.${candidate_id}`);
    const cvs = await select('generated_cvs', parts.join('&'));

    return res.status(200).json({ status: 'ok', count: Array.isArray(cvs) ? cvs.length : 0, data: Array.isArray(cvs) ? cvs : [] });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Update (persist manual edits) ───────────────────────────────────────────

const EDITABLE_SECTIONS = ['resumo', 'pretensao', 'experiencia', 'formacao', 'competencias', 'idiomas', 'info_complementares'];

async function handleUpdate(req, res) {
  try {
    const { cv_id, sections } = req.body || {};
    if (!cv_id || !sections || typeof sections !== 'object') {
      return res.status(400).json({ status: 'error', message: 'cv_id e sections são obrigatórios.' });
    }

    const rows = await select('generated_cvs', `id=eq.${cv_id}&limit=1`);
    if (!Array.isArray(rows) || rows.length === 0) return res.status(404).json({ status: 'error', message: 'CV não encontrado.' });
    const cv = rows[0];

    const content = { ...(cv.cv_content || {}) };
    for (const key of EDITABLE_SECTIONS) {
      if (sections[key] !== undefined) {
        const v = String(sections[key]).trim();
        content[key] = v || null;
      }
    }

    const full_text = [
      'RESUMO', content.resumo || '',
      content.pretensao ? `\nPRETENSÃO SALARIAL\n• ${content.pretensao}` : '',
      content.experiencia ? `\nEXPERIÊNCIA PROFISSIONAL\n${content.experiencia}` : '',
      content.formacao ? `\nFORMAÇÃO\n${content.formacao}` : '',
      content.competencias ? `\nCOMPETÊNCIAS\n${content.competencias}` : '',
      content.idiomas ? `\nIDIOMAS\n${content.idiomas}` : '',
      content.info_complementares ? `\nINFORMAÇÕES COMPLEMENTARES\n${content.info_complementares}` : '',
    ].filter(Boolean).join('\n');

    const updated = await update('generated_cvs', `id=eq.${cv_id}`, { cv_content: content, full_text });
    const row = Array.isArray(updated) ? updated[0] : updated;

    return res.status(200).json({ status: 'ok', message: 'Currículo atualizado.', data: row });
  } catch (error) {
    console.error('[CV update] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function formatDateBR(str) {
  if (!str) return '';
  if (/^atual$/i.test(String(str).trim())) return 'Atual';
  if (/^\d{1,2}\/\d{4}$/.test(String(str).trim())) return str.trim();
  const m = String(str).match(/^(\d{4})-(\d{2})/);
  if (m) return `${m[2]}/${m[1]}`;
  if (/^\d{4}$/.test(String(str).trim())) return str.trim();
  return String(str).trim();
}

function calcPeriod(start, end) {
  function parseYM(str) {
    if (!str || /^atual$/i.test(String(str))) return null;
    const s = String(str).trim();
    const m1 = s.match(/^(\d{1,2})\/(\d{4})$/);
    if (m1) return { year: parseInt(m1[2]), month: parseInt(m1[1]) - 1 };
    const m2 = s.match(/^(\d{4})-(\d{2})/);
    if (m2) return { year: parseInt(m2[1]), month: parseInt(m2[2]) - 1 };
    const m3 = s.match(/^(\d{4})$/);
    if (m3) return { year: parseInt(m3[1]), month: 0 };
    return null;
  }
  const s = parseYM(start);
  if (!s) return '';
  const now = new Date();
  const e = (end && !/^atual$/i.test(String(end))) ? parseYM(end) : { year: now.getFullYear(), month: now.getMonth() };
  if (!e) return '';
  const totalMonths = (e.year - s.year) * 12 + (e.month - s.month);
  if (totalMonths < 0) return '';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
  return parts.length > 0 ? `(${parts.join(' e ')})` : '';
}

// ─── RESUMO — gerador por template (sem API) ─────────────────────────────────
//
// Segue o padrão de 3 frases dos CVs reais RHF:
//   1. "[Título] com [X anos] de experiência em [área/setor], atuando em [contexto]."
//   2. "Possui vivência em [competências], além de [algo complementar]."
//   3. "Perfil [adjetivos], com [característica] e [foco]."

function buildResumoTemplate(candidate, vacancy, complementar) {
  const raw = (candidate.raw_data && typeof candidate.raw_data === 'object') ? candidate.raw_data : {};
  const vagaTitle = vacancy?.Title ?? vacancy?.title ?? candidate.vacancy_name ?? '';

  // ── Experiência ──────────────────────────────────────────────
  const expRaw = raw.Experience ?? raw.experience ?? raw.Experiences ?? [];
  const exps = Array.isArray(expRaw) ? expRaw : [];

  // Título mais recente
  const recentTitle = exps.length > 0
    ? (exps[0].JobTitle ?? exps[0].Title ?? exps[0].Cargo ?? exps[0].Role ?? '')
    : '';

  // Título profissional de saída: usa o cargo mais recente ou o nome da vaga
  const tituloProfissional = recentTitle || vagaTitle || 'Profissional';

  // Total de anos de experiência calculado da soma de todos os empregos
  let totalMeses = 0;
  for (const exp of exps) {
    const s = exp.StartDate ?? exp.DataInicio ?? exp.start ?? '';
    const e = exp.EndDate ?? exp.DataFim ?? exp.end ?? '';
    if (!s) continue;
    function parseYM2(str) {
      if (!str || /^atual$/i.test(String(str))) return null;
      const s2 = String(str).trim();
      const m1 = s2.match(/^(\d{1,2})\/(\d{4})$/);
      if (m1) return { year: parseInt(m1[2]), month: parseInt(m1[1]) - 1 };
      const m2 = s2.match(/^(\d{4})-(\d{2})/);
      if (m2) return { year: parseInt(m2[1]), month: parseInt(m2[2]) - 1 };
      const m3 = s2.match(/^(\d{4})$/);
      if (m3) return { year: parseInt(m3[1]), month: 0 };
      return null;
    }
    const sd = parseYM2(s);
    const now = new Date();
    const ed = e && !/^atual$/i.test(String(e)) ? parseYM2(e) : { year: now.getFullYear(), month: now.getMonth() };
    if (sd && ed) {
      const diff = (ed.year - sd.year) * 12 + (ed.month - sd.month);
      if (diff > 0) totalMeses += diff;
    }
  }
  const totalAnos = Math.floor(totalMeses / 12);
  const anosExpRaw = candidate.experience_years ?? raw.ExperienceYears ?? null;
  const anosExp = totalAnos > 0 ? totalAnos : (anosExpRaw ? parseInt(anosExpRaw) : 0);

  // Empresas / setores únicos para contextualizar
  const empresas = exps.map(e => e.Company ?? e.Empresa ?? e.company ?? '').filter(Boolean).slice(0, 2);

  // Áreas de atuação a partir das descrições
  const descricoes = exps.map(e => e.Description ?? e.Descricao ?? e.description ?? '').filter(Boolean);
  const descContext = descricoes.slice(0, 2).join('; ');

  // ── Competências ─────────────────────────────────────────────
  const skillsRaw = raw.Skills ?? raw.skills ?? raw.Competencias ?? [];
  const skills = Array.isArray(skillsRaw)
    ? skillsRaw.map(s => typeof s === 'string' ? s : (s.Name ?? s.name ?? s.Skill ?? '')).filter(Boolean)
    : (typeof skillsRaw === 'string' ? skillsRaw.split(/[,;]/).map(s => s.trim()).filter(Boolean) : []);

  // ── Formação ─────────────────────────────────────────────────
  const eduRaw = raw.Education ?? raw.education ?? raw.Educations ?? [];
  const educations = Array.isArray(eduRaw) ? eduRaw : [];
  const formacaoPrincipal = educations.length > 0
    ? (educations[educations.length - 1].Degree ?? educations[educations.length - 1].degree ?? educations[educations.length - 1].Curso ?? '')
    : (candidate.education ?? '');

  // ── Construir as 3 frases ─────────────────────────────────────

  // Frase 1: apresentação com anos de experiência
  let frase1 = '';
  if (anosExp >= 1) {
    const expStr = `${anosExp} ${anosExp === 1 ? 'ano' : 'anos'}`;
    if (empresas.length > 0) {
      frase1 = `${tituloProfissional} com ${expStr} de experiência, com passagem por ${empresas.join(', ')}.`;
    } else {
      frase1 = `${tituloProfissional} com ${expStr} de experiência na área${vagaTitle && vagaTitle !== tituloProfissional ? ` de ${vagaTitle}` : ''}.`;
    }
  } else if (formacaoPrincipal) {
    frase1 = `${tituloProfissional} com formação em ${formacaoPrincipal}${empresas.length > 0 ? `, com experiência em ${empresas[0]}` : ''}.`;
  } else {
    frase1 = `${tituloProfissional} com experiência na área${vagaTitle && vagaTitle !== tituloProfissional ? ` de ${vagaTitle}` : ''}.`;
  }

  // Frase 2: competências e vivência
  let frase2 = '';
  if (skills.length >= 3) {
    const top = skills.slice(0, 4);
    const ultimo = top.pop();
    frase2 = `Possui vivência em ${top.join(', ')} e ${ultimo}.`;
  } else if (skills.length > 0) {
    frase2 = `Possui experiência em ${skills.join(' e ')}.`;
  } else if (descContext) {
    // Extrai até 60 chars da primeira descrição como contexto
    const snippet = descContext.slice(0, 80).replace(/[.!?].*/, '').trim();
    if (snippet.length > 10) frase2 = `Possui vivência em ${snippet.toLowerCase()}.`;
  } else if (complementar?.info_extra) {
    const snippet = String(complementar.info_extra).slice(0, 80).replace(/[.!?].*/, '').trim();
    if (snippet.length > 10) frase2 = `${snippet}.`;
  }

  // Frase 3: perfil comportamental + disponibilidade
  let frase3 = '';
  const disponibilidade = complementar?.disponibilidade ?? '';
  const idiomas = complementar?.idiomas ?? '';
  const extras = [];
  if (disponibilidade) extras.push(`disponibilidade ${disponibilidade.toLowerCase()}`);
  if (idiomas) extras.push(`idiomas: ${idiomas}`);

  if (extras.length > 0) {
    frase3 = `Perfil comprometido e orientado a resultados, com ${extras.join(' e ')}.`;
  } else if (skills.length > 0 || anosExp >= 1) {
    frase3 = 'Perfil organizado, comprometido e orientado a resultados.';
  }

  const frases = [frase1, frase2, frase3].filter(Boolean);
  return frases.length > 0 ? frases.join(' ') : 'Perfil profissional a ser complementado via Pandapé.';
}

// ─── Build CV sections ────────────────────────────────────────────────────────

function buildCvSections(candidate, messages, vacancy, complementar) {
  const raw = (candidate.raw_data && typeof candidate.raw_data === 'object') ? candidate.raw_data : {};

  function pick(...keys) {
    for (const k of keys) {
      if (raw[k] !== undefined && raw[k] !== null && raw[k] !== '') return raw[k];
    }
    return null;
  }

  // ── PRETENSÃO SALARIAL ─────────────────────────────────────
  const salaryRaw = complementar?.pretensao
    || candidate.salary_expectation
    || pick('SalaryExpectation', 'salary_expectation', 'PretensaoSalarial', 'Pretensao');
  let pretensao = '';
  if (salaryRaw) {
    const num = parseFloat(String(salaryRaw).replace(/[^\d.,]/g, '').replace(',', '.'));
    pretensao = !isNaN(num)
      ? `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : String(salaryRaw).trim();
  }

  // ── EXPERIÊNCIA PROFISSIONAL ───────────────────────────────
  const experienceRaw = pick('Experience', 'experience', 'Experiences', 'Experiencia', 'WorkHistory', 'Jobs');
  const expLines = [];
  if (Array.isArray(experienceRaw) && experienceRaw.length > 0) {
    for (const exp of experienceRaw) {
      const cargo = exp.JobTitle ?? exp.Title ?? exp.Cargo ?? exp.Role ?? exp.title ?? '';
      const empresa = exp.Company ?? exp.Empresa ?? exp.company ?? '';
      const cidade = exp.City ?? exp.Location ?? exp.Cidade ?? exp.city ?? '';
      const startRaw = exp.StartDate ?? exp.DataInicio ?? exp.start ?? '';
      const endRaw = exp.EndDate ?? exp.DataFim ?? exp.end ?? '';
      const start = formatDateBR(startRaw);
      const end = endRaw ? formatDateBR(endRaw) : 'Atual';
      const periodo = calcPeriod(startRaw, endRaw || 'atual');
      const desc = exp.Description ?? exp.Descricao ?? exp.description ?? '';

      if (expLines.length > 0) expLines.push(''); // blank line between entries

      // Header: "Cargo | Empresa – Cidade/UF"
      const headerParts = [];
      if (cargo) headerParts.push(cargo);
      if (empresa) headerParts.push(cidade ? `${empresa} – ${cidade}` : empresa);
      if (headerParts.length > 0) expLines.push(headerParts.join(' | '));

      // Period line
      if (start) expLines.push(`Período: ${start} a ${end}${periodo ? ' ' + periodo : ''}`);

      // Activities as bullet points
      if (desc) {
        const activities = String(desc)
          .split(/\n|(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ])/)
          .map(p => p.trim().replace(/^[•\-]\s*/, ''))
          .filter(p => p.length > 3);
        for (const a of activities) expLines.push(`• ${a}`);
      }
    }
  } else if (typeof experienceRaw === 'string' && experienceRaw.trim()) {
    expLines.push(experienceRaw.trim());
  }
  const experiencia = expLines.length > 0 ? expLines.join('\n') : null;

  // ── FORMAÇÃO ───────────────────────────────────────────────
  const eduRaw = pick('Education', 'education', 'Formacao', 'Escolaridade', 'Educations');
  const eduLines = [];
  if (Array.isArray(eduRaw) && eduRaw.length > 0) {
    for (const ed of eduRaw) {
      const degree = ed.Degree ?? ed.degree ?? ed.Curso ?? ed.course ?? '';
      const inst = ed.Institution ?? ed.institution ?? ed.Instituicao ?? ed.School ?? ed.school ?? '';
      const status = ed.Status ?? ed.status ?? ed.Situacao ?? '';
      const year = ed.Year ?? ed.year ?? ed.ConclusionYear ?? ed.EndYear ?? '';
      const parts = [degree];
      if (inst) parts.push(inst);
      if (status) parts.push(`(${status})`);
      else if (year) parts.push(`(${year})`);
      if (parts.filter(Boolean).length > 0) eduLines.push(`• ${parts.join(' – ')}`);
    }
  } else if (typeof eduRaw === 'string' && eduRaw.trim()) {
    eduLines.push(`• ${eduRaw.trim()}`);
  } else if (candidate.education) {
    eduLines.push(`• ${String(candidate.education).trim()}`);
  }
  const formacao = eduLines.length > 0 ? eduLines.join('\n') : null;

  // ── COMPETÊNCIAS ──────────────────────────────────────────
  const skillsRaw = pick('Skills', 'skills', 'Competencias', 'Habilidades', 'Abilities', 'Competencies');
  const skillLines = [];
  if (Array.isArray(skillsRaw) && skillsRaw.length > 0) {
    for (const s of skillsRaw) {
      const name = (typeof s === 'string') ? s : (s.Name ?? s.name ?? s.Skill ?? s.skill ?? '');
      if (name) skillLines.push(name); // no bullet — RHF style
    }
  } else if (typeof skillsRaw === 'string' && skillsRaw.trim()) {
    skillLines.push(...skillsRaw.split(/[,;]\s*/).map(s => s.trim()).filter(Boolean));
  }
  // Supplement from WhatsApp messages if empty
  if (skillLines.length === 0 && messages && messages.length > 0) {
    const kws = ['experiência em', 'experiencia em', 'conhecimento em', 'domínio de', 'dominio de'];
    const extracted = new Set();
    for (const m of messages) {
      const text = ((m.content ?? m.text ?? '')).toLowerCase();
      for (const kw of kws) {
        const idx = text.indexOf(kw);
        if (idx !== -1) {
          const snippet = text.slice(idx + kw.length, idx + kw.length + 60).replace(/[.!?,;].*/, '').trim();
          if (snippet.length > 2) extracted.add(snippet.charAt(0).toUpperCase() + snippet.slice(1));
        }
      }
    }
    for (const s of extracted) skillLines.push(s);
  }
  const competencias = skillLines.length > 0 ? skillLines.join('\n') : null;

  // ── IDIOMAS ───────────────────────────────────────────────
  const idiomaLines = [];
  const idiomasExtra = complementar?.idiomas;
  const idiomasRaw = pick('Languages', 'languages', 'Idiomas', 'Language');

  if (idiomasExtra) {
    String(idiomasExtra).split(/[;,]/).map(s => s.trim()).filter(Boolean).forEach(i => idiomaLines.push(`• ${i}`));
  } else if (Array.isArray(idiomasRaw)) {
    for (const l of idiomasRaw) {
      const name = l.Language ?? l.language ?? l.Idioma ?? l.name ?? (typeof l === 'string' ? l : '');
      const level = l.Level ?? l.level ?? l.Nivel ?? '';
      if (name) idiomaLines.push(`• ${name}${level ? ' – ' + level : ''}`);
    }
  } else if (typeof idiomasRaw === 'string' && idiomasRaw.trim()) {
    idiomaLines.push(`• ${idiomasRaw.trim()}`);
  }
  const idiomas = idiomaLines.length > 0 ? idiomaLines.join('\n') : null;

  // ── INFORMAÇÕES COMPLEMENTARES ────────────────────────────
  const infoLines = [];
  const city = complementar?.cidade || candidate.city || pick('City', 'city', 'Cidade');
  if (complementar?.data_nascimento) infoLines.push(`Data de nascimento: ${complementar.data_nascimento}`);
  if (city) infoLines.push(`Cidade/UF: ${city}`);
  if (complementar?.estado_civil) infoLines.push(`Estado civil: ${complementar.estado_civil}`);
  if (complementar?.filhos !== undefined && complementar.filhos !== '') infoLines.push(`Filhos: ${complementar.filhos}`);
  if (complementar?.cnh) infoLines.push(`CNH: ${complementar.cnh}`);
  if (complementar?.veiculo) infoLines.push(`Veículo próprio: ${complementar.veiculo}`);
  if (complementar?.disponibilidade) infoLines.push(`Disponibilidade: ${complementar.disponibilidade}`);
  if (complementar?.ultimo_salario) infoLines.push(`Último salário: ${complementar.ultimo_salario}`);
  const info_complementares = infoLines.length > 0 ? infoLines.join('\n') : null;

  return { pretensao, experiencia, formacao, competencias, idiomas, info_complementares };
}

// ─── Generate ─────────────────────────────────────────────────────────────────

async function handleGenerate(req, res) {
  try {
    const { candidate_id, vacancy_id, vacancy_name: vacancyNameManual, complementar, user_id, user_name } = req.body ?? {};
    if (!candidate_id) return res.status(400).json({ status: 'error', message: 'candidate_id is required' });

    const candidates = await select('candidates', `id=eq.${candidate_id}&limit=1`);
    if (!Array.isArray(candidates) || candidates.length === 0) return res.status(404).json({ status: 'error', message: `Candidate ${candidate_id} not found` });
    const candidate = candidates[0];

    let messages = [];
    if (candidate.phone) {
      try {
        const raw = await select('rhf_messages', `phone=eq.${candidate.phone}&order=created_at.desc&limit=20`);
        if (Array.isArray(raw)) messages = raw.reverse();
      } catch (err) { console.warn('[CV] messages fetch failed:', err.message); }
    }

    let vacancy = null;
    const vid = vacancy_id ?? candidate.vacancy_id ?? null;
    if (vid) { try { vacancy = await getVacancy(vid); } catch (err) { console.warn('[CV] vacancy skip:', err.message); } }

    const extra = complementar || {};

    // Build structural sections
    const sections = buildCvSections(candidate, messages, vacancy, extra);

    // Generate RESUMO via template (no external API)
    const resumo = buildResumoTemplate(candidate, vacancy, extra);

    const vacancyName = vacancy?.Title ?? vacancy?.title ?? vacancy?.Name ?? vacancy?.name ?? vacancyNameManual ?? candidate.vacancy_name ?? null;

    const cvRow = {
      candidate_id,
      vacancy_id: vid,
      vacancy_name: vacancyName,
      candidate_name: candidate.name ?? 'Não informado',
      cv_content: {
        resumo,
        pretensao: sections.pretensao || null,
        experiencia: sections.experiencia,
        formacao: sections.formacao,
        competencias: sections.competencias,
        idiomas: sections.idiomas,
        info_complementares: sections.info_complementares,
        photo: extra.photo || null,
      },
      full_text: [
        'RESUMO', resumo,
        sections.pretensao ? `\nPRETENSÃO SALARIAL\n• ${sections.pretensao}` : '',
        sections.experiencia ? `\nEXPERIÊNCIA PROFISSIONAL\n${sections.experiencia}` : '',
        sections.formacao ? `\nFORMAÇÃO\n${sections.formacao}` : '',
        sections.competencias ? `\nCOMPETÊNCIAS\n${sections.competencias}` : '',
        sections.idiomas ? `\nIDIOMAS\n${sections.idiomas}` : '',
        sections.info_complementares ? `\nINFORMAÇÕES COMPLEMENTARES\n${sections.info_complementares}` : '',
      ].filter(Boolean).join('\n'),
      model_used: 'template',
      created_by: user_id || null,
      created_by_name: user_name || null,
    };

    // Save is mandatory: send-email / ChatGuru / cv-print all depend on the persisted row
    let savedCv = null;
    try {
      const ins = await insert('generated_cvs', cvRow);
      savedCv = Array.isArray(ins) ? ins[0] : ins;
      if (!savedCv?.id) throw new Error('insert returned no id');
    } catch (err) {
      console.error('[CV] save failed:', err.message);
      return res.status(500).json({ status: 'error', message: `Currículo gerado mas não foi possível salvar: ${err.message}` });
    }

    return res.status(200).json({
      status: 'ok',
      cv: {
        id: savedCv?.id ?? null,
        candidate_id,
        candidate_name: cvRow.candidate_name,
        vacancy_name: vacancyName,
        candidate_phone: candidate.phone ?? null,
        sections: cvRow.cv_content,
        full_text: cvRow.full_text,
        generated_at: savedCv?.created_at ?? new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[CV Generate] Error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Send Email ───────────────────────────────────────────────────────────────

async function handleSendEmail(req, res) {
  const { cv_id, to, cc, candidate_name } = req.body || {};
  if (!cv_id || !to) return res.status(400).json({ status: 'error', message: 'cv_id e to são obrigatórios.' });

  const resendKey = process.env.RESEND_API_KEY;
  const smtpFrom = process.env.SMTP_FROM || process.env.EMAIL_FROM || 'RHF Talentos <noreply@moronireis.com.br>';

  if (!resendKey) {
    return res.status(503).json({ status: 'error', code: 'NO_RESEND_KEY', message: 'RESEND_API_KEY não configurada.' });
  }

  try {
    const rows = await select('generated_cvs', `id=eq.${cv_id}&limit=1`);
    if (!Array.isArray(rows) || rows.length === 0) return res.status(404).json({ status: 'error', message: 'CV não encontrado.' });
    const cv = rows[0];

    const name = candidate_name || cv.candidate_name || 'Candidato';
    const s = cv.cv_content || {};

    const sectionStyle = 'color:#0D2035;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px;border-bottom:1.5px solid #e5e5e5;padding-bottom:5px;';

    function escHtml(t) {
      return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function nl2p(text) {
      if (!text) return '<p><em>Não informado</em></p>';
      return text.split('\n').filter(Boolean).map(l => `<p style="margin:2px 0;">${escHtml(l)}</p>`).join('');
    }

    const sections = [];
    if (s.resumo) sections.push(`<h2 style="${sectionStyle}">Resumo</h2>${nl2p(s.resumo)}<br>`);
    if (s.pretensao) sections.push(`<h2 style="${sectionStyle}">Pretensão Salarial</h2><p>• ${escHtml(s.pretensao)}</p><br>`);
    if (s.experiencia) sections.push(`<h2 style="${sectionStyle}">Experiência Profissional</h2>${nl2p(s.experiencia)}<br>`);
    if (s.formacao) sections.push(`<h2 style="${sectionStyle}">Formação</h2>${nl2p(s.formacao)}<br>`);
    if (s.competencias) sections.push(`<h2 style="${sectionStyle}">Competências</h2>${nl2p(s.competencias)}<br>`);
    if (s.idiomas) sections.push(`<h2 style="${sectionStyle}">Idiomas</h2>${nl2p(s.idiomas)}<br>`);
    if (s.info_complementares) sections.push(`<h2 style="${sectionStyle}">Informações Complementares</h2>${nl2p(s.info_complementares)}<br>`);
    // backwards compat: old CVs may still have observacoes
    if (!s.info_complementares && s.observacoes) sections.push(`<h2 style="${sectionStyle}">Informações Complementares</h2>${nl2p(s.observacoes)}<br>`);

    const htmlBody = `<!DOCTYPE html>
<html lang="pt-BR">
<body style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;background:#f4f4f4;padding:24px;">
  <div style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#0D2035;padding:22px 28px;">
      <div style="color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">${escHtml(name)}</div>
      ${cv.vacancy_name ? `<div style="color:rgba(255,255,255,0.6);margin-top:5px;font-size:13px;">${escHtml(cv.vacancy_name)}</div>` : ''}
    </div>
    <div style="padding:24px 28px;">
      ${sections.join('')}
      <hr style="border:none;border-top:1px solid #eee;margin-top:8px;">
      <p style="font-size:11px;color:#aaa;margin-top:14px;text-align:center;">Currículo gerado pela Plataforma RHF Talentos IA &bull; valedosinos@rhf.com.br &bull; 51 99936-9855</p>
    </div>
  </div>
</body>
</html>`;

    const emailPayload = {
      from: smtpFrom,
      to: Array.isArray(to) ? to : [to],
      subject: `Currículo — ${name}${cv.vacancy_name ? ` | ${cv.vacancy_name}` : ''}`,
      html: htmlBody,
    };
    if (cc) emailPayload.cc = Array.isArray(cc) ? cc : [cc];

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) {
      const isInvalidKey = emailData.name === 'validation_error' || (emailData.message || '').toLowerCase().includes('invalid');
      return res.status(400).json({
        status: 'error',
        code: isInvalidKey ? 'INVALID_RESEND_KEY' : 'SEND_FAILED',
        message: isInvalidKey
          ? 'Chave Resend inválida ou expirada. Gere uma nova em resend.com/api-keys e atualize RESEND_API_KEY no Vercel.'
          : (emailData.message || 'Erro ao enviar email.'),
      });
    }

    try {
      await update('generated_cvs', `id=eq.${cv_id}`, { sent_status: 'email', sent_at: new Date().toISOString() });
    } catch (err) { console.warn('[CV send-email] sent_status update failed:', err.message); }

    return res.status(200).json({ status: 'ok', message: 'Email enviado com sucesso.', email_id: emailData.id });
  } catch (error) {
    console.error('[CV send-email] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Format CV as WhatsApp text ─────────────────────────────────────────────

function formatCVAsWhatsApp(cv) {
  const s = cv?.cv_content || {};
  const name = cv?.candidate_name || 'Candidato';
  const vacancy = cv?.vacancy_name || '';

  const lines = [];
  lines.push(`*CURRÍCULO — ${name.toUpperCase()}*`);
  if (vacancy) lines.push(`_Vaga: ${vacancy}_`);
  lines.push('');

  if (s.resumo) {
    lines.push('*RESUMO*');
    lines.push(s.resumo);
    lines.push('');
  }
  if (s.pretensao) {
    lines.push('*PRETENSÃO SALARIAL*');
    lines.push(`• ${s.pretensao}`);
    lines.push('');
  }
  if (s.experiencia) {
    lines.push('*EXPERIÊNCIA PROFISSIONAL*');
    lines.push(s.experiencia);
    lines.push('');
  }
  if (s.formacao) {
    lines.push('*FORMAÇÃO*');
    lines.push(s.formacao);
    lines.push('');
  }
  if (s.competencias) {
    lines.push('*COMPETÊNCIAS*');
    lines.push(s.competencias);
    lines.push('');
  }
  if (s.idiomas) {
    lines.push('*IDIOMAS*');
    lines.push(s.idiomas);
    lines.push('');
  }
  if (s.info_complementares || s.observacoes) {
    lines.push('*INFORMAÇÕES COMPLEMENTARES*');
    lines.push(s.info_complementares || s.observacoes);
    lines.push('');
  }
  lines.push('_Currículo gerado pela Plataforma RHF Talentos IA_');
  return lines.join('\n');
}

// ─── Send CV to ChatGuru as WhatsApp message ─────────────────────────────────

async function handleUploadChatguru(req, res) {
  const { cv_id, phone, file_base64, file_name, caption } = req.body || {};
  if (!cv_id || !phone) return res.status(400).json({ status: 'error', message: 'cv_id e phone são obrigatórios.' });

  // Normalize phone: keep only digits, ensure it has country code
  const phoneClean = String(phone).replace(/\D/g, '');
  if (phoneClean.length < 10) return res.status(400).json({ status: 'error', message: 'Número de telefone inválido.' });

  try {
    const rows = await select('generated_cvs', `id=eq.${cv_id}&limit=1`);
    const cv = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!cv) return res.status(404).json({ status: 'error', message: 'CV não encontrado.' });

    let result;
    let sentStatus;
    let sentFileUrl = null;

    if (file_base64) {
      // File mode: host the PDF on Supabase Storage, then send the public URL
      // via ChatGuru message_file_send (the API has no base64 file upload).
      const buffer = Buffer.from(String(file_base64).replace(/^data:.*?;base64,/, ''), 'base64');
      if (buffer.length < 1024) return res.status(400).json({ status: 'error', message: 'PDF inválido ou vazio.' });
      if (buffer.length > 8 * 1024 * 1024) return res.status(400).json({ status: 'error', message: 'PDF acima de 8MB.' });

      const safeName = String(file_name || `curriculo-${cv.candidate_name || 'candidato'}`)
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/\.pdf$/i, '')
        .replace(/[^a-zA-Z0-9 _-]/g, '')
        .trim().replace(/\s+/g, '-')
        .slice(0, 80) || 'curriculo';
      const objectPath = `cvs/${cv_id}/${safeName}.pdf`;

      sentFileUrl = await uploadToStorage(CV_BUCKET, objectPath, buffer, 'application/pdf');
      const defaultCaption = `Currículo — ${cv.candidate_name || 'Candidato'}${cv.vacancy_name ? ` | ${cv.vacancy_name}` : ''}`;
      result = await chatguruSendFileUrl(phoneClean, sentFileUrl, caption || defaultCaption);
      sentStatus = 'chatguru_arquivo';
    } else {
      // Legacy text mode: formatted WhatsApp message
      const text = formatCVAsWhatsApp(cv);
      result = await chatguruSendMessage(phoneClean, text);
      sentStatus = 'chatguru_texto';
    }

    console.log('[CV chatguru] mode:', sentStatus, 'result:', JSON.stringify(result));

    if (result?.result === 'success' || result?.result === 'ok' || result?.code === 200 || result?.code === 201 || result?.message_id) {
      try {
        await update('generated_cvs', `id=eq.${cv_id}`, {
          sent_status: sentStatus,
          sent_at: new Date().toISOString(),
          ...(sentFileUrl ? { sent_file_url: sentFileUrl } : {}),
        });
      } catch (err) { console.warn('[CV upload-chatguru] sent_status update failed:', err.message); }

      return res.status(200).json({
        status: 'ok',
        message: sentStatus === 'chatguru_arquivo' ? 'Arquivo PDF enviado no ChatGuru com sucesso.' : 'Currículo enviado ao ChatGuru com sucesso.',
        file_url: sentFileUrl,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: result?.description || result?.message || 'ChatGuru não confirmou o envio.',
        chatguru: result,
      });
    }
  } catch (error) {
    console.error('[CV upload-chatguru] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

// ─── Import Pandapé PDF → structured candidate data ──────────────────────────
//
// The recruiter downloads the pre-formatted CV PDF from Pandapé and uploads it
// on the Gerador de Currículo tab. The front extracts raw text client-side
// (pdf.js) and posts it here. OpenAI (conta U4D) structures the text into the
// SAME shape the Pandapé webhook writes to candidates.raw_data (Experience[],
// Education[], Skills[]...), so handleGenerate consumes it with zero changes.

const IMPORT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'phone', 'email', 'birth_date', 'city', 'marital_status', 'children', 'cnh',
    'vehicle', 'salary_expectation', 'last_salary', 'languages', 'main_education', 'vacancy_name',
    'skills', 'experiences', 'educations'],
  properties: {
    name: { type: 'string', description: 'Nome completo do candidato' },
    phone: { type: 'string', description: 'Somente dígitos com DDI 55 e DDD, ex.: 5551999998888. Vazio se ausente.' },
    email: { type: 'string', description: 'Vazio se ausente' },
    birth_date: { type: 'string', description: 'DD/MM/AAAA. Vazio se ausente.' },
    city: { type: 'string', description: 'Cidade/UF, ex.: Novo Hamburgo/RS' },
    marital_status: { type: 'string' },
    children: { type: 'string', description: 'Ex.: "2 (5 e 13 anos)" ou vazio' },
    cnh: { type: 'string', description: 'Categoria, ex.: B' },
    vehicle: { type: 'string', description: 'Sim/Não ou vazio' },
    salary_expectation: { type: 'string', description: 'Somente o valor numérico, ex.: 2500.00. Vazio se ausente.' },
    last_salary: { type: 'string', description: 'Somente o valor numérico ou vazio' },
    languages: { type: 'string', description: 'Ex.: "Inglês – Intermediário; Espanhol – Básico" ou vazio' },
    main_education: { type: 'string', description: 'Formação principal em uma linha' },
    vacancy_name: { type: 'string', description: 'Vaga/processo a que o candidato concorre, se constar no PDF' },
    skills: { type: 'array', items: { type: 'string' } },
    experiences: {
      type: 'array',
      description: 'Da mais recente para a mais antiga',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['JobTitle', 'Company', 'City', 'StartDate', 'EndDate', 'Description'],
        properties: {
          JobTitle: { type: 'string' },
          Company: { type: 'string' },
          City: { type: 'string', description: 'Vazio se ausente' },
          StartDate: { type: 'string', description: 'MM/AAAA' },
          EndDate: { type: 'string', description: 'MM/AAAA ou "Atual"' },
          Description: { type: 'string', description: 'Atividades realizadas, uma por frase' },
        },
      },
    },
    educations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['Degree', 'Institution', 'Year', 'Status'],
        properties: {
          Degree: { type: 'string' },
          Institution: { type: 'string' },
          Year: { type: 'string', description: 'Ano de conclusão ou vazio' },
          Status: { type: 'string', description: 'Completo | Cursando | Incompleto | vazio' },
        },
      },
    },
  },
};

const IMPORT_SYSTEM = `Você extrai dados estruturados de currículos em PDF exportados do ATS Pandapé (texto bruto extraído do PDF).
Regras:
- Extraia SOMENTE o que está no texto. Nunca invente dados. Campos ausentes ficam como string vazia (ou array vazio).
- Telefone: normalize para dígitos com DDI 55 (ex.: 5551999998888). Se houver mais de um, use o celular/WhatsApp.
- Datas de experiência: MM/AAAA. Emprego atual: EndDate = "Atual".
- Description de cada experiência: liste as atividades de forma limpa, uma por frase, sem bullets.
- Corrija quebras de linha e hifenização causadas pela extração do PDF.
- Acentuação correta em português.`;

async function handleImportPdf(req, res) {
  try {
    const { pdf_text, file_name } = req.body || {};
    const text = String(pdf_text || '').trim();
    if (text.length < 80) {
      return res.status(400).json({ status: 'error', message: 'Texto do PDF vazio ou curto demais. O arquivo é um PDF de texto (não escaneado)?' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ status: 'error', message: 'OPENAI_API_KEY não configurada no ambiente.' });

    const aiRes = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: IMPORT_MODEL,
        max_tokens: 4096,
        temperature: 0,
        response_format: {
          type: 'json_schema',
          json_schema: { name: 'pandape_cv', strict: true, schema: IMPORT_SCHEMA },
        },
        messages: [
          { role: 'system', content: IMPORT_SYSTEM },
          { role: 'user', content: text.slice(0, 60000) },
        ],
      }),
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok) {
      console.error('[CV import-pdf] OpenAI error:', JSON.stringify(aiData).slice(0, 500));
      return res.status(502).json({ status: 'error', message: aiData?.error?.message || 'Falha na extração com IA.' });
    }

    const choice = aiData.choices?.[0];
    if (choice?.message?.refusal) {
      return res.status(502).json({ status: 'error', message: 'IA recusou o conteúdo: ' + choice.message.refusal });
    }
    if (choice?.finish_reason === 'length') {
      return res.status(502).json({ status: 'error', message: 'PDF longo demais para a extração. Tente um PDF menor.' });
    }

    const jsonText = choice?.message?.content || '';
    let parsed;
    try { parsed = JSON.parse(jsonText); }
    catch { return res.status(502).json({ status: 'error', message: 'IA retornou resposta não estruturada.' }); }

    // ── Upsert candidate ──────────────────────────────────────
    const phoneClean = String(parsed.phone || '').replace(/\D/g, '');
    const salaryNum = parseFloat(String(parsed.salary_expectation || '').replace(/[^\d.,]/g, '').replace(',', '.'));

    const rawData = {
      Experience: parsed.experiences || [],
      Education: parsed.educations || [],
      Skills: parsed.skills || [],
      ...(parsed.salary_expectation ? { SalaryExpectation: parsed.salary_expectation } : {}),
      ...(parsed.languages ? { Languages: parsed.languages } : {}),
      pdf_import: {
        file_name: file_name || null,
        model: IMPORT_MODEL,
        imported_at: new Date().toISOString(),
        marital_status: parsed.marital_status || null,
        children: parsed.children || null,
        cnh: parsed.cnh || null,
        vehicle: parsed.vehicle || null,
        birth_date: parsed.birth_date || null,
        last_salary: parsed.last_salary || null,
      },
    };

    const candidateFields = {
      name: parsed.name || 'Candidato importado',
      ...(phoneClean.length >= 10 ? { phone: phoneClean } : {}),
      ...(parsed.email ? { email: parsed.email } : {}),
      ...(parsed.city ? { city: parsed.city } : {}),
      ...(parsed.main_education ? { education: parsed.main_education } : {}),
      ...(Array.isArray(parsed.skills) && parsed.skills.length ? { skills: parsed.skills } : {}),
      ...(!isNaN(salaryNum) && salaryNum > 0 ? { salary_expectation: salaryNum } : {}),
      ...(parsed.vacancy_name ? { vacancy_name: parsed.vacancy_name } : {}),
    };

    let candidate = null;
    let existing = null;
    if (phoneClean.length >= 10) {
      const found = await select('candidates', `phone=eq.${phoneClean}&limit=1`);
      existing = Array.isArray(found) && found.length > 0 ? found[0] : null;
    }

    if (existing) {
      const mergedRaw = { ...(existing.raw_data && typeof existing.raw_data === 'object' ? existing.raw_data : {}), ...rawData };
      const updated = await update('candidates', `id=eq.${existing.id}`, {
        ...candidateFields,
        raw_data: mergedRaw,
        updated_at: new Date().toISOString(),
      });
      candidate = Array.isArray(updated) && updated.length > 0 ? updated[0] : { ...existing, ...candidateFields };
    } else {
      const inserted = await insert('candidates', {
        ...candidateFields,
        raw_data: rawData,
        status: 'new',
        ...(phoneClean.length < 10 ? { phone: null } : {}),
      });
      candidate = Array.isArray(inserted) ? inserted[0] : inserted;
    }

    return res.status(200).json({
      status: 'ok',
      message: existing ? 'Candidato atualizado a partir do PDF.' : 'Candidato criado a partir do PDF.',
      candidate_id: candidate?.id || null,
      candidate,
      parsed: {
        birth_date: parsed.birth_date || '',
        city: parsed.city || '',
        marital_status: parsed.marital_status || '',
        children: parsed.children || '',
        cnh: parsed.cnh || '',
        vehicle: parsed.vehicle || '',
        salary_expectation: parsed.salary_expectation || '',
        last_salary: parsed.last_salary || '',
        languages: parsed.languages || '',
        vacancy_name: parsed.vacancy_name || '',
      },
      usage: aiData.usage || null,
    });
  } catch (error) {
    console.error('[CV import-pdf] error:', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}
