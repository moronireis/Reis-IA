interface UzapiConfig {
  url: string;
  token: string;
}

function getInstanceConfig(instanceId: string): UzapiConfig {
  if (instanceId === 'castelo1') {
    return {
      url: (import.meta.env.UAZAPI_URL_1 as string) || process.env.UAZAPI_URL_1 || '',
      token: (import.meta.env.UAZAPI_TOKEN_1 as string) || process.env.UAZAPI_TOKEN_1 || '',
    };
  }
  return {
    url: (import.meta.env.UAZAPI_URL_2 as string) || process.env.UAZAPI_URL_2 || '',
    token: (import.meta.env.UAZAPI_TOKEN_2 as string) || process.env.UAZAPI_TOKEN_2 || '',
  };
}

export async function getInstanceStatus(instanceId: string) {
  const { url, token } = getInstanceConfig(instanceId);
  try {
    const res = await fetch(`${url}/instance/status?token=${token}`);
    if (!res.ok) return { connected: false, status: 'error' };
    const data = await res.json() as {
      instance?: { status?: string; owner?: string; profileName?: string };
      status?: { connected?: boolean };
    };
    const isConnected = data.instance?.status === 'connected' || data.status?.connected === true;
    return {
      connected: isConnected,
      status: isConnected ? 'connected' : 'disconnected',
      phone: data.instance?.owner,
      name: data.instance?.profileName,
    };
  } catch {
    return { connected: false, status: 'error' };
  }
}

export async function getInstanceQR(instanceId: string) {
  const { url, token } = getInstanceConfig(instanceId);
  try {
    const res = await fetch(`${url}/instance/connect?token=${token}`, { method: 'POST' });
    if (!res.ok) return { qrcode: null, status: 'error' };
    const data = await res.json() as { qrcode?: string; instance?: { state?: string } };
    return {
      qrcode: data.qrcode || null,
      status: data.instance?.state || 'connecting',
    };
  } catch {
    return { qrcode: null, status: 'error' };
  }
}

export async function disconnectInstance(instanceId: string) {
  const { url, token } = getInstanceConfig(instanceId);
  await fetch(`${url}/instance/logout?token=${token}`, { method: 'DELETE' });
}

export async function sendTextMessage(instanceId: string, phone: string, text: string) {
  const { url, token } = getInstanceConfig(instanceId);
  const res = await fetch(`${url}/send/text?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, message: text }),
  });
  return res.json();
}

export async function sendMediaMessage(
  instanceId: string,
  phone: string,
  mediaUrl: string,
  mediaType: string,
  caption?: string
) {
  const { url, token } = getInstanceConfig(instanceId);
  const endpoint = mediaType === 'audio' ? 'audio' : 'file';
  const res = await fetch(`${url}/send/${endpoint}?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, url: mediaUrl, caption }),
  });
  return res.json();
}

export function normalizePhone(raw: string): string {
  return raw.replace('@s.whatsapp.net', '').replace('@g.us', '').replace(/\D/g, '');
}
