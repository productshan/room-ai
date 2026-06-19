import type { Project } from "../types/project";
import { supabaseClient } from "../supabase/client";

const tableName = "projects";

export async function createProject(
  project: Omit<Project, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabaseClient
    .from<Project>(tableName)
    .insert(project)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getProjectById(id: string) {
  const { data, error } = await supabaseClient
    .from<Project>(tableName)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllProjects() {
  const { data, error } = await supabaseClient
    .from<Project>(tableName)
    .select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabaseClient
    .from<Project>(tableName)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabaseClient
    .from<Project>(tableName)
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
