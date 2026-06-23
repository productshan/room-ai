import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { ProjectUpdateSchema } from '$lib/server/schemas/project.schema';
import { deleteProject, getProjectById, updateProject } from '$lib/server/repositories';

const ProjectUpdateRequestSchema = ProjectUpdateSchema.refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'At least one update field must be provided.'
  }
);

export async function GET({ params }) {
  try {
    const project = await getProjectById(params.id);

    if (!project) {
      return json({ error: 'Project not found.' }, { status: 404 });
    }

    return json(project);
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Unable to retrieve project.'
      },
      { status: 500 }
    );
  }
}

export async function PATCH({ params, request }) {
  try {
    const payload = await request.json();
    const updates = ProjectUpdateRequestSchema.parse(payload);
    const updatedProject = await updateProject(params.id, updates);

    if (!updatedProject) {
      return json({ error: 'Project not found.' }, { status: 404 });
    }

    return json(updatedProject);
  } catch (error) {
    if (error instanceof ZodError) {
      return json(
        { error: 'Invalid update payload', issues: error.format() },
        { status: 400 }
      );
    }

    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to update project.'
      },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }) {
  try {
    await deleteProject(params.id);
    return json({ success: true }, { status: 200 });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete project.'
      },
      { status: 500 }
    );
  }
}
