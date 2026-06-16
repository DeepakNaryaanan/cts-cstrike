/**
 * cs-feature-pillars block
 *
 * Authored row layout (no-icon variant):
 *   Row 0  — section heading
 *   Row 1  — intro paragraph
 *   Rows 2-4, 5-7, 8-10 — card groups: title | body | empty separator
 *
 * @param {HTMLElement} block The block element delivered by EDS
 */
export default function decorate(block) {
  const rows = [...block.children];
  const isNoIcon = block.classList.contains('no-icon');

  // Row 0: section heading
  const headingRow = rows[0];
  const headingText = headingRow ? headingRow.querySelector('div')?.textContent?.trim() : '';

  // Row 1: intro paragraph
  const introRow = rows[1];
  const introText = introRow ? introRow.querySelector('div')?.textContent?.trim() : '';

  // Rows 2+ are card groups of 3 rows each: title, body, empty separator
  const cardRows = rows.slice(2);
  const cards = [];

  for (let i = 0; i < cardRows.length; i += 3) {
    const titleRow = cardRows[i];
    const bodyRow = cardRows[i + 1];

    if (!titleRow || !bodyRow) break;

    const titleText = titleRow.querySelector('div')?.textContent?.trim() || '';
    const bodyText = bodyRow.querySelector('div')?.textContent?.trim() || '';

    if (titleText) {
      cards.push({ titleText, bodyText });
    }
  }

  // Build the new DOM structure
  const heading = document.createElement('h2');
  heading.className = 'cs-feature-pillars-heading';
  heading.textContent = headingText;

  const intro = document.createElement('p');
  intro.className = 'cs-feature-pillars-intro-text';
  intro.textContent = introText;

  const grid = document.createElement('div');
  grid.className = 'cs-feature-pillars-grid';

  cards.forEach(({ titleText, bodyText }) => {
    const card = document.createElement('div');
    card.className = 'cs-feature-pillars-card';

    if (!isNoIcon) {
      const iconEl = document.createElement('div');
      iconEl.className = 'cs-feature-pillars-icon';
      card.appendChild(iconEl);
    }

    const title = document.createElement('h3');
    title.className = 'cs-feature-pillars-card-title';
    title.textContent = titleText;

    const body = document.createElement('p');
    body.className = 'cs-feature-pillars-card-body';
    body.textContent = bodyText;

    card.appendChild(title);
    card.appendChild(body);
    grid.appendChild(card);
  });

  // Replace block children with new structure
  block.innerHTML = '';
  block.appendChild(heading);
  block.appendChild(intro);
  block.appendChild(grid);
}
