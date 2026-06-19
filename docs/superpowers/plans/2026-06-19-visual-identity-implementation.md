# Візуальна айдентика kv-electro — план реалізації

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Застосувати узгоджену айдентику Schneider (зелений `#3DCD58` + світлочорний, темна смуга-герой, велика типографіка) як єдиний дефолтний вигляд сайту, прибравши «пісочницю» стилів/палітр і лишивши перемикач шрифтів.

**Architecture:** Айдентика тримається на CSS-змінних, що формуються в `App.jsx` (`themeVars`) і пушаться на `documentElement`. Базова тема `hybrid` уже дає темну смугу-герой (`--ink-surface`), світлу шапку та каталог «сайдбар ліворуч + грід праворуч». Тому робота — це переважно: (1) нова колірна гілка `schneider` + дефолти, (2) фіксація стилю й приховування зайвих перемикачів, (3) тонке шліфування геро/картки/фільтрів.

**Tech Stack:** React 19, Vite 8, чистий CSS (`src/index.css`), без TS, без тест-раннера.

## Global Constraints

- Акцент-зелений: `--accent` = `#3DCD58` (Schneider «Life Is On»).
- Світлочорний текст: `--ink` = `#1B1D1F`; темна площина (герой/футер/CTA): `#17181A`.
- Тло сторінки `--bg` = `#FFFFFF`; підкладка `--bg-2` = `#F4F4F5`.
- Повна кирилиця в усіх шрифтах (і/ї/є/ґ). Шрифти-набори вже реалізовано — **не чіпати** логіку `FONT_SETS` / `--display` / `--sans`, окрім завдання 5.
- Перемикач **шрифтів** лишається в панелі; перемикачі **стилю та палітри** ховаємо.
- Перевірка кожного завдання (тест-раннера немає): `npm run build` має завершитись успішно (`✓ built`), і візуальна перевірка через `npm run dev`. `npm run lint` НЕ використовувати як гейт — у репозиторії ~1000 наявних попередніх помилок у `TweaksPanel.jsx`, не пов'язаних із цими змінами.
- Робота ведеться в гілці `identity-fonts` (уже створена; містить реалізацію шрифтів і спеку).

---

### Task 1: Колірна гілка «Schneider» + дефолти

**Files:**
- Modify: `src/App.jsx` (блок `APP_DEFAULTS` ~рядок 39; ланцюг колірних гілок `if (colTheme === ...)` ~рядки 133-145)
- Modify: `src/index.css` (`:root` змінні `--accent*`, `--ink`, `--bg`, `--bg-2` ~рядки 210-240 після додавання шрифтів)

**Interfaces:**
- Produces: значення `colorTheme: "schneider"` як дефолтне; гілка в `App.jsx`, що задає `ink/ink2/paper/bg/bg2/line/line2/inkSurface/accColor/muted/faint` для пресета `schneider`.

- [ ] **Step 1: Додати дефолти айдентики в `APP_DEFAULTS`**

У `src/App.jsx` замінити блок:

```js
const APP_DEFAULTS = {
  "accent": "#1e7a4e",
  "density": "balanced",
  "styleTheme": "hybrid",
  "colorTheme": "default",
  "fontSet": "onest"
};
```

на:

```js
const APP_DEFAULTS = {
  "accent": "#3DCD58",
  "density": "balanced",
  "styleTheme": "hybrid",
  "colorTheme": "schneider",
  "fontSet": "onest"
};
```

- [ ] **Step 2: Додати гілку `schneider` у ланцюг колірних пресетів**

У `src/App.jsx` знайти кінець гілки `else if (colTheme === "carbon") { ... }` (завершується `}` ~рядок 145) і одразу після неї додати:

```js
  else if (colTheme === "schneider") {
    ink = "#1B1D1F";
    ink2 = "#4A4F55";
    paper = "#ffffff";
    bg = isCarbonTech ? "#0c0d12" : "#ffffff";
    bg2 = isCarbonTech ? "#1c1e27" : "#F4F4F5";
    line = isCarbonTech ? "#232631" : "#ECEAE4";
    line2 = isCarbonTech ? "#343949" : "#DCD9D2";
    inkSurface = "#17181A";
    accColor = t.accent || "#3DCD58";
    muted = "#7C828A";
    faint = "#A9AEB5";
  }
```

