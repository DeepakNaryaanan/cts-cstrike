/**
 * cs-analyst-recognition block
 *
 * Authored structure (all rows are single-cell <div><div>…</div></div>):
 *   Row 0  — section heading text
 *   Then, for each card (4 rows per card):
 *     Row N+0 — logo (may be empty; skip logo element when no <img> found)
 *     Row N+1 — headline text
 *     Row N+2 — subtitle text (may be empty)
 *     Row N+3 — CTA anchor
 *
 * @module cs-analyst-recognition
 */

/**
 * Extracts trimmed text from the first cell of a block row.
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
 * Returns the first img found inside a block row, or null.
 *
 * @param {Element} row - A direct child row of the block.
 * @returns {HTMLImageElement|null}
 */
function cellImage(row) {
  return row.querySelector('img') || null;
}

/**
 * Assembles a single analyst-recognition card from four authored rows.
 *
 * @param {Element} logoRow     - Row that may contain a logo image.
 * @param {Element} headlineRow - Row containing the card headline.
 * @param {Element} subtitleRow - Row that may contain a subtitle.
 * @param {Element} ctaRow      - Row containing the CTA anchor.
 * @returns {HTMLDivElement} The assembled card element.
 */
function buildCard(logoRow, headlineRow, subtitleRow, ctaRow) {
  const card = document.createElement('div');
  card.className = 'cs-analyst-recognition-card';

  const img = cellImage(logoRow);
  if (img) {
    const logo = document.createElement('div');
    logo.className = 'cs-analyst-recognition-logo';
    logo.append(img.cloneNode(true));
    card.append(logo);
  }

  const headline = document.createElement('h3');
  headline.className = 'cs-analyst-recognition-headline';
  headline.textContent = cellText(headlineRow);
  card.append(headline);

  const subtitleText = cellText(subtitleRow);
  if (subtitleText) {
    const subtitle = document.createElement('p');
    subtitle.className = 'cs-analyst-recognition-subtitle';
    subtitle.textContent = subtitleText;
    card.append(subtitle);
  }

  const anchor = cellAnchor(ctaRow);
  if (anchor) {
    const cta = document.createElement('a');
    cta.className = 'cs-analyst-recognition-cta';
    cta.href = anchor.href;
    cta.textContent = anchor.textContent.trim();
    card.append(cta);
  }

  return card;
}

/**
 * Loads and decorates the cs-analyst-recognition block.
 *
 * @param {Element} block - The block element provided by the EDS runtime.
 */
export default function decorate(block) {
  const rows = [...block.children];

  if (!rows.length) return;

  const heading = document.createElement('h2');
  heading.className = 'cs-analyst-recognition-heading';
  heading.textContent = cellText(rows[0]);

  const strip = document.createElement('div');
  strip.className = 'cs-analyst-recognition-strip';

  const cardRows = rows.slice(1);
  const cardSize = 4;

  for (let i = 0; i + cardSize - 1 < cardRows.length; i += cardSize) {
    strip.append(buildCard(
      cardRows[i],
      cardRows[i + 1],
      cardRows[i + 2],
      cardRows[i + 3],
    ));
  }

  block.replaceChildren(heading, strip);
}
