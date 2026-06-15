/**
 * cs-analyst-recognition block — analyst report recognition cards.
 *
 * Authored DOM (one-column block table):
 *   row 0: section heading (optional)
 *   row 1: analyst logo image (required — marks card start)
 *   row 2: recognition headline
 *   row 3: short descriptor (optional)
 *   row 4: CTA link
 *   [rows 5+ repeat 4-cell card group]
 *
 * @module cs-analyst-recognition
 */

/**
 * Groups block rows into card groups starting at each logo-image row.
 * Row 0 is treated as a potential heading if it contains no image.
 * @param {HTMLElement[]} rows
 * @returns {{ headingRow: HTMLElement|null, cardGroups: HTMLElement[][] }}
 */
function parseRows(rows) {
  let headingRow = null;
  let startIdx = 0;

  const firstCell = rows[0]?.firstElementChild;
  if (firstCell && !firstCell.querySelector('picture, img')) {
    [headingRow] = rows;
    startIdx = 1;
  }

  const cardRows = rows.slice(startIdx);
  const groups = [];
  const groupSize = 4;
  for (let i = 0; i < cardRows.length; i += groupSize) {
    groups.push(cardRows.slice(i, i + groupSize));
  }
  return { headingRow, cardGroups: groups };
}

/**
 * Builds a single analyst recognition card.
 * @param {HTMLElement[]} rows
 * @returns {HTMLElement}
 */
function buildCard(rows) {
  const card = document.createElement('div');
  card.className = 'cs-analyst-recognition-card';

  const logoCell = rows[0]?.firstElementChild;
  const picture = logoCell?.querySelector('picture');
  if (picture) {
    const logoWrap = document.createElement('div');
    logoWrap.className = 'cs-analyst-recognition-logo';
    logoWrap.append(picture);
    card.append(logoWrap);
  }

  const headlineCell = rows[1]?.firstElementChild;
  if (headlineCell?.textContent.trim()) {
    const h3 = document.createElement('h3');
    h3.className = 'cs-analyst-recognition-headline';
    h3.textContent = headlineCell.textContent.trim();
    card.append(h3);
  }

  const subtitleCell = rows[2]?.firstElementChild;
  if (subtitleCell?.textContent.trim()) {
    const sub = document.createElement('p');
    sub.className = 'cs-analyst-recognition-subtitle';
    sub.textContent = subtitleCell.textContent.trim();
    card.append(sub);
  }

  const ctaCell = rows[3]?.firstElementChild;
  const ctaLink = ctaCell?.querySelector('a');
  if (ctaLink) {
    ctaLink.className = 'cs-analyst-recognition-cta button primary';
    card.append(ctaLink);
  }

  return card;
}

/**
 * Loads and decorates the cs-analyst-recognition block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const { headingRow, cardGroups } = parseRows(rows);

  let heading = null;
  if (headingRow) {
    heading = document.createElement('h2');
    heading.className = 'cs-analyst-recognition-heading';
    heading.textContent = headingRow.firstElementChild?.textContent.trim() ?? '';
  }

  const strip = document.createElement('div');
  strip.className = 'cs-analyst-recognition-strip';
  cardGroups.forEach((rows2) => {
    const card = buildCard(rows2);
    strip.append(card);
  });

  block.innerHTML = '';
  if (heading) block.append(heading);
  block.append(strip);
}
