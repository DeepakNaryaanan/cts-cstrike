# User Story: Adversary CTA

**Block name:** cs-adversary-cta
**Priority:** P2 — conversion CTA section; below fold

---

## User Story

As a **homepage visitor who is evaluating CrowdStrike**, I want to encounter a compelling full-width call-to-action that directs me to explore the threat intelligence universe so that I understand the specific adversaries targeting my organisation.

As a **marketing author**, I want to author the headline, body text, and CTA link in a document table so that the message can be updated independently of any other page section.

---

## Acceptance Criteria

### Markup
- The block renders as a `<section>` with a dark background.
- Content is centred (or left-aligned on desktop — open question based on source layout).
- Contains: an `<h2>` headline, a `<p>` body paragraph, and one primary CTA link rendered as a `<a class="button primary">`.
- The block has no images, no icons, and no secondary CTA by default.
- An optional eyebrow text row is supported above the headline.

### Styling
- Full viewport width; generous vertical padding (80–120px desktop, 48–64px mobile).
- Background: very dark navy or near-black (e.g., `#0D1117` or `#111827`) — confirm exact value with styleforge.
- Headline: white, large display (32–48px desktop, 28–36px mobile), bold.
- Body text: white at 85% opacity, 16–18px, max-width ~640px to maintain line length.
- CTA button: filled CrowdStrike red `#EC0000`, white text, pill or rounded-corner shape.
- CTA hover: slightly darker red (e.g., `#C00000`) with smooth transition.
- Content horizontally centred within the section.

### Behaviour
- Purely static; no interactive states beyond CTA button hover/focus.
- CTA link navigates to the Adversary Universe page (URL authored as a link in the block table).
- No auto-behaviour, timers, or animation beyond CSS hover transitions.

### Accessibility (WCAG 2.1/2.2 AA)
- Colour contrast: white text on near-black background exceeds 4.5:1 by a wide margin — passes.
- White text on red CTA button: ~4.6:1 — passes at normal text size if CTA is 16px bold or larger.
- CTA button has a descriptive accessible name; not just "Explore" but "Explore Adversary Universe".
- Section heading (`<h2>`) is present; section does not use `role="region"` without it.
- Focus ring clearly visible on CTA button against dark background.

### Performance
- No images, no JS required; this block may be implemented as a CSS-only block with no `.js` file.
- Minimal markup; the entire block may be served in a single first-paint paint.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-adversary-cta` | Dark background, centred headline + body + single CTA button |
| `split` | `cs-adversary-cta split` | Left column: headline + body; right column: CTA button (desktop only) |
| `light` | `cs-adversary-cta light` | White background with dark text; red CTA button unchanged |
| `with-eyebrow` | `cs-adversary-cta with-eyebrow` | Adds a small eyebrow/label line above the headline |

---

## Content Fields

### Per block (single table)
1. Eyebrow / label text (optional)
2. Headline (required)
3. Body text (required)
4. CTA link text + URL (required)
5. Secondary CTA link (optional)

---

## Open Questions

1. Is the content centred or left-aligned on desktop? The source page appears centred, but this should be confirmed with design.
2. Is there a background image or texture behind the dark section, or is it a solid colour?
3. Is a secondary CTA ("Learn more" ghost button) ever needed alongside the primary, or is single-CTA always the pattern?
4. Should the `split` variant be implemented now or deferred to a later sprint?
