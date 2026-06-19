export async function GET({ params }) {
  const mockProject = {
    id: params.id,
    title: "Mock Project",
    style: "Contemporary",
    prompt: "Create an open-plan workspace with organic curves.",
    image_prompt: "Contemporary workspace with organic shapes",
    status: "planning",
    original_image_url: null,
    generated_image_url: null,
    recommendations: null,
    llm_response: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return new Response(JSON.stringify(mockProject), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function PATCH({ params, request }) {
  const updates = await request.json();

  return new Response(JSON.stringify({
    id: params.id,
    ...updates,
    updated_at: new Date().toISOString()
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function DELETE({ params }) {
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
