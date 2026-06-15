# User Story: Analyst Recognition

**Block name:** cs-analyst-recognition
**Priority:** P1 — trust/credibility section; below fold

---

## User Story

As a **homepage visitor**, I want to see CrowdStrike's recognition from trusted industry analysts so that I can validate the company's market leadership before evaluating their products.

As a **marketing author**, I want to add, update, or remove analyst recognition cards in a document table so that the section stays current without development work.

---

## Acceptance Criteria

### Markup
- The block renders with an optional section heading (`<h2>`) followed by a scrollable or grid list of recognition cards.
- Each card (`<li>`) contains: an analyst logo image, a recognition headline (`<h3>`), an optional short descriptor, and a CTA link.
- The section heading ("Recognition by trusted analysts") is part of the block's first row or is authored as default section content directly above the block.
- CTA links are styled as text links or ghost/outline buttons (not primary filled buttons).

### Styling
- Desktop (900px+): horizontal row of cards (3 per row minimum); CSS Grid or Flexbox with `gap`.
- Tablet (600px+): 2 columns.
- Mobile: single-column stack or horizontal scroll with `overflow-x: auto` and snap scrolling.
- Card: white background, thin border, subtle radius.
- Analyst logo image: fixed height (e.g., 48px), `object-fit: contain`, left-aligned within card.
- Headline: 16–18px, bold, dark body colour.
- CTA link: `#EC0000` (CrowdStrike red) text link with right-arrow icon — confirm with styleforge.
- Optional horizontal scroll on mobile with visible scroll affordance (partial card peek).

### Behaviour
- Desktop: static grid — no carousel, no scroll.
- Mobile: if using scroll variant, implement CSS `scroll-snap-type: x mandatory` on the container and `scroll-snap-align: start` on each card.
- No auto-rotation.

### Accessibility (WCAG 2.1/2.2 AA)
- Analyst logo images must have descriptive `alt` text (e.g., "Gartner Magic Quadrant logo").
- If horizontal scroll is used on mobile, the scroll container must be keyboard-scrollable via `tabindex="0"` or individual card focus.
- All interactive elements (CTA links) have visible focus rings.
- Colour contrast: dark text on white card — passes. Red CTA link on white — confirm ratio (red `#EC0000` on white is ~3.7:1, which fails 4.5:1 for normal text — open question).

### Performance
- Analyst logo images loaded lazily; optimised via `createOptimizedPicture` with width 200 for logos.
- No JS required for desktop static layout; small JS only if mobile scroll snap enhancement is needed.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-analyst-recognition` | Grid of analyst cards with logo, headline, and CTA |
| `carousel` | `cs-analyst-recognition carousel` | Horizontal scrolling carousel with nav controls; used when 4+ cards are authored |
| `compact` | `cs-analyst-recognition compact` | Smaller card height with logo only + brief label; used for longer recognition lists |

---

## Card Content Fields (per row)

1. Analyst logo image (required)
2. Recognition headline (required)
3. Short descriptor / subtext (optional)
4. CTA link text + URL (required)

### Block-level (row 1)
1. Section heading text (optional — may be default section content)

---

## Open Questions

1. The CrowdStrike red `#EC0000` as a text link on white yields ~3.7:1 contrast, which fails WCAG AA for normal-sized text (<18pt). Should the CTA links use a darker red or dark navy instead, or be larger/bold enough to qualify as "large text" (18px bold = 14pt bold threshold)? Escalate to styleforge.
2. On mobile, is horizontal scroll (card peek) preferred, or do cards simply stack vertically?
3. Is the section heading authored inside the block's first row or as default section content above the block?
4. Are analyst logos committed to git (`icons/` or `images/`) or uploaded by authors to the DAM?
