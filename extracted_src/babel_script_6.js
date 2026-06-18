// hifi-home.jsx — homepage
function HeroPanel({ go }) {
  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 16 }} className="hero-grid">
        {/* main hero */}
        <div style={{ position: "relative", background: "var(--ink-surface)", color: "var(--on-dark)", borderRadius: "var(--r-lg)", overflow: "hidden", minHeight: 360, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,.04) 39px 40px), repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,.04) 39px 40px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 560 }}>
            <div className="u-label" style={{ color: "var(--accent)", marginBottom: 18 }}>Офіційний постачальник · 2008</div>
            <h1 style={{ fontSize: 44, lineHeight: 1.04, letterSpacing: "-.025em", fontWeight: 800, marginBottom: 18 }}>
              Електрообладнання<br />для тих, хто рахує<br /><span style={{ color: "var(--accent)" }}>аптайм.</span>
            </h1>
            <p style={{ fontSize: 15.5, color: "var(--on-dark-muted)", lineHeight: 1.6, marginBottom: 28, maxWidth: 440 }}>
              Автомати, ПЗВ, частотники, контактори, реле та шафи від ABB, Schneider, Eaton, ETI. Складський запас, відправка день-у-день, ціни для монтажників і проєктів.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-accent btn-lg" onClick={() => go("category")}>Перейти в каталог</button>
              <button className="btn btn-lg" style={{ background: "transparent", color: "#fff", border: "1px solid var(--line-dark)" }} onClick={() => go("catalog")}>Підбір за параметрами</button>
            </div>
          </div>
          <div style={{ position: "absolute", right: 36, top: "50%", transform: "translateY(-50%)", opacity: .9 }} className="hide-md">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {["breaker", "drive", "contactor", "meter"].map((g, i) => (
                <div key={i} style={{ width: 96, height: 96, background: "rgba(255,255,255,.06)", border: "1px solid var(--line-dark)", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ filter: "invert(1) brightness(1.8)" }}><ProductGlyph type={g} size={64} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* side promos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1, background: "var(--accent-tint)", borderColor: "var(--accent-soft)" }}>
            <div>
              <div className="u-label" style={{ color: "var(--accent)", marginBottom: 10 }}>Розпродаж складу</div>
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>Danfoss FC-51<br />−45% на частотники</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: 0 }}>Поки є на складі. Обмежена партія приводів 0.37–2.2 кВт.</p>
            </div>
            <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 16 }} onClick={() => go("product")}>Дивитись →</button>
          </div>
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
            <div>
              <div className="u-label" style={{ marginBottom: 10 }}>Для бізнесу</div>
              <h3 style={{ fontSize: 21, marginBottom: 8 }}>Гуртові ціни та відстрочка платежу</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0 }}>Персональний менеджер, прайс під проєкт, документи з ПДВ.</p>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start", marginTop: 16 }} onClick={() => go("category")}>Стати клієнтом B2B</button>
          </div>
        </div>
      </div>

      {/* trust strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 16, border: "1px solid var(--line)", borderRadius: "var(--r-md)", background: "var(--paper)", overflow: "hidden" }} className="trust-strip">
        {[
          ["Складський запас", "понад 12 000 позицій у наявності"],
          ["Відправка день-у-день", "замовлення до 16:00 — сьогодні"],
          ["Оригінал і гарантія", "офіційні поставки, сертифікати"],
          ["Підтримка інженера", "допомога з підбором і заміною"],
        ].map(([t, d], i) => (
          <div key={i} style={{ padding: "18px 22px", borderLeft: i ? "1px solid var(--line)" : "none", display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{t}</span>
            <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid({ go }) {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <SectionHead kicker="Каталог" title="Категорії обладнання" action="Усі категорії →" onAction={() => go("category")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="cat-grid">
        {CATEGORIES.map((c) => (
          <a key={c.key} onClick={() => go("category")} className="card lift cat-card" style={{ padding: 18, cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, minHeight: 158 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <ProductGlyph type={c.glyph} size={52} />
              <span className="u-mono" style={{ fontSize: 11, color: "var(--faint)" }}>{c.count}</span>
            </div>
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.25 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, lineHeight: 1.4 }}>{c.subs.slice(0, 2).join(" · ")}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts({ go, onAdd }) {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <SectionHead kicker="Рекомендуємо" title="Популярне у монтажників" action="Більше товарів →" onAction={() => go("catalog")} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="prod-grid">
        {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} go={go} onAdd={onAdd} />)}
      </div>
    </section>
  );
}

function BrandRow() {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <div className="card" style={{ padding: "26px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <div className="u-label" style={{ marginBottom: 6 }}>Офіційні поставки</div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Працюємо напряму з брендами</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flexGrow: 1, justifyContent: "flex-end" }}>
            {BRANDS.map((b) => (
              <div key={b} style={{ height: 48, minWidth: 96, padding: "0 18px", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: "var(--ink-2)", letterSpacing: "-.01em" }}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ go, onAdd }) {
  return (
    <div className="reveal">
      <HeroPanel go={go} />
      <CategoryGrid go={go} />
      <FeaturedProducts go={go} onAdd={onAdd} />
      <BrandRow />
      <div style={{ height: 64 }} />
    </div>
  );
}

Object.assign(window, { HomeScreen });
