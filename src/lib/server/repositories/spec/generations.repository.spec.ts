import { describe, expect, it } from 'vitest';
import { createProject, deleteProject } from '../project.repository';
import { createGeneration, getGenerationByProjectId, deleteGeneration } from '../generations.repository';

describe('generations repository', () => {
  it('can create, read, and delete a generation', async () => {
    // 1. Create a project first (needed for foreign key)
    const project = await createProject({
      title: 'Gen Test Project',
      status: 'draft',
      original_image_url: null,
      user_id: null
    });
    expect(project?.id).toBeTruthy();
    const projectId = project!.id;

    // 2. Create generation
    const genPayload = {
      project_id: projectId,
      prompt: 'Modern living room',
      recommendation_json: { test: true },
      generated_image_url: 'http://example.com/gen.jpg',
      status: 'completed'
    };

    const createdGen = await createGeneration(genPayload);
    expect(createdGen?.prompt).toBe('Modern living room');
    expect(createdGen?.id).toBeTruthy();

    // 3. Read generation
    const fetchedGens = await getGenerationByProjectId(projectId);
    expect(Array.isArray(fetchedGens)).toBe(true);
    expect(fetchedGens.some((g) => g.id === createdGen?.id)).toBe(true);

    // 4. Delete generation
    const deleted = await deleteGeneration(createdGen!.id);
    expect(deleted).toBe(true);

    // 5. Clean up project
    await deleteProject(projectId);
  });
});
