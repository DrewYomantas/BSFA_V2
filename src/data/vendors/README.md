# Vendor SKU Catalogs

Canonical vendor price books for Benson Stone's Fireplace department, extracted from the FP Central PDFs in Drive. These are the "true prices the department references and uses" (per Drew, 2026-05-20).

## What's in here

- **29 vendor JSON files** — each vendor's full SKU catalog with dealer prices (no MSRP — HHT and several others publish dealer-only pricing now).
- **`_unified-index.json`** — flat denormalized index of every SKU across all 29 vendors. 5,057 total SKUs, 4,840 priced. Use for cross-vendor SKU lookups.

## Source

Built by a brochure audit of `G:\My Drive\Benson Stone Company\audit-output\` (Drew's Google Drive). Each JSON's `drive_id` field links back to the source PDF in Drive.

## Shape

The richest example is `empire-gas-june-2025-skus.json`. Top-level keys:

```
{
  vendor, price_book_title, drive_id, effective_date, currency,
  price_field_note,        // explains pricing convention (dealer vs MSRP)
  discontinued: [],        // SKUs marked discontinued
  categories: [...],       // category enum used by .models[].category
  model_count, models: [
    {
      vendor, model_code, model_name, category,
      width_inches, height_inches, depth_inches,
      fuel_type, ignition, btu_input, viewing_area,
      dealer_price, msrp,    // dollars; msrp usually null
      accessories_required, notes,
      parent_series, page
    }
  ]
}
```

Some vendor JSONs (Heatilator, Travis Fire Garden) have caveat notes — read `price_field_note` and `extraction_note` before relying on those.

## Customer-safe boundary

This data contains **dealer prices, supplier names, internal SKUs** — none of which may appear on customer screens (see `docs/CUSTOMER_SAFE_BOUNDARY.md`). Use only from `src/screens/rep/**` or in internal/rep-side blocks of v8 manifest entries.

## Maintenance

- Vendor JSONs are point-in-time snapshots. Re-extract from Drive when a vendor publishes a new price book.
- The Drive folder `audit-output/vendors/` is the source of truth; this directory is a synced copy.
- Last sync: 2026-05-20.
