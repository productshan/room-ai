import { json } from '@sveltejs/kit';
import { supabaseClient } from '$lib/server/supabase/client';

export async function GET() {
	const { data, error } = await supabaseClient
		.from('projects')
		.select('id')
		.limit(1);

	if (error) {
		return json({
			connected: false,
			error: error.message
		}, { status: 500 });
	}

	return json({
		connected: true,
		data
	});
}