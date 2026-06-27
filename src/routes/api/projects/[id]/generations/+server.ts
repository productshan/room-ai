import { json } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { createGeneration } from '$lib/server/repositories';
import { generateTextFromPrompt } from '$lib/server/ai/llm.service';
import { generateImage } from '$lib/server/ai/image.service.js';
import { GenerationsCreateSchema } from '$lib/server/schemas/generations.schema';

export async function POST({ request }) {
	try {
		const payload = await request.json();

		let generation = GenerationsCreateSchema.parse(payload);
		let llmRecommendatios = generateTextFromPrompt(generation.prompt, payload.image_url);
		let generatedImage = generateImage(llmRecommendatios, payload.image_url);

		generation = {
			...generation,
			recommendation_json: JSON.parse(llmRecommendatios),
			generated_image_url: (await generatedImage).url
		};

		const createdGeneration = await createGeneration(generation);
		return json(createdGeneration, { status: 201 });

	} catch (error) {
        console.error('Error creating generation:', error);
		
        if (error instanceof ZodError) {
			return json({ error: 'Invalid project payload', issues: error.format() }, { status: 400 });
		}

		return json(
			{
				error: error
			},
			{ status: 500 }
		);
	}
}
