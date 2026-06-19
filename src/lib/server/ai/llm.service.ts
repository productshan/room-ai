export async function generateTextFromPrompt(prompt: string) {
  return {
    text: prompt,
    timestamp: new Date().toISOString()
  };
}
