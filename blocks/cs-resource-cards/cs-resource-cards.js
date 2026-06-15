/**
 * cs-resource-cards block — resource/news cards grid.
 *
 * Authored DOM (one-column block table, 4 rows per card):
 *   row 0: image (optional)
 *   row 1: tag/category label
 *   row 2: headline link (required)
 *   row 3: short description (optional)
 *
 * @module cs-resource-cards
 */

/**
 * Slugifies a string for use as a CSS class name.
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Groups block rows into card data arrays.
 * In no-image mode, the first row of each card group is the tag.
 * In default mode, the first row of each card group may be an image.
 * @param {HTMLElement} block
 * @param {boolean} noImage
 * @returns {HTMLElement[][]}
 */
function groupCards(block, noImage) {
  const rows = [...block.children];
  const cards = [];
  const groupSize = noImage ? 3 : 4;
  for (let i = 0; i < rows.length; i += groupSize) {
    cards.push(rows.slice(i, i + groupSize));
  }
  return cards;
}

/**
 * Builds a single card element from its row group.
 * @param {HTMLElement[]} rows
 * @param {boolean} noImage
 * @returns {HTMLElement}
 */
function buildCard(rows, noImage) {
  const card = document.createElement('article');
  card.className = 'cs-resource-cards-card';

  let offset = 0;
  if (!noImage) {
    const imageCell = rows[0]?.firstElementChild;
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'cs-resource-cards-card-image';
      imgWrap.append(picture);
      card.append(imgWrap);
    }
    offset = 1;
  }

  const tagCell = rows[offset]?.firstElementChild;
  if (tagCell?.textContent.trim()) {
    const tag = document.createElement('span');
    tag.className = `cs-resource-cards-tag tag-${slugify(tagCell.textContent.trim())}`;
    tag.textContent = tagCell.textContent.trim();
    card.append(tag);
  }

  const headlineCell = rows[offset + 1]?.firstElementChild;
  const link = headlineCell?.querySelector('a');
  if (link) {
    const h3 = document.createElement('h3');
    h3.className = 'cs-resource-cards-card-headline';
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.textContent;
    h3.append(a);
    card.append(h3);
  }

  const descCell = rows[offset + 2]?.firstElementChild;
  if (descCell?.textContent.trim()) {
    const desc = document.createElement('p');
    desc.className = 'cs-resource-cards-card-desc';
    desc.textContent = descCell.textContent.trim();
    card.append(desc);
  }

  return card;
}

/**
 * Loads and decorates the cs-resource-cards block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const noImage = block.classList.contains('no-image');
  const cardGroups = groupCards(block, noImage);

  const grid = document.createElement('div');
  grid.className = 'cs-resource-cards-grid';

  cardGroups.forEach((rows) => {
    const card = buildCard(rows, noImage);
    grid.append(card);
  });

  block.innerHTML = '';
  block.append(grid);
}
