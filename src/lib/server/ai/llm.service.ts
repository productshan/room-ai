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
    	"image_url": string,jadi
    	"url_to_buy": string,
    	"price": string
	}],
	"improvements": string[],
	"image_prompt": string
	}
	
	Use the provided reference room image as the primary source of truth for generating prompt for image generation.

	IMPORTANT PRESERVATION RULES:

	- Preserve the original room layout.
	- Preserve room dimensions and proportions.
	- Preserve wall locations.
	- Preserve window locations.
	- Preserve door locations.
	- Preserve ceiling height.
	- Preserve camera angle and perspective.
	- Preserve the overall architectural structure.
	- Do not redesign the room from scratch.
	- Do not change the room size.

	DESIGN STYLE:
	Japanese Minimalist

	COLOR PALETTE:
	- Warm White
	- Light Oak
	- Charcoal Gray

	RECOMMENDED FURNITURE:
	- Light Oak Desk
	- Ergonomic Chair
	- Floating Shelf

	IMPLEMENTATION NOTES:
	- Remove unnecessary decorations
	- Use indirect warm lighting

	Apply the recommended furniture and colors while keeping the original room structure intact.

	The final image must look like the same room after renovation.

	Photorealistic interior design.
	Same room before and after.
	
	`;

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
	return llm_response
}
