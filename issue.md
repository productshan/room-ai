# ISSUE-005 - Build Premium Room.ai Hero Section

## Priority

High

## Type

UI / UX Feature

---

# Objective

Create a premium landing page hero section for Room.ai.

The hero section should immediately communicate:

* AI Interior Design
* Room Transformation
* Before & After Visualization
* Practical Recommendations

The hero should feel modern, elegant, minimal, and premium.

The design should prioritize clarity and visual impact.

---

# Important

Global design tokens already exist.

DO NOT create new colors.

DO NOT override theme variables.

Use existing CSS variables:

```css
:root {
  --font-display: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-primary: #e8dccb;
  --color-secondary: #f5f1ea;
  --color-accent: #2f2f2f;
  --color-background: #fafaf8;
  --border: #e5e5e5;
}
```

---

# Design Direction

The hero should feel like a combination of:

* Apple
* Airbnb
* Linear
* Interior Design Magazine

Keywords:

* Elegant
* Spacious
* Warm
* Minimal
* Premium
* Editorial

Avoid:

❌ Startup gradients

❌ Neon colors

❌ Glassmorphism

❌ Overly futuristic design

❌ Dark mode hero

❌ Tech-looking interfaces

The hero should feel closer to interior design than software.

---

# Hero Structure

The existing BeforeAfterSlider should be used as the visual centerpiece.

Structure:

```text
HeroSection

├── BeforeAfterSlider
├── Gradient Overlay
└── Hero Content
```

The room transformation must be the first thing users notice.

---

# Layout

Hero Height:

```css
min-height: 100vh;
```

Content Alignment:

```text
Desktop:
Bottom Left

Mobile:
Bottom Center
```

The image should dominate the screen.

The content should support the image.

---

# Hero Content

## Eyebrow Label

Small text above headline.

Example:

```text
AI-Powered Interior Design
```

Style:

* Uppercase
* Letter spacing
* Small font size

Use:

```css
font-family: var(--font-mono);
```

---

# Headline

Use:

```text
See Your Dream Room Before You Build It.
```

Requirements:

* Large
* Elegant
* Emotional
* Premium

Use:

```css
font-family: var(--font-display);
```

Suggested size:

```css
clamp(3rem, 6vw, 6rem)
```

Maximum width:

```css
700px
```

---

# Description

Use:

```text
Upload a photo of your room and let AI redesign it in seconds. Discover furniture, colors, and styling recommendations before making a single purchase.
```

Requirements:

* Easy to read
* Benefit-focused
* Maximum width 600px

Use:

```css
font-family: var(--font-body);
```

---

# CTA Buttons

Display two buttons.

Primary:

```text
Start Designing
```

Secondary:

```text
View Examples
```

Layout:

```text
[ Start Designing ] [ View Examples ]
```

Desktop:

Horizontal

Mobile:

Vertical

---

# Trust Statement

Display below buttons.

Example:

```text
Bedroom • Workspace • Living Room
```

Purpose:

Quickly communicate supported room types.

Style:

Small

Subtle

Muted color

---

# BeforeAfterSlider

Requirements:

* Full-width
* Responsive
* High visual priority
* Existing component must be reused

Do not rebuild slider functionality.

The slider should remain the centerpiece of the hero.

---

# Gradient Overlay

Purpose:

Improve readability.

Requirements:

* Subtle
* Elegant
* Not too dark

Example:

```css
background:
linear-gradient(
  to top,
  rgba(0,0,0,.65),
  rgba(0,0,0,.25),
  transparent
);
```

The room image must remain clearly visible.

---

# Typography Rules

Headline:

```css
font-family: var(--font-display);
font-weight: 600;
```

Description:

```css
font-family: var(--font-body);
```

Eyebrow:

```css
font-family: var(--font-mono);
```

---

# Color Usage

Background:

```css
var(--color-background)
```

Primary Accent:

```css
var(--color-primary)
```

Text:

```css
var(--color-accent)
```

Borders:

```css
var(--border)
```

Do not introduce additional colors.

---

# Responsive Requirements

Desktop

≥ 1024px

Large editorial layout.

---

Tablet

768px - 1024px

Reduce spacing.

Maintain hierarchy.

---

Mobile

< 768px

Content stacks naturally.

Maintain readability.

No horizontal scrolling.

---

# Accessibility

Requirements:

✓ Proper H1 usage

✓ Accessible buttons

✓ Alt text for images

✓ Sufficient contrast

✓ Keyboard navigation support

---

# Acceptance Criteria

✓ Uses existing BeforeAfterSlider

✓ Uses existing design tokens

✓ Fraunces used for headline

✓ Inter used for body text

✓ JetBrains Mono used for eyebrow label

✓ Full viewport hero

✓ Premium editorial appearance

✓ Clear value proposition

✓ Responsive on all screen sizes

✓ Room transformation remains visual focus

✓ CTA visible without scrolling

---

# Definition Of Done

A user should immediately understand:

* This product redesigns rooms using AI.
* The transformation can be previewed before spending money.
* The process is simple.
* The product feels premium and trustworthy.

The hero should feel more like a modern interior design brand than a traditional SaaS application.
