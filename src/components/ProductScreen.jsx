import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { I } from './Icons';
import { Money, Stars, Stock, ProductGlyph, SectionHead, Crumbs } from './Common';
import { ProductCard, PriceBlock, FavBtn } from './ProductCards';

function Gallery({ p }) {
  const [active, setActive] = useState(0);
  const thumbs = [p.glyph, "terminal", "meter", p.glyph];
  return (
    <div style={{ display: "flex", gap: 14 }} className="gallery">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="gallery-thumbs">
        {thumbs.map((g, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: 70, height: 70, background: "var(--paper)", border: "1.5px solid " + (i === active ? "var(--ink)" : "var(--line)"), borderRadius: "var(--r-sm)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
            <ProductGlyph type={g} size={48} />
          </button>
        ))}
      </div>
      <div className="card" style={{ flexGrow: 1, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", maxWidth: 460 }}>
        {p.badge === "sale" && <span className="badge badge-sale" style={{ position: "absolute", top: 16, left: 16 }}>Акція −{Math.round((1 - p.price / p.old) * 100)}%</span>}
        <div style={{ position: "absolute", top: 16, right: 16 }}><FavBtn /></div>
        <ProductGlyph type={p.glyph} size={260} />
        <div style={{ position: "absolute", bottom: 14, left: 16 }} className="u-label">3D / фото товару</div>
      </div>
    </div>
  );
}

function SpecTable({ specs, full }) {
  const entries = Object.entries(specs);
  const more = full ? [["Стандарт", "IEC/EN 60898-1"], ["Монтаж", "DIN-рейка 35 мм"], ["Переріз кабелю", "до 25 мм²"], ["Температура", "−25…+55 °C"], ["Гарантія", "24 місяці"], ["Країна", "Італія"]] : [];
  const all = [...entries, ...more];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {all.map(([k, v], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "11px 0", borderBottom: i < all.length - 1 ? "1px solid var(--line)" : "none" }}>
          <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{k}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, textAlign: "right" }} className="u-tnum">{v}</span>
        </div>
      ))}
    </div>
  );
}

function QtyStepper() {
  const [q, setQ] = useState(1);
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--line-2)", borderRadius: "var(--r-sm)", height: 50, width: 130, flexShrink: 0 }}>
      <button onClick={() => setQ(Math.max(1, q - 1))} style={{ width: 42, height: "100%", border: "none", background: "transparent", cursor: "pointer", fontSize: 20, color: "var(--muted)" }}>−</button>
      <span style={{ flexGrow: 1, textAlign: "center", fontWeight: 700, fontSize: 16 }} className="u-mono">{q}</span>
      <button onClick={() => setQ(q + 1)} style={{ width: 42, height: "100%", border: "none", background: "transparent", cursor: "pointer", fontSize: 20, color: "var(--muted)" }}>+</button>
    </div>
  );
}

