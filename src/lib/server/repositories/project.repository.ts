import type { Project } from "../types/project";
import { supabaseAdmin } from "../supabase/admin";
import type { ProjectCreateInput, ProjectUpdateInput } from "../schemas/project.schema";

const tableName = "projects";

function requireClient() {
  if (!supabaseAdmin) {
    throw new Error("Supabase client is not initialized.");
  }

  return supabaseAdmin;
}

export async function createProject(project: ProjectCreateInput) {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .insert(project)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Project | null;
}

export async function getProjectById(id: string) {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Project | null;
}

export async function getAllProjects() {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .select("*");

  if (error) {
    throw error;
  }

  return (data as Project[] | null) ?? [];
}

export async function updateProject(id: string, updates: ProjectUpdateInput) {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Project | null;
}

export async function deleteProject(id: string) {
  const client = requireClient();
  const { error } = await client
    .from(tableName)
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
