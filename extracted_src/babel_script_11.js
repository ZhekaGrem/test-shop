// hifi-app.jsx — clickable hi-fi flow shell
const {
  useState: useAppState,
  useEffect: useAppEffect,
  useRef: useAppRef,
} = React;

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
];

const APP_DEFAULTS = /*EDITMODE-BEGIN*/ {
  accent: "#1e7a4e",
  density: "balanced",
  radius: 8,
}; /*EDITMODE-END*/

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
  const [screen, setScreen] = useAppState(
    () => localStorage.getItem("kv_hifi_screen") || "home",
  );
  const [cart, setCart] = useAppState(3);
  const [toast, setToast] = useAppState(null);
  const hist = useAppRef([]);
  const toastTimer = useAppRef(null);

  useAppEffect(() => {
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
  if (screen === "home") body = <HomeScreen go={go} onAdd={addToCart} />;
  else if (screen === "category" && window.CategoryScreen)
    body = <CategoryScreen go={go} onAdd={addToCart} />;
  else if (screen === "catalog" && window.CatalogScreen)
    body = <CatalogScreen go={go} onAdd={addToCart} />;
  else if (screen === "product" && window.ProductScreen)
    body = <ProductScreen go={go} onAdd={addToCart} />;
  else if (screen === "cart" && window.CartScreen)
    body = <CartScreen go={go} cart={cart} setCart={setCart} />;
  else body = <Stub label={meta.label} />;

  const acc = t.accent;
  const accentVars = {
    "--accent": acc,
    "--accent-strong": `color-mix(in srgb, ${acc} 70%, #000)`,
    "--accent-strong-h": `color-mix(in srgb, ${acc} 55%, #000)`,
    "--accent-soft": `color-mix(in srgb, ${acc} 28%, #fff)`,
    "--accent-tint": `color-mix(in srgb, ${acc} 10%, #fff)`,
    "--accent-ink": `color-mix(in srgb, ${acc} 18%, #111)`,
  };

  return (
    <div style={accentVars}>
      {/* prototype toolbar */}
      <div className="proto-bar">
        <div className="proto-inner">
          <div className="proto-brand">
            <span className="proto-logo">kv</span>
            <div>
              <div className="proto-title">Hi-fi прототип — kv-electro</div>
              <div className="proto-sub">
                Преміальний B2B · клікабельний потік
              </div>
            </div>
          </div>
          <div className="proto-tabs">
            <button
              className="proto-back"
              onClick={back}
              disabled={!hist.current.length}
              title="Назад"
            >
              ←
            </button>
            {SCREENS.map((s) => (
              <button
                key={s.id}
                className={"proto-tab" + (s.id === screen ? " is-active" : "")}
                onClick={() => go(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* the actual site */}
      <div className="stage" style={{ fontSize: `${15 * dens}px` }}>
        <SiteHeader go={go} screen={screen} cartCount={cart} />
        {body}
        <SiteFooter go={go} />
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
            color: "var(--on-dark)",
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

      <TweaksPanel>
        <TweakSection label="Акцентний колір" />
        <TweakColor
          label="Колір бренду"
          value={t.accent}
          options={[
            "#1e7a4e",
            "#15603c",
            "#1f5fb0",
            "#7a4e1e",
            "#b23a26",
            "#3dcd58",
          ]}
          onChange={(v) => setTweak("accent", v)}
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
