# User Story: Alert Banner

**Block name:** alert-banner (auto-block / default content)
**Priority:** P0 — appears above all page content; impacts LCP section

---

## User Story

As a **marketing author**, I want to display a dismissible promotional banner at the top of the page so that visitors are immediately aware of a time-sensitive announcement such as an analyst award, event, or product launch.

---

## Acceptance Criteria

### Markup
- The banner is rendered as a `<div role="alert" aria-live="polite">` wrapping a single paragraph of inline content.
- The paragraph contains a text phrase followed by a hyperlink acting as the CTA.
- A dismiss button (`<button aria-label="Dismiss announcement">`) is injected by JavaScript and appended to the banner element.
- The banner is the first child of `<main>` and sits above the hero section.
- Dismissed state is persisted to `sessionStorage` under the key `alert-banner-dismissed`; on re-visit within the same session the banner does not render.

### Styling
- Full-viewport-width bar; height auto (single line of text on desktop, wraps gracefully on mobile).
- Background: CrowdStrike red `#EC0000`; foreground text: white `#FFFFFF`.
- CTA link appears inline, underlined, white.
- Dismiss button is visually rendered as an "×" glyph, right-aligned, no background, white colour.
- Mobile-first: text and CTA stack naturally; dismiss button stays top-right via `position: absolute` or flex alignment.

### Behaviour
- Clicking the dismiss button hides the banner immediately (CSS `display: none` or remove from DOM).
- Dismissed state is stored in `sessionStorage` so the banner does not reappear during the same browsing session.
- If no dismiss action is recorded, the banner is always visible on page load.

### Accessibility (WCAG 2.1/2.2 AA)
- `role="alert"` ensures screen readers announce the content on page load.
- Dismiss button has a visible focus ring and a descriptive `aria-label`.
- Colour contrast ratio of white text on `#EC0000` must meet 4.5:1 (check: ~4.6:1 — passes AA).
- Banner does not auto-dismiss; it waits for explicit user action.

### Performance
- Handled as auto-block or default content in the eager phase; no additional JS module load required beyond a small inline decoration in `scripts.js`.
- No images; text-only content.

---

## Variant Inventory

| Variant | Description |
|---|---|
| `default` | Red bar with text + inline CTA link + dismiss button |
| `dark` | Dark navy background (`#1F60A2`) for use on light-background pages (open question — see below) |

---

## Open Questions

1. Should the dismissed state persist across page navigations (`sessionStorage`) or across browser sessions (`localStorage`)? The reference site uses session-scoped dismissal — confirm with product team.
2. Is a `dark` variant required, or is red-only sufficient for the homepage?
3. Should the banner support an optional icon/logo prefix (e.g., Gartner logo) to the left of the text?
