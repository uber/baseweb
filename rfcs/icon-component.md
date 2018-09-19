# Icon Component

## Basic Usage

```javascript
import * as React from 'react';
import ArrowLeft from 'baseui/icon/arrow-left';

export default () => (
  <ArrowLeft size="10px" color="#ccc" />
);
```

## Advanced Usage

```javascript
import * as React from 'react';
import Delete from 'baseui/icon/delete';

export default () => (
  <Delete
    overrides={{
      Svg: {
        style: {margin: '5px'}
      }
    }}
    size="10px"
    color="scale300"
    title="custom a11y title tag"
  />
);
```

## Usage with Button

```javascript
import * as React from 'react';
import {Button} from 'baseui/button';
import Upload from 'baseui/icon/upload';

export default () => (
  <Button endEnhancer={() => <Upload />}>Upload</Button>
);
```

## Exports

* `Icon` (Base Icon component used by other exports below)
* `Alert`
* `ArrowDown`
* `ArrowLeft`
* `ArrowRight`
* `ArrowUp`
* `Check`
* `CheckIndeterminate`
* `ChevronLeft`
* `ChevronRight`
* `Delete`
* `DeleteAlt`
* `Filter`
* `Grab`
* `Menu`
* `Overflow`
* `Plus`
* `Search`
* `Spinner`
* `TriangleDown`
* `TriangleLeft`
* `TriangleRight`
* `TriangleUp`
* `Upload`

## `Icon` API

* `size: number|string` - Optional, Defaults to `scale500` (12px)
  Size of element, will be passed to the svg width/height style. Can also be a baseui `theme.sizing` constant like `scale500`.
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