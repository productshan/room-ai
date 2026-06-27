import type { Generations } from '../types/generations';
import type {
	GenerationsCreateInput,
	GenerationsUpdateSchema
} from '../schemas/generations.schema';
import { requireClient } from './helper';

const tabelName = 'generations';

export async function createGeneration(generation: GenerationsCreateInput) {
	const client = requireClient();
	const { data, error } = await client.from(tabelName).insert(generation).select().single();

	if (error) {
		throw error;
	}

	return data as Generations | null;
}

export async function getGenerationByProjectId(id: string) {
	const client = requireClient();
	const { data, error } = await client.from(tabelName).select('*').eq('project_id', id);

	if (error) {
		throw error;
	}

	return (data as Generations[] | null) ?? [];
}

export async function deleteGeneration(id: string) {
	const client = requireClient();
	const { error } = await client.from(tabelName).delete().eq('id', id);

	if (error) throw error;

	return true;
}
