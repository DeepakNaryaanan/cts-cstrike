# cs-product-showcase

Tabbed product explorer section. Each tab represents a product area; clicking a tab reveals a panel with headline, description, image, and CTA. Typically rendered on a dark background.

## Default Variant

Row 1 is the optional block-level section heading. Rows 2–N are individual tab/panel definitions (one row per tab).

| cs-product-showcase | |
| --- | --- |
| Section heading (optional) | |
| Tab label (required) | |
| Product headline (required) | |
| Product description (required) | |
| Product illustration / screenshot image (optional) | |
| CTA link — text + URL (required) | |

Repeat the five-cell panel group for each additional product tab.

### Authored example (4 tabs)

| cs-product-showcase | |
| --- | --- |
| Experience industry-leading solutions from one powerful platform | |
| Secure your AI | |
| Secure your AI | |
| Prevent data leaks and secure AI agents, apps, models, identities, and infrastructure — all from a single platform. | |
| [secure-ai-screenshot.png] | |
| [Discover AI Security](https://www.crowdstrike.com/platform/ai-security/) | |
| Secure your cloud | |
| CrowdStrike Falcon® Cloud Security | |
| Stop cloud breaches with unified agent and agentless protection. | |
| [cloud-security-screenshot.png] | |
| [Discover Cloud Security](https://www.crowdstrike.com/platform/cloud-security/) | |
| Stop identity attacks | |
| CrowdStrike Falcon® Next-Gen Identity Security | |
| Stop breaches faster with unified security for every identity — human, non-human, AI, and SaaS. | |
| [identity-security-screenshot.png] | |
| [Discover Identity Security](https://www.crowdstrike.com/platform/identity-security/) | |
| The next SOC era starts here | |
| CrowdStrike Falcon® Next-Gen SIEM | |
| The AI-native engine of the modern SOC, built to stop breaches — not just log them. | |
| [siem-screenshot.png] | |
| [Discover Next-Gen SIEM](https://www.crowdstrike.com/platform/next-gen-siem/) | |

## Variant: light

Identical structure to default. Applies a white or very light background instead of the dark background. Text colours invert accordingly.

| cs-product-showcase light | |
| --- | --- |
| Section heading (optional) | |
| Tab label (required) | |
| Product headline (required) | |
| Product description (required) | |
| Product image (optional) | |
| CTA link (required) | |

## Variant: vertical-tabs

Tab strip is positioned vertically on the left of the panel on desktop (min-width 900px). On mobile, tabs collapse to a horizontal strip or accordion. Same row/cell structure as default.

| cs-product-showcase vertical-tabs | |
| --- | --- |
| Section heading (optional) | |
| Tab label (required) | |
| Product headline (required) | |
| Product description (required) | |
| Product image (optional) | |
| CTA link (required) | |

## Variant: icon-tabs

Tabs include an icon above the label. The tab row gains an extra icon cell.

| cs-product-showcase icon-tabs | |
| --- | --- |
| Section heading (optional) | |
| Tab icon (optional — EDS icon reference or image) | |
| Tab label (required) | |
| Product headline (required) | |
| Product description (required) | |
| Product image (optional) | |
| CTA link (required) | |

## Notes

- Tab/panel group boundaries are positional: the tab label row marks the start of each new tab group.
- The section heading row (row 1) is optional; if the first authored cell matches a known heading pattern (H1–H3 markup in the cell), it is treated as the section heading.
- Only one tab panel is visible at a time. The first tab is active by default.
- Product images are lazy-loaded; only the active panel image is loaded on initial render.
- Tab label and product headline may differ (e.g., tab label "Secure your cloud" vs. panel headline "CrowdStrike Falcon® Cloud Security").
