# Audit Content — Library Sync

Synced content from `G:\My Drive\Benson Stone Company\audit-output\library\` — strategic narrative, voice transcripts, insight extractions, and product reference. Source of truth lives in Drive; this directory is a working copy for V2 development.

## What's here

| File / dir | What it is |
|---|---|
| `strategic-context.md` | The "why" behind BSFA V2 — Benson's positioning, the rep workflow we're modeling, what V1 got wrong |
| `liam-transcript-insights.md` | Distilled patterns from Liam's voice notes (top seller, lead-with statements, objection handling) |
| `voice-notes-insights.md`, `voice-notes-batch2-insights.md` | Multi-transcript synthesis. Use these to source `rep.salesNotes` and `rep.liamVoiceCallback` in v8 manifest entries |
| `voice-notes/` | Raw voice transcripts + per-transcript insight extractions |
| `App-Intelligence-Register-clean.md` | Inventory of every BSFA-relevant app/doc/system in Drive — what they are and where they live |
| `LIBRARY-CATALOG.md` | Quick map of the audit-output library (overlap with this README, kept for round-trip) |

## What lives elsewhere in V2

The audit output was split across V2:

- `src/data/vendors/` — 29 vendor SKU catalogs (price books)
- `src/data/showroom/first-floor-displays.json` — the showroom display register (~50 positions)
- `src/data/reference/` — operational data the rep needs: hearth pricing, service pricing, spiffs, field rules, vendor cards, gas-log-vs-insert sales script, wood/electric 101
- `docs/audit-content/` (this dir) — narrative, voice, and reference docs

Anything in `src/data/` is consumable by JS code. Anything in `docs/` is for humans (rep + dev reference).

## Customer-safe boundary

These docs contain dealer prices, vendor/supplier names, and internal sales notes. Do not import any of this into `src/screens/customer/**`. See `docs/CUSTOMER_SAFE_BOUNDARY.md`.

## Voice-note filename convention

Transcripts were renamed during audit from Drive's "Apr 22 at 11_02 AM.txt" form to `voice-note-apr22-1102-raw.txt`. v8 manifest entries that still reference the old Drive form should be updated to the audit-stable name.

## Sync state

Last sync from Drive: 2026-05-20. Re-sync when audit-output gets new content.
