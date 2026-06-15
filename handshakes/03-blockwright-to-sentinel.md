# Handshake 03 — Blockwright to Sentinel

**Date:** 2026-06-15
**Author:** blockwright agent
**Status:** Ready for sentinel

---

## 1. Files Created / Modified

### styles/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/styles/lazy-styles.css` — modified: prepended `@import url("config/overrides.css");`

### blocks/cs-hero/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-hero/cs-hero.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-hero/cs-hero.css`

### blocks/cs-resource-cards/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-resource-cards/cs-resource-cards.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-resource-cards/cs-resource-cards.css`

### blocks/cs-feature-pillars/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-feature-pillars/cs-feature-pillars.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-feature-pillars/cs-feature-pillars.css`

### blocks/cs-analyst-recognition/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-analyst-recognition/cs-analyst-recognition.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-analyst-recognition/cs-analyst-recognition.css`

### blocks/cs-pricing-table/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-pricing-table/cs-pricing-table.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-pricing-table/cs-pricing-table.css`

### blocks/cs-testimonials/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-testimonials/cs-testimonials.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-testimonials/cs-testimonials.css`

### blocks/cs-product-showcase/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-product-showcase/cs-product-showcase.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-product-showcase/cs-product-showcase.css`

### blocks/cs-adversary-cta/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-adversary-cta/cs-adversary-cta.js`
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/blocks/cs-adversary-cta/cs-adversary-cta.css`

### tests/
- `/Users/191561/Documents/play/Cognizant/cts-cstrike/tests/cs-homepage-test.html`

---

## 2. Block Decoration Logic Summaries

### cs-hero
Splits block rows into slide groups by detecting fully empty rows as panel separators. Each slide group is decorated into a `.cs-hero-slide` with optional eyebrow, h1 headline, body, and CTA buttons. Renders dot indicators and prev/next arrow controls when there are multiple slides, with auto-advance every 5s and pause on pointer/focus events. The `dark` variant sets `data-section-theme="dark"` on the parent `.section`.

### cs-resource-cards
Groups rows in sets of 4 (image, tag, headline link, description) or 3 in `no-image` mode. Each group becomes an `<article>` with the tag rendered as a `<span>` badge (slugified for CSS class targeting), the headline as an `<h3>` wrapping the authored link, and an optional description paragraph. No JS is strictly required but included for clean DOM transformation.

### cs-feature-pillars
Reads the first row as a section heading (h2) and optionally the second as intro text, then groups remaining rows as 4-row card groups (icon, title, body, CTA) or 3-row in `no-icon` mode. Each card is placed into a CSS Grid container. The `dark` variant sets `data-section-theme="dark"` on the parent section.

### cs-analyst-recognition
Detects an optional heading row (first row with no image in its first cell), then groups subsequent rows in sets of 4 (logo, headline, subtitle, CTA). On mobile renders as a horizontally scrolling flex strip with scroll-snap; at 900px+ switches to a 3-column CSS Grid via a media query.

### cs-pricing-table
Reads a structured multi-column authored table: row 0 = heading/subtitle, row 1 = billing tab labels, row 2 = plan names (N columns), row 3 = monthly prices, row 4 = annual prices, row 5 = CTAs, optional row 6 = "recommended" flag, remaining rows = feature rows in `"Feature name: included|not included"` format. Tab click listeners toggle `.hidden` on monthly/annual price elements.

### cs-testimonials
Reads header row (heading + view-all link), then groups subsequent rows in sets of 4 (quote, attribution, logo, CTA). Attribution text is split at the first comma to separate name from role for distinct styling. Dot navigation triggers `is-active` class toggling between slides. The `static` variant renders a CSS Grid instead of a carousel.

### cs-product-showcase
Reads an optional section heading row, then groups panel rows in sets of 5 (tab label, product headline, description, image, CTA). Builds a `role="tablist"` tab strip and `role="tabpanel"` panels with proper ARIA wiring (`aria-controls`, `aria-labelledby`, `aria-selected`). Tab click listeners toggle `hidden` on panels and `is-active` on tabs.

### cs-adversary-cta
Reads 5 rows (eyebrow, headline, body, primary CTA, secondary CTA) and wraps them in a `.cs-adversary-cta-content > .cs-adversary-cta-text + .cs-adversary-cta-actions` structure. Sets `data-section-theme="dark"` unless the `light` variant class is present. The `split` variant layout is CSS Grid only at 900px+.

---

## 3. Lint Status

`npm run lint` exits 0. Both `lint:js` (ESLint / Airbnb) and `lint:css` (Stylelint standard) pass with zero errors and zero warnings.

---

## 4. Known Limitations and Open TODOs

- **cs-hero slide grouping:** The detection of empty rows relies on checking all cells for empty `textContent` and absence of `picture/img/a`. If an authored empty row contains a non-breaking space, it will not be detected as a separator. Confirm with authors that empty separator rows are truly empty.
- **cs-feature-pillars intro detection:** The heuristic for distinguishing intro text from a card headline is that the second row must not have a link and the third row must look like an icon. This is fragile if authors omit icons — test with the `no-icon` variant specifically.
- **cs-resource-cards grouping:** Uses a fixed stride of 4 rows per card (or 3 in no-image mode). If authors add more optional rows this will misalign. The block.md contract should be enforced strictly.
- **cs-analyst-recognition card grouping:** Uses a fixed stride of 4 rows. The first card in the test has no logo image (the test HTML intentionally omits logo files) — the card will render without a logo container, which is correct per block.md.
- **cs-pricing-table:** The multi-column authored table requires each row to have exactly N cells (one per plan). da.live authors must be trained to maintain column count. The block handles missing cells gracefully by using `??` fallbacks.
- **cs-testimonials auto-advance:** Carousel does NOT auto-advance (by design for accessibility). The hero block auto-advances; testimonials require a deliberate click. If auto-advance is desired here, add an interval in `initCarousel()` with a pause-on-hover guard.
- **Titillium Web font:** No `@font-face` entries exist in `styles/fonts.css`. The brand font token (`"titillium-web"`) will fall back to roboto until font files are added. OQ-1 from the styleforge handshake is unresolved.
- **No markup.js files:** The instructions mention optional `markup.js` template files. These were not produced because no block required a static HTML template pattern — all blocks do live DOM transformation in their `decorate()` function.

---

## 5. DOM Structure for Sentinel to Test Against

### cs-hero (post-decoration)
```
.cs-hero
  .cs-hero-carousel [aria-roledescription="carousel"]
    .cs-hero-slide[role="group"][aria-roledescription="slide"].is-active  (first slide)
      picture.cs-hero-slide-bg  (if authored)
      .cs-hero-slide-content
        p.cs-hero-eyebrow  (if authored)
        h1
        p.cs-hero-body  (if authored)
        .cs-hero-slide-ctas
          a.button.primary
          a.button.secondary  (if authored)
    .cs-hero-slide[role="group"]  (subsequent slides, no .is-active)
  button.cs-hero-arrow.cs-hero-arrow-prev [aria-label="Previous slide"]
  nav.cs-hero-dots [aria-label="Slide navigation"]
    button.cs-hero-dot.is-active [aria-current="true"]
    button.cs-hero-dot  (one per additional slide)
  button.cs-hero-arrow.cs-hero-arrow-next [aria-label="Next slide"]
