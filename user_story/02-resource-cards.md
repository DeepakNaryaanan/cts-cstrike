# User Story: Resource Cards

**Block name:** cs-resource-cards
**Priority:** P1 — above-the-fold on desktop; lazy-loaded on mobile

---

## User Story

As a **homepage visitor**, I want to see a horizontal row of recent articles and resources so that I can quickly navigate to content relevant to my interests without scrolling deep into the page.

As a **marketing author**, I want to add, remove, or reorder resource cards in a document table so that the latest content is always surfaced without developer involvement.

---

## Acceptance Criteria

### Markup
- The block renders as a `<ul>` with each card as an `<li>`.
- Each card contains: a category/type tag (`<span class="cs-resource-cards-tag">`), a headline link (`<a>`), and optionally a short description and/or thumbnail image.
- The tag label is wrapped in an element that is visually styled as a pill badge.
- The headline is wrapped in an `<h3>` (or `<h2>` if the block is the first heading on the page — confirm with page structure).
- If a thumbnail is present it appears above the tag and headline.
- The entire card surface is clickable and navigates to the linked URL; the `<a>` inside the headline is the primary interactive element.

### Styling
- Desktop (900px+): 3 equal-width columns in a CSS Grid layout; single column on mobile; 2 columns at 600px breakpoint.
- Card: white background, subtle border or drop shadow, rounded corners (4–8px inferred).
- Tag pill: coloured background (category-specific — open question on colour mapping), white or dark text.
- Headline: dark body text, bold, 18–20px.
- Hover state: card slightly elevated (box-shadow increase) or border colour change.
- No horizontal scroll at any breakpoint; cards stack vertically on mobile.

### Behaviour
- Cards are static links; no JavaScript carousel or filter interaction on the homepage strip.
- If the block exceeds 3 cards, additional cards are hidden on mobile (show first 1 or 2) with a "View all" affordance — open question: confirm whether overflow behaviour is needed.
- Images lazy-load (`loading="lazy"`).

### Accessibility (WCAG 2.1/2.2 AA)
- Each card `<li>` is a landmark-free list item; the `<ul>` has `aria-label="Resources"` or is introduced by a visible heading.
- All text meets 4.5:1 contrast ratio on white card background.
- Tag pill colour combinations must individually pass contrast checks — open question (see below).
- Focus moves to the headline `<a>` when the card receives keyboard focus; no invisible focus targets.
- Alt text required for all thumbnail images; empty alt (`alt=""`) for purely decorative images.

### Performance
- Images optimised via `createOptimizedPicture` (AEM utility) with `width: 750` for card thumbnails.
- No more than 3 images requested on page load; all `loading="lazy"`.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-resource-cards` | 3-column horizontal strip; tag + headline (+ optional image) |
| `featured` | `cs-resource-cards featured` | First card is visually larger / full-width top row; remaining cards in a 2-column lower row |
| `no-image` | `cs-resource-cards no-image` | Text-only cards; no thumbnail images |

---

## Card Content Fields (per row)

1. Card image / thumbnail (optional)
2. Tag / category label (required)
3. Headline text + link URL (required)
4. Short description / teaser text (optional)

---

## Open Questions

1. What are the tag/category pill colours per category type? (e.g., "Frontier AI Readiness" → what colour?) Confirm with styleforge.
2. Should the block support a section heading above the cards (e.g., "Latest Resources") or is it always headingless?
3. On mobile, should all 3 cards be visible (stacked vertically) or should overflow cards be hidden?
4. Is the `featured` variant required on the homepage, or only on resource hub pages?
