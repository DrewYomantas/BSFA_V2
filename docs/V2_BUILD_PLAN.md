# BSFA V2 Build Plan

## Why this exists
V1 (`BensonStoneFireplaceQuote`) grew a heavy Sales OS surface — customer file, OCR intake, bulk intake, BisTrack handoff, quote prep gate, field rules UI, rep login, activity timeline. V2 resets to a customer-first product: a calm, premium Hearth Studio experience that a guest can drive on their own, supported by a thin rep workbench.

## Milestones
- **M0 — Bootstrap (done in initial pass).** Fresh Vite + React + Tailwind, six screens reachable, serializable session in context, localStorage persistence, placeholder render manifest, four docs.
- **M1 — Visual polish.** Refine typography, surface gradient, tile hover/selected states. Real photography or UE5 stills in `public/assets/renders/`.
- **M2 — Persistence breadth.** Multi-session history (`bsfa_v2.session.list`), resume, abandon. Still local.
- **M3 — UE5 wire-in.** UE5 emits PNG/MP4 into `public/assets/renders/<category>/` and updates `manifest.json`. No React code change required.
- **M4 — Take-home delivery.** Real "Take this home" action: email/SMS send, summary PDF/page.
- **M5 — Rep workflow.** Real rep auth, persisted session archive, optional handoff payload — scoped narrowly, never bleeding into the customer UI.

## Customer-safe vs rep-only split
- `src/screens/customer/*` — all customer-facing. Must obey `CUSTOMER_SAFE_BOUNDARY.md`.
- `src/screens/rep/*` — rep-only. May reference internal fields like `session.customer`, `session.rep.notes`, debug payloads.
- `session.rep.*` and `session.customer.*` must never render in customer screens.

## Intentionally out of scope (V1 carry-overs we are NOT porting)
- CRM / customer file library
- OCR intake / scanned packet workspace
- Bulk intake queue
- Activity timeline
- Smart Context drawer
- Rep login
- BisTrack handoff sheet
- Quote prep gate
- Field rules UI
- Old `App.jsx` routing graph

## Routing
| Path | Screen | Audience |
|---|---|---|
| `/` | WelcomeScreen | Customer |
| `/build` | BuildScreen | Customer |
| `/summary` | SummaryScreen | Customer |
| `/rep/start` | StartSessionScreen | Rep |
| `/rep/close` | SessionCloseScreen | Rep |
| `/rep/send` | SendSummaryScreen | Rep |

## Build/Run
```
npm install
npm run dev
npm run build
```

Append `?debug=1` to `/build` to see the live session JSON during development.