- [ ] **Step 3: Синхронізувати `:root` у `index.css` (щоб не блимало до гідрації JS)**

У `src/index.css`, у блоці `:root`, замінити рядки:

```css
  --bg: #f4f3ef;
  --bg-2: #eceae3;
```

на:

```css
  --bg: #ffffff;
  --bg-2: #f4f4f5;
```

Замінити:

```css
  --ink: #15171c;
  --ink-2: #3c414a;
```

на:

```css
  --ink: #1b1d1f;
  --ink-2: #4a4f55;
```

Замінити блок акценту:

```css
  /* accent — forest green */
  --accent: #1e7a4e;
  --accent-strong: #165e3c99;
  --accent-strong-h: #115030;
  --accent-soft: #d4ece1;
  --accent-tint: #edf7f1;
  --accent-ink: #08231a;
```

на:

```css
  /* accent — Schneider vivid green */
  --accent: #3dcd58;
  --accent-strong: #1f9c3c;
  --accent-strong-h: #1a8a34;
  --accent-soft: #c8efce;
  --accent-tint: #eafaee;
  --accent-ink: #0c2f15;
```

- [ ] **Step 4: Зібрати проєкт**

Run: `npm run build`
Expected: `✓ built in …` без помилок.

- [ ] **Step 5: Візуальна перевірка**

Run: `npm run dev`, відкрити локальний URL.
Expected: тло біле, акценти (кнопки «Купити», ціни-акценти, статус «в наявності», смуга-герой CTA) — яскраво-зелені `#3DCD58`; текст — м'який чорний, не синюватий.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/index.css
git commit -m "feat(identity): add Schneider color preset and make it default"
```

---

### Task 2: Зафіксувати стиль і прибрати «пісочницю» (лишити перемикач шрифтів) + фікс бага каталогу

**Files:**
- Modify: `src/App.jsx` (секції `TweaksPanel`: «Концепція дизайну» та «Колірна схема» ~рядки 207-224; «Акцентний колір» ~226-230)
- Modify: `src/components/CatalogScreen.jsx` (сигнатура компонента, рядок 7)

**Interfaces:**
- Consumes: `colorTheme: "schneider"`, `styleTheme: "hybrid"` з Task 1.
- Produces: панель показує лише перемикач шрифтів і щільність; стиль/палітра зафіксовані кодом.

- [ ] **Step 1: Прибрати перемикачі стилю інтерфейсу та палітри з панелі**

У `src/App.jsx` видалити дві секції — «Концепція дизайну» з її `TweakRadio` (styleTheme) і «Колірна схема» з її `TweakRadio` (colorTheme), а також секцію «Акцентний колір (Custom)» з `TweakColor`. Тобто видалити блок від:

```jsx
        <TweakSection label="Концепція дизайну" />
        <TweakRadio label="Стиль інтерфейсу" value={t.styleTheme}
