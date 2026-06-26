create table profiles (
    id uuid primary key references auth.users(id),
    name text,
    avatar_url text,
    created_at timestamptz default now()
);

create table generations (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references projects(id) on delete cascade,
    prompt text,
    recommendation_json jsonb,
    generated_image_url text,
    status text default 'pending',
    created_at timestamptz default now()
);