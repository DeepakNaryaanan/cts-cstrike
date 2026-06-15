# Handshake 04 — Sentinel to Composer

**Date:** 2026-06-15
**Author:** sentinel agent
**Status:** Blocked — 2 blockwright defects must be resolved before composer proceeds

---

## 1. Phase 5 Review Findings

### Severity Key
- **BLOCKING** — build-breaking, must fix before any other work
- **MAJOR** — functional defect, visible regression or accessibility violation
- **MINOR** — style, maintainability, or informational

| Block | Severity | Finding | Recommended Fix |
|---|---|---|---|
| cs-resource-cards | BLOCKING | All CSS selectors (`.cs-resource-cards-grid`, `.cs-resource-cards-card`, etc.) were unscoped — no `.cs-resource-cards` ancestor prefix. Any other block using a child class with the same name would be affected. | **Applied by sentinel**: Prefixed all inner selectors with `.cs-resource-cards`. |
| cs-pricing-table | BLOCKING | `row.children` returns `[<p>]` (not column `<div>` elements) after `wrapTextNodes` runs. The block assumes direct column children but the AEM framework inserts a `<p>` wrapper before `decorate()` runs. Results in 1 plan card instead of 3, and subtitle/plan-name/feature-count all wrong. | **blockwright must fix**: Change all multi-column cell reads from `row.children` to `row.firstElementChild.children` (i.e., read through the AEM-inserted `<p>` to the actual column divs). See §4 for precise repro. |
| cs-testimonials | BLOCKING | Same `row.children` vs `<p>` wrapper issue. The header row's `viewAllCell` is `undefined` because `headerRow.children` = `[<p>]`. The heading text also incorrectly includes the view-all link text concatenated into the h2. | **blockwright must fix**: Same pattern — use `headerRow.firstElementChild.children` to access the column cells. See §4 for precise repro. |
| cs-feature-pillars | MAJOR | Test HTML authored without icon rows but block not given `no-icon` variant class. With default 4-row card grouping, 9 card rows produce 2 full + 1 incomplete card. | **Applied by sentinel**: Added `no-icon` class to block in test HTML. |
| cs-resource-cards | MAJOR | Test HTML authored with 3-row card groups (no images) but block not given `no-image` variant. With default 4-row grouping, 9 rows produce 2 full + 1 incomplete card. | **Applied by sentinel**: Added `no-image` class to block in test HTML. |
| cs-analyst-recognition | MAJOR | Test HTML had 3-row card groups (no logo row) mismatched against the 4-row block contract. Cards were being parsed incorrectly. | **Applied by sentinel**: Restructured analyst-recognition cards in test HTML to use 4-row groups with empty first row for logo slot. |
| cs-hero | MINOR | The `cs-hero.css` `.cs-hero.image` variant rule (line 222) applies `display: grid` to `.cs-hero-slide` but the image variant is not tested in test HTML. No defect in the delivered code, informational. | None required — cover with variant test when image assets are available. |
| cs-pricing-table | MINOR | WCAG 2.2 SC 2.2.2: tab buttons do not have keyboard arrow-key navigation wired (only click). ARIA tab pattern requires Left/Right arrow keys to move between tabs. | **blockwright should add**: `keydown` handler for ArrowLeft/ArrowRight on `.cs-pricing-table-tab` elements. |
| cs-product-showcase | MINOR | Same ARIA tab keyboard navigation gap (no arrow-key wiring on tabs). | **blockwright should add**: `keydown` handler for ArrowLeft/ArrowRight on `.cs-product-showcase-tab` elements. |
| All dark blocks | MINOR | `--cs-color-text-secondary` (gray-400, #949494) on white background fails WCAG 4.5:1 contrast for normal-sized text (~2.3:1). This token is used in `cs-pricing-table-tab` (default/inactive state). The styleforge handshake flagged this as OQ-2. | Unresolved from styleforge — confirm with design whether inactive tab labels can use a darker grey token. |
| Titillium Web font | MINOR | No `@font-face` in `fonts.css`. The brand font falls back to roboto everywhere. flagged in blockwright handshake as OQ-1. | Out of sentinel scope — resolve in a separate font-loading PR. |

---

## 2. Fixes Applied by Sentinel

The following changes were made directly in this phase:

### `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-resource-cards/cs-resource-cards.css`
All 14 CSS rule blocks prefixed with `.cs-resource-cards` ancestor to enforce scoping per AGENTS.md rule. No visual change — selector specificity is identical, only scoping added.

### `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/cs-homepage-test.html`
Three fixes:
1. `cs-resource-cards` block: added `no-image` class so 3-row card groups are parsed correctly.
2. `cs-feature-pillars` block: added `no-icon` class so 3-row card groups (no icon row) are parsed correctly.
3. `cs-analyst-recognition` block: restructured 9 card rows into 3 × 4-row groups (empty logo row + headline + subtitle + CTA) matching the block's content contract.

---

## 3. Lint Status (Final)

`npm run lint` exits 0. Zero errors, zero warnings.

---

## 4. Blockwright Defect Repros

### Defect BD-01: Multi-column row parsing — `cs-pricing-table` and `cs-testimonials`

**Root cause:** The AEM `wrapTextNodes()` function (in `scripts/aem.js`) runs on every block before `decorate()` is called. It wraps the text content of each column `<div>` in a `<p>`. For a 3-column row:

```
// Authored HTML (as sent from server):
<div>           ← row
  <div>col1</div>
  <div>col2</div>
  <div>col3</div>
</div>

// After wrapTextNodes (as seen by decorate()):
<div>           ← row (block.children[i])
  <p>           ← AEM wrapper — NOT a column!
    <div>col1</div>
    <div>col2</div>
    <div>col3</div>
  </p>
</div>
```

Verified by Playwright inspection at DOMContentLoaded, before `decorate()` runs.

**cs-pricing-table bug locations:**
- Line 124: `const headingCells = [...(rows[0]?.children ?? [])]` → gets `[<p>]` (1 element), not 2 column divs
- Line 135: `const tabCells = [...rows[1].children]` → gets `[<p>]` (1 element), not 2 tab labels
- Line 141: `const planNameCells = [...(rows[planStartIdx]?.children ?? [])]` → gets `[<p>]` (1 element), not N plan columns
- Lines 143–151: All subsequent multi-column row reads have the same issue

**cs-testimonials bug location:**
- Line 140: `const viewAllCell = [...(headerRow?.children ?? [])][1]` → index 1 is undefined (`children` gives `[<p>]`)

**Required fix (blockwright):** Replace `row.children` with `(row.firstElementChild?.children ?? [])` for any row that is expected to carry multiple column cells. The pattern:

```javascript
// WRONG:
const cells = [...row.children];

// CORRECT (accounts for AEM's <p> wrapper):
const cells = [...(row.firstElementChild?.children ?? [])];
```

**Failing tests as repro:** Run `npm run test:e2e` — these 6 tests fail and reproduce the defect:
- `cs-pricing-table block › subtitle is rendered`
- `cs-pricing-table block › exactly 3 plan cards are rendered`
- `cs-pricing-table block › plan names are correct`
- `cs-pricing-table block › 9 feature items rendered (3 plans × 3 features)`
- `cs-pricing-table block › CTA links rendered in each plan`
- `cs-testimonials block › view-all link is rendered with correct href`

---

## 5. Playwright Spec Files Created

All 8 spec files live in their respective block directories:

| File | What It Asserts |
|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-hero/cs-hero.spec.js` | Carousel ARIA, 2 slides, dot nav (labels, aria-current), arrow buttons, click-to-advance, CTA link |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-resource-cards/cs-resource-cards.spec.js` | 3 cards rendered, article elements, tag spans with slugified classes, headline links with valid hrefs, CSS grid |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-feature-pillars/cs-feature-pillars.spec.js` | h2 heading, intro paragraph, 3 cards with h3 titles and body paragraphs, no icon containers, CSS grid |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-analyst-recognition/cs-analyst-recognition.spec.js` | h2 heading, 3 cards, h3 headlines with expected text, CTA links with valid hrefs, no logo containers when logos absent |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-pricing-table/cs-pricing-table.spec.js` | role=tablist/tab, monthly tab active on load, 3 plan cards, plan names, monthly/annual price visibility toggling, recommended badge, feature items with aria-hidden icons |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-testimonials/cs-testimonials.spec.js` | h2 heading, view-all link, carousel aria, 3 slides with role=group, blockquote structure, attribution name/role split, CTA link, dot nav, click-to-advance |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-product-showcase/cs-product-showcase.spec.js` | h2 heading, role=tablist, 4 tabs with role=tab, aria-selected state, 4 panels with role=tabpanel, tab/panel ARIA id wiring, first panel visible, click-to-switch panels |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-adversary-cta/cs-adversary-cta.spec.js` | h2 headline, body text, primary CTA link (href + label), no secondary CTA when empty, no eyebrow when empty row, data-section-theme="dark" on parent section |

---

## 6. Test Run Result

**Server:** AEM CLI at `http://localhost:3000/tests/cs-homepage-test` (started with `--html-folder tests`)

**Result:** 100 passed / 6 failed

**Passing:** All assertions for cs-hero, cs-resource-cards, cs-feature-pillars, cs-analyst-recognition, cs-product-showcase, cs-adversary-cta, plus pricing-table tab mechanics (toggle, badge) and testimonial carousel behavior.

**Failing (BD-01 repro):**
1. `cs-pricing-table › subtitle is rendered` — subtitle not rendered (heading row reads as 1-column `<p>` not 2 columns)
2. `cs-pricing-table › exactly 3 plan cards are rendered` — 1 plan rendered instead of 3
3. `cs-pricing-table › plan names are correct` — single h3 contains all 3 plan names concatenated
4. `cs-pricing-table › 9 feature items rendered (3 plans × 3 features)` — only 3 feature items (1 plan's worth)
5. `cs-pricing-table › CTA links rendered in each plan` — 1 CTA instead of 3
6. `cs-testimonials › view-all link is rendered with correct href` — view-all link absent (same `<p>` wrapper issue on header row)

---

## 7. Files Changed During This Phase

| File | Change |
|---|---|
| `blocks/cs-resource-cards/cs-resource-cards.css` | All selectors prefixed with `.cs-resource-cards` (scoping fix) |
| `tests/cs-homepage-test.html` | Added `no-image` to cs-resource-cards, `no-icon` to cs-feature-pillars, restructured cs-analyst-recognition to 4-row card groups |
| `blocks/cs-hero/cs-hero.spec.js` | Created |
| `blocks/cs-resource-cards/cs-resource-cards.spec.js` | Created |
| `blocks/cs-feature-pillars/cs-feature-pillars.spec.js` | Created |
| `blocks/cs-analyst-recognition/cs-analyst-recognition.spec.js` | Created |
| `blocks/cs-pricing-table/cs-pricing-table.spec.js` | Created |
| `blocks/cs-testimonials/cs-testimonials.spec.js` | Created |
| `blocks/cs-product-showcase/cs-product-showcase.spec.js` | Created |
| `blocks/cs-adversary-cta/cs-adversary-cta.spec.js` | Created |
| `playwright.config.js` | Created |
| `package.json` | Added `@playwright/test` devDependency, added `test:e2e` script |

---

## 8. Instructions for Composer

**STOP — Do not begin library entry or usage page until blockwright resolves BD-01.**

Once blockwright delivers the fix for the `row.children` / `<p>` wrapper issue:
1. Run `npm run test:e2e` — all 106 tests must pass.
2. Run `npm run lint` — must exit 0.
3. Then proceed to create the block library entry and `tests/cs-homepage-usage.html`.

**When creating the usage page:**
- Use `/tests/cs-homepage-test.html` as the reference for block structure.
- Ensure the multi-column blocks (cs-pricing-table, cs-testimonials) use the corrected authored structure.
- The usage page URL will be `http://localhost:3000/tests/cs-homepage-usage`.

**Recommended next agent after BD-01 fix:** sentinel (re-run) → pilot (if green).

---

## 9. Recommended Next Agent

**blockwright** — to fix the multi-column row parsing defect (BD-01) in `cs-pricing-table.js` and `cs-testimonials.js`.
