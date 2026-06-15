# cs-feature-pillars

Three-column feature/benefit cards section with an optional intro row. Communicates a platform's key value propositions. Renders as a 3-column CSS Grid on desktop (900px+), 2 columns at 600px, single column on mobile.

## Default Variant

Row 1 is the block-level intro. Rows 2–N are individual pillar cards.

| cs-feature-pillars |
| --- |
| Section heading (required) |
| Intro paragraph (optional) |
| Icon image or SVG reference (optional) |
| Card headline (required) |
| Card body text (required) |
| Card CTA link (optional) |

Repeat the four-cell pillar group (icon / headline / body / CTA) for each additional pillar.

### Authored example

| cs-feature-pillars |
| --- |
| The Future of Security Starts Here |
| The AI era is transforming cybersecurity across three critical fronts — and the CrowdStrike Falcon Platform secures them all. |
| :icon-soc-ai: |
| Accelerate the SOC with AI |
| Drive agentic SOC transformation with unified data and agentic workflows to stop breaches faster. |
| |
| :icon-adversary-shield: |
| Stop AI-accelerated adversaries |
| Prepare for frontier AI-powered vulnerability exploitation and stop adversaries who weaponize AI to attack faster than ever before. |
| |
| :icon-secure-ai: |
| Accelerate secure AI adoption and innovation |
| Secure AI with visibility, governance, and real-time protection against threats like shadow AI and prompt injection. |
| |

## Variant: dark

Identical structure to default. Applies a dark background (navy or near-black) with white text. Use on pages where the section sits between two light sections.

| cs-feature-pillars dark |
| --- |
| Section heading (required) |
| Intro paragraph (optional) |
| Icon image or SVG reference (optional) |
| Card headline (required) |
| Card body text (required) |
| Card CTA link (optional) |

## Variant: 2-col

Forces a maximum 2-column layout regardless of the number of authored pillars. Use when only 2 pillars are needed or when wider cards are desired.

| cs-feature-pillars 2-col |
| --- |
| Section heading (required) |
| Intro paragraph (optional) |
| Icon image or SVG reference (optional) |
| Card headline (required) |
| Card body text (required) |
| Card CTA link (optional) |

## Variant: no-icon

Text-only pillar cards. The icon row is omitted entirely — do not author empty icon cells.

| cs-feature-pillars no-icon |
| --- |
| Section heading (required) |
| Intro paragraph (optional) |
| Card headline (required) |
| Card body text (required) |
| Card CTA link (optional) |

## Notes

- The block determines pillar card boundaries positionally: the icon cell (or headline cell in no-icon) marks the start of each new card.
- Pillar cards must handle a missing icon gracefully — no empty icon container rendered.
- Icon references may use EDS icon syntax (`:icon-name:`) for SVG icons in the `icons/` folder, or an authored image link.
- The intro row (heading + paragraph) always spans full width above the card grid.
