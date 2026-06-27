Issue #014 - Integrate User Profile with Supabase Auth
Objective

Integrate Supabase Authentication with the application's Profile module so every authenticated user has a corresponding profile record that can be retrieved and updated through the backend API.

Background

The project already uses Supabase as its backend.

User authentication will be handled by Supabase Auth, while application-specific user information will be stored in the profiles table.

The backend must treat profiles as the application's user entity.

Scope
Database
Create profiles table migration.
Create trigger to automatically insert a profile after successful user registration.
Add RLS policies so users can only access their own profile.
Backend

Implement:

Profile Schema
Profile Repository
Profile Service
Profile API
Repository

Implement methods:

getProfileById(userId)

updateProfile(userId, payload)
Service

Implement business logic:

getCurrentProfile()

updateCurrentProfile()
API

Create endpoint:

GET /api/profile

Returns:

{
  "id": "...",
  "username": "...",
  "full_name": "...",
  "avatar_url": "..."
}

Create endpoint:

PATCH /api/profile

Request:

{
  "username": "...",
  "full_name": "...",
  "avatar_url": "..."
}
Validation

Create Zod schema for:

ProfileSchema
ProfileUpdateSchema

Validate:

username
full_name
avatar_url
Authentication

Every API request must:

Read authenticated user from Supabase Auth session.
Reject unauthenticated requests.
Never allow clients to specify another user's ID.
Error Handling

Return appropriate HTTP status codes:

200 OK
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
Acceptance Criteria
✅ User registration automatically creates a profile.
✅ Authenticated users can retrieve their own profile.
✅ Users can update their own profile.
✅ Users cannot access or update another user's profile.
✅ Repository, Service, Schema, and API follow the existing project architecture.
✅ Input validation uses Zod.
✅ Database access is performed only through Repository.
✅ No business logic exists inside API route handlers.
Out of Scope
Google Login
GitHub Login
Password Reset
Email Verification UI
Admin dashboard
User search
Public profile pages
Role & permission management