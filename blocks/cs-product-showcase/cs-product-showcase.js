/**
 * cs-product-showcase block — tabbed product explorer.
 *
 * Authored DOM (two-column block table):
 *   row 0: section heading (optional)
 *   row 1: tab label (marks panel start)
 *   row 2: product headline
 *   row 3: product description
 *   row 4: product image (optional)
 *   row 5: CTA link
 *   [rows 6+ repeat 5-cell panel group]
 *
 * Variants: light, vertical-tabs
 *
 * @module cs-product-showcase
 */

/**
 * Determines if row 0 is a section heading.
 * A row is treated as the section heading if its first cell content is
 * not a single-word tab label (i.e., contains spaces or is longer text).
 * @param {HTMLElement} row
 * @returns {boolean}
 */
function isHeadingRow(row) {
  const text = row?.firstElementChild?.textContent.trim() ?? '';
  return text.length > 0 && !row?.firstElementChild?.querySelector('a');
}

/**
 * Parses block rows into heading and panel groups.
 * @param {HTMLElement[]} rows
 * @returns {{ headingRow: HTMLElement|null, panelGroups: HTMLElement[][] }}
 */
function parseRows(rows) {
  let startIdx = 0;
  let headingRow = null;

  if (rows.length > 1 && isHeadingRow(rows[0])) {
    [headingRow] = rows;
    startIdx = 1;
  }

  const panelRows = rows.slice(startIdx);
  const groups = [];
  const groupSize = 5;
  for (let i = 0; i < panelRows.length; i += groupSize) {
    groups.push(panelRows.slice(i, i + groupSize));
  }
  return { headingRow, panelGroups: groups };
}

/**
 * Builds a tab button element.
 * @param {string} label
 * @param {number} index
 * @returns {HTMLElement}
 */
function buildTab(label, index) {
  const tab = document.createElement('button');
  tab.type = 'button';
  tab.className = 'cs-product-showcase-tab';
  tab.textContent = label;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
  tab.setAttribute('aria-controls', `cs-product-showcase-panel-${index}`);
  tab.id = `cs-product-showcase-tab-${index}`;
  if (index === 0) tab.classList.add('is-active');
  return tab;
}

/**
 * Builds a panel element from its row group.
 * @param {HTMLElement[]} rows
 * @param {number} index
 * @returns {HTMLElement}
 */
function buildPanel(rows, index) {
  const panel = document.createElement('div');
  panel.className = 'cs-product-showcase-panel';
  panel.id = `cs-product-showcase-panel-${index}`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', `cs-product-showcase-tab-${index}`);
  if (index !== 0) panel.hidden = true;

  const headlineCell = rows[1]?.firstElementChild;
  if (headlineCell?.textContent.trim()) {
    const h3 = document.createElement('h3');
    h3.className = 'cs-product-showcase-panel-headline';
    h3.innerHTML = headlineCell.innerHTML;
    panel.append(h3);
  }

  const descCell = rows[2]?.firstElementChild;
  if (descCell?.textContent.trim()) {
    const p = document.createElement('p');
    p.className = 'cs-product-showcase-panel-desc';
    p.textContent = descCell.textContent.trim();
    panel.append(p);
  }

  const imgCell = rows[3]?.firstElementChild;
  const picture = imgCell?.querySelector('picture');
  if (picture) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'cs-product-showcase-panel-image';
    if (index > 0) picture.querySelector('img')?.setAttribute('loading', 'lazy');
    imgWrap.append(picture);
    panel.prepend(imgWrap);
  }

  const ctaCell = rows[4]?.firstElementChild;
  const ctaLink = ctaCell?.querySelector('a');
  if (ctaLink) {
    ctaLink.className = 'button primary cs-product-showcase-cta';
    panel.append(ctaLink);
  }

  return panel;
}

/**
 * Loads and decorates the cs-product-showcase block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isLight = block.classList.contains('light');

  if (!isLight) block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const rows = [...block.children];
  const { headingRow, panelGroups } = parseRows(rows);

  let heading = null;
  if (headingRow) {
    heading = document.createElement('h2');
    heading.className = 'cs-product-showcase-heading';
    heading.textContent = headingRow.firstElementChild?.textContent.trim() ?? '';
  }

  const tabList = document.createElement('div');
  tabList.className = 'cs-product-showcase-tabs';
  tabList.setAttribute('role', 'tablist');

  const panelContainer = document.createElement('div');
  panelContainer.className = 'cs-product-showcase-panels';

  const tabs = panelGroups.map((rows2, i) => {
    const label = rows2[0]?.firstElementChild?.textContent.trim() ?? `Tab ${i + 1}`;
    const tab = buildTab(label, i);
    const panel = buildPanel(rows2, i);
    tabList.append(tab);
    panelContainer.append(panel);
    return tab;
  });

  const panels = [...panelContainer.children];

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t, j) => {
        t.classList.toggle('is-active', j === i);
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
      });
      panels.forEach((p, j) => { p.hidden = j !== i; });
    });
  });

  block.innerHTML = '';
  if (heading) block.append(heading);
  block.append(tabList, panelContainer);
}
