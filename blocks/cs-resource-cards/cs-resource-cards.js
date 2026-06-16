/**
 * cs-resource-cards block
 *
 * Authored row layout (no-image variant):
 *   Rows grouped in triples: tag | headline-link | empty separator
 *   Produces one <article> card per group.
 *
 * @param {HTMLElement} block The block element delivered by EDS
 */

/**
 * Converts a plain-text label into a CSS-safe slug.
 * Non-alphanumeric characters are collapsed into a single hyphen.
 *
 * @param {string} text - Raw tag label, e.g. "Frontier AI Readiness"
 * @returns {string} Slugified string, e.g. "frontier-ai-readiness"
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Loads and decorates the cs-resource-cards block.
 *
 * @param {HTMLElement} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const grid = document.createElement('div');
  grid.className = 'cs-resource-cards-grid';

  for (let i = 0; i < rows.length; i += 3) {
    const tagRow = rows[i];
    const linkRow = rows[i + 1];

    if (!tagRow || !linkRow) break;

    const tagText = tagRow.querySelector('div')?.textContent?.trim() || '';
    const anchor = linkRow.querySelector('a');

    if (!tagText && !anchor) break;

    const article = document.createElement('article');
    article.className = 'cs-resource-cards-card';

    const tagSpan = document.createElement('span');
    tagSpan.className = `cs-resource-cards-tag tag-${slugify(tagText)}`;
    tagSpan.textContent = tagText;

    const headline = document.createElement('h3');
    headline.className = 'cs-resource-cards-card-headline';

    if (anchor) {
      headline.appendChild(anchor.cloneNode(true));
    }

    article.appendChild(tagSpan);
    article.appendChild(headline);
    grid.appendChild(article);
  }

  block.innerHTML = '';
  block.appendChild(grid);
}
