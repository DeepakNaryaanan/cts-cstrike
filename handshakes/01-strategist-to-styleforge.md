# Handshake: Strategist to Styleforge

Phase 1 (user stories) and Phase 2 (content models) are complete. This document is the formal handoff to **styleforge** before blockwright begins implementation.

---

## User Story Files Created

| File | Block | Priority |
|---|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/00-alert-banner.md` | alert-banner (auto-block) | P0 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/01-hero-carousel.md` | cs-hero | P0 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/02-resource-cards.md` | cs-resource-cards | P1 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/03-feature-pillars.md` | cs-feature-pillars | P1 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/04-analyst-recognition.md` | cs-analyst-recognition | P1 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/05-pricing-table.md` | cs-pricing-table | P1 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/06-testimonials.md` | cs-testimonials | P2 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/07-product-showcase.md` | cs-product-showcase | P1 |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/user_story/08-adversary-cta.md` | cs-adversary-cta | P2 |

---

## block.md Files Created

| File | Block |
|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-hero/block.md` | cs-hero |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-resource-cards/block.md` | cs-resource-cards |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-feature-pillars/block.md` | cs-feature-pillars |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-analyst-recognition/block.md` | cs-analyst-recognition |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-pricing-table/block.md` | cs-pricing-table |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-testimonials/block.md` | cs-testimonials |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-product-showcase/block.md` | cs-product-showcase |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-adversary-cta/block.md` | cs-adversary-cta |

---

## Block Inventory Table

| Block | Variants | Priority | JS Required | Notes |
|---|---|---|---|---|
| alert-banner | default, dark | P0 | Minimal (dismiss + sessionStorage) | Auto-block or default content; no block.md |
| cs-hero | default, static, dark, image | P0 | Yes (carousel, ARIA, auto-rotate) | LCP block; eager load |
| cs-resource-cards | default, featured, no-image | P1 | Minimal | Lazy images |
| cs-feature-pillars | default, dark, 2-col, no-icon | P1 | None (default) | CSS-only default variant |
| cs-analyst-recognition | default, carousel, compact | P1 | Optional (carousel variant only) | Contrast open question on CTA links |
| cs-pricing-table | default, single-billing, compact, enterprise | P1 | Yes (tab pattern, ARIA) | Highest authoring complexity; 2D table structure |
| cs-testimonials | default, light, static, logo-only | P2 | Yes (carousel, ARIA, auto-rotate) | Dark background by default |
| cs-product-showcase | default, light, vertical-tabs, icon-tabs | P1 | Yes (tab pattern, ARIA) | Dark background by default |
| cs-adversary-cta | default, split, light, with-eyebrow | P2 | None (default/light) | CSS-only default; minimal split variant |

---

## Content Model Assumptions Made

1. **Panel separator rows (cs-hero):** Empty rows between panels delimit carousel slides. This is an inferred authoring convention — it needs validation in da.live before implementation. An alternative approach would be a column-based model where each column is a slide (but this limits the number of panels to da.live's column limit).

2. **Positional card boundaries (cs-resource-cards, cs-feature-pillars, cs-analyst-recognition, cs-testimonials, cs-product-showcase):** Card/tab group boundaries are determined by a known "marker" row (e.g., the image row, the icon row, the tab label row). This is standard EDS practice but requires blockwright to read row children positionally.

3. **Feature checklist encoding (cs-pricing-table):** Feature rows use the format `Feature name: included` or `Feature name: not included`. This is a pragmatic choice that keeps authoring simple but requires a JS parser in blockwright. An alternative is a two-column structure (feature name | tick/dash), which is more robust but harder to author for 5+ plans.

4. **Attribution format (cs-testimonials):** Attribution is authored as a single string "Name, Title, Company". Blockwright splits on the first comma. If a name contains a comma (edge case), this will break. A safer alternative is three separate cells, but that increases table height significantly.

5. **Icon references (cs-feature-pillars):** Icons are assumed to follow EDS icon syntax (`:icon-name:`) pointing to SVG files in the `icons/` folder. If design provides raster images instead, authors will upload images and the icon cell becomes an image link — the content model remains the same but the rendering changes.

6. **Section heading placement:** For blocks like cs-analyst-recognition and cs-testimonials, the section heading may be authored either as the first row inside the block table, or as default section content (an `<h2>` paragraph) directly above the block. Both patterns are noted in block.md; the preference should be confirmed. Keeping headings inside the block table is more portable but adds a row that must be detected by blockwright.

7. **Background colours:** Dark backgrounds for cs-hero, cs-testimonials, cs-product-showcase, and cs-adversary-cta are specified as CrowdStrike brand colours (`#EC0000`, `#1F60A2`, near-black). The exact dark value has not been confirmed from a live Figma file — styleforge must extract and confirm.

