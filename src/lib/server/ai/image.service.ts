export async function generateImage(prompt: string) {
  return {
    imageUrl: null,
    prompt,
    generatedAt: new Date().toISOString()
  };
}
