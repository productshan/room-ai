import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { ProjectCreateSchema } from '$lib/server/schemas/project.schema';
import { createProject, getAllProjects } from '$lib/server/repositories';

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
    const createdProject = await createProject(project);
    return json(createdProject, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return json(
        { error: 'Invalid project payload', issues: error.format() },
        { status: 400 }
      );
    }

    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to create project.'
      },
      { status: 500 }
    );
  }
}
