import { createHmac, createDecipheriv } from 'crypto';

const WA_MEDIA_INFO: Record<string, string> = {
  image:    'WhatsApp Image Keys',
  sticker:  'WhatsApp Image Keys',
  audio:    'WhatsApp Audio Keys',
  ptt:      'WhatsApp Audio Keys',
  video:    'WhatsApp Video Keys',
  document: 'WhatsApp Document Keys',
};

function hkdfSha256(inputKey: Buffer, salt: Buffer, info: Buffer, length: number): Buffer {
  const prk = createHmac('sha256', salt).update(inputKey).digest();
  const blocks = Math.ceil(length / 32);
  let prev = Buffer.alloc(0);
  const chunks: Buffer[] = [];
  for (let i = 1; i <= blocks; i++) {
    prev = createHmac('sha256', prk).update(prev).update(info).update(Buffer.from([i])).digest();
    chunks.push(prev);
  }
  return Buffer.concat(chunks).slice(0, length);
}

export function decryptWhatsAppMedia(
  encryptedBytes: Buffer,
  mediaKeyB64: string,
  mediaTypeLower: string
): Buffer {
  const mediaKey  = Buffer.from(mediaKeyB64, 'base64');
  const salt      = Buffer.alloc(32, 0);
  const info      = Buffer.from(WA_MEDIA_INFO[mediaTypeLower] || 'WhatsApp Image Keys');
  const derived   = hkdfSha256(mediaKey, salt, info, 112);
  const iv        = derived.slice(0, 16);
  const cipherKey = derived.slice(16, 48);
  const ciphertext = encryptedBytes.slice(0, -10);
  const decipher   = createDecipheriv('aes-256-cbc', cipherKey, iv);
  decipher.setAutoPadding(true);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

export function getMediaExtension(contentType: string, mime: string): string {
  if (contentType === 'audio' || contentType === 'ptt') return 'ogg';
  if (contentType === 'image' || contentType === 'sticker') return 'jpg';
  if (contentType === 'video') return 'mp4';
  if (mime.includes('pdf')) return 'pdf';
  return 'bin';
}
