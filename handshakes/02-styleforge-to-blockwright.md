# Handshake 02 — Styleforge to Blockwright

**Date:** 2026-06-15
**Author:** styleforge agent
**Status:** Ready for blockwright

---

## 1. Token-Mapping Table

Every visible style from the CrowdStrike source analysis has been resolved to either an existing EDS token (overridden in `styles/config/overrides.css`) or a new brand-scoped custom property. No hex or rgb literals should appear in block CSS — they must reference a token below.

### 1a. Colour mapping

| Design value | px / usage | Semantic token | Source file |
|---|---|---|---|
| `#ec0000` primary red | CTAs, active states | `--cs-color-brand-primary` | overrides.css §2 |
| `#c00000` red dark | Hover bg | `--cs-color-brand-primary-dark` | overrides.css §2 |
| `#8b0000` red deepest | Active / pressed | `--cs-palette-red-900` | overrides.css §1 |
| `#1f60a2` brand blue | Gradient end, secondary brand | `--cs-color-brand-secondary` | overrides.css §2 |
| `#174880` blue dark | Hover states | `--cs-color-brand-secondary-dark` | overrides.css §2 |
| `#0024ff` electric blue | Dark hero gradient end, focus ring | `--cs-color-brand-electric` | overrides.css §2 |
| `#000000` black | Dark section backgrounds | `--cs-color-surface-dark` | overrides.css §2 |
| `#ffffff` white | Text on dark, card bg | `--cs-palette-white` | overrides.css §1 |
| `#f8f8f8` light gray | Alt section backgrounds | `--light-color` (EDS, re-confirmed) | styles.css |
| `#949494` medium gray | Secondary text | `--cs-color-text-secondary` | overrides.css §2 |
| `#707070` dark gray | Tertiary text | `--cs-color-text-tertiary` | overrides.css §2 |
| `rgba(57,57,57,0.65)` | Hero image overlay | `--cs-color-surface-overlay` | overrides.css §2 |
| `#131313` near-black | Primary body text | `--text-color` (EDS) | overrides.css §2 |
| `#d4d4d4` border gray | Dividers, card borders | `--cs-color-border` | overrides.css §2 |
| `#333` dark neutral | Secondary headings on light | `--cs-palette-gray-700` | overrides.css §1 |

### 1b. EDS default overrides

| EDS token | Old value | New value | Reason |
|---|---|---|---|
| `--link-color` | `#3b63fb` | `var(--cs-color-brand-primary)` | CrowdStrike links are red |
| `--link-hover-color` | `#1d3ecf` | `var(--cs-color-brand-primary-dark)` | Hover darkens red |
| `--body-font-family` | `roboto, …` | `"titillium-web", roboto, …` | Brand font prepended |
| `--heading-font-family` | `roboto-condensed, …` | `"titillium-web", roboto-condensed, …` | Brand font prepended |
| `--heading-font-size-xxl` | `55px` / `45px` | `38px` mobile / `56px` desktop | Matches CrowdStrike H1 scale |
| `--heading-font-size-xl` | `44px` / `36px` | `30px` mobile / `44px` desktop | Section H2 scale |
| `--heading-font-size-l` | `34px` / `28px` | `22px` mobile / `28px` desktop | Card H3 scale |
| `--nav-height` | `64px` | `72px` | CrowdStrike nav is taller |

### 1c. Gradient tokens

| Token | Value | Usage |
|---|---|---|
| `--cs-gradient-hero` | `linear-gradient(135deg, #ec0000 0%, #1f60a2 100%)` | cs-hero light variant background |
| `--cs-gradient-hero-dark` | `linear-gradient(135deg, #000 0%, #0024ff 100%)` | cs-hero dark variant background |
| `--cs-gradient-dark-section` | `linear-gradient(135deg, #000 0%, #1f60a2 100%)` | cs-adversary-cta background |
| `--cs-gradient-red-sweep` | `linear-gradient(90deg, #ec0000 0%, #c00000 100%)` | Card top-border accent line |

### 1d. Typography tokens

