import React, { useState } from 'react';
import { I } from './Icons';
import { CATEGORIES } from '../data/products';

export function SiteHeader({ go, screen, cartCount = 3 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 180, background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
      {/* main header (desktop only) — neo-brutal: pure white, sharp edges, grid dividers, flat */}
      <div className="hide-md">
        <div className="wrap" style={{ display: "flex", alignItems: "stretch", height: 80, padding: "0 28px" }}>
          {/* logo lockup — geometric mark + uppercase tracked wordmark */}
          <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 13, cursor: "pointer", flexShrink: 0, paddingRight: 26, borderRight: "1px solid var(--line)" }}>
            <img src="/logo.webp" alt="kv-electro" width={60} height={60} style={{ borderRadius: 0, display: "block" }} />
            <span style={{ display: "flex", flexDirection: "column", gap: 4, lineHeight: 1 }}>
              <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: ".11em", textTransform: "uppercase" }}>KV·ELECTRO</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--muted)", letterSpacing: ".2em", textTransform: "uppercase" }}>Електрообладнання</span>
            </span>
          </a>

          {/* catalog — sharp charcoal block */}
          <button onClick={() => go("category")} style={{ appearance: "none", cursor: "pointer", border: "none", background: "var(--ink)", color: "var(--on-dark)", display: "inline-flex", alignItems: "center", gap: 9, padding: "0 22px", margin: "17px 22px 17px 26px", height: 46, borderRadius: 0, fontFamily: "var(--sans)", fontWeight: 700, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", flexShrink: 0, transition: "background .15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#000")} onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}>
            {I.menu} Каталог
          </button>

          {/* search — rigid harsh border + green square action button with charcoal icon */}
          <div onClick={() => go("catalog")} style={{ flexGrow: 1, alignSelf: "center", display: "flex", height: 46, border: "1px solid var(--ink)", borderRadius: 0, background: "var(--paper)", cursor: "pointer" }}>
            <input placeholder="Пошук за назвою або артикулом…" readOnly style={{ flexGrow: 1, border: "none", outline: "none", padding: "0 16px", fontFamily: "var(--sans)", fontSize: 13.5, background: "transparent", cursor: "pointer", color: "var(--ink)" }} />
            <button aria-label="Пошук" style={{ appearance: "none", cursor: "pointer", border: "none", borderLeft: "1px solid var(--ink)", background: "var(--accent)", color: "var(--ink)", width: 52, height: "100%", borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-strong)")} onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}>{I.search}</button>
          </div>

          {/* phone — strict monospace */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", flexShrink: 0, lineHeight: 1.2, padding: "0 24px", marginLeft: 22, borderLeft: "1px solid var(--line)" }}>
            <a style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--mono)", fontWeight: 600, fontSize: 15, letterSpacing: ".01em", whiteSpace: "nowrap" }} href="tel:0800000000">{I.phone} 0 800 000 000</a>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 5 }}>безкоштовно по Україні</span>
          </div>

          {/* cart — minimal technical icon, sharp counter */}
          <button onClick={() => go("cart")} title="Кошик" className="hdr-icon" style={{ position: "relative", appearance: "none", cursor: "pointer", background: "transparent", border: "none", borderLeft: "1px solid var(--line)", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: "0 22px", flexShrink: 0, fontFamily: "var(--sans)" }}>
            <span style={{ position: "relative" }}>
              {I.cart}
              {cartCount > 0 && <span style={{ position: "absolute", top: -8, right: -10, background: "var(--accent)", color: "var(--ink)", fontSize: 10, fontWeight: 700, borderRadius: 0, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontFamily: "var(--mono)" }}>{cartCount}</span>}
            </span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>Кошик</span>
          </button>
        </div>
      </div>

      {/* Mobile Header (mobile only, visible on max-width 720px) */}
      <div className="mobile-header" style={{ display: "none", background: "var(--paper)", height: 56, alignItems: "center", padding: "0 16px" }}>
        <button onClick={() => setMobileMenuOpen(true)} aria-label="Меню" style={{ background: "transparent", border: "none", color: "var(--ink)", padding: 6, cursor: "pointer", marginRight: 8 }}>
          {I.menu}
        </button>
        
        <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <img src="/logo.webp" alt="kv-electro" width={34} height={34} style={{ borderRadius: "var(--r-sm)", display: "block" }} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>kv-electro</span>
        </a>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => go("catalog")} aria-label="Пошук" style={{ background: "transparent", border: "none", color: "var(--ink)", padding: 8 }}>
            {I.search}
          </button>
          <button onClick={() => go("cart")} aria-label="Кошик" style={{ background: "transparent", border: "none", color: "var(--ink)", padding: 8, position: "relative" }}>
            {I.cart}
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: 2, right: 0, background: "var(--accent)", color: "#fff", fontSize: 8, fontWeight: 700, borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CSS injection for mobile header display toggle */}
      <style>{`
        @media (max-width: 720px) {
          .mobile-header {
            display: flex !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Категорії</span>
              <button className="modal-close" style={{ position: "static" }} onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {CATEGORIES.map((c) => (
                <a key={c.key} 
                   onClick={() => { setMobileMenuOpen(false); go("category"); }} 
                   style={{ display: "block", padding: "12px 14px", borderRadius: "var(--r-sm)", fontWeight: 600, fontSize: 14, background: "var(--bg)", color: "var(--ink-2)", cursor: "pointer" }}
                   className="nav-link"
                >
                  {c.name}
                </a>
              ))}
              <div style={{ height: 1, background: "var(--line)", margin: "14px 0" }} />
              <a onClick={() => { setMobileMenuOpen(false); go("catalog"); }} style={{ padding: "12px 14px", fontWeight: 700, color: "var(--accent)", cursor: "pointer" }}>
                Акції та розпродаж
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function MobileBottomNav({ go, screen, cartCount = 3 }) {
  return (
    <div className="mobile-bottom-nav">
      <button onClick={() => go("home")} className={`mobile-nav-btn ${screen === 'home' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <span>Головна</span>
      </button>

      <button onClick={() => go("category")} className={`mobile-nav-btn ${screen === 'category' ? 'active' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span>Каталог</span>
      </button>

      <button onClick={() => go("cart")} className={`mobile-nav-btn ${screen === 'cart' ? 'active' : ''}`}>
        {I.cart}
        {cartCount > 0 && <span className="mobile-nav-badge">{cartCount}</span>}
        <span>Кошик</span>
      </button>
    </div>
  );
}

export function SiteFooter({ go }) {
  const LINE = "#4A4F55"; // видимі grid-лінії (бриф)
  const colTitle = { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--on-dark-muted)", marginBottom: 22, display: "block" };
  const linkStyle = { display: "block", padding: "8px 0", fontSize: 14, color: "var(--on-dark)", cursor: "pointer" };

  const catalogLinks = [
    "Модульне обладнання", "Привідна техніка", "Промислові автомати", "Шафи та кліматизація", "Аналізатори електроенергії",
  ];
  const companyLinks = [
    "Про компанію", "Доставка та оплата", "Гарантія та сервіс", "Збірка електрощитів", "Контакти",
  ];

  return (
    <footer style={{ background: "var(--ink-surface)", color: "var(--on-dark)", marginTop: 64, borderTop: `1px solid ${LINE}` }}>
      <div className="wrap">
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr 1.35fr" }}>
          {/* brand — геометрична марка без білого боксу */}
          <div className="footer-brand" style={{ padding: "46px 40px 46px 0", borderRight: `1px solid ${LINE}` }}>
             <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <img src="/logo-footer.png" alt="kv-electro" width={55} height={55} style={{ borderRadius: "var(--r-sm)", display: "block" }} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>kv·electro</span>
             
            </a>
            <p style={{ fontSize: 13.5, color: "var(--on-dark-muted)", lineHeight: 1.6, margin: "24px 0 0", maxWidth: 320 }}>
              Офіційний постачальник модульного та промислового електрообладнання з 2008 року. Підбір, збірка та випробування щитів.
            </p>
          </div>

          {/* nav — Каталог */}
          <div style={{ padding: "46px 32px", borderRight: `1px solid ${LINE}` }}>
            <span style={colTitle}>Каталог</span>
            {catalogLinks.map((l) => (
              <a key={l} onClick={() => go("category")} className="foot-link" style={linkStyle}>{l}</a>
            ))}
          </div>

          {/* nav — Компанія */}
          <div style={{ padding: "46px 32px", borderRight: `1px solid ${LINE}` }}>
            <span style={colTitle}>Компанія</span>
            {companyLinks.map((l) => (
              <a key={l} className="foot-link" style={linkStyle}>{l}</a>
            ))}
          </div>

          {/* contacts — великий моноширинний телефон + email */}
          <div style={{ padding: "46px 0 46px 36px" }}>
            <span style={colTitle}>Зв'язок</span>
            <a href="tel:0800000000" className="u-mono" style={{ display: "block", fontSize: 24, fontWeight: 700, letterSpacing: "-.01em", color: "var(--on-dark)", whiteSpace: "nowrap" }}>0 800 000 000</a>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--on-dark-muted)", letterSpacing: ".1em", textTransform: "uppercase", display: "block", marginTop: 8 }}>безкоштовно по Україні</span>
            <a href="mailto:order@kv-electro.ua" className="foot-link u-mono" style={{ display: "block", fontSize: 14, color: "var(--on-dark)", marginTop: 22, cursor: "pointer" }}>order@kv-electro.ua</a>
            <span style={{ fontSize: 13, color: "var(--on-dark-muted)", display: "block", marginTop: 14, lineHeight: 1.5 }}>Київ, вул. Глибочицька, 17<br />Пн–Пт · 09:00–18:00</span>
          </div>
        </div>

        {/* bottom — full-width line + копірайт ВЕРСАЛОМ */}
        <div style={{ borderTop: `1px solid ${LINE}`, padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--on-dark-muted)" }}>© 2026 KV·ELECTRO — ТОВ «КВ ЕЛЕКТРО»</span>
          <span style={{ display: "flex", gap: 26 }}>
            <a className="foot-link" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--on-dark-muted)", cursor: "pointer" }}>Політика конфіденційності</a>
            <a className="foot-link" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--on-dark-muted)", cursor: "pointer" }}>Публічна оферта</a>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
          .footer-cols > div { border-right: none !important; border-bottom: 1px solid ${LINE}; padding: 36px 0 !important; }
          .footer-cols > div + div { padding-left: 32px !important; border-left: 1px solid ${LINE}; }
          .footer-brand { grid-column: 1 / -1; border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 560px) {
          .footer-cols { grid-template-columns: 1fr !important; }
          .footer-cols > div + div { padding-left: 0 !important; border-left: none !important; }
        }
      `}</style>
    </footer>
  );
}
