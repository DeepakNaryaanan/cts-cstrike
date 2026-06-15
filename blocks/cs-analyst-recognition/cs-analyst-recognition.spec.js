/**
 * cs-analyst-recognition block spec.
 * Drives tests/cs-homepage-test.html.
 * The test HTML has a heading row followed by 3 cards (4 rows each: empty logo, headline,
 * subtitle, CTA).
 *
 * Asserts:
 *   - Section heading h2 is rendered with correct text
 *   - Strip container is rendered
 *   - Exactly 3 analyst cards are rendered
 *   - Each card has an h3 headline
 *   - First card headline contains expected text
 *   - Each card has a CTA link with valid href
 *   - No logo containers rendered when logos are absent
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-analyst-recognition block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-analyst-recognition .cs-analyst-recognition-strip');
  });

  test('section heading h2 is rendered with correct text', async ({ page }) => {
    const h2 = page.locator('.cs-analyst-recognition h2.cs-analyst-recognition-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toHaveText('Recognition by trusted analysts');
  });

  test('strip container is rendered', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-strip'))
      .toBeVisible();
  });

  test('renders exactly 3 analyst cards', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-card'))
      .toHaveCount(3);
  });

  test('renders exactly 3 h3 headlines', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-headline'))
      .toHaveCount(3);
  });

  test('first card headline contains expected text', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-headline').first())
      .toContainText('seventh consecutive time');
  });

  test('second card headline contains expected text', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-headline').nth(1))
      .toContainText('Gartner Magic Quadrant');
  });

  test('third card headline contains expected text', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-headline').nth(2))
      .toContainText('IDC MarketScape');
  });

  test('renders exactly 3 CTA links', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-cta'))
      .toHaveCount(3);
  });

  test('first CTA link has a valid href', async ({ page }) => {
    const href = await page.locator('.cs-analyst-recognition .cs-analyst-recognition-cta').first()
      .getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);
  });

  test('first CTA link points to expected URL', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-cta').first())
      .toHaveAttribute('href', 'https://www.crowdstrike.com/resources/reports/gartner-mq/');
  });

  test('CTA links are keyboard-focusable', async ({ page }) => {
    await expect(
      page.locator('.cs-analyst-recognition .cs-analyst-recognition-cta').first(),
    ).not.toHaveAttribute('tabindex', '-1');
  });

  test('no logo containers rendered when logos are absent', async ({ page }) => {
    await expect(page.locator('.cs-analyst-recognition .cs-analyst-recognition-logo'))
      .toHaveCount(0);
  });
});
