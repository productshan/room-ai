import { z } from 'zod';

export const GenerationsStatusSchema = z.enum(['generating', 'finish', 'failed']);

export const GenerationsCreateSchema = z.object({
	project_id: z.string().uuid(),
	prompt: z.string().min(1),
	recommendation_json: z.record(z.unknown()).nullable().optional(),
	generated_image_url: z.string().url().nullable().optional(),
	status: GenerationsStatusSchema
});

export const GenerationsUpdateSchema = GenerationsCreateSchema.partial();

export type GenerationsCreateInput = z.infer<typeof GenerationsCreateSchema>;
export type GenerationsUpdateInput = z.infer<typeof GenerationsUpdateSchema>;
