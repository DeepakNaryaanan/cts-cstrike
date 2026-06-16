/**
 * cs-testimonials block
 *
 * Authored row layout:
 *   Row 0  — two-cell header: heading text | view-all anchor
 *   Then, for each testimonial (4 rows per card):
 *     Row N+0 — quote text
 *     Row N+1 — attribution "Name, Role, Company"
 *     Row N+2 — logo (empty in current content)
 *     Row N+3 — CTA anchor
 *
 * @module cs-testimonials
 */

/**
 * Returns trimmed text content from the first cell of a block row.
 *
 * @param {Element} row - A direct child row of the block.
 * @returns {string} Trimmed text, or empty string when cell is absent.
 */
function cellText(row) {
  const cell = row.firstElementChild;
  return cell ? cell.textContent.trim() : '';
}

/**
 * Returns the first anchor found inside a block row, or null.
 *
 * @param {Element} row - A direct child row of the block.
 * @returns {HTMLAnchorElement|null}
 */
function cellAnchor(row) {
  return row.querySelector('a') || null;
}

/**
 * Builds a single testimonial slide element from four authored rows.
 *
 * @param {Element} quoteRow       - Row containing the quote text.
 * @param {Element} attributionRow - Row containing "Name, Role, Company".
 * @param {Element} ctaRow         - Row containing the CTA anchor.
 * @param {number}  index          - Zero-based slide index.
 * @returns {HTMLDivElement} The assembled slide element.
 */
function buildSlide(quoteRow, attributionRow, ctaRow, index) {
  const slide = document.createElement('div');
  slide.className = 'cs-testimonials-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `Testimonial ${index + 1}`);
  if (index === 0) slide.classList.add('is-active');

  const blockquote = document.createElement('blockquote');
  blockquote.className = 'cs-testimonials-quote';
  const quotePara = document.createElement('p');
  quotePara.textContent = cellText(quoteRow);
  blockquote.append(quotePara);
  slide.append(blockquote);

  const rawAttribution = cellText(attributionRow);
  const commaIndex = rawAttribution.indexOf(',');
  const name = commaIndex !== -1 ? rawAttribution.slice(0, commaIndex).trim() : rawAttribution;
  const roleAndCompany = commaIndex !== -1 ? rawAttribution.slice(commaIndex + 1).trim() : '';

  const attr = document.createElement('p');
  attr.className = 'cs-testimonials-attribution';

  const strong = document.createElement('strong');
  strong.textContent = name;
  attr.append(strong);

  if (roleAndCompany) {
    const comma = document.createTextNode(', ');
    const span = document.createElement('span');
    span.textContent = roleAndCompany;
    attr.append(comma, span);
  }

  slide.append(attr);

  const ctaAnchor = cellAnchor(ctaRow);
  if (ctaAnchor) {
    const cta = document.createElement('a');
    cta.className = 'cs-testimonials-cta button accent';
    cta.href = ctaAnchor.href;
    cta.textContent = ctaAnchor.textContent.trim();
    slide.append(cta);
  }

  return slide;
}

/**
 * Activates the slide at the given index and updates dot aria state.
 * Removes is-active from all slides, adds it to the target.
 * Removes aria-current from all dots, sets it on the target dot.
 *
 * @param {NodeList} slides - All .cs-testimonials-slide elements.
 * @param {NodeList} dots   - All .cs-testimonials-dot button elements.
 * @param {number}   index  - Zero-based index of the slide to activate.
 */
function activateSlide(slides, dots, index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
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
 * Loads and decorates the cs-testimonials block.
 *
 * @param {Element} block - The block element provided by the EDS runtime.
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  // Default variant renders on a dark section; a `light` variant opts out.
  if (!block.classList.contains('light')) {
    block.closest('.section')?.setAttribute('data-section-theme', 'dark');
  }

  const headerRow = rows[0];
  const headerCells = [...headerRow.children];

  const heading = document.createElement('h2');
  heading.className = 'cs-testimonials-heading';
  heading.textContent = headerCells[0] ? headerCells[0].textContent.trim() : '';

  const headerRight = headerCells[1];
  const viewAllAnchor = headerRight ? headerRight.querySelector('a') : null;
  let viewAll = null;
  if (viewAllAnchor) {
    viewAll = document.createElement('a');
    viewAll.className = 'cs-testimonials-view-all';
    viewAll.href = viewAllAnchor.href;
    viewAll.textContent = viewAllAnchor.textContent.trim();
  }

  const header = document.createElement('div');
  header.className = 'cs-testimonials-header';
  header.append(heading);
  if (viewAll) header.append(viewAll);

  const track = document.createElement('div');
  track.className = 'cs-testimonials-track';
  track.setAttribute('aria-roledescription', 'carousel');
  track.setAttribute('aria-label', 'Customer testimonials');

  const testimonialRows = rows.slice(1);
  const slideSize = 4;
  const slideElements = [];

  for (let i = 0; i + slideSize - 1 < testimonialRows.length; i += slideSize) {
    const slide = buildSlide(
      testimonialRows[i],
      testimonialRows[i + 1],
      testimonialRows[i + 3],
      slideElements.length,
    );
    track.append(slide);
    slideElements.push(slide);
  }

  const dotsNav = document.createElement('nav');
  dotsNav.className = 'cs-testimonials-dots';
  dotsNav.setAttribute('aria-label', 'Testimonial navigation');

  const dotButtons = slideElements.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'cs-testimonials-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.setAttribute('aria-current', 'true');
    return dot;
  });

  dotButtons.forEach((dot) => dotsNav.append(dot));

  const allSlides = track.querySelectorAll('.cs-testimonials-slide');
  const allDots = dotsNav.querySelectorAll('.cs-testimonials-dot');

  /**
   * Handles dot button click to navigate to a specific testimonial.
   *
   * @param {MouseEvent} e - The click event on a dot button.
   */
  dotButtons.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      activateSlide(allSlides, allDots, i);
    });
  });

  block.replaceChildren(header, track, dotsNav);
}
