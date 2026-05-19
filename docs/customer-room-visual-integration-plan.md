# Customer Room Visual Integration Plan

Last reviewed: 2026-05-19

## Current Repo Findings

The current customer flow is still the original V2 Hearth Studio path:

- `/` renders `WelcomeScreen`, which starts the customer session and navigates to `/build`.
- `/build` renders `BuildScreen`, then `BuildV5`.
- `/summary` renders `SummaryScreen`, then `SummaryV5` as the take-home folio surface.
- `/stone-shop-packet` is separate backstage tooling through `StoneShopPacketScreen` and `StoneShopPacketBuilder`.

The current `/build` screen has two visual modes in `BuildV5`:

- `3D hearth`: lazy-loads `CustomerHearthBuild3D`.
- `Materials`: preserves the V6 material-selection stage with tray, stack badge, and static/render-manifest driven preview.

The 3D proof slice currently lives as a customer-facing build-mode branch inside `src/screens/customer/hearth/BuildV5.jsx`. It is useful, but it behaves like a standalone hearth configurator because its hearth model state is local to `CustomerHearthBuild3D` and does not yet participate in the main customer selection or take-home flow.

The current session shape in `src/state/sessionSchema.js` stores customer, project, guide, six material/build selections, and rep notes. It does not yet store room photos, room measurements, visual mode, or hearth dimension state.

The shared hearth seam exists in `src/lib/sharedHearthModel.js`. Backstage 2D shop logic now calls through `src/lib/stoneShop/stoneShopShapeModel.js`, while customer 3D logic uses the same shape names:

- `basic`
- `clipped_corners`
- `angle_cuts`
- `radius_front`

This is the right foundation. The next pass should move customer room and hearth state around this seam rather than duplicating geometry inside one component.

## Visual Thesis

The fireplace and room should be the hero: a large, quiet visual surface that helps a seated customer understand scale, with controls acting like a guide's hand on the table instead of a dense configurator.

## Recommended Visual Architecture

Use three customer-facing visual modes inside the main Build experience:

1. `Your Room`
2. `Scale Model`
3. `Design Preview`

These should replace the current `3D hearth` / `Materials` toggle over time. The route can stay `/build`, but the internal view should become a room-first stage with modes.

### 1. Your Room

Purpose: establish the customer's room context before asking them to judge hearth scale.

Hero visual:

- Customer uploaded room photo if present.
- Otherwise a small set of premade room scenes.

Supporting inputs:

- Room photo upload or premade room scene choice.
- Rough wall width.
- Rough ceiling height.
- Optional notes like "existing fireplace" or "blank wall".

Copy posture:

- "Start with the room."
- "This helps your guide talk through proportion and placement."

Do not imply AI reconstruction, exact measuring, or final design approval.

### 2. Scale Model

Purpose: use the current 3D hearth proof slice as a visual planning aid in the selected room context.

Hero visual:

- 3D room wall/floor/opening/hearth scene.
- The hearth remains a real 3D object.
- The surrounding room should feel quiet and readable, not like a CAD workspace.

Supporting inputs:

- Hearth width.
- Hearth depth.
- Hearth thickness.
- Front shape.
- Camera preset: seated should become the default customer lens, with front/top available as secondary views.

Copy posture:

- "See how the hearth feels in the room."
- "A visual planning aid for scale and proportion."

Do not show pricing, shop release, packet status, BisTrack, CAD/export, or fabrication approval language.

### 3. Design Preview

Purpose: reconnect the room and scale work to the customer's selected fireplace/hearth/material direction and prepare for the take-home folio.

Hero visual:

- Same room context, now showing the current selection direction.
- For now this can use existing material preview language from `BuildV5`, but presented as a room confirmation view rather than a separate material picker.

Supporting inputs:

- Selected project type.
- Fire experience.
- Stone direction.
- Mantel direction.
- Hearth material direction.
- Lighting mood.
- Customer-safe verification notes.

Copy posture:

- "Here is the direction we are carrying forward."
- "Your guide will confirm measurements, availability, and details with you."

Avoid "quote", "proposal", "packet", "workflow", "confidence", "prediction", "internal", "shop", and BisTrack language per `docs/CUSTOMER_SAFE_BOUNDARY.md`.

## Route Recommendation

Keep `/build` as the customer route.

Do not split into visible routes yet. The customer should not feel bounced between tools. Instead:

- Keep `BuildScreen` as the route-level owner.
- Refactor `BuildV5` into a customer build shell.
- Put the three visual modes inside that shell.
- Keep `/summary` as the take-home design record.
- Keep `/stone-shop-packet` as backstage only.

