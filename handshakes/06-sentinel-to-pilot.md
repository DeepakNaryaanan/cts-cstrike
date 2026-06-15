# Handshake 06 — Sentinel to Pilot

**Date:** 2026-06-15
**Author:** sentinel agent
**Status:** Green — Phase 9 complete, all 153 tests pass, lint clean

---

## 1. Usage Page Spec Created

| File | Purpose |
|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/cs-homepage-usage.spec.js` | Page-level integration spec for `tests/cs-homepage-usage.html` — 47 tests covering all 8 blocks in context |

The spec is structured into 11 sections matching the task requirements:
1. Page-level checks (title, 8 blocks present, DOM order, heading hierarchy)
2. Hero section integration (carousel, active slide, headline content, ARIA)
3. Resource cards integration (grid, 3 cards, article elements, tag text)
4. Feature pillars integration (grid, h2 heading, 3 cards)
5. Analyst recognition integration (strip, h2 heading, 3 cards, card content)
6. Pricing table integration (plans, tablist, 2 tabs, 3 plans, recommended badge, active tab)
7. Testimonials integration (track, h2 heading, view-all link, slides, active slide)
8. Product showcase integration (tabs, h2 heading, tablist, 4 tabs, 4 panels, interaction)
9. Adversary CTA integration (content wrapper, h2 headline, primary CTA, no eyebrow)
10. Section theme attributes (adversary-cta and testimonials dark sections)
11. No console errors on page load

---

## 2. Full Test Run Result

**153 passed / 0 failed** (34.5s)

Breakdown:
- 106 pre-existing block-level unit tests (all 8 blocks) — all pass
- 47 new usage page integration tests — all pass

---

## 3. Fixes Applied

### playwright.config.js — testDir expanded
- **Old:** `testDir: './blocks', testMatch: '**/*.spec.js'`
- **New:** `testDir: '.'`, `testMatch: '{blocks,tests}/**/*.spec.js'`
- **Reason:** The usage spec lives in `tests/` which was outside the original `testDir`. Changed `testDir` to the project root and scoped `testMatch` to only pick up specs in `blocks/` and `tests/` subdirectories.

### tests/cs-homepage-usage.spec.js — two timing fixes
Two spec assertions required explicit `waitForSelector` guards to be stable under parallel test execution:

1. **"testimonials renders at least 2 slides"** — The `beforeEach` waits for `.cs-hero .cs-hero-carousel` (eager phase). Testimonials decorate in the lazy phase and the slide count was read before they existed. Fix: added `waitForSelector('.cs-testimonials .cs-testimonials-slide', { timeout: 10000 })`.

2. **"h2 headings exist in at least 3 distinct sections"** — When run in parallel, some lazy-phase blocks had not yet emitted their h2 elements. Fix: added `waitForSelector('.cs-adversary-cta .cs-adversary-cta-content', { timeout: 10000 })` before the count assertion to ensure all blocks have completed decoration.

No production block code was modified.

---

## 4. Final Lint Status

`npm run lint` — **pass** (0 errors, 0 warnings)
- `eslint .` — pass
- `stylelint "blocks/**/*.css" "styles/*.css"` — pass

---

## 5. Files Modified

| File | Change |
|---|---|
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/cs-homepage-usage.spec.js` | Created — 47-test integration spec |
| `/Users/191561/Documents/play/Cognizant/cts-cstrike/playwright.config.js` | `testDir` and `testMatch` updated to include `tests/` |

No block source files (`*.js`, `*.css`) were modified.

---

## 6. All 8 Blocks Render Correctly on the Usage Page

Confirmed by test assertions on `http://localhost:3000/tests/cs-homepage-usage`:

| Block | Assertion | Result |
|---|---|---|
| cs-hero | `.cs-hero-carousel` present, first slide active, "Leader" in headline | PASS |
| cs-resource-cards | Grid rendered, 3 article cards, tag text correct | PASS |
| cs-feature-pillars | Grid rendered, h2 heading visible, 3 cards | PASS |
| cs-analyst-recognition | Strip rendered, h2 heading, 3 cards, "seventh consecutive time" | PASS |
| cs-pricing-table | Plans rendered, tablist, 2 tabs, 3 plans, recommended badge | PASS |
| cs-testimonials | Track rendered, h2 heading, view-all link, slides present, first active | PASS |
| cs-product-showcase | Tabs rendered, 4 tabs, 4 panels, first panel visible, interaction works | PASS |
| cs-adversary-cta | Content wrapper, h2 "Know them", primary CTA link | PASS |

Section theme attributes confirmed: adversary-cta and testimonials sections carry `data-section-theme="dark"`.

---

## 7. Instructions for Pilot — Phase 10 (Deploy)

Pilot should:

1. **Pre-push hygiene** — delete any `test-results/` directory created by Playwright:
   ```
   rm -rf /Users/191561/Documents/play/Cognizant/cts-cstrike/test-results
   ```

2. **Confirm lint + tests green one final time:**
   ```
   npm run lint
   npx playwright test --reporter=line
   ```
   Expected: 0 lint errors, 153 tests pass.

3. **Push the feature branch** to origin.

4. **Construct the feature-preview URL** from the branch name:
   ```
   https://{branch}--cts-cstrike--DeepakNaryaanan.aem.page/tests/cs-homepage-usage
   ```

5. **Run PageSpeed Insights** against the preview URL. Target score: 100.

6. **Prepare the PR description** with:
   - Summary of all 8 blocks built and tested
   - Link to the preview URL (required — PR will be rejected without it)
   - Test results: 153 Playwright tests pass, lint clean

7. **Open the PR** targeting `main`. Do not merge — that is the human reviewer's call.

### Branch name
Run `git branch --show-current` to confirm the current branch name before pushing.

### Files to include in the PR
All files under:
- `blocks/cs-hero/`
- `blocks/cs-resource-cards/`
- `blocks/cs-feature-pillars/`
- `blocks/cs-analyst-recognition/`
- `blocks/cs-pricing-table/`
- `blocks/cs-testimonials/`
- `blocks/cs-product-showcase/`
- `blocks/cs-adversary-cta/`
- `tests/` (cs-homepage-test.html, cs-homepage-usage.html, block-library.html, cs-homepage-usage.spec.js)
- `playwright.config.js`
- `handshakes/` (all 6 handshake documents)
