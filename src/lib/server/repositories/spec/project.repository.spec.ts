import { describe, expect, it } from 'vitest';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject
} from '../project.repository';

describe('project repository', () => {
  it('can create, read, update, and delete a project', async () => {
    const payload = {
      title: 'Test Project',
      status: 'draft',
      original_image_url: null,
      user_id: null
    };

    const created = await createProject(payload);
    expect(created).toMatchObject({
      title: 'Test Project',
      status: 'draft'
    });
    expect(created?.id).toBeTruthy();

    const fetched = await getProjectById(created.id);
    expect(fetched?.id).toBe(created.id);
    expect(fetched?.title).toBe('Test Project');

    const updated = await updateProject(created.id, { status: 'planning', title: 'Updated Project' });
    expect(updated?.status).toBe('planning');
    expect(updated?.title).toBe('Updated Project');

    const allProjects = await getAllProjects();
    expect(Array.isArray(allProjects)).toBe(true);
    expect(allProjects.some((project) => project?.id === created.id)).toBe(true);

    const deleted = await deleteProject(created.id);
    expect(deleted).toBe(true);

    const deletedFetch = await getProjectById(created.id);
    expect(deletedFetch).toBeNull();
  });
});