| Element | Token(s) | Notes |
|---|---|---|
| Hero H1 | `--heading-font-family`, `--heading-font-size-xxl`, `font-weight: 700` | |
| Section H2 | `--heading-font-family`, `--heading-font-size-xl`, `font-weight: 700` | |
| Card H3 | `--heading-font-family`, `--heading-font-size-l`, `font-weight: 600` | |
| Body copy | `--body-font-family`, `--body-font-size-s` (16px desktop) | |
| Eyebrow label | `--cs-font-size-eyebrow`, `--cs-font-weight-eyebrow`, `--cs-letter-spacing-eyebrow`, `--cs-text-transform-eyebrow` | |
| Button / UI label | `--body-font-family`, `--body-font-size-xs` (14px), `--cs-font-weight-ui` (600) | |
| Secondary text | `--body-font-size-xs`, `--cs-color-text-secondary` | |

### 1e. Spacing tokens

| Token | Value | Typical usage |
|---|---|---|
| `--cs-space-xs` | 8px | Icon gaps, tight padding |
| `--cs-space-sm` | 16px | Internal card padding (mobile), grid gutter mobile |
| `--cs-space-md` | 24px | Internal card padding (desktop), grid gutter tablet |
| `--cs-space-lg` | 32px | Section vertical padding (mobile), grid gutter desktop |
| `--cs-space-xl` | 48px | Section vertical padding (tablet/desktop) |
| `--cs-space-xxl` | 64px | Hero padding, section spacers |
| `--cs-space-xxxl` | 96px | Full-bleed section top/bottom padding |

### 1f. Motion tokens

| Token | Value | Usage |
|---|---|---|
| `--cs-duration-fast` | 150ms | Button bg transitions |
| `--cs-duration-base` | 200ms | Card hover transform |
| `--cs-duration-slow` | 300ms | Section fade-in on scroll |
| `--cs-duration-carousel` | 5000ms | Carousel auto-advance |
| `--cs-transition-button` | composite | Apply to `<a class="button">` in block CSS |
| `--cs-transition-card` | composite | Apply to card hover wrapper |
| `--cs-transition-fade` | composite | Apply to carousel slide opacity |

Reduced-motion: all duration tokens resolve to `0ms` and transition tokens to `none` when `prefers-reduced-motion: reduce` is active. This is handled globally in overrides.css — block CSS requires no extra media query for motion.

---

## 2. Responsive Plan

Breakpoints (mobile-first, `min-width`):

| Label | Query | EDS project value |
|---|---|---|
| Mobile | (base) | `< 600px` |
| Tablet | `width >= 600px` | 600px |
| Desktop | `width >= 900px` | 900px |
| Wide | `width >= 1200px` | 1200px |

### cs-hero

| Breakpoint | Layout | Notes |
|---|---|---|
| Mobile | Single column, image stacked below text; gradient full-bleed; text padding `--cs-space-lg` sides | H1 `--heading-font-size-xxl` (38px); CTA buttons stacked |
| Tablet (600px) | Same single-column, increased horizontal padding `--cs-space-xl` | |
| Desktop (900px) | Two-column: text left 50%, image right 50%; gradient behind text panel only | H1 `--heading-font-size-xxl` (56px); buttons inline |
| Wide (1200px) | Max-width `--cs-grid-max-width` (1272px) centered; side padding `--cs-space-xxl` | Carousel dots/nav visible |

Dark variant: same layout, uses `--cs-gradient-hero-dark`. Carousel controls: prev/next arrows + dot indicators.

### cs-resource-cards

| Breakpoint | Layout |
|---|---|
| Mobile | 1 column, full-width cards |
| Tablet (600px) | 2-column grid, `gap: --cs-space-md` |
| Desktop (900px) | 3-column grid |
| Wide (1200px) | 4-column grid (max 4 cards visible; additional via "load more" or scroll) |

Cards: fixed card height NOT required — allow natural height within grid row. Card top border uses `--cs-gradient-red-sweep` (3px).

### cs-feature-pillars

| Breakpoint | Layout |
|---|---|
| Mobile | 1 column, icon + heading + body stacked |
| Tablet (600px) | 2 columns |
| Desktop (900px) | 3 columns equal width, gap `--cs-space-lg` |

Icon size: 48px × 48px. Icon colour: `--cs-color-brand-primary`. Section background: `--light-color`.

### cs-analyst-recognition

| Breakpoint | Layout |
|---|---|
| Mobile | Horizontal scroll (overflow-x: auto); cards ~200px min-width |
| Tablet (600px) | 3-column grid |
| Desktop (900px) | 5–6 columns (logo + rating style); centre-aligned |

