/**
 * cs-feature-pillars block — section heading + feature cards.
 *
 * Authored DOM (one-column block table):
 *   row 0: section heading
 *   row 1: intro paragraph (optional)
 *   row 2: icon (optional) — starts first card
 *   row 3: card headline
 *   row 4: card body text
 *   row 5: card CTA link (optional)
 *   [rows 6+ repeat the 4-cell card group]
 *
 * Variants: dark, 2-col, no-icon
 *
 * @module cs-feature-pillars
 */

/**
 * Builds pillar card elements from the remaining rows after the intro.
 * @param {HTMLElement[]} rows - Card rows (post-intro)
 * @param {boolean} noIcon
 * @returns {HTMLElement[]}
 */
function buildPillarCards(rows, noIcon) {
  const cards = [];
  const groupSize = noIcon ? 3 : 4;

  for (let i = 0; i < rows.length; i += groupSize) {
    const group = rows.slice(i, i + groupSize);
    const card = document.createElement('div');
    card.className = 'cs-feature-pillars-card';

    let offset = 0;
    if (!noIcon) {
      const iconCell = group[0]?.firstElementChild;
      const icon = iconCell?.querySelector('picture, img, .icon');
      if (icon || iconCell?.textContent.trim()) {
        const iconWrap = document.createElement('div');
        iconWrap.className = 'cs-feature-pillars-icon';
        if (icon) {
          iconWrap.append(icon);
        } else {
          iconWrap.textContent = iconCell.textContent.trim();
        }
        card.append(iconWrap);
      }
      offset = 1;
    }

    const titleCell = group[offset]?.firstElementChild;
    if (titleCell?.textContent.trim()) {
      const h3 = document.createElement('h3');
      h3.className = 'cs-feature-pillars-card-title';
      h3.textContent = titleCell.textContent.trim();
      card.append(h3);
    }

    const bodyCell = group[offset + 1]?.firstElementChild;
    if (bodyCell?.textContent.trim()) {
      const p = document.createElement('p');
      p.className = 'cs-feature-pillars-card-body';
      p.textContent = bodyCell.textContent.trim();
      card.append(p);
    }

    const ctaCell = group[offset + 2]?.firstElementChild;
    const ctaLink = ctaCell?.querySelector('a');
    if (ctaLink) {
      ctaLink.className = 'cs-feature-pillars-card-cta';
      card.append(ctaLink);
    }

    cards.push(card);
  }
  return cards;
}

/**
 * Loads and decorates the cs-feature-pillars block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isDark = block.classList.contains('dark');
  const noIcon = block.classList.contains('no-icon');

  if (isDark) block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const rows = [...block.children];

  const intro = document.createElement('div');
  intro.className = 'cs-feature-pillars-intro';

  const headingCell = rows[0]?.firstElementChild;
  if (headingCell?.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.className = 'cs-feature-pillars-heading';
    h2.textContent = headingCell.textContent.trim();
    intro.append(h2);
  }

  let cardStartIdx = 1;

  const secondCell = rows[1]?.firstElementChild;
  const secondCellHasLink = secondCell?.querySelector('a');
  const secondCellText = secondCell?.textContent.trim();
  const thirdCell = rows[2]?.firstElementChild;
  const thirdIsIcon = !noIcon && (thirdCell?.querySelector('picture, img, .icon') || /^:icon-/.test(thirdCell?.textContent?.trim() ?? ''));

  if (secondCellText && !secondCellHasLink && !thirdIsIcon) {
    const introP = document.createElement('p');
    introP.className = 'cs-feature-pillars-intro-text';
    introP.textContent = secondCellText;
    intro.append(introP);
    cardStartIdx = 2;
  }

  const cardRows = rows.slice(cardStartIdx);
  const cards = buildPillarCards(cardRows, noIcon);

  const grid = document.createElement('div');
  grid.className = 'cs-feature-pillars-grid';
  cards.forEach((c) => grid.append(c));

  block.innerHTML = '';
  block.append(intro, grid);
}
