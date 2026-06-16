/**
 * cs-pricing-table block
 *
 * Authored structure (rows are indexed from 0):
 *   Row 0  — col0: heading text | col1: subtitle text
 *   Row 1  — col0: monthly-tab label | col1: annual-tab label
 *   Row 2  — one cell per plan: plan name (N columns = N plans)
 *   Row 3  — monthly price per plan
 *   Row 4  — annual price per plan
 *   Row 5  — CTA anchor per plan
 *   Row 6  — recommended flag per plan ("recommended" text = featured, empty = not)
 *   Row 7+ — feature rows; each cell text is "Feature name: included" or
 *             "Feature name: not included"
 *
 * @module cs-pricing-table
 */

/**
 * Returns all direct-child cells of a block row as an array.
 *
 * @param {Element} row - A direct child row of the block.
 * @returns {Element[]} Array of cell elements.
 */
function getCells(row) {
  return [...row.children];
}

/**
 * Builds a tab button element.
 *
 * @param {string} label   - Visible tab label text.
 * @param {string} billing - Value for data-billing attribute ('monthly'|'annual').
 * @param {boolean} active - Whether this tab starts as active.
 * @returns {HTMLButtonElement}
 */
function buildTab(label, billing, active) {
  const btn = document.createElement('button');
  btn.className = `cs-pricing-table-tab${active ? ' is-active' : ''}`;
  btn.setAttribute('role', 'tab');
  btn.setAttribute('data-billing', billing);
  btn.setAttribute('aria-selected', active ? 'true' : 'false');
  btn.textContent = label;
  return btn;
}

/**
 * Builds a single feature list item element.
 *
 * @param {string} text - Raw cell text in "Feature name: included|not included" format.
 * @returns {HTMLLIElement}
 */
function buildFeature(text) {
  const colon = text.lastIndexOf(':');
  const name = colon > -1 ? text.slice(0, colon).trim() : text.trim();
  const state = colon > -1 ? text.slice(colon + 1).trim().toLowerCase() : '';
  const isIncluded = state === 'included';

  const li = document.createElement('li');
  li.className = `cs-pricing-table-feature ${isIncluded ? 'is-included' : 'is-excluded'}`;

  const icon = document.createElement('span');
  icon.className = 'cs-pricing-table-feature-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = isIncluded ? '✓' : '–';

  const label = document.createElement('span');
  label.className = 'cs-pricing-table-feature-label';
  label.textContent = name;

  li.append(icon, label);
  return li;
}

/**
 * Activates a billing tab and toggles the visibility of all price elements.
 *
 * @param {HTMLButtonElement} activeTab  - The tab being activated.
 * @param {HTMLButtonElement[]} allTabs  - All tab buttons in the tablist.
 * @param {Element} plansEl              - The .cs-pricing-table-plans container.
 * @param {'monthly'|'annual'} billing   - Which billing mode to show.
 */
function activateTab(activeTab, allTabs, plansEl, billing) {
  allTabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  plansEl.querySelectorAll('.cs-pricing-monthly').forEach((el) => {
    el.classList.toggle('hidden', billing === 'annual');
  });
  plansEl.querySelectorAll('.cs-pricing-annual').forEach((el) => {
    el.classList.toggle('hidden', billing === 'monthly');
  });
}

/**
 * Loads and decorates the cs-pricing-table block.
 *
 * @param {Element} block - The block element provided by the EDS runtime.
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 7) return;

  // Row 0: heading | subtitle
  const headerCells = getCells(rows[0]);
  const headingText = headerCells[0] ? headerCells[0].textContent.trim() : '';
  const subtitleText = headerCells[1] ? headerCells[1].textContent.trim() : '';

  const heading = document.createElement('h2');
  heading.className = 'cs-pricing-table-heading';
  heading.textContent = headingText;

  const subtitle = document.createElement('p');
  subtitle.className = 'cs-pricing-table-subtitle';
  subtitle.textContent = subtitleText;

  // Row 1: tab labels
  const tabCells = getCells(rows[1]);
  const monthlyLabel = tabCells[0] ? tabCells[0].textContent.trim() : 'Monthly pricing';
  const annualLabel = tabCells[1] ? tabCells[1].textContent.trim() : 'Annual pricing';

  const tablist = document.createElement('div');
  tablist.className = 'cs-pricing-table-tabs';
  tablist.setAttribute('role', 'tablist');

  const monthlyTab = buildTab(monthlyLabel, 'monthly', true);
  const annualTab = buildTab(annualLabel, 'annual', false);
  tablist.append(monthlyTab, annualTab);
  const allTabs = [monthlyTab, annualTab];

  // Row 2: plan names; number of plans = number of cells
  const nameCells = getCells(rows[2]);
  const planCount = nameCells.length;

  // Row 3: monthly prices
  const monthlyPriceCells = getCells(rows[3]);

  // Row 4: annual prices
  const annualPriceCells = getCells(rows[4]);

  // Row 5: CTA anchors
  const ctaCells = getCells(rows[5]);

  // Row 6: recommended flags
  const recCells = getCells(rows[6]);

  // Rows 7+: feature rows
  const featureRows = rows.slice(7);

  const plansEl = document.createElement('div');
  plansEl.className = 'cs-pricing-table-plans';

  for (let i = 0; i < planCount; i += 1) {
    const isFeatured = recCells[i]
      && recCells[i].textContent.trim().toLowerCase() === 'recommended';

    const plan = document.createElement('div');
    plan.className = `cs-pricing-table-plan${isFeatured ? ' is-featured' : ''}`;

    if (isFeatured) {
      const badge = document.createElement('div');
      badge.className = 'cs-pricing-table-badge';
      badge.textContent = 'Recommended';
      plan.append(badge);
    }

    const planName = document.createElement('h3');
    planName.className = 'cs-pricing-table-plan-name';
    planName.textContent = nameCells[i] ? nameCells[i].textContent.trim() : '';
    plan.append(planName);

    const monthlyPrice = document.createElement('div');
    monthlyPrice.className = 'cs-pricing-monthly';
    monthlyPrice.textContent = monthlyPriceCells[i]
      ? monthlyPriceCells[i].textContent.trim() : '';
    plan.append(monthlyPrice);

    const annualPrice = document.createElement('div');
    annualPrice.className = 'cs-pricing-annual hidden';
    annualPrice.textContent = annualPriceCells[i]
      ? annualPriceCells[i].textContent.trim() : '';
    plan.append(annualPrice);

    const ctaAnchor = ctaCells[i] ? ctaCells[i].querySelector('a') : null;
    if (ctaAnchor) {
      const cta = document.createElement('a');
      cta.className = 'cs-pricing-table-cta';
      cta.href = ctaAnchor.href;
      cta.textContent = ctaAnchor.textContent.trim();
      plan.append(cta);
    }

    const featureList = document.createElement('ul');
    featureList.className = 'cs-pricing-table-features';
    featureRows.forEach((fRow) => {
      const fCells = getCells(fRow);
      const cellText = fCells[i] ? fCells[i].textContent.trim() : '';
      if (cellText) {
        featureList.append(buildFeature(cellText));
      }
    });
    plan.append(featureList);

    plansEl.append(plan);
  }

  /**
   * Handles click events on tab buttons.
   *
   * @param {MouseEvent} e - The click event fired by a tab button.
   */
  function onTabClick(e) {
    const tab = e.currentTarget;
    const billing = tab.getAttribute('data-billing');
    activateTab(tab, allTabs, plansEl, billing);
  }

  allTabs.forEach((tab) => tab.addEventListener('click', onTabClick));

  block.replaceChildren(heading, subtitle, tablist, plansEl);
}
