export type ProjectStatus =
  | 'draft'
  | 'planning'
  | 'generating'
  | 'completed'
  | 'failed';

export interface ProjectCreatePayload {
  title: string;
  style: string;
  prompt: string;
  image_prompt: string;
  status: ProjectStatus;
  original_image_url?: string | null;
  generated_image_url?: string | null;
  recommendations?: Record<string, unknown> | null;
  llm_response?: Record<string, unknown> | null;
}

export interface ProjectUpdatePayload extends Partial<ProjectCreatePayload> {}

async function handleResponse(response: Response) {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error((body && body.error) || response.statusText || 'Request failed');
  }

  return body;
}

export async function getProjects() {
  const response = await fetch('/api/projects');
  return handleResponse(response);
}

export async function getProjectById(id: string) {
  const response = await fetch(`/api/projects/${id}`);
  return handleResponse(response);
}

export async function createProject(payload: ProjectCreatePayload) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
}

export async function updateProject(id: string, payload: ProjectUpdatePayload) {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
}

export async function deleteProject(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
}