---

## Open Questions for Styleforge

These questions require design token extraction and confirmation before blockwright begins CSS work.

### Colours
1. **CTA text link colour:** CrowdStrike red `#EC0000` on white background yields ~3.7:1 contrast, which fails WCAG AA for normal-weight text under 18px. What is the approved accessible CTA link colour? Options: darker red (~#B50000 gives ~5.2:1), dark navy, or bold/large text treatment.
2. **Dark section background:** Multiple sections (cs-hero dark gradient, cs-testimonials, cs-product-showcase, cs-adversary-cta) use a dark background. Is this a single token (`--color-background-dark`) or per-section values? Confirm whether `#0D1117`, `#1F60A2`, or another near-black is used for the darkest sections.
3. **Resource card tag pill colours:** What colour is each category tag pill? The source page shows coloured pills — are they per-category (dynamic colour map) or a shared single colour?
4. **Gradient definition:** The hero gradient runs from red to dark blue. Confirm exact CSS gradient: direction, stop colours, and stop positions. Is it `linear-gradient(135deg, #EC0000 0%, #1F60A2 100%)`?
5. **Pricing table recommended plan highlight:** What colour is the top border or header of the recommended plan card?

### Typography
6. **Display/headline font:** What font family is used for large headlines in the hero and CTA sections? Is it a web font loaded via `fonts.css`, or a system font stack?
7. **Body font:** What is the body text font?
8. **Font weights in use:** List the numerical weights needed (e.g., 400 regular, 600 semibold, 700 bold) so font files can be committed appropriately.
9. **Eyebrow text treatment:** Is eyebrow text all-caps via CSS `text-transform: uppercase`, or authored in uppercase? Is it a different font family from the headline?

### Spacing & Sizing
10. **Section vertical padding:** What is the standard vertical padding for full-width sections? Confirm mobile and desktop values (inferred: 48px mobile / 80–120px desktop).
11. **Card border-radius:** What is the card corner radius? Inferred 4–8px — confirm exact value for all card components.
12. **Button border-radius:** Are buttons pill-shaped (50px radius) or lightly rounded (4–8px)?
13. **Hero minimum height:** Confirm minimum heights at each breakpoint (mobile / 600px / 900px / 1200px).

### Motion & Animation
14. **Carousel transition duration and easing:** Confirm duration (inferred 400ms for cs-hero, 350ms for cs-testimonials) and CSS easing function.
15. **Tab panel transition:** Is there a crossfade or an immediate switch on tab activation?
16. **Hover transitions:** What is the standard hover transition duration (inferred: 200–300ms ease)?

### Icons
17. **Icon set:** Are block icons (cs-feature-pillars) from a specific icon library, or custom SVGs? If custom, do Figma exports exist?
18. **Carousel navigation arrows:** Are these CSS-drawn chevrons, SVG icons from `icons/`, or font icons?
19. **Checkmark style (pricing table):** Is the feature checklist checkmark a Unicode character, an SVG icon, or a CSS-only check shape?

---

## What Styleforge Needs to Do Next

1. Access the CrowdStrike Figma file or live page design assets.
2. Extract and document all colour tokens as CSS custom properties (e.g., `--color-brand-red`, `--color-brand-navy`, `--color-background-dark`).
3. Document typography tokens: font families, sizes at each breakpoint, line heights, letter spacing.
4. Document spacing scale: padding values, gap values, border-radius values.
5. Resolve the WCAG contrast issue with CTA link colour (`#EC0000` on white) — propose an accessible alternative.
6. Confirm gradient definition for the hero background.
7. Document interactive state tokens: hover, focus, active, disabled for buttons and links.
8. Document motion tokens: transition durations, easing functions, `prefers-reduced-motion` fallbacks.
9. Produce an `overrides.css` or token additions to `styles/styles.css` covering all the above.
10. Return a token plan to the orchestrator so blockwright can begin CSS implementation.

Once styleforge delivers the token plan, **blockwright** can begin Phase 3 implementation starting with the P0 blocks (`cs-hero` and the `alert-banner`) and proceeding in priority order.