function ProductTabs({ p }) {
  const [tab, setTab] = useState(0);
  const tabs = ["Опис", "Характеристики", "Відгуки (" + p.reviews + ")", "Доставка"];
  return (
    <div style={{ marginTop: 44 }}>
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginBottom: 24, overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{ appearance: "none", background: "transparent", border: "none", borderBottom: "2px solid " + (i === tab ? "var(--ink)" : "transparent"), color: i === tab ? "var(--ink)" : "var(--muted)", fontWeight: i === tab ? 700 : 500, fontSize: 15, padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap", marginBottom: -1, fontFamily: "var(--sans)" }}>{t}</button>
        ))}
      </div>
      {tab === 0 && (
        <div style={{ maxWidth: 760, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.75 }}>
          <p style={{ marginTop: 0 }}>Модульний автоматичний вимикач {p.brand} {p.name.replace(/Автоматичний вимикач /, "")} серії {p.series} призначений для захисту електричних кіл від перевантажень і коротких замикань у житлових, комерційних та промислових установках.</p>
          <p>Характеристика спрацювання типу C розрахована на кола з помірними пусковими струмами — освітлення, розетки, двигуни малої потужності. Відклична здатність 6 кА відповідає вимогам більшості об'єктів.</p>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <li>Швидке кріплення на DIN-рейку 35 мм</li>
            <li>Чіткий індикатор положення контактів</li>
            <li>Можливість пломбування та встановлення додаткових контактів</li>
          </ul>
        </div>
      )}
      {tab === 1 && <div style={{ maxWidth: 540 }}><SpecTable specs={p.specs} full /></div>}
      {tab === 2 && (
        <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 16 }}>
          {[["Олександр М.", 5, "Беру для щитів постійно. Оригінал, спрацьовує чітко, маркування читабельне."], ["СМ Електромонтаж", 5, "Брали 200 шт на об'єкт — все робоче, відправили того ж дня."], ["Ігор Т.", 4, "Ціна нормальна. Хотілось би більше в наявності тип D."]].map(([n, r, txt], i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{n}</span>
                <Stars n={r} />
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{txt}</p>
            </div>
          ))}
        </div>
      )}
      {tab === 3 && (
        <div style={{ maxWidth: 720, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="delivery-grid">
          {[["Нова Пошта", "1–2 дні · від 60 ₴ · відділення або кур'єр"], ["Самовивіз", "Київ, вул. Промислова 12 · безкоштовно, сьогодні"], ["Оплата", "Картка, безготівковий з ПДВ, накладений платіж"], ["Гарантія", "24 місяці · обмін і повернення 14 днів"]].map(([t, d], i) => (
            <div key={i} className="card" style={{ padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 5 }}>{t}</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductScreen({ go, onAdd, onQuickView, theme }) {
  const p = PRODUCTS[0];
  const related = PRODUCTS.slice(1, 5);
  return (
    <div className="reveal">
      <div className="wrap" style={{ paddingTop: 18 }}>
        <Crumbs items={[["Головна", "home"], ["Модульне обладнання", "category"], ["Автоматичні вимикачі", "catalog"], p.name]} go={go} />
      </div>

      <div className="wrap" style={{ paddingTop: 24, paddingBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 36, alignItems: "start" }} className="product-layout">
          {/* left: gallery + title */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>{p.brand}</span>
              <span className="chip">{p.series}</span>
              <span className="u-mono" style={{ fontSize: 12, color: "var(--muted)" }}>арт. {p.art}</span>
            </div>
            <h1 style={{ fontSize: 28, lineHeight: 1.18, marginBottom: 12, maxWidth: 640 }}>{p.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <Stars n={p.rating} reviews={p.reviews + " відгуків"} />
              <span style={{ color: "var(--faint)" }}>·</span>
              <Stock kind={p.stock} />
            </div>
            <Gallery p={p} />
          </div>

          {/* right: buy box */}
          <div style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 16 }} className="buy-box">
            <div className="card" style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                <Money value={p.price} size={34} />
                {p.old && <Money value={p.old} size={18} strike c="var(--muted)" />}
              </div>
              {p.old && <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}><span className="badge badge-sale">Економія {(p.old - p.price).toLocaleString("uk-UA")} ₴</span></div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18, marginTop: p.old ? 0 : 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span style={{ color: "var(--muted)" }}>Гуртова ціна (від 50 шт)</span><b className="u-mono">{Math.round(p.price * .88).toLocaleString("uk-UA")} ₴</b></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span style={{ color: "var(--muted)" }}>Або частинами ×4</span><b className="u-mono">{Math.round(p.price / 4).toLocaleString("uk-UA")} ₴/міс</b></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <QtyStepper />
                <button className="btn btn-accent btn-lg" style={{ flexGrow: 1 }} onClick={onAdd}>{I.cart} У кошик</button>
              </div>
              <button className="btn btn-primary btn-lg btn-block" onClick={() => { onAdd(); go("cart"); }}>Купити в 1 клік</button>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-soft btn-sm" style={{ flexGrow: 1 }}>{I.compare} Порівняти</button>
                <button className="btn btn-soft btn-sm" style={{ flexGrow: 1 }}>{I.heart} В обране</button>
              </div>
            </div>
            <div className="card" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Відправка", "сьогодні, якщо замовити до 16:00"], ["Самовивіз", "Київ — безкоштовно"], ["Оплата", "картка / безготівковий з ПДВ"]].map(([t, d], i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13 }}>
                  <span style={{ color: "var(--accent)", marginTop: 1 }}>●</span>
                  <span><b>{t}.</b> <span style={{ color: "var(--muted)" }}>{d}</span></span>
                </div>
              ))}
            </div>
            {/* quick specs */}
            <div className="card" style={{ padding: "16px 18px" }}>
              <div className="u-label" style={{ marginBottom: 10 }}>Ключові параметри</div>
              <SpecTable specs={p.specs} />
            </div>
          </div>
        </div>

        <ProductTabs p={p} />

        {/* related */}
        <div style={{ marginTop: 56 }}>
          <SectionHead kicker="Схожі товари" title="З цієї ж категорії" action="Усі →" onAction={() => go("catalog")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="prod-grid">
            {related.map((p, i) => <ProductCard key={i} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
