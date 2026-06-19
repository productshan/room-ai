export function buildProjectPrompt(title: string, style: string, prompt: string) {
  return `Design a room concept titled \"${title}\" using the style \"${style}\". Details: ${prompt}`;
}
