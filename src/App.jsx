import React, { useState, useEffect, useRef } from 'react';
import { SiteHeader, SiteFooter, MobileBottomNav } from './components/HeaderFooter';
import { HomeScreen } from './components/HomeScreen';
import { CategoryScreen } from './components/CategoryScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { ProductScreen } from './components/ProductScreen';
import { CartScreen } from './components/CartScreen';
import { QuickViewModal } from './components/ProductCards';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor } from './components/TweaksPanel';

// Відтінки зеленого для тесту — клієнт обирає фінальний (перший = поточний Schneider).
const ACCENT_GREENS = [
  "#3DCD58", // Schneider — яскравий весняний (поточний)
  "#22C55E", // Соковитий трав'яний
  "#16A34A", // Глибокий смарагдовий (кращий контраст білого тексту)
  "#10B981", // М'ятно-бірюзовий (tech)
  "#84CC16", // Лаймовий «електричний»
];

const SCREENS = [
  { id: "home", label: "Головна", url: "kv-electro.ua" },
  { id: "category", label: "Категорія", url: "kv-electro.ua/modulne-obladnannya" },
  { id: "catalog", label: "Каталог · пошук", url: "kv-electro.ua/search?q=ABB+16A" },
  { id: "product", label: "Товар", url: "kv-electro.ua/avtomat-abb-sh201-c16" },
  { id: "cart", label: "Кошик", url: "kv-electro.ua/cart" },
];

