/**
 * cs-hero block — rotating hero carousel.
 *
 * Authored DOM structure (one panel = contiguous rows until an empty row):
 *   row: eyebrow (optional)
 *   row: headline (required)
 *   row: body text (optional)
 *   row: primary CTA | secondary CTA (optional)
 *   row: background image (optional)
 *   [empty row = panel separator]
 *
 * @module cs-hero
 */

/**
 * Splits block rows into slide groups using empty-row separators.
 * @param {HTMLElement} block
 * @returns {HTMLElement[][]} Array of row-element arrays, one per slide.
 */
function groupSlides(block) {
  const groups = [];
  let current = [];
  [...block.children].forEach((row) => {
    const isEmpty = [...row.children].every((cell) => !cell.textContent.trim() && !cell.querySelector('picture, img, a'));
    if (isEmpty) {
      if (current.length) {
        groups.push(current);
        current = [];
      }
    } else {
      current.push(row);
    }
  });
  if (current.length) groups.push(current);
  return groups;
}

/**
 * Builds a slide element from a group of rows.
 * @param {HTMLElement[]} rows
 * @param {number} index - Slide index (0 = first, rendered eagerly)
 * @returns {HTMLElement}
 */
function buildSlide(rows, index) {
  const slide = document.createElement('div');
  slide.className = 'cs-hero-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  if (index === 0) slide.classList.add('is-active');

  const content = document.createElement('div');
  content.className = 'cs-hero-slide-content';

  rows.forEach((row, rowIdx) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    const text = cell.textContent.trim();
    const hasLink = cell.querySelector('a');
    const hasPicture = cell.querySelector('picture');

    if (hasPicture && rowIdx === rows.length - 1) {
      // Background image row (last row of a panel)
      const picture = hasPicture;
      picture.classList.add('cs-hero-slide-bg');
      if (index > 0) picture.querySelector('img')?.setAttribute('loading', 'lazy');
      slide.prepend(picture);
    } else if (hasLink && !text.replace(hasLink.textContent, '').trim()) {
      // CTA row
      const ctaRow = document.createElement('div');
      ctaRow.className = 'cs-hero-slide-ctas';
      [...row.children].forEach((ctaCell, i) => {
        const link = ctaCell.querySelector('a');
        if (!link) return;
        link.className = `button ${i === 0 ? 'primary' : 'secondary'}`;
        ctaRow.append(link);
      });
      content.append(ctaRow);
    } else if (rowIdx === 0 && !hasPicture) {
      // Eyebrow (first text row)
      const eyebrow = document.createElement('p');
      eyebrow.className = 'cs-hero-eyebrow';
      eyebrow.textContent = text;
      content.prepend(eyebrow);
    } else if (content.querySelector('.cs-hero-eyebrow') && !content.querySelector('h1, h2')) {
      // Headline (after eyebrow)
      const h1 = document.createElement('h1');
      h1.innerHTML = cell.innerHTML;
      content.append(h1);
    } else if (!content.querySelector('h1, h2')) {
      // Headline (no eyebrow)
      const h1 = document.createElement('h1');
      h1.innerHTML = cell.innerHTML;
      content.append(h1);
    } else if (!content.querySelector('.cs-hero-body') && !hasLink) {
      // Body
      const body = document.createElement('p');
      body.className = 'cs-hero-body';
      body.innerHTML = cell.innerHTML;
      content.append(body);
    }
  });

  slide.append(content);
  return slide;
}

/**
 * Creates the dot navigation indicators.
 * @param {number} count
 * @returns {{nav: HTMLElement, dots: HTMLButtonElement[]}}
 */
function buildDotNav(count) {
  const nav = document.createElement('nav');
  nav.className = 'cs-hero-dots';
  nav.setAttribute('aria-label', 'Slide navigation');
  const dots = Array.from({ length: count }, (_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cs-hero-dot';
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) {
      btn.classList.add('is-active');
      btn.setAttribute('aria-current', 'true');
    }
    nav.append(btn);
    return btn;
  });
  return { nav, dots };
}

/**
 * Creates the prev/next arrow buttons.
 * @returns {{prev: HTMLButtonElement, next: HTMLButtonElement}}
 */
function buildArrows() {
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'cs-hero-arrow cs-hero-arrow-prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'cs-hero-arrow cs-hero-arrow-next';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  return { prev, next };
}

/**
 * Wires up carousel auto-advance and navigation.
 * @param {HTMLElement[]} slides
 * @param {HTMLButtonElement[]} dots
 * @param {HTMLElement} block
 */
function initCarousel(slides, dots, block) {
  if (slides.length < 2) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].removeAttribute('aria-current');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopTimer(); goTo(i); startTimer(); });
  });

  block.querySelector('.cs-hero-arrow-prev')?.addEventListener('click', () => { stopTimer(); goTo(current - 1); startTimer(); });
  block.querySelector('.cs-hero-arrow-next')?.addEventListener('click', () => { stopTimer(); goTo(current + 1); startTimer(); });

  block.addEventListener('pointerenter', stopTimer);
  block.addEventListener('pointerleave', startTimer);
  block.addEventListener('focusin', stopTimer);
  block.addEventListener('focusout', startTimer);

  startTimer();
}

/**
 * Loads and decorates the cs-hero block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isStatic = block.classList.contains('static');
  const isDark = block.classList.contains('dark');

  if (isDark) block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const slideGroups = groupSlides(block);
  const slides = slideGroups.map((rows, i) => buildSlide(rows, i));

  const carousel = document.createElement('div');
  carousel.className = 'cs-hero-carousel';
  carousel.setAttribute('aria-roledescription', 'carousel');
  carousel.setAttribute('aria-label', 'Featured content');
  slides.forEach((s) => carousel.append(s));

  block.innerHTML = '';
  block.append(carousel);

  if (!isStatic && slides.length > 1) {
    const { nav, dots } = buildDotNav(slides.length);
    const { prev, next } = buildArrows();
    block.append(prev, nav, next);
    initCarousel(slides, dots, block);
  }
}
