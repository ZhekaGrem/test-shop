# Style Contract System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock kv-electro to one visual style (hybrid Schneider-minimal + tech-precision), delete the Swiss/Carbon/SCADA slop, and add an enforceable Style Contract so `frontend-design` builds on-brand blocks without slop.

**Architecture:** Three layers. (1) A read-first `STYLE-CONTRACT.md` + project `CLAUDE.md` that route every UI task through the contract. (2) Code cleanup — strip the two dead aesthetics from `App.jsx`, `HomeScreen.jsx`, `CategoryScreen.jsx`, `index.css`, `ProductCards.jsx`, leaving the single hybrid style driven by switchable tokens. (3) A `/style` kitchen-sink reference screen rendering all locked primitives under the live token switcher, doubling as the client demo.

**Tech Stack:** React 19, Vite 8, plain CSS (CSS custom properties / token vars), no test runner.

## Global Constraints

- **No test runner exists.** Verification per task = `npm run build` must succeed (and `npm run lint` for JS changes) + a visual screenshot check. There is NO `npm test`; do not invent one.
- **Single style only.** After this plan the product has ONE visual style. `styleTheme` branching (`swiss`, `carbon_tech`) is removed entirely; only the hybrid path remains.
- **Tokens stay switchable** via `TweaksPanel`: palette, font set, light/dark theme, accent preset. Style/structure does NOT switch.
- **Token source of truth:** `DESIGN.md` (colors `--accent #3DCD58`, `--ink #1B1D1F`, dark surface `#17181A`, `--paper #FFFFFF`). Never introduce colors outside tokens.
- **Accent presets (two):** `money_structure` (green = Buy/cart/in-stock; ink = eyebrow/NEW/price/active) and `buy_only` (green = Buy only; ink = everything else accent). Implemented as a `TweaksPanel` toggle, remapping roles on existing tokens — no new colors.
- **Anti-slop is binding.** Never add unrequested sections/widgets (telemetry, oscilloscopes, fake live logs, manifestos), gradients, neon glow, glassmorphism, heavy shadows, stock-photo hero overlays, ALL-CAPS headings, emoji icons, or more than one green primary CTA per block.
- **Commit after every task** with the exact message given.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `STYLE-CONTRACT.md` | Read-first guardrail: single style, anti-slop blocklist, block recipe, accent presets, primitive list | Create (Task 1) |
| `CLAUDE.md` | Project instructions: route UI work through contract + Verification/Feedback Loop | Create (Task 2) |
| `src/components/HomeScreen.jsx` | Home sections; strip Swiss/Carbon variants, keep hybrid | Modify (Tasks 3,4) |
| `src/components/ProductCards.jsx` | Product cards; remove Carbon card | Modify (Task 3) |
| `src/components/CategoryScreen.jsx` | Category banner; remove Swiss banner | Modify (Task 4) |
| `src/index.css` | Remove `.theme-swiss*` / `.theme-carbon-tech*` / `.carbon-*` / `.scada-*`; keep `.tech-slider`/`.tech-faq` | Modify (Tasks 3,4) |
| `src/App.jsx` | Collapse theme logic to one style + token presets; add accent preset toggle | Modify (Tasks 5,6) |
| `src/components/PrimitivesReference.jsx` | New `/style` kitchen-sink reference screen | Create (Task 8) |
| `design_styles_guide.md` | Replace 3-style guide with single-style note | Modify (Task 9) |

---

## Task 1: Create STYLE-CONTRACT.md

**Files:**
- Create: `STYLE-CONTRACT.md`

**Interfaces:**
- Produces: the canonical contract document referenced by `CLAUDE.md` (Task 2) and the reference screen (Task 8).

- [ ] **Step 1: Write the contract file**

Create `STYLE-CONTRACT.md` with exactly this content:

```markdown
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
- Buttons: `.btn` + `.btn-primary` (green, dark text) / `.btn-dark` /
  `.btn-ghost`, sizes `.btn-sm`.
- `.card` — white, `--r-lg`, `--line` border, no heavy shadow.
- Hero band — soft-black `--ink-surface`, big sentence-case headline, green
  eyebrow, green CTA.
- `.u-label` — small UPPERCASE eyebrow (tracking 0.16em).
- `ProductCard` (src/components/ProductCards.jsx) — clean, big title, mono SKU,
  price/button per accent preset.
- Filter sidebar — light: collapsed groups, no heavy frames/backgrounds/counts.
- `Money`, `Stock`, `Stars`, `SectionHead`, `Crumbs` (src/components/Common.jsx).
- SKU/spec text — `.u-mono` (IBM Plex Mono).
- `TechLine` — thin semi-transparent divider.

Live reference of every primitive under switchable tokens: `/style` screen
(PrimitivesReference.jsx).
```

- [ ] **Step 2: Verify the file renders as valid markdown**

Run: `npm run build`
Expected: build succeeds (markdown files don't affect build; this confirms repo is healthy).

- [ ] **Step 3: Commit**

```bash
git add STYLE-CONTRACT.md
git commit -m "docs: add binding STYLE-CONTRACT.md (single style + anti-slop guardrail)"
```

---

## Task 2: Create project CLAUDE.md routing UI work through the contract

**Files:**
- Create: `CLAUDE.md`

**Interfaces:**
- Consumes: `STYLE-CONTRACT.md` (Task 1).

- [ ] **Step 1: Write `CLAUDE.md`**

Create `CLAUDE.md` at repo root with this content:

```markdown
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
```

- [ ] **Step 2: Verify build still healthy**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add project CLAUDE.md routing UI work through STYLE-CONTRACT"
```

---

## Task 3: Remove Carbon / SCADA code

**Files:**
- Modify: `src/components/HomeScreen.jsx` (delete `SCADADashboardCarbon`, `ProductCardCarbon`, `WarehouseLogConsoleHybrid`, and the `if (isCarbonTech)` render block ~lines 1181-1232)
- Modify: `src/components/ProductCards.jsx` (remove any Carbon card variant + its usage)
- Modify: `src/index.css` (delete `.theme-carbon-tech*`, `.carbon-*`, `.scada-*` rules ~lines 825-end of that block)

**Interfaces:**
- Produces: `HomeScreen` with no `isCarbonTech` branch; CSS without carbon/scada selectors.

- [ ] **Step 1: Find every Carbon/SCADA reference**

Run: `git grep -n "Carbon\|carbon_tech\|carbon-\|SCADA\|scada\|WarehouseLogConsole" -- src/`
Note each hit; these are the deletion sites.

- [ ] **Step 2: Delete Carbon section functions in HomeScreen.jsx**

Remove the entire function bodies for `SCADADashboardCarbon` (starts line ~9), `ProductCardCarbon` (~248), and `WarehouseLogConsoleHybrid` (~676 — a fake live log console, slop per contract). Remove the `if (isCarbonTech) { return ( ... ) }` block in `HomeScreen` (~1181-1232) and the `const isCarbonTech = theme === "carbon_tech";` line (~1135).

- [ ] **Step 3: Delete Carbon card in ProductCards.jsx**

Remove any `ProductCardCarbon`/carbon-variant export and its import/usage. If a card picker switches on theme, drop the carbon branch.

- [ ] **Step 4: Delete Carbon/SCADA CSS in index.css**

Remove all rules matching `.theme-carbon-tech`, `.carbon-toggle`, `.carbon-slider`, `.scada-progress`, `.scada-*` (block starting ~line 825). KEEP `.tech-slider` and `.tech-faq` — they belong to hybrid sections.

- [ ] **Step 5: Verify no dangling references**

Run: `git grep -n "Carbon\|carbon_tech\|SCADA\|scada\|WarehouseLogConsole" -- src/`
Expected: no matches (or only the unrelated word in comments — there should be none).

- [ ] **Step 6: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean (no "defined but never used"/"is not defined").

- [ ] **Step 7: Commit**

```bash
git add src/
git commit -m "refactor: remove Carbon/SCADA style code (anti-slop cleanup)"
```

---

## Task 4: Remove hard-Swiss code

**Files:**
- Modify: `src/components/HomeScreen.jsx` (delete `ArchitecturalShowcaseSwiss` ~803, `CircularMaterialManifestoSwiss` ~911, `AnatomyOfPrecisionSwiss` ~949, `ArchitectKitFormSwiss` ~1006, `HeroPanelSwiss` ~1470, `CategoryGridSwiss` ~1506, and the `if (isSwiss)` block ~1137-1180)
- Modify: `src/components/CategoryScreen.jsx` (delete `CatBannerSwiss` ~40, keep `CatBannerHybrid`)
- Modify: `src/index.css` (delete `.theme-swiss*` rules ~lines 662-823; KEEP `.tech-slider`/`.tech-faq`)

**Interfaces:**
- Produces: `HomeScreen` and `CategoryScreen` with no Swiss branch; CSS without swiss selectors.

- [ ] **Step 1: Find every Swiss reference**

Run: `git grep -n "Swiss\|swiss\|isSwiss\|swiss-grid\|swiss-input\|swiss-label" -- src/`
Note each hit.

- [ ] **Step 2: Delete Swiss section functions in HomeScreen.jsx**

Remove function bodies: `ArchitecturalShowcaseSwiss`, `CircularMaterialManifestoSwiss`, `AnatomyOfPrecisionSwiss`, `ArchitectKitFormSwiss`, `HeroPanelSwiss`, `CategoryGridSwiss`. Remove the `if (isSwiss) { return ( ... ) }` block (~1137-1180) and `const isSwiss = theme === "swiss";` (~1134). The function should fall through to the existing hybrid `return (` (~1233).

- [ ] **Step 3: Delete Swiss banner in CategoryScreen.jsx**

Remove `CatBannerSwiss` (~40) and any `theme === "swiss"` branch that selects it; always use `CatBannerHybrid`.

- [ ] **Step 4: Delete Swiss CSS in index.css**

Remove all `.theme-swiss ...` rules (~662-823), including `.theme-swiss .tech-detail`, `.swiss-grid-item`, `.swiss-input`, `.swiss-label`. KEEP `.tech-slider` (~707) and `.tech-faq` (~745) — hybrid uses them.

- [ ] **Step 5: Verify no dangling references**

Run: `git grep -n "Swiss\|isSwiss\|swiss-" -- src/`
Expected: no matches.

- [ ] **Step 6: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 7: Commit**

```bash
git add src/
git commit -m "refactor: remove hard-Swiss style code (anti-slop cleanup)"
```

---

## Task 5: Collapse App.jsx theme logic to one style + token presets

**Files:**
- Modify: `src/App.jsx` (remove `isSwiss`/`isCarbonTech` vars and all branches ~118-220; drop dead palette presets `navy`/`carbon`/`graphite` tied to removed styles; keep `schneider` as the light default; add a `dark` palette preset for the light/dark toggle; remove `styleTheme` from `APP_DEFAULTS` and the wrapper className)

**Interfaces:**
- Consumes: nothing new.
- Produces: `themeVars` computed from a single style; root className is always the hybrid base (plus accent-preset class from Task 6). `APP_DEFAULTS` no longer has `styleTheme`.

- [ ] **Step 1: Remove style branching**

In `src/App.jsx`: delete `const isSwiss = ...` and `const isCarbonTech = ...` (~118-119). Replace the whole palette block (~122-193) so colors come from a single light Schneider base, with one `dark` variant selected by a new `theme: "light" | "dark"` tweak. Concretely, the light base:

```javascript
let ink = "#1B1D1F", ink2 = "#4A4F55", paper = "#ffffff";
let bg = "#ffffff", bg2 = "#F4F4F5";
let line = "#ECEAE4", line2 = "#DCD9D2";
let inkSurface = "#17181A";
let accColor = t.accent || "#3DCD58";
let muted = "#7C828A", faint = "#A9AEB5";

if (t.theme === "dark") {
  ink = "#F3F2EE"; ink2 = "#B9BDC2"; paper = "#1B1D1F";
  bg = "#141517"; bg2 = "#202225";
  line = "#2A2C2F"; line2 = "#3A3D41";
  inkSurface = "#0F1011";
  muted = "#9AA0A6"; faint = "#6B7177";
}
```

- [ ] **Step 2: Simplify radii/mono in themeVars**

Replace the `isSwiss ? ... : isCarbonTech ? ...` ternaries in `themeVars` (~216-220) with the fixed hybrid values:

```javascript
"--r-xs": "3px",
"--r-sm": "5px",
"--r-md": "8px",
"--r-lg": "12px",
"--mono": "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
```

- [ ] **Step 3: Update APP_DEFAULTS and wrapper className**

Remove `"styleTheme": "hybrid"` and `"colorTheme": "schneider"` from `APP_DEFAULTS`; add `"theme": "light"`. Change the wrapper `className` (~232) to drop the swiss/carbon ternary — keep a constant base `"theme-hybrid"` plus the accent-preset class (Task 6). Remove the now-unused `colTheme` logic and the `theme={t.styleTheme}` props passed to screens (replace with nothing — screens no longer branch on theme after Tasks 3-4; drop the `theme` prop usage).

- [ ] **Step 4: Update the useEffect deps**

In the `useEffect` pushing vars to `documentElement` (~224-229), update the dependency array to `[t.theme, accColor, t.fontSet, t.accentPreset]` (drop `colTheme`, `t.styleTheme`).

- [ ] **Step 5: Add light/dark toggle to TweaksPanel**

In the `TweaksPanel` JSX, add:

```jsx
<TweakSection label="Тема" />
<TweakRadio label="Світла / темна" value={t.theme}
  options={[{ value: "light", label: "Світла" }, { value: "dark", label: "Темна" }]}
  onChange={(v) => setTweak("theme", v)} />
```

- [ ] **Step 6: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean (no unused `isSwiss`/`colTheme`).

- [ ] **Step 7: Screenshot check**

Run the app (`npm run dev`) and screenshot Home in light and dark. Expected: single hybrid style; dark toggle flips surfaces without breaking the green accent.

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: collapse App theme logic to one style + light/dark token preset"
```

---

## Task 6: Formalize the two accent presets

**Files:**
- Modify: `src/App.jsx` (add `accentPreset` to defaults + a `TweaksPanel` toggle; apply a class on the wrapper; keep existing `buyEmphasis` behavior folded in)
- Modify: `src/index.css` (add `.accent-money-structure` / `.accent-buy-only` rules remapping eyebrow/NEW/price/active accent color)

**Interfaces:**
- Consumes: token vars from Task 5.
- Produces: wrapper gains class `accent-money-structure` or `accent-buy-only`; replaces the older `buy-green` class.

- [ ] **Step 1: Add the preset to defaults and wrapper**

In `APP_DEFAULTS` add `"accentPreset": "money_structure"` and remove `"buyEmphasis": "dark"`. In the wrapper className, append `t.accentPreset === "buy_only" ? " accent-buy-only" : " accent-money-structure"`.

- [ ] **Step 2: Replace the buyEmphasis toggle with the accent-preset toggle**

In `TweaksPanel`, replace the "Акцент кнопок" section with:

```jsx
<TweakSection label="Акцент: зелений ↔ чорний" />
<TweakRadio label="Пресет" value={t.accentPreset}
  options={[
    { value: "money_structure", label: "Гроші/структура" },
    { value: "buy_only", label: "Тільки Купити" },
  ]}
  onChange={(v) => setTweak("accentPreset", v)} />
```

- [ ] **Step 3: Add the CSS that remaps roles**

In `src/index.css`, add:

```css
/* Accent preset A: green = money/action; ink = structure accents */
.accent-money-structure .badge-new,
.accent-money-structure .u-label,
.accent-money-structure .tab.is-active { color: var(--ink); }
.accent-money-structure .price-accent { color: var(--ink); }

/* Accent preset B: green = Buy only; ink = all other accents */
.accent-buy-only .badge-new,
.accent-buy-only .u-label,
.accent-buy-only .tab.is-active,
.accent-buy-only .price-accent,
.accent-buy-only .stock { color: var(--ink); }
.accent-buy-only .btn-primary { background: var(--accent); color: var(--ink); }
```

(If `.badge-new`/`.price-accent`/`.tab.is-active` class names differ in the codebase, run `git grep -n "badge\|price\|is-active" -- src/index.css src/components` and target the real classes; the rule is: only the Buy CTA stays green in `buy_only`.)

- [ ] **Step 4: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 5: Screenshot check both presets**

Run app, toggle the preset on a product card. Expected: `money_structure` keeps price/in-stock readable with green Buy; `buy_only` turns everything ink except the green Buy button.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/index.css
git commit -m "feat: two switchable accent presets (money/structure, buy-only)"
```

---

## Task 7: Audit and document locked primitives

**Files:**
- Modify: `STYLE-CONTRACT.md` (fill the "Locked primitives" list with the REAL class/component names found in the audit, if any differ)

**Interfaces:**
- Consumes: `src/components/Common.jsx`, `src/index.css`, `src/components/ProductCards.jsx`, `src/components/Filters.jsx`.
- Produces: an accurate primitive inventory the reference screen (Task 8) will render.

- [ ] **Step 1: Inventory existing primitives**

Run: `git grep -n "export function" -- src/components/Common.jsx src/components/ProductCards.jsx src/components/Filters.jsx`
Run: `git grep -no "\.btn[a-z-]*\|\.card\|\.u-label\|\.u-mono\|\.stock\|\.chip" -- src/index.css | sort -u`

- [ ] **Step 2: Reconcile contract with reality**

For each primitive named in `STYLE-CONTRACT.md` "Locked primitives", confirm it exists with that exact name. Where the codebase uses a different name (e.g. `.btn-accent` instead of `.btn-primary`, or no `.btn-dark`), update the contract to the real name OR note "to add". Do not rename code in this task — just make the contract truthful.

- [ ] **Step 3: Commit**

```bash
git add STYLE-CONTRACT.md
git commit -m "docs: reconcile STYLE-CONTRACT primitive list with actual code"
```

---

## Task 8: Build the /style kitchen-sink reference screen

**Files:**
- Create: `src/components/PrimitivesReference.jsx`
- Modify: `src/App.jsx` (register screen `style` in `SCREENS`, route to `PrimitivesReference`)

**Interfaces:**
- Consumes: primitives from `Common.jsx` + CSS classes confirmed in Task 7; token vars from Task 5; accent presets from Task 6.
- Produces: a reachable `/style` screen rendering every locked primitive under the live `TweaksPanel`.

- [ ] **Step 1: Create the reference screen**

Create `src/components/PrimitivesReference.jsx`:

```jsx
import React from 'react';
import { Money, Stock, Stars, SectionHead, ProductGlyph } from './Common';

function Row({ label, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, alignItems: "center", padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="u-label">{label}</div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

export function PrimitivesReference() {
  return (
    <div className="wrap" style={{ padding: "48px 28px", maxWidth: 1320, margin: "0 auto" }}>
      <div className="u-label" style={{ marginBottom: 10 }}>Style reference</div>
      <h1 style={{ fontSize: 44, letterSpacing: "-.03em", marginBottom: 8 }}>
        Палітра примітивів kv-electro
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 32, maxWidth: 560 }}>
        Усі дозволені примітиви під живими токенами. Крути палітру, шрифт,
        тему й accent-пресет у панелі — усе тут оновлюється разом.
      </p>

      <Row label="Buttons">
        <button className="btn btn-primary">Купити</button>
        <button className="btn btn-dark">Каталог</button>
        <button className="btn btn-ghost btn-sm">Детальніше</button>
      </Row>

      <Row label="Eyebrow / label">
        <span className="u-label">Модульне обладнання</span>
      </Row>

      <Row label="Price (Money)">
        <Money value={1290} size={20} />
        <Money value={1490} size={15} strike />
      </Row>

      <Row label="Stock / Stars">
        <Stock kind="in" />
        <Stock kind="order" />
        <Stars n={4} reviews={128} />
      </Row>

      <Row label="SKU (mono)">
        <span className="u-mono">A9F74340</span>
      </Row>

      <Row label="Card">
        <div className="card" style={{ padding: 18, width: 220 }}>
          <ProductGlyph type="breaker" size={72} />
          <h3 style={{ fontSize: 16, margin: "10px 0 4px" }}>Автомат ABB SH201</h3>
          <span className="u-mono" style={{ color: "var(--muted)", fontSize: 12 }}>SH201-C16</span>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Money value={189} size={18} />
            <button className="btn btn-primary btn-sm">+ Кошик</button>
          </div>
        </div>
      </Row>

      <Row label="Hero band">
        <div style={{ background: "var(--ink-surface)", color: "var(--paper)", padding: 32, borderRadius: "var(--r-lg)", width: "100%" }}>
          <span className="u-label" style={{ color: "var(--accent)" }}>Life Is On</span>
          <h2 style={{ fontSize: 32, margin: "8px 0 14px", letterSpacing: "-.02em" }}>
            Електрообладнання Schneider з наявності
          </h2>
          <button className="btn btn-primary">Перейти в каталог</button>
        </div>
      </Row>

      <Row label="TechLine">
        <div style={{ height: 1, width: "100%", background: "var(--line)" }} />
      </Row>

      <Row label="Section head">
        <div style={{ width: "100%" }}>
          <SectionHead kicker="Підбірка" title="Популярні автомати" action="Усі" onAction={() => {}} />
        </div>
      </Row>
    </div>
  );
}
```

(If Task 7 found different class/component names — e.g. `.btn-accent` not `.btn-primary` — use the real names here.)

- [ ] **Step 2: Register the screen in App.jsx**

In `SCREENS`, add `{ id: "style", label: "Стиль", url: "kv-electro.ua/style" }`. Import `PrimitivesReference` and add `else if (screen === "style") body = <PrimitivesReference />;` in the body selection.

- [ ] **Step 3: Build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Screenshot check under token switches**

Run app, navigate to the `style` screen. Toggle font set, light/dark, and both accent presets. Expected: every primitive renders, no slop, contrast holds in all combinations.

- [ ] **Step 5: Commit**

```bash
git add src/components/PrimitivesReference.jsx src/App.jsx
git commit -m "feat: add /style kitchen-sink primitives reference screen"
```

---

## Task 9: Replace the 3-style guide and final verification

**Files:**
- Modify: `design_styles_guide.md` (replace 3-style content with a single-style pointer)

**Interfaces:**
- Consumes: `STYLE-CONTRACT.md`.

- [ ] **Step 1: Rewrite design_styles_guide.md**

Replace the entire file with:

```markdown
# kv-electro — стиль інтерфейсу

Проєкт має **один** візуальний стиль: гібрид світлого Schneider-мінімалу +
тех-точності. Попередні три стилі (Tech Precision / Swiss / Carbon SCADA)
видалені.

- Правила, заборони та чек-ліст: **`STYLE-CONTRACT.md`** (читати першим).
- Значення токенів: **`DESIGN.md`**.
- Жива палітра примітивів: екран `/style` (`src/components/PrimitivesReference.jsx`).
- Перемикаються лише токени (палітра, шрифт, світла/темна тема, accent-пресет),
  не стиль.
```

- [ ] **Step 2: Confirm no style-switch remnants**

Run: `git grep -n "carbon_tech\|styleTheme\|isSwiss\|isCarbon\|SCADA" -- src/`
Expected: no matches.

- [ ] **Step 3: Full build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Final screenshot sweep**

Run app; visit Home, Category, Catalog, Product, Cart, and `/style`. Confirm each is the single hybrid style, renders under light/dark and both accent presets, and contains no removed slop sections.

- [ ] **Step 5: Commit**

```bash
git add design_styles_guide.md
git commit -m "docs: replace 3-style guide with single-style pointer to STYLE-CONTRACT"
```

---

## Self-Review notes (coverage vs spec)

- Spec §3 part 1 (contract) → Task 1; CLAUDE.md routing → Task 2.
- Spec §3 part 2 (locked primitives) → Tasks 7 (audit/doc) + 8 (live reference).
- Spec §3 part 3 (kitchen-sink) → Task 8.
- Spec §4 (anti-slop + recipe) → Task 1 content.
- Spec §5 (two accent presets) → Task 6.
- Spec §6 (primitive list) → Tasks 7-8.
- Spec §7 (TweaksPanel = tokens only) → Tasks 5 (light/dark, remove style switch) + 6 (accent preset).
- Spec §8 (delete Carbon/Swiss/slop, not hide) → Tasks 3, 4, 9.
- Spec §9 (done criteria) → verified across Tasks 3-9 build/lint/screenshot steps.
```
