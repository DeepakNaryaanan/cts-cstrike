# cs-adversary-cta

Full-width dark call-to-action section. Minimal content: headline, body, and a single primary CTA button. Designed for high-impact conversion moments between page sections.

## Default Variant

Single-row block. All content authored in one table.

| cs-adversary-cta |
| --- |
| Eyebrow / label text (optional) |
| Headline (required) |
| Body text (required) |
| Primary CTA link — text + URL (required) |
| Secondary CTA link — text + URL (optional) |

### Authored example

| cs-adversary-cta |
| --- |
| |
| Know them. Find them. Stop them. |
| Adversaries are operating with unprecedented stealth, and today's attacks take only minutes to succeed. Discover the adversaries targeting your organization. |
| [Explore Adversary Universe](https://www.crowdstrike.com/adversary-universe/) |
| |

## Variant: split

Two-column layout on desktop — headline and body on the left, CTA button on the right. On mobile (< 900px), falls back to the same centred stacked layout as default.

| cs-adversary-cta split |
| --- |
| Eyebrow / label text (optional) |
| Headline (required) |
| Body text (required) |
| Primary CTA link (required) |
| Secondary CTA link (optional) |

## Variant: light

White background with dark text. CTA button remains CrowdStrike red. Same content structure as default.

| cs-adversary-cta light |
| --- |
| Eyebrow / label text (optional) |
| Headline (required) |
| Body text (required) |
| Primary CTA link (required) |
| Secondary CTA link (optional) |

## Variant: with-eyebrow

Emphasises the eyebrow label above the headline. The eyebrow is displayed as a small caps or badge element. This is a presentation-only variant; the authored content structure is identical to default — the eyebrow cell is simply populated.

| cs-adversary-cta with-eyebrow |
| --- |
| Eyebrow / label text (required for this variant) |
| Headline (required) |
| Body text (required) |
| Primary CTA link (required) |
| Secondary CTA link (optional) |

## Notes

- The eyebrow cell is always row 1. If left empty, no eyebrow element is rendered.
- The primary CTA link text is used verbatim as the button label. Authors should write descriptive CTA text (e.g., "Explore Adversary Universe") rather than generic text ("Learn more").
- This block requires no JavaScript for the default and light variants — it may be implemented as a CSS-only block.
- The `split` variant requires JavaScript only on mobile to revert to stacked layout; CSS Grid is the primary implementation mechanism.
