/**
 * cs-product-showcase block spec.
 * Drives tests/cs-homepage-test.html.
 * Test HTML has: section heading + 4 tab/panel groups (5 rows each).
 *
 * Asserts:
 *   - Section heading h2 rendered
 *   - Tablist container has role="tablist"
 *   - Exactly 4 tabs with role="tab"
 *   - First tab active (aria-selected="true", is-active class); others not
 *   - Exactly 4 panels with role="tabpanel"
 *   - First panel visible; panels 2-4 hidden
 *   - Tab id/aria-controls and panel id/aria-labelledby match for each pair
 *   - Clicking tab 2 shows panel 2 and hides panel 1
 *   - Each panel has headline h3, description p, and CTA link
 *   - Tab labels match authored content
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-product-showcase block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-product-showcase .cs-product-showcase-tabs');
  });

  test('section heading h2 is rendered', async ({ page }) => {
    const h2 = page.locator('.cs-product-showcase h2.cs-product-showcase-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Experience industry-leading solutions');
  });

  test('tablist has role="tablist"', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-tabs'))
      .toHaveAttribute('role', 'tablist');
  });

  test('exactly 4 tab buttons with role="tab"', async ({ page }) => {
    const tabs = page.locator('.cs-product-showcase .cs-product-showcase-tab');
    await expect(tabs).toHaveCount(4);
    await expect(tabs.nth(0)).toHaveAttribute('role', 'tab');
    await expect(tabs.nth(1)).toHaveAttribute('role', 'tab');
    await expect(tabs.nth(2)).toHaveAttribute('role', 'tab');
    await expect(tabs.nth(3)).toHaveAttribute('role', 'tab');
  });

  test('first tab is active with aria-selected="true"', async ({ page }) => {
    const firstTab = page.locator('.cs-product-showcase .cs-product-showcase-tab').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
    await expect(firstTab).toHaveClass(/is-active/);
  });

  test('tabs 2-4 have aria-selected="false" on load', async ({ page }) => {
    const tabs = page.locator('.cs-product-showcase .cs-product-showcase-tab');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'false');
  });

  test('exactly 4 panels with role="tabpanel"', async ({ page }) => {
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await expect(panels).toHaveCount(4);
    await expect(panels.nth(0)).toHaveAttribute('role', 'tabpanel');
    await expect(panels.nth(1)).toHaveAttribute('role', 'tabpanel');
    await expect(panels.nth(2)).toHaveAttribute('role', 'tabpanel');
    await expect(panels.nth(3)).toHaveAttribute('role', 'tabpanel');
  });

  test('first panel is visible (no hidden attribute)', async ({ page }) => {
    const firstPanel = page.locator('.cs-product-showcase .cs-product-showcase-panel').first();
    await expect(firstPanel).not.toHaveAttribute('hidden');
    await expect(firstPanel).toBeVisible();
  });

  test('panels 2-4 are hidden on load', async ({ page }) => {
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await expect(panels.nth(1)).toHaveAttribute('hidden', '');
    await expect(panels.nth(2)).toHaveAttribute('hidden', '');
    await expect(panels.nth(3)).toHaveAttribute('hidden', '');
  });

  test('tab 0 id and panel 0 aria-labelledby match', async ({ page }) => {
    const tabId = await page.locator('.cs-product-showcase .cs-product-showcase-tab').nth(0)
      .getAttribute('id');
    const ariaLabelledby = await page.locator('.cs-product-showcase .cs-product-showcase-panel')
      .nth(0).getAttribute('aria-labelledby');
    expect(tabId).toBe('cs-product-showcase-tab-0');
    expect(ariaLabelledby).toBe('cs-product-showcase-tab-0');
  });

  test('tab 0 aria-controls matches panel 0 id', async ({ page }) => {
    const ariaControls = await page.locator('.cs-product-showcase .cs-product-showcase-tab').nth(0)
      .getAttribute('aria-controls');
    const panelId = await page.locator('.cs-product-showcase .cs-product-showcase-panel').nth(0)
      .getAttribute('id');
    expect(ariaControls).toBe('cs-product-showcase-panel-0');
    expect(panelId).toBe('cs-product-showcase-panel-0');
  });

  test('clicking tab 2 shows panel 2 and hides panel 1', async ({ page }) => {
    const tabs = page.locator('.cs-product-showcase .cs-product-showcase-tab');
    const panels = page.locator('.cs-product-showcase .cs-product-showcase-panel');
    await tabs.nth(1).click();
    await expect(panels.nth(1)).not.toHaveAttribute('hidden');
    await expect(panels.nth(0)).toHaveAttribute('hidden', '');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
  });

  test('exactly 4 panel headlines', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-panel-headline'))
      .toHaveCount(4);
  });

  test('exactly 4 panel descriptions', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-panel-desc'))
      .toHaveCount(4);
  });

  test('exactly 4 panel CTA links', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-cta')).toHaveCount(4);
  });

  test('first CTA link href is correct', async ({ page }) => {
    await expect(page.locator('.cs-product-showcase .cs-product-showcase-cta').first())
      .toHaveAttribute('href', 'https://www.crowdstrike.com/platform/ai-security/');
  });

  test('tab labels match authored content', async ({ page }) => {
    const tabs = page.locator('.cs-product-showcase .cs-product-showcase-tab');
    await expect(tabs.nth(0)).toHaveText('Secure your AI');
    await expect(tabs.nth(1)).toHaveText('Secure your cloud');
    await expect(tabs.nth(2)).toHaveText('Stop identity attacks');
    await expect(tabs.nth(3)).toHaveText('The next SOC era');
  });
});
