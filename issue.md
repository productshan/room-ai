# ISSUE-013 - Upload Original Room Image from Create Project Page

## Objective

Implement image upload functionality on the Create Project page.

Users must be able to:

1. Select an image from their device
2. Preview the selected image
3. Upload the image to Supabase Storage
4. Receive the uploaded image URL
5. Store the image URL temporarily in the page state
6. Use the image URL later when creating a project

This issue focuses ONLY on image upload.

Do NOT create projects yet.

Do NOT call Gemini.

Do NOT generate AI images.

---

# Background

Supabase bucket already exists:

room-ai

Folder structure:

originals/
generated/

This issue only uploads files into:

originals/

---

# User Flow

User opens:

/projects/new

↓

Select image

↓

Image preview appears

↓

Click Upload

↓

Image uploaded to Supabase

↓

Receive public URL

↓

Store URL in page state

↓

Ready for future project creation

---

# Task 1 - Create Upload Section

Page:

src/routes/projects/new/+page.svelte

Add:

- File picker
- Upload button
- Upload status
- Image preview

Layout should match existing Room.ai design system.

Style requirements:

- Clean
- Minimal
- Interior-focused
- Consistent with current typography and colors

---

# Task 2 - File Selection

Allow:

image/jpeg
image/png
image/webp

When file selected:

Show preview immediately.

Use browser preview only.

Do not upload automatically.

---

# Task 3 - Upload Trigger

User must explicitly click:

Upload Image

Button.

Upload should call:

POST /api/uploads

Using:

FormData

Example:

image -> selected file

---

# Task 4 - Loading State

While uploading:

- Disable upload button
- Show loading indicator

Example:

Uploading...

Prevent duplicate uploads.

---

# Task 5 - Success State

When upload succeeds:

Display:

- Success message
- Uploaded image preview

Store response:

```ts
{
  path: string;
  url: string;
}