Suggested future internal structure:

```text
src/screens/customer/BuildScreen.jsx
  -> src/screens/customer/hearth/CustomerBuildShell.jsx
       -> CustomerVisualModeToggle.jsx
       -> YourRoomMode.jsx
       -> ScaleModelMode.jsx
       -> DesignPreviewMode.jsx
       -> BuildConversationRail.jsx
```

The route stays stable while the implementation becomes mode-based.

## Proposed Component Structure

### Customer Build Shell

Likely new files:

- `src/screens/customer/hearth/CustomerBuildShell.jsx`
- `src/screens/customer/hearth/CustomerVisualModeToggle.jsx`
- `src/screens/customer/hearth/BuildConversationRail.jsx`

Responsibilities:

- Own active visual mode.
- Keep the visual stage full-bleed.
- Keep guide/project/customer chrome consistent.
- Render compact supportive controls without dominating the visual.

### Your Room Mode

Likely new files:

- `src/screens/customer/hearth/YourRoomMode.jsx`
- `src/components/customerRoom/RoomPhotoIntake.jsx`
- `src/components/customerRoom/PremadeRoomScenePicker.jsx`
- `src/components/customerRoom/RoomScaleInputs.jsx`

Responsibilities:

- Allow customer room photo intake later, without real AI generation.
- Offer premade room scenes now.
- Collect rough wall width and ceiling height.
- Store customer-safe room context in session state.

### Scale Model Mode

Likely changed files:

- `src/components/build3d/CustomerHearthBuild3D.jsx`
- `src/components/build3d/HearthScene3D.jsx`
- `src/components/build3d/HearthDimensionOverlay.jsx`
- `src/components/build3d/SceneCameraControls.jsx`

Likely new files:

- `src/components/build3d/ScaleModelMode.jsx`
- `src/components/build3d/HearthScaleControls.jsx`

Responsibilities:

- Use shared room and hearth model state from session, not only local component state.
- Keep Three/R3F lazy loaded.
- Default to a seated camera preset.
- Continue keeping all 3D labels customer-safe.

### Design Preview Mode

Likely new or extracted files:

- `src/screens/customer/hearth/DesignPreviewMode.jsx`
- `src/screens/customer/hearth/SelectionDirectionSummary.jsx`

Responsibilities:

- Reuse the current `BuildV5` material selection concepts.
- Move material picking from a separate "Materials" mode into a confirmation story.
- Feed `/summary` with the same selected direction and room context.

## Data and State Model Sketch

Add customer-safe room and scale state under `session.build`, not under `session.rep`.

Sketch:

```js
build: {
  projectType: null,
  fireExperience: null,
  stoneId: null,
  mantelId: null,
  hearthId: null,
  lightingMoodId: null,
  visualMode: 'your-room',
  room: {
    source: 'premade', // 'premade' | 'photo'
    premadeSceneId: 'warm-living-room',
    photo: {
      objectUrl: null,
      fileName: null,
      capturedAt: null
    },
    roughWallWidthInches: null,
    roughCeilingHeightInches: null,
    notes: ''
  },
  hearthModel: {
    pieceType: 'hearth',
    hearthShape: 'basic',
    dimensions: {
      widthInches: 72,
      depthInches: 18,
      thicknessInches: 2.25,
      leftClipInches: 6,
      rightClipInches: 6,
      leftAngleInches: 8,
      rightAngleInches: 8,
      radiusDepthInches: 6
    }
  },
  fireplaceAssumptions: {
    openingWidthInches: null,
    openingHeightInches: null,
    surroundWidthInches: null,
    mantelHeightInches: null
  },
  customerSafeVerificationNotes: [
    'Measurements will be confirmed with your guide.'
  ]
}
```

Notes:

- Store dimensions internally in inches, continuing the existing pattern.
- Keep customer-safe room notes separate from rep notes.
- Do not store shop packet or pricing state in customer build.
- Avoid putting uploaded photo binary in localStorage. Store an object URL for the current session or use an in-memory field first.
- Later, if persistence is needed, use a separate local-only photo store or explicit user-approved save path.

## Shared Model Boundaries

The shared hearth model should remain the bridge between customer and backstage:

- Customer 3D reads `session.build.hearthModel`.
- Backstage 2D reads Stone Shop packet state and maps into `buildStoneShopHearthModel`.
- Shared shape constants and mapping stay in `src/lib/sharedHearthModel.js`.
- 3D geometry stays in `src/lib/hearthGeometry3d.js`.
- 2D SVG geometry can remain in `src/components/stoneShop/visual/hearthGeometry.js` until a deeper geometry unification is needed.

