// hifi-catalog.jsx — search results with grid/list toggle
const { useState: useCatalogState } = React;

function CatalogScreen({ go, onAdd }) {
  const [view, setView] = useCatalogState("list");
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
            <span className="chip chip-line">Уточнити: <b style={{ marginLeft: 4 }}>тип C</b></span>
            <span className="chip chip-line">1P</span>
            <span className="chip chip-line">6 кА</span>
            <span className="chip chip-line">на складі</span>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div style={{ display: "flex", gap: 26, alignItems: "flex-start" }} className="list-layout">
          <FilterSidebar />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <SortBar count={47} view={view} setView={setView} />
            {view === "list" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {list.map((p, i) => <ProductRow key={i} p={p} go={go} onAdd={onAdd} />)}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="prod-grid-3">
                {list.map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} />)}
              </div>
            )}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CatalogScreen });
