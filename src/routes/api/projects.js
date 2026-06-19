export async function GET() {
  const mockProjects = [
    {
      id: "project-1",
      title: "Minimal Living Room",
      style: "Scandinavian",
      prompt: "Cozy natural textures with warm light.",
      image_prompt: "Scandinavian minimal living room with neutral tones",
      status: "completed",
      original_image_url: null,
      generated_image_url: null,
      recommendations: null,
      llm_response: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return new Response(JSON.stringify(mockProjects), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST({ request }) {
  const body = await request.json();

  return new Response(JSON.stringify({
    id: "project-new",
    ...body,
    status: "draft",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
