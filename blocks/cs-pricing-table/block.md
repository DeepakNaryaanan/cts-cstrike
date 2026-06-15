# cs-pricing-table

Tabbed pricing section with plan comparison. Supports monthly and annual billing tabs. Authors define plans as columns within a structured table; features are defined as rows.

IMPORTANT: This is the most structurally complex block in this project. The content model below uses a 2D approach — features as rows, plans as columns — which maps naturally to a da.live multi-column block table. Blockwright must implement the decoration to transpose and render this authored structure into the final UI.

## Default Variant

The block table uses a 2-column structure: row 1 = block header; row 2 = section heading + subtitle; row 3 = billing period tab labels; rows 4+ = plan definitions.

### Block-level rows

| cs-pricing-table | |
| --- | --- |
| Section heading (required) | Subtitle / contact info line (optional) |
| Monthly pricing tab label (required) | Annual pricing tab label (required) |

### Plan definition rows

Each plan occupies its own row group. A plan row group consists of: plan name row, monthly price row, annual price row, CTA row, feature rows (one per feature), and an optional "recommended" flag row.

| cs-pricing-table | |
| --- | --- |
| Section heading (required) | Subtitle / contact info line (optional) |
| Monthly pricing (required — tab label) | Annual pricing (required — tab label) |
| Free Trial (plan name) | Security Essentials (plan name) |
| Free (monthly price — use "Free" for no-cost plans) | $0/device/mo (annual price) |
| Try free (CTA text + link) | Add to cart (CTA text + link) |
| Next-Gen Antivirus: included | Next-Gen Antivirus: included |
| Device Control: included | Device Control: not included |
| Mobile Device Protection: not included | Mobile Device Protection: not included |

The feature row format is: `Feature name: included` or `Feature name: not included`. Blockwright parses the colon-separated value to determine the checkmark/dash rendering.

## Full multi-plan example (abbreviated)

| cs-pricing-table | | | | |
| --- | --- | --- | --- | --- |
| Tailored bundles to stop breaches | Need help? Contact us: (888) 512-8906 | | | |
| Monthly pricing | Annual pricing | | | |
| Free Trial | Security Essentials | Enhanced Protection | Advanced Protection Enterprise | Complete Next-Gen MDR |
| Free | $0/device/mo | $14.99/device/mo | $19.99/device/mo | Contact us |
| Try free | Add to cart | Start free trial | Start free trial | Schedule a demo |
| | | | | recommended |
| Next-Gen Antivirus: included | Next-Gen Antivirus: included | Next-Gen Antivirus: included | Next-Gen Antivirus: included | Next-Gen Antivirus: included |
| Device Control: not included | Device Control: included | Device Control: included | Device Control: included | Device Control: included |
| Mobile Device Protection: not included | Mobile Device Protection: not included | Mobile Device Protection: included | Mobile Device Protection: included | Mobile Device Protection: included |
| Firewall Management: not included | Firewall Management: not included | Firewall Management: included | Firewall Management: included | Firewall Management: included |
| EDR: not included | EDR: not included | EDR: included | EDR: included | EDR: included |

Columns 1–N each represent one pricing plan. The "recommended" cell flags that plan with a visual badge.

## Variant: single-billing

No tab strip. A single billing period is shown. Use the same plan column structure but omit the tab label row.

| cs-pricing-table single-billing | | | |
| --- | --- | --- | --- |
| Section heading (required) | Subtitle (optional) | | |
| Free Trial | Security Essentials | Enhanced Protection | Advanced Protection Enterprise |
| Free | $0/device/mo | $14.99/device/mo | $19.99/device/mo |
| Try free | Add to cart | Start free trial | Start free trial |
| Next-Gen Antivirus: included | Next-Gen Antivirus: included | Next-Gen Antivirus: included | Next-Gen Antivirus: included |

## Variant: compact

Same structure as default. Adds a "Show all features" toggle that hides feature rows beyond the first 5 by default. The visual treatment is CSS/JS — the authored content model is identical to default.

| cs-pricing-table compact | | | |
| --- | --- | --- | --- |
| (same structure as default) | | | |

## Variant: enterprise

No per-device price. Single plan, single CTA ("Contact sales"). Feature list is optional.

| cs-pricing-table enterprise |
| --- |
| Section heading (required) |
| Plan name (required) |
| Contact sales link (required) |
| Feature name: included (optional — repeat per feature) |

## Notes

- The multi-column table structure requires da.live authors to author a table with N+1 columns where N = number of plans.
- The "recommended" row cell value must literally be the word `recommended` (case-insensitive) in the correct column position to trigger the badge.
- Monthly vs. annual pricing: the block renders two rows for price (row 4 = monthly price, row 5 = annual price). The tab toggle shows/hides price rows by billing period.
- Feature rows: the `included` / `not included` suffix after the colon is the machine-readable flag; the feature name before the colon is the display label.
- Open question: confirm exact da.live multi-column table authoring format with blockwright before implementation — this model is the most complex in the project.
