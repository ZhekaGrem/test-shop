import React from 'react';

export function ProductGlyph({ type = "breaker", size = 88 }) {
  const stroke = "var(--ink)";
  const acc = "var(--accent)";
  const line = "var(--line-2)";
  const fill = "#ffffff";
  const sw = 1.5;
  const common = { fill, stroke, strokeWidth: sw, strokeLinejoin: "round" };
  
  // Custom linear gradients for premium plastic texture
  let body;
  switch (type) {
    case "breaker": // Single DIN module with 3D toggle lever & technical labels
      body = (
        <g>
          {/* Gradients */}
          <defs>
            <linearGradient id="plastic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <linearGradient id="breakerAcc" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="#155e3b" />
            </linearGradient>
          </defs>
          {/* Main DIN Module body */}
          <rect x="30" y="8" width="40" height="84" rx="4" fill="url(#plastic)" stroke={stroke} strokeWidth={sw} />
          {/* Top terminal area */}
          <rect x="34" y="12" width="32" height="14" rx="2" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <circle cx="50" cy="19" r="3.5" fill="#94a3b8" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <line x1="47.5" y1="19" x2="52.5" y2="19" stroke={stroke} strokeWidth="1.2" className="tech-detail" />
          
          {/* Bottom terminal area */}
          <rect x="34" y="74" width="32" height="14" rx="2" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <circle cx="50" cy="81" r="3.5" fill="#94a3b8" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <line x1="47.5" y1="81" x2="52.5" y2="81" stroke={stroke} strokeWidth="1.2" className="tech-detail" />

          {/* Front cover plate with brand */}
          <rect x="36" y="32" width="28" height="36" rx="2" fill="#ffffff" stroke={stroke} strokeWidth={sw} />
          <text x="50" y="42" fontFamily="var(--sans)" fontSize="6" fontWeight="800" fill={acc} textAnchor="middle">kv</text>
          
          {/* Circuit indicator window */}
          <rect x="39" y="45" width="10" height="5" rx="1" fill="#22c55e" stroke={stroke} strokeWidth="1" className="tech-detail" />
          
          {/* Technical Specs Text */}
          <text x="61" y="42" fontFamily="var(--mono)" fontSize="4.5" fontWeight="600" fill="#64748b" textAnchor="end" className="tech-detail">C16</text>
          <text x="61" y="48" fontFamily="var(--mono)" fontSize="4" fill="#94a3b8" textAnchor="end" className="tech-detail">6000</text>
          <line x1="39" y1="53" x2="61" y2="53" stroke="#cbd5e1" strokeWidth="0.8" className="tech-detail" />
          
          {/* 3D Switch Toggle Lever */}
          <rect x="44" y="56" width="12" height="10" rx="1.5" fill="url(#breakerAcc)" stroke={stroke} strokeWidth={sw} />
          <line x1="44" y1="61" x2="56" y2="61" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" className="tech-detail" />
        </g>
      );
      break;
 
    case "rcd": // Wider differential PZV module
      body = (
        <g>
          <defs>
            <linearGradient id="rcdPlastic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          {/* Main Module */}
          <rect x="18" y="8" width="64" height="84" rx="4" fill="url(#rcdPlastic)" stroke={stroke} strokeWidth={sw} />
          
          {/* Terminals (Double Pole) */}
          <rect x="24" y="12" width="22" height="12" rx="1.5" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <rect x="54" y="12" width="22" height="12" rx="1.5" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <circle cx="35" cy="18" r="3" fill="#94a3b8" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <circle cx="65" cy="18" r="3" fill="#94a3b8" stroke={stroke} strokeWidth="1" className="tech-detail" />

          {/* Bottom Terminals */}
          <rect x="24" y="76" width="22" height="12" rx="1.5" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <rect x="54" y="76" width="22" height="12" rx="1.5" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          
          {/* Front plate */}
          <rect x="22" y="28" width="56" height="44" rx="2" fill="#ffffff" stroke={stroke} strokeWidth={sw} />
          
          {/* Brand & Type */}
          <text x="28" y="38" fontFamily="var(--sans)" fontSize="6" fontWeight="800" fill={acc}>kv</text>
          <text x="28" y="45" fontFamily="var(--mono)" fontSize="5" fontWeight="700" fill={stroke} className="tech-detail">25A</text>
          <text x="28" y="51" fontFamily="var(--mono)" fontSize="4.5" fill="#64748b" className="tech-detail">30mA</text>

          {/* Test Button "T" */}
          <rect x="54" y="34" width="16" height="14" rx="2" fill="#ef4444" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <text x="62" y="43" fontFamily="var(--sans)" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle" className="tech-detail">T</text>

          {/* Large breaker switch */}
          <rect x="42" y="53" width="10" height="15" rx="1.5" fill={stroke} stroke={stroke} strokeWidth={sw} />
          <line x1="42" y1="61" x2="52" y2="61" stroke="#e2e8f0" strokeWidth="1.5" className="tech-detail" />
        </g>
      );
      break;
 
    case "contactor": // Modular contactor with red/green coils status window
      body = (
        <g>
          <rect x="26" y="8" width="48" height="84" rx="4" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
          {/* Screws list */}
          <rect x="32" y="12" width="36" height="12" rx="2" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          <circle cx="41" cy="18" r="3" fill="#64748b" className="tech-detail" />
          <circle cx="59" cy="18" r="3" fill="#64748b" className="tech-detail" />
          
          {/* Label area */}
          <rect x="30" y="28" width="40" height="44" rx="2" fill="#ffffff" stroke={stroke} strokeWidth={sw} />
          <text x="50" y="39" fontFamily="var(--sans)" fontSize="6" fontWeight="800" fill={acc} textAnchor="middle">kv-electro</text>
          <text x="50" y="47" fontFamily="var(--mono)" fontSize="5.5" fontWeight="700" fill={stroke} textAnchor="middle" className="tech-detail">ESB24</text>
          
          {/* Status Indicator coil (glowing orange/accent) */}
          <rect x="42" y="54" width="16" height="8" rx="1" fill={acc} stroke={stroke} strokeWidth={sw} />
          <text x="50" y="60.5" fontFamily="var(--sans)" fontSize="5" fontWeight="700" fill="#ffffff" textAnchor="middle" className="tech-detail">ON</text>

          {/* Bottom terminals */}
          <rect x="32" y="76" width="36" height="12" rx="2" fill="#e2e8f0" stroke={stroke} strokeWidth={sw} className="tech-detail" />
        </g>
      );
      break;
 
    case "drive": // Frequency converter drive with digital display & scroll button
      body = (
        <g>
          <defs>
            <linearGradient id="driveBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="lcd" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          {/* Outer case */}
          <rect x="22" y="6" width="56" height="88" rx="6" fill="url(#driveBody)" stroke={stroke} strokeWidth={sw} />
          
          {/* Cooling vents at top */}
          <line x1="30" y1="12" x2="50" y2="12" stroke="#475569" strokeWidth="2" strokeLinecap="round" className="tech-detail" />
          <line x1="30" y1="17" x2="50" y2="17" stroke="#475569" strokeWidth="2" strokeLinecap="round" className="tech-detail" />
          <line x1="30" y1="22" x2="50" y2="22" stroke="#475569" strokeWidth="2" strokeLinecap="round" className="tech-detail" />

          {/* Glowing blue digital LCD screen */}
          <rect x="30" y="28" width="40" height="22" rx="2" fill="url(#lcd)" stroke={stroke} strokeWidth={sw} />
          <text x="34" y="43" fontFamily="var(--mono)" fontSize="11" fontWeight="800" fill="#ffffff" letterSpacing="0.5">50.0</text>
          <text x="66" y="43" fontFamily="var(--mono)" fontSize="7" fill="#ffffff" textAnchor="end" className="tech-detail">Hz</text>

          {/* Control Potentiometer wheel */}
          <circle cx="50" cy="64" r="10" fill="#334155" stroke={stroke} strokeWidth={sw} />
          <line x1="50" y1="64" x2="50" y2="54" stroke="#e2e8f0" strokeWidth="1.5" className="tech-detail" />

          {/* Buttons: Run (green) & Stop (red) */}
          <rect x="32" y="78" width="14" height="8" rx="1" fill="#22c55e" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <rect x="54" y="78" width="14" height="8" rx="1" fill="#ef4444" stroke={stroke} strokeWidth="1" className="tech-detail" />
        </g>
      );
      break;
 
    case "power": // Large industrial MCCB breaker
      body = (
        <g>
          <defs>
            <linearGradient id="mccb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <rect x="20" y="8" width="60" height="84" rx="4" fill="url(#mccb)" stroke={stroke} strokeWidth={sw} />
          
          {/* Main front plate with safety details */}
          <rect x="28" y="24" width="44" height="52" rx="2" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
          
          <text x="50" y="34" fontFamily="var(--sans)" fontSize="6.5" fontWeight="800" fill={acc} textAnchor="middle">kv-power</text>
          <text x="50" y="41" fontFamily="var(--mono)" fontSize="5.5" fontWeight="700" fill={stroke} textAnchor="middle" className="tech-detail">250A</text>

          {/* Large heavy lever switcher */}
          <rect x="45" y="46" width="10" height="24" rx="2" fill={stroke} stroke={stroke} strokeWidth={sw} />
          <line x1="45" y1="58" x2="55" y2="58" stroke="#ef4444" strokeWidth="2.5" className="tech-detail" />

          {/* Line connections */}
          {[28, 50, 72].map(x => <line key={x} x1={x} y1="8" x2={x} y2="2" stroke={stroke} strokeWidth="2.5" className="tech-detail" />)}
          {[28, 50, 72].map(x => <line key={x} x1={x} y1="92" x2={x} y2="98" stroke={stroke} strokeWidth="2.5" className="tech-detail" />)}
        </g>
      );
      break;
 
    case "relay": // Time relay with dials
      body = (
        <g>
          <rect x="30" y="8" width="40" height="84" rx="4" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
          {/* Front plate */}
          <rect x="34" y="20" width="32" height="60" rx="2" fill="#ffffff" stroke={stroke} strokeWidth={sw} />
          
          {/* Two small turning dials for settings */}
          <circle cx="50" cy="32" r="5" fill="#e2e8f0" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <line x1="50" y1="32" x2="53" y2="29" stroke="#ef4444" strokeWidth="1.5" className="tech-detail" />
          
          <circle cx="50" cy="46" r="5" fill="#e2e8f0" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <line x1="50" y1="46" x2="47" y2="49" stroke="#ef4444" strokeWidth="1.5" className="tech-detail" />

          <text x="50" y="60" fontFamily="var(--mono)" fontSize="4.5" fontWeight="700" fill={stroke} textAnchor="middle" className="tech-detail">t: 10s</text>
          
          {/* Status LEDs (glowing red and green) */}
          <circle cx="44" cy="72" r="2" fill="#22c55e" className="tech-detail" />
          <circle cx="56" cy="72" r="2" fill="#ef4444" className="tech-detail" />
        </g>
      );
      break;
 
    case "button": // Industrial start/stop push button
      body = (
        <g>
          {/* Metal rim */}
          <circle cx="50" cy="50" r="34" fill="#cbd5e1" stroke={stroke} strokeWidth={sw} />
          <circle cx="50" cy="50" r="28" fill="#475569" stroke={stroke} strokeWidth={sw} />
          
          {/* Center colored button */}
          <circle cx="50" cy="50" r="20" fill={acc} stroke={stroke} strokeWidth={sw} />
          
          {/* Inner ring */}
          <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="tech-detail" />
        </g>
      );
      break;
 
    case "plc": // Compact PLC controller with Ethernet port detail
      body = (
        <g>
          <rect x="18" y="14" width="64" height="72" rx="5" fill="#475569" stroke={stroke} strokeWidth={sw} />
          <rect x="22" y="18" width="56" height="64" rx="3" fill="#cbd5e1" stroke={stroke} strokeWidth={sw} />
          
          {/* Screen area */}
          <rect x="28" y="24" width="28" height="20" rx="1.5" fill="#0f172a" stroke={stroke} strokeWidth={sw} />
          <text x="32" y="34" fontFamily="var(--mono)" fontSize="5" fill="#22c55e" className="tech-detail">SYS OK</text>
          <text x="32" y="40" fontFamily="var(--mono)" fontSize="4" fill="#22c55e" className="tech-detail">RUNNING</text>

          {/* D-Pad Buttons */}
          <circle cx="64" cy="34" r="5" fill="#334155" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <circle cx="64" cy="46" r="3" fill="#334155" stroke={stroke} strokeWidth="1" className="tech-detail" />

          {/* Terminals block at bottom */}
          <rect x="26" y="66" width="48" height="10" rx="1" fill="#334155" stroke={stroke} strokeWidth={sw} className="tech-detail" />
          {[29, 37, 45, 53, 61, 69].map(x => <circle key={x} cx={x} cy="71" r="1.8" fill="#e2e8f0" className="tech-detail" />)}
        </g>
      );
      break;
 
    case "cabinet": // Distribution cabinet switchboard
      body = (
        <g>
          <defs>
            <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Enclosure structure */}
          <rect x="20" y="8" width="60" height="84" rx="4" fill="url(#metal)" stroke={stroke} strokeWidth={sw} />
          
          {/* Door panel */}
          <rect x="25" y="12" width="50" height="76" rx="2" fill="none" stroke={stroke} strokeWidth="1" />
          
          {/* Lock keyhole */}
          <circle cx="64" cy="50" r="3.5" fill="#475569" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <line x1="64" y1="48.5" x2="64" y2="51.5" stroke="#ffffff" strokeWidth="1.2" className="tech-detail" />

          {/* Warning label sign (yellow triangle) */}
          <polygon points="40,38 52,38 46,26" fill="#fbbf24" stroke={stroke} strokeWidth="1" className="tech-detail" />
          <text x="46" y="36.5" fontFamily="var(--sans)" fontSize="6.5" fontWeight="900" fill={stroke} textAnchor="middle" className="tech-detail">!</text>
        </g>
      );
      break;
 
    case "terminal": // DIN screw terminals block
      body = (
        <g>
          {/* Three side-by-side terminal modules */}
          {[24, 40, 56].map((x, idx) => (
            <g key={idx}>
              <rect x={x} y="16" width="16" height="68" rx="2" fill={idx === 1 ? acc : "#94a3b8"} stroke={stroke} strokeWidth={sw} />
              <rect x={x + 2} y="22" width="12" height="14" rx="1" fill="#f8fafc" stroke={stroke} strokeWidth="1" className="tech-detail" />
              <circle cx={x + 8} cy="29" r="2.5" fill="#475569" stroke={stroke} strokeWidth="0.8" className="tech-detail" />
              
              <rect x={x + 2} y="64" width="12" height="14" rx="1" fill="#f8fafc" stroke={stroke} strokeWidth="1" className="tech-detail" />
              <circle cx={x + 8} cy="71" r="2.5" fill="#475569" stroke={stroke} strokeWidth="0.8" className="tech-detail" />
            </g>
          ))}
        </g>
      );
      break;
 
    case "meter": // Multifunction digital power meter with indicators
      body = (
        <g>
          <defs>
            <linearGradient id="meterLcd" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect x="22" y="22" width="56" height="56" rx="5" fill="#334155" stroke={stroke} strokeWidth={sw} />
          <rect x="26" y="26" width="48" height="48" rx="3" fill="#f8fafc" stroke={stroke} strokeWidth={sw} />
          
          {/* LCD Screen screen */}
          <rect x="30" y="32" width="40" height="24" rx="1.5" fill="url(#meterLcd)" stroke={stroke} strokeWidth={sw} />
          <text x="34" y="48" fontFamily="var(--mono)" fontSize="12" fontWeight="800" fill="#ffffff" letterSpacing="0.8">380</text>
          <text x="66" y="48" fontFamily="var(--mono)" fontSize="8" fill="#ffffff" textAnchor="end" className="tech-detail">V</text>

          {/* Indicators L1, L2, L3 */}
          <circle cx="35" cy="64" r="2" fill={acc} className="tech-detail" />
          <circle cx="50" cy="64" r="2" fill={acc} className="tech-detail" />
          <circle cx="65" cy="64" r="2" fill={acc} className="tech-detail" />
        </g>
      );
      break;
 
    default:
      body = <rect x="30" y="20" width="40" height="60" rx="4" {...common} />;
  }
  return (
    <svg className="glyph" width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.08))" }}>
      {body}
    </svg>
  );
}

