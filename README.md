# BSFA V2 — Benson Stone Fireplace App

Clean-slate Vite + React + Tailwind app for the customer-facing Hearth Studio and the rep-facing Sales Workbench.

## Stack
- Vite + React 18 (JS)
- Tailwind CSS
- react-router-dom v6
- localStorage-backed session state
- Static render manifest (placeholder SVGs now, UE5 PNG/MP4 later)

## Run
```
npm install
npm run dev
npm run build
```

## Scope
Customer flow: Welcome → Build → Summary.
Rep flow: Start Session → Session Close → Send Summary.

Out of scope here (intentionally not ported from V1): CRM/customer file library, OCR intake, bulk intake, activity timeline, Smart Context drawer, rep login, BisTrack handoff, quote prep gate, field rules UI.

See `docs/V2_BUILD_PLAN.md`, `docs/CUSTOMER_SAFE_BOUNDARY.md`, `docs/ASSET_MANIFEST_SPEC.md`, `docs/V1_DONOR_IMPORT_MAP.md`.
