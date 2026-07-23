/**
 * Utilidades de telefone client-safe (sem dependência de servidor).
 * B1 (Checkpoint 10/07): 5 das 7 falhas da campanha Ingá eram telefones
 * FIXOS cadastrados como principal — avisar ANTES do disparo, não depois.
 */

// Heurística BR: local de 8 dígitos começando em 2–5 = telefone fixo.
// (celular tem 9 dígitos começando em 9, ou 8 dígitos começando em 6–9
//  no formato antigo)
export function isLikelyLandline(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const d = phone.replace(/\D/g, '');
  const local = d.startsWith('55') && d.length >= 12 ? d.slice(4) : d.slice(2);
  return local.length === 8 && /^[2-5]/.test(local);
}
