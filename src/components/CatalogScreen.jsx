import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Crumbs } from './Common';
import { ProductCard, ProductRow, ProductTable } from './ProductCards';
import { FilterSidebar, FilterContents, SortBar, Pagination } from './Filters';

export function CatalogScreen({ go, onAdd, onQuickView, theme }) {
  const [view, setView] = useState("table"); // Default to B2B spreadsheet table view!
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const list = [...PRODUCTS, ...PRODUCTS].slice(0, 8);

  return (
    <div className="reveal">
      <div style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 18, paddingBottom: 22 }}>
          <Crumbs items={[["Головна", "home"], "Пошук"]} go={go} />
          <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: 28 }}>Результати пошуку</h1>
            <span className="u-mono" style={{ fontSize: 14, color: "var(--muted)" }}>запит: «ABB 16A»</span>
          </div>
          {/* applied query chips */}
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <span className="chip chip-accent">Уточнити: <b style={{ marginLeft: 4 }}>тип C</b></span>
            <span className="chip chip-accent">1P</span>
            <span className="chip chip-accent">6 кА</span>
            <span className="chip chip-accent">на складі</span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div style={{ display: "flex", gap: 26, alignItems: "flex-start" }} className="list-layout">
          <FilterSidebar />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <SortBar count={47} view={view} setView={setView} onOpenFilters={() => setMobileFiltersOpen(true)} />
            {view === "list" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {list.map((p, i) => <ProductRow key={i} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />)}
              </div>
            )}
            {view === "grid" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="prod-grid-3">
                {list.map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />)}
              </div>
            )}
            {view === "table" && (
              <ProductTable list={list} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />
            )}
            <Pagination />
          </div>
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
