/**
 * cs-feature-pillars block spec.
 * Drives tests/cs-homepage-test.html.
 * The test HTML uses the no-icon variant (3 rows per card: headline, body, empty-cta).
 *
 * Asserts:
 *   - Intro section heading is an h2 with correct text
 *   - Intro paragraph rendered and non-empty
 *   - Grid container rendered
 *   - Exactly 3 pillar cards rendered
 *   - Each card has an h3 title and a body paragraph
 *   - No icon containers present (no-icon variant)
 *   - Grid uses CSS Grid layout
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-feature-pillars block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-feature-pillars .cs-feature-pillars-grid');
  });

  test('section heading is an h2 with correct text', async ({ page }) => {
    const h2 = page.locator('.cs-feature-pillars h2.cs-feature-pillars-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toHaveText('The Future of Security Starts Here');
  });

  test('intro paragraph is rendered and non-empty', async ({ page }) => {
    const intro = page.locator('.cs-feature-pillars .cs-feature-pillars-intro-text');
    await expect(intro).toBeVisible();
    await expect(intro).toContainText('AI era');
  });

  test('grid container is rendered', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-grid')).toBeVisible();
  });

  test('renders exactly 3 pillar cards', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card')).toHaveCount(3);
  });

  test('renders exactly 3 card title h3 elements', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card-title')).toHaveCount(3);
  });

  test('first card title text is correct', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card-title').first())
      .toHaveText('Accelerate the SOC with AI');
  });

  test('second card title text is correct', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card-title').nth(1))
      .toHaveText('Stop AI-accelerated adversaries');
  });

  test('third card title text is correct', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card-title').nth(2))
      .toHaveText('Accelerate secure AI adoption and innovation');
  });

  test('renders exactly 3 card body paragraphs', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-card-body')).toHaveCount(3);
  });

  test('first card body is non-empty', async ({ page }) => {
    const text = await page.locator('.cs-feature-pillars .cs-feature-pillars-card-body').first()
      .textContent();
    expect(text?.trim()).toBeTruthy();
  });

  test('no icon containers rendered (no-icon variant)', async ({ page }) => {
    await expect(page.locator('.cs-feature-pillars .cs-feature-pillars-icon')).toHaveCount(0);
  });

  test('grid uses CSS Grid layout', async ({ page }) => {
    const display = await page.locator('.cs-feature-pillars .cs-feature-pillars-grid')
      .evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('grid');
  });
});
