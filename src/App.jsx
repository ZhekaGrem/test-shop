import React, { useState, useEffect, useRef } from "react";
import {
  SiteHeader,
  SiteFooter,
  MobileBottomNav,
} from "./components/HeaderFooter";
import { HomeScreen } from "./components/HomeScreen";
import { CategoryScreen } from "./components/CategoryScreen";
import { CatalogScreen } from "./components/CatalogScreen";
import { ProductScreen } from "./components/ProductScreen";
import { CartScreen } from "./components/CartScreen";
import { QuickViewModal } from "./components/ProductCards";
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakColor,
} from "./components/TweaksPanel";
import { PrimitivesReference } from "./components/PrimitivesReference";

// Відтінки зеленого для тесту — клієнт обирає фінальний (перший = поточний Schneider).
const ACCENT_GREENS = [
  "#3DCD58", // Schneider — яскравий весняний (поточний)
  "#22C55E", // Соковитий трав'яний
  "#16A34A", // Глибокий смарагдовий (кращий контраст білого тексту)
  "#10B981", // М'ятно-бірюзовий (tech)
  "#3dcd58", // Лаймовий «електричний»
];

const SCREENS = [
  { id: "home", label: "Головна", url: "kv-electro.ua" },
  {
    id: "category",
    label: "Категорія",
    url: "kv-electro.ua/modulne-obladnannya",
  },
  {
    id: "catalog",
    label: "Каталог · пошук",
    url: "kv-electro.ua/search?q=ABB+16A",
  },
  { id: "product", label: "Товар", url: "kv-electro.ua/avtomat-abb-sh201-c16" },
  { id: "cart", label: "Кошик", url: "kv-electro.ua/cart" },
  { id: "style", label: "Стиль", url: "kv-electro.ua/style" },
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
    display:
      "'Fixel Display', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'Fixel Text', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  e_ukraine: {
    label: "e-Ukraine (Diia)",
    display:
      "'e-UkraineHead', ui-sans-serif, system-ui, -apple-system, sans-serif",
    sans: "'e-Ukraine', ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
};

const APP_DEFAULTS = {
  accent: "#3DCD58",
  density: "balanced",
  theme: "light",
  fontSet: "onest",
  accentPreset: "money_structure",
};

