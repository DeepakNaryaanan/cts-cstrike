/**
 * cs-pricing-table block — tabbed pricing comparison.
 *
 * Authored DOM (multi-column block table):
 *   row 0: section heading | subtitle
 *   row 1: monthly tab label | annual tab label  (omitted in single-billing variant)
 *   row 2: plan names (one per column)
 *   row 3: monthly prices
 *   row 4: annual prices
 *   row 5: CTA links (one per plan)
 *   row 6: recommended flag (optional — "recommended" in cell = featured plan)
 *   row 7+: feature rows "Feature name: included|not included"
 *
 * @module cs-pricing-table
 */

const FEATURE_SEPARATOR = ':';
const INCLUDED_VALUE = 'included';

/**
 * Parses a feature row cell text into label and included flag.
 * @param {string} text
 * @returns {{ label: string, included: boolean }}
 */
function parseFeature(text) {
  const idx = text.indexOf(FEATURE_SEPARATOR);
  if (idx === -1) return { label: text, included: false };
  const label = text.slice(0, idx).trim();
  const value = text.slice(idx + 1).trim().toLowerCase();
  return { label, included: value === INCLUDED_VALUE };
}

/**
 * Builds a feature list item element.
 * @param {string} label
 * @param {boolean} included
 * @returns {HTMLElement}
 */
function buildFeatureItem(label, included) {
  const li = document.createElement('li');
  li.className = `cs-pricing-table-feature ${included ? 'is-included' : 'is-excluded'}`;
  const icon = document.createElement('span');
  icon.className = 'cs-pricing-table-feature-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = included ? '✓' : '–';
  const text = document.createElement('span');
  text.textContent = label;
  li.append(icon, text);
  return li;
}

/**
 * Builds a plan card element.
 * @param {object} plan
 * @param {string} plan.name
 * @param {string} plan.monthlyPrice
 * @param {string} plan.annualPrice
 * @param {HTMLElement|null} plan.ctaEl
 * @param {boolean} plan.recommended
 * @param {Array<{label:string,included:boolean}>} plan.features
 * @returns {HTMLElement}
 */
function buildPlanCard({
  name, monthlyPrice, annualPrice, ctaEl, recommended, features,
}) {
  const card = document.createElement('div');
  card.className = `cs-pricing-table-plan${recommended ? ' is-featured' : ''}`;

  if (recommended) {
    const badge = document.createElement('div');
    badge.className = 'cs-pricing-table-badge';
    badge.textContent = 'Recommended';
    card.append(badge);
  }

  const nameEl = document.createElement('h3');
  nameEl.className = 'cs-pricing-table-plan-name';
  nameEl.textContent = name;
  card.append(nameEl);

  const priceMonthly = document.createElement('div');
  priceMonthly.className = 'cs-pricing-table-price cs-pricing-monthly';
  priceMonthly.textContent = monthlyPrice || '';

  const priceAnnual = document.createElement('div');
  priceAnnual.className = 'cs-pricing-table-price cs-pricing-annual hidden';
  priceAnnual.textContent = annualPrice || '';

  card.append(priceMonthly, priceAnnual);

  if (ctaEl) {
    const ctaLink = ctaEl.querySelector('a');
    if (ctaLink) {
      ctaLink.className = 'button primary cs-pricing-table-cta';
      card.append(ctaLink);
    } else if (ctaEl.textContent.trim()) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button primary cs-pricing-table-cta';
      btn.textContent = ctaEl.textContent.trim();
      card.append(btn);
    }
  }

  if (features.length) {
    const ul = document.createElement('ul');
    ul.className = 'cs-pricing-table-features';
    features.forEach(({ label, included }) => ul.append(buildFeatureItem(label, included)));
    card.append(ul);
  }

  return card;
}

