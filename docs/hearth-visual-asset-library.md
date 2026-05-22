# Hearth Visual Asset Library

The app-side Drive folder is:

https://drive.google.com/drive/folders/1uV_QRs3sQGtipU6ELxUTqABn7RJGrpLP

Folder name: `Fireplace Department App Project > Hearth Visual Asset Library`

## Folder Structure

- `01 - Stone Material Photos`
- `02 - Fireplace Unit Face References`
- `03 - Mantels & Wood Beams`
- `04 - Hearths & Slabs`
- `05 - Customer Room Photos`
- `06 - Premade Benson Room References`
- `07 - Brochure Image Candidates`
- `08 - Processed / Cropped Assets`
- `09 - Customer-Safe Concept Outputs`
- `10 - Asset Indexes & Notes`
- `99 - Do Not Use / Needs Review`

Confirmed current items:

- `01 - Stone Material Photos` contains `Eldorado Stone - Nantucket Stacked Stone`.
- `10 - Asset Indexes & Notes` contains `stage_v1b_existing_material_image_inventory.md`.
- The Google Doc `Hearth Visual Asset Library - README & Intake Index` currently exists in the library root and may move into `10 - Asset Indexes & Notes` later.

## Purpose

This library gives BSFA_V2 a source-backed visual reference layer for Hearth Studio. It can represent stone photos, fireplace face references, mantels, hearths/slabs, customer room photos, premade Benson room references, brochure image candidates, processed/cropped assets, and customer-safe concept outputs without pretending those assets are final product truth.

The model lives in `src/data/hearthVisualAssets/` and `src/lib/hearthVisualAssets/`. It is deterministic, local, and review-first.

## Classification Rules

Photos and brochure images should be classified by asset type, source kind, safe uses, prohibited uses, and whether the record can be summarized for a customer.

- Stone photos can be customer-safe visual references only after the source item is reviewed.
- Brochure images start as `brochure_image_candidate`, not final customer product truth.
- Customer room photos should remain private source material unless a customer-safe derivative is explicitly created and labeled.
- Processed/cropped assets should point back to their source when that source is known.
- Concept outputs must be labeled conceptual.
- Unknown Drive file URLs should stay `null` until confirmed.

Source tracking fields now include:

- `driveFolderUrl` and `driveFileUrl` for exact Drive locations when known.
- `sourceDocumentTitle` and `sourcePageOrSection` for repo/Drive evidence.
- `sourceType` for folder, file, markdown index, brochure group, or candidate group.
- `lastReviewedDate`, `reviewedBy`, and `reviewStatus` for review state.
- `customerSafeUse` for the one approved customer-facing use, if any.

Current promoted record:

- `Eldorado Stone - Nantucket Stacked Stone` is marked `reference_ready` for customer material reference only. Its exact Drive folder URL is still missing in repo docs/data, so the app flags that blocker instead of inventing a URL.

Current needs-review groups:

- `stage_v1b_existing_material_image_inventory.md` is an index source, not individual image approval.
- Eldorado Cliffstone, Imperial ProStack white stacked ledge, Dutch Quality Winter Point Weatherledge, Dutch Quality Greystone Rough Ashlar, Dutch Quality Coal Crest Weatherledge, Collinswood mantel display, and Log Style Mantels beam photos need individual source review.
- FPX, Lopi, Kingsman, Napoleon, and Stoll brochure groups are candidates only until specific images are reviewed.

## Customer-Safe Meaning

`customerSafe: true` means the asset can support a visual conversation. It does not mean final approval, compatibility, availability, pricing, dimensions, venting, clearances, or install layout.

Customer-safe summaries must not expose cost, margin, spiff, OCR details, source confidence wording, raw source uncertainty, internal notes, or "Needs Verification" language.

Required customer-facing disclaimer:

`Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details are confirmed before quote/order.`

## Why UE5/RFA Is Paused

The previous UE5/RFA route is not the primary near-term path because Drew does not have reliable Revit/CAD access and cannot depend on CAD conversion. The better foundation is a source-backed photo and brochure workflow: showroom photos, material sample photos, vendor brochure imagery, and customer room photos that help guests visualize directions honestly.

UE5 can still use reviewed assets later as a rendering source. It should not drive the truth model.

## Future Use

This layer can later feed Hearth Vision Studio and customer room visualizations by supplying reviewed material references, room-reference inspiration, and labeled conceptual outputs.

The next app pass should connect real Drive item URLs into the seed records or replace the seed with an intake-generated index after the Drive folder is stable.

## Intentionally Not Built

- No image generation calls.
- No actual customer photos stored in code.
- No fake exact product imagery.
- No customer-facing proposal output wiring.
- No pricing, quote, venting, clearance, dimension, availability, or install compatibility claims.
- No UE5 asset import.
- No upload handling.
