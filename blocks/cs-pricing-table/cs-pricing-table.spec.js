/**
 * cs-pricing-table block spec.
 * Drives tests/cs-homepage-test.html.
 * Test HTML has: heading+subtitle, monthly/annual tabs, 3 plans (Free Trial, Security
 * Essentials, Enhanced Protection), 3 feature rows, recommended flag on 3rd plan.
 *
 * Asserts:
 *   - Heading and subtitle rendered
 *   - Tab controls have role="tab" inside role="tablist"
 *   - Monthly tab is active on load; aria-selected="true"
 *   - Exactly 3 plan cards rendered
 *   - Plan names visible
 *   - Monthly prices visible on load; annual prices hidden
 *   - Clicking annual tab hides monthly prices and shows annual prices
 *   - "Recommended" badge visible on the third plan
 *   - Feature list items rendered with included/excluded states
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-pricing-table block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-pricing-table .cs-pricing-table-plans');
  });

  test('section heading is rendered', async ({ page }) => {
    const h2 = page.locator('.cs-pricing-table h2.cs-pricing-table-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Tailored bundles');
  });

  test('subtitle is rendered', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-subtitle')).toBeVisible();
  });

  test('tablist container has role="tablist"', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-tabs'))
      .toHaveAttribute('role', 'tablist');
  });

  test('2 tab buttons with role="tab" are rendered', async ({ page }) => {
    const tabs = page.locator('.cs-pricing-table .cs-pricing-table-tab');
    await expect(tabs).toHaveCount(2);
    await expect(tabs.nth(0)).toHaveAttribute('role', 'tab');
    await expect(tabs.nth(1)).toHaveAttribute('role', 'tab');
  });

  test('monthly tab is active on load with aria-selected="true"', async ({ page }) => {
    const monthlyTab = page.locator('.cs-pricing-table .cs-pricing-table-tab[data-billing="monthly"]');
    await expect(monthlyTab).toHaveAttribute('aria-selected', 'true');
    await expect(monthlyTab).toHaveClass(/is-active/);
  });

  test('annual tab has aria-selected="false" on load', async ({ page }) => {
    const annualTab = page.locator('.cs-pricing-table .cs-pricing-table-tab[data-billing="annual"]');
    await expect(annualTab).toHaveAttribute('aria-selected', 'false');
    await expect(annualTab).not.toHaveClass(/is-active/);
  });

  test('exactly 3 plan cards are rendered', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-plan')).toHaveCount(3);
  });

  test('plan names are correct', async ({ page }) => {
    const names = page.locator('.cs-pricing-table .cs-pricing-table-plan-name');
    await expect(names.nth(0)).toHaveText('Free Trial');
    await expect(names.nth(1)).toHaveText('Security Essentials');
    await expect(names.nth(2)).toHaveText('Enhanced Protection');
  });

  test('monthly prices visible on load', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-monthly').first())
      .not.toHaveClass(/hidden/);
  });

  test('annual prices hidden on load', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-annual').first())
      .toHaveClass(/hidden/);
  });

  test('clicking annual tab shows annual prices and hides monthly prices', async ({ page }) => {
    const annualTab = page.locator('.cs-pricing-table .cs-pricing-table-tab[data-billing="annual"]');
    await annualTab.click();
    await expect(page.locator('.cs-pricing-table .cs-pricing-annual').first())
      .not.toHaveClass(/hidden/);
    await expect(page.locator('.cs-pricing-table .cs-pricing-monthly').first())
      .toHaveClass(/hidden/);
    await expect(annualTab).toHaveAttribute('aria-selected', 'true');
    await expect(annualTab).toHaveClass(/is-active/);
  });

  test('clicking back to monthly tab shows monthly prices again', async ({ page }) => {
    const annualTab = page.locator('.cs-pricing-table .cs-pricing-table-tab[data-billing="annual"]');
    const monthlyTab = page.locator('.cs-pricing-table .cs-pricing-table-tab[data-billing="monthly"]');
    await annualTab.click();
    await monthlyTab.click();
    await expect(page.locator('.cs-pricing-table .cs-pricing-monthly').first())
      .not.toHaveClass(/hidden/);
  });

  test('recommended badge appears on the third plan only', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-plan.is-featured')).toHaveCount(1);
    await expect(
      page.locator('.cs-pricing-table .cs-pricing-table-plan.is-featured .cs-pricing-table-badge'),
    ).toHaveText('Recommended');
  });

  test('9 feature items rendered (3 plans × 3 features)', async ({ page }) => {
    const included = page.locator('.cs-pricing-table .cs-pricing-table-feature.is-included');
    const excluded = page.locator('.cs-pricing-table .cs-pricing-table-feature.is-excluded');
    const total = (await included.count()) + (await excluded.count());
    expect(total).toBe(9);
  });

  test('feature icon spans have aria-hidden="true"', async ({ page }) => {
    const firstIcon = page.locator('.cs-pricing-table .cs-pricing-table-feature-icon').first();
    await expect(firstIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('CTA links rendered in each plan', async ({ page }) => {
    await expect(page.locator('.cs-pricing-table .cs-pricing-table-cta')).toHaveCount(3);
  });
});
