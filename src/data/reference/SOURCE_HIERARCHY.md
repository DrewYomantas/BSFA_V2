# Source Hierarchy — BSFA Reference Data

Explains the three data layers and how product information flows from raw vendor sources
into the app's review surface.

## Layer 1 — Vendor SKU files (`src/data/vendors/`)

Raw price book extracts, one file per vendor (e.g., `kozy-heat-june-2025-skus.json`).
Each SKU record has: `model_code`, `model_name`, `category`, dimensions, fuel type,
ignition, BTU, MSRP, and `parent_series`.

**Use as:** The source of record for individual SKU specs. Read before quoting or
planning rough openings. Cross-check against the current price book PDF in FP Central
before committing to a price.

**Known gaps:** Some records have `null` dimensions (e.g., Chaska 25 / CSK-25). These
were not in the price book extract. Pull from the install manual or vendor portal before
using in fabrication or stonework planning.

---

## Layer 2 — Reference data (`src/data/reference/`)

Synthesized positioning cards, field rules, pricing, and product-truth records built
from Layer 1 plus Benson-internal Drive documents.

| File | What it adds |
|---|---|
| `vendor-cards-v2.json` | Per-vendor positioning, Liam recommendations, watch points |
| `vendor-cards-corrections-2026-05-19.json` | Delta corrections — apply over v2 before reading |
| `hearth-pricing.json` | Stone shop hearth/mantel pricing |
| `field-rules-may-2026.json` | Rockford code rules (millivolt restriction, etc.) |
| `price-book-index.json` | Drive ID + effective date per price book PDF |

**Use as:** Structured context for the rep agent and packet builder. More human-readable
than Layer 1, but less granular on per-SKU specs.

---

## Layer 3 — Visual asset seed (`src/data/hearthVisualAssets/hearthVisualAssetSeed.js`)

Source-tracked records for the visual review workflow. Covers three record kinds:

| `assetType` | What it tracks |
|---|---|
| `stone_sample`, `mantel_reference`, etc. | Visual image assets (photos, brochures) |
| `brochure_image_candidate` | Brochure pages pending individual review |
| `product_truth` | Structured SKU records with source traceability (new in 2026-05-24) |

Product-truth records lift key fields from Layer 1 (model codes, dimensions, MSRP) and
attach source provenance so Drew can review them in `/hearth-visual-assets` alongside
visual candidates.

---

## Intake folder

The Drive folder `Hearth Visual Asset Library` (see `HEARTH_VISUAL_ASSET_LIBRARY_URL` in
the seed) is the intake point for new showroom photos, brochure images, and room
references. Sub-folders 01–09 map to `assetType` categories. Folder 10 holds indexes and
notes (e.g., `stage_v1b_existing_material_image_inventory.md`). Folder 99 is quarantine
for assets that fail review.

**Workflow:** Drop new assets into the appropriate sub-folder → triage in the seed file
(add a `needs_review` or `brochure_image_candidate` record) → promote to `reference_ready`
after individual review with source URL and review date recorded.

---

## Source confidence levels

| Level | Meaning |
|---|---|
| `high_visual_reference` | Drew's own showroom photo, confirmed folder + review date |
| `medium_visual_reference` | Third-party image, reviewed but no drive file URL |
| `medium_sku_source` | Confirmed dimensions from vendor SKU extract, not yet field-verified |
| `low_pending_review` | Candidate or index — individual records not yet reviewed |
| `do_not_use` | Flagged — do not surface to customers or use in planning |

---

## Customer-safe boundary

Product-truth records (`assetType: 'product_truth'`) are **never** customer-safe.
They are internal references only. The `prohibitedUses` list on each record spells out
what not to do before rep review.

Rep-only data boundary: `src/data/reference/` and `src/data/vendors/` must never be
imported from `src/screens/customer/**`. See CLAUDE.md Data Boundary Rule.
