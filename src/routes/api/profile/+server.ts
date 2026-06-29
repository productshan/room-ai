import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { getCurrentProfile, updateCurrentProfile } from '$lib/server/services/profile.service';

export async function GET({ request }) {
  try {
    const profile = await getCurrentProfile(request.headers);
    return json(profile);
  } catch (error: any) {
    const status = error.status || 500;
    return json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}

export async function PATCH({ request }) {
  try {
    const payload = await request.json();
    const profile = await updateCurrentProfile(request.headers, payload);
    return json(profile);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return json(
        { error: 'Invalid profile payload', issues: error.format() },
        { status: 400 }
      );
    }
    const status = error.status || 500;
    return json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status }
    );
  }
}
