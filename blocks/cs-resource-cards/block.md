# cs-resource-cards

Horizontal strip of resource/news cards. Each row in the block table represents one card. Renders as a 3-column CSS Grid on desktop, 2 columns at 600px, single column on mobile.

## Default Variant

| cs-resource-cards |
| --- |
| Card image (optional) |
| Tag / category label (required) |
| Headline link — link text becomes card headline; href is the destination (required) |
| Short description / teaser text (optional) |

Repeat the above four-cell group for each additional card. Each card is a self-contained group of rows.

### Authored example (3 cards)

| cs-resource-cards |
| --- |
| [image: frontier-ai.png] |
| Frontier AI Readiness |
| [New Frontier AI Readiness and Resilience Service finds exploitable risk before adversaries weaponize it](https://www.crowdstrike.com/blog/...) |
| Learn how CrowdStrike identifies exploitable risk before adversaries can act. |
| [image: ai-whitepaper.png] |
| White Paper |
| [Securing AI Where It Executes: The Endpoint Is the New Control Point for AI Agent Security](https://www.crowdstrike.com/resources/...) |
| |
| [image: glassworm.png] |
| Counter Adversary Operations |
| [Disrupting Glassworm: Inside CrowdStrike's Takedown of a Developer-Targeting Botnet](https://www.crowdstrike.com/blog/...) |
| |

## Variant: featured

First card is visually larger (full-width top row on desktop). Remaining cards fill a 2-column lower row. Use when one article deserves primary emphasis.

| cs-resource-cards featured |
| --- |
| Featured card image (optional) |
| Tag / category label (required) |
| Headline link (required) |
| Short description (optional) |
| Second card image (optional) |
| Tag / category label (required) |
| Headline link (required) |
| Short description (optional) |
| Third card image (optional) |
| Tag / category label (required) |
| Headline link (required) |
| Short description (optional) |

## Variant: no-image

Text-only cards. Structure is identical to default but all image cells are omitted. Blockwright infers no-image mode from the variant class, not from detecting empty image cells.

| cs-resource-cards no-image |
| --- |
| Tag / category label (required) |
| Headline link (required) |
| Short description / teaser text (optional) |

## Notes

- Card grouping is positional: the image cell (or tag cell in no-image) marks the start of each new card.
- The block must handle missing optional cells gracefully — a card without an image must not render an empty image container.
- Tag pill colours are controlled by CSS class derived from the tag text value (e.g., slugified to `tag-frontier-ai-readiness`); colour mapping is defined in block CSS.
