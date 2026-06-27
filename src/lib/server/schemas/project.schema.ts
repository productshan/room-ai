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
	status: ProjectStatusSchema,
	original_image_url: z.string().url().nullable().optional(),
	user_id: z.string().uuid().nullable().optional()
});

export const ProjectUpdateSchema = ProjectCreateSchema.partial();

export type ProjectCreateInput = z.infer<typeof ProjectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>;
