# User Story: Hero Carousel

**Block name:** cs-hero
**Priority:** P0 — LCP element; must load in eager phase

---

## User Story

As a **homepage visitor**, I want to see a rotating full-width hero section with multiple branded panels so that I can quickly understand CrowdStrike's key messages and navigate to relevant content.

As a **marketing author**, I want to manage multiple hero panels independently in a document table so that I can update messaging without developer involvement.

---

## Acceptance Criteria

### Markup
- The block renders as a `<section>` containing an ordered list of panels (`<ul role="list">`).
- Each panel (`<li>`) contains, in authored order: eyebrow text, headline, body text, and one or more CTA links.
- The active panel is indicated with `aria-hidden="false"` on its `<li>`; inactive panels have `aria-hidden="true"`.
- Navigation dots (one per panel) are rendered as `<button>` elements with `aria-label="Go to panel N"` and `aria-pressed` toggled to reflect the active state.
- Previous / Next arrow controls are `<button>` elements with `aria-label="Previous panel"` / `aria-label="Next panel"`.
- The block element has `aria-roledescription="carousel"` and `aria-label="Hero"`.
- Each `<li>` has `role="group"` and `aria-roledescription="slide"`.

### Styling
- Full viewport width (`100vw`); minimum height 560px on mobile, 640px on tablet (900px+), 720px on desktop (1200px+).
- Background is a CSS gradient from CrowdStrike red `#EC0000` to dark blue `#1F60A2` (diagonal, top-left to bottom-right). Each panel may override gradient stop colours via CSS custom properties.
- Eyebrow text: small caps or uppercase, white, lighter weight.
- Headline: large display text (≥36px mobile, ≥52px desktop), white, bold.
- Body text: medium size (16–18px), white at 85% opacity or `rgba(255,255,255,0.85)`.
- Primary CTA: white pill button with dark text on hover; secondary CTA: ghost/outline style.
- Navigation dots positioned bottom-centre; arrows positioned mid-panel left/right edges.
- Panel content is horizontally centred on mobile, left-aligned on desktop (1200px+).
- Panel transition: crossfade (opacity) over 400ms; no layout shift during transition.

### Behaviour
- Auto-rotation: panels advance every 6 seconds when the page is visible (`document.visibilityState === 'visible'`).
- Auto-rotation pauses when the user hovers over the carousel or when keyboard focus is within the carousel.
- Auto-rotation resumes when hover/focus leaves.
- Clicking a navigation dot jumps directly to that panel; clicking an arrow moves ±1 panel with wrap-around.
- Swipe left/right (touch events) advances or retreats one panel.
- Keyboard: `ArrowLeft` / `ArrowRight` cycle panels when focus is inside the carousel.
- When auto-rotation is paused a "Pause / Play" toggle button becomes visible (WCAG 2.1 SC 2.2.2).

### Accessibility (WCAG 2.1/2.2 AA)
- All interactive controls are keyboard operable and have visible focus indicators.
- `prefers-reduced-motion`: when set, disable auto-rotation and crossfade transition entirely; panels remain static.
- Navigation controls meet 44×44px minimum touch target.
- Colour contrast for all text on the gradient background must meet 4.5:1 (white on `#EC0000` passes; white on `#1F60A2` passes).
- Pause/play control is always visible (not hidden unless motion is reduced to zero).

### Performance
- The first panel image (if any) must be loaded eagerly (`loading="eager"`, `fetchpriority="high"`) as it is the LCP candidate.
- Subsequent panel images load lazily.
- No third-party carousel library; vanilla JS only.
- Animation via CSS `transition` / `opacity`; no JS animation loops.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-hero` | Rotating multi-panel carousel with gradient background, dots, and arrows |
| `static` | `cs-hero static` | Single panel, no rotation controls, no dots — used for inner pages |
| `dark` | `cs-hero dark` | Same structure, dark background override (`#0D1117` or brand dark navy) instead of red gradient |
| `image` | `cs-hero image` | Panel includes a hero image or illustration on the right column (split layout on desktop) |

---

## Panel Content Fields (per panel row)

1. Eyebrow / label text (optional)
2. Headline (required)
3. Body / subheadline (optional)
4. CTA links — one primary, one optional secondary (at least one required)
5. Background image or gradient config (optional)

---

## Open Questions

1. Are the gradient stop colours per-panel, or is a single brand gradient used for all panels? The source page appears to share one gradient but this should be confirmed with design.
2. Does the `image` variant place an authored image to the right, or is it a full-bleed background image behind the content column?
3. What is the exact auto-advance interval — 6 seconds is inferred from typical CrowdStrike behaviour; confirm.
4. Should panels be authored as separate rows in a single block table (one row per panel), or as separate block instances stacked inside a section?
