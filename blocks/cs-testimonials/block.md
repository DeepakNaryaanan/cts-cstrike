# cs-testimonials

Customer testimonial carousel with auto-rotation. Displays quotes from real customers with attribution and optional story links. Typically rendered on a dark background.

## Default Variant

Row 1 is the block-level section heading and optional "View all" link. Rows 2–N are individual testimonial cards.

| cs-testimonials | |
| --- | --- |
| Section heading (required) | View all customer stories link (optional) |
| Quote text (required) | |
| Attribution: Name, Title, Company (required) | |
| Company logo image (optional) | |
| "Hear their story" CTA link (optional) | |

Repeat the four-cell testimonial group for each additional quote.

### Authored example

| cs-testimonials | |
| --- | --- |
| Customers trust CrowdStrike to protect what matters most | [View all customer stories](https://www.crowdstrike.com/customers/) |
| Our ability to respond to events has gone through the roof. Not only are we saving money, we're making our organization more secure. | |
| David Anderson, Deputy CISO, Travel + Leisure | |
| [travel-leisure-logo.png] | |
| [Hear their story](https://www.crowdstrike.com/customers/travel-leisure/) | |
| Most SIEMs are slow and clunky. With Falcon Next-Gen SIEM, we were getting results on day one. | |
| Nathan Kelly, Sr. Information Security Engineer, TaylorMade Golf | |
| [taylormade-logo.png] | |
| [Hear their story](https://www.crowdstrike.com/customers/taylormade/) | |
| Going from a bare-bones stack to a robust, integrated platform used to feel like a pipe dream. Now it's our reality. | |
| Richard Lee, Director of Cybersecurity and Privacy, the ALDO Group | |
| [aldo-logo.png] | |
| [Hear their story](https://www.crowdstrike.com/customers/aldo-group/) | |

## Variant: light

Identical structure to default. Applies a white or light grey background with dark text instead of the dark background. The "Hear their story" CTA and quote marks adapt to dark-on-light styling.

| cs-testimonials light | |
| --- | --- |
| Section heading (required) | View all customer stories link (optional) |
| Quote text (required) | |
| Attribution: Name, Title, Company (required) | |
| Company logo image (optional) | |
| CTA link (optional) | |

## Variant: static

All testimonials rendered simultaneously in a responsive grid. No carousel, no auto-rotation. Use on dedicated customer stories or testimonials pages.

| cs-testimonials static | |
| --- | --- |
| Section heading (required) | View all customer stories link (optional) |
| Quote text (required) | |
| Attribution: Name, Title, Company (required) | |
| Company logo image (optional) | |
| CTA link (optional) | |

## Variant: logo-only

Displays a horizontal strip of customer/partner logos with no quotes. Used as a "Trusted by" social proof strip.

| cs-testimonials logo-only |
| --- |
| Section heading (optional) |
| Company logo image (required) |
| Company name — used as alt text (required) |
| Company link (optional) |

## Notes

- Testimonial card boundaries are positional: the quote text row marks the start of each new testimonial.
- Attribution is a single authored cell containing "Name, Title, Company" as free text. Blockwright splits on the first comma to separate name from role+company for display styling purposes.
- Company logos should be the white/reversed variant for use on dark background (default/light variant uses full-colour logos).
- The block-level "View all customer stories" link (column 2 of row 1) is shared across all slides; it is not per-card.
- If a "Hear their story" link is omitted for a card, that card simply does not render the CTA element.
