/**
 * cs-adversary-cta block — full-width dark call-to-action section.
 *
 * Authored DOM (one-column block table):
 *   row 0: eyebrow (optional — may be empty)
 *   row 1: headline (required)
 *   row 2: body text (required)
 *   row 3: primary CTA link (required)
 *   row 4: secondary CTA link (optional)
 *
 * Variants: split, light, with-eyebrow
 * CSS-only for default and light. Split uses CSS Grid — no JS needed.
 *
 * @module cs-adversary-cta
 */

/**
 * Loads and decorates the cs-adversary-cta block.
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const isLight = block.classList.contains('light');

  if (!isLight) block.closest('.section')?.setAttribute('data-section-theme', 'dark');

  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'cs-adversary-cta-content';

  const textGroup = document.createElement('div');
  textGroup.className = 'cs-adversary-cta-text';

  const ctaGroup = document.createElement('div');
  ctaGroup.className = 'cs-adversary-cta-actions';

  rows.forEach((row, idx) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    const text = cell.textContent.trim();
    const link = cell.querySelector('a');

    if (idx === 0 && text) {
      // Eyebrow
      const eyebrow = document.createElement('p');
      eyebrow.className = 'cs-adversary-cta-eyebrow';
      eyebrow.textContent = text;
      textGroup.append(eyebrow);
    } else if (idx === 1 && text) {
      // Headline
      const h2 = document.createElement('h2');
      h2.className = 'cs-adversary-cta-headline';
      h2.textContent = text;
      textGroup.append(h2);
    } else if (idx === 2 && text) {
      // Body
      const p = document.createElement('p');
      p.className = 'cs-adversary-cta-body';
      p.textContent = text;
      textGroup.append(p);
    } else if (link) {
      // CTAs (rows 3 and 4)
      link.className = `button ${idx === 3 ? 'cs-adversary-cta-btn-primary' : 'cs-adversary-cta-btn-secondary'}`;
      ctaGroup.append(link);
    }
  });

  content.append(textGroup, ctaGroup);
  block.innerHTML = '';
  block.append(content);
}
