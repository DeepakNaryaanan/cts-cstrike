/**
 * cs-resource-cards block spec.
 * Drives tests/cs-homepage-test.html.
 * The test HTML uses the no-image variant (3 rows per card: tag, headline-link, desc).
 *
 * Asserts:
 *   - Grid container is rendered inside .cs-resource-cards
 *   - Correct number of cards rendered (3)
 *   - Each card is an <article> element
 *   - Each card has a category tag span with slugified class
 *   - Each card has an h3 with an anchor link and valid href
 *   - Grid uses CSS Grid layout
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-resource-cards block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-resource-cards .cs-resource-cards-grid');
  });

  test('grid container is rendered inside .cs-resource-cards', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-grid')).toBeVisible();
  });

  test('renders exactly 3 cards', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-card')).toHaveCount(3);
  });

  test('each card is rendered as an <article>', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards article.cs-resource-cards-card')).toHaveCount(3);
  });

  test('renders exactly 3 category tags', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-tag')).toHaveCount(3);
  });

  test('first card tag has correct text', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-tag').first())
      .toHaveText('Frontier AI Readiness');
  });

  test('second card tag has correct text', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-tag').nth(1))
      .toHaveText('White Paper');
  });

  test('third card tag has correct text', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-tag').nth(2))
      .toHaveText('Counter Adversary Operations');
  });

  test('first tag has slugified CSS class', async ({ page }) => {
    const cls = await page.locator('.cs-resource-cards .cs-resource-cards-tag').first()
      .getAttribute('class');
    expect(cls).toContain('tag-frontier-ai-readiness');
  });

  test('renders exactly 3 headline h3 elements', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-card-headline')).toHaveCount(3);
  });

  test('first headline link has a valid href', async ({ page }) => {
    const href = await page.locator('.cs-resource-cards .cs-resource-cards-card-headline a').first()
      .getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);
  });

  test('first headline link points to expected URL', async ({ page }) => {
    await expect(page.locator('.cs-resource-cards .cs-resource-cards-card-headline a').first())
      .toHaveAttribute('href', 'https://www.crowdstrike.com/blog/frontier-ai-readiness/');
  });

  test('headline links are keyboard-focusable', async ({ page }) => {
    await expect(
      page.locator('.cs-resource-cards .cs-resource-cards-card-headline a').first(),
    ).not.toHaveAttribute('tabindex', '-1');
  });

  test('grid has CSS Grid display property', async ({ page }) => {
    const display = await page.locator('.cs-resource-cards .cs-resource-cards-grid')
      .evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('grid');
  });
});
