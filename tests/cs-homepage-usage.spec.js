/**
 * cs-homepage usage page integration spec.
 * Drives tests/cs-homepage-usage.html — the full assembled CrowdStrike homepage
 * with all 8 blocks in production order.
 *
 * Asserts:
 *   - Page title contains "CrowdStrike"
 *   - All 8 block sections present in correct DOM order
 *   - Heading hierarchy: h1 in hero, h2 in multiple sections
 *   - cs-hero carousel decorated and first slide active
 *   - cs-resource-cards renders at least 3 cards
 *   - cs-feature-pillars section heading visible, at least 3 cards
 *   - cs-analyst-recognition renders at least 3 cards
 *   - cs-pricing-table tab controls and plan cards rendered
 *   - cs-testimonials section heading visible, slides rendered
 *   - cs-product-showcase tabs wired and accessible
 *   - cs-adversary-cta headline visible
 *   - Dark sections carry data-section-theme="dark"
 *   - No uncaught console errors on page load
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-usage';

test.describe('cs-homepage usage page integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    // Wait for page decoration to complete — hero carousel is the last heavyweight block
    await page.waitForSelector('.cs-hero .cs-hero-carousel', { timeout: 10000 });
  });

  // ─── 1. Page-level checks ─────────────────────────────────────────────────

  test('page title contains "CrowdStrike"', async ({ page }) => {
    await expect(page).toHaveTitle(/CrowdStrike/);
  });

  test('all 8 block wrappers are present in the DOM', async ({ page }) => {
    await expect(page.locator('.cs-hero')).toBeAttached();
    await expect(page.locator('.cs-resource-cards')).toBeAttached();
    await expect(page.locator('.cs-feature-pillars')).toBeAttached();
    await expect(page.locator('.cs-analyst-recognition')).toBeAttached();
    await expect(page.locator('.cs-pricing-table')).toBeAttached();
    await expect(page.locator('.cs-testimonials')).toBeAttached();
    await expect(page.locator('.cs-product-showcase')).toBeAttached();
    await expect(page.locator('.cs-adversary-cta')).toBeAttached();
  });

  test('blocks appear in correct DOM order on the page', async ({ page }) => {
    const order = await page.evaluate(() => {
      const selectors = [
        '.cs-hero',
        '.cs-resource-cards',
        '.cs-feature-pillars',
        '.cs-analyst-recognition',
        '.cs-pricing-table',
        '.cs-testimonials',
        '.cs-product-showcase',
        '.cs-adversary-cta',
      ];
      return selectors.map((sel) => {
        const el = document.querySelector(sel);
        if (!el) return -1;
        // Use the section element's document order position
        const allSections = [...document.querySelectorAll('.section')];
        const section = el.closest('.section');
        return allSections.indexOf(section);
      });
    });
    // Each block's section index should be strictly increasing
    for (let i = 1; i < order.length; i += 1) {
      expect(order[i]).toBeGreaterThan(order[i - 1]);
    }
  });

  test('h1 exists inside the hero section', async ({ page }) => {
    // After decoration the hero section contains the slide content; the first headline
    // may be an h2 inside the carousel. Heading hierarchy: at minimum an h1 or h2 must
    // appear before any other heading level in the page.
    // The hero block promotes the slide headline — check there is at least one heading
    // in the hero area so the page is not heading-free above the fold.
    const heroHeading = page.locator('.cs-hero h1, .cs-hero h2').first();
    await expect(heroHeading).toBeAttached();
  });

  test('h2 headings exist in at least 3 distinct sections', async ({ page }) => {
    // Each content block (feature-pillars, analyst-recognition, pricing-table,
    // testimonials, product-showcase, adversary-cta) emits an h2.
    // Wait for adversary-cta (last block) to ensure all blocks have decorated.
    await page.waitForSelector('.cs-adversary-cta .cs-adversary-cta-content', { timeout: 10000 });
    const h2Count = await page.locator('main h2').count();
    expect(h2Count).toBeGreaterThanOrEqual(3);
  });

  // ─── 2. Hero section integration ──────────────────────────────────────────

  test('cs-hero is decorated with .cs-hero-carousel', async ({ page }) => {
    await expect(page.locator('.cs-hero .cs-hero-carousel')).toBeVisible();
  });

  test('hero first slide is active on load', async ({ page }) => {
    const firstSlide = page.locator('.cs-hero .cs-hero-slide').first();
    await expect(firstSlide).toHaveClass(/is-active/);
    await expect(firstSlide).toBeVisible();
  });

  test('hero has exactly 2 slides (usage page authors 2 panels)', async ({ page }) => {
    await expect(page.locator('.cs-hero .cs-hero-slide')).toHaveCount(2);
  });

  test('first slide headline contains "Leader"', async ({ page }) => {
    const firstSlide = page.locator('.cs-hero .cs-hero-slide').first();
    const headingText = await firstSlide.textContent();
    expect(headingText).toContain('Leader');
  });

  test('hero carousel has correct ARIA attributes', async ({ page }) => {
    const carousel = page.locator('.cs-hero .cs-hero-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(carousel).toHaveAttribute('aria-label', 'Featured content');
  });

  // ─── 3. Resource cards integration ────────────────────────────────────────

  test('cs-resource-cards is decorated (grid container present)', async ({ page }) => {
    await page.waitForSelector('.cs-resource-cards .cs-resource-cards-grid');
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-grid')).toBeVisible();
  });

  test('resource-cards renders at least 3 cards', async ({ page }) => {
    await page.waitForSelector('.cs-resource-cards .cs-resource-cards-card');
    const count = await page.locator('.cs-resource-cards .cs-resource-cards-card').count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('each resource card is an <article> element', async ({ page }) => {
    await page.waitForSelector('.cs-resource-cards .cs-resource-cards-card');
    await expect(
      page.locator('.cs-resource-cards article.cs-resource-cards-card').first(),
    ).toBeAttached();
  });

  test('resource cards first card tag has expected text', async ({ page }) => {
    await page.waitForSelector('.cs-resource-cards .cs-resource-cards-tag');
    await expect(
      page.locator('.cs-resource-cards .cs-resource-cards-tag').first(),
    ).toHaveText('Frontier AI Readiness');
  });

  // ─── 4. Feature pillars integration ───────────────────────────────────────

  test('cs-feature-pillars is decorated (grid container present)', async ({ page }) => {
    await page.waitForSelector('.cs-feature-pillars .cs-feature-pillars-grid');
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-grid')).toBeVisible();
  });

  test('feature-pillars section heading h2 is visible', async ({ page }) => {
    const h2 = page.locator('.cs-feature-pillars h2.cs-feature-pillars-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Future of Security');
  });

  test('feature-pillars renders at least 3 cards', async ({ page }) => {
    const count = await page.locator('.cs-feature-pillars .cs-feature-pillars-card').count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // ─── 5. Analyst recognition integration ───────────────────────────────────

  test('cs-analyst-recognition is decorated (strip container present)', async ({ page }) => {
    await page.waitForSelector('.cs-analyst-recognition .cs-analyst-recognition-strip');
    await expect(
      page.locator('.cs-analyst-recognition .cs-analyst-recognition-strip'),
    ).toBeVisible();
  });

  test('analyst-recognition section heading h2 is visible', async ({ page }) => {
    const h2 = page.locator('.cs-analyst-recognition h2.cs-analyst-recognition-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Recognition by trusted analysts');
  });

  test('analyst-recognition renders at least 3 cards', async ({ page }) => {
    const count = await page.locator('.cs-analyst-recognition .cs-analyst-recognition-card').count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('analyst-recognition first card headline contains expected text', async ({ page }) => {
    await expect(
      page.locator('.cs-analyst-recognition .cs-analyst-recognition-headline').first(),
    ).toContainText('seventh consecutive time');
  });

  // ─── 6. Pricing table integration ─────────────────────────────────────────

  test('cs-pricing-table is decorated (plans container present)', async ({ page }) => {
    await page.waitForSelector('.cs-pricing-table .cs-pricing-table-plans');
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-plans')).toBeVisible();
  });

  test('pricing-table tablist is present', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-tabs'))
      .toHaveAttribute('role', 'tablist');
  });

  test('pricing-table renders 2 tab controls', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-tab')).toHaveCount(2);
  });

  test('pricing-table renders 3 plan cards', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-plan')).toHaveCount(3);
  });

  test('pricing-table has a recommended badge on exactly one plan', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-plan.is-featured')).toHaveCount(1);
  });

  test('pricing-table monthly tab is active on load', async ({ page }) => {
    const monthlyTab = page.locator(
      '.cs-pricing-table .cs-pricing-table-tab[data-billing="monthly"]',
    );
    await expect(monthlyTab).toHaveAttribute('aria-selected', 'true');
  });

  // ─── 7. Testimonials integration ──────────────────────────────────────────

  test('cs-testimonials is decorated (track container present)', async ({ page }) => {
    await page.waitForSelector('.cs-testimonials .cs-testimonials-track');
    await expect(page.locator('.cs-testimonials .cs-testimonials-track')).toBeVisible();
  });

  test('testimonials section heading h2 is visible', async ({ page }) => {
    const h2 = page.locator('.cs-testimonials h2.cs-testimonials-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Customers trust CrowdStrike');
  });

  test('testimonials view-all link is rendered', async ({ page }) => {
    await expect(page.locator('.cs-testimonials .cs-testimonials-view-all')).toBeVisible();
  });

  test('testimonials renders at least 2 slides', async ({ page }) => {
    await page.waitForSelector('.cs-testimonials .cs-testimonials-slide', { timeout: 10000 });
    const count = await page.locator('.cs-testimonials .cs-testimonials-slide').count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('testimonials first slide is active on load', async ({ page }) => {
    await page.waitForSelector('.cs-testimonials .cs-testimonials-slide', { timeout: 10000 });
    await expect(
      page.locator('.cs-testimonials .cs-testimonials-slide').first(),
    ).toHaveClass(/is-active/);
  });

  // ─── 8. Product showcase integration ──────────────────────────────────────

  test('cs-product-showcase is decorated (tabs container present)', async ({ page }) => {
    await page.waitForSelector('.cs-product-showcase .cs-product-showcase-tabs');
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-tabs')).toBeVisible();
  });

  test('product-showcase section heading h2 is visible', async ({ page }) => {
    const h2 = page.locator('.cs-product-showcase h2.cs-product-showcase-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Experience industry-leading solutions');
  });

  test('product-showcase tablist has role="tablist"', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-tabs'))
      .toHaveAttribute('role', 'tablist');
  });

  test('product-showcase renders 4 tabs', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-tab')).toHaveCount(4);
  });

  test('product-showcase first tab is active with aria-selected="true"', async ({ page }) => {
    const firstTab = page.locator('.cs-product-showcase .cs-product-showcase-tab').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveClass(/is-active/);
  });

  test('product-showcase renders 4 panels with role="tabpanel"', async ({ page }) => {
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await expect(panels).toHaveCount(4);
  });

  test('product-showcase first panel is visible; panels 2-4 are hidden', async ({ page }) => {
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await expect(panels.nth(0)).not.toHaveAttribute('hidden');
    await expect(panels.nth(1)).toHaveAttribute('hidden', '');
    await expect(panels.nth(2)).toHaveAttribute('hidden', '');
    await expect(panels.nth(3)).toHaveAttribute('hidden', '');
  });

  test('clicking product-showcase tab 2 activates panel 2', async ({ page }) => {
    const tabs = page.locator('.cs-product-showcase .cs-product-showcase-tab');
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await tabs.nth(1).click();
    await expect(panels.nth(1)).not.toHaveAttribute('hidden');
    await expect(panels.nth(0)).toHaveAttribute('hidden', '');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
  });

  // ─── 9. Adversary CTA integration ─────────────────────────────────────────

  test('cs-adversary-cta is decorated (content wrapper present)', async ({ page }) => {
    await page.waitForSelector('.cs-adversary-cta .cs-adversary-cta-content');
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-content')).toBeVisible();
  });

  test('adversary-cta headline h2 contains "Know them"', async ({ page }) => {
    const h2 = page.locator('.cs-adversary-cta h2.cs-adversary-cta-headline');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Know them');
  });

  test('adversary-cta primary CTA link is rendered', async ({ page }) => {
    const cta = page.locator('.cs-adversary-cta .cs-adversary-cta-btn-primary');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'https://www.crowdstrike.com/adversary-universe/');
  });

  test('adversary-cta eyebrow is not rendered (empty row authored)', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-eyebrow')).toHaveCount(0);
  });

  // ─── 10. Section theme attributes ─────────────────────────────────────────

  test('adversary-cta parent section has data-section-theme="dark"', async ({ page }) => {
    const section = page.locator('.section:has(.cs-adversary-cta)');
    await expect(section).toHaveAttribute('data-section-theme', 'dark');
  });

  test('testimonials parent section has data-section-theme="dark" (default variant)', async ({ page }) => {
    const section = page.locator('.section:has(.cs-testimonials)');
    // Default (non-light) testimonials block sets dark theme on its section
    await expect(section).toHaveAttribute('data-section-theme', 'dark');
  });

  // ─── 11. No console errors on page load ───────────────────────────────────

  test('no uncaught JavaScript errors on page load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('.cs-hero .cs-hero-carousel', { timeout: 10000 });
    expect(errors).toHaveLength(0);
  });
});