Cards: white bg, `--cs-shadow-card`, border `--cs-color-border`.

### cs-pricing-table

| Breakpoint | Layout |
|---|---|
| Mobile | Tab selector at top (scrollable if >3 tabs); single column plan card below |
| Tablet (600px) | Side-by-side plan comparison: 2 columns |
| Desktop (900px) | All plans visible: 3–4 column grid |

Active tab: `--cs-color-brand-primary` underline + text. Featured plan card: `--cs-color-brand-primary` top border, slight elevation `--cs-shadow-card-hover`.

### cs-testimonials

| Breakpoint | Layout |
|---|---|
| Mobile | Single carousel slide, full-width; prev/next arrows; dot indicators |
| Tablet (600px) | Same carousel; quote text increases to `--body-font-size-m` |
| Desktop (900px) | 2–3 slides visible simultaneously (CSS scroll snap) |

Slide transition: `--cs-transition-fade`. Auto-advance: `--cs-duration-carousel`.

### cs-product-showcase

| Breakpoint | Layout |
|---|---|
| Mobile | Tab strip at top (horizontal scroll); content panel below: screenshot full-width, feature list below |
| Tablet (600px) | Same; screenshot increases |
| Desktop (900px) | Tab strip on left ~240px; content panel on right; screenshot right-panel top half, feature list bottom half |

Active tab highlight: left border 4px `--cs-color-brand-primary`, bg `--light-color`.

### cs-adversary-cta

| Breakpoint | Layout |
|---|---|
| Mobile | Full-bleed dark section; text centred; CTA buttons stacked; vertical padding `--cs-space-xxl` |
| Tablet (600px) | Buttons inline (flex-wrap) |
| Desktop (900px) | Text left + buttons right (two-column flex); max-width `--cs-grid-max-width` |

Background: `--cs-gradient-dark-section`. Text: `--cs-color-text-on-dark`. Buttons: ghost variant (`--cs-btn-ghost-*` tokens).

---

## 3. Interactive States Table

### Buttons

| Element | Default | Hover | Active | Focus-visible | Disabled |
|---|---|---|---|---|---|
| Primary CTA | bg `--cs-btn-primary-bg`, text `--cs-btn-primary-text` | bg `--cs-btn-primary-bg-hover` | bg `--cs-palette-red-900` | `3px solid --cs-color-focus` outline | bg `--cs-btn-disabled-bg`, text `--cs-btn-disabled-text`, `cursor: not-allowed` |
| Secondary CTA | bg transparent, border `--cs-btn-secondary-border`, text `--cs-btn-secondary-text` | bg `--cs-btn-secondary-bg-hover`, text `--cs-btn-secondary-text-hover` | bg `--cs-palette-red-700` + text white | `3px solid --cs-color-focus` | same disabled token set |
| Ghost CTA (dark bg) | border + text `--cs-btn-ghost-text` | bg `--cs-btn-ghost-bg-hover`, text `--cs-btn-ghost-text-hover` | bg `--cs-palette-gray-200` | `3px solid --cs-color-focus` | `--cs-btn-disabled-*` |

Contrast check (WCAG 2.1 AA):
- White text on `#ec0000`: ratio 3.7:1 — passes AA for large text (18px+) and UI components. Borderline for small body text — use weight 600+ on small labels. Flag: if button label drops below 14px at weight 400, this fails. Recommend keeping button text at `--body-font-size-xs` (14px) with `--cs-font-weight-ui` (600) minimum.
- `#ec0000` on white: ratio 3.7:1 — passes AA for UI components and large text.
- White text on `#000`: 21:1 — passes.
- `#949494` on white: ratio 2.8:1 — fails AA for body text. Flag: secondary text must not be the sole carrier of meaning. Use `--cs-color-text-tertiary` (`#707070`, ratio 4.8:1 on white) instead of `--cs-color-text-secondary` for standalone paragraphs.

### Links

| State | Token |
|---|---|
| Default | `--link-color` (`--cs-palette-red-500`) |
| Hover | `--link-hover-color` (`--cs-palette-red-700`) + `text-decoration: underline` |
| Focus-visible | `outline: 3px solid var(--cs-color-focus)`, `outline-offset: 2px` |
| Visited | No distinct visited style specified — use default (same as link-color) |

### Cards

