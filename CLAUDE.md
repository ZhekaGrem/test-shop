# kv-electro — Project Instructions

## Visual work — READ THE CONTRACT FIRST
Before building, editing, or restyling ANY UI block, read `STYLE-CONTRACT.md`
and obey it. Token values are in `DESIGN.md`. Hard rules:
- Build ONLY what was requested — never add unrequested sections/widgets.
- One visual style only (hybrid Schneider-minimal + tech). No Swiss/Carbon/SCADA.
- Compose locked primitives; a new primitive needs explicit approval.
- Obey the anti-slop blocklist in STYLE-CONTRACT.md.
- Every new block must pass the "Block recipe" checklist in the contract.

## Tokens / theming
- Style/structure is fixed. Only tokens switch via `TweaksPanel`: palette,
  font set, light/dark, accent preset (`money_structure` / `buy_only`).
- Never hardcode a color outside DESIGN.md tokens.

## Verification
Before saying "done" on UI work:
- `npm run build`     # must succeed
- `npm run lint`      # must be clean
- Playwright screenshot of the changed screen — confirm it matches the contract
  under at least one accent preset.
If any check is red — fix and re-run. Do not close the task until green.
