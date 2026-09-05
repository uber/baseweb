# Bug & Refactor Findings — `src/a11y` … `src/button`

Findings from a review of `src/a11y`, `src/accordion`, `src/app-nav-bar`,
`src/aspect-ratio-box`, `src/avatar`, `src/badge`, `src/banner`, `src/block`,
`src/bottom-navigation`, `src/breadcrumbs`, `src/button` (2026-09-05). Each
entry was confirmed against the source before being listed here.

Status legend: `Open` (not yet addressed). Entries that have been fixed and
merged to `main` are removed from this list.

## Crashes / severe functional breaks

| Status | File:Line | Summary |
|---|---|---|
| Open | `src/a11y/a11y.tsx:38` | `map[target] = map[target].push(violation)` assigns `push`'s return value (a number), not the array. A 3rd violation on the same DOM node throws `TypeError`. |
| Open | `src/app-nav-bar/app-nav-bar.tsx:173-175` | Evaluation-order bug: the mobile block reads `secondaryMenu`/`mobileSubNavPosition` before the desktop `mainItems.map()` (which assigns them) runs, so the mobile horizontal sub-nav can never render. Source has a `// @ts-expect-error always false` comment acknowledging this. |
| Open | `src/button-group/button-group.tsx:140-160` | `overrides: { BaseButton: {...}, ...child.props.overrides }` — if a child button also sets `overrides.BaseButton`, the shallow spread drops the injected `aria-checked`/`role`, breaking radio/checkbox semantics. |
| Open | `src/button/button.tsx:38-46` | `internalOnClick` only checks `isLoading`, never `disabled`. A `Button` rendered as `<a href>` with `disabled` stays keyboard-operable (Tab + Enter still fires `onClick`). |
| Open | `src/bottom-navigation/bottom-navigation.tsx:82` | `isActive={displayOverflow \|\| activeKey > 4}` is off-by-one; index `4` (the item reachable only via "More") never highlights the overflow selector even though its panel is shown. |
| Open | `src/bottom-navigation/bottom-navigation.tsx:101` | `aria-labelledby` on `Panel` references an id that `Selector` never renders — unconditionally broken tab/tabpanel association for screen readers. |
| Open | `src/button/styled-components.ts:803` | `getShapeStyles` handles `SHAPE.circle`/`SHAPE.square` but omits `SHAPE.round` (handled elsewhere in the file), so `shape="round"` buttons don't get fixed height/width and render as an oval/rectangle instead of a circle. |
| Open | `src/block/styled-components.ts:346-350` | The `flexWrap` style transform ignores its input and always returns `'wrap'`, so `flexWrap={false}` has no effect. |
| Open | `src/banner/styled-components.ts:123-149` | `StyledTrailingIconButton` (a raw `<button>`) has no `type="button"`, so it defaults to `type="submit"` and can unintentionally submit an enclosing `<form>`. |

## Structural issues (bug **and** worthwhile refactor)

| Status | File:Line | Summary |
|---|---|---|
| Open | `src/bottom-navigation/bottom-navigation.tsx:47,98` | Same pattern as the (fixed) accordion `itemRefs` bug: `NavItemPanelRefs.current.push(element)` in an inline ref callback grows unbounded and can desync from `idx` as React re-attaches on every render. |
| Open | `src/app-nav-bar/utils.ts:34-51` | `mapItemsActive` mutates the `NavItem` objects passed to it (`current.active = ...`) instead of returning new objects — risks corrupting shared/reused data. |
| Open | `src/app-nav-bar/mobile-menu.tsx:92` | `const [currentNavItems, setCurrentNavItems] = React.useState(items)` seeds from props once and never re-syncs; if `userItems`/`username` load asynchronously after mount, the mobile drawer keeps showing the stale list. |
| Open | `src/app-nav-bar/types.ts:22` + `src/app-nav-bar/styled-components.ts:60-61` | `SubnavContainer` override key is declared and styled but never wired into `app-nav-bar.tsx` (the real container uses `SecondaryMenuContainer`) — a silently no-op override. |
| Open | `src/accordion/panel.tsx:124-134` | `useMemo` performs a side effect (`setLocalState`) and dereferences `_animateRef.current` without the null check used elsewhere in the same file (line 102). |

## Minor / low-impact

| Status | File:Line | Summary |
|---|---|---|
| Open | `src/avatar/avatar.tsx:44-53` | When `src` changes from a string to a non-string, the effect never clears `imageRef.current.src`, leaving a stale URL on the DOM node (currently masked by CSS `display: none`). |
| Open | `src/aspect-ratio-box/aspect-ratio-box-body.tsx:23-26` | `top={top \|\| 0}` etc. use falsy defaults, so an explicit `0` from the caller is indistinguishable from "not provided." |
| Open | `src/a11y/a11y.tsx:106-107` | `` `${offset.top}px` \|\| '0px' `` is always a non-empty string, so the `'0px'` fallback is dead code. |

## Suggested next priority

Among the open items, the remaining crash/functional-break group is highest
value, roughly in this order:

1. `src/a11y/a11y.tsx:38` — crash bug, small isolated fix.
2. `src/button-group/button-group.tsx:140-160` — breaks a11y semantics (radio/checkbox).
3. `src/app-nav-bar/app-nav-bar.tsx:173-175` — mobile sub-nav never renders.
4. `src/button/button.tsx:38-46` — disabled anchor-button still operable via keyboard.
