// hifi-filters.jsx — shared list controls: filter sidebar, sort/toolbar, pagination
const { useState: useFilterState } = React;

function Check({ label, count, on, accent }) {
  const [c, setC] = useFilterState(!!on);
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "3px 0" }} className="filter-check">
      <span style={{ width: 17, height: 17, borderRadius: "var(--r-xs)", border: "1.5px solid " + (c ? "var(--accent)" : "var(--line-2)"), background: c ? "var(--accent)" : "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} onClick={() => setC(!c)}>
        {c && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span style={{ fontSize: 13.5, color: "var(--ink-2)", flexGrow: 1 }}>{label}</span>
      {count != null && <span className="u-mono" style={{ fontSize: 11, color: "var(--faint)" }}>{count}</span>}
    </label>
  );
}

function FilterGroup({ title, children, open = true }) {
  const [o, setO] = useFilterState(open);
  return (
    <div style={{ borderTop: "1px solid var(--line)", padding: "16px 0" }}>
      <div onClick={() => setO(!o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: o ? 12 : 0 }}>
        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{title}</span>
        <span style={{ color: "var(--muted)", transform: o ? "rotate(180deg)" : "none", transition: ".15s", display: "flex" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
      {o && <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>{children}</div>}
    </div>
  );
}

function FilterSidebar() {
  return (
    <aside style={{ width: 256, flexShrink: 0 }} className="filter-sidebar">
      <div className="card" style={{ padding: "16px 18px", position: "sticky", top: 96 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Фільтри</span>
          <a style={{ fontSize: 12, color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>Скинути</a>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
          <span className="chip chip-accent">ABB <b style={{ cursor: "pointer" }}>✕</b></span>
          <span className="chip chip-accent">16 А <b style={{ cursor: "pointer" }}>✕</b></span>
        </div>

        <FilterGroup title="Виробник">
          <Check label="ABB" count={124} on accent />
          <Check label="Schneider Electric" count={98} />
          <Check label="Eaton" count={76} />
          <Check label="Hager" count={61} />
          <Check label="ETI" count={54} />
        </FilterGroup>

        <FilterGroup title="Номінальний струм">
          <Check label="6 А" count={32} />
          <Check label="10 А" count={44} />
          <Check label="16 А" count={88} on />
          <Check label="25 А" count={51} />
          <Check label="32 А" count={37} />
        </FilterGroup>

        <FilterGroup title="Кількість полюсів">
          <Check label="1P" count={120} />
          <Check label="2P" count={64} />
          <Check label="3P" count={88} />
          <Check label="4P" count={29} />
        </FilterGroup>

        <FilterGroup title="Тип розчіплювача" open={false}>
          <Check label="B" count={42} />
          <Check label="C" count={156} />
          <Check label="D" count={31} />
        </FilterGroup>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 12 }}>Ціна, ₴</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <div style={{ flexGrow: 1, height: 36, border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>120</div>
            <span style={{ color: "var(--faint)" }}>—</span>
            <div style={{ flexGrow: 1, height: 36, border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>4 200</div>
          </div>
          <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 4, position: "relative", marginBottom: 18 }}>
            <span style={{ position: "absolute", left: "12%", right: "40%", top: 0, bottom: 0, background: "var(--accent)", borderRadius: 4 }} />
            <span style={{ position: "absolute", left: "12%", top: "50%", transform: "translate(-50%,-50%)", width: 14, height: 14, background: "#fff", border: "2px solid var(--accent)", borderRadius: "50%" }} />
            <span style={{ position: "absolute", left: "60%", top: "50%", transform: "translate(-50%,-50%)", width: 14, height: 14, background: "#fff", border: "2px solid var(--accent)", borderRadius: "50%" }} />
          </div>
          <button className="btn btn-primary btn-sm btn-block">Застосувати</button>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <Check label="Тільки в наявності" on />
          <Check label="Зі знижкою" />
        </div>
      </div>
    </aside>
  );
}

function SortBar({ count, title, view, setView }) {
  const sorts = ["За популярністю", "Спершу дешевші", "Спершу дорожчі", "Новинки"];
  const [sel, setSel] = useFilterState(0);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
      <div style={{ fontSize: 13.5, color: "var(--muted)" }}>Знайдено <b style={{ color: "var(--ink)" }}>{count}</b> товарів{title ? ` у категорії «${title}»` : ""}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 4 }} className="sort-tabs">
          {sorts.map((s, i) => (
            <button key={i} onClick={() => setSel(i)} className="btn btn-sm" style={{ background: i === sel ? "var(--ink)" : "var(--paper)", color: i === sel ? "var(--on-dark)" : "var(--ink-2)", border: i === sel ? "none" : "1px solid var(--line-2)", height: 36 }}>{s}</button>
          ))}
        </div>
        {setView && (
          <div style={{ display: "flex", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", overflow: "hidden" }}>
            {["grid", "list"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ width: 36, height: 36, border: "none", cursor: "pointer", background: view === v ? "var(--bg-2)" : "var(--paper)", color: view === v ? "var(--ink)" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {v === "grid"
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 36 }}>
      <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }}>←</button>
      {[1, 2, 3, 4].map(n => (
        <button key={n} className="btn btn-sm" style={{ width: 38, padding: 0, background: n === 1 ? "var(--ink)" : "var(--paper)", color: n === 1 ? "var(--on-dark)" : "var(--ink-2)", border: n === 1 ? "none" : "1px solid var(--line-2)" }}>{n}</button>
      ))}
      <span style={{ color: "var(--muted)", padding: "0 4px" }}>…</span>
      <button className="btn btn-sm" style={{ width: 38, padding: 0, background: "var(--paper)", color: "var(--ink-2)", border: "1px solid var(--line-2)" }}>18</button>
      <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }}>→</button>
    </div>
  );
}

Object.assign(window, { FilterSidebar, SortBar, Pagination, FilterGroup, Check });
