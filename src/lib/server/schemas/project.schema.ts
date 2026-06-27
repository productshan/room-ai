import { z } from 'zod';

export const ProjectStatusSchema = z.enum([
	'draft',
	'planning',
	'generating',
	'completed',
	'failed'
]);

export const ProjectCreateSchema = z.object({
	title: z.string().min(1),
	style: z.string().min(1),
	prompt: z.string().min(1),
	image_prompt: z.string().min(1),
	status: ProjectStatusSchema,
	original_image_url: z.string().url().nullable().optional(),
	generated_image_url: z.string().url().nullable().optional(),
	recommendations: z.record(z.unknown()).nullable().optional(),
	llm_response: z.record(z.unknown()).nullable().optional()
});

export const ProjectUpdateSchema = ProjectCreateSchema.partial();

export type ProjectCreateInput = z.infer<typeof ProjectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>;
