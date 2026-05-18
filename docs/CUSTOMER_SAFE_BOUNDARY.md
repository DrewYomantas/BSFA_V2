# Customer-Safe Boundary

What may appear on customer-facing screens, what may not, and where the line is enforced.

## Customer-facing surface
- `src/screens/customer/WelcomeScreen.jsx`
- `src/screens/customer/BuildScreen.jsx`
- `src/screens/customer/SummaryScreen.jsx`
- The header `AppShell` whenever the path does NOT start with `/rep`

Anything rendered inside the surface above is considered customer-safe.

## Hard "do not display" list (customer surface)
- Cost, price, margin, discount, list price, dealer cost
- Supplier, vendor, manufacturer SKU, brand cost sheet
- BisTrack, ERP, work order, P.O., handoff, internal scheduler
- OCR, confidence, scanned-packet, intake, queue, rank, score
- Rep notes, customer file ID, internal CRM fields
- "AI", "before/after", "predicted", "estimated render accuracy", or any claim of AI generation
- Customer PII other than what they typed themselves on screen

## Hard "do not phrase" list
- "Quote" → use "your hearth", "your picture", "what you chose"
- "Sales" / "Proposal" / "Packet" / "Workflow" — never in customer copy
- "Confidence" / "Likely" / "Predicted" — never in customer copy

## Data discipline
- Rep-only state lives under `session.rep.*` and `session.customer.*` and must never be read by anything in `src/screens/customer/*`.
- The `?debug=1` JSON dump is dev-only; ship behind a build flag or gate before any in-store demo.
- "Take this home" delivery (when implemented) must not include any of the forbidden fields above.

## Review checklist (every customer-screen PR)
- [ ] Component only references `session.build` and static `buildOptions.js` data.
- [ ] No imports from `src/screens/rep/**` or rep-only libs.
- [ ] No text in the forbidden list.
- [ ] No image filename or alt text that leaks supplier or SKU.
- [ ] No console.log of full `session` left in.