| State | Token |
|---|---|
| Default | `box-shadow: var(--cs-shadow-card)` |
| Hover | `transform: translateY(-4px)`, `box-shadow: var(--cs-shadow-card-hover)`, transition `--cs-transition-card` |
| Focus-visible (keyboard nav on card link) | `outline: 3px solid var(--cs-color-focus)`, `outline-offset: 2px` |
| Active | `transform: translateY(-2px)` |

### Navigation items

| State | Token |
|---|---|
| Default | `--cs-color-text-primary` |
| Hover | `--cs-color-brand-primary` |
| Active / current | `--cs-color-brand-primary`, bottom-border 2px `--cs-color-brand-primary` |
| Focus-visible | `outline: 3px solid var(--cs-color-focus)` |

### Tab controls (pricing, product-showcase)

| State | Token |
|---|---|
| Inactive | text `--cs-color-text-secondary`, border-bottom 2px transparent |
| Hover | text `--cs-color-text-primary` |
| Active | text `--cs-color-brand-primary`, border-bottom 2px `--cs-color-brand-primary` |
| Focus-visible | `outline: 3px solid var(--cs-color-focus)` |

### Carousel controls

| State | Token |
|---|---|
| Arrow button default | bg transparent, icon `--cs-color-text-secondary` |
| Arrow button hover | bg `--cs-palette-gray-100`, icon `--cs-color-brand-primary` |
| Arrow focus-visible | `outline: 3px solid var(--cs-color-focus)` |
| Dot indicator inactive | `--cs-color-border` |
| Dot indicator active | `--cs-color-brand-primary` |

---

## 4. Path to Overrides File

`/Users/191561/Documents/play/Cognizant/cts-cstrike/styles/config/overrides.css`

This file is NOT yet imported automatically. Blockwright must add the following line to `styles/lazy-styles.css` (it is safe for post-LCP delivery):

```css
@import url("config/overrides.css");
```

Rationale: `overrides.css` only affects below-the-fold block styles and does not affect LCP-critical rendering. The styles in `styles/styles.css` (loaded eagerly) already define the base tokens; `overrides.css` replaces them at cascade time after the lazy phase.

---

## 5. Complete List of CSS Custom Properties Added

### Palette (raw — prefix `--cs-palette-`)
`--cs-palette-red-500`, `--cs-palette-red-700`, `--cs-palette-red-900`, `--cs-palette-blue-500`, `--cs-palette-blue-700`, `--cs-palette-electric-blue-500`, `--cs-palette-electric-blue-700`, `--cs-palette-black`, `--cs-palette-gray-900`, `--cs-palette-gray-700`, `--cs-palette-gray-500`, `--cs-palette-gray-400`, `--cs-palette-gray-200`, `--cs-palette-gray-100`, `--cs-palette-white`, `--cs-palette-overlay`

### Semantic colour (prefix `--cs-color-`)
`--cs-color-surface-dark`, `--cs-color-surface-overlay`, `--cs-color-surface-card`, `--cs-color-surface-section-alt`, `--cs-color-brand-primary`, `--cs-color-brand-primary-dark`, `--cs-color-brand-secondary`, `--cs-color-brand-secondary-dark`, `--cs-color-brand-electric`, `--cs-color-brand-electric-dark`, `--cs-color-text-primary`, `--cs-color-text-secondary`, `--cs-color-text-tertiary`, `--cs-color-text-on-dark`, `--cs-color-text-on-dark-secondary`, `--cs-color-focus`, `--cs-color-border`, `--cs-color-border-brand`

### Gradients (prefix `--cs-gradient-`)
`--cs-gradient-hero`, `--cs-gradient-hero-dark`, `--cs-gradient-dark-section`, `--cs-gradient-red-sweep`

### Typography (prefix `--cs-font-` / `--cs-letter-` / `--cs-text-`)
`--cs-font-family-brand`, `--cs-font-weight-ui`, `--cs-font-weight-eyebrow`, `--cs-font-size-eyebrow`, `--cs-letter-spacing-eyebrow`, `--cs-text-transform-eyebrow`

### Spacing (prefix `--cs-space-`)
`--cs-space-xs`, `--cs-space-sm`, `--cs-space-md`, `--cs-space-lg`, `--cs-space-xl`, `--cs-space-xxl`, `--cs-space-xxxl`

### Border radii (prefix `--cs-radius-`)
`--cs-radius-button`, `--cs-radius-card`, `--cs-radius-badge`

