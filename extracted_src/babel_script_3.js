// hifi-chrome.jsx — site header (utility bar, main header, category nav) + footer
const { useState: useStateChrome } = React;

function IconCircle({ children }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18 }}>{children}</span>;
}

/* simple stroke icons */
const I = {
  search: <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  heart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  compare: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M7 4 4 8m3-4 3 4M17 20V4m0 16 3-4m-3 4-3-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h2.2l1.8 10.5a1.5 1.5 0 0 0 1.5 1.2h7.3a1.5 1.5 0 0 0 1.5-1.1L21 8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>,
  user: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  menu: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  phone: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  pin: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6"/></svg>,
};

function HeaderIcon({ icon, label, count, onClick }) {
  return (
    <button onClick={onClick} title={label} style={{ position: "relative", appearance: "none", cursor: "pointer", background: "transparent", border: "none", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "2px 6px", fontFamily: "var(--sans)" }} className="hdr-icon">
      <span style={{ position: "relative" }}>
        {icon}
        {count != null && <span style={{ position: "absolute", top: -7, right: -9, background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 20, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontFamily: "var(--mono)" }}>{count}</span>}
      </span>
      <span style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
    </button>
  );
}

function SiteHeader({ go, screen, cartCount = 3 }) {
  const [catOpen, setCatOpen] = useStateChrome(false);
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--paper)" }}>
      {/* utility bar */}
      <div style={{ background: "var(--ink-surface)", color: "var(--on-dark)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 38, fontSize: 12.5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, color: "var(--on-dark-muted)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{I.pin} Київ, вул. Промислова 12</span>
            <span style={{ opacity: .75 }} className="hide-sm">Пн–Пт 9:00–18:00</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 22, color: "var(--on-dark-muted)" }}>
            <a className="util-link" style={{ cursor: "pointer", color: "var(--accent)", fontWeight: 600 }} onClick={() => go("category")}>Гуртовим клієнтам</a>
            <a className="util-link hide-sm" style={{ cursor: "pointer" }}>Оплата і доставка</a>
            <a className="util-link hide-sm" style={{ cursor: "pointer" }}>Сервіс</a>
            <span style={{ opacity: .55 }}>UA</span>
          </div>
        </div>
      </div>

      {/* main header */}
      <div style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 24, height: 84 }}>
          <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer", flexShrink: 0 }}>
            <span style={{ width: 44, height: 44, background: "var(--ink)", color: "#fff", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, letterSpacing: "-.04em" }}>kv</span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-.02em" }}>kv-electro</span>
              <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, letterSpacing: ".02em" }}>електрообладнання та автоматика</span>
            </span>
          </a>

          <button className="btn btn-primary" style={{ height: 48, flexShrink: 0 }} onClick={() => go("category")}>
            {I.menu} Каталог
          </button>

          {/* search */}
          <div style={{ flexGrow: 1, display: "flex", height: 48, border: "1.5px solid var(--ink)", borderRadius: "var(--r-sm)", overflow: "hidden", background: "var(--paper)" }} className="search-bar" onClick={() => go("catalog")}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 14px", borderRight: "1px solid var(--line)", color: "var(--muted)", fontSize: 13, cursor: "pointer", flexShrink: 0 }} className="hide-md">
              Всі категорії {I.chevron}
            </div>
            <input placeholder="Пошук за назвою, артикулом або параметром…" readOnly style={{ flexGrow: 1, border: "none", outline: "none", padding: "0 14px", fontFamily: "var(--sans)", fontSize: 14, background: "transparent", cursor: "pointer" }} />
            <button className="btn btn-accent" style={{ borderRadius: 0, height: "100%", width: 56 }} aria-label="Пошук">{I.search}</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, lineHeight: 1.15 }} className="hide-md">
            <a style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 15.5, whiteSpace: "nowrap" }}>{I.phone} 0 800 000 000</a>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>безкоштовно по Україні</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <HeaderIcon icon={I.compare} label="Порівняти" count={2} onClick={() => go("catalog")} />
            <HeaderIcon icon={I.heart} label="Обране" count={5} onClick={() => go("catalog")} />
            <HeaderIcon icon={I.cart} label="Кошик" count={cartCount} onClick={() => go("cart")} />
          </div>
        </div>
      </div>

      {/* category nav strip */}
      <div style={{ borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 4, height: 46, overflowX: "auto" }}>
          {CATEGORIES.slice(0, 7).map((c) => (
            <a key={c.key} onClick={() => go("category")} className="nav-link" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-2)", padding: "8px 12px", borderRadius: "var(--r-sm)", whiteSpace: "nowrap", cursor: "pointer" }}>{c.name}</a>
          ))}
          <div style={{ flexGrow: 1 }} />
          <a onClick={() => go("catalog")} className="nav-link" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--accent)", padding: "8px 12px", whiteSpace: "nowrap", cursor: "pointer" }}>Акції та розпродаж</a>
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ go }) {
  const cols = [
    ["Каталог", ["Модульне обладнання", "Привідна техніка", "Промислові автомати", "Шафи та кліматизація", "Усі категорії"], "category"],
    ["Покупцям", ["Доставка та оплата", "Оплата частинами", "Гарантія та сервіс", "Повернення товару", "Гуртовим клієнтам"], "home"],
    ["Компанія", ["Про компанію", "Сертифікати якості", "Партнери та бренди", "Статті та огляди", "Контакти"], "home"],
  ];
  return (
    <footer style={{ background: "var(--ink-surface)", color: "var(--on-dark)", marginTop: 8 }}>
      <div className="wrap" style={{ padding: "54px 28px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1.3fr", gap: 36 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 40, height: 40, background: "var(--accent)", color: "#fff", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, letterSpacing: "-.04em" }}>kv</span>
              <span style={{ fontWeight: 800, fontSize: 18 }}>kv-electro</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--on-dark-muted)", lineHeight: 1.6, margin: "0 0 16px", maxWidth: 280 }}>
              Офіційний постачальник модульного, силового та промислового електрообладнання провідних брендів. Великий складський запас, відправка по всій Україні.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["IG", "FB", "TG", "VB"].map(s => <span key={s} style={{ width: 34, height: 34, border: "1px solid var(--line-dark)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--on-dark-muted)", fontFamily: "var(--mono)" }}>{s}</span>)}
            </div>
          </div>
          {cols.map((col, k) => (
            <div key={k}>
              <div className="u-label" style={{ color: "var(--on-dark-muted)", marginBottom: 16 }}>{col[0]}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col[1].map((l, j) => <a key={j} onClick={() => go(col[2])} style={{ fontSize: 13.5, color: "var(--on-dark)", opacity: .82, cursor: "pointer" }} className="foot-link">{l}</a>)}
              </div>
            </div>
          ))}
          <div>
            <div className="u-label" style={{ color: "var(--on-dark-muted)", marginBottom: 16 }}>Контакти</div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>0 800 000 000</div>
            <div style={{ fontSize: 13, color: "var(--on-dark-muted)", marginBottom: 18 }}>order@kv-electro.ua</div>
            <div className="u-label" style={{ color: "var(--on-dark-muted)", marginBottom: 10 }}>Ми приймаємо</div>
            <div style={{ display: "flex", gap: 7 }}>
              {["Visa", "MC", "ПДВ", "ФОП"].map(p => <span key={p} style={{ height: 26, padding: "0 9px", border: "1px solid var(--line-dark)", borderRadius: "var(--r-xs)", display: "flex", alignItems: "center", fontSize: 11, color: "var(--on-dark-muted)", fontFamily: "var(--mono)" }}>{p}</span>)}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "var(--line-dark)", margin: "34px 0 18px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--on-dark-muted)" }}>
          <span>© 2026 kv-electro · ТОВ «КВ Електро» · ЄДРПОУ 00000000</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a style={{ cursor: "pointer" }} className="foot-link">Політика конфіденційності</a>
            <a style={{ cursor: "pointer" }} className="foot-link">Публічна оферта</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, HeaderIcon, ICONS: I });
