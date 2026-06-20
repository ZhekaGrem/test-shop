import { useState } from 'react';
import { I } from './Icons';
import { Money, Stars, Stock, ProductGlyph } from './Common';

export function PriceBlock({ price, old, size = 22 }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
      <Money value={price} size={size} />
      {old && <Money value={old} size={size * .62} strike c="var(--muted)" />}
    </div>
  );
}

export function FavBtn() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={(e) => { e.stopPropagation(); setOn(!on); }} aria-label="В обране"
      style={{ appearance: "none", cursor: "pointer", background: on ? "var(--accent-tint)" : "var(--paper)", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: on ? "var(--accent)" : "var(--muted)", flexShrink: 0 }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"}><path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
    </button>
  );
}

export function ProductCard({ p, go, onAdd, onQuickView, theme }) {
  const isSwiss = theme === "swiss";

  if (isSwiss) {
    return (
      <div
        onClick={() => go("product")}
        style={{ display: "flex", flexDirection: "column", gap: 10, cursor: "pointer", borderBottom: "2px solid var(--ink)", paddingBottom: 16 }}
      >
        <div style={{ position: "relative", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", height: 160 }}>
          <ProductGlyph type={p.glyph} size={110} />
          <button
            className="btn btn-ghost btn-sm"
            style={{ position: "absolute", bottom: 8, right: 8, height: 28, fontSize: 11, border: "1px solid var(--ink)", background: "var(--paper)" }}
            onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(p); }}
          >
            Огляд
          </button>
        </div>
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", fontWeight: 700, marginBottom: 2 }}>
            {p.brand}
          </div>
          <a style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", lineHeight: 1.25, display: "block", minHeight: 38 }}>
            {p.name}
          </a>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 8 }}>
            <PriceBlock price={p.price} old={p.old} size={18} />
            <span style={{ fontSize: 11, color: p.stock === 'in' ? 'var(--ok)' : 'var(--warn)', fontWeight: 700, textTransform: "uppercase" }}>
              {p.stock === 'in' ? 'В наявності' : 'Замовлення'}
            </span>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="card-img-container" style={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {p.img
            ? <img src={p.img} alt={p.name} style={{ maxHeight: 142, maxWidth: "100%", objectFit: "contain" }} />
            : <ProductGlyph type={p.glyph} size={120} />}
          <div className="quick-view-btn-wrap">
            <button className="btn btn-sm quick-view-btn" onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(p); }}>
              {I.search} Швидкий перегляд
            </button>
          </div>
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
              {I.cart} У кошик
            </button>
            <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }} aria-label="Порівняти" onClick={(e) => { e.stopPropagation(); }}>{I.compare}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductRow({ p, go, onAdd, onQuickView, theme }) {
  const isSwiss = theme === "swiss";

  if (isSwiss) {
    return (
      <div
        onClick={() => go("product")}
        style={{ display: "flex", gap: 24, padding: "16px 0", borderBottom: "2px solid var(--ink)", cursor: "pointer", alignItems: "center" }}
      >
        <div style={{ width: 100, height: 100, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ProductGlyph type={p.glyph} size={70} />
        </div>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", fontWeight: 700, marginBottom: 2 }}>{p.brand}</div>
          <a style={{ fontSize: 18, fontWeight: 900, color: "var(--ink)" }}>{p.name}</a>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {Object.entries(p.specs).slice(0, 3).map(([k, v]) => (
              <span key={k} style={{ fontSize: 12, color: "var(--muted)" }}>{k}: <b>{v}</b></span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <PriceBlock price={p.price} old={p.old} size={20} />
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}
            style={{ height: 32, padding: "0 12px", border: "1px solid var(--ink)" }}
          >
            Придбати
          </button>
        </div>
      </div>
    );
  }

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
          <button className="btn btn-primary btn-sm" style={{ flexGrow: 1 }} onClick={(e) => { e.stopPropagation(); onAdd && onAdd(); }}>{I.cart} У кошик</button>
          <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }} onClick={(e) => { e.stopPropagation(); onQuickView && onQuickView(p); }} title="Швидкий перегляд">{I.search}</button>
          <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 38 }} onClick={(e) => e.stopPropagation()}>{I.heart}</button>
        </div>
      </div>
    </div>
  );
}

