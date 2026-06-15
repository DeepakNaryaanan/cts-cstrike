/**
 * cs-adversary-cta block spec.
 * Drives tests/cs-homepage-test.html.
 * Test HTML has: empty eyebrow, headline, body text, primary CTA, empty secondary CTA.
 *
 * Asserts:
 *   - Content wrapper, text group, and actions group rendered
 *   - h2 headline rendered with correct text
 *   - Body text paragraph rendered with expected content
 *   - Primary CTA link rendered with correct href and label
 *   - Secondary CTA not rendered (empty row in test HTML)
 *   - Empty eyebrow row does not produce an eyebrow element
 *   - data-section-theme="dark" set on parent section (default variant)
 *   - CTA link is keyboard-focusable
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-adversary-cta block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-adversary-cta .cs-adversary-cta-content');
  });

  test('content wrapper is rendered', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-content')).toBeVisible();
  });

  test('text group is rendered', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-text')).toBeVisible();
  });

  test('actions group is rendered', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-actions')).toBeVisible();
  });

  test('headline h2 rendered with correct text', async ({ page }) => {
    const h2 = page.locator('.cs-adversary-cta h2.cs-adversary-cta-headline');
    await expect(h2).toBeVisible();
    await expect(h2).toHaveText('Know them. Find them. Stop them.');
  });

  test('body paragraph rendered with expected content', async ({ page }) => {
    const body = page.locator('.cs-adversary-cta .cs-adversary-cta-body');
    await expect(body).toBeVisible();
    await expect(body).toContainText('Adversaries are operating');
  });

  test('primary CTA link rendered with correct href', async ({ page }) => {
    const cta = page.locator('.cs-adversary-cta .cs-adversary-cta-btn-primary');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'https://www.crowdstrike.com/adversary-universe/');
  });

  test('primary CTA link has correct text', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-btn-primary'))
      .toContainText('Explore Adversary Universe');
  });

  test('secondary CTA not rendered (empty row authored)', async ({ page }) => {
    // Empty CTA row (row 4) has no link, so no secondary button rendered
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-btn-secondary')).toHaveCount(0);
  });

  test('eyebrow not rendered when row 0 is empty', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-eyebrow')).toHaveCount(0);
  });

  test('parent section has data-section-theme="dark"', async ({ page }) => {
    const section = page.locator('.section:has(.cs-adversary-cta)');
    await expect(section).toHaveAttribute('data-section-theme', 'dark');
  });

  test('primary CTA link is keyboard-focusable', async ({ page }) => {
    await expect(page.locator('.cs-adversary-cta .cs-adversary-cta-btn-primary'))
      .not.toHaveAttribute('tabindex', '-1');
  });
});
