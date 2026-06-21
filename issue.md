# ISSUE-011 - Implement Project Repository & CRUD API

## Objective

Build the complete backend foundation for managing Room.ai projects.

This issue combines:

1. Project Repository Layer
2. Project CRUD API

After this issue is completed, the application must be able to:

- Create projects
- Retrieve projects
- Update projects
- Delete projects

No AI integration yet.

No image upload yet.

Focus only on project management and database interaction.

---

# Database

Table:

projects

Expected schema:

```sql
id uuid primary key

title text

style text

prompt text

image_prompt text

status text

original_image_url text

generated_image_url text

recommendations jsonb

llm_response jsonb

generation_count integer

created_at timestamptz

updated_at timestamptz