export function ProductTable({ list, go, onAdd, onQuickView, theme }) {
  const isSwiss = theme === "swiss";

  if (isSwiss) {
    return (
      <div style={{ background: "var(--paper)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2.5px solid var(--ink)" }}>
              <th style={{ padding: "12px 8px", fontWeight: 900, textTransform: "uppercase", fontSize: 12 }}>Назва товару</th>
              <th style={{ padding: "12px 8px", fontWeight: 900, textTransform: "uppercase", fontSize: 12 }}>Артикул</th>
              <th style={{ padding: "12px 8px", fontWeight: 900, textTransform: "uppercase", fontSize: 12 }}>Наявність</th>
              <th style={{ padding: "12px 8px", fontWeight: 900, textTransform: "uppercase", fontSize: 12, textAlign: "right" }}>Ціна</th>
              <th style={{ padding: "12px 8px", fontWeight: 900, textTransform: "uppercase", fontSize: 12, textAlign: "center" }}>Дія</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1.5px solid var(--ink)", cursor: "pointer" }} onClick={() => go("product")}>
                <td style={{ padding: "14px 8px" }}>
                  <div style={{ fontWeight: 800 }}>{p.name}</div>
                  <div style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{p.brand}</div>
                </td>
                <td style={{ padding: "14px 8px" }}>{p.art}</td>
                <td style={{ padding: "14px 8px" }}>
                  <span style={{ fontWeight: 700, color: p.stock === 'in' ? 'var(--ok)' : 'var(--warn)' }}>
                    {p.stock === 'in' ? '✓ На складі' : '● Замовлення'}
                  </span>
                </td>
                <td style={{ padding: "14px 8px", textAlign: "right" }}>
                  <PriceBlock price={p.price} old={p.old} size={15.5} />
                </td>
                <td style={{ padding: "14px 8px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                  <button className="btn btn-primary btn-sm" style={{ padding: "0 10px", height: 28 }} onClick={() => onAdd && onAdd()}>Додати</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflowX: "auto", background: "var(--paper)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, textAlign: "left" }}>
        <thead>
          <tr style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--line)" }}>
            <th style={{ padding: "12px 16px", fontWeight: 700 }}>Товар / Виробник</th>
            <th style={{ padding: "12px 16px", fontWeight: 700 }}>Артикул</th>
            <th style={{ padding: "12px 16px", fontWeight: 700 }} className="hide-sm">Параметри</th>
            <th style={{ padding: "12px 16px", fontWeight: 700 }}>Наявність</th>
            <th style={{ padding: "12px 16px", fontWeight: 700, textAlign: "right" }}>Ціна</th>
            <th style={{ padding: "12px 16px", fontWeight: 700, textAlign: "center" }}>Дія</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--line)", background: i % 2 === 0 ? "var(--paper)" : "var(--bg-2)", cursor: "pointer" }} onClick={() => go("product")} className="lift-row">
              <td style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>{p.brand}</div>
              </td>
              <td style={{ padding: "14px 16px" }} className="u-mono">{p.art}</td>
              <td style={{ padding: "14px 16px" }} className="hide-sm">
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.chips.map((c, idx) => (
                    <span key={idx} className="chip" style={{ fontSize: 9.5, padding: "2px 5px", background: "var(--bg)" }}>{c}</span>
                  ))}
                </div>
              </td>
              <td style={{ padding: "14px 16px" }}><Stock kind={p.stock} /></td>
              <td style={{ padding: "14px 16px", textAlign: "right" }}>
                <PriceBlock price={p.price} old={p.old} size={15.5} />
              </td>
              <td style={{ padding: "14px 16px", textAlign: "center", display: "flex", gap: 6, justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-primary btn-sm" style={{ padding: "0 10px", height: 30 }} onClick={() => onAdd && onAdd()}>+ Купити</button>
                <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 30, height: 30 }} onClick={() => onQuickView && onQuickView(p)} title="Швидкий перегляд">{I.search}</button>
                <button className="btn btn-ghost btn-sm btn-icon" style={{ width: 30, height: 30 }} onClick={(e) => e.stopPropagation()}>{I.heart}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QuickViewModal({ p, onClose, onAdd }) {
  if (!p) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрити">✕</button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24, padding: "24px 16px" }} className="product-layout">
          {/* Left: Product Glyph representation */}
          <div style={{ background: "var(--bg)", borderRadius: "var(--r-md)", padding: 24, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280, border: "1px solid var(--line)" }}>
            {p.img
              ? <img src={p.img} alt={p.name} style={{ maxHeight: 260, maxWidth: "100%", objectFit: "contain" }} />
              : <ProductGlyph type={p.glyph} size={200} />}
          </div>
          {/* Right: details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="badge badge-hit">{p.brand}</span>
                <span className="u-mono" style={{ fontSize: 12, color: "var(--muted)" }}>арт. {p.art}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.25, color: "var(--ink)" }}>{p.name}</h3>
            </div>

            <Stars n={p.rating} reviews={p.reviews} />

            <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "14px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <PriceBlock price={p.price} old={p.old} size={26} />
                <Stock kind={p.stock} />
              </div>
              <button className="btn btn-primary btn-block" style={{ height: 48 }} onClick={() => { onAdd && onAdd(); onClose(); }}>
                {I.cart} Додати у кошик
              </button>
            </div>

            <div>
              <div className="u-label" style={{ marginBottom: 8 }}>Характеристики:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {Object.entries(p.specs || {}).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, borderBottom: "1px dashed var(--line)", paddingBottom: 6 }}>
                    <span style={{ color: "var(--muted)" }}>{k}</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
