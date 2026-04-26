import { z } from 'zod';

// ── Auth / Profile ──────────────────────────────────────────
export const profileUpdateSchema = z.object({
  full_name: z.string().min(2).max(200).optional(),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  avatar_url: z.string().url().optional().nullable(),
}).strict();

// ── Leads Webhook ───────────────────────────────────────────
export const leadWebhookSchema = z.object({
  id: z.string().optional(),
  crmRef: z.string().optional(),
  name: z.string().max(200).optional(),
  whatsapp: z.string().max(30).optional(),
  email: z.string().email().max(200).optional(),
  company: z.string().max(200).optional(),
  segment: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  revenue: z.string().max(100).optional(),
  employees: z.string().max(100).optional(),
  booking: z.object({
    date: z.string().optional(),
    time: z.string().optional(),
  }).optional(),
  source: z.string().max(100).optional(),
}).passthrough(); // allow extra fields in raw_data

// ── New Lead Webhook ────────────────────────────────────────
export const newLeadWebhookSchema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().email().max(200).optional(),
  phone: z.string().max(30).optional(),
  instagram: z.string().max(100).optional(),
  source: z.string().max(100).optional(),
  form_type: z.string().max(100).optional(),
  cargo: z.string().max(200).optional(),
  faturamento: z.string().max(100).optional(),
  objetivo: z.string().max(500).optional(),
  notes: z.string().max(2000).optional(),
}).refine(data => data.name || data.email, {
  message: 'name or email is required',
});

// ── Posts ────────────────────────────────────────────────────
export const createPostSchema = z.object({
  space_id: z.string().min(1).max(100),
  title: z.string().max(500).optional(),
  content: z.string().min(1).max(10000),
});

// ── Comments ────────────────────────────────────────────────
export const createCommentSchema = z.object({
  content: z.string().min(1).max(5000),
  parent_id: z.string().uuid().optional().nullable(),
});

// ── Branding Forms ──────────────────────────────────────────
const validFormTypes = ['personal-branding', 'company-branding', 'product-branding', 'movement-branding'] as const;

export const createBrandingFormSchema = z.object({
  form_type: z.enum(validFormTypes),
  mentorship_id: z.string().uuid().optional().nullable(),
  data: z.record(z.unknown()).optional(),
});

// ── Mentorship Sessions ─────────────────────────────────────
export const createSessionSchema = z.object({
  date: z.string().min(1),
  duration_minutes: z.number().int().min(15).max(480).optional(),
  summary: z.string().max(5000).optional().nullable(),
  notes: z.string().max(10000).optional().nullable(),
  action_items: z.string().max(5000).optional().nullable(),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'no_show']).optional(),
});

// ── Mentorship Tasks ────────────────────────────────────────
export const createMentorshipTaskSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional().nullable(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().optional().nullable(),
  category: z.enum(['systems', 'marketing', 'builders']).optional(),
  assigned_to: z.enum(['mentor', 'mentee']).optional(),
  link: z.string().url().max(1000).optional().nullable(),
});

// ── Helper ──────────────────────────────────────────────────
export function parseBody<T>(schema: z.ZodType<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const messages = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
  return { success: false, error: messages };
}
