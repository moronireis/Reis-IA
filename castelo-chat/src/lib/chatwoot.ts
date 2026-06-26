const CHATWOOT_URL = 'https://weirdpigeon-chatwoot.cloudfy.live';
const CHATWOOT_TOKEN = 'cNbN1RCpzwsws5pCnn5bJexH';
const CHATWOOT_ACCOUNT_ID = 2;
const CHATWOOT_INBOX_ID = 2;

const headers = {
  'api_access_token': CHATWOOT_TOKEN,
  'Content-Type': 'application/json',
};

async function findOrCreateContact(phone: string, name: string): Promise<number | null> {
  // Search by phone
  const searchRes = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(phone)}&include_contacts=true`,
    { headers }
  );
  if (searchRes.ok) {
    const data = await searchRes.json() as { payload?: { id: number; phone_number?: string }[] };
    const match = data.payload?.find(
      (c) => (c.phone_number || '').replace(/\D/g, '').endsWith(phone.replace(/\D/g, '').slice(-8))
    );
    if (match) return match.id;
  }

  // Create contact
  const createRes = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/contacts`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: name || phone,
        phone_number: `+${phone}`,
        inbox_id: CHATWOOT_INBOX_ID,
      }),
    }
  );
  if (!createRes.ok) return null;
  const created = await createRes.json() as { id?: number };
  return created.id ?? null;
}

async function findOrCreateConversation(contactId: number): Promise<number | null> {
  // Search for existing open conversation for this contact + inbox
  const listRes = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/${contactId}/conversations`,
    { headers }
  );
  if (listRes.ok) {
    const data = await listRes.json() as { payload?: { id: number; inbox_id: number; status: string }[] };
    const open = data.payload?.find(
      (c) => c.inbox_id === CHATWOOT_INBOX_ID && c.status !== 'resolved'
    );
    if (open) return open.id;
  }

  // Create new conversation
  const createRes = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inbox_id: CHATWOOT_INBOX_ID,
        contact_id: contactId,
      }),
    }
  );
  if (!createRes.ok) return null;
  const created = await createRes.json() as { id?: number };
  return created.id ?? null;
}

export async function sendToChatwoot(params: {
  phone: string;
  name: string;
  text: string;
  mediaUrl?: string | null;
  contentType?: string;
  fromMe?: boolean;
}) {
  try {
    const contactId = await findOrCreateContact(params.phone, params.name);
    if (!contactId) return;

    const conversationId = await findOrCreateConversation(contactId);
    if (!conversationId) return;

    const messageType = params.fromMe ? 'outgoing' : 'incoming';

    // Build message content
    let content = params.text || '';
    if (!content && params.contentType && params.contentType !== 'text') {
      content = `[${params.contentType}]`;
    }

    const messageBody: Record<string, unknown> = {
      content,
      message_type: messageType,
      private: false,
    };

    // Attach media if available
    if (params.mediaUrl && params.contentType && params.contentType !== 'text') {
      messageBody.attachments = [{ url: params.mediaUrl }];
    }

    await fetch(
      `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(messageBody),
      }
    );
  } catch (err) {
    console.error('[chatwoot] Error sending to Chatwoot:', err);
  }
}
