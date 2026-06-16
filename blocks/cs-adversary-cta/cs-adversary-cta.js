/**
 * cs-adversary-cta block — dark full-width call-to-action banner.
 *
 * Authored structure (5 rows, single column):
 *   Row 0: eyebrow text (optional — omit element when empty)
 *   Row 1: headline
 *   Row 2: body text
 *   Row 3: primary CTA link
 *   Row 4: secondary CTA link (optional — omit element when empty)
 *
 * Produces:
 *   .cs-adversary-cta-content
 *     .cs-adversary-cta-text
 *       p.cs-adversary-cta-eyebrow   (only when row 0 has content)
 *       h2.cs-adversary-cta-headline
 *       p.cs-adversary-cta-body
 *     .cs-adversary-cta-actions
 *       a.cs-adversary-cta-btn-primary   (only when row 3 has a link)
 *       a.cs-adversary-cta-btn-secondary (only when row 4 has a link)
 *
 * @module cs-adversary-cta
 */

/**
 * Returns the text content of the first child div inside a block row,
 * or null when the cell is empty or absent.
 * @param {Element|undefined} row - A block child row element
 * @returns {string|null}
 */
function cellText(row) {
  if (!row) return null;
  const cell = row.querySelector(':scope > div');
  if (!cell) return null;
  const text = cell.textContent.trim();
  return text || null;
}

/**
 * Returns the first anchor element inside a block row cell, or null.
 * @param {Element|undefined} row - A block child row element
 * @returns {HTMLAnchorElement|null}
 */
function cellLink(row) {
  if (!row) return null;
  return row.querySelector('a') || null;
}

/**
 * Loads and decorates the cs-adversary-cta block.
 * Sets data-section-theme="dark" on the parent section so global CSS
 * applies the dark surface treatment.
 * @param {Element} block - The block element provided by the EDS runtime
 * @returns {void}
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [eyebrowRow, headlineRow, bodyRow, primaryRow, secondaryRow] = rows;

  block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const content = document.createElement('div');
  content.classList.add('cs-adversary-cta-content');

  const textGroup = document.createElement('div');
  textGroup.classList.add('cs-adversary-cta-text');

  const eyebrowText = cellText(eyebrowRow);
  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.classList.add('cs-adversary-cta-eyebrow');
    eyebrow.textContent = eyebrowText;
    textGroup.appendChild(eyebrow);
  }

  const headlineText = cellText(headlineRow);
  if (headlineText) {
    const headline = document.createElement('h2');
    headline.classList.add('cs-adversary-cta-headline');
    headline.textContent = headlineText;
    textGroup.appendChild(headline);
  }

  const bodyText = cellText(bodyRow);
  if (bodyText) {
    const body = document.createElement('p');
    body.classList.add('cs-adversary-cta-body');
    body.textContent = bodyText;
    textGroup.appendChild(body);
  }

  const actionsGroup = document.createElement('div');
  actionsGroup.classList.add('cs-adversary-cta-actions');

  const primaryLink = cellLink(primaryRow);
  if (primaryLink) {
    const btn = primaryLink.cloneNode(true);
    btn.className = 'cs-adversary-cta-btn-primary';
    actionsGroup.appendChild(btn);
  }

  const secondaryLink = cellLink(secondaryRow);
  if (secondaryLink) {
    const btn = secondaryLink.cloneNode(true);
    btn.className = 'cs-adversary-cta-btn-secondary';
    actionsGroup.appendChild(btn);
  }

  content.appendChild(textGroup);
  content.appendChild(actionsGroup);

  block.textContent = '';
  block.appendChild(content);
}
