# cs-hero

Full-width hero carousel with rotating panels. Each row in the block table represents one slide panel. The block auto-advances through panels and supports manual navigation via dots and arrow controls.

## Default Variant

Each row below the block name header represents one panel. Repeat the pattern for additional panels (minimum 1, maximum recommended 5).

| cs-hero | |
| --- | --- |
| Eyebrow text (optional) | |
| Headline (required) | |
| Body text (optional) | |
| Primary CTA link (required) | Secondary CTA link (optional) |
| Background image (optional) | |

### Authored example (3 panels)

| cs-hero | |
| --- | --- |
| Award | |
| A Leader for the seventh consecutive time | |
| 2026 Gartner® Magic Quadrant™ for Endpoint Protection | |
| [Download report](https://www.crowdstrike.com/...) | |
| | |
| | |
| AI is being adopted faster than companies can secure it. | |
| Secure AI with the platform built to stop breaches. | |
| [Learn more](https://www.crowdstrike.com/...) | |
| | |
| | |
| Secure the AI revolution | |
| Join 10,000+ security leaders at the premier event shaping cybersecurity's future. | |
| [Learn more](https://www.crowdstrike.com/...) | |

Panel separator: an empty row (all cells blank) is used to divide panels within the block table.

## Variant: static

Single-panel hero with no rotation controls. Use when the page requires a fixed hero without animation.

| cs-hero static | |
| --- | --- |
| Eyebrow text (optional) | |
| Headline (required) | |
| Body text (optional) | |
| CTA link (required) | Secondary CTA link (optional) |
| Background image (optional) | |

## Variant: dark

Same structure as default. Applies a dark navy background instead of the red-to-blue gradient.

| cs-hero dark | |
| --- | --- |
| Eyebrow text (optional) | |
| Headline (required) | |
| Body text (optional) | |
| CTA link (required) | Secondary CTA link (optional) |
| Background image (optional) | |

## Variant: image

Split layout on desktop — text content on the left, hero image on the right. On mobile, image stacks below text.

| cs-hero image | |
| --- | --- |
| Eyebrow text (optional) | |
| Headline (required) | |
| Body text (optional) | |
| CTA link (required) | Secondary CTA link (optional) |
| Hero image (required) | |

## Notes

- Panel separator rows (fully empty rows) divide individual carousel panels.
- The first panel's content is rendered eagerly for LCP; subsequent panels are deferred.
- Empty rows between panel groups must be preserved exactly as authored; do not collapse them.
- Background image cell, if provided, becomes a full-bleed background behind that panel's content.
