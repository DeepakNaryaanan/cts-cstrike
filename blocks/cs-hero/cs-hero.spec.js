/**
 * cs-hero block spec.
 * Drives tests/cs-homepage-test.html (served at /cs-homepage-test by the AEM CLI).
 *
 * Asserts:
 *   - Carousel container has correct ARIA roles and labels
 *   - First slide is visible on load; inactive slides are hidden
 *   - Dot navigation: correct count, aria-labels, aria-current on first dot
 *   - Arrow buttons: prev/next present with aria-labels and keyboard focusable
 *   - Clicking next dot activates slide 2 and updates aria-current
 *   - CTA button rendered inside first slide
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const PAGE = '/tests/cs-homepage-test';

test.describe('cs-hero block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
    await page.waitForSelector('.cs-hero-carousel');
  });

  test('carousel container has aria-roledescription="carousel" and aria-label', async ({ page }) => {
    const carousel = page.locator('.cs-hero-carousel');
    await expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(carousel).toHaveAttribute('aria-label', 'Featured content');
  });

  test('first slide is visible on load and has role="group"', async ({ page }) => {
    const firstSlide = page.locator('.cs-hero-slide').first();
    await expect(firstSlide).toHaveClass(/is-active/);
    await expect(firstSlide).toBeVisible();
    await expect(firstSlide).toHaveAttribute('role', 'group');
    await expect(firstSlide).toHaveAttribute('aria-roledescription', 'slide');
  });

  test('test HTML has 2 slides; only the first is active', async ({ page }) => {
    const slides = page.locator('.cs-hero-slide');
    await expect(slides).toHaveCount(2);
    await expect(slides.nth(0)).toHaveClass(/is-active/);
    await expect(slides.nth(1)).not.toHaveClass(/is-active/);
  });

  test('dot count equals slide count', async ({ page }) => {
    const dots = page.locator('.cs-hero-dot');
    const slides = page.locator('.cs-hero-slide');
    const slideCount = await slides.count();
    await expect(dots).toHaveCount(slideCount);
  });

  test('first dot has aria-label="Go to slide 1"', async ({ page }) => {
    await expect(page.locator('.cs-hero-dot').nth(0)).toHaveAttribute('aria-label', 'Go to slide 1');
  });

  test('second dot has aria-label="Go to slide 2"', async ({ page }) => {
    await expect(page.locator('.cs-hero-dot').nth(1)).toHaveAttribute('aria-label', 'Go to slide 2');
  });

  test('first dot has aria-current="true"; second dot does not', async ({ page }) => {
    await expect(page.locator('.cs-hero-dot').nth(0)).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('.cs-hero-dot').nth(1)).not.toHaveAttribute('aria-current');
  });

  test('prev arrow button has aria-label="Previous slide"', async ({ page }) => {
    await expect(page.locator('.cs-hero-arrow-prev')).toHaveAttribute('aria-label', 'Previous slide');
  });

  test('next arrow button has aria-label="Next slide"', async ({ page }) => {
    await expect(page.locator('.cs-hero-arrow-next')).toHaveAttribute('aria-label', 'Next slide');
  });

  test('clicking next dot activates slide 2 and updates aria-current', async ({ page }) => {
    const dots = page.locator('.cs-hero-dot');
    const slides = page.locator('.cs-hero-slide');
    await dots.nth(1).click();
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
    await expect(dots.nth(0)).not.toHaveAttribute('aria-current');
    await expect(slides.nth(0)).not.toHaveClass(/is-active/);
  });

  test('clicking next arrow advances to slide 2', async ({ page }) => {
    const slides = page.locator('.cs-hero-slide');
    await page.locator('.cs-hero-arrow-next').click();
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await expect(slides.nth(0)).not.toHaveClass(/is-active/);
  });

  test('CTA link is rendered inside the active slide', async ({ page }) => {
    const cta = page.locator('.cs-hero-slide.is-active .cs-hero-slide-ctas a').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href');
  });

  test('dot navigation element has aria-label="Slide navigation"', async ({ page }) => {
    await expect(page.locator('.cs-hero-dots')).toHaveAttribute('aria-label', 'Slide navigation');
  });
});
