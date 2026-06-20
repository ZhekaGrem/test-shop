import { useState } from 'react';
import { CATEGORIES, BRANDS, PRODUCTS } from '../data/products';
import { ProductGlyph, SectionHead } from './Common';
import { ProductCard } from './ProductCards';

// --- HYBRID THEME SUB-COMPONENTS ---

// 1. Dynamic Load & Bill-of-Materials Calculator
function LoadCalculatorHybrid({ onAdd }) {
  const [phases, setPhases] = useState(3); // 1 or 3
  const [power, setPower] = useState(15);  // kW
  const [shieldType, setShieldType] = useState("plastic"); // plastic or metal
  const [relays, setRelays] = useState(true);
  const [surge, setSurge] = useState(false);
  const [added, setAdded] = useState(false);

  // Recommendations logic
  let mainBreaker = "";
  let cableSize = "";
  let modulesNeeded = 12;
  let price = 3200;

  if (phases === 1) {
    if (power <= 5) {
      mainBreaker = "ABB S202 C25 (25A, 2-полюсний)";
      cableSize = "3х4 мм² Cu (мідь)";
      modulesNeeded = 8;
      price = 1850;
    } else if (power <= 12) {
      mainBreaker = "ABB S202 C50 (50A, 2-полюсний)";
      cableSize = "3х10 мм² Cu (мідь)";
      modulesNeeded = 12;
      price = 2900;
    } else {
      mainBreaker = "ABB S202 C63 (63A, 2-полюсний)";
      cableSize = "3х16 мм² Cu (мідь)";
      modulesNeeded = 16;
      price = 3750;
    }
  } else {
    // 3 phases
    if (power <= 11) {
      mainBreaker = "ABB S203 C20 (20A, 3-полюсний)";
      cableSize = "5х2.5 мм² Cu (мідь)";
      modulesNeeded = 18;
      price = 4300;
    } else if (power <= 22) {
      mainBreaker = "ABB S203 C40 (40A, 3-полюсний)";
      cableSize = "5х6 мм² Cu (мідь)";
      modulesNeeded = 24;
      price = 6200;
    } else {
      mainBreaker = "ABB S203 C63 (63A, 3-полюсний)";
      cableSize = "5х16 мм² Cu (мідь)";
      modulesNeeded = 36;
      price = 9400;
    }
  }

  // Adjustments for options
  if (relays) {
    modulesNeeded += phases === 1 ? 2 : 6;
    price += phases === 1 ? 1250 : 3750; // ZUBR voltage monitors
  }
  if (surge) {
    modulesNeeded += phases === 1 ? 2 : 4;
    price += phases === 1 ? 2100 : 4900; // SPD
  }
  if (shieldType === "metal") {
    price += 1400;
  }

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <SectionHead kicker="Розрахунковий модуль" title="Інженерний калькулятор навантаження та специфікацій" />
      <div className="card" style={{ padding: 28, background: "var(--paper)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32 }} className="hero-grid">
          {/* Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>Кількість вводів живлення / Фазність</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "Однофазне введення (230 В)", val: 1 },
                  { label: "Трифазне введення (400 В)", val: 3 }
                ].map(opt => (
                  <button 
                    key={opt.val}
                    className="btn"
                    onClick={() => { setPhases(opt.val); if (opt.val === 1 && power > 20) setPower(15); }}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      height: "auto",
                      minHeight: 48,
                      padding: "10px 12px",
                      whiteSpace: "normal",
                      lineHeight: 1.25,
                      textAlign: "center",
                      background: phases === opt.val ? "var(--accent-tint)" : "var(--bg)",
                      color: phases === opt.val ? "var(--accent)" : "var(--ink)",
                      border: phases === opt.val ? "2px solid var(--accent)" : "1px solid var(--line-2)",
                      fontWeight: 700
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700 }}>Розрахункова потужність навантаження</label>
                <span className="u-mono" style={{ fontWeight: 800, color: "var(--accent)" }}>{power} кВт</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max={phases === 1 ? 25 : 45} 
                step="1"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
                className="tech-slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                <span>3 кВт</span>
                <span>{phases === 1 ? "25 кВт (Макс для 1Ф)" : "45 кВт"}</span>
              </div>
            </div>

            <div className="calc-selects" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Матеріал корпусу щита</label>
                <select 
                  value={shieldType} 
                  onChange={(e) => setShieldType(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)", background: "var(--bg)", fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 600 }}
                >
                  <option value="plastic">Пластик ABS (IP40)</option>
                  <option value="metal">Метал IP65 (Антивандальний)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Запас за габаритами</label>
                <select 
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--r-sm)", border: "1px solid var(--line-2)", background: "var(--bg)", fontFamily: "var(--sans)", fontSize: 13.5 }}
                  disabled
                >
                  <option>Стандартний (+20% резерв DIN)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>Додаткові системи безпеки</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5 }}>
                  <input type="checkbox" checked={relays} onChange={(e) => setRelays(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
                  <div>
                    <strong>Реле контролю напруги ZUBR</strong> 
                    <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>Захист побутової техніки від стрибків та обриву нуля.</span>
                  </div>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5 }}>
                  <input type="checkbox" checked={surge} onChange={(e) => setSurge(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
                  <div>
                    <strong>Обмежувач перенапруг (ПЗІП клас T2)</strong> 
                    <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>Захист напівпровідникової електроніки від імпульсів грозових розрядів.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Output Specifications */}
          <div style={{ background: "var(--bg)", borderRadius: "var(--r-md)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid var(--line-2)" }}>
            <div>
              <span className="u-label" style={{ color: "var(--accent)" }}>Рекомендована специфікація</span>
              <h3 style={{ fontSize: 20, marginTop: 8, marginBottom: 16 }}>Специфікація щита введення {power} кВт</h3>

              <div className="calc-spec" style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--line-2)", paddingBottom: 8 }}>
                  <span style={{ color: "var(--muted)" }}>Ввідний автомат:</span>
                  <strong style={{ textAlign: "right" }}>{mainBreaker}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--line-2)", paddingBottom: 8 }}>
                  <span style={{ color: "var(--muted)" }}>Живильний кабель:</span>
                  <strong>{cableSize}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--line-2)", paddingBottom: 8 }}>
                  <span style={{ color: "var(--muted)" }}>Потрібно DIN-модулів:</span>
                  <strong className="u-mono">{modulesNeeded} мод.</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--line-2)", paddingBottom: 8 }}>
                  <span style={{ color: "var(--muted)" }}>Супутні компоненти:</span>
                  <span style={{ fontWeight: 600, fontSize: 12.5, textAlign: "right" }}>
                    Гребінчаста шина, клеми, обв'язка
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8 }}>
                  <span style={{ color: "var(--muted)" }}>Матеріал корпусу:</span>
                  <strong style={{ textTransform: "capitalize" }}>{shieldType === 'plastic' ? 'Пластик ABS' : 'Метал IP65'}</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "2px solid var(--line-2)", paddingTop: 18, marginTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>ОРІЄНТОВНА ВАРТІСТЬ:</span>
                <span className="u-mono" style={{ fontSize: 24, fontWeight: 800, color: "var(--accent)" }}>{price.toLocaleString()} ₴</span>
              </div>
              <button
                className="btn btn-accent btn-block btn-lg"
                onClick={handleAdd}
                disabled={added}
                style={{ height: "auto", minHeight: 50, padding: "12px 16px", whiteSpace: "normal", lineHeight: 1.25 }}
              >
                {added ? "✓ РОЗРАХУНОК ДОДАНО" : "ДОДАТИ КОМПЛЕКТ У КОШИК"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* spec-рядки не виходять за межі: значення переносяться, мітка не стискається */
        .calc-spec > div > span:first-child { flex-shrink: 0; }
        .calc-spec > div > strong,
        .calc-spec > div > span:last-child { min-width: 0; overflow-wrap: anywhere; }
        @media (max-width: 560px) {
          .calc-selects { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// 2. Document Center with Single-Line SVG Schematic Viewer
function EngineeringDocsHybrid() {
  const [activeSchema, setActiveSchema] = useState(null);

  const documents = [
    { title: "Однолінійна схема квартирного щита (стандартна)", code: "EL-SCH-01", format: "PDF / DWG", size: "1.4 MB" },
    { title: "Схема АВР на два введення з пріоритетом першого", code: "EL-SCH-ATS-3P", format: "PDF / DXF", size: "2.8 MB" },
    { title: "Схема підключення частотного приводу Danfoss FC-51", code: "EL-SCH-DRV-01", format: "PDF", size: "950 KB" },
    { title: "Паспорт випробування комплектного електрощита", code: "EL-CERT-2026", format: "PDF", size: "3.2 MB" },
  ];

  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <SectionHead kicker="Бібліотека рішень" title="Центр інженерної документації та CAD-схем" />
      <div className="card" style={{ background: "var(--paper)", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: 0 }}>
            Завантажуйте готові типові схеми в лінійному та детальному виконанні для інтеграції у свої проекти. Всі файли розроблено сертифікованими інженерами kv-electro.
          </p>
        </div>
        <div>
          {documents.map((doc, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "16px 24px", 
                borderBottom: idx === documents.length - 1 ? "none" : "1px solid var(--line)",
                flexWrap: "wrap",
                gap: 16
              }}
              className="lift-row"
            >
              <div>
                <span className="u-mono" style={{ fontSize: 11.5, color: "var(--muted)", background: "var(--bg-2)", padding: "2px 6px", borderRadius: 3, marginRight: 10 }}>{doc.code}</span>
                <strong style={{ fontSize: 14.5 }}>{doc.title}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="u-mono" style={{ fontSize: 12, color: "var(--muted)" }}>{doc.format} ({doc.size})</span>
                <button 
                  className="btn btn-ghost btn-sm" 
                  onClick={() => setActiveSchema(doc.code)}
                  style={{ fontWeight: 700 }}
                >
                  Переглянути
                </button>
                <a className="btn btn-primary btn-sm" style={{ fontWeight: 700 }} href="#download">Завантажити</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Schema Modal */}
      {activeSchema && (
        <div className="modal-overlay" onClick={() => setActiveSchema(null)}>
          <div className="modal-container" style={{ maxWidth: 700, padding: "24px 20px" }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveSchema(null)}>×</button>
            <h3 style={{ marginBottom: 4 }}>Схематичне відображення · {activeSchema}</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Спрощена однолінійна схема комутаційних з'єднань ланцюгів.</p>
            
            <div style={{ background: "var(--ink-surface)", padding: 24, borderRadius: "var(--r-md)", border: "1px solid var(--line-dark)" }}>
              <svg viewBox="0 0 600 320" style={{ width: "100%", height: "auto" }}>
                {/* Grid dots */}
                <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(255,255,255,0.06)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />

                {/* Legend */}
                <text x="20" y="30" fill="var(--muted)" fontSize="11" fontFamily="var(--mono)">[ L1 L2 L3 N PE ] 380V / 50Hz</text>

                {/* Lines */}
                {/* Feeder */}
                <line x1="100" y1="60" x2="500" y2="60" className="schematic-lines" style={{ stroke: "#4E556A" }} />
                <line x1="300" y1="60" x2="300" y2="90" className="schematic-accent" />
                
                {/* Incomer box */}
                <rect x="250" y="90" width="100" height="40" rx="3" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
                <text x="300" y="115" fill="var(--ink)" fontSize="12" fontWeight="800" textAnchor="middle">QF1 (40A)</text>
                
                <line x1="300" y1="130" x2="300" y2="160" className="schematic-accent" />
                
                {/* Voltage Relay */}
                <rect x="250" y="160" width="100" height="40" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="300" y="185" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">Реле KV-01</text>
                
                <line x1="300" y1="200" x2="300" y2="230" className="schematic-lines" />
                
                {/* Busbar */}
                <line x1="120" y1="230" x2="480" y2="230" className="schematic-lines" style={{ strokeWidth: 3 }} />
                
                {/* Feeders out */}
                <line x1="180" y1="230" x2="180" y2="260" className="schematic-lines" />
                <rect x="140" y="260" width="80" height="30" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="180" y="278" fill="var(--ink)" fontSize="10.5" textAnchor="middle">SF1 C16 (Розетки)</text>

                <line x1="300" y1="230" x2="300" y2="260" className="schematic-lines" />
                <rect x="260" y="260" width="80" height="30" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="300" y="278" fill="var(--ink)" fontSize="10.5" textAnchor="middle">SF2 C10 (Світло)</text>

                <line x1="420" y1="230" x2="420" y2="260" className="schematic-lines" />
                <rect x="380" y="260" width="80" height="30" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
                <text x="420" y="278" fill="var(--ink)" fontSize="10.5" textAnchor="middle">SF3 C25 (Плита)</text>
              </svg>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setActiveSchema(null)}>Закрити вікно</button>
              <button className="btn btn-accent" onClick={() => { alert("Завантаження CAD-архіву розпочато"); setActiveSchema(null); }}>Завантажити повний DXF</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 4. Engineering FAQ Accordion
function EngineeringFAQHybrid() {
  const faqs = [
    {
      q: "Яка різниця між кривими розчеплення B, C та D в автоматичних вимикачах?",
      a: "Криві розчеплення визначають поріг спрацьовування електромагнітного розчіплювача при перевантаженнях струму короткого замикання. Тип B спрацьовує при струмі 3-5 разів вище за номінальний (підходить для освітлення та довгих кабельних ліній). Тип C спрацьовує при 5-10 номіналах (стандарт для розеток і побутової техніки). Тип D призначений для 10-20 номіналів і використовується для двигунів та зварювальних апаратів з високими пусковими струмами."
    },
    {
      q: "Чому ви рекомендуєте пристрої ПЗВ (RCD) типу 'A' замість класичних 'AC'?",
      a: "ПЗВ типу 'AC' реагує виключно на витік синусоїдального змінного струму. ПЗВ типу 'A' також виявляє пульсуючі постійні струми витоку. Оскільки сучасні будинки переповнені імпульсними блоками живлення (комп'ютери, пральні машини з частотним керуванням, LED-лампи, автомобільні зарядки), витік може мати постійну складову, яку пристрій типу 'AC' просто не помітить. Стандарт IEC 60364 прямо рекомендує тип A для житлових приміщень."
    },
    {
      q: "Який правильний крутний момент затяжки гвинтових клем модульної апаратури?",
      a: "Для стандартних модульних вимикачів ABB серії SH200 та S200 нормативний момент затяжки становить 2.0 - 2.8 Н·м. Недостатня затяжка призведе до перегріву клеми, оплавлення корпусу автомата та потенційного займання. Перетягування може пошкодити різьбу гвинта або деформувати металевий затискач клеми. Ми рекомендуємо використовувати динамометричні викрутки для професійного монтажу."
    }
  ];

  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <SectionHead kicker="Довідник фахівця" title="Технічні роз'яснення та стандарти монтажу" />
      <div className="tech-faq">
        {faqs.map((faq, i) => (
          <details key={i}>
            <summary>{faq.q}</summary>
            <div className="faq-content">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}


// --- SWISS THEME SUB-COMPONENTS ---

// 1. Architectural Case Studies with Detail Overlay Panel
function ArchitecturalShowcaseSwiss() {
  const [selectedProj, setSelectedProj] = useState(null);

  const projects = [
    {
      id: "residence-z",
      title: "01 / RESIDENCE DOLD",
      loc: "ZURICH, SWITZERLAND",
      desc: "Безшовна інтеграція металевих щитів у монолітні бетонні стіни вілли. Абсолютна площина.",
      longDesc: "В архітектурній концепції цієї приватної резиденції в Цюриху кожен інженерний вузол мав залишатися невидимим. Ми використали шафи прихованого монтажу серії Hager Volta з індивідуальним фарбуванням дверей під фактуру шліфованого бетону та алюмінієвою матовою фурнітурою. Модульне наповнення ABB System Pro M було скомпоновано з урахуванням мінімальних теплових зазорів та доповнено лазерним маркуванням ліній замість наліпок.",
      modules: "ABB SH201, Hager Volta Custom, ETI SPD T2",
      finishes: "Raw Concrete Matt, Slate Anodized"
    },
    {
      id: "gallery-l",
      title: "02 / LVIV DUSTY PAVILION",
      loc: "LVIV, UKRAINE",
      desc: "Промисловий каркас як елемент експозиційного простору. Видиме силове проведення.",
      longDesc: "При переобладнанні колишнього індустріального цеху під галерею сучасного мистецтва, архітектурне бюро вирішило відмовитися від прихованого монтажу. Розподільчі щити Rittal змонтовані відкрито на колонах. Кабельні траси прокладені в матових сірих лотках, а комутаційні блоки Weidmüller та силові автомати ABB у литому корпусі виступають окремим графічним ементом інтер'єру.",
      modules: "ABB Tmax MCCB, Weidmüller Klippon, Rittal AE Enclosures",
      finishes: "RAL 7035 Steel, Anthracite Powder Coating"
    },
    {
      id: "chalet-v",
      title: "03 / CHALET VERBIER",
      loc: "VALAIS ALPS, SWITZERLAND",
      desc: "Інтелектуальне керування мікрокліматом та захист дерев'яних конструкцій від витоків струму.",
      longDesc: "Конструкції з натурального дерева вимагають підвищеної пожежної безпеки. Для шале у Вербьє було розроблено систему захисту на базі протипожежних диф-реле Eaton з підвищеною чутливістю. Щити автоматики керують зональним опаленням, вентиляцією та інтегровані з контролерами розумного будинку. Комутаційні елементи приховані за розсувними дубовими панелями.",
      modules: "Eaton mRB6 RCD, Mean Well MDR-60 Power Supply, Danfoss Drives",
      finishes: "Natural Oak Integration, Midnight Black Inserts"
    }
  ];

  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 60, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>АРХІТЕКТУРНІ ПРОЕКТИ</h2>
        <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>[INTEGRATED SPACES]</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((proj) => (
          <div 
            key={proj.id} 
            className="swiss-grid-item lift"
            onClick={() => setSelectedProj(proj)}
            style={{ cursor: "pointer" }}
          >
            <span className="u-mono" style={{ fontSize: 13, fontWeight: 800 }}>[{proj.id.toUpperCase()}]</span>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 4 }}>{proj.title}</h3>
              <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, paddingRight: 16 }}>{proj.loc}</p>
            </div>
            <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>
              {proj.desc} <span style={{ textDecoration: "underline", fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap", marginLeft: 6 }}>ДЕТАЛЬНІШЕ →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Drawer Overlay */}
      {selectedProj && (
        <div className="modal-overlay" onClick={() => setSelectedProj(null)}>
          <div 
            className="modal-container" 
            style={{ 
              maxWidth: 640, 
              padding: "32px 20px", 
              borderRadius: 0, 
              border: "3px solid var(--ink)", 
              boxShadow: "none" 
            }} 
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProj(null)} style={{ borderRadius: 0, border: "2px solid var(--ink)" }}>×</button>
            <span style={{ fontSize: 12, fontWeight: 900, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>CASE STUDY · {selectedProj.loc}</span>
            <h2 style={{ fontSize: 30, fontWeight: 900, textTransform: "uppercase", marginTop: 12, marginBottom: 20, letterSpacing: "-0.03em" }}>{selectedProj.title.substring(5)}</h2>
            
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--ink)", marginBottom: 24 }}>
              {selectedProj.longDesc}
            </p>

            <div style={{ borderTop: "2px solid var(--ink)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
              <div>
                <strong style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Використані серії обладнання:</strong>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "var(--accent)", marginTop: 4 }}>{selectedProj.modules}</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <strong style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>Текстури та оздоблення:</strong>
                <div style={{ fontFamily: "var(--sans)", fontWeight: 700, marginTop: 4 }}>{selectedProj.finishes}</div>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={() => setSelectedProj(null)} 
              style={{ marginTop: 32, width: "100%", fontWeight: 900, borderRadius: 0 }}
            >
              ПОВЕРНУТИСЬ ДО СПИСКУ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// 2. Circular Materials / Circularity Dashboard
function CircularMaterialManifestoSwiss() {
  const specs = [
    { label: "ПОЛІКАРБОНАТ ВТОРИННОЇ ПЕРЕРОБКИ", val: "95.4%", details: "Корпуси вимикачів виготовляються з високоякісного гранульованого переробленого пластику без втрати термостійкості." },
    { label: "БЕЗСВИНЦЕВІ СПЛАВИ МІДІ ТА ЛАТУНІ", val: "100.0%", details: "Контактні гвинтові затискачі відповідають регламенту RoHS, запобігаючи виділенню важких металів у довкілля." },
    { label: "ОДНОФАРБОВИЙ ЕКО-КАРТОН ПАКУВАННЯ", val: "100.0%", details: "Виключаємо кольоровий друк та ламінацію коробок. Тільки крафтовий біорозкладний картон та соєві чорнила." },
    { label: "КОЕФІЦІЄНТ ЖИТТЄВОГО ЦИКЛУ (LCA)", val: "A++", details: "Всі пристрої сертифіковані за стандартом PEP ecopassport, що гарантує мінімальний вуглецевий слід за 20 років експлуатації." }
  ];

  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 60, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40 }} className="hero-grid">
        <div>
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", color: "var(--accent)", display: "block", marginBottom: 12 }}>ECO-SYSTEM INTEGRITY</span>
          <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
            Матеріальний маніфест сталого розвитку.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", marginTop: 20, marginRight: 16 }}>
            Ми відбираємо постачальників, які дотримуються принципів циркулярної економіки. Естетика швейцарського мінімалізму проявляється і в пакуванні: відсутність глянцевих плівок, біорозкладні матеріали, мінімальна кількість хімічних барвників.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {specs.map((item, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 20, borderBottom: "1.5px solid var(--line)", paddingBottom: 16 }}>
              <div>
                <span className="swiss-label" style={{ marginBottom: 4 }}>{item.label}</span>
                <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, lineHeight: 1.45 }}>{item.details}</p>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, textAlign: "right", color: "var(--accent)" }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. Anatomy of Swiss Precision Circuit Breaker
function AnatomyOfPrecisionSwiss() {
  const nodes = [
    { num: "01", name: "Біметалева пластина теплового захисту", desc: "Контролює перевантаження по струму. Калібрується лазером під кожну серію для спрацьовування за стандартом EN 60898." },
    { num: "02", name: "Швидкодіючий соленоїд магнітного розчіплювача", desc: "Миттєво розриває контакти за 0.02 секунди у разі виникнення короткого замикання." },
    { num: "03", name: "Камера дугогасіння (12 пластин)", desc: "Ділить електричну дугу на дрібні сегменти, швидко охолоджуючи її і запобігаючи зносу контактної групи." }
  ];

  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 60, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>АНАТОМІЯ ТОЧНОСТІ</h2>
        <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase" }}>[ breaker details ]</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
        <div style={{ border: "2px solid var(--ink)", padding: 24, background: "var(--bg-2)", display: "flex", justifyContent: "center" }}>
          {/* Typographic Wireframe Art representing Circuit Breaker */}
          <div style={{ width: "100%", maxWidth: 320, padding: "20px 0" }}>
            <div style={{ border: "3px solid var(--ink)", height: 260, position: "relative", padding: 20 }}>
              <div style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontFamily: "var(--mono)", fontWeight: 900 }}>[ MODULE TYPE 2026 ]</div>
              
              {/* Internal Bimetal wireframe */}
              <div style={{ borderLeft: "3.5px dashed var(--accent)", height: 110, position: "absolute", left: "35%", top: "25%" }} />
              <div style={{ border: "3px solid var(--ink)", width: 45, height: 45, borderRadius: "50%", position: "absolute", right: "25%", top: "35%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>02</div>
              
              {/* Arc chamber plates simulation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "absolute", bottom: 20, left: "20%", right: "20%" }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ height: 3, background: "var(--ink)", width: "100%" }} />
                ))}
                <div style={{ fontSize: 9, textAlign: "center", marginTop: 4, fontWeight: 900 }}>03 DUCT (12 PLATES)</div>
              </div>

              {/* Tag 01 */}
              <div style={{ border: "3px solid var(--accent)", width: 40, height: 24, position: "absolute", left: "20%", top: "45%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "var(--accent)" }}>01</div>
            </div>
            <div style={{ textAlign: "center", fontSize: 11, fontWeight: 900, marginTop: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>ABB SH201 INTERNAL MECHANISM VIEW</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {nodes.map((node, i) => (
            <div key={i}>
              <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "var(--accent)" }}>{node.num} /</span>
                <h3 style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase" }}>{node.name}</h3>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)", marginTop: 6, marginLeft: 46 }}>{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Architect Sample Box Request Form
function ArchitectKitFormSwiss() {
  const [formData, setFormData] = useState({ name: "", studio: "", email: "", finish: "graphite" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.studio || !formData.email) {
      alert("Будь ласка, заповніть усі обов'язкові поля.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div style={{ border: "3px solid var(--ink)", padding: 40, background: "var(--paper)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40 }} className="hero-grid">
          <div>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.15em", color: "var(--accent)", display: "block", marginBottom: 12 }}>ARCHITECTURAL SERVICE</span>
            <h2 style={{ fontSize: 32, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              Замовте швейцарський семпл-бокс клем та накладок.
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)", marginTop: 20 }}>
              Ми безкоштовно надішлемо вам фізичний демонстраційний комплект зразків фінішної обробки металевих кришок, зразки DIN-клем Weidmüller та палітру кольорів порошкового фарбування шаф.
            </p>
            <div style={{ marginTop: 24, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              ВМІСТ НАБОРУ: 4 зразки металу + 3 клеми + 1 маркувальний блок
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ border: "2px dashed var(--accent)", padding: 30, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: 48, color: "var(--accent)" }}>✓</span>
                <h3 style={{ textTransform: "uppercase", fontWeight: 900, marginTop: 10, marginBottom: 8 }}>ДЯКУЄМО ЗА ЗАПИТ!</h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: 0 }}>
                  Ми зв'яжемося з вами за адресою <strong>{formData.email}</strong> протягом 24 годин для підтвердження доставки демонстраційного набору.
                </p>
                <button 
                  className="btn btn-ghost" 
                  onClick={() => { setSubmitted(false); setFormData({ name: "", studio: "", email: "", finish: "graphite" }); }}
                  style={{ marginTop: 20, alignSelf: "center", border: "2.5px solid var(--ink)" }}
                >
                  ЗАМОВИТИ ЗНОВУ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="swiss-label">Ваше ім'я *</label>
                  <input 
                    type="text" 
                    placeholder="Прізвище та ім'я"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="swiss-input" 
                  />
                </div>
                <div>
                  <label className="swiss-label">Архітектурне бюро / Студія *</label>
                  <input 
                    type="text" 
                    placeholder="Назва компанії"
                    value={formData.studio} 
                    onChange={e => setFormData({...formData, studio: e.target.value})} 
                    className="swiss-input" 
                  />
                </div>
                <div>
                  <label className="swiss-label">Електронна пошта *</label>
                  <input 
                    type="email" 
                    placeholder="name@agency.com"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="swiss-input" 
                  />
                </div>
                <div>
                  <label className="swiss-label">Бажаний стиль обробки семпл-боксу</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      { id: "graphite", label: "Graphite Slate" },
                      { id: "navy", label: "Navy Blue" },
                      { id: "carbon", label: "Carbon Dark" },
                      { id: "white", label: "Arctic White" }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({...formData, finish: opt.id})}
                        className="btn"
                        style={{ 
                          borderRadius: 0,
                          border: "2px solid var(--ink)",
                          background: formData.finish === opt.id ? "var(--ink)" : "transparent",
                          color: formData.finish === opt.id ? "var(--paper)" : "var(--ink)",
                          fontWeight: 800,
                          fontSize: 12.5,
                          height: 38
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  style={{ borderRadius: 0, fontWeight: 900, letterSpacing: "0.05em", marginTop: 8 }}
                >
                  НАДІСЛАТИ ЗАПИТ НА НАБІР
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// --- MAIN WRAPPER SCREEN ---

export function HomeScreen({ go, onAdd, onQuickView, theme }) {
  const isSwiss = theme === "swiss";

  if (isSwiss) {
    return (
      <div className="reveal">
        <HeroPanelSwiss go={go} />
        <CategoryGridSwiss go={go} />
        
        {/* New Rich Swiss Components */}
        <ArchitecturalShowcaseSwiss />
        <CircularMaterialManifestoSwiss />
        <AnatomyOfPrecisionSwiss />
        
        {/* Featured swiss */}
        <section className="wrap" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>РЕКОМЕНДОВАНІ ТОВАРИ</h2>
            <a onClick={() => go("catalog")} style={{ fontSize: 14, fontWeight: 800, textTransform: "uppercase", borderBottom: "2px solid var(--accent)", color: "var(--accent)", cursor: "pointer", paddingBottom: 2 }}>
              Всі пропозиції →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="prod-grid">
            {PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />
            ))}
          </div>
        </section>

        {/* Architect request form */}
        <ArchitectKitFormSwiss />

        {/* Brands swiss */}
        <section className="wrap" style={{ paddingBottom: 80 }}>
          <div style={{ borderTop: "3px solid var(--ink)", paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Офіційне партнерство</span>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {BRANDS.map((b) => (
                <span key={b} style={{ fontWeight: 900, fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--ink)" }}>{b}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, Hybrid/Technical theme:
  return (
    <div className="reveal">
      <HeroPanelHybrid go={go} />
      <CategoryGridHybrid go={go} />

      {/* Товари — одразу після категорій: магазин має показувати товар, а не дашборди */}
      <section className="wrap" style={{ paddingTop: 56 }}>
        <SectionHead kicker="Рекомендуємо" title="Популярне у монтажників" action="Більше товарів →" onAction={() => go("catalog")} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="prod-grid">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} go={go} onAdd={onAdd} onQuickView={onQuickView} theme={theme} />
          ))}
        </div>
      </section>

      {/* Сигнатурний блок — інженерний калькулятор (унікальна цінність магазину) */}
      <LoadCalculatorHybrid onAdd={onAdd} />

      {/* Людський блок довіри — чому в нас купують */}
      <TrustBlockHybrid go={go} />

      <AssemblySectionHybrid />
      <LogisticsSectionHybrid />
      <EngineeringDocsHybrid />
      <EngineeringFAQHybrid />

      {/* Brand row */}
      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 64 }}>
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
    </div>
  );
}

// Людський блок довіри — реальний кадр збірки щита замість фейк-телеметрії
function TrustBlockHybrid({ go }) {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <div className="card hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", padding: 0, alignItems: "stretch" }}>
        <div className="trust-photo" style={{ minHeight: 380, backgroundImage: "url('/Documentary.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ padding: "44px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="u-label" style={{ color: "var(--accent)", marginBottom: 14 }}>Чому в нас купують</div>
          <h2 style={{ fontSize: 27, marginBottom: 16, lineHeight: 1.15, letterSpacing: "-.01em" }}>Збираємо так, як зробили б собі</h2>
          <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 24 }}>
            За кожним щитом — інженер, який підбере апаратуру під ваше навантаження, перевірить сумісність і випробує збірку під струмом. Не коробка з автоматами, а рішення, що працює роками.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14 }}>
            <div style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span> Підбір під фактичне навантаження, а не «на око»</div>
            <div style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span> Оригінальна апаратура з гарантією виробника</div>
            <div style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span> Випробування кожної збірки на стенді під навантаженням</div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", marginTop: 26 }} onClick={() => go("category")}>Зібрати щит під проєкт</button>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .trust-photo { min-height: 240px !important; }
        }
      `}</style>
    </section>
  );
}

// 5. Hero — neo-brutal: редакторський заголовок ліворуч + товар-специмен у строгій рамці праворуч.
//    Гострі кути, видимі grid-лінії, без тіней — навмисна «приладова панель» над заокругленим тілом сайту.
function HeroPanelHybrid({ go }) {
  const rail = [
    ["17", "років на ринку"],
    ["12 000+", "позицій на складі"],
    ["10", "офіційних брендів"],
    ["день-у-день", "відправка до 16:00"],
  ];
  // Реєстраційні мітки кутів рамки — мова технічного креслення
  const corners = [
    { top: 8, left: 8, bt: 1, bl: 1 },
    { top: 8, right: 8, bt: 1, br: 1 },
    { bottom: 8, left: 8, bb: 1, bl: 1 },
    { bottom: 8, right: 8, bb: 1, br: 1 },
  ];
  return (
    <section className="wrap" style={{ paddingTop: 30, paddingBottom: 8 }}>
      <div className="hero-brutal" style={{ border: "1px solid var(--ink)", background: "var(--paper)" }}>
        <div className="hero-brutal-grid" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr" }}>
          {/* LEFT — editorial headline */}
          <div className="hero-brutal-left" style={{ padding: "52px 48px 44px", borderRight: "1px solid var(--ink)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-2)", minWidth: 0, overflowWrap: "anywhere" }}>EST. 2008 — Офіційний постачальник</span>
              <span style={{ flexGrow: 1, minWidth: 16, height: 1, background: "var(--line-2)" }} />
            </div>
            <h1 style={{ fontSize: "clamp(36px, 4.8vw, 60px)", lineHeight: .98, letterSpacing: "-.03em", fontWeight: 800, textTransform: "uppercase", margin: 0 }}>
              Електро-<br />обладнання<br />для тих, хто<br />рахує <span style={{ color: "var(--accent)" }}>аптайм.</span>
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: "26px 0 34px", maxWidth: 440 }}>
              Автомати, ПЗВ, частотники, контактори, реле та шафи від ABB, Schneider, Eaton, ETI. Складський запас і ціни для монтажників.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <button className="swap-ink" onClick={() => go("category")} style={{ appearance: "none", cursor: "pointer", background: "var(--ink)", color: "var(--on-dark)", border: "1px solid var(--ink)", borderRadius: 0, height: 52, padding: "0 30px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase", transition: "background .15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#000")} onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}>
                Каталог →
              </button>
              <button onClick={() => go("catalog")} style={{ appearance: "none", cursor: "pointer", background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", borderLeft: "none", borderRadius: 0, height: 52, padding: "0 26px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", textTransform: "uppercase", transition: "background .15s, color .15s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--on-dark)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
                Підбір за параметрами
              </button>
            </div>
          </div>

          {/* RIGHT — framed product specimen */}
          <div className="hero-brutal-right" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 14, background: "var(--bg-2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>Fig. 01 — Модульний автомат</span>
              <span style={{ color: "var(--accent-strong)", fontWeight: 600 }}>● В наявності</span>
            </div>
            <div style={{ position: "relative", flexGrow: 1, border: "1px solid var(--ink)", background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, padding: 26 }}>
              {corners.map((c, i) => (
                <span key={i} aria-hidden="true" style={{ position: "absolute", top: c.top, bottom: c.bottom, left: c.left, right: c.right, width: 12, height: 12, borderTop: c.bt ? "2px solid var(--ink)" : "none", borderBottom: c.bb ? "2px solid var(--ink)" : "none", borderLeft: c.bl ? "2px solid var(--ink)" : "none", borderRight: c.br ? "2px solid var(--ink)" : "none" }} />
              ))}
              <img src="/product_abb_sh201.png" alt="Автоматичний вимикач ABB SH201 C16" style={{ maxHeight: 290, maxWidth: "80%", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid var(--ink)", paddingTop: 13 }}>
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-.01em" }}>ABB · SH201 C16</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>ART 2CDS211001R0164</span>
            </div>
          </div>
        </div>

        {/* spec rail — інструментальна стрічка показників на всю ширину */}
        <div className="hero-brutal-rail" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--ink)" }}>
          {rail.map(([n, d], i) => (
            <div key={i} style={{ padding: "18px 24px", borderLeft: i ? "1px solid var(--line-2)" : "none" }}>
              <div className="u-mono" style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, letterSpacing: "-.01em" }}>{n}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 7, textTransform: "uppercase", letterSpacing: ".04em" }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .hero-brutal-grid { grid-template-columns: 1fr !important; }
          .hero-brutal-left { border-right: none !important; border-bottom: 1px solid var(--ink) !important; padding: 36px 24px 30px !important; }
          .hero-brutal-right { padding: 20px !important; }
        }
        @media (max-width: 560px) {
          .hero-brutal-rail { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-brutal-rail > div:nth-child(3) { border-left: none !important; }
          .hero-brutal-rail > div:nth-child(n+3) { border-top: 1px solid var(--line-2); }
        }
      `}</style>
    </section>
  );
}

function CategoryGridHybrid({ go }) {
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

function AssemblySectionHybrid() {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <div className="card hero-grid" style={{ padding: 32, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, background: "var(--paper)", alignItems: "center" }}>
        <div>
          <div className="u-label" style={{ color: "var(--accent)", marginBottom: 8 }}>Виробничий відділ kv-electro</div>
          <h2 style={{ fontSize: 26, marginBottom: 14 }}>Проектування та збірка електрощитів</h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 20 }}>
            Складаємо силові щити (ГРЩ, ВРУ), щити автоматики (АВР, ШУ) та розподільчі квартирні щити під індивідуальні вимоги замовника. Використовуємо тільки сертифіковану апаратуру.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5 }}>
            <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--accent)" }}>✓</span> Тестування кожного щита на стенді під навантаженням</div>
            <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--accent)" }}>✓</span> Маркування кожної лінії та надання детальної однолінійної схеми</div>
            <div style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--accent)" }}>✓</span> Гарантія на збірку 36 місяців</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="prod-grid">
          {["cabinet", "terminal"].map((glyph, i) => (
            <div key={i} style={{ background: "var(--bg)", border: "1px solid var(--line-2)", borderRadius: "var(--r-md)", padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <ProductGlyph type={glyph} size={80} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>{glyph === 'cabinet' ? 'Корпуси щитів' : 'Комутація'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogisticsSectionHybrid() {
  return (
    <section className="wrap" style={{ paddingTop: 56 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="prod-grid-3">
        {[
          ["Пряма інтеграція API / XML / JSON", "Автоматичне вивантаження залишків складу та оптових прайс-листів прямо у ваші облікові системи 1С або BAS. Оновлення кожні 15 хвилин.", "API Документація →"],
          ["Відстрочка платежу", "Для постійних монтажних організацій та системних інтеграторів діє ліміт відстрочки платежу до 30 календарних днів.", "Подати заявку →"],
          ["Доставка на об'єкт день-у-день", "Власна кур'єрська служба здійснює доставку габаритного обладнання та зібраних щитів прямо на будівельний майданчик у межах Києва.", "Деталі доставки →"]
        ].map(([title, desc, action], i) => (
          <div key={i} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>{desc}</p>
            </div>
            <a style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginTop: 16, display: "inline-block", cursor: "pointer" }}>{action}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- SWISS THEME HERO & CATEGORY BLOCKS ---

function HeroPanelSwiss({ go }) {
  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 40, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
        <div>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 800, color: "var(--accent)", marginBottom: 20 }}>
            ESTABLISHED 2008 / B2B SUPPLY SYSTEM
          </div>
          <h1 style={{ fontSize: "clamp(38px, 5.5vw, 56px)", lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 900, textTransform: "uppercase", color: "var(--ink)", marginBottom: 24 }}>
            Модульна<br />Архітектура<br />Автоматики.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--ink)", marginBottom: 36, maxWidth: 480 }}>
            Преміальне промислове електрообладнання для надійного енергорозподілу. ABB, Schneider, Eaton, ETI з доставкою по Україні.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" style={{ border: "2px solid var(--ink)", fontWeight: 800 }} onClick={() => go("category")}>
              ПЕРЕГЛЯНУТИ КАТАЛОГ
            </button>
            <button className="btn btn-ghost btn-lg" style={{ border: "2px solid var(--ink)", background: "transparent", color: "var(--ink)", fontWeight: 800 }} onClick={() => go("catalog")}>
              ШВИДКИЙ ПОШУК
            </button>
          </div>
        </div>
        {/* Swiss Modernist Poster Banner */}
        <div style={{ border: "3px solid var(--ink)", padding: 12, background: "var(--bg)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ width: "100%", height: 320, backgroundImage: "url('/module_swiss.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--sans)" }}>
            <span>kv-electro poster series 01</span>
            <span>switzerland / minimalist concept</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryGridSwiss({ go }) {
  return (
    <section className="wrap" style={{ paddingTop: 60, paddingBottom: 60, borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36 }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em" }}>КАТЕГОРІЇ</h2>
        <a onClick={() => go("category")} style={{ fontSize: 14, fontWeight: 800, textTransform: "uppercase", borderBottom: "2px solid var(--accent)", color: "var(--accent)", cursor: "pointer", paddingBottom: 2 }}>
          ВСІ КАТЕГОРІЇ →
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="cat-grid">
        {CATEGORIES.slice(0, 4).map((c) => (
          <a key={c.key} onClick={() => go("category")} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 16, padding: "16px 0", borderTop: "2.5px solid var(--ink)" }} className="lift">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <ProductGlyph type={c.glyph} size={64} />
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--muted)" }}>[{c.count}]</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, textTransform: "uppercase", letterSpacing: "-0.02em" }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{c.subs.slice(0, 2).join(" / ")}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

