# User Story: Customer Testimonials

**Block name:** cs-testimonials
**Priority:** P2 — social proof section; below fold

---

## User Story

As a **prospective customer**, I want to read quotes from real CrowdStrike customers so that I feel confident the product delivers results for organisations like mine.

As a **marketing author**, I want to author customer quotes, attributions, and story links in a document table so that new testimonials can be added without developer involvement.

---

## Acceptance Criteria

### Markup
- The block renders as a `<section>` with a section heading (`<h2>`) and a carousel of quote cards.
- Each card (`<li>`) contains: a blockquote (`<blockquote>`), attribution (`<cite>` with name, title, and company), an optional company logo (`<img>`), and two CTA links ("Hear their story" and "View all customer stories").
- The outer carousel container has `aria-roledescription="carousel"` and `aria-label="Customer testimonials"`.
- Each slide `<li>` has `role="group"` and `aria-roledescription="slide"` and `aria-label="Slide N of M"`.
- Navigation dots are `<button>` elements with `aria-label="Go to testimonial N"` and `aria-pressed` state.
- Previous / Next buttons have descriptive `aria-label` values.

### Styling
- Full-width section; dark background (navy `#1F60A2` or near-black) — confirm with styleforge.
- White text throughout: headline, quote, attribution.
- Section heading: centred, large (28–36px on mobile, 40–48px desktop), bold.
- Quote text (`<blockquote>`): large italic or regular, 18–22px, white.
- Opening quotation mark: large decorative element (CSS pseudo or SVG icon), CrowdStrike red `#EC0000`.
- Attribution `<cite>`: smaller (14–16px), lighter weight, name bold + role/company regular.
- Company logo (if present): small, white or light version of the logo, below attribution.
- CTA "Hear their story": outlined white button or text link with arrow.
- CTA "View all customer stories": secondary text link.
- Navigation dots: white unfilled / white filled for active; positioned below quote card.
- Transition: crossfade or slide, 350ms.

### Behaviour
- Auto-rotation: advances every 7 seconds; pauses on hover and keyboard focus.
- User can navigate manually via dots or arrow buttons.
- Swipe left/right (touch) changes slide.
- `prefers-reduced-motion`: disable auto-rotation and transitions; show static first card.
- "View all customer stories" link is persistent (visible regardless of active slide) — open question.

### Accessibility (WCAG 2.1/2.2 AA)
- Same carousel ARIA pattern as `cs-hero`: roledescription, live region, pause control.
- `<blockquote>` is the correct semantic element for customer quotes.
- `<cite>` inside or adjacent to `<blockquote>` for attribution.
- Decorative quotation mark glyph: `aria-hidden="true"`.
- All white text on dark background must meet 4.5:1 (white on navy ~10:1 — passes easily).
- "Hear their story" and "View all customer stories" CTAs must have unique accessible names if both appear on every slide (use `aria-label` that includes the customer name).

### Performance
- Company logos lazy-loaded; optimised at width 200.
- No third-party carousel; vanilla JS.
- Auto-rotation timer uses `requestIdleCallback` or `setTimeout`; not `setInterval` — to align with browser visibility API.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-testimonials` | Dark-background carousel with auto-rotation, dots, quote + attribution |
| `light` | `cs-testimonials light` | Same structure on white/light background; dark text |
| `static` | `cs-testimonials static` | All testimonials visible simultaneously in a grid (no carousel); used on dedicated customer stories pages |
| `logo-only` | `cs-testimonials logo-only` | Shows only company logos in a horizontal strip (no quotes); used as a "trusted by" section |

---

## Card Content Fields (per row)

1. Quote text (required)
2. Attribution: name + title + company (required)
3. Company logo image (optional)
4. "Hear their story" CTA link (optional)
5. "View all customer stories" link — typically shared across all cards; may be block-level

### Block-level (row 1)
1. Section heading (required)
2. "View all customer stories" link (optional — if shared)

---

## Open Questions

1. Is the "View all customer stories" link shown once below the carousel (block-level), or repeated inside each slide card?
2. Are company logos the light/white reversed version, or full-colour? This impacts how they are stored and referenced.
3. Should this block use the EDS `fragment` pattern to pull testimonials from a separate authored list page, or are all quotes authored inline in the block table?
4. Is a "logo-only" variant needed on the homepage, or only on interior pages?
