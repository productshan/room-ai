import { UNSPLASH_ACCESS_KEY } from '$env/static/private';

export async function unsplashImage(query: string) {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
		{
			headers: {
				Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
			}
		}
	);

	if (!response.ok) {
		throw new Error('Failed to search Unsplash');
	}

	const data = await response.json();

	const photo = data.results?.[0];

	if (!photo) {
		return null;
	}

	return  photo.urls.small
}
