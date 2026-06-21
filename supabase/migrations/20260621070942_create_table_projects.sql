create table projects (
  id uuid primary key default gen_random_uuid(),

  title text,

  style text,

  prompt text not null,

  image_prompt text,

  status text not null default 'draft',

  original_image_url text,

  generated_image_url text,

  recommendations jsonb,

  llm_response jsonb,

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);