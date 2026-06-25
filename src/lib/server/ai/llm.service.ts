import { GEMINI_API_KEY } from '$env/static/private';
import { unsplashImage } from './unsplah.service';

export async function generateTextFromPrompt(prompt: string, imageUrl: string) {
	let fullPrompt = `
	You are a professional interior designer. 
	Analyze the uploaded room image.
	
	User request:"${prompt}"

	${imageUrl ? `The user has provided an image of their room: ${imageUrl}` : 'The user has not provided an image of their room.'}
	
	For each furniture, find real products on Shopee Indonesia.
	Important - Follow These Rules for Furniture Recommendations:
	1. Use only valid shopee products ur
	2. Make sure the image_url is a valid image url that can be opened in a browser.

	marketplace_url:
	Use Shopee search URLs in this format:
	https://shopee.co.id/search?keyword=<keyword>


	Return ONLY valid JSON.
	
	Schema:
	{ 
	"style": string,
	"color_palette": [
		"name": string,
		"hex_code": string
	],
	"furniture": [	
		"name": string,
    	"image_url": string,
    	"url_to_buy": string,
    	"price": string
	}],
	"improvements": string[],
	"image_prompt": string
	}`;

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-goog-api-key': GEMINI_API_KEY
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: fullPrompt
							}
						]
					}
				]
			})
		}
	);

	let llm_response = await response.json();
	llm_response = llm_response.candidates[0].content.parts[0].text;
	llm_response = JSON.parse(llm_response);

	let furnitures = llm_response.furniture;

	const furnituresWithImages = await Promise.all(
		furnitures.map(async (furniture) => {
			const image_url = await unsplashImage(furniture.name);

			return {
				...furniture,
				image_url
			};
		})
	);

	llm_response = {...llm_response,  furniture: furnituresWithImages}


	if (llm_response.error) {
		let errorMessage = new Error(
			llm_response.error.message || 'Unknown error occurred while generating text from prompt.'
		);
		throw errorMessage;
	}
	return {
		text: llm_response,
		timestamp: new Date().toISOString()
	};
}
