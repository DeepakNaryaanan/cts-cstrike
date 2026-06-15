# User Story: Product Showcase

**Block name:** cs-product-showcase
**Priority:** P1 — key product navigation section; below fold

---

## User Story

As a **homepage visitor**, I want to explore CrowdStrike's key product areas through an interactive tabbed interface so that I can quickly navigate to the specific solution relevant to my security challenge.

As a **marketing author**, I want to manage product tab labels, descriptions, and CTAs in a document table so that the product showcase stays current without developer work.

---

## Acceptance Criteria

### Markup
- The block renders as a `<section>` with an optional section heading (`<h2>`).
- A tab group (`<div role="tablist" aria-label="Product areas">`) contains one `<button role="tab">` per product area.
- Each tab panel (`<div role="tabpanel">`) contains: a product name/headline, a short description, an optional product screenshot or illustration image, and a CTA link.
- The active tab and its panel follow the WAI-ARIA tab pattern (see ARIA spec).
- Product screenshots/illustrations are right-column content on desktop; stacked below text on mobile.

### Styling
- Section background: dark (navy or near-black) to contrast with surrounding sections — confirm with styleforge.
- Tab strip: horizontal row of pill or underline tabs; active tab highlighted with white fill or underline in CrowdStrike red.
- Tab labels: white or light text; active tab: white bold.
- Panel content: left column (text) + right column (image) on desktop (50/50 or 40/60 split).
- Mobile: tabs stack or become a horizontal scroll strip; image appears below text.
- Product headline inside panel: large (24–32px), white, bold.
- Description: 16px, white at 85% opacity.
- CTA: white outlined button or text link with arrow.
- Panel transition: crossfade, 250ms, or instantaneous if `prefers-reduced-motion`.
- Tab underline/indicator animates horizontally between tabs on desktop.

### Behaviour
- Clicking a tab activates that tab's panel; previous panel is hidden.
- Keyboard: `ArrowLeft`/`ArrowRight` cycle tabs; `Enter`/`Space` activates; `Tab` moves to panel content.
- No auto-rotation — panels advance only on explicit user action.
- On mobile, if the tab strip overflows, it is horizontally scrollable with scroll snap.
- Images lazy-load by default (panels are below fold).

### Accessibility (WCAG 2.1/2.2 AA)
- Full WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`.
- Inactive panels have `hidden` attribute (not just CSS display:none) to prevent screen reader access.
- Tab strip has a visible label via `aria-label` on the `tablist` element.
- All CTA links have unique accessible names (not just "Learn more" repeated 4 times).
- Image `alt` text accurately describes the product UI screenshot.
- Contrast: white text on dark navy — passes 4.5:1 easily.

### Performance
- Only the active panel image is loaded eagerly (or lazily if below fold); other panel images load on tab activation.
- No third-party tab library; vanilla JS.
- Panel image swap on tab activation: set `src` dynamically or use `hidden`/`display` toggle with already-loaded images.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-product-showcase` | Dark background, horizontal tab strip, text + image panel layout |
| `light` | `cs-product-showcase light` | Same structure on white/light background |
| `vertical-tabs` | `cs-product-showcase vertical-tabs` | Tab strip on the left (vertical), panel content on the right; desktop only |
| `icon-tabs` | `cs-product-showcase icon-tabs` | Tabs include an icon above the label in addition to text |

---

## Content Fields

### Block-level (row 1)
1. Section heading (optional)

### Per tab/panel (one row per product)
1. Tab label (required)
2. Product headline (required)
3. Product description (required)
4. Product illustration / screenshot image (optional)
5. CTA link text + URL (required)

---

## Open Questions

1. On mobile, should tabs become a horizontal scrolling strip, a dropdown selector, or an accordion pattern?
2. Are product images authored as uploads to the DAM, or linked from an external CDN? This affects how `createOptimizedPicture` is applied.
3. Should the block support more than 4 tabs, and if so, what happens to the tab strip layout?
4. Is the "icon-tabs" variant required on the homepage, or only on product landing pages?
5. Confirm whether the section background is dark navy `#1F60A2` or a deeper near-black shade.
