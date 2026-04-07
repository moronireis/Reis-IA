import { createServerClient } from './supabase-server';

interface NotificationInput {
  userId: string;
  type: 'system' | 'message' | 'task' | 'project_update' | 'mentoria' | 'comment' | 'reply';
  title: string;
  body: string;
  link?: string;
}

const supabase = () => createServerClient();

/** Create a single notification for a specific user. */
export async function notify(input: NotificationInput) {
  const { error } = await supabase().from('notifications').insert({
    user_id: input.userId,
    type: input.type,
    title: input.title,
    body: input.body,
    link: input.link || '',
    read: false,
  });
  if (error) console.error('[notify] Failed:', error.message);
}

/** Notify multiple users at once. */
export async function notifyMany(userIds: string[], base: Omit<NotificationInput, 'userId'>) {
  if (userIds.length === 0) return;
  const rows = userIds.map(uid => ({
    user_id: uid,
    type: base.type,
    title: base.title,
    body: base.body,
    link: base.link || '',
    read: false,
  }));
  const { error } = await supabase().from('notifications').insert(rows);
  if (error) console.error('[notifyMany] Failed:', error.message);
}

/** Notify all admin users. */
export async function notifyAdmins(base: Omit<NotificationInput, 'userId'>) {
  const { data: admins } = await supabase()
    .from('profiles')
    .select('id')
    .eq('role', 'admin');
  if (!admins || admins.length === 0) return;
  await notifyMany(admins.map(a => a.id), base);
}
