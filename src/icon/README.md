# Icon Component

## Basic Usage

```javascript
import * as React from 'react';
import ArrowLeft from 'baseui/icon/arrow-left';

export default () => <ArrowLeft size="10px" color="#ccc" />;
```

## Advanced Usage

```javascript
import * as React from 'react';
import Delete from 'baseui/icon/delete';

export default () => (
  <Delete
    overrides={{
      Svg: {
        style: {margin: '5px'},
      },
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

export default () => <Button endEnhancer={() => <Upload />}>Upload</Button>;
```

## Exports

* `Icon` (Base Icon component used by other exports below)
* `StyledSvg` (Default element used to render svg)
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

* `size?: number | string = 'scale500'`
  * Size of element, will be passed to the svg width/height style. Can also be a value included in
  baseui `theme.sizing` like `scale500`.
* `color?: string = 'currentColor'`
  * Color of icon, will be used as svg fill
* `title?: string = null`
  * Allows you to set the SVG `<title>` label, which is used for accessibility
* `overrides?: {Svg} = {}`
  * `Svg: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledSvg`

* `$size?: number | string = 'scale500'`
  * Size of svg element.
* `$theme: theme`

## Accessibility

Icons should have an `<title>` attribute in the SVG that describes the icon. If the icon is on a clickable element (button, etc) customer should add their own `aria-label` to that element.

<https://simplyaccessible.com/article/7-solutions-svgs/> (See #2, #6)

<https://www.w3.org/TR/svg-aam-1.0/>

## Development

The source data for icons should be placed in the svg/ folder.

`icon-template.txt` can be used to change what the React component for icons look like

Run `yarn icon:generate` to build all icons.
