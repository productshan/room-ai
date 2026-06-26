import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { ProjectCreateSchema } from '$lib/server/schemas/project.schema';
import { createProject, getAllProjects } from '$lib/server/repositories';
import { generateTextFromPrompt } from '$lib/server/ai/llm.service';
import { generateImage } from '$lib/server/ai/image.service.js';

export async function GET() {
  try {
    const projects = await getAllProjects();
        return json({ message: 'Projects retrieved successfully', data: projects });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Unable to list projects.'
      },
      { status: 500 }
    );
  }
}

export async function POST({ request }) {
  try {
    const payload = await request.json();
    const project = ProjectCreateSchema.parse(payload);
    const llmResponse = await generateTextFromPrompt(project.prompt, project.original_image_url || '');
    const imageGen = await generateImage(llmResponse.text.style, llmResponse.text.furniture, llmResponse.text.color_palette, llmResponse.text.improvements, project.original_image_url)
    const createdProject = await createProject({ ...project, llm_response: llmResponse.text, recommendations: imageGen });
    return json(createdProject, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return json(
        { error: 'Invalid project payload', issues: error.format() },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);

    return json(
      {
        error: error
      },
      { status: 500 }
    );
  }
}
