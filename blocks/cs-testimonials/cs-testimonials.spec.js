/**
 * cs-testimonials block spec.
 * Drives tests/cs-homepage-test.html.
 * Test HTML has: header row (heading + view-all link), then 3 testimonials (4 rows each).
 *
 * Asserts:
 *   - Section heading h2 rendered with correct text
 *   - View-all link rendered with correct href
 *   - Carousel track has aria-roledescription="carousel" and aria-label
 *   - Exactly 3 slides rendered
 *   - Each slide has role="group" and aria-roledescription="slide"
 *   - First slide is active and visible; others not
 *   - Active slide contains a blockquote with quote text
 *   - Attribution splits name into <strong> and role+company into <span>
 *   - CTA link rendered in active slide
 *   - Dot navigation: 3 dots, correct aria-labels, first dot has aria-current="true"
 *   - Clicking second dot activates second testimonial
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-testimonials block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-testimonials .cs-testimonials-track');
  });

  test('section heading h2 contains expected text', async ({ page }) => {
    const h2 = page.locator('.cs-testimonials h2.cs-testimonials-heading');
    await expect(h2).toBeVisible();
    await expect(h2).toContainText('Customers trust CrowdStrike');
  });

  test('view-all link is rendered with correct href', async ({ page }) => {
    const link = page.locator('.cs-testimonials .cs-testimonials-view-all');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://www.crowdstrike.com/en-us/customers/');
  });

  test('carousel track has aria-roledescription="carousel"', async ({ page }) => {
    const track = page.locator('.cs-testimonials .cs-testimonials-track');
    await expect(track).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(track).toHaveAttribute('aria-label', 'Customer testimonials');
  });

  test('exactly 3 slides rendered', async ({ page }) => {
    await expect(page.locator('.cs-testimonials .cs-testimonials-slide')).toHaveCount(3);
  });

  test('first slide has role="group" and aria-roledescription="slide"', async ({ page }) => {
    const firstSlide = page.locator('.cs-testimonials .cs-testimonials-slide').first();
    await expect(firstSlide).toHaveAttribute('role', 'group');
    await expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
  });

  test('first slide is active on load', async ({ page }) => {
    await expect(page.locator('.cs-testimonials .cs-testimonials-slide').first())
      .toHaveClass(/is-active/);
  });

  test('slides 2 and 3 are not active on load', async ({ page }) => {
    await expect(page.locator('.cs-testimonials .cs-testimonials-slide').nth(1))
      .not.toHaveClass(/is-active/);
    await expect(page.locator('.cs-testimonials .cs-testimonials-slide').nth(2))
      .not.toHaveClass(/is-active/);
  });

  test('active slide contains a blockquote with quote text', async ({ page }) => {
    const blockquote = page.locator(
      '.cs-testimonials .cs-testimonials-slide.is-active blockquote.cs-testimonials-quote',
    );
    await expect(blockquote).toBeVisible();
    const text = await blockquote.locator('p').textContent();
    expect(text?.trim()).toBeTruthy();
  });

  test('attribution renders name in <strong> and role in <span>', async ({ page }) => {
    const attr = page.locator(
      '.cs-testimonials .cs-testimonials-slide.is-active .cs-testimonials-attribution',
    );
    await expect(attr.locator('strong')).toHaveText('David Anderson');
    const roleText = await attr.locator('span').textContent();
    expect(roleText).toContain('Deputy CISO');
  });

  test('first slide CTA link has correct href', async ({ page }) => {
    await expect(
      page.locator('.cs-testimonials .cs-testimonials-slide.is-active .cs-testimonials-cta'),
    ).toHaveAttribute('href', 'https://www.crowdstrike.com/en-us/customers/travel-leisure/');
  });

  test('3 dot buttons with correct aria-labels', async ({ page }) => {
    const dots = page.locator('.cs-testimonials .cs-testimonials-dot');
    await expect(dots).toHaveCount(3);
    await expect(dots.nth(0)).toHaveAttribute('aria-label', 'Go to testimonial 1');
    await expect(dots.nth(1)).toHaveAttribute('aria-label', 'Go to testimonial 2');
    await expect(dots.nth(2)).toHaveAttribute('aria-label', 'Go to testimonial 3');
  });

  test('first dot has aria-current="true"; second and third do not', async ({ page }) => {
    await expect(page.locator('.cs-testimonials .cs-testimonials-dot').nth(0))
      .toHaveAttribute('aria-current', 'true');
    await expect(page.locator('.cs-testimonials .cs-testimonials-dot').nth(1))
      .not.toHaveAttribute('aria-current');
    await expect(page.locator('.cs-testimonials .cs-testimonials-dot').nth(2))
      .not.toHaveAttribute('aria-current');
  });

  test('clicking second dot activates second testimonial', async ({ page }) => {
    const dots = page.locator('.cs-testimonials .cs-testimonials-dot');
    const slides = page.locator('.cs-testimonials .cs-testimonials-slide');
    await dots.nth(1).click();
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await expect(slides.nth(0)).not.toHaveClass(/is-active/);
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    await expect(dots.nth(0)).not.toHaveAttribute('aria-current');
  });
});
