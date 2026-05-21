# Reference Data

Operational data the rep workflow depends on — pricing, field rules, sales scripts, vendor positioning. Synced from `G:\My Drive\Benson Stone Company\audit-output\library\`.

## Files

| File | Purpose |
|---|---|
| `vendor-cards-v2.json` | Per-vendor positioning cards — role, good-fit customer, watch points, current price book ref. Use to seed `customer.styleAffinity`, `customer.bestFor`, and rep cross-sell logic |
| `vendor-cards-corrections-2026-05-19.json` | Corrections layered on top of vendor-cards-v2 (apply before reading) |
| `price-book-index.json` | Maps each vendor to their current price book PDF (drive_id + effective date + GPT-use note). Lookup table for `sources.brochureRefs` |
| `hearth-pricing.json` | Hearth/mantel pricing reference (stone shop side) |
| `service-pricing.json` | Service & install call pricing |
| `field-rules-may-2026.json` | Rockford-area code rules (e.g., millivolt restriction inside city limits) |
| `spiffs.json` | Current vendor spiff / promo / margin notes |
| `gas-log-vs-insert-sales-script.json` | Structured script for the gas-log vs insert customer conversation |
| `wood-burning-and-electric-101.json` | Education content — wood-burning and electric fireplace fundamentals |
| `Manual-Model-Quick-Reference.md` | Legacy manual lookup index (14 legacy PDFs with model aliases) — use when customer brings in an old unit |

## Customer-safe boundary

Pricing, spiffs, and vendor data here are **rep-only** — do not import from `src/screens/customer/**`.
