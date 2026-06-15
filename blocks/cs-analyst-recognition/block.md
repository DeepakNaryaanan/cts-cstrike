# cs-analyst-recognition

Grid or scrolling strip of analyst recognition cards. Displays awards, analyst report placements, and market leadership recognition. Each row in the block table is one card.

## Default Variant

Row 1 (optional) is the block-level section heading. Rows 2–N are individual recognition cards.

| cs-analyst-recognition |
| --- |
| Section heading (optional — may be authored as default section content above the block) |
| Analyst logo image (required) |
| Recognition headline (required) |
| Short descriptor / award subtitle (optional) |
| CTA link — text + URL (required) |

Repeat the four-cell card group for each additional recognition entry.

### Authored example

| cs-analyst-recognition |
| --- |
| Recognition by trusted analysts |
| [gartner-mq-logo.png] |
| A Leader for the seventh consecutive time |
| 2026 Gartner® Magic Quadrant™ for Endpoint Protection |
| [Download report](https://www.crowdstrike.com/resources/reports/...) |
| [gartner-cti-logo.png] |
| A Leader in the inaugural Gartner Magic Quadrant™ for Cyberthreat Intelligence Technologies |
| |
| [Download report](https://www.crowdstrike.com/resources/reports/...) |
| [idc-marketscape-logo.png] |
| CrowdStrike Named a Leader in the IDC MarketScape for CNAPP |
| |
| [Download excerpt](https://www.crowdstrike.com/resources/reports/...) |

## Variant: carousel

Used when 4 or more cards are authored. Renders as a horizontally scrolling carousel with previous/next navigation controls and navigation dots. Same card content structure as default.

| cs-analyst-recognition carousel |
| --- |
| Section heading (optional) |
| Analyst logo image (required) |
| Recognition headline (required) |
| Short descriptor (optional) |
| CTA link (required) |

## Variant: compact

Smaller card footprint — analyst logo and a brief label only. Used for longer recognition lists where body text per card is not practical.

| cs-analyst-recognition compact |
| --- |
| Section heading (optional) |
| Analyst logo image (required) |
| Recognition label / short headline (required) |
| CTA link (required) |

## Notes

- Card group boundaries are determined by the analyst logo image row — each logo image cell starts a new card.
- The optional section heading cell is the first row; if omitted, the block renders without an internal heading (relies on default section content heading above).
- CTA link text is authored inline as the link text; do not rely on a separate "CTA label" cell.
- Analyst logo images should be optimised at width 200 (logo-sized). Authors must upload white/reversed logo variants for dark backgrounds.
- Open question on CTA text colour contrast — see user story 04 for detail before implementing link styles.
