# kv-electro — STYLE CONTRACT (read this FIRST before any UI work)

This file is the binding visual guardrail. Token values live in `DESIGN.md` —
this file says how to USE them and what NEVER to do. If a request conflicts
with this contract, ask before building.

## The one style
Hybrid: light Schneider-minimal as the frame + tech-precision as accent.
- Light base (`--paper #FFFFFF`), lots of air, big sentence-case headlines.
- Moderate rounding (`--r-md 8px`, cards `--r-lg 12px`). Never mix sharp and
  rounded corners in one viewport.
- Depth from thin lines (`--line`), never shadows/gradients/glow.
- Tech accents: monospace SKUs/specs (`--mono` IBM Plex Mono), thin
  semi-transparent divider lines (`TechLine`).
- Soft-black (`--ink-surface #17181A`) used POINTWISE (hero band, footer),
  never as a full dark page theme.

## Tokens (source of truth = DESIGN.md)
Colors, spacing, radii, typography come ONLY from the CSS vars: `--accent`,
`--ink`, `--ink-2`, `--paper`, `--bg`, `--bg-2`, `--line`, `--line-2`,
`--ink-surface`, `--muted`, `--faint`, `--display`, `--sans`, `--mono`,
`--r-xs..--r-lg`. Never hardcode a hex that isn't a token.

## Accent presets (green vs soft-black) — two, switchable
- `money_structure`: green = Buy/cart + "in stock"; soft-black = eyebrow, NEW,
  price, active tabs, numbers.
- `buy_only`: green = ONLY the primary "Buy" action; soft-black = everything
  else accent (price, NEW, eyebrow, hovers, active).
Both must render correctly. Never invent a third mapping or a new green.

## Anti-slop blocklist (hard NEVER)
- No unrequested sections/widgets: SCADA/telemetry, oscilloscopes, fake live
  logs/counters, "material manifestos", architectural showcases.
- No gradients, neon glow, glassmorphism, heavy shadows on content.
- No stock-photo heroes with overlay gradients.
- No mixing sharp + rounded corners in one viewport.
- No colors outside DESIGN.md tokens; green only per the active accent preset.
- ALL-CAPS only for small eyebrow labels (`.u-label`), never headings.
- No more than one green primary CTA per block.
- No emoji icons, decorative illustrations, or 3D renders.

## Block recipe (every new block passes before "done")
1. Uses only DESIGN.md tokens.
2. Composed from locked primitives (below); a new primitive needs explicit OK.
3. Does EXACTLY what was asked — no bonus sections.
4. Passes the anti-slop blocklist.
5. Renders under both accent presets and light/dark without breaking contrast
   (WCAG AA 4.5:1 for text).
6. Screenshot via Playwright for visual self-check.

## Locked primitives
CSS-class + component primitives. Compose these; do not hand-roll raw markup.
- Buttons: `.btn` + `.btn-primary` (dark text) / `.btn-accent` (green) /
  `.btn-ghost` / `.btn-soft`, sizes `.btn-sm` / `.btn-lg` / `.btn-icon`.
- `.card` — white, `--r-md`, `--line` border, no heavy shadow.
- Hero band — soft-black `--ink-surface`, big sentence-case headline, green
  eyebrow, green CTA.
- `.u-label` — small UPPERCASE eyebrow (tracking 0.14em).
- `.u-mono` — IBM Plex Mono typeface utilities.
- `ProductCard`, `PriceBlock` (src/components/ProductCards.jsx) — clean, big
  title, mono SKU, price/button per accent preset.
- Filter sidebar — light: collapsed groups, no heavy frames/backgrounds/counts.
- `Money`, `Stock`, `Stars`, `SectionHead`, `Crumbs`, `ProductGlyph`,
  `HeaderIcon` (src/components/Common.jsx).
- Badges & status: `.badge-new` (ink), `.badge-hit` (accent), `.badge-sale`
  (sale red); `.stock` (in-stock or order indicator).
- `.chip` (inline pills) — `.chip-line` / `.chip-accent` variants.
- Thin divider — `.hairline` (1px, `--line` color).

Live reference of every primitive under switchable tokens: `/style` screen
(PrimitivesReference.jsx).
