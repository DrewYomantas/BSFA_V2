# Board 03 — Premium Configurator UI

## Purpose
Set the bar for what the Build screen and Summary screen should feel like as an interactive UI. This is not about feature parity with anyone — it's about the calm, confident, premium pacing of best-in-class configurators. The reference is auto, watch, kitchen, and architectural visualizer experiences, not retail e-commerce.

## What images to include
- Screenshots from premium auto configurators (Porsche, Audi, Land Rover, Genesis)
- Watch configurators (Nomos, Grand Seiko, indie houses)
- High-end kitchen / cabinet / window configurators (Bulthaup, Marvin, Andersen Architectural)
- Architecture and millwork visualizers
- Editorial product pages from premium furniture brands (Vitsoe, DWR, Roll & Hill)
- Specific UI details: selected-state treatments, hover affordances, summary modules, sticky CTAs, micro-animations (capture as frames or short GIFs)
- Typography pairings — serif display + clean sans body, ample tracking

## What Claude Design should learn
- Premium pacing = fewer choices per screen, larger imagery, more white space
- Selection state is unmistakable but never loud (thin ring, subtle ember tint, no neon glow)
- Hero render dominates; chips and labels serve it
- Typography hierarchy is editorial — display serif for category, restrained sans for option labels
- One primary action per screen, lots of secondary affordances kept quiet
- Summary screens read like a printed page, not a cart

## What Claude Design should avoid
- E-commerce / Amazon / Wayfair card grids and price-led layout
- SaaS dashboard energy — KPI cards, accent colors, badge soup
- Bootstrap / Material defaults — pill buttons with full saturation, drop shadows, accordions
- Excessive gradients, glassmorphism, neon, dark-mode-by-default
- Progress bars and step trackers across the top (we're not a checkout)
- Tooltips, "?" icons, and helper-text clutter
- Anything that screams "configure your build" in the CRM/B2B sense

## Suggested file naming convention
```
03-ui__<source-brand>__<screen-type>__<id>.<ext>
```
Screen types: `landing`, `configure`, `select`, `summary`, `detail`, `animation`
Examples:
- `03-ui__porsche__configure-exterior__001.png`
- `03-ui__bulthaup__landing__002.png`
- `03-ui__nomos__summary__001.png`
- `03-ui__marvin__select-finish__animation__001.gif`

## Notes for Drew while gathering images
- Capture full-page screenshots when you can — context matters more than zoomed-in widgets.
- Note the URL and date in a sibling `.txt` if you remember; sites redesign often.
- Look at how they handle the moment after a selection — that transition is where premium lives.
- Save mobile and desktop versions of the same screen if available — we'll inherit responsive decisions later.
- Don't pull design dribbble shots — they look great but don't survive contact with real product. Reference shipped UIs.
- If you find a competitor (hearth/stone/fireplace) doing this well, keep it but tag `__competitor__`. If they're doing it poorly, also keep it — but in a "what to avoid" subfolder.
