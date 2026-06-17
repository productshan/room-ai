# ISSUE-007 - Build Dashboard Page

## Priority

High

## Type

UI / UX Feature

---

# Objective

Create the main Dashboard page for Room.ai.

The dashboard serves as the user's workspace.

Users should be able to:

* View previous room designs
* Open existing projects
* Create a new room transformation
* Continue exploring past ideas

The dashboard should feel like a modern creative workspace rather than a traditional admin panel.

---

# Design Direction

The dashboard should feel like a combination of:

* Pinterest
* Notion
* Airbnb
* Interior Design Portfolio

Keywords:

* Clean
* Organized
* Warm
* Minimal
* Visual-first

Avoid:

❌ Admin panel appearance

❌ Enterprise software styling

❌ Dense tables

❌ Sidebar-heavy layouts

❌ Dark mode

The focus should be the room designs.

---

# Route

```text id="xy3r7a"
/dashboard
```

---

# Page Structure

```text id="5t0j8k"
Dashboard Page

├── Dashboard Header
├── Quick Actions
├── Project Gallery
└── Empty State
```

---

# Dashboard Header

## Title

```text id="n5j2tx"
My Designs
```

Use:

```css id="7q85r8"
font-family: var(--font-display);
```

Large heading.

---

## Description

```text id="x8m14x"
Explore previous room transformations or create a new design.
```

Use:

```css id="6rj8r9"
font-family: var(--font-body);
```

---

# Primary Action

Button:

```text id="m7q8yp"
New Design
```

Purpose:

Navigate to:

```text id="a95m8h"
/projects/new
```

Style:

Primary button.

Prominent but not oversized.

---

# Layout

Desktop:

```text id="1s38vc"
+--------------------------------------+
| My Designs         [ New Design ]    |
+--------------------------------------+

+----------+----------+----------+
| Project  | Project  | Project  |
+----------+----------+----------+

+----------+----------+----------+
| Project  | Project  | Project  |
+----------+----------+----------+
```

---

Mobile:

```text id="b8d5q2"
My Designs

[ New Design ]

Project

Project

Project
```

Single-column layout.

---

# Project Gallery

The gallery is the main content area.

Display projects using cards.

Visual-first design.

Users should see room previews immediately.

---

# Project Card

Each card represents one generated design.

---

## Card Structure

```text id="3n4z6q"
+----------------------------------+
|                                  |
| Generated Room Preview           |
|                                  |
+----------------------------------+

Japanese Minimalist Workspace

May 18, 2026

Bedroom
```

---

## Image

Use:

```text id="2m5q7r"
generatedImage
```

The image should occupy most of the card.

Aspect ratio:

```css id="v2p8m1"
4 / 3
```

Rounded corners.

---

## Project Title

Example:

```text id="5k9r3p"
Japanese Minimalist Workspace
```

Use:

```css id="s8d6n5"
font-family: var(--font-body);
font-weight: 600;
```

---

## Metadata

Example:

```text id="4x6p2w"
May 18, 2026
```

```text id="8z4m7n"
Workspace
```

Muted appearance.

---

# Hover State

Desktop only.

Allowed:

* subtle lift
* border highlight
* shadow-sm

Avoid:

❌ aggressive animations

❌ glowing effects

---

# Empty State

When user has no projects.

Display:

---

## Illustration Placeholder

Simple room illustration.

Can be temporary.

---

## Title

```text id="4v2r1t"
No Designs Yet
```

---

## Description

```text id="0z3m6k"
Create your first AI room transformation and start building your dream space.
```

---

## CTA

```text id="3s6y9b"
Create First Design
```

---

# Quick Actions Section

Display above project gallery.

---

## New Design Card

```text id="8q4k1d"
+ Design New Room
```

Purpose:

Quickly start a new project.

---

## Explore Examples Card

```text id="5x8m7n"
Explore Inspirations
```

Purpose:

View example transformations.

Placeholder action is acceptable.

---

# Visual Style

Use existing design tokens only.

Fonts:

```css id="j9q5s8"
var(--font-display)
var(--font-body)
var(--font-mono)
```

Colors:

```css id="3p6m2t"
var(--color-primary)
var(--color-secondary)
var(--color-accent)
var(--color-background)
var(--border)
```

Do not introduce new colors.

---

# Card Styling

Suggested:

```css id="7m4k8p"
border: 1px solid var(--border);
border-radius: 20px;
overflow: hidden;
```

Padding:

```css id="5n7d1q"
24px
```

---

# Responsive Requirements

Desktop:

3-column grid

---

Tablet:

2-column grid

---

Mobile:

1-column grid

---

# Accessibility

Requirements:

✓ Proper heading hierarchy

✓ Clickable cards

✓ Keyboard navigation

✓ Alt text for room previews

✓ Readable contrast

---

# Future Compatibility

Cards should support future data:

```ts id="1q8m5r"
{
  id: string;
  title: string;
  prompt: string;
  originalImage: string;
  generatedImage: string;
  createdAt: string;
}
```

Do not hardcode structure.

---

# Acceptance Criteria

✓ Dashboard route created

✓ Header section implemented

✓ New Design button visible

✓ Project gallery implemented

✓ Empty state implemented

✓ Responsive layout

✓ Uses existing design system

✓ Visual-first experience

✓ Matches Room.ai branding

---

# Definition Of Done

A user should immediately understand:

* What projects they have created.
* How to start a new design.
* How to revisit previous transformations.

The page should feel like a personal interior design portfolio rather than a generic dashboard.
