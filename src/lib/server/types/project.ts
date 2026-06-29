export type ProjectStatus =
  | "draft"
  | "planning"
  | "generating"
  | "completed"
  | "failed";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  original_image_url: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}
