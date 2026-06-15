# User Story: Feature Pillars

**Block name:** cs-feature-pillars
**Priority:** P1 — primary product value-prop section; below fold on mobile

---

## User Story

As a **homepage visitor**, I want to see a section that explains the three critical fronts CrowdStrike addresses so that I understand the platform's breadth at a glance and can decide whether to explore further.

As a **marketing author**, I want to author the intro text and each pillar card separately in a document table so that I can update copy or reorder pillars without touching code.

---

## Acceptance Criteria

### Markup
- The block renders as a `<section>` containing:
  - An intro row with a `<h2>` section heading and optional supporting paragraph.
  - A `<ul>` of pillar cards (`<li>`) arranged in columns.
- Each pillar card `<li>` contains: an icon or illustration (`<img>` or inline SVG), a card headline (`<h3>`), and body text (`<p>`).
- Icons/illustrations are decorative and carry `aria-hidden="true"` if inline SVG or `alt=""` if `<img>`.
- If the icon is meaningful (communicates unique information), it requires descriptive `alt` text.

### Styling
- Mobile: single-column stack.
- Tablet (600px+): 2-column grid.
- Desktop (900px+): 3-column grid with equal widths.
- The intro row (`h2` + paragraph) spans full width above the card grid.
- Card background: white or very light grey; card border or subtle shadow.
- Icon area: fixed height (e.g., 64px) with object-fit: contain.
- Card headline: `h3` sizing (~22–24px desktop), bold, dark text.
- Body text: 16px, body colour (~#333 or brand dark).
- Section background: white or light brand wash — confirm with styleforge.

### Behaviour
- Static content; no interactive states beyond standard link hover.
- If any card headline is linked, it behaves as a standard `<a>` with hover underline.
- No expand/collapse or accordion behaviour at any breakpoint.

### Accessibility (WCAG 2.1/2.2 AA)
- Heading hierarchy: section `<h2>` → card `<h3>`. Do not skip levels.
- All body text meets 4.5:1 contrast on white card background.
- Icons described by adjacent text; no standalone icon without a text label.
- Section is not labelled with `role="region"` unless it has a visible heading (it does — `<h2>`).

### Performance
- Icon images lazy-loaded unless this block appears in the first viewport on desktop.
- Icon files should be SVG (committed to `icons/` folder) to avoid raster image weight.
- No JavaScript required for the default static variant.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-feature-pillars` | Intro row + 3-column icon/headline/body cards on white background |
| `dark` | `cs-feature-pillars dark` | Same layout on dark background (navy `#1F60A2` or near-black); white text |
| `2-col` | `cs-feature-pillars 2-col` | 2 cards per row maximum; used when fewer than 3 pillars are authored |
| `no-icon` | `cs-feature-pillars no-icon` | Cards without icon/illustration; text-only variant |

---

## Content Fields

### Block-level (row 1 of the table)
1. Section heading (`<h2>`) (required)
2. Supporting intro paragraph (optional)

### Per pillar card (one row per card)
1. Icon / illustration image or SVG reference (optional)
2. Card headline (required)
3. Card body text (required)
4. Card CTA link (optional)

---

## Open Questions

1. Are the pillar icons authored as images uploaded to the DAM, or referenced as named icons from the `icons/` folder using EDS icon syntax (`icon-name`)?
2. Is a CTA link per card required, or are the cards purely informational on the homepage?
3. Does the "The Future of Security Starts Here" intro text in the source belong inside the block, or is it default section content above the block?
4. Should this block be reusable for any 3-feature summary (generic), or is it CrowdStrike-specific in naming?
