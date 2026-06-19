export type ProjectStatus =
  | "draft"
  | "planning"
  | "generating"
  | "completed"
  | "failed";

export interface Project {
  id: string;
  title: string;
  style: string;
  prompt: string;
  image_prompt: string;
  status: ProjectStatus;
  original_image_url: string | null;
  generated_image_url: string | null;
  recommendations: Record<string, unknown> | null;
  llm_response: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}