```

### cs-resource-cards (post-decoration)
```
.cs-resource-cards
  .cs-resource-cards-grid
    article.cs-resource-cards-card  (× N cards)
      .cs-resource-cards-card-image > picture  (if authored)
      span.cs-resource-cards-tag.tag-{slugified-name}
      h3.cs-resource-cards-card-headline > a[href]
      p.cs-resource-cards-card-desc  (if authored)
```

### cs-feature-pillars (post-decoration)
```
.cs-feature-pillars
  .cs-feature-pillars-intro
    h2.cs-feature-pillars-heading
    p.cs-feature-pillars-intro-text  (if authored)
  .cs-feature-pillars-grid
    .cs-feature-pillars-card  (× N cards)
      .cs-feature-pillars-icon  (if icon authored)
      h3.cs-feature-pillars-card-title
      p.cs-feature-pillars-card-body
      a.cs-feature-pillars-card-cta  (if CTA authored)
```

### cs-analyst-recognition (post-decoration)
```
.cs-analyst-recognition
  h2.cs-analyst-recognition-heading  (if heading authored)
  .cs-analyst-recognition-strip
    .cs-analyst-recognition-card  (× N cards)
      .cs-analyst-recognition-logo > picture  (if logo image authored)
      h3.cs-analyst-recognition-headline
      p.cs-analyst-recognition-subtitle  (if subtitle authored)
      a.cs-analyst-recognition-cta.button.primary[href]
```

### cs-pricing-table (post-decoration)
```
.cs-pricing-table
  .cs-pricing-table-header
    h2.cs-pricing-table-heading
    p.cs-pricing-table-subtitle  (if authored)
    .cs-pricing-table-tabs [role="tablist"]
      button.cs-pricing-table-tab.is-active [role="tab"][aria-selected="true"][data-billing="monthly"]
      button.cs-pricing-table-tab [role="tab"][aria-selected="false"][data-billing="annual"]
  .cs-pricing-table-plans
    .cs-pricing-table-plan  (× N plans)
      .cs-pricing-table-badge  (if recommended)
      h3.cs-pricing-table-plan-name
      .cs-pricing-table-price.cs-pricing-monthly
      .cs-pricing-table-price.cs-pricing-annual.hidden
      a.button.primary.cs-pricing-table-cta  (or button)
      ul.cs-pricing-table-features
        li.cs-pricing-table-feature.is-included|.is-excluded  (× N features)
          span.cs-pricing-table-feature-icon [aria-hidden="true"]
          span  (feature label text)
