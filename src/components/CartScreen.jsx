import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Money, Stock, ProductGlyph, SectionHead, Crumbs } from './Common';
import { ProductCard } from './ProductCards';

function Stepper({ step = 0 }) {
  const steps = ["Кошик", "Дані та доставка", "Оплата", "Готово"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "var(--mono)", background: i <= step ? "var(--ink)" : "var(--paper)", color: i <= step ? "var(--on-dark)" : "var(--muted)", border: i <= step ? "none" : "1.5px solid var(--line-2)" }}>{i + 1}</span>
            <span style={{ fontSize: 14, fontWeight: i === step ? 700 : 500, color: i <= step ? "var(--ink)" : "var(--muted)" }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ width: 36, height: 1.5, background: "var(--line-2)", margin: "0 14px" }} className="hide-sm" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function CartRow({ item, qty, setQty, onRemove }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--line)", alignItems: "center" }} className="cart-row">
      <div style={{ width: 84, height: 84, background: "var(--bg)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <ProductGlyph type={item.glyph} size={66} />
      </div>
      <div style={{ flexGrow: 1, minWidth: 0 }} className="cart-details">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontWeight: 700, fontSize: 12 }}>{item.brand}</span>
          <span className="u-mono" style={{ fontSize: 10.5, color: "var(--faint)" }}>{item.art}</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{item.name}</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Stock kind={item.stock} />
          <a style={{ fontSize: 12.5, color: "var(--muted)", cursor: "pointer" }} className="crumb-link hide-sm">В обране</a>
          <a onClick={onRemove} style={{ fontSize: 12.5, color: "var(--muted)", cursor: "pointer" }} className="crumb-link">Прибрати</a>
        </div>
      </div>
      {/* Group qty & price to stack beautifully on mobile */}
      <div className="cart-actions-wrap" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* qty */}
        <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", height: 40, width: 116, flexShrink: 0 }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: "100%", border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "var(--muted)" }}>−</button>
          <span style={{ flexGrow: 1, textAlign: "center", fontWeight: 700 }} className="u-mono">{qty}</span>
          <button onClick={() => setQty(qty + 1)} style={{ width: 36, height: "100%", border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "var(--muted)" }}>+</button>
        </div>
        <div style={{ width: 130, textAlign: "right", flexShrink: 0 }} className="cart-row-price">
          <Money value={item.price * qty} size={19} />
          <div style={{ fontSize: 11.5, color: "var(--faint)", marginTop: 2 }} className="u-mono">{item.price.toLocaleString("uk-UA")} ₴ / шт</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .cart-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cart-details {
            margin-bottom: 4px;
          }
          .cart-actions-wrap {
            justify-content: space-between !important;
            width: 100%;
          }
          .cart-row-price {
            width: auto !important;
            text-align: right !important;
          }
        }
      `}</style>
    </div>
  );
}

function QuickOrderPad({ onAdd }) {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleQuickAdd = () => {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;

    let addedCount = 0;
    let unrecognized = [];

    lines.forEach(line => {
      const parts = line.split(/[\s,]+/);
      const sku = parts[0].toLowerCase();
      const qty = parseInt(parts[1] || "1", 10);

      const found = PRODUCTS.find(p => p.id.toLowerCase().includes(sku) || p.art.toLowerCase().includes(sku));
      if (found) {
        addedCount += qty;
        if (onAdd) onAdd();
      } else {
        unrecognized.push(parts[0]);
      }
    });

    if (addedCount > 0) {
      setFeedback({ type: "ok", msg: `Успішно додано ${addedCount} товарів у кошик!` });
      setText("");
    } else {
      setFeedback({ type: "error", msg: `Не знайдено товари за кодами: ${unrecognized.join(", ")}` });
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="card" style={{ padding: 22, marginTop: 24 }}>
      <h3 style={{ fontSize: 16, marginBottom: 6, fontWeight: 700 }}>Швидке замовлення за артикулом</h3>
      <p style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 12 }}>
        Введіть артикул (наприклад: <code style={{ background: "var(--bg-2)", padding: "2px 4px", borderRadius: 3, fontFamily: "var(--mono)", fontSize: 11.5 }}>SH201-C16</code> or <code style={{ background: "var(--bg-2)", padding: "2px 4px", borderRadius: 3, fontFamily: "var(--mono)", fontSize: 11.5 }}>MDR-60</code>) та кількість через пробіл. Кожен товар з нового рядка.
      </p>
      <textarea
        className="twk-field"
        style={{ width: "100%", height: 90, fontFamily: "var(--mono)", fontSize: 13, padding: 10, resize: "vertical", background: "var(--paper)", color: "var(--ink)", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", outline: "none" }}
        placeholder="Код Кількість&#10;SH201-C16 10&#10;MDR-60-24 5"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {feedback && (
        <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: "var(--r-sm)", fontSize: 13, background: feedback.type === "ok" ? "var(--ok-soft)" : "#fee2e2", color: feedback.type === "ok" ? "var(--ok)" : "#991b1b" }}>
          {feedback.msg}
        </div>
      )}
      <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={handleQuickAdd}>
        Додати в кошик
      </button>
    </div>
  );
}

export function CartScreen({ go, cart, setCart, onAdd, onQuickView, theme }) {
  const CART_ITEMS = [
    { ...PRODUCTS[0], qty: 4 },
    { ...PRODUCTS[1], qty: 1 },
    { ...PRODUCTS[2], qty: 2 },
  ];

  const [qtys, setQtys] = useState(CART_ITEMS.map(i => i.qty));
  const items = CART_ITEMS.map((it, i) => ({ ...it, q: qtys[i] }));
  const subtotal = items.reduce((s, it) => s + it.price * it.q, 0);
  const discount = Math.round(subtotal * 0.06);
  const delivery = 60;
  const total = subtotal - discount + delivery;
  const totalQty = qtys.reduce((a, b) => a + b, 0);

  function setQ(i, v) { 
    const newQtys = qtys.map((q, k) => k === i ? v : q);
    setQtys(newQtys);
    const newTotal = newQtys.reduce((a, b) => a + b, 0);
    setCart(newTotal);
  }

  return (
    <div className="reveal">
      <div className="wrap" style={{ paddingTop: 18 }}>
        <Crumbs items={[["Головна", "home"], "Кошик"]} go={go} />
      </div>
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 16 }}>
        <Stepper step={0} />
      </div>

      <div className="wrap" style={{ paddingBottom: 64 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 28, alignItems: "start" }} className="cart-layout">
          {/* items */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <h1 style={{ fontSize: 26 }}>Кошик <span style={{ color: "var(--muted)", fontWeight: 500, fontSize: 18 }}>· {totalQty} товари</span></h1>
              <a style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer" }} className="crumb-link">Очистити</a>
            </div>
            <div className="card" style={{ padding: "4px 22px 18px", marginTop: 14 }}>
              {items.map((it, i) => (
                <CartRow key={i} item={it} qty={qtys[i]} setQty={(v) => setQ(i, v)} onRemove={() => {}} />
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => go("category")}>← Продовжити покупки</button>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ height: 38, border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "var(--muted)", fontFamily: "var(--mono)" }}>Промокод</div>
                  <button className="btn btn-soft btn-sm">Застосувати</button>
                </div>
              </div>
            </div>

            {/* Quick Order Pad */}
            <QuickOrderPad onAdd={onAdd} />

            {/* upsell */}
            <div style={{ marginTop: 28 }}>
              <SectionHead kicker="Часто беруть разом" title="Доповніть замовлення" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="prod-grid">
                {PRODUCTS.slice(4, 8).map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />)}
              </div>
            </div>
          </div>

          {/* summary */}
          <div style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 14 }} className="summary-box">
            <div className="card" style={{ padding: 22 }}>
              <h2 style={{ fontSize: 18, marginBottom: 16 }}>Разом</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted)" }}>Товари ({totalQty} шт)</span><span className="u-mono u-tnum">{subtotal.toLocaleString("uk-UA")} ₴</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted)" }}>Знижка</span><span className="u-mono u-tnum" style={{ color: "var(--ok)" }}>−{discount.toLocaleString("uk-UA")} ₴</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}><span style={{ color: "var(--muted)" }}>Доставка</span><span className="u-mono u-tnum">{delivery} ₴</span></div>
              </div>
              <div style={{ height: 1, background: "var(--line)", margin: "16px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>До сплати</span>
                <Money value={total} size={28} />
              </div>
              <div style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-soft)", borderRadius: "var(--r-sm)", padding: "9px 12px", fontSize: 12.5, color: "var(--accent-ink)", marginBottom: 14 }}>
                Або частинами: <b>{Math.round(total / 4).toLocaleString("uk-UA")} ₴ × 4</b> без переплат
              </div>
              <button className="btn btn-accent btn-lg btn-block" onClick={() => go("cart")}>Оформити замовлення →</button>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 12, color: "var(--muted)" }}>
                <span style={{ color: "var(--ok)" }}>✓</span> Безпечна оплата · повернення 14 днів
              </div>
            </div>
            <div className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, background: "var(--bg)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", flexShrink: 0, fontWeight: 800, color: "var(--accent)" }}>%</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>Гуртовим клієнтам — додаткова знижка та відстрочка. <a onClick={() => go("home")} style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}>Дізнатись →</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
