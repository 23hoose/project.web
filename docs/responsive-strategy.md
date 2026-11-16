# Responsive Strategy — «Путь к дому»

## Найденные проблемы layout

### Проблема 1: Меню шапки на узких экранах (≤ 600px)

**Диапазон:** 320–600px.
**Что происходит:** логотип «Путь к дому» переносится на 3 строки, меню наезжает на логотип, правая ссылка «Волонтёрство» выходит за правый край экрана. Возникает горизонтальный overflow.
**Причина:** `.header` — `display: flex; justify-content: space-between`. Логотип и навигация не влезают в одну строку на узком экране. Меню не переносится.
**Решение:** `@media (max-width: 600px)` — перевести `.header` в `flex-direction: column`, уменьшить размер логотипа, разрешить меню переноситься (`flex-wrap: wrap`) с меньшим `gap`.

### Проблема 2: Количество колонок в карточках не соответствует доступному месту (768px)

**Диапазон:** ~700–900px.
**Что происходит:** на ширине 768px карточки «Как можно помочь» идут в 2 колонки, хотя влезли бы 3 (если ужать каждую).
**Причина:** Flexbox с `flex: 1 1 260px` + `flex-wrap` не умеет пересчитывать количество колонок оптимально. Он переносит на новую строку только когда суммарная ширина + gap превышают контейнер.
**Решение:** перевести `.cards` на **CSS Grid** с `repeat(auto-fit, minmax(260px, 1fr))`. Grid сам подбирает количество колонок от минимальной ширины карточки и доступного места.

## CSS Grid для карточек

`repeat(auto-fit, minmax(260px, 1fr))`:

- `minmax(260px, 1fr)` — каждая колонка не уже 260px, но может расти.
- `auto-fit` — сколько колонок помещается, столько и создаётся.
- Пустые колонки схлопываются, карточки растягиваются.

**Результат:** 320px → 1 колонка, 768px → 2–3 колонки, 1440px → 4 колонки. Без единого `@media` для карточек.

## Fluid sizing

- Контейнер: `max-width: 1200px` (уже есть).
- Заголовки: `font-size: clamp(1.75rem, 4vw, 2.5rem)` — плавный размер.
- Изображения: `max-width: 100%; height: auto` (уже есть).
- Карточки: `minmax(260px, 1fr)` — без фиксированной ширины.

## Media query (только один — для шапки)

```css
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md, 1rem);
  }

  .header__nav-list {
    flex-wrap: wrap;
    gap: var(--space-sm, 0.5rem);
  }

  .header__logo {
    font-size: var(--fs-base, 1rem);
  }
}

## Transition и prefers-reduced-motion

- Все `transition` привязаны к конкретным properties (`box-shadow`, `transform`, `background-color`), не `all`.
- Добавить `@media (prefers-reduced-motion: reduce)` — отключить transition и transform для пользователей, отключивших анимации.

## DevTools и stress test

- Плавный resize от 1440 до 320 — проверить, что ничего не ломается.
- DevTools → Elements → `.cards` → Layout → **Grid overlay** — показать tracks, gap.
- DevTools → Styles → проверить matched rules для `@media (max-width: 600px)`.
- Zoom 200% — проверить, что layout устойчив.
- Длинный заголовок — не должен ломать карточку.