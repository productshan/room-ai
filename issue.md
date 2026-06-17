# ISSUE-004 - Create Premium Hero Section Content & Layout

## Priority

High

## Type

UI / UX Feature

---

# Objective

Create a premium hero section for Room.ai.

The hero section must immediately communicate what the product does and why it is valuable.

A visitor should understand the product within 3-5 seconds without scrolling.

The design should feel comparable to modern award-winning websites.

Inspiration:

* Apple
* Linear
* Stripe
* Arc Browser
* Awwwards-winning SaaS websites

The experience should feel premium, modern, elegant, and trustworthy.

---

# Product Summary

Room.ai helps users redesign their room using AI.

Users:

1. Upload a room photo
2. Choose or describe a design style
3. Receive an AI-generated room transformation
4. Get furniture recommendations
5. Get color palette suggestions
6. Get implementation guidance

The hero section should communicate this transformation process.

---

# Design Goal

The user should think:

> "I can upload my room photo and instantly see what it could become."

The hero should create curiosity and excitement.

The room transformation must be the centerpiece of the experience.

---

# Hero Layout

The existing BeforeAfterSlider should be used as the main visual element.

The slider occupies the entire hero background.

Content appears as an overlay on top of the room image.

Structure:

```text
Hero Section

├── BeforeAfterSlider (Background)
├── Gradient Overlay
└── Hero Content
```

---

# Headline

Use the following headline:

```text
See Your Dream Room Before You Build It.
```

Requirements:

* Large typography
* Highly readable
* Strong emotional impact
* Maximum 2 lines on desktop

---

# Supporting Text

Use the following description:

```text
Upload a photo of your room and let AI redesign it in seconds. Explore furniture, colors, and styling recommendations before spending a single dollar.
```

Requirements:

* Easy to understand
* Benefit-focused
* No technical jargon

---

# Primary CTA

Button Text:

```text
Start Designing
```

Purpose:

Direct users to create their first room design.

---

# Secondary CTA

Button Text:

```text
View Examples
```

Purpose:

Allow users to explore generated room transformations.

---

# Trust Statement

Display below CTA buttons.

Example:

```text
Transform any bedroom, workspace, or living room in minutes.
```

Small typography.

Subtle appearance.

---

# Content Position

Desktop:

Bottom-left area of hero.

Example:

```text
+------------------------------------------------+
|                                                |
|                                                |
|                                                |
|                                                |
|                                                |
|                                                |
|                                                |
|                                                |
|  See Your Dream Room                           |
|  Before You Build It.                          |
|                                                |
|  Upload a photo of your room and let AI        |
|  redesign it in seconds.                       |
|                                                |
|  [ Start Designing ] [ View Examples ]         |
|                                                |
|  Transform any room in minutes                 |
|                                                |
+------------------------------------------------+
```

---

# Mobile Layout

Stack content vertically.

Example:

```text
Headline

Description

Start Designing

View Examples
```

Content should remain readable above the room image.

---

# Visual Guidelines

The room image is the hero.

The text supports the image.

Avoid:

❌ Huge blocks of text

❌ Marketing buzzwords

❌ Generic AI terminology

❌ Overly technical language

❌ Excessive animations

Focus on:

✅ Transformation

✅ Visualization

✅ Inspiration

✅ Simplicity

---

# Typography

Headline:

* Bold
* Premium
* Clean
* Large

Description:

* Comfortable reading width
* Maximum width 600px

CTA:

* Easy to identify
* High contrast

---

# Gradient Overlay

Purpose:

Improve text readability.

The room image must remain visible.

Do not darken the image excessively.

---

# Accessibility

Requirements:

* Proper heading hierarchy
* Accessible button labels
* Readable contrast ratios
* Responsive typography

---

# Acceptance Criteria

✓ BeforeAfterSlider remains the primary visual

✓ Headline clearly explains value proposition

✓ Description communicates benefits

✓ Primary CTA visible immediately

✓ Secondary CTA visible

✓ Content readable on all screen sizes

✓ Premium and modern appearance

✓ User understands product purpose within 5 seconds

✓ Responsive on mobile, tablet, and desktop

---

# Definition Of Done

A first-time visitor lands on the homepage and immediately understands:

1. They can upload a room photo.
2. AI will redesign the room.
3. They will receive actionable recommendations.
4. They can visualize changes before spending money.

The hero section should create enough curiosity and confidence that users want to start their first design.