function Stub({ label }) {
  return (
    <div className="wrap" style={{ padding: "90px 28px", textAlign: "center" }}>
      <div className="u-label" style={{ marginBottom: 14 }}>
        Екран у роботі
      </div>
      <h2 style={{ fontSize: 26, marginBottom: 10 }}>{label}</h2>
      <p style={{ color: "var(--muted)", maxWidth: 460, margin: "0 auto" }}>
        Цей екран буде побудований у наступному кроці. Спершу узгоджуємо
        візуальний напрямок на головній.
      </p>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(APP_DEFAULTS);
  const [screen, setScreen] = useState(
    () => localStorage.getItem("kv_hifi_screen") || "home",
  );
  const [cart, setCart] = useState(3);
  const [toast, setToast] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const hist = useRef([]);
  const toastTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem("kv_hifi_screen", screen);
  }, [screen]);

  function go(id) {
    if (!SCREENS.find((s) => s.id === id)) return;
    if (id === screen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    hist.current.push(screen);
    setScreen(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    const prev = hist.current.pop();
    if (prev) {
      setScreen(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function addToCart() {
    setCart((c) => c + 1);
    setToast("Додано в кошик");
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }

  const meta = SCREENS.find((s) => s.id === screen);
  const dens = t.density === "compact" ? 0.88 : t.density === "airy" ? 1.12 : 1;

  let body;
  if (screen === "home")
    body = (
      <HomeScreen go={go} onAdd={addToCart} onQuickView={setQuickViewProduct} />
    );
  else if (screen === "category")
    body = (
      <CategoryScreen
        go={go}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
      />
    );
  else if (screen === "catalog")
    body = (
      <CatalogScreen
        go={go}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
      />
    );
  else if (screen === "product")
    body = (
      <ProductScreen
        go={go}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
      />
    );
  else if (screen === "cart")
    body = (
      <CartScreen
        go={go}
        cart={cart}
        setCart={setCart}
        onAdd={addToCart}
        onQuickView={setQuickViewProduct}
      />
    );
  else if (screen === "style") body = <PrimitivesReference />;
  else body = <Stub label={meta.label} />;

  let ink = "#1B1D1F",
    ink2 = "#4A4F55",
    paper = "#ffffff";
  let bg = "#ffffff",
    bg2 = "#F4F4F5";
  let line = "#ECEAE4",
    line2 = "#DCD9D2";
  let inkSurface = "#17181A";
  let accColor = t.accent || "#3DCD58";
  let muted = "#7C828A",
    faint = "#A9AEB5";

  if (t.theme === "dark") {
    ink = "#F3F2EE";
    ink2 = "#B9BDC2";
    paper = "#1B1D1F";
    bg = "#141517";
    bg2 = "#202225";
    line = "#2A2C2F";
    line2 = "#3A3D41";
    inkSurface = "#0F1011";
    muted = "#9AA0A6";
    faint = "#6B7177";
  }

  const fonts = FONT_SETS[t.fontSet] || FONT_SETS.onest;

  const themeVars = {
    "--sans": fonts.sans,
    "--display": fonts.display,
    "--accent": accColor,
    "--accent-strong": `color-mix(in srgb, ${accColor} 70%, ${ink})`,
    "--accent-strong-h": `color-mix(in srgb, ${accColor} 55%, ${ink})`,
    "--accent-soft": `color-mix(in srgb, ${accColor} 28%, ${paper})`,
    "--accent-tint": `color-mix(in srgb, ${accColor} 10%, ${paper})`,
    "--accent-ink": `color-mix(in srgb, ${accColor} 18%, ${ink})`,
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
    "--r-xs": "3px",
    "--r-sm": "5px",
    "--r-md": "8px",
    "--r-lg": "12px",
    "--mono": "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  };

  // Push theme variables to html level to cover background/body/modals instantly
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeVars).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
  }, [t.theme, accColor, t.fontSet]);

  return (
    <div
      style={themeVars}
      className={
        "theme-hybrid" +
        (t.accentPreset === "buy_only"
          ? " accent-buy-only"
          : " accent-money-structure")
      }
    >
      {/* the actual site */}
      <div className="stage" style={{ fontSize: `${15 * dens}px` }}>
        <SiteHeader go={go} screen={screen} cartCount={cart} />
        {body}
        <SiteFooter go={go} />
        <MobileBottomNav go={go} screen={screen} cartCount={cart} />
      </div>

      {/* toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 80,
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "13px 22px",
            borderRadius: "var(--r-md)",
            boxShadow: "var(--sh-lg)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
            fontSize: 14,
          }}
          className="reveal"
        >
          <span style={{ color: "var(--ok)" }}>✓</span> {toast}
          <a
            onClick={() => go("cart")}
            style={{ color: "var(--accent)", cursor: "pointer", marginLeft: 6 }}
          >
            Перейти →
          </a>
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
        <TweakSection label="Тема" />
        <TweakRadio
          label="Світла / темна"
          value={t.theme}
          options={[
            { value: "light", label: "Світла" },
            { value: "dark", label: "Темна" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />

        <TweakSection label="Колір акценту (тест)" />
        <TweakColor
          label="Зелений"
          value={t.accent}
          options={ACCENT_GREENS}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Акцент: зелений ↔ чорний" />
        <TweakRadio
          label="Пресет"
          value={t.accentPreset}
          options={[
            { value: "money_structure", label: "Гроші/структура" },
            { value: "buy_only", label: "Тільки Купити" },
          ]}
          onChange={(v) => setTweak("accentPreset", v)}
        />

        <TweakSection label="Шрифти (айдентика)" />
        <TweakRadio
          label="Набір шрифтів"
          value={t.fontSet}
          options={Object.entries(FONT_SETS).map(([value, s]) => ({
            value,
            label: s.label,
          }))}
          onChange={(v) => setTweak("fontSet", v)}
        />

        <TweakSection label="Щільність" />
        <TweakRadio
          label="Інтерфейс"
          value={t.density}
          options={[
            { label: "Компактний", value: "compact" },
            { label: "Збалансований", value: "balanced" },
            { label: "Просторий", value: "airy" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </div>
  );
}

export default App;