/**
 * Loads and decorates the cs-pricing-table block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isSingleBilling = block.classList.contains('single-billing');
  const rows = [...block.children];

  // Row 0: heading + subtitle
  const headingCells = [...(rows[0]?.children ?? [])];
  const headingText = headingCells[0]?.textContent.trim() ?? '';
  const subtitleText = headingCells[1]?.textContent.trim() ?? '';

  // Row 1: tab labels (if not single-billing)
  let planStartIdx = 1;
  let monthlyLabel = 'Monthly';
  let annualLabel = 'Annual';

  if (!isSingleBilling && rows[1]) {
    const tabCells = [...rows[1].children];
    monthlyLabel = tabCells[0]?.textContent.trim() || monthlyLabel;
    annualLabel = tabCells[1]?.textContent.trim() || annualLabel;
    planStartIdx = 2;
  }

  // Row planStartIdx: plan names
  const planNameCells = [...(rows[planStartIdx]?.children ?? [])];

  // Row planStartIdx+1: monthly prices
  const monthlyPriceCells = [...(rows[planStartIdx + 1]?.children ?? [])];

  // Row planStartIdx+2: annual prices
  const annualPriceCells = [...(rows[planStartIdx + 2]?.children ?? [])];

  // Row planStartIdx+3: CTAs
  const ctaCells = [...(rows[planStartIdx + 3]?.children ?? [])];

  // Row planStartIdx+4: recommended flag (optional)
  let featureStartIdx = planStartIdx + 4;
  const maybeRecommended = rows[planStartIdx + 4];
  let recommendedCells = [];
  if (maybeRecommended) {
    const cells = [...maybeRecommended.children];
    const hasRecommendedFlag = cells.some((c) => c.textContent.trim().toLowerCase() === 'recommended');
    if (hasRecommendedFlag) {
      recommendedCells = cells;
      featureStartIdx = planStartIdx + 5;
    }
  }

  // Remaining rows: features
  const featureRows = rows.slice(featureStartIdx);

  // Build plans
  const plans = planNameCells.map((cell, i) => ({
    name: cell.textContent.trim(),
    monthlyPrice: monthlyPriceCells[i]?.textContent.trim() ?? '',
    annualPrice: annualPriceCells[i]?.textContent.trim() ?? '',
    ctaEl: ctaCells[i] ?? null,
    recommended: recommendedCells[i]?.textContent.trim().toLowerCase() === 'recommended',
    features: featureRows.map((fRow) => {
      const fCell = [...fRow.children][i];
      return parseFeature(fCell?.textContent.trim() ?? '');
    }).filter((f) => f.label),
  }));

  // Build DOM
  const header = document.createElement('div');
  header.className = 'cs-pricing-table-header';

  if (headingText) {
    const h2 = document.createElement('h2');
    h2.className = 'cs-pricing-table-heading';
    h2.textContent = headingText;
    header.append(h2);
  }
  if (subtitleText) {
    const sub = document.createElement('p');
    sub.className = 'cs-pricing-table-subtitle';
    sub.textContent = subtitleText;
    header.append(sub);
  }

  let tabNav = null;
  if (!isSingleBilling) {
    tabNav = document.createElement('div');
    tabNav.className = 'cs-pricing-table-tabs';
    tabNav.setAttribute('role', 'tablist');

    const tabMonthly = document.createElement('button');
    tabMonthly.type = 'button';
    tabMonthly.className = 'cs-pricing-table-tab is-active';
    tabMonthly.textContent = monthlyLabel;
    tabMonthly.setAttribute('role', 'tab');
    tabMonthly.setAttribute('aria-selected', 'true');
    tabMonthly.dataset.billing = 'monthly';

    const tabAnnual = document.createElement('button');
    tabAnnual.type = 'button';
    tabAnnual.className = 'cs-pricing-table-tab';
    tabAnnual.textContent = annualLabel;
    tabAnnual.setAttribute('role', 'tab');
    tabAnnual.setAttribute('aria-selected', 'false');
    tabAnnual.dataset.billing = 'annual';

    tabNav.append(tabMonthly, tabAnnual);
    header.append(tabNav);
  }

  const plansGrid = document.createElement('div');
  plansGrid.className = 'cs-pricing-table-plans';
  plans.forEach((plan) => plansGrid.append(buildPlanCard(plan)));

  block.innerHTML = '';
  block.append(header, plansGrid);

  // Wire tab switching
  if (tabNav) {
    tabNav.querySelectorAll('.cs-pricing-table-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        tabNav.querySelectorAll('.cs-pricing-table-tab').forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        const { billing } = tab.dataset;
        block.querySelectorAll('.cs-pricing-monthly, .cs-pricing-annual').forEach((el) => {
          el.classList.toggle('hidden', !el.classList.contains(`cs-pricing-${billing}`));
        });
      });
    });
  }
}
