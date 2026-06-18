// hifi-parts.jsx — shared hi-fi components, design tokens consumers, data
const { useState, useEffect, useRef } = React;

/* =========================================================================
   DATA
   ========================================================================= */
const CATEGORIES = [
  { key: "modular", name: "Модульне обладнання", count: 867, glyph: "breaker",
    subs: ["Автоматичні вимикачі", "Диференційні вимикачі", "ПЗВ", "Обмежувачі перенапруги", "Модульні контактори", "Аксесуари"] },
  { key: "drive", name: "Привідна техніка", count: 490, glyph: "drive",
    subs: ["Перетворювачі частоти", "Пристрої плавного пуску", "Дроселі", "Гальмівні резистори", "Синус-фільтри"] },
  { key: "motor", name: "Пуск та захист двигунів", count: 230, glyph: "contactor",
    subs: ["Автомати захисту двигунів", "Контактори", "Теплові реле", "Аксесуари"] },
  { key: "power", name: "Промислові автомати", count: 540, glyph: "power",
    subs: ["Силові у литому корпусі", "Повітряні IZMX", "Роз’єднувачі", "Аксесуари"] },
  { key: "relay", name: "Реле, таймери, БЖ", count: 126, glyph: "relay",
    subs: ["Реле контролю", "Реле часу", "Блоки живлення", "Трансформатори керування"] },
  { key: "control", name: "Керування та сигналізація", count: 527, glyph: "button",
    subs: ["Кнопки", "Перемикачі", "Сигнальні лампи", "Світлові колони", "Кулачкові перемикачі"] },
  { key: "automation", name: "Промислова автоматизація", count: 75, glyph: "plc",
    subs: ["Програмовані реле", "Промислові ПЛК", "Панелі оператора"] },
  { key: "cabinet", name: "Шафи та кліматизація", count: 402, glyph: "cabinet",
    subs: ["Системи шаф", "Компактні шафи", "Вентиляція", "Термостати"] },
  { key: "mount", name: "Комплектуючі для монтажу", count: 173, glyph: "terminal",
    subs: ["Клеми", "DIN-рейки", "Розподільчі блоки", "Наконечники", "Кабельні вводи"] },
  { key: "meter", name: "Аналізатори електроенергії", count: 57, glyph: "meter",
    subs: ["Аналізатори якості", "Вимірювальні прилади", "Панельні вимірювачі"] },
];

const BRANDS = ["ABB", "Schneider", "Eaton", "Hager", "ETI", "Danfoss", "Weidmüller", "Rittal", "Mean Well", "Legrand"];

const PRODUCTS = [
  { id: "abb-sh201-c16", brand: "ABB", art: "2CDS211001R0164", series: "System pro M", name: "Автоматичний вимикач SH201 C16", glyph: "breaker",
    specs: { "Номінальний струм": "16 А", "Тип розчіплювача": "C", "Полюси": "1P", "Відкл. здатність": "6 кА" },
    chips: ["16 А", "тип C", "1P", "6 кА"], price: 245, old: 289, rating: 5, reviews: 42, stock: "in", badge: "hit", cat: "modular" },
  { id: "schneider-easy9-25", brand: "Schneider", art: "EZ9R34225", series: "Easy9", name: "ПЗВ Easy9 25A 30мА тип AC", glyph: "rcd",
    specs: { "Номінальний струм": "25 А", "Струм витоку": "30 мА", "Тип": "AC", "Полюси": "2P" },
    chips: ["25 А", "30 мА", "тип AC", "2P"], price: 1180, old: null, rating: 4, reviews: 18, stock: "in", badge: null, cat: "modular" },
  { id: "abb-esb24-24", brand: "ABB", art: "GHE3211902R0006", series: "ESB", name: "Контактор модульний ESB24 24A 2НВ", glyph: "contactor",
    specs: { "Номінальний струм": "24 А", "Контакти": "2 НВ", "Котушка": "230 В AC", "Полюси": "2P" },
    chips: ["24 А", "2 НВ", "230 В", "2P"], price: 1420, old: 1590, rating: 5, reviews: 9, stock: "in", badge: "sale", cat: "motor" },
  { id: "danfoss-fc51-037", brand: "Danfoss", art: "132F0002", series: "VLT Micro FC-51", name: "Перетворювач частоти VLT Micro Drive 0.37кВт", glyph: "drive",
    specs: { "Потужність": "0.37 кВт", "Фази вх/вих": "1Ф / 3Ф", "Напруга": "200–240 В", "Серія": "FC-51" },
    chips: ["0.37 кВт", "1Ф/3Ф", "230 В"], price: 13734, old: 24971, rating: 5, reviews: 1, stock: "order", badge: "sale", cat: "drive" },
  { id: "eaton-pkzm0-16", brand: "Eaton", art: "046938", series: "PKZM0", name: "Автомат захисту двигуна PKZM0-16 10–16A", glyph: "contactor",
    specs: { "Діапазон": "10–16 А", "Тип": "Двигуновий", "Полюси": "3P", "Кат. застосування": "AC-3" },
    chips: ["10–16 А", "3P", "AC-3"], price: 2390, old: null, rating: 4, reviews: 6, stock: "in", badge: null, cat: "motor" },
  { id: "hager-vd112j", brand: "Hager", art: "VD112J", series: "Volta", name: "Щит навісний Volta 12 модулів IP30", glyph: "cabinet",
    specs: { "Модулів": "12", "Степінь захисту": "IP30", "Монтаж": "Навісний", "Колір": "RAL 9010" },
    chips: ["12 мод.", "IP30", "навісний"], price: 1875, old: null, rating: 5, reviews: 14, stock: "in", badge: "new", cat: "cabinet" },
  { id: "eti-etimat6-b10", brand: "ETI", art: "002111511", series: "ETIMAT 6", name: "Автоматичний вимикач ETIMAT6 B10", glyph: "breaker",
    specs: { "Номінальний струм": "10 А", "Тип": "B", "Полюси": "1P", "Відкл. здатність": "6 кА" },
    chips: ["10 А", "тип B", "1P", "6 кА"], price: 132, old: null, rating: 4, reviews: 27, stock: "in", badge: null, cat: "modular" },
  { id: "meanwell-mdr60", brand: "Mean Well", art: "MDR-60-24", series: "MDR", name: "Блок живлення MDR-60-24 24В 2.5A DIN", glyph: "relay",
    specs: { "Вихід": "24 В / 2.5 А", "Потужність": "60 Вт", "Монтаж": "DIN-рейка", "ККД": "87%" },
    chips: ["24 В", "60 Вт", "DIN"], price: 845, old: 980, rating: 5, reviews: 11, stock: "in", badge: "sale", cat: "relay" },
];