```

### cs-testimonials (post-decoration)
```
.cs-testimonials
  .cs-testimonials-header
    h2.cs-testimonials-heading
    a.cs-testimonials-view-all  (if authored)
  .cs-testimonials-track [aria-roledescription="carousel"]
    .cs-testimonials-slide[role="group"][aria-roledescription="slide"].is-active  (first)
      blockquote.cs-testimonials-quote > p
      .cs-testimonials-attribution
        strong  (name)
        span    (role + company)
      .cs-testimonials-logo > picture  (if logo authored)
      a.cs-testimonials-cta  (if CTA authored)
    .cs-testimonials-slide  (subsequent slides)
  nav.cs-testimonials-dots
    button.cs-testimonials-dot.is-active [aria-current="true"]
    button.cs-testimonials-dot  (one per additional slide)
```

### cs-product-showcase (post-decoration)
```
.cs-product-showcase
  h2.cs-product-showcase-heading  (if authored)
  .cs-product-showcase-tabs [role="tablist"]
    button.cs-product-showcase-tab.is-active
      [role="tab"][aria-selected="true"]
      [id="cs-product-showcase-tab-0"]
      [aria-controls="cs-product-showcase-panel-0"]
    button.cs-product-showcase-tab  (subsequent tabs)
  .cs-product-showcase-panels
    .cs-product-showcase-panel
      [role="tabpanel"]
      [id="cs-product-showcase-panel-0"]
      [aria-labelledby="cs-product-showcase-tab-0"]
      (no hidden attr on first panel)
      .cs-product-showcase-panel-image > picture  (if authored)
      h3.cs-product-showcase-panel-headline
      p.cs-product-showcase-panel-desc
      a.button.primary.cs-product-showcase-cta
    .cs-product-showcase-panel[hidden]  (subsequent panels)
```

### cs-adversary-cta (post-decoration)
```
.cs-adversary-cta
  .cs-adversary-cta-content
    .cs-adversary-cta-text
      p.cs-adversary-cta-eyebrow  (if eyebrow authored and non-empty)
      h2.cs-adversary-cta-headline
      p.cs-adversary-cta-body
    .cs-adversary-cta-actions
      a.cs-adversary-cta-btn-primary[href]
      a.cs-adversary-cta-btn-secondary[href]  (if authored)
```

---

## 6. What Sentinel Needs to Do Next

1. **Code review** — Run a structured review of each block against `docs/blocks.md` and WCAG 2.1/2.2 AA:
   - Verify ARIA roles and attributes (tabpanel, carousel, roledescription)
   - Confirm all interactive elements are keyboard-focusable and have visible focus rings
   - Check heading hierarchy (no h1 skip; cs-hero uses h1 inside a block, ensure no page-level h1 conflict)
   - Verify colour contrast of all text/background token pairings (flag the `--cs-color-text-secondary` issue flagged by styleforge OQ-2)

2. **Write Playwright specs** for `tests/cs-homepage-test.html`:
   - cs-hero: verify slide count, active slide visibility, dot count, arrow navigation, auto-advance behaviour
   - cs-resource-cards: verify card count, tag badge presence, headline link href
   - cs-feature-pillars: verify section heading, card count, grid columns at 900px viewport
   - cs-analyst-recognition: verify card count, CTA link text and href, strip overflow at mobile
   - cs-pricing-table: verify tab toggle switches price visibility, recommended plan has badge, feature checkmarks
   - cs-testimonials: verify heading, slide count, dot navigation, blockquote structure
   - cs-product-showcase: verify tabpanel ARIA, panel visibility toggling, first panel visible on load
   - cs-adversary-cta: verify dark background token applied, CTA link href

3. **Run `npm run lint`** (should still be green — confirm no regressions from any spec scaffolding)

4. **Run `npm run test:e2e`** (or equivalent Playwright test runner command) until all tests pass

5. **Hand off to pilot** once lint + tests are green, with a summary of the test results and any remaining accessibility warnings.

---

## 7. Test URL

Start the dev server with:
```
npx -y @adobe/aem-cli up --no-open --forward-browser-logs --html-folder tests
```

Then open: `http://localhost:3000/cs-homepage-test`

The `.plain.html` variant (`http://localhost:3000/cs-homepage-test.plain.html`) will strip scripts and return the authored block table DOM for inspection.
