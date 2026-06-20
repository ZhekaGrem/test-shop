import React from 'react';
import { Money, Stock, Stars, SectionHead, ProductGlyph } from './Common';

function Row({ label, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, alignItems: "center", padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="u-label">{label}</div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

export function PrimitivesReference() {
  return (
    <div className="wrap" style={{ padding: "48px 28px", maxWidth: 1320, margin: "0 auto" }}>
      <div className="u-label" style={{ marginBottom: 10 }}>Style reference</div>
      <h1 style={{ fontSize: 44, letterSpacing: "-.03em", marginBottom: 8 }}>
        Палітра примітивів kv-electro
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 32, maxWidth: 560 }}>
        Усі дозволені примітиви під живими токенами. Крути палітру, шрифт,
        тему й accent-пресет у панелі — усе тут оновлюється разом.
      </p>

      <Row label="Buttons">
        <button className="btn btn-primary">Купити</button>
        <button className="btn btn-accent">Каталог</button>
        <button className="btn btn-ghost btn-sm">Детальніше</button>
      </Row>

      <Row label="Eyebrow / label">
        <span className="u-label">Модульне обладнання</span>
      </Row>

      <Row label="Price (Money)">
        <Money value={1290} size={20} />
        <Money value={1490} size={15} strike />
      </Row>

      <Row label="Stock / Stars">
        <Stock kind="in" />
        <Stock kind="order" />
        <Stars n={4} reviews={128} />
      </Row>

      <Row label="SKU (mono)">
        <span className="u-mono">A9F74340</span>
      </Row>

      <Row label="Card">
        <div className="card" style={{ padding: 18, width: 220 }}>
          <ProductGlyph type="breaker" size={72} />
          <h3 style={{ fontSize: 16, margin: "10px 0 4px" }}>Автомат ABB SH201</h3>
          <span className="u-mono" style={{ color: "var(--muted)", fontSize: 12 }}>SH201-C16</span>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Money value={189} size={18} />
            <button className="btn btn-primary btn-sm">+ Кошик</button>
          </div>
        </div>
      </Row>

      <Row label="Hero band">
        <div style={{ background: "var(--ink-surface)", color: "var(--paper)", padding: 32, borderRadius: "var(--r-lg)", width: "100%" }}>
          <span className="u-label" style={{ color: "var(--accent)" }}>Life Is On</span>
          <h2 style={{ fontSize: 32, margin: "8px 0 14px", letterSpacing: "-.02em" }}>
            Електрообладнання Schneider з наявності
          </h2>
          <button className="btn btn-primary">Перейти в каталог</button>
        </div>
      </Row>

      <Row label="TechLine">
        <div style={{ height: 1, width: "100%", background: "var(--line)" }} />
      </Row>

      <Row label="Section head">
        <div style={{ width: "100%" }}>
          <SectionHead kicker="Підбірка" title="Популярні автомати" action="Усі" onAction={() => {}} />
        </div>
      </Row>
    </div>
  );
}
