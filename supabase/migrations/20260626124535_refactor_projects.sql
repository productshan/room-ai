alter table public.projects
add column if not exists user_id uuid;

alter table public.projects
add constraint projects_user_id_fkey
foreign key (user_id)
references public.profiles(id)
on delete cascade;

alter table public.projects
drop column if exists style;

alter table public.projects
drop column if exists prompt;

alter table public.projects
drop column if exists image_prompt;

alter table public.projects
drop column if exists generated_image_url;

alter table public.projects
drop column if exists recommendations;

alter table public.projects
drop column if exists llm_response;