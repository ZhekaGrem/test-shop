// hifi-card.jsx — product card variants
const { useState: useStateCard } = React;

function PriceBlock({ price, old, size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
      <Money value={price} size={size} />
      {old && <Money value={old} size={size * .62} strike c="var(--muted)" />}
    </div>
  );
}

function FavBtn() {
  const [on, setOn] = useStateCard(false);
  return (
    <button onClick={(e) => { e.stopPropagation(); setOn(!on); }} aria-label="В обране"
      style={{ appearance: "none", cursor: "pointer", background: on ? "var(--accent-tint)" : "var(--paper)", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: on ? "var(--accent)" : "var(--muted)", flexShrink: 0 }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"}><path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
    </button>
  );
}

function ProductCard({ p, go, onAdd }) {
  return (
    <div className="card lift" style={{ display: "flex", flexDirection: "column", overflow: "hidden", cursor: "pointer" }} onClick={() => go("product")}>
      {/* image area */}
      <div style={{ position: "relative", padding: "18px 18px 10px", background: "var(--paper)" }}>
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, zIndex: 2 }}>
          {p.badge === "sale" && <span className="badge badge-sale">Акція</span>}
          {p.badge === "new" && <span className="badge badge-new">Новинка</span>}
          {p.badge === "hit" && <span className="badge badge-hit">Хіт</span>}
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}><FavBtn /></div>
        <div style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ProductGlyph type={p.glyph} size={120} />
        </div>
      </div>

      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 11, flexGrow: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".02em" }}>{p.brand}</span>
          <span className="u-mono" style={{ fontSize: 10.5, color: "var(--faint)" }}>{p.art}</span>
        </div>

        <a className="card-title" style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.32, color: "var(--ink)", minHeight: 38 }}>{p.name}</a>

        <Stars n={p.rating} reviews={p.reviews} />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.chips.slice(0, 4).map((c, i) => <span key={i} className="chip" style={{ fontSize: 10.5, padding: "3px 7px" }}>{c}</span>)}
        </div>

        <div style={{ marginTop: "auto", paddingTop: 6 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
            <PriceBlock price={p.price} old={p.old} size={21} />
            <Stock kind={p.stock} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}>
              {ICONS.cart} У кошик
            </button>
            <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }} aria-label="Порівняти" onClick={(e) => { e.stopPropagation(); }}>{ICONS.compare}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* horizontal row card — for catalog list view */
function ProductRow({ p, go, onAdd }) {
  return (
    <div className="card lift" style={{ display: "flex", gap: 20, padding: 18, cursor: "pointer", alignItems: "center" }} onClick={() => go("product")}>
      <div style={{ width: 120, height: 120, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {p.badge === "sale" && <span className="badge badge-sale" style={{ position: "absolute", top: 0, left: 0 }}>Акція</span>}
        <ProductGlyph type={p.glyph} size={100} />
      </div>
      <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 12 }}>{p.brand}</span>
          <span className="u-mono" style={{ fontSize: 10.5, color: "var(--faint)" }}>арт. {p.art}</span>
          <Stars n={p.rating} reviews={p.reviews} />
        </div>
        <a style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.3 }} className="card-title">{p.name}</a>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {Object.entries(p.specs).slice(0, 4).map(([k, v]) => (
            <span key={k} style={{ fontSize: 12, color: "var(--muted)" }}>{k}: <b style={{ color: "var(--ink-2)", fontWeight: 600 }}>{v}</b></span>
          ))}
        </div>
      </div>
      <div style={{ width: 200, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, alignSelf: "stretch", justifyContent: "space-between", borderLeft: "1px solid var(--line)", paddingLeft: 20 }}>
        <Stock kind={p.stock} />
        <PriceBlock price={p.price} old={p.old} size={23} />
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}>{ICONS.cart} У кошик</button>
          <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }} onClick={(e) => e.stopPropagation()}>{ICONS.heart}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductCard, ProductRow, PriceBlock, FavBtn });
