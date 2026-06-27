import { supabaseAdmin } from '../supabase/admin';

export function requireClient() {
	if (!supabaseAdmin) {
		throw new Error('Supabase client is not initialized.');
	}

	return supabaseAdmin;
}
