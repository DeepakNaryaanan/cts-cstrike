/**
 * cs-hero block — hero carousel.
 *
 * Authored structure (10 rows = 2 slides of 5 rows each):
 *   slide rows: [eyebrow, headline, subtext, cta-link, image]
 *
 * Produces:
 *   .cs-hero-carousel[aria-roledescription="carousel"][aria-label="Featured content"]
 *     .cs-hero-slide[role="group"][aria-roledescription="slide"] × N
 *       .cs-hero-slide-eyebrow
 *       .cs-hero-slide-headline
 *       .cs-hero-slide-subtext
 *       .cs-hero-slide-ctas
 *       .cs-hero-slide-image
 *     .cs-hero-dots[aria-label="Slide navigation"]
 *       button.cs-hero-dot × N
 *     button.cs-hero-arrow-prev
 *     button.cs-hero-arrow-next
 *
 * @module cs-hero
 */

const ROWS_PER_SLIDE = 5;

/**
 * Returns the text content of the first child div inside a row div,
 * or null when the cell is empty.
 * @param {Element} row - A block child row element
 * @returns {string|null}
 */
function cellText(row) {
  const cell = row.querySelector(':scope > div');
  if (!cell) return null;
  const text = cell.textContent.trim();
  return text || null;
}

/**
 * Returns the first anchor element inside a row cell, or null.
 * @param {Element} row - A block child row element
 * @returns {HTMLAnchorElement|null}
 */
function cellLink(row) {
  return row.querySelector('a') || null;
}

/**
 * Returns the first picture/img element inside a row cell, or null.
 * @param {Element} row - A block child row element
 * @returns {Element|null}
 */
function cellPicture(row) {
  return row.querySelector('picture, img') || null;
}

/**
 * Activates the slide at the given index and updates dot aria-current attributes.
 * @param {Element[]} slides - Array of slide elements
 * @param {Element[]} dots - Array of dot button elements
 * @param {number} index - Zero-based slide index to activate
 * @returns {void}
 */
function activateSlide(slides, dots, index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('is-active');
    } else {
      slide.classList.remove('is-active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.removeAttribute('aria-current');
    }
  });
}

/**
 * Builds a single slide element from five consecutive authored rows.
 * @param {Element[]} rows - The five row elements for this slide
 * @param {number} slideIndex - Zero-based index used to set aria-label
 * @returns {Element}
 */
function buildSlide(rows, slideIndex) {
  const [eyebrowRow, headlineRow, subtextRow, ctaRow, imageRow] = rows;

  const slide = document.createElement('div');
  slide.classList.add('cs-hero-slide');
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `Slide ${slideIndex + 1}`);

  const eyebrowText = cellText(eyebrowRow);
  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.classList.add('cs-hero-slide-eyebrow');
    eyebrow.textContent = eyebrowText;
    slide.appendChild(eyebrow);
  }

  const headlineText = cellText(headlineRow);
  if (headlineText) {
    const headline = document.createElement('h1');
    headline.classList.add('cs-hero-slide-headline');
    headline.textContent = headlineText;
    slide.appendChild(headline);
  }

  const subtextText = cellText(subtextRow);
  if (subtextText) {
    const subtext = document.createElement('p');
    subtext.classList.add('cs-hero-slide-subtext');
    subtext.textContent = subtextText;
    slide.appendChild(subtext);
  }

  const ctaAnchor = cellLink(ctaRow);
  if (ctaAnchor) {
    const ctas = document.createElement('div');
    ctas.classList.add('cs-hero-slide-ctas');
    const cloned = ctaAnchor.cloneNode(true);
    cloned.classList.add('button', 'accent');
    ctas.appendChild(cloned);
    slide.appendChild(ctas);
  }

  const picture = cellPicture(imageRow);
  if (picture) {
    const imageWrap = document.createElement('div');
    imageWrap.classList.add('cs-hero-slide-image');
    imageWrap.appendChild(picture.cloneNode(true));
    slide.appendChild(imageWrap);
  }

  return slide;
}

/**
 * Loads and decorates the cs-hero carousel block.
 * @param {Element} block - The block element provided by the EDS runtime
 * @returns {Promise<void>}
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const slideCount = Math.floor(rows.length / ROWS_PER_SLIDE);

  const carousel = document.createElement('div');
  carousel.classList.add('cs-hero-carousel');
  carousel.setAttribute('aria-roledescription', 'carousel');
  carousel.setAttribute('aria-label', 'Featured content');

  const slides = [];
  for (let i = 0; i < slideCount; i += 1) {
    const slideRows = rows.slice(i * ROWS_PER_SLIDE, (i + 1) * ROWS_PER_SLIDE);
    const slide = buildSlide(slideRows, i);
    slides.push(slide);
    carousel.appendChild(slide);
  }

  const dotsNav = document.createElement('div');
  dotsNav.classList.add('cs-hero-dots');
  dotsNav.setAttribute('aria-label', 'Slide navigation');

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('cs-hero-dot');
    dot.setAttribute('type', 'button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dotsNav.appendChild(dot);
    return dot;
  });

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('cs-hero-arrow-prev');
  prevBtn.setAttribute('type', 'button');
  prevBtn.setAttribute('aria-label', 'Previous slide');

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('cs-hero-arrow-next');
  nextBtn.setAttribute('type', 'button');
  nextBtn.setAttribute('aria-label', 'Next slide');

  carousel.appendChild(dotsNav);
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  block.textContent = '';
  block.appendChild(carousel);

  let current = 0;
  activateSlide(slides, dots, current);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      current = i;
      activateSlide(slides, dots, current);
    });
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    activateSlide(slides, dots, current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    activateSlide(slides, dots, current);
  });
}
