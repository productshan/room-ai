# ISSUE-008 - Build Create New Design Page

## Priority

High

## Type

UI / UX Feature

---

# Objective

Create the main room transformation workflow page.

This is the most important page in the application.

Users should be able to:

1. Upload a room photo
2. Describe the desired style
3. Generate an AI redesign
4. View progress while generating

The experience should feel simple, premium, and effortless.

Users should never feel overwhelmed.

---

# Route

```text id="i3p7k9"
/projects/new
```

---

# Design Direction

This page should feel like:

* Uploading a photo to a creative tool
* Midjourney
* Arc Browser
* Notion AI
* Modern interior design platform

Keywords:

* Clean
* Focused
* Spacious
* Guided
* Premium

Avoid:

❌ Complex forms

❌ Dashboard-like layouts

❌ Too many fields

❌ Technical AI terminology

The goal is to make AI feel simple.

---

# Page Structure

```text id="t5r8n2"
Create Design Page

├── Page Header
├── Upload Section
├── Style Prompt Section
├── Generate Button
└── Generation Status
```

---

# Page Header

## Eyebrow

```text id="q4v9m1"
NEW DESIGN
```

Use:

```css id="k7j2s6"
font-family: var(--font-mono);
```

Uppercase.

---

## Title

```text id="z8p5r3"
Transform Your Room
```

Use:

```css id="a2n7x4"
font-family: var(--font-display);
```

Large and editorial.

---

## Description

```text id="m6d1k8"
Upload a room photo and describe the style you want to achieve.
```

---

# Layout

Desktop:

```text id="c9t4w7"
+------------------------------------------------+
|                Page Header                     |
+------------------------------------------------+

+----------------+------------------------------+
|                |                              |
| Upload Image   | Style Prompt                 |
|                |                              |
+----------------+------------------------------+

+------------------------------------------------+
| Generate Button                               |
+------------------------------------------------+
```

---

Mobile:

```text id="v3r6y2"
Header

Upload

Prompt

Generate
```

Stack vertically.

---

# Upload Section

This should be the most prominent input.

---

## Upload Card

Requirements:

* Drag & Drop
* Click to Upload
* Large upload area
* Clear visual feedback

Suggested size:

```css id="n7w2p5"
min-height: 320px;
```

---

## Supported Formats

```text id="e4m9k1"
JPG
PNG
WEBP
```

---

## Empty State

Display:

```text id="u5q7d3"
Drag & drop your room photo

or

Click to browse
```

---

## Uploaded State

Display:

* Image preview
* Replace image button
* Remove image button

---

# Style Prompt Section

Allow users to describe the desired room style.

---

## Textarea

Placeholder:

```text id="x8c4n7"
Transform this workspace into a Japanese minimalist style with warm lighting and natural wood furniture.
```

---

## Character Limit

```text id="p3z9r2"
1000 characters
```

Display character count.

---

## Helper Examples

Display suggestion chips:

```text id="w6k1m8"
Japanese Minimalist

Scandinavian

Modern Industrial

Coastal

Contemporary
```

Clicking a chip should populate the textarea.

---

# Generate Button

Primary action.

Text:

```text id="y2v5n9"
Generate Design
```

Requirements:

* Full width on mobile
* Prominent on desktop

---

## Disabled State

Disable button when:

```text id="h7m3k6"
No Image

or

No Prompt
```

---

# Generation Status

Display only after clicking Generate.

---

## Loading Card

Display progress steps.

Example:

```text id="j8q4w1"
✓ Uploading Room

⟳ Generating Design

○ Creating Recommendations
```

---

## Loading Message

Example:

```text id="r5p9d7"
Designing your dream space...
```

---

# Future API Compatibility

Prepare page to work with:

```ts id="b4x8m2"
POST /api/projects
```

Payload:

```ts id="k9t3r6"
{
  image: File;
  prompt: string;
}
```

Do not hardcode mock implementation.

Keep architecture reusable.

---

# Visual Style

Use existing design tokens.

Fonts:

```css id="f6m2w8"
var(--font-display)
var(--font-body)
var(--font-mono)
```

Colors:

```css id="z3k7n4"
var(--color-primary)
var(--color-secondary)
var(--color-accent)
var(--color-background)
var(--border)
```

No additional colors.

---

# Upload Card Styling

Suggested:

```css id="q1w8m5"
border: 2px dashed var(--border);
border-radius: 24px;
```

Hover:

```css id="s7d4n2"
border-color: var(--color-primary);
```

---

# Accessibility

Requirements:

✓ Label for upload field

✓ Label for textarea

✓ Keyboard accessible

✓ Visible focus states

✓ Screen-reader friendly

---

# Responsive Requirements

Desktop:

2-column layout

---

Tablet:

2-column layout with reduced spacing

---

Mobile:

Single-column layout

No horizontal scrolling

---

# Acceptance Criteria

✓ Route created

✓ Upload component implemented

✓ Prompt textarea implemented

✓ Style suggestion chips implemented

✓ Generate button implemented

✓ Disabled state implemented

✓ Loading state implemented

✓ Responsive layout

✓ Uses existing design system

✓ Ready for backend integration

---

# Definition Of Done

A first-time user should be able to:

1. Upload a room photo.
2. Describe a desired style.
3. Click Generate Design.
4. Understand that the AI is processing the request.

The page should feel simple, modern, and focused on one task: transforming a room.
