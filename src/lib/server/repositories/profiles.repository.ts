import type { Profile } from '../types/profiles';
import type { ProfileUpdateInput } from '../schemas/profiles.schema';
import { requireClient } from './helper';

const tableName = 'profiles';

export async function getProfileById(userId: string) {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}

export async function updateProfile(userId: string, updates: ProfileUpdateInput) {
  const client = requireClient();
  const { data, error } = await client
    .from(tableName)
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}
