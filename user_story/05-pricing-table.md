# User Story: Pricing Table

**Block name:** cs-pricing-table
**Priority:** P1 — conversion-critical section; complex interactive component

---

## User Story

As a **prospective customer**, I want to compare CrowdStrike's pricing plans side by side with feature checklists so that I can choose the right plan for my organisation's needs.

As a **marketing author**, I want to manage plan names, prices, feature lists, and CTAs in a document table so that pricing updates do not require code changes.

---

## Acceptance Criteria

### Markup
- The block renders with a section heading (`<h2>`) and optional subtitle/contact line.
- A tab group (`<div role="tablist">`) contains two tabs: "Monthly pricing" and "Annual pricing".
- Each tab is a `<button role="tab" aria-selected aria-controls="panel-{id}">`.
- The corresponding tab panels are `<div role="tabpanel" id="panel-{id}" aria-labelledby="tab-{id}">`.
- Within each panel, plans are rendered as a responsive table or card row.
- Each plan has: plan name (`<h3>`), price display (amount + interval), feature list (`<ul>` with checkmarks), and a CTA button or link.
- Feature rows use `aria-checked` semantics or checkmark icons with screen-reader-visible text ("Included" / "Not included").
- The "Most popular" / recommended plan is flagged with `aria-label` and visual badge.

### Styling
- Desktop (900px+): horizontal plan comparison table; plans side by side with sticky feature row labels on the left.
- Tablet (600px+): 2–3 plans visible; others accessible via horizontal scroll.
- Mobile: single-plan view with a plan selector (dropdown or horizontal scroll tabs at top).
- Tab strip: underline or pill style for Monthly / Annual toggle; active tab indicated by colour and `aria-selected="true"`.
- Plan card: white background, border, rounded corners. Highlighted/recommended plan has a red (`#EC0000`) top border or highlighted header.
- Price: large display text (~36px), bold, dark. Interval ("/device/mo") in smaller subdued text.
- Feature checklist: checkmark icon (green or brand colour) for included; dash or greyed icon for not included.
- CTA buttons: primary (filled red) for paid plans; ghost/outline for "Contact sales"; text link for "Free trial".

### Behaviour
- Clicking "Monthly pricing" / "Annual pricing" tab switches the visible panel; the previously visible panel gets `hidden` attribute.
- Tab switching does not cause page scroll or layout shift.
- On mobile, a plan-selector (dropdown or swipe) controls which plan is fully visible.
- "Add to cart" and "Start free trial" links navigate to the CrowdStrike store/sign-up URLs (authored as links in the block table).
- "Contact sales" opens a contact form or navigates to a contact page (authored as link).

### Accessibility (WCAG 2.1/2.2 AA)
- Tab keyboard pattern: `Tab` moves focus into the tablist; `ArrowLeft`/`ArrowRight` cycles tabs; `Enter`/`Space` activates.
- Active tab panel is the only non-hidden panel.
- Feature checklist items use `aria-label` or visually hidden text to convey "Included" / "Not included" to screen readers — checkmark icons alone are insufficient.
- Price amounts are readable: avoid splitting amount and currency across elements without `aria-label` on the parent.
- "Most popular" badge does not rely on colour alone; also conveyed in text.

### Performance
- The tab toggle is pure CSS-driven where possible (`hidden` attribute toggle); JavaScript only for tab ARIA state updates.
- No third-party pricing widget libraries.
- Feature data is authored inline in the document, not fetched from an API.

---

## Variant Inventory

| Variant | Block class | Description |
|---|---|---|
| `default` | `cs-pricing-table` | Monthly / Annual tab group with full plan comparison grid |
| `single-billing` | `cs-pricing-table single-billing` | No tabs; one billing period only (e.g., annual-only page) |
| `compact` | `cs-pricing-table compact` | Fewer feature rows shown by default; "Show all features" expandable accordion |
| `enterprise` | `cs-pricing-table enterprise` | No per-device price; "Contact sales" only CTA; used for enterprise-tier pages |

---

## Content Fields

### Block-level (row 1)
1. Section heading (required)
2. Subtitle / contact info line (optional)

### Tab labels (row 2)
1. Tab 1 label — e.g., "Monthly pricing" (required)
2. Tab 2 label — e.g., "Annual pricing" (required)

### Per plan (one column, spanning both tab panels)
1. Plan name (required)
2. Monthly price + interval (required for monthly panel; optional if no price)
3. Annual price + interval (required for annual panel; optional if no price)
4. CTA link text + URL (required)
5. CTA type hint: "primary" | "ghost" | "link" (optional — inferred from plan tier)
6. Feature list items — one feature per sub-row, with included/not-included flag (required)
7. "Recommended" / badge flag (optional)

---

## Open Questions

1. How are feature checklist rows modelled in the da.live block table? Each feature row needs to appear in every plan column — is this a 2D table (features as rows, plans as columns), or is it a repeating structure? This is the highest-complexity modelling challenge and needs a joint decision with blockwright before coding begins.
2. Is the "Free Trial" plan a separate column, or a top-row CTA above all plans?
3. Are prices authored as plain text ("$14.99") or as separate amount and currency fields?
4. Does the "Contact sales" phone number (888-512-8906) belong inside the block, or is it default section content above the block?
5. Is `cs-pricing-table enterprise` a separate block variant or a full separate block?