/* =========================================================================
   PRODUCT GLYPHS — flat geometric module illustrations (ink + accent)
   ========================================================================= */
function ProductGlyph({ type = "breaker", size = 88, tone = "ink" }) {
  const stroke = "var(--ink)";
  const acc = "var(--accent)";
  const fill = "#fff";
  const sw = 2;
  const common = { fill, stroke, strokeWidth: sw, strokeLinejoin: "round" };
  let body;
  switch (type) {
    case "breaker": // single DIN module with lever
      body = (<g>
        <rect x="34" y="14" width="32" height="72" rx="3" {...common} />
        <rect x="34" y="30" width="32" height="6" fill={stroke} stroke="none" opacity=".12" />
        <rect x="34" y="64" width="32" height="6" fill={stroke} stroke="none" opacity=".12" />
        <rect x="44" y="40" width="12" height="20" rx="2" fill={acc} stroke="none" />
        <line x1="50" y1="14" x2="50" y2="6" stroke={stroke} strokeWidth={sw} />
        <line x1="50" y1="86" x2="50" y2="94" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "rcd": // wider differential, test button
      body = (<g>
        <rect x="22" y="16" width="56" height="68" rx="3" {...common} />
        <rect x="44" y="26" width="12" height="22" rx="2" fill={acc} stroke="none" />
        <circle cx="34" cy="68" r="5" {...common} />
        <rect x="56" y="63" width="14" height="10" rx="2" fill={stroke} stroke="none" opacity=".7" />
        <line x1="30" y1="16" x2="30" y2="8" stroke={stroke} strokeWidth={sw} />
        <line x1="70" y1="16" x2="70" y2="8" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "contactor": // boxy contactor
      body = (<g>
        <rect x="24" y="20" width="52" height="60" rx="4" {...common} />
        <rect x="24" y="20" width="52" height="14" rx="4" fill={stroke} stroke="none" opacity=".08" />
        <rect x="33" y="42" width="34" height="22" rx="2" fill={acc} stroke="none" opacity=".9" />
        <line x1="34" y1="20" x2="34" y2="10" stroke={stroke} strokeWidth={sw} />
        <line x1="50" y1="20" x2="50" y2="10" stroke={stroke} strokeWidth={sw} />
        <line x1="66" y1="20" x2="66" y2="10" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "drive": // frequency drive with display
      body = (<g>
        <rect x="26" y="14" width="48" height="72" rx="5" {...common} />
        <rect x="34" y="22" width="32" height="18" rx="2" fill={acc} stroke="none" />
        <circle cx="42" cy="58" r="6" {...common} />
        <circle cx="58" cy="58" r="6" {...common} />
        <rect x="36" y="72" width="28" height="5" rx="2" fill={stroke} stroke="none" opacity=".3" />
      </g>); break;
    case "power": // moulded case breaker
      body = (<g>
        <rect x="24" y="12" width="52" height="76" rx="4" {...common} />
        <rect x="38" y="34" width="24" height="32" rx="3" fill={acc} stroke="none" />
        <line x1="50" y1="34" x2="50" y2="66" stroke="#fff" strokeWidth="2.5" />
        <line x1="34" y1="12" x2="34" y2="4" stroke={stroke} strokeWidth={sw} />
        <line x1="66" y1="12" x2="66" y2="4" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "relay": // small box / PSU
      body = (<g>
        <rect x="28" y="30" width="44" height="40" rx="3" {...common} />
        <rect x="28" y="30" width="44" height="10" fill={stroke} stroke="none" opacity=".08" />
        <circle cx="62" cy="60" r="4" fill={acc} stroke="none" />
        <line x1="36" y1="30" x2="36" y2="22" stroke={stroke} strokeWidth={sw} />
        <line x1="50" y1="30" x2="50" y2="22" stroke={stroke} strokeWidth={sw} />
        <line x1="64" y1="30" x2="64" y2="22" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "button": // pushbutton / pilot
      body = (<g>
        <circle cx="50" cy="50" r="30" {...common} />
        <circle cx="50" cy="50" r="16" fill={acc} stroke="none" />
        <circle cx="50" cy="50" r="16" fill="none" stroke={stroke} strokeWidth={sw} />
      </g>); break;
    case "plc": // controller with terminals
      body = (<g>
        <rect x="20" y="26" width="60" height="48" rx="4" {...common} />
        <rect x="28" y="34" width="22" height="16" rx="2" fill={acc} stroke="none" />
        {[0,1,2,3,4].map(i => <rect key={i} x={28 + i*9} y="58" width="5" height="8" rx="1" fill={stroke} stroke="none" opacity=".55" />)}
      </g>); break;
    case "cabinet": // enclosure
      body = (<g>
        <rect x="26" y="12" width="48" height="76" rx="4" {...common} />
        <line x1="62" y1="12" x2="62" y2="88" stroke={stroke} strokeWidth="1.5" opacity=".4" />
        <circle cx="58" cy="50" r="2.5" fill={acc} stroke="none" />
        <rect x="33" y="22" width="22" height="4" rx="2" fill={stroke} stroke="none" opacity=".2" />
        <rect x="33" y="30" width="22" height="4" rx="2" fill={stroke} stroke="none" opacity=".2" />
      </g>); break;
    case "terminal": // terminal block
      body = (<g>
        {[0,1,2].map(i => <rect key={i} x={28 + i*16} y="30" width="13" height="40" rx="2" {...common} />)}
        {[0,1,2].map(i => <circle key={i} cx={34.5 + i*16} cy="42" r="3.5" fill={acc} stroke="none" />)}
      </g>); break;
    case "meter": // panel meter
      body = (<g>
        <rect x="24" y="24" width="52" height="52" rx="4" {...common} />
        <rect x="32" y="32" width="36" height="20" rx="2" fill={acc} stroke="none" />
        <rect x="34" y="58" width="14" height="5" rx="2" fill={stroke} stroke="none" opacity=".3" />
        <circle cx="64" cy="61" r="3" {...common} />
      </g>); break;
    default:
      body = <rect x="30" y="20" width="40" height="60" rx="4" {...common} />;
  }
  return (
    <svg className="glyph" width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {body}
    </svg>
  );
}

/* =========================================================================
   SMALL PRIMITIVES
   ========================================================================= */
function Money({ value, size = 18, bold = true, strike = false, c }) {
  const txt = value.toLocaleString("uk-UA");
  return (
    <span className="u-mono u-tnum" style={{ fontSize: size, fontWeight: bold ? 700 : 500, color: c || "var(--ink)", textDecoration: strike ? "line-through" : "none", whiteSpace: "nowrap", letterSpacing: "-.01em" }}>
      {txt}&nbsp;<span style={{ fontSize: size * .68, fontWeight: 500 }}>₴</span>
    </span>
  );
}

function Stars({ n = 5, reviews }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span aria-hidden="true" style={{ letterSpacing: "1px", fontSize: 13, color: "var(--accent)" }}>
        {"★".repeat(n)}<span style={{ color: "var(--line-2)" }}>{"★".repeat(5 - n)}</span>
      </span>
      {reviews != null && <span style={{ fontSize: 12, color: "var(--muted)" }}>{reviews}</span>}
    </span>
  );
}

function Stock({ kind }) {
  return kind === "in"
    ? <span className="stock">На складі</span>
    : <span className="stock order">Під замовлення</span>;
}

function SectionHead({ kicker, title, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 22 }}>
      <div>
        {kicker && <div className="u-label" style={{ marginBottom: 9 }}>{kicker}</div>}
        <h2 style={{ fontSize: 27 }}>{title}</h2>
      </div>
      {action && <button className="btn btn-ghost btn-sm" onClick={onAction}>{action}</button>}
    </div>
  );
}

function Crumbs({ items, go }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 13 }}>
      {items.map((it, k) => {
        const last = k === items.length - 1;
        const [label, target] = Array.isArray(it) ? it : [it, null];
        return (
          <React.Fragment key={k}>
            {target && !last
              ? <a onClick={() => go(target)} style={{ color: "var(--muted)", cursor: "pointer" }} className="crumb-link">{label}</a>
              : <span style={{ color: last ? "var(--ink)" : "var(--muted)", fontWeight: last ? 600 : 400 }}>{label}</span>}
            {!last && <span style={{ color: "var(--faint)" }}>/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

Object.assign(window, { CATEGORIES, BRANDS, PRODUCTS, ProductGlyph, Money, Stars, Stock, SectionHead, Crumbs });
