# ISSUE-009 - Setup Backend Architecture

## Objective

Create a scalable backend foundation for Room.ai inside the existing SvelteKit application.

This issue focuses on project structure, database integration, storage integration, and service separation.

Do NOT implement AI generation yet.

Do NOT implement image generation yet.

Only establish architecture.

---

## Tech Stack

Framework:
SvelteKit

Database:
Supabase

Storage:
Supabase Storage

AI:
Gemini (future)

Image Generation:
Pollinations / OpenAI (future)

---

## Folder Structure

Create:

src/lib/server

src/lib/server/supabase
src/lib/server/ai
src/lib/server/repositories
src/lib/server/types
src/lib/server/schemas

---

## Create Supabase Client

File:

src/lib/server/supabase/client.ts

Responsibilities:

- Initialize Supabase
- Export reusable client
- Server-side only

---

## Create Project Repository

File:

src/lib/server/repositories/project.repository.ts

Responsibilities:

- Create Project
- Get Project By ID
- Get All Projects
- Update Project
- Delete Project

No business logic.

Database access only.

---

## Create AI Service Folder

Create:

src/lib/server/ai

Files:

llm.service.ts
image.service.ts
prompt-builder.ts

Implementation can be empty.

Only setup structure.

---

## Create Project Types

File:

src/lib/server/types/project.ts

Example:

type ProjectStatus =
  | "draft"
  | "planning"
  | "generating"
  | "completed"
  | "failed";

---

## Create Validation Schemas

File:

src/lib/server/schemas/project.schema.ts

Use:

zod

Purpose:

Validate incoming requests.

---

## Storage Structure

Create Supabase Bucket:

room-ai

Folder Structure:

originals/
generated/

All uploaded files must follow this convention.

---

## Database Table

projects

Fields:

id uuid

title text

style text

prompt text

image_prompt text

status text

original_image_url text

generated_image_url text

recommendations jsonb

llm_response jsonb

created_at timestamp

updated_at timestamp

---

## API Routes

Create:

GET /api/projects

POST /api/projects

GET /api/projects/[id]

PATCH /api/projects/[id]

DELETE /api/projects/[id]

Routes may return mock data for now.

---

## Acceptance Criteria

✓ Supabase connected

✓ Repository pattern established

✓ Storage bucket structure defined

✓ Types created

✓ Validation schemas created

✓ API routes created

✓ Project table schema documented

✓ Ready for AI integration

---

## Definition Of Done

The backend foundation is prepared for:

1. Room uploads
2. AI recommendations
3. AI image generation
4. Dashboard project management

without requiring future architectural changes.