Do not make the backstage packet consume customer session state directly. Future handoff can be an explicit projection, not shared mutable state.

## Phased Implementation Plan

### Phase 1: Shell and Mode Rename

Goal: make the 3D proof slice feel like one mode inside Hearth Studio, not a standalone hearth calculator.

Work:

- Extract `BuildV5` stage branching into a `CustomerBuildShell`.
- Replace the current `3D hearth` / `Materials` labels with:
  - `Your Room`
  - `Scale Model`
  - `Design Preview`
- Keep existing behavior mostly intact under the new mode names.
- Default mode should probably be `Your Room` once room intake exists; before then, `Scale Model` can remain the functional default.

Verification:

- `/build` still loads.
- `/summary` still works.
- `/stone-shop-packet` still works.
- Customer-safe text scan remains clean.

### Phase 2: Session State for Room and Hearth Model

Goal: stop trapping scale model state inside `CustomerHearthBuild3D`.

Work:

- Extend `defaultSession().build`.
- Add update helpers to `SessionContext`:
  - `setBuildVisualMode`
  - `setRoomField`
  - `setHearthModel`
  - `setHearthDimension`
  - `setHearthShape`
- Pass hearth model into `CustomerHearthBuild3D`.
- Keep shared model normalization in `src/lib/sharedHearthModel.js`.

Verification:

- Dimension changes survive navigation within the current session.
- `/summary` can read the selected visual direction later.
- Existing localStorage session compatibility should be handled defensively.

### Phase 3: Your Room Mode

Goal: establish room context before scale decisions.

Work:

- Add premade room scenes first.
- Add file input for customer room photo preview only.
- Add rough wall width and ceiling height inputs.
- Do not add AI image generation.
- Do not persist image binary in localStorage.

Verification:

- Uploaded image preview appears in customer surface.
- Premade room scene selection works without asset failures.
- Customer-safe boundary remains clean.

### Phase 4: Scale Model Integration

Goal: make the current 3D slice use room context.

Work:

- Feed rough wall width and ceiling height into the 3D room context.
- Keep default fireplace opening/mantel assumptions visible only as visual context, not exact specs.
- Move controls into a small side or bottom rail.
- Keep the fireplace/room as the hero.

Verification:

- Hearth size changes are visually readable.
- Seated camera is useful.
- Top/front views remain available but secondary.

### Phase 5: Design Preview and Summary Bridge

Goal: tie selected material direction, room context, and hearth scale into a customer-safe confirmation view.

Work:

- Extract material direction display from current `BuildV5` material mode.
- Make Design Preview show:
  - room context
  - selected direction
  - scale model snapshot or stage preview
  - customer-safe verification notes
- Update `SummaryV5` to include the room/scale context without internal language.

Verification:

- Take-home folio reads like a design record, not a receipt or shop packet.
- No pricing, internal, shop, quote, packet, BisTrack, or confidence terms leak.

## Risks Before Implementation

- The current `BuildV5` file is large and mixes stage layout, material tray behavior, mode toggles, and flow logic. Refactoring should be staged to avoid breaking the working customer path.
- `session.build` currently stores only selection IDs. Extending it must preserve old sessions loaded from localStorage.
- Customer room photo intake can quickly imply AI reconstruction or final fit. Copy and UI must frame it as visual context only.
- Object URLs for uploaded photos need lifecycle cleanup if implemented.
- Three/R3F should remain lazy-loaded. Do not accidentally reintroduce static imports into `BuildV5` or route-level files.
- Backstage Stone + Shop uses local persistence and pricing/status logic. Do not import customer build state into backstage or merge the route flows.
- The current CSS for build3d lives in `src/index.css`. If the next pass grows mode-specific layout, consider splitting CSS by feature to avoid turning globals into a dumping ground.

## Files Inspected

- `package.json`
- `README.md`
- `vite.config.js`
- `src/App.jsx`
- `src/main.jsx`
- `src/routes.js`
- `src/index.css`
- `src/screens/customer/WelcomeScreen.jsx`
- `src/screens/customer/BuildScreen.jsx`
- `src/screens/customer/SummaryScreen.jsx`
- `src/screens/customer/hearth/WelcomeV5.jsx`
- `src/screens/customer/hearth/BuildV5.jsx`
- `src/screens/customer/hearth/SummaryV5.jsx`
- `src/screens/customer/hearth/AppModeContext.jsx`
- `src/screens/customer/hearth/AtmosphereProvider.jsx`
- `src/screens/customer/hearth/assets.js`
- `src/screens/customer/hearth/FireplaceStage.jsx`
- `src/screens/customer/hearth/v6Atoms.jsx`
- `src/lib/buildOptions.js`
- `src/lib/sharedHearthModel.js`
- `src/lib/hearthGeometry3d.js`
- `src/lib/stoneShop/stoneShopShapeModel.js`
- `src/state/sessionSchema.js`
- `src/state/SessionContext.jsx`
- `src/state/sessionStorage.js`
- `src/components/build3d/BuildModeToggle.jsx`
- `src/components/build3d/CustomerHearthBuild3D.jsx`
- `src/components/build3d/HearthScene3D.jsx`
- `src/components/build3d/HearthMesh.jsx`
- `src/components/build3d/HearthDimensionOverlay.jsx`
- `src/components/build3d/SceneCameraControls.jsx`
- `src/screens/stone-shop-packet/StoneShopPacketScreen.jsx`
- `src/components/stoneShop/StoneShopPacketBuilder.jsx`
- `docs/CUSTOMER_SAFE_BOUNDARY.md`
- `docs/V2_BUILD_PLAN.md`
- `docs/ASSET_MANIFEST_SPEC.md`
- `docs/V1_DONOR_IMPORT_MAP.md`
- `docs/design-reference-boards/01_THE_PLACE.md`
- `docs/design-reference-boards/02_HEARTH_STUDIO_STAGE.md`
- `docs/design-reference-boards/03_PREMIUM_CONFIGURATOR_UI.md`
- `docs/design-reference-boards/04_MATERIAL_LIBRARY.md`
- `docs/design-reference-boards/05_TAKE_HOME_SUMMARY.md`

## Files Proposed for Future Change

Likely first implementation pass:

- `src/screens/customer/BuildScreen.jsx`
- `src/screens/customer/hearth/BuildV5.jsx`
- `src/screens/customer/hearth/CustomerBuildShell.jsx`
- `src/screens/customer/hearth/CustomerVisualModeToggle.jsx`
- `src/screens/customer/hearth/YourRoomMode.jsx`
- `src/screens/customer/hearth/ScaleModelMode.jsx`
- `src/screens/customer/hearth/DesignPreviewMode.jsx`
- `src/state/sessionSchema.js`
- `src/state/SessionContext.jsx`
- `src/lib/sharedHearthModel.js`
- `tests/build3d/*`
- New tests under `tests/customerRoom/` or `tests/customerBuild/`

Likely later implementation pass:

- `src/components/customerRoom/RoomPhotoIntake.jsx`
- `src/components/customerRoom/PremadeRoomScenePicker.jsx`
- `src/components/customerRoom/RoomScaleInputs.jsx`
- `src/components/build3d/CustomerHearthBuild3D.jsx`
- `src/components/build3d/HearthScene3D.jsx`
- `src/components/build3d/HearthDimensionOverlay.jsx`
- `src/screens/customer/hearth/SummaryV5.jsx`
- `src/lib/buildOptions.js`
- `public/assets/hearth-studio/asset-manifest.json`
- `docs/ASSET_MANIFEST_SPEC.md`

Files to avoid changing unless the pass explicitly touches backstage:

- `src/screens/stone-shop-packet/StoneShopPacketScreen.jsx`
- `src/components/stoneShop/*`
- `src/lib/stoneShop/*`
- `src/data/stoneShop/*`

## Open Questions

- Should room photo upload be available to customers directly, or only guided by a rep in showroom mode?
- Should rough room measurements be optional prompts or required before entering Scale Model?
- Should the default mode on `/build` be `Your Room` once room intake exists, or `Design Preview` when a rep preloads selections?
- Should premade room scenes live in the asset manifest as `scene.*`, or in a separate lightweight room-scene registry?
- Should the take-home folio include the customer's room photo, or only the selected direction and verification note?
- How much should the customer be able to edit hearth dimensions without a rep present?
- What wording should replace the current "Final selections confirmed with you in person" line when the customer is using this at home?
- Should the 3D scale model eventually export a customer-safe snapshot for Summary, or should Summary remain render-manifest driven?

## Recommended Next Implementation Prompt

Implement Phase 1 only: refactor the customer `/build` surface into a mode-based shell with `Your Room`, `Scale Model`, and `Design Preview`, keeping the current 3D hearth proof slice lazy-loaded under `Scale Model` and the current material-selection stage under `Design Preview`. Add a simple placeholder `Your Room` mode with premade-room-scene buttons only; do not add upload yet. Preserve `/stone-shop-packet`. Add tests for mode switching, customer-safe copy, lazy loading, and backstage route integrity. Run `npm test`, `npm run build`, and browser smoke `/build` plus `/stone-shop-packet`, then commit.