```

до закриття `TweakColor` включно (рядок з `onChange={(v) => setTweak("accent", v)} />`).

Лишити в панелі: секцію «Шрифти (айдентика)» з перемикачем `fontSet` і секцію «Щільність».

- [ ] **Step 2: Прибрати тепер-невикористані імпорти**

У `src/App.jsx` у рядку імпорту з `./components/TweaksPanel` прибрати `TweakColor`, якщо він більше ніде не використовується:

```js
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from './components/TweaksPanel';
```

(Залишити `TweakRadio` — він потрібен для шрифтів і щільності.)

- [ ] **Step 3: Виправити прихований баг `theme` у CatalogScreen**

У `src/components/CatalogScreen.jsx` рядок 7 замінити:

```jsx
export function CatalogScreen({ go, onAdd, onQuickView }) {
```

на:

```jsx
export function CatalogScreen({ go, onAdd, onQuickView, theme }) {
```

(Компонент уже передає `theme={theme}` у `ProductRow/ProductCard/ProductTable` на рядках 38/43/47, але не отримував його — це ReferenceError при рендері каталогу.)

- [ ] **Step 4: Зібрати**

Run: `npm run build`
Expected: `✓ built` без помилок (зокрема без «'TweakColor' is not defined»).

- [ ] **Step 5: Візуальна перевірка**

Run: `npm run dev`. Панель справа внизу містить лише «Набір шрифтів» і «Щільність». Перехід на екран «Каталог» не падає, показує сайдбар фільтрів ліворуч і грід/таблицю праворуч.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/components/CatalogScreen.jsx
git commit -m "feat(identity): lock style+palette, keep font switcher, fix catalog theme prop"
```

---

### Task 3: Тонке шліфування смуги-героя (світлочорний + чистота)

**Files:**
- Modify: `src/components/HomeScreen.jsx` (`HeroPanelHybrid`, рядки 1261-1321)

**Interfaces:**
- Consumes: змінні `--ink-surface` (= `#17181A` з пресета schneider), `--accent`.
- Герой уже використовує `var(--ink-surface)` як темну площину та `var(--accent)` для мітки/CTA — тому правки косметичні.

- [ ] **Step 1: Прибрати фонову технічну сітку для чистішого мінімалізму**

У `src/components/HomeScreen.jsx` у `HeroPanelHybrid` видалити рядок-накладку сітки (рядок 1266):

```jsx
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent 0 39px, rgba(255,255,255,.04) 39px 40px), repeating-linear-gradient(0deg, transparent 0 39px, rgba(255,255,255,.04) 39px 40px)", pointerEvents: "none" }} />
```

- [ ] **Step 2: Збільшити заголовок героя (велика типографіка)**

У тому ж блоці замінити стиль `h1` (рядок 1269):

```jsx
            <h1 style={{ fontSize: 40, lineHeight: 1.05, letterSpacing: "-.025em", fontWeight: 800, marginBottom: 18 }}>
```

на:

```jsx
            <h1 style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: "-.03em", fontWeight: 800, marginBottom: 18 }}>
```

- [ ] **Step 3: Зібрати**

Run: `npm run build`
Expected: `✓ built` без помилок.

- [ ] **Step 4: Візуальна перевірка**

Run: `npm run dev`. Герой — суцільна світлочорна площина без сітки, великий заголовок, зелена мітка-eyebrow і зелена кнопка «Перейти в каталог». Шапка над ним лишається світлою.

- [ ] **Step 5: Commit**

```bash
git add src/components/HomeScreen.jsx
git commit -m "feat(identity): clean up hero band — solid soft-black, larger headline"
```

---

### Task 4: Полегшити фільтри (контраст до перевантажених schneidershop)

**Files:**
- Modify: `src/components/Filters.jsx` (`Check` рядки 3-14; `FilterSidebar` рядки 95-103)

**Interfaces:**
- Produces: легший вигляд сайдбару — без числових лічильників на чекбоксах, без важкої картки-обведення.

- [ ] **Step 1: Прибрати числові лічильники з чекбоксів фільтрів**

У `src/components/Filters.jsx` у компоненті `Check` видалити рядок 11:

```jsx
      {count != null && <span className="u-mono" style={{ fontSize: 11, color: "var(--faint)" }}>{count}</span>}
```

(Параметр `count` лишається в сигнатурі, але не рендериться — викликів змінювати не треба.)

- [ ] **Step 2: Полегшити контейнер сайдбару (без важкої картки)**

У `src/components/Filters.jsx` замінити `FilterSidebar` (рядки 95-103):

```jsx
export function FilterSidebar() {
  return (
    <aside style={{ width: 256, flexShrink: 0 }} className="filter-sidebar">
      <div className="card" style={{ padding: "16px 18px", position: "sticky", top: 96 }}>
        <FilterContents />
      </div>
    </aside>
  );
}
```

на:

```jsx
export function FilterSidebar() {
  return (
    <aside style={{ width: 240, flexShrink: 0 }} className="filter-sidebar">
      <div style={{ position: "sticky", top: 96 }}>
        <FilterContents />
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Зібрати**

Run: `npm run build`
Expected: `✓ built` без помилок.

- [ ] **Step 4: Візуальна перевірка**

Run: `npm run dev` → екран «Каталог». Сайдбар фільтрів — легкий: без рамки-картки, чекбокси без сірих лічильників, групи розділені тонкими лініями. Праворуч — грід/таблиця товарів.

- [ ] **Step 5: Commit**

```bash
git add src/components/Filters.jsx
git commit -m "feat(identity): lighten catalog filters (drop counts, remove card chrome)"
```

---

### Task 5 (опційно): Self-host Fixel та e-Ukraine замість CDN

Виконувати лише якщо потрібна незалежність від jsDelivr (продакшн). Інакше пропустити — CDN працює.

**Files:**
- Create: `public/fonts/*.woff2` (завантажені файли)
- Modify: `src/index.css` (блоки `@font-face` для Fixel та e-Ukraine — замінити CDN-URL на локальні `/fonts/...`)

**Interfaces:**
- Імена `font-family` ('Fixel Display', 'Fixel Text', 'e-UkraineHead', 'e-Ukraine') НЕ змінюються — лише `src` URL.

- [ ] **Step 1: Завантажити woff2 у `public/fonts`**

```bash
mkdir -p public/fonts
# Fixel (MacPaw)
for w in FixelDisplay-Bold FixelDisplay-ExtraBold FixelText-Regular FixelText-Medium FixelText-SemiBold FixelText-Bold; do
  curl -fsSL "https://cdn.jsdelivr.net/gh/MacPaw/fixel@master/fonts/webfonts/$w.woff2" -o "public/fonts/$w.woff2"
done
# e-Ukraine (Diia)
for w in e-UkraineHead-Medium e-UkraineHead-Bold e-Ukraine-Regular e-Ukraine-Medium e-Ukraine-Bold; do
  curl -fsSL "https://cdn.jsdelivr.net/gh/haos616/e-Ukraine@master/static/fonts/$w.woff2" -o "public/fonts/$w.woff2"
done
ls -1 public/fonts
```

Expected: 11 файлів `.woff2`.

- [ ] **Step 2: Замінити CDN-URL на локальні в `index.css`**

У `src/index.css` у блоках `@font-face` для Fixel та e-Ukraine замінити кожен `https://cdn.jsdelivr.net/gh/MacPaw/fixel@master/fonts/webfonts/<NAME>.woff2` на `/fonts/<NAME>.woff2`, і кожен `https://cdn.jsdelivr.net/gh/haos616/e-Ukraine@master/static/fonts/<NAME>.woff2` на `/fonts/<NAME>.woff2`. Імена файлів збігаються з кроком 1.

- [ ] **Step 3: Зібрати**

Run: `npm run build`
Expected: `✓ built` без помилок.

- [ ] **Step 4: Візуальна перевірка**

Run: `npm run dev`, у панелі перемкнути «Набір шрифтів» → Fixel та e-Ukraine. Шрифти застосовуються (мережа вантажить із `/fonts/...`, не з jsdelivr).

- [ ] **Step 5: Commit**

```bash
git add public/fonts src/index.css
git commit -m "chore(identity): self-host Fixel and e-Ukraine fonts"
```

---

## Self-Review (звірка плану зі спекою)

**Покриття вимог спеки:**
- Кольори (зелений/світлочорний/біле тло) як дефолт → Task 1. ✅
- Пресет «Schneider» дефолтним → Task 1 (Step 1-2). ✅
- Світлочорна смуга-герой + світла шапка → уже в `hybrid`; шліфування Task 3; шапка лишається `--paper`. ✅
- Картка/сторінка товару в стилі axiom → значною мірою досягається новими токенами (зелена ціна/кнопка, біле тло, чисті лінії) у наявних `ProductCard`. Окремого завдання-переписування не додаю (YAGNI) — наявна картка вже чиста; за потреби клієнт відкоригує після перегляду. ⚠️ свідоме обмеження.
- Каталог «фільтри ліворуч + грід праворуч» → уже реалізовано (`CatalogScreen` `.list-layout`); полегшення фільтрів — Task 4; фікс бага — Task 2. ✅
- Сховати «пісочницю», лишити перемикач шрифтів → Task 2. ✅
- Self-host шрифтів → Task 5 (опційно). ✅

**Без плейсхолдерів:** усі кроки містять конкретний код/команди. ✅

**Узгодженість типів/імен:** `colorTheme === "schneider"` вживається однаково в `APP_DEFAULTS` і гілці; імена змінних (`ink`, `bg`, `accColor` …) збігаються з наявним кодом `App.jsx`; імена `font-family` у Task 5 не змінюються. ✅

**Свідоме обмеження (логую, бо це не «покрито все»):** сторінка товару (`ProductScreen.jsx`) і детальне переписування картки під axiom НЕ входять у цей план — покладаємось на те, що нові колірні токени дають потрібний вигляд. Якщо після візуальної перевірки клієнт захоче ближче до axiom — це окремий план.
