# V1 → V2 Donor Import Map

This file tracks anything lifted from the V1 repo (`C:\Users\beyon\OneDrive\Desktop\BensonStoneFireplaceQuote`) into V2. The V1 repo is **reference only** and must not be modified.

## Rules
- No wholesale folder copies.
- If you import a function, value, or pattern, add a row below.
- Prefer rewriting in V2 style over copy/paste.
- Customer-safe code only on the customer side (see `CUSTOMER_SAFE_BOUNDARY.md`).

## Imports

| Date | Source path (V1) | Destination path (V2) | What was taken | What changed | Why |
|---|---|---|---|---|---|
| 2026-05-16 | _(none)_ | _(none)_ | _(initial bootstrap wrote V2 fresh)_ | — | M0 deliberately ports zero code; tokens, schemas, and screens are V2-native rewrites. |

## Donor folders considered and rejected for M0
- `src/components/*` (Sales OS surfaces) — out of scope.
- `src/lib/customerFile*`, `bisTrack*`, `bulkIntake*`, `ocr*`, `quotePrep*`, `fieldRules*`, `salesOs*`, `proposal*`, `scannedPacket*`, `vendorPriceBooks*` — out of scope.
- `src/lib/hearthStudioSessionStorage.js` — relevant in spirit only. V2 uses its own `sessionStorage.js` with a different schema and a different storage key (`bsfa_v2.session.current`).
- `src/styles/tokens.css` — token philosophy informed `tailwind.config.js`, but no values were copied verbatim.
