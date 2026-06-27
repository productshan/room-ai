import { IMAGE_GENERATION_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase/admin';
import { SUPABASE_BUCKET, formatStoragePath } from '$lib/server/supabase/storage';

export async function generateImage(
	llmRecommendations: any,
	orginal_image_ref: string
) {
  let recommendations = {
    style: llmRecommendations.style,
    furnitures:llmRecommendations.furnitures,
    colors: llmRecommendations.colors,
    improvements: llmRecommendations.improvements
  }
	let prompt = `
  Use the provided reference room image as the primary source of truth.

  provided reference: ${orginal_image_ref}

  PRIORITY ORDER:

  1. Preserve the reference room image.
  2. Preserve room structure.
  3. Preserve camera angle.
  4. Apply color palette.
  5. Apply furniture recommendations.
  6. Apply design style.

  The reference image must dominate all design decisions.

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
  - Do not add new windows or doors.
  - Do not move structural elements.

  The final image must look like a realistic renovation of the SAME room, photographed from the SAME camera position.
  
  NEGATIVE INSTRUCTIONS:
  - Do not create a different room.
  - Do not create a larger room.
  - Do not add luxury architecture that does not exist.
  - Do not add extra windows.
  - Do not add extra doors.
  - Do not change room proportions.
  - Do not change perspective.
  - Do not change camera position.
  - Do not generate a new floor plan.

  DESIGN STYLE:
  ${recommendations.style}

  COLOR PALETTE:
  ${recommendations.colors}

  RECOMMENDED FURNITURE:
  ${recommendations.furnitures}

  IMPLEMENTATION NOTES:
  ${recommendations.improvements}

  Only modify:
  - furniture
  - decorations
  - wall colors
  - materials
  - lighting

  Do not modify:
  - room dimensions
  - room layout
  - architectural elements
  - doors
  - windows
  - camera position

  Replace existing furniture only when necessary.

  Maintain realistic spacing and furniture scale according to the room size.

  The result should appear achievable in a real renovation project.

  Photorealistic interior design.
  High-quality lighting.
  Professional interior photography.
  Same room before and after transformation.`;

	const response = await fetch(
		`https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=klein`,
		{
			headers: {
				Authorization: `Bearer ${IMAGE_GENERATION_API_KEY}`,
				Accept: 'image/jpeg'
			}
		}
	);

	const imageBuffer = await response.arrayBuffer();

	const contentType = response.headers.get('content-type') ?? 'image/jpeg';

	const extension = contentType.includes('png') ? 'png' : 'jpg';

	const filename = `${crypto.randomUUID()}.${extension}`;

	const path = formatStoragePath('generated', filename);

	const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
		.from(SUPABASE_BUCKET)
		.upload(path, imageBuffer, {
			contentType,
			upsert: false
		});

	if (uploadError) {
		throw uploadError;
	}

	const { data } = supabaseAdmin.storage.from(SUPABASE_BUCKET).getPublicUrl(path);

	return {
		path,
		url: data.publicUrl
	};
}