### Button tokens (prefix `--cs-btn-`)
`--cs-btn-primary-bg`, `--cs-btn-primary-bg-hover`, `--cs-btn-primary-bg-active`, `--cs-btn-primary-text`, `--cs-btn-primary-border`, `--cs-btn-primary-border-hover`, `--cs-btn-primary-padding-x`, `--cs-btn-primary-padding-y`, `--cs-btn-primary-radius`, `--cs-btn-secondary-bg`, `--cs-btn-secondary-bg-hover`, `--cs-btn-secondary-text`, `--cs-btn-secondary-text-hover`, `--cs-btn-secondary-border`, `--cs-btn-ghost-bg`, `--cs-btn-ghost-bg-hover`, `--cs-btn-ghost-text`, `--cs-btn-ghost-text-hover`, `--cs-btn-ghost-border`, `--cs-btn-disabled-bg`, `--cs-btn-disabled-text`, `--cs-btn-disabled-border`

### Motion (prefix `--cs-duration-` / `--cs-ease-` / `--cs-transition-`)
`--cs-duration-fast`, `--cs-duration-base`, `--cs-duration-slow`, `--cs-duration-carousel`, `--cs-ease-default`, `--cs-ease-in`, `--cs-ease-out`, `--cs-transition-button`, `--cs-transition-card`, `--cs-transition-fade`

### Shadow (prefix `--cs-shadow-`)
`--cs-shadow-card`, `--cs-shadow-card-hover`, `--cs-shadow-dropdown`

### Layout (prefix `--cs-grid-`)
`--cs-grid-max-width`, `--cs-grid-gutter`, `--cs-grid-side-padding`

---

## 6. Instructions for Blockwright

### General rules

1. Never write a hex or rgb literal in block CSS. Always reference a token from section 5 above or from `styles/styles.css`.
2. Always scope selectors to the block root: `.cs-hero .headline`, never `.headline`.
3. Write mobile-first CSS. Use `@media (width >= 600px)`, `@media (width >= 900px)`, `@media (width >= 1200px)`.
4. Do not add classes `cs-hero-container` or `cs-hero-wrapper` — those are reserved by the EDS section system.
5. Import `overrides.css` by adding `@import url("config/overrides.css");` as the first line of `styles/lazy-styles.css`.

### Per-block token guidance

**cs-hero**
- Background: `--cs-gradient-hero` (light) or `--cs-gradient-hero-dark` (dark variant driven by a block option class)
- H1: `--heading-font-family`, `--heading-font-size-xxl`, `font-weight: 700`, `color: --cs-color-text-on-dark`
- Eyebrow: `--cs-font-size-eyebrow`, `--cs-font-weight-eyebrow`, `--cs-letter-spacing-eyebrow`, `--cs-text-transform-eyebrow`, `color: --cs-color-brand-primary` on light / `--cs-palette-white` on dark
- Overlay behind image: `--cs-color-surface-overlay`
- Primary CTA: `--cs-btn-primary-*` tokens
- Secondary CTA: `--cs-btn-secondary-*` tokens (render as ghost on dark variant)
- Carousel dot active: `--cs-color-brand-primary`

**cs-resource-cards**
- Card bg: `--cs-color-surface-card`
- Card border-radius: `--cs-radius-card`
- Card shadow default: `--cs-shadow-card`
- Card shadow hover: `--cs-shadow-card-hover`
- Card transform hover: `translateY(-4px)`, transition `--cs-transition-card`
- Card top accent border: `3px solid`, background `--cs-gradient-red-sweep`
- Card H3: `--heading-font-size-l`, `--heading-font-family`
- Card body text: `--body-font-size-s`, `--cs-color-text-primary`
- Card meta (date, tag): `--body-font-size-xs`, `--cs-color-text-secondary`
- CTA link: `--link-color`, hover `--link-hover-color`

**cs-feature-pillars**
- Section bg: `--light-color`
- Icon colour: `--cs-color-brand-primary`
- Heading: `--heading-font-size-l`
- Body: `--body-font-size-s`
- Column gap: `--cs-space-lg`

**cs-analyst-recognition**
- Card bg: `--cs-color-surface-card`
- Card border: `1px solid --cs-color-border`
- Card shadow: `--cs-shadow-card`
- Analyst name text: `--cs-color-text-primary`, `--body-font-size-s`, weight 600
- Rating/badge: `--cs-color-brand-primary`

