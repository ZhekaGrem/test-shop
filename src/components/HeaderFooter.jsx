import React, { useState } from 'react';
import { I } from './Icons';
import { CATEGORIES } from '../data/products';
import { HeaderIcon } from './Common';

export function SiteHeader({ go, screen, cartCount = 3 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 180, background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
      {/* main header (desktop only, hidden on mobile) */}
      <div className="hide-md">
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 24, height: 76 }}>
          <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer", flexShrink: 0 }}>
            <span style={{ width: 40, height: 40, background: "var(--ink)", color: "#fff", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, letterSpacing: "-.04em" }}>kv</span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>kv-electro</span>
              <span style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 500 }}>електрообладнання та автоматика</span>
            </span>
          </a>

          <button className="btn btn-primary" style={{ height: 44, flexShrink: 0 }} onClick={() => go("category")}>
            {I.menu} Каталог
          </button>

          {/* search */}
          <div style={{ flexGrow: 1, display: "flex", height: 44, border: "1.5px solid var(--ink)", borderRadius: "var(--r-sm)", overflow: "hidden", background: "var(--paper)" }} className="search-bar" onClick={() => go("catalog")}>
            <input placeholder="Пошук за назвою або артикулом…" readOnly style={{ flexGrow: 1, border: "none", outline: "none", padding: "0 14px", fontFamily: "var(--sans)", fontSize: 13.5, background: "transparent", cursor: "pointer" }} />
            <button className="btn btn-accent" style={{ borderRadius: 0, height: "100%", width: 48 }} aria-label="Пошук">{I.search}</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, lineHeight: 1.15 }}>
            <a style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14.5, whiteSpace: "nowrap" }} href="tel:0800000000">{I.phone} 0 800 000 000</a>
            <span style={{ fontSize: 10.5, color: "var(--muted)" }}>безкоштовно по Україні</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <HeaderIcon icon={I.cart} label="Кошик" count={cartCount} onClick={() => go("cart")} />
          </div>
        </div>
      </div>

      {/* Mobile Header (mobile only, visible on max-width 720px) */}
      <div className="mobile-header" style={{ display: "none", background: "var(--paper)", height: 56, alignItems: "center", padding: "0 16px" }}>
        <button onClick={() => setMobileMenuOpen(true)} aria-label="Меню" style={{ background: "transparent", border: "none", color: "var(--ink)", padding: 6, cursor: "pointer", marginRight: 8 }}>
          {I.menu}
        </button>
        
        <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <span style={{ width: 32, height: 32, background: "var(--ink)", color: "#fff", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>kv</span>
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
  return (
    <footer style={{ background: "var(--ink-surface)", color: "var(--on-dark)", marginTop: 8 }}>
      <div className="wrap" style={{ padding: "30px 28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <a onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <span style={{ width: 34, height: 34, background: "var(--accent)", color: "#fff", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, letterSpacing: "-.04em" }}>kv</span>
            <span style={{ fontWeight: 800, fontSize: 16 }}>kv-electro</span>
          </a>
          <div style={{ display: "flex", gap: 24, fontSize: 13.5, color: "var(--on-dark-muted)" }}>
            <a onClick={() => go("category")} style={{ cursor: "pointer" }} className="foot-link">Каталог</a>
            <a onClick={() => go("catalog")} style={{ cursor: "pointer" }} className="foot-link">Пошук</a>
            <a onClick={() => go("cart")} style={{ cursor: "pointer" }} className="foot-link">Кошик</a>
          </div>
          <div style={{ fontSize: 13, color: "var(--on-dark-muted)" }}>
            0 800 000 000 · order@kv-electro.ua
          </div>
        </div>
        <div style={{ height: 1, background: "var(--line-dark)", margin: "20px 0 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 12, color: "var(--on-dark-muted)" }}>
          <span>© 2026 kv-electro · ТОВ «КВ Електро»</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a style={{ cursor: "pointer" }} className="foot-link">Політика конфіденційності</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
