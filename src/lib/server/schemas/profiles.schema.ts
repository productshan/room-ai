import { z } from 'zod';

export const ProfileSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
  full_name: z.string().min(1).max(100).nullable().optional(),
  avatar_url: z.string().url().nullable().optional()
});

export const ProfileUpdateSchema = ProfileSchema.partial();

export type ProfileCreateInput = z.infer<typeof ProfileSchema>;
export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;