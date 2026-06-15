/**
 * cs-testimonials block — customer testimonial carousel.
 *
 * Authored DOM (two-column block table):
 *   row 0: section heading | view-all link
 *   row 1: quote text (required — marks card start)
 *   row 2: attribution text
 *   row 3: company logo image (optional)
 *   row 4: "Hear their story" CTA link (optional)
 *   [rows 5+ repeat 4-cell card group]
 *
 * Variants: light, static
 *
 * @module cs-testimonials
 */

/**
 * Parses block rows into header and testimonial card groups.
 * @param {HTMLElement[]} rows
 * @returns {{ headerRow: HTMLElement, cardGroups: HTMLElement[][] }}
 */
function parseRows(rows) {
  const headerRow = rows[0];
  const cardRows = rows.slice(1);
  const groups = [];
  const groupSize = 4;
  for (let i = 0; i < cardRows.length; i += groupSize) {
    groups.push(cardRows.slice(i, i + groupSize));
  }
  return { headerRow, cardGroups: groups };
}

/**
 * Builds a single testimonial slide element.
 * @param {HTMLElement[]} rows
 * @param {number} index
 * @returns {HTMLElement}
 */
function buildSlide(rows, index) {
  const slide = document.createElement('div');
  slide.className = 'cs-testimonials-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  if (index === 0) slide.classList.add('is-active');

  const quoteCell = rows[0]?.firstElementChild;
  if (quoteCell?.textContent.trim()) {
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'cs-testimonials-quote';
    const p = document.createElement('p');
    p.textContent = quoteCell.textContent.trim();
    blockquote.append(p);
    slide.append(blockquote);
  }

  const attributionCell = rows[1]?.firstElementChild;
  if (attributionCell?.textContent.trim()) {
    const attr = document.createElement('div');
    attr.className = 'cs-testimonials-attribution';
    const fullText = attributionCell.textContent.trim();
    const commaIdx = fullText.indexOf(',');
    if (commaIdx !== -1) {
      const name = document.createElement('strong');
      name.textContent = fullText.slice(0, commaIdx).trim();
      const role = document.createElement('span');
      role.textContent = fullText.slice(commaIdx + 1).trim();
      attr.append(name, document.createTextNode(' '), role);
    } else {
      attr.textContent = fullText;
    }
    slide.append(attr);
  }

  const logoCell = rows[2]?.firstElementChild;
  const logoPicture = logoCell?.querySelector('picture');
  if (logoPicture) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'cs-testimonials-logo';
    logoWrap.append(logoPicture);
    slide.append(logoWrap);
  }

  const ctaCell = rows[3]?.firstElementChild;
  const ctaLink = ctaCell?.querySelector('a');
  if (ctaLink) {
    ctaLink.className = 'cs-testimonials-cta';
    slide.append(ctaLink);
  }

  return slide;
}

/**
 * Wires dot navigation for the testimonial carousel.
 * @param {HTMLElement[]} slides
 * @param {HTMLButtonElement[]} dots
 */
function initCarousel(slides, dots) {
  if (slides.length < 2) return;
  let current = 0;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].removeAttribute('aria-current');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

/**
 * Loads and decorates the cs-testimonials block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isLight = block.classList.contains('light');
  const isStatic = block.classList.contains('static');

  if (!isLight) block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const rows = [...block.children];
  const { headerRow, cardGroups } = parseRows(rows);

  // Build header
  const header = document.createElement('div');
  header.className = 'cs-testimonials-header';

  const headingCell = headerRow?.firstElementChild;
  if (headingCell?.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.className = 'cs-testimonials-heading';
    h2.textContent = headingCell.textContent.trim();
    header.append(h2);
  }

  const viewAllCell = [...(headerRow?.children ?? [])][1];
  const viewAllLink = viewAllCell?.querySelector('a');
  if (viewAllLink) {
    viewAllLink.className = 'cs-testimonials-view-all';
    header.append(viewAllLink);
  }

  // Build carousel/grid
  const track = document.createElement('div');
  track.className = isStatic ? 'cs-testimonials-grid' : 'cs-testimonials-track';
  track.setAttribute('aria-roledescription', isStatic ? '' : 'carousel');
  track.setAttribute('aria-label', 'Customer testimonials');

  const slides = cardGroups.map((rows2, i) => buildSlide(rows2, i));
  slides.forEach((s) => track.append(s));

  block.innerHTML = '';
  block.append(header, track);

  if (!isStatic && slides.length > 1) {
    const dotsNav = document.createElement('nav');
    dotsNav.className = 'cs-testimonials-dots';
    dotsNav.setAttribute('aria-label', 'Testimonial navigation');

    const dots = slides.map((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `cs-testimonials-dot${i === 0 ? ' is-active' : ''}`;
      btn.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) btn.setAttribute('aria-current', 'true');
      dotsNav.append(btn);
      return btn;
    });

    block.append(dotsNav);
    initCarousel(slides, dots);
  }
}