export function Money({ value, size = 18, bold = true, strike = false, c }) {
  const txt = value.toLocaleString("uk-UA");
  return (
    <span className="u-mono u-tnum" style={{ fontSize: size, fontWeight: bold ? 700 : 500, color: c || "var(--ink)", textDecoration: strike ? "line-through" : "none", whiteSpace: "nowrap", letterSpacing: "-.01em" }}>
      {txt}&nbsp;<span style={{ fontSize: size * .68, fontWeight: 500 }}>₴</span>
    </span>
  );
}

export function Stars({ n = 5, reviews }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span aria-hidden="true" style={{ letterSpacing: "1px", fontSize: 13, color: "var(--accent)" }}>
        {"★".repeat(n)}<span style={{ color: "var(--line-2)" }}>{"★".repeat(5 - n)}</span>
      </span>
      {reviews != null && <span style={{ fontSize: 12, color: "var(--muted)" }}>{reviews}</span>}
    </span>
  );
}

export function Stock({ kind }) {
  return kind === "in"
    ? <span className="stock">На складі</span>
    : <span className="stock order">Під замовлення</span>;
}

export function SectionHead({ kicker, title, action, onAction }) {
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

export function Crumbs({ items, go }) {
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

export function HeaderIcon({ icon, label, count, onClick }) {
  return (
    <button onClick={onClick} title={label} style={{ position: "relative", appearance: "none", cursor: "pointer", background: "transparent", border: "none", color: "var(--ink)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "2px 6px", fontFamily: "var(--sans)" }} className="hdr-icon">
      <span style={{ position: "relative" }}>
        {icon}
        {count != null && <span style={{ position: "absolute", top: -7, right: -9, background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 20, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontFamily: "var(--mono)" }}>{count}</span>}
      </span>
      <span style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
    </button>
  );
}
