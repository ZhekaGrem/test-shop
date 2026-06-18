import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductGlyph, Crumbs } from './Common';
import { ProductCard } from './ProductCards';
import { FilterSidebar, FilterContents, SortBar, Pagination } from './Filters';

// --- HYBRID THEME COMPONENTS ---

function CatBannerHybrid({ cat, go }) {
  return (
    <div style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ paddingTop: 18, paddingBottom: 26 }}>
        <Crumbs items={[["Головна", "home"], ["Каталог", "category"], cat.name]} go={go} />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginTop: 18, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 72, height: 72, background: "var(--bg)", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ProductGlyph type={cat.glyph} size={56} />
            </div>
            <div>
              <h1 style={{ fontSize: 32, marginBottom: 6 }}>{cat.name}</h1>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>{cat.count} товарів · {cat.subs.length} підкатегорій · бренди: ABB, Schneider, Eaton, ETI</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
          {cat.subs.map((s, i) => (
            <a key={i} onClick={() => go("catalog")} className="lift" style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r-md)", padding: "10px 14px 10px 12px", cursor: "pointer" }}>
              <span style={{ width: 34, height: 34, background: "var(--bg)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}><ProductGlyph type={cat.glyph} size={26} /></span>
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>{s}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SWISS THEME COMPONENTS ---

function CatBannerSwiss({ cat, go }) {
  return (
    <div style={{ paddingBottom: 40, borderBottom: "3px solid var(--ink)" }}>
      <div className="wrap" style={{ paddingTop: 20 }}>
        <Crumbs items={[["Головна", "home"], ["Каталог", "category"], cat.name]} go={go} />
        <div style={{ marginTop: 24 }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>{cat.name}</h1>
          <p style={{ fontSize: 16, color: "var(--ink)", marginTop: 8 }}>
            [{cat.count} одиниць номенклатури / виробники: ABB, Schneider Electric, Eaton, ETI]
          </p>
        </div>
        {/* subcategory clean link chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          {cat.subs.map((s, i) => (
            <a key={i} onClick={() => go("catalog")} style={{ padding: "8px 16px", border: "1.5px solid var(--ink)", background: "var(--paper)", fontWeight: 800, textTransform: "uppercase", fontSize: 12.5, cursor: "pointer" }} className="lift">
              {s}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN WRAPPER SCREEN ---

export function CategoryScreen({ go, onAdd, onQuickView, theme }) {
  const cat = CATEGORIES[0]; // Модульне обладнання
  const list = [...PRODUCTS, ...PRODUCTS].slice(0, 9);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const isSwiss = theme === "swiss";

  return (
    <div className="reveal">
      {isSwiss ? <CatBannerSwiss cat={cat} go={go} /> : <CatBannerHybrid cat={cat} go={go} />}
      
      <div className="wrap" style={{ paddingTop: 30, paddingBottom: 64 }}>
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }} className="list-layout">
          <FilterSidebar />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <SortBar count={cat.count} onOpenFilters={() => setMobileFiltersOpen(true)} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="prod-grid-3">
              {list.map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />)}
            </div>
            <Pagination />
          </div>
        </div>

        {/* SEO / description block */}
        <div style={{ borderTop: isSwiss ? "3px solid var(--ink)" : "none", background: isSwiss ? "transparent" : "var(--paper)", padding: isSwiss ? "32px 0 0 0" : "28px 32px", marginTop: 48, borderRadius: isSwiss ? 0 : "var(--r-md)", border: isSwiss ? "none" : "1px solid var(--line)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase", marginBottom: 12 }}>Про категорію «{cat.name}»</h2>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 820, margin: 0 }}>
            Модульне обладнання — основа будь-якого розподільчого щита: автоматичні вимикачі, диференційні вимикачі, ПЗВ, обмежувачі перенапруги та модульні контактори на DIN-рейку. У наявності оригінальна продукція ABB, Schneider Electric, Eaton, Hager та ETI з відкличною здатністю від 4.5 до 10 кА. Підбір за номінальним струмом, типом розчіплювача та кількістю полюсів — або зверніться до інженера для розрахунку щита під проєкт.
          </p>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontWeight: 800, fontSize: 17 }}>Фільтри</span>
              <button className="modal-close" style={{ position: "static" }} onClick={() => setMobileFiltersOpen(false)}>✕</button>
            </div>
            <FilterContents onApply={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
