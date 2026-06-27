import { getProfileById, updateProfile } from '../repositories/profiles.repository';
import { supabaseClient } from '../supabase/client';
import { ProfileUpdateSchema } from '../schemas/profiles.schema';

export async function getUserIdFromHeaders(headers: Headers): Promise<string> {
  const authHeader = headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Unauthorized: Missing or invalid token');
    (err as any).status = 401;
    throw err;
  }
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabaseClient.auth.getUser(token);
  if (error || !user) {
    const err = new Error('Unauthorized: Invalid token');
    (err as any).status = 401;
    throw err;
  }
  return user.id;
}

export async function getCurrentProfile(headers: Headers) {
  const userId = await getUserIdFromHeaders(headers);
  const profile = await getProfileById(userId);
  if (!profile) {
    const err = new Error('Profile not found');
    (err as any).status = 404;
    throw err;
  }
  return profile;
}

export async function updateCurrentProfile(headers: Headers, payload: unknown) {
  const userId = await getUserIdFromHeaders(headers);
  const validatedPayload = ProfileUpdateSchema.parse(payload);
  const profile = await updateProfile(userId, validatedPayload);
  if (!profile) {
    const err = new Error('Profile not found');
    (err as any).status = 404;
    throw err;
  }
  return profile;
}
