// hifi-category.jsx — category landing with subcategories + filtered grid
function CatBanner({ cat, go }) {
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
        {/* subcategory chips */}
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

function CategoryScreen({ go, onAdd }) {
  const cat = CATEGORIES[0]; // Модульне обладнання
  const list = [...PRODUCTS, ...PRODUCTS].slice(0, 9);
  return (
    <div className="reveal">
      <CatBanner cat={cat} go={go} />
      <div className="wrap" style={{ paddingTop: 26, paddingBottom: 64 }}>
        <div style={{ display: "flex", gap: 26, alignItems: "flex-start" }} className="list-layout">
          <FilterSidebar />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <SortBar count={cat.count} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="prod-grid-3">
              {list.map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} />)}
            </div>
            <Pagination />
          </div>
        </div>

        {/* SEO / description block */}
        <div className="card" style={{ padding: "28px 32px", marginTop: 40 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Про категорію «{cat.name}»</h2>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 820, margin: 0 }}>
            Модульне обладнання — основа будь-якого розподільчого щита: автоматичні вимикачі, диференційні вимикачі, ПЗВ, обмежувачі перенапруги та модульні контактори на DIN-рейку. У наявності оригінальна продукція ABB, Schneider Electric, Eaton, Hager та ETI з відкличною здатністю від 4.5 до 10 кА. Підбір за номінальним струмом, типом розчіплювача та кількістю полюсів — або зверніться до інженера для розрахунку щита під проєкт.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CategoryScreen });
