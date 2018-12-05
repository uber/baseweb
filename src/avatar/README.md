# Avatar Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Avatar} from 'baseui/avatar';

export default () => <Avatar name="Jane Doe" src="https://url-of-img.jpg" />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Avatar} from 'baseui/avatar';

export default () => (
  <Avatar
    name="Jane Doe"
    overrides={{
      Avatar: {border: '2px solid blue'}
    }}
    size="scale1000"
    src="https://img-may-not-exist.jpg"
  />
);
```

## Exports

* `Avatar`
* `StatefulAvatar`
* `StyledAvatar`
* `StyledRoot`

## `Avatar` API

* `name: string`
  * Defines an alternative text description of the image.
* `overrides?: {Avatar, Root} = {}`
  * `Avatar?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for Avatar image styling.
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for containing element. Displays if image fails to load.
* `size?: string = 'scale1000'`
  * Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width.
* `src: string`
  * Image to display.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledAvatar`, `StyledRoot`

* `$didImageFailToLoad: boolean`
  * Sets root element width/height if image fails to load.
* `$size: string`
  * Defines the width/height of the image. Accepts labels from theme.sizing, or passes value to height/width.

## Accessibility

* Top level `name` prop will be set on the `<img>` element as its `alt` attribute.
* If src fails to load, applies `aria-label` with provided name and `role` with 'img' to root div element.