// Набори шрифтів айдентики — перемикаються в панелі (фінальний вибір за клієнтом).
// Кожен набір задає дисплейну гарнітуру (заголовки) і текстову (тіло).
const FONT_SETS = {
  unbounded_onest: {
    label: "Unbounded + Onest",
    display: "'Unbounded', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'Onest', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  onest: {
    label: "Onest (одна родина)",
    display: "'Onest', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'Onest', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  fixel: {
    label: "Fixel (MacPaw)",
    display: "'Fixel Display', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'Fixel Text', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  e_ukraine: {
    label: "e-Ukraine (Diia)",
    display: "'e-UkraineHead', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'e-Ukraine', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
};

const APP_DEFAULTS = {
  "accent": "#3DCD58",
  "density": "balanced",
  "styleTheme": "hybrid",
  "colorTheme": "schneider",
  "fontSet": "onest",
  "buyEmphasis": "dark"
};

function Stub({ label }) {
  return (
    <div className="wrap" style={{ padding: "90px 28px", textAlign: "center" }}>
      <div className="u-label" style={{ marginBottom: 14 }}>Екран у роботі</div>
      <h2 style={{ fontSize: 26, marginBottom: 10 }}>{label}</h2>
      <p style={{ color: "var(--muted)", maxWidth: 460, margin: "0 auto" }}>
        Цей екран буде побудований у наступному кроці. Спершу узгоджуємо візуальний напрямок на головній.
      </p>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(APP_DEFAULTS);
  const [screen, setScreen] = useState(() => localStorage.getItem("kv_hifi_screen") || "home");
  const [cart, setCart] = useState(3);
  const [toast, setToast] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const hist = useRef([]);
  const toastTimer = useRef(null);

  useEffect(() => { 
    localStorage.setItem("kv_hifi_screen", screen); 
  }, [screen]);

  function go(id) {
    if (!SCREENS.find(s => s.id === id)) return;
    if (id === screen) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    hist.current.push(screen);
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    const prev = hist.current.pop();
    if (prev) { setScreen(prev); window.scrollTo({ top: 0, behavior: "smooth" }); }
  }

  function addToCart() {
    setCart(c => c + 1);
    setToast("Додано в кошик");
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  const meta = SCREENS.find(s => s.id === screen);
  const dens = t.density === "compact" ? .88 : t.density === "airy" ? 1.12 : 1;

  let body;
  if (screen === "home") body = <HomeScreen go={go} onAdd={addToCart} onQuickView={setQuickViewProduct} theme={t.styleTheme} />;
  else if (screen === "category") body = <CategoryScreen go={go} onAdd={addToCart} onQuickView={setQuickViewProduct} theme={t.styleTheme} />;
  else if (screen === "catalog") body = <CatalogScreen go={go} onAdd={addToCart} onQuickView={setQuickViewProduct} theme={t.styleTheme} />;
  else if (screen === "product") body = <ProductScreen go={go} onAdd={addToCart} onQuickView={setQuickViewProduct} theme={t.styleTheme} />;
  else if (screen === "cart") body = <CartScreen go={go} cart={cart} setCart={setCart} onAdd={addToCart} onQuickView={setQuickViewProduct} theme={t.styleTheme} />;
  else body = <Stub label={meta.label} />;

  const isSwiss = t.styleTheme === "swiss";
  const isCarbonTech = t.styleTheme === "carbon_tech";
  const colTheme = t.colorTheme || "default";
  
  let ink = "#15171c";
  let ink2 = "#3c414a";
  let paper = "#ffffff";
  let bg = isSwiss ? "#ffffff" : isCarbonTech ? "#0c0d12" : "#f4f3ef";
  let bg2 = isSwiss ? "#f4f4f5" : isCarbonTech ? "#1c1e27" : "#eceae3";
  let line = isSwiss ? "#e4e4e7" : isCarbonTech ? "#232631" : "#e4e1d9";
  let line2 = isSwiss ? "#d4d4d8" : isCarbonTech ? "#343949" : "#d6d2c8";
  let inkSurface = "#15171c";
  let accColor = t.accent || "#1e7a4e";
  let muted = "#80868f";
  let faint = "#aeb2b8";

  // Carbon Tech overrides default palette to be Dark SCADA dashboard
  if (isCarbonTech && colTheme === "default") {
    ink = "#F8FAFC";
    ink2 = "#94A3B8";
    paper = "#15171e";
    bg = "#0c0d12";
    bg2 = "#1c1e27";
    line = "#232631";
    line2 = "#343949";
    inkSurface = "#0c0d12";
    accColor = t.accent || "#10B981";
    muted = "#64748B";
    faint = "#475569";
  }

  if (colTheme === "graphite") {
    ink = "#0F172A";
    ink2 = "#334155";
    paper = isCarbonTech ? "#151e2e" : "#ffffff";
    bg = isSwiss ? "#ffffff" : isCarbonTech ? "#0b0f19" : "#F8FAFC";
    bg2 = isSwiss ? "#F1F5F9" : isCarbonTech ? "#1e293b" : "#E2E8F0";
    line = isSwiss ? "#E2E8F0" : isCarbonTech ? "#334155" : "#CBD5E1";
    line2 = isSwiss ? "#CBD5E1" : isCarbonTech ? "#475569" : "#94A3B8";
    inkSurface = "#0F172A";
    accColor = "#1E7A4E";
  } else if (colTheme === "navy") {
    ink = isCarbonTech ? "#F1F5F9" : "#0B1F33";
    ink2 = "#1E293B";
    paper = isCarbonTech ? "#0f2338" : "#FFFFFF";
    bg = isSwiss ? "#FFFFFF" : isCarbonTech ? "#071424" : "#F0F4F8";
    bg2 = isSwiss ? "#E1E8F0" : isCarbonTech ? "#152a42" : "#D0DBE5";
    line = isSwiss ? "#D0DBE5" : isCarbonTech ? "#1e3d61" : "#B8C5D3";
    line2 = isSwiss ? "#B8C5D3" : isCarbonTech ? "#2d5a8f" : "#91A3B5";
    inkSurface = "#0B1F33";
    accColor = "#F97316";
  } else if (colTheme === "carbon") {
    ink = "#F8FAFC";
    ink2 = "#CBD5E1";
    paper = "#1E2028";
    bg = isSwiss ? "#0D0E12" : isCarbonTech ? "#090a0d" : "#13141A";
    bg2 = isSwiss ? "#1E2028" : isCarbonTech ? "#15171d" : "#272A35";
    line = isSwiss ? "#272A35" : isCarbonTech ? "#22252e" : "#373C4B";
    line2 = isSwiss ? "#373C4B" : isCarbonTech ? "#2d323e" : "#4E556A";
    inkSurface = "#0D0E12";
    accColor = "#10B981";
    muted = "#94A3B8";
    faint = "#64748B";
  } else if (colTheme === "schneider") {
    ink = "#1B1D1F";
    ink2 = "#4A4F55";
    paper = "#ffffff";
    bg = isCarbonTech ? "#0c0d12" : "#ffffff";
    bg2 = isCarbonTech ? "#1c1e27" : "#F4F4F5";
    line = isCarbonTech ? "#232631" : "#ECEAE4";
    line2 = isCarbonTech ? "#343949" : "#DCD9D2";
    inkSurface = "#17181A";
    accColor = t.accent || "#3DCD58";
    muted = "#7C828A";
    faint = "#A9AEB5";
  }

  const fonts = FONT_SETS[t.fontSet] || FONT_SETS.onest;

  const themeVars = {
    "--sans": fonts.sans,
    "--display": fonts.display,
    "--accent": accColor,
    "--accent-strong": `color-mix(in srgb, ${accColor} 70%, ${ink})`,
    "--accent-strong-h": `color-mix(in srgb, ${accColor} 55%, ${ink})`,
    "--accent-soft":     `color-mix(in srgb, ${accColor} 28%, ${paper})`,
    "--accent-tint":     `color-mix(in srgb, ${accColor} 10%, ${paper})`,
    "--accent-ink":      `color-mix(in srgb, ${accColor} 18%, ${ink})`,
    "--ink": ink,
    "--ink-2": ink2,
    "--paper": paper,
    "--bg": bg,
    "--bg-2": bg2,
    "--line": line,
    "--line-2": line2,
    "--ink-surface": inkSurface,
    "--muted": muted,
    "--faint": faint,
    "--r-xs": isSwiss ? "0px" : isCarbonTech ? "4px" : "3px",
    "--r-sm": isSwiss ? "0px" : isCarbonTech ? "4px" : "5px",
    "--r-md": isSwiss ? "0px" : isCarbonTech ? "4px" : "8px",
    "--r-lg": isSwiss ? "0px" : isCarbonTech ? "6px" : "12px",
    "--mono": isSwiss ? "var(--sans)" : "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  };

  // Push theme variables to html level to cover background/body/modals instantly
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeVars).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
  }, [colTheme, t.styleTheme, accColor, t.fontSet]);

  return (
    <div style={themeVars} className={(isSwiss ? "theme-swiss" : isCarbonTech ? "theme-carbon-tech" : "theme-hybrid") + (t.buyEmphasis === "green" ? " buy-green" : "")}>
      {/* the actual site */}
      <div className="stage" style={{ fontSize: `${15 * dens}px` }}>
        <SiteHeader go={go} screen={screen} cartCount={cart} />
        {body}
        <SiteFooter go={go} />
        <MobileBottomNav go={go} screen={screen} cartCount={cart} />
      </div>

      {/* toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 80, background: "var(--ink)", color: "var(--paper)", padding: "13px 22px", borderRadius: "var(--r-md)", boxShadow: "var(--sh-lg)", display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 14 }} className="reveal">
          <span style={{ color: "var(--ok)" }}>✓</span> {toast}
          <a onClick={() => go("cart")} style={{ color: "var(--accent)", cursor: "pointer", marginLeft: 6 }}>Перейти →</a>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          p={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAdd={addToCart}
        />
      )}

      <TweaksPanel>
        <TweakSection label="Колір акценту (тест)" />
        <TweakColor label="Зелений" value={t.accent}
          options={ACCENT_GREENS}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Акцент кнопок (як хоче клієнт)" />
        <TweakRadio label="Кнопки «Купити»" value={t.buyEmphasis}
          options={[{ value: "dark", label: "Чорні" }, { value: "green", label: "Зелені" }]}
          onChange={(v) => setTweak("buyEmphasis", v)} />

        <TweakSection label="Шрифти (айдентика)" />
        <TweakRadio label="Набір шрифтів" value={t.fontSet}
          options={Object.entries(FONT_SETS).map(([value, s]) => ({ value, label: s.label }))}
          onChange={(v) => setTweak("fontSet", v)} />

        <TweakSection label="Щільність" />
        <TweakRadio label="Інтерфейс" value={t.density}
          options={[{ label: "Компактний", value: "compact" }, { label: "Збалансований", value: "balanced" }, { label: "Просторий", value: "airy" }]}
          onChange={(v) => setTweak("density", v)} />
      </TweaksPanel>
    </div>
  );
}

export default App;
