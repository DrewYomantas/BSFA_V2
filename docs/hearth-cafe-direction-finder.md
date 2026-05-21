# Hearth Cafe Direction Finder

This helper is a headless, deterministic narrowing layer for the Hearth Cafe concept. It takes three seated-first inputs:

- current setup
- main goal
- style direction

It uses the real V8 manifest and display-register data to return 2-3 customer-safe direction objects from the active recommendable set.

## What It Does

- Scores recommendable V8 manifest records against setup, goal, and style signals.
- Returns customer-safe product directions with a short reason, matched signals, showroom cue, and next action text.
- Keeps a separate internal handoff object for rep follow-up.
- Reports skipped records that are display-only, verification-required, or still pending review in the gap list.

## What It Does Not Do

- It does not create a full recommender.
- It does not make quote, pricing, dimension, clearance, compatibility, or install claims.
- It does not save sessions or create customer records.
- It does not expose dealer cost, margin, spiffs, raw confidence, source uncertainty, OCR notes, or internal coaching notes.
- It does not mount into the main customer UI.

## Why It Is Headless For Now

The direction logic is useful now, but the current V9 visuals are not approved as the final customer-facing shell. Keeping this as pure product logic lets the project keep moving without locking more workflow into a screen that still needs a separate visual reset and critique pass.
