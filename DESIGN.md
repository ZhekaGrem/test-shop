---
version: alpha
name: kv-electro
description: Мінімалістична айдентика магазину електрообладнання, натхнена Schneider — фірмовий зелений, світлочорний, велика типографіка.
colors:
  primary: "#3DCD58"
  primary-strong: "#1F9C3C"
  ink: "#1B1D1F"
  ink-muted: "#4A4F55"
  surface: "#FFFFFF"
  surface-alt: "#F4F4F5"
  surface-dark: "#17181A"
  on-dark: "#F3F2EE"
  line: "#ECEAE4"
  line-strong: "#DCD9D2"
  muted: "#7C828A"
  faint: "#A9AEB5"
  success: "#2F7D52"
  warning: "#B07A16"
  error: "#B23A26"
typography:
  headline-display:
    fontFamily: Onest
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Onest
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Onest
    fontSize: 21px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Onest
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Onest
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Onest
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.16em
  code:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  none: 0px
  xs: 3px
  sm: 5px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  "2xl": 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.ink}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 18px
  hero-band:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.headline-display}"
    padding: 40px
  chip-accent:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.primary-strong}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 6px
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: 12px
---

## Overview

Швейцарський мінімалізм у сервісі електрообладнання: багато повітря, велика впевнена типографіка, чисто-біла база й точкові світлочорні площини як крапки фокусу. Колірна айдентика взята з нових кольорів Schneider — яскравий зелений як єдиний драйвер взаємодії, світлочорний замість чистого `#000`. Темнота дає акцент, але не нагружає: одна темна смуга-герой, темний футер — решта дихає.

## Colors

- **Primary (#3DCD58):** Фірмовий зелений Schneider «Life Is On». Єдиний акцент взаємодії — CTA, ціни-акценти, статус «в наявності», мітки NEW, ховери. Світлий і яскравий, тому текст поверх нього завжди **темний** (`ink`), не білий.
- **Primary-strong (#1F9C3C):** Затемнений зелений для станів hover/active, де потрібен контраст із базовим акцентом.
- **Ink (#1B1D1F):** Світлочорний — основний текст, заголовки, тонкі лінії. М'якший за чистий чорний.
- **Ink-muted (#4A4F55):** Вторинний текст, описи, підписи.
- **Surface (#FFFFFF):** Базове тло контенту й карток.
- **Surface-alt (#F4F4F5):** Делікатні заливки, ховери, плейсхолдери зображень.
- **Surface-dark (#17181A):** Темні площини-акценти — смуга-герой, футер. Використовувати **точково**, не як суцільну тему.
- **On-dark (#F3F2EE):** Текст на темних площинах.
- **Line / Line-strong:** Тонкі роздільники та межі (`#ECEAE4` / `#DCD9D2`).
- **Muted / Faint:** Третинний текст і мета-підписи (`#7C828A` / `#A9AEB5`).
- **Success / Warning / Error:** Системні статуси. Зелений `success` стриманіший за `primary`, щоб не конкурувати з акцентом.

## Typography

Гарнітура **перемикається** в інтерфейсі (4 набори з повною українською кирилицею: Unbounded+Onest, Onest, Fixel, e-Ukraine). Токени нижче описують дефолтний набір — **Onest**; за зміни набору `fontFamily` дисплейних і текстових токенів змінюється відповідно. Усі гарнітури мають точну кирилицю (і, ї, є, ґ).

- **headline-display (48/800):** Великі заголовки героя — звичайний регістр (sentence-case) для читабельності кирилиці, тісний трекінг.
- **headline-lg / headline-md:** Заголовки секцій і назви товарів.
- **body-lg / body-md:** Основний текст.
- **label-md (11/700, tracking 0.16em):** Дрібні мітки-eyebrow і категорії — рендеряться ВЕРСАЛОМ (`text-transform: uppercase`). Єдине місце для капсу.
- **code:** Моноширинний IBM Plex Mono для артикулів і специфікацій (`A9F74340`).

## Layout

Контентна сітка центрована, максимальна ширина **1320px**. Каталог — двоколонковий: сайдбар фільтрів ліворуч (≈240px), грід/таблиця товарів праворуч. Шкала відступів `spacing` (4 → 64px) задає ритм; великі вертикальні проміжки між секціями підтримують відчуття простору.

## Elevation & Depth

Глибина мінімальна та стримана. Картки тримаються на тонких лініях (`line`), а не на важких тінях. Тіні — ледь помітні й лише для тимчасових шарів (модалки, toast, спливні елементи). Жодних градієнтів і світіння на контенті; контраст створюється світлочорними площинами, а не об'ємом.

## Shapes

Помірні заокруглення: `xs 3px` / `sm 5px` / `md 8px` (кнопки, інпути) / `lg 12px` (картки). `full` — для кружечків (бейджі, індикатори). Не змішувати гострі та заокруглені кути в одному блоці.

## Components

- **button-primary:** Головний CTA — зелений фон, **темний** текст (`ink`) для контрасту. Один на екран/секцію.
- **button-primary-hover:** Перехід на `primary-strong` у наведенні.
- **button-dark:** Світлочорна кнопка (напр. «Каталог») зі світлим текстом — для нейтральних дій на світлій базі.
- **card:** Біла картка, заокруглення `lg`, межа `line`, без важкої тіні.
- **hero-band:** Світлочорна смуга-герой із великим світлим заголовком і зеленим CTA — головна крапка фокусу.
- **chip-accent:** Мітка/тег фільтра — світла заливка, зелений текст `primary-strong`.
- **input-search:** Поле пошуку з межею `ink`.

## Do's and Don'ts

- Do використовувати `primary` (зелений) лише для однієї найважливішої дії в межах блоку.
- Do ставити **темний** текст (`ink`) на зеленому `primary` — білий текст не проходить WCAG AA на цьому відтінку.
- Do тримати чорний як точковий акцент (герой, футер), а не як суцільне темне тло сторінки.
- Do використовувати ВЕРСАЛ лише для дрібних міток (`label-md`); заголовки — sentence-case.
- Don't змішувати гострі та заокруглені кути в одному в'юпорті.
- Don't перевантажувати фільтри (лічильники, важкі рамки, зайві бейджі) — сайдбар має лишатися легким.
- Don't додавати градієнти, неонове світіння чи важкі тіні на контент.
- Do підтримувати контраст WCAG AA (4.5:1 для основного тексту).
