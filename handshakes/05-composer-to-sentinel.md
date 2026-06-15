# Handshake 05 — Composer to Sentinel

**Date:** 2026-06-15
**Author:** composer agent
**Status:** Ready — Phase 7 and Phase 8 complete, both pages verified at HTTP 200

---

## 1. Files Created

| File | Purpose |
|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/block-library.html` | Block library page — live rendered examples of all 8 blocks with all key variants |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/cs-homepage-usage.html` | Full CrowdStrike homepage usage page — all 8 blocks assembled in production order |

---

## 2. URL Verification Results

Dev server started via:
```
npx -y @adobe/aem-cli up --no-open --forward-browser-logs --html-folder tests
```

| URL | HTTP Status | Notes |
|---|---|---|
| `http://localhost:3000/tests/block-library` | 200 | Served with EDS scripts injected, all 8 blocks rendered |
| `http://localhost:3000/tests/block-library.html` | 200 | Direct file route also resolves |
| `http://localhost:3000/tests/cs-homepage-usage` | 200 | All 8 blocks in page order |
| `http://localhost:3000/tests/cs-homepage-usage.html` | 200 | Direct file route also resolves |

The `*.plain.html` route returns 404 for local `.html` files served via `--html-folder` — this is expected AEM CLI behaviour. The EDS scripts load from the block-library and usage pages via the standard `.html` / no-extension routes.

---

## 3. Block Library Structure

`tests/block-library.html` documents all 8 blocks. Each block section contains:
- An H2 heading with block name and short description
- A prose paragraph explaining authoring rules (row/cell contract)
- A variant list
- One H3 subsection per variant with a prose note and a live block example using real CrowdStrike content

### Blocks and variants documented

| Block | Variants shown |
|---|---|
| cs-hero | default (2-panel carousel), static, dark |
| cs-resource-cards | no-image (homepage variant), default (with image cells) |
| cs-feature-pillars | no-icon (homepage variant), dark |
| cs-analyst-recognition | default |
| cs-pricing-table | default (monthly/annual tabs, 3 plans) |
| cs-testimonials | default (dark carousel), light |
| cs-product-showcase | default (dark, 4 tabs), light |
| cs-adversary-cta | default, with-eyebrow, split |

Variant class names confirmed in served HTML output:
- cs-adversary-cta, cs-adversary-cta split, cs-adversary-cta with-eyebrow
- cs-analyst-recognition
- cs-feature-pillars dark, cs-feature-pillars no-icon
- cs-hero, cs-hero dark, cs-hero static
- cs-pricing-table
- cs-product-showcase, cs-product-showcase light
- cs-resource-cards, cs-resource-cards no-image
- cs-testimonials, cs-testimonials light

---

## 4. Usage Page Structure

`tests/cs-homepage-usage.html` assembles all 8 blocks in homepage production order.

| Section | Block | Variant | Key content |
|---|---|---|---|
| 1 | cs-hero | default (carousel) | 2 panels: Gartner MQ award + AI security headline |
| 2 | cs-resource-cards | no-image | 3 news cards: Frontier AI, AI whitepaper, Glassworm takedown |
| 3 | cs-feature-pillars | no-icon | Heading + intro + 3 pillars: SOC AI, adversaries, secure AI |
| 4 | cs-analyst-recognition | default | Section heading + 3 recognition cards: Gartner MQ, Gartner CTI, IDC CNAPP |
| 5 | cs-pricing-table | default | 3 plans: Free Trial, Security Essentials, Enhanced Protection; monthly/annual tabs |
| 6 | cs-testimonials | default | View-all link + 3 customer quotes: Travel+Leisure, TaylorMade, ALDO Group |
| 7 | cs-product-showcase | default | 4 product tabs: AI Security, Cloud Security, Identity Security, Next-Gen SIEM |
| 8 | cs-adversary-cta | default | Know them. Find them. Stop them. CTA |
| 9 | metadata | — | Title, Description, Keywords |

All 8 block class names confirmed present in served HTML:
cs-adversary-cta, cs-analyst-recognition, cs-feature-pillars no-icon, cs-hero,
cs-pricing-table, cs-product-showcase, cs-resource-cards no-image, cs-testimonials

---

## 5. Notes on Special Handling

### Correct EDS authored structure — no pre-decorated classes

Both files follow the validated structure from `tests/cs-homepage-test.html` (106 Playwright tests passing). Key rules applied:

- Section wrappers are plain `<div>` elements with no class — `decorateSections` in `scripts.js` applies the `section` class and `section-wrapper` at runtime.
- Block elements carry only the block-name class (e.g., `class="cs-hero"` or `class="cs-testimonials"`) — `decorateBlocks` handles the `block` class and `block-wrapper` at runtime.
- Multi-column rows in pricing-table and testimonials use direct column `<div>` children — no extra wrapping. The BD-01 fix (delivered by blockwright before this phase) handles the `wrapTextNodes` `<p>` wrapper correctly inside those blocks' `decorate()` functions.

### cs-pricing-table — multi-column authored structure

The pricing table is the most complex block. Its content model uses columns for plans and rows for features. The authored structure must have one `<div>` per plan column as direct children of each row `<div>`. This is correctly authored in both files.

### cs-testimonials — 2-column header row

The testimonials header row (row 1) must be authored with two column `<div>` children: heading text in column 1, view-all link in column 2. This is preserved in both files.

### cs-analyst-recognition — logo slot is an empty row

Because no analyst logo image assets are committed to the repository, the logo row in each recognition card is authored as an empty `<div>`. The block must not render an empty image container for empty cells — this is covered by the sentinel spec `cs-analyst-recognition.spec.js`.

### CMS handoff note

Both files are static `.html` drafts served via the `--html-folder tests` flag. They are not CMS-authored content. To make these pages available on the preview/production environments:
1. An author must recreate the block tables in da.live or Google Docs using the content from the respective HTML files.
2. The block library page should be authored at a path such as `/tools/block-library` or `/developer/block-library`.
3. The usage page should be authored at `/` (homepage) once the migration is approved.

---

## 6. Instructions for Sentinel — Phase 9

Phase 9 covers Playwright testing of the usage page. Sentinel should:

1. Start the dev server (if not already running):
   ```
   npx -y @adobe/aem-cli up --no-open --forward-browser-logs --html-folder tests
   ```

2. Create a new Playwright spec file at:
   ```
   tests/cs-homepage-usage.spec.js
   ```

3. The spec should test the full assembled page at `http://localhost:3000/tests/cs-homepage-usage`. Assertions to include:
   - Page title matches expected string
   - All 8 blocks are present in the DOM in the correct order (verify via query selectors)
   - Hero carousel renders and advances (reuse cs-hero.spec.js assertions)
   - Resource cards render (3 cards, tag spans, headline links)
   - Feature pillars render (section heading, 3 pillar cards)
   - Analyst recognition renders (section heading, 3 cards with CTA links)
   - Pricing table renders (tab list, 3 plan cards, recommended badge)
   - Testimonials render (section heading, view-all link, 3 slides, dot nav)
   - Product showcase renders (section heading, 4 tabs, ARIA tab pattern)
   - Adversary CTA renders (h2 headline, body text, primary CTA link)
   - No block collides visually with adjacent blocks (bounding box checks)
   - No console errors on page load

4. Run the full test suite:
   ```
   npm run test:e2e
   ```
   All 106 existing tests plus the new usage page spec must pass.

5. Hand off to pilot for deploy once green.

---

## 7. Recommended Next Agent

**sentinel** — Phase 9: write and run Playwright spec for `tests/cs-homepage-usage.html`.
