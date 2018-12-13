---
category: Introduction
page: Responsive Props
---

# Responsive Style Props / Breakpoints

Sometimes it might be useful to adjust style properties (margin, padding, width...) across a singular dimension to achieve responsiveness. This would be normally done through nested style objects using media queries. However, managing media queries manually can be tedious. We provide a shorthand syntax that maps values into a set of mobile-first breakpoints. This idea is adapted from [styled-system](https://github.com/jxnblk/styled-system). This syntax is supported only for props and components where it makes sense (for example the Block component).

```jsx
<Block
  padding={[
    'scale100', // 4px (scale100) below the smallest breakpoint
    'scale200', // 6px (scale200) from the next breakpoint and up
    'scale300', // 8px (scale300) from the next breakpoint and up
    'scale400', // 10px (scale400) from the next breakpoint and up
  ]}
/>
```

would generate

```css
padding: 4px;
@media screen and (min-width: 40em) {
  padding: 6px;
}
@media screen and (min-width: 52em) {
  padding: 8px;
}
@media screen and (min-width: 64em) {
  padding: 10px;
}
```

The set of breakpoints can be found in `$theme.breakpoints`. By default we support 4 steps:

* default (mobile)
* min-width: 40em (tablet)
* min-width: 52em (desktop)
* min-width: 64em (large desktop)

Since this is a part of theme definition, you can override it with your custom theme.
