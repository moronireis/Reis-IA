/**
 * Campaign worker helpers.
 *
 * The mass-send pipeline runs as a chain of short serverless invocations:
 * send.ts prepares the queue and kicks /process, which sends one batch and
 * kicks itself again until the queue is empty. kickWorker only needs the
 * request to REACH the platform — the short abort keeps the caller within
 * its own time budget while the next invocation runs independently.
 */
// trim(): o valor no Vercel pode carregar newline no final (echo | vercel env
// add). O fetch normaliza o header em trânsito, então sem trim a comparação
// no servidor nunca bate.
export function workerKey(): string {
  return (import.meta.env.WEBHOOK_KEY || '').trim();
}

export async function kickWorker(origin: string, campaignId: string): Promise<void> {
  const key = workerKey();
  if (!key) return;
  try {
    await fetch(`${origin}/api/campaigns/${campaignId}/process`, {
      method: 'POST',
      headers: { 'x-worker-key': key },
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Timeout/abort esperado — a invocação já foi entregue à plataforma.
    // Se a entrega falhar de fato, o pump do frontend retoma a fila.
  }
}

export function isWorkerRequest(request: Request): boolean {
  const key = request.headers.get('x-worker-key');
  const expected = workerKey();
  return !!key && !!expected && key === expected;
}
