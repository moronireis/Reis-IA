export function formatTime(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000) {
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 13) {
    return `+${digits.slice(0,2)} (${digits.slice(2,4)}) ${digits.slice(4,5)} ${digits.slice(5,9)}-${digits.slice(9)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,3)} ${digits.slice(3,7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function getMediaExtension(contentType: string): string {
  const map: Record<string, string> = {
    image: 'jpg', audio: 'ogg', ptt: 'ogg', video: 'mp4',
    document: 'bin', sticker: 'webp',
  };
  return map[contentType] || 'bin';
}
