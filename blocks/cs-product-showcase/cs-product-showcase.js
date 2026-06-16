/**
 * cs-product-showcase block
 *
 * Authored row layout:
 *   Row 0  — section heading
 *   Then 4 groups of 5 rows each:
 *     [tab-label, product-name (headline), description, image (may be empty), cta-link]
 *
 * @param {HTMLElement} block The block element delivered by EDS
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

const ROWS_PER_GROUP = 5;
const GROUP_COUNT = 4;

/**
 * Activates tab N and shows its panel, deactivating all others.
 *
 * @param {HTMLButtonElement[]} tabs - All tab button elements.
 * @param {HTMLElement[]} panels - All panel elements.
 * @param {number} index - Zero-based index of the tab to activate.
 */
function activateTab(tabs, panels, index) {
  tabs.forEach((tab, i) => {
    const isActive = i === index;
    tab.setAttribute('aria-selected', String(isActive));
    tab.classList.toggle('is-active', isActive);
  });
  panels.forEach((panel, i) => {
    if (i === index) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
}

/**
 * Handles keyboard navigation on the tablist (Arrow keys, Home, End).
 *
 * @param {KeyboardEvent} e - The keydown event.
 * @param {HTMLButtonElement[]} tabs - All tab button elements.
 * @param {HTMLElement[]} panels - All panel elements.
 */
function handleTabKeydown(e, tabs, panels) {
  const current = tabs.indexOf(e.target);
  if (current === -1) return;

  let next = current;
  if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = tabs.length - 1;
  else return;

  e.preventDefault();
  activateTab(tabs, panels, next);
  tabs[next].focus();
}

/**
 * Loads and decorates the cs-product-showcase block.
 *
 * @param {HTMLElement} block The block element.
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: section heading
  const headingText = rows[0]?.querySelector('div')?.textContent?.trim() ?? '';
  const heading = document.createElement('h2');
  heading.className = 'cs-product-showcase-heading';
  heading.textContent = headingText;

  // Parse the 4 tab/panel groups (rows 1-20)
  const groupRows = rows.slice(1);
  const groups = [];
  for (let g = 0; g < GROUP_COUNT; g += 1) {
    const base = g * ROWS_PER_GROUP;
    const tabLabel = groupRows[base]?.querySelector('div')?.textContent?.trim() ?? '';
    const productName = groupRows[base + 1]?.querySelector('div')?.textContent?.trim() ?? '';
    const description = groupRows[base + 2]?.querySelector('div')?.textContent?.trim() ?? '';
    const imageCell = groupRows[base + 3]?.querySelector('div');
    const ctaCell = groupRows[base + 4]?.querySelector('div');
    const ctaLink = ctaCell?.querySelector('a') ?? null;
    const imgEl = imageCell?.querySelector('img') ?? null;

    groups.push({
      tabLabel, productName, description, imgEl, ctaLink,
    });
  }

  // Build tablist
  const tablist = document.createElement('div');
  tablist.className = 'cs-product-showcase-tabs';
  tablist.setAttribute('role', 'tablist');

  const tabEls = groups.map((group, i) => {
    const btn = document.createElement('button');
    btn.className = 'cs-product-showcase-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('id', `cs-product-showcase-tab-${i}`);
    btn.setAttribute('aria-controls', `cs-product-showcase-panel-${i}`);
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.classList.add('is-active');
    btn.textContent = group.tabLabel;
    tablist.appendChild(btn);
    return btn;
  });

  // Build panels
  const panelEls = groups.map((group, i) => {
    const panel = document.createElement('div');
    panel.className = 'cs-product-showcase-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', `cs-product-showcase-panel-${i}`);
    panel.setAttribute('aria-labelledby', `cs-product-showcase-tab-${i}`);
    if (i !== 0) panel.setAttribute('hidden', '');

    const h3 = document.createElement('h3');
    h3.className = 'cs-product-showcase-panel-headline';
    h3.textContent = group.productName;
    panel.appendChild(h3);

    const p = document.createElement('p');
    p.className = 'cs-product-showcase-panel-desc';
    p.textContent = group.description;
    panel.appendChild(p);

    if (group.imgEl) {
      const alt = group.imgEl.alt || group.productName;
      const breakpoints = [{ media: '(min-width: 900px)', width: '600' }, { width: '400' }];
      const pic = createOptimizedPicture(group.imgEl.src, alt, false, breakpoints);
      pic.className = 'cs-product-showcase-panel-image';
      panel.appendChild(pic);
    }

    if (group.ctaLink) {
      const a = document.createElement('a');
      a.className = 'cs-product-showcase-cta';
      a.href = group.ctaLink.href;
      a.textContent = group.ctaLink.textContent.trim();
      panel.appendChild(a);
    }

    return panel;
  });

  // Wire click handlers
  tabEls.forEach((btn, i) => {
    btn.addEventListener('click', () => activateTab(tabEls, panelEls, i));
  });

  // Wire keyboard navigation on tablist
  tablist.addEventListener('keydown', (e) => handleTabKeydown(e, tabEls, panelEls));

  // Replace block contents
  const panelContainer = document.createElement('div');
  panelContainer.className = 'cs-product-showcase-panels';
  panelEls.forEach((panel) => panelContainer.appendChild(panel));

  block.innerHTML = '';
  block.appendChild(heading);
  block.appendChild(tablist);
  block.appendChild(panelContainer);
}