**cs-pricing-table**
- Tab active indicator: `2px solid --cs-color-brand-primary` bottom border
- Tab active text: `--cs-color-brand-primary`
- Featured plan: top `4px solid --cs-gradient-red-sweep`, `--cs-shadow-card-hover`
- Price text: `--heading-font-size-xl`, `--heading-font-family`, `--cs-color-brand-primary`
- Feature list check icon: `--cs-color-brand-primary`

**cs-testimonials**
- Slide transition: `--cs-transition-fade`
- Quote text: `--heading-font-size-m` or `--body-font-size-m` (italic)
- Attribution: `--body-font-size-xs`, `--cs-color-text-secondary`
- Carousel dot active: `--cs-color-brand-primary`
- Arrow button hover bg: `--cs-palette-gray-100`

**cs-product-showcase**
- Tab strip bg: `--light-color`
- Active tab border: `4px solid --cs-color-brand-primary` left edge (desktop) / bottom edge (mobile)
- Active tab bg: `--cs-palette-white`
- Feature label: `--body-font-size-s`, weight `--cs-font-weight-ui`
- Screenshot drop-shadow: `--cs-shadow-card-hover`

**cs-adversary-cta**
- Section bg: `--cs-gradient-dark-section`
- Heading: `--cs-color-text-on-dark`, `--heading-font-size-xl`
- Body text: `--cs-color-text-on-dark-secondary`
- Primary CTA on dark bg: use ghost variant (`--cs-btn-ghost-*`)
- Section padding: `--cs-space-xxxl` top/bottom

---

## 7. Open Questions

| # | Question | Impact | Recommended action |
|---|---|---|---|
| OQ-1 | Titillium Web font files are not committed to `fonts/`. Is there a licensed woff2 to provide, or should we load from Google Fonts CDN? | Performance (CDN adds render-blocking risk) vs. licensing | Human to confirm: commit woff2 to `fonts/` and add `@font-face` entries to `styles/fonts.css`. If CDN is chosen, add `<link rel="preconnect">` to `head.html`. |
| OQ-2 | `--cs-color-text-secondary` (`#949494`) produces a contrast ratio of 2.8:1 on white — fails WCAG AA for body text. The token is kept for non-text decorative use only. Is there approved copy in this grey, and if so, which? | Accessibility blocker | Human / content author to confirm. Blockwright should default to `--cs-color-text-tertiary` (`#707070`, 4.8:1) for any standalone paragraph text. |
| OQ-3 | White text on `#ec0000` achieves 3.7:1. This passes AA for UI components and 18px+ text but fails for text smaller than 18px at normal weight. Are any button labels sub-18px at weight 400? | Accessibility — AA compliance | Enforce minimum 14px / weight 600 for all button labels. Flag if any variant drops below that. |
| OQ-4 | The strategist's block.md for `cs-pricing-table` has not been confirmed. Does the pricing table have a "free trial" variant CTA that differs from the main CTA? | Blockwright needs to know button variant for pricing | Confirm with strategist before blockwright authors `cs-pricing-table`. |
| OQ-5 | `data-section-theme="dark"` attribute: the EDS boilerplate sets section class via authored metadata (`section metadata` block). Confirm which authored metadata key maps to the dark theme — `style: dark`, `theme: dark`, or `background: dark`. | Blockwright's JS must set the right attribute | Confirm with strategist / authoring team. Current proposal in overrides.css uses `data-section-theme="dark"` and blockwright's `decorate()` should set it on `block.closest('.section')`. |
| OQ-6 | Hero carousel: auto-advance timing is set to 5000ms (`--cs-duration-carousel`). Should autoplay pause on hover and resume on mouse-leave? Accessibility best practice (WCAG 2.1 SC 2.2.2) requires a mechanism to pause. | Accessibility compliance | Confirm with product owner. Recommend: pause on `pointerenter`, resume on `pointerleave`, and always show a visible pause button. |
| OQ-7 | No dark-mode (`prefers-color-scheme: dark`) token set has been defined. The CrowdStrike source site does not appear to implement a system dark mode. Confirm: is dark mode out of scope for this project? | Token system completeness | If dark mode is required, a full `@media (prefers-color-scheme: dark)` token override pass will be needed before blockwright begins. |
