# Icon Component

This is the set of ~16 icons used internally within baseui that are safe to open source. This is not the set of uber-specific icons published internally as @uber/icons (though the API is intended to align with that to reduce confusion).

![image](https://user-images.githubusercontent.com/875591/45131331-51e8c500-b141-11e8-898d-ead83d44b345.png)

## Usage

```javascript
import * as React from 'react';
import {LeftArrow} from 'baseui/icon/left-arrow';

export default () => (
  <LeftArrow size="10px" color="#ccc" />
);
```

## Exports

* `Icon` (Base Icon component used by other exports below)

From left-to-right based on the image above:

* `DeleteAlt`
* `Search`
* `Delete`
* `Check`
* `ArrowUp`
* `ArrowDown`
* `ArrowLeft`
* `ArrowRight`
* `TriangleRight`
* `TriangleDown`
* `Upload`
* `Plus`
* `Grab`
* `Alert`
* `Menu`
* `ChevronRight`
* `ChevronLeft`
* `Spinner`
* `Overflow`
* `TriangleLeft`
* `TriangleUp`
* `Filter`
* `CheckIndeterminate`

## `Icon` API

* `size: number|string` - Optional, Defaults to `scale500` (12px)
  Size of element, will be passed to the svg width/height style. Can also be a baseui `theme.sizing` constant like `sizing500`.
* `color: string` - Optional, Defaults to `currentColor`
  Color of icon, will be used as svg fill
* `title: string` - Optional
  Allows you to override the SVG `<title>` label, which is used for accessibility
* `overrides: {Svg}`
  Override the implementation, styles, etc of the component internals.

## Dependencies

No dependencies

## Accessibility

Icons should have an `<title>` attribute in the SVG that describes the icon. If the icon is on a clickable element (button, etc) customer should add their own `aria-label` to that element.

<https://simplyaccessible.com/article/7-solutions-svgs/> (See #2, #6)

<https://www.w3.org/TR/svg-aam-1.0/>