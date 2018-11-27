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

## `Avatar` API

* `name: string` - Required
  Defines an alternative text description of the image.
* `overrides: {}` - Optional
  * `Avatar: ?React.ComponentType` component to use for Avatar image styling.
  * `Root: ?React.ComponentType` component to use for containing element. displays if image fails to load.
* `size: string` - Optional. Defaults to `scale1000`
  Defines the width/height of the image. Must be an option from the $theme.sizing list otherwise, will use default.
* `src: string` - Required
  Image to display.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$didImageFailToLoad: boolean`
  Sets root element width/height if image fails to load.
* `$size: string`
  Sets img width. Provided value should map to an option in $theme.sizing. If not found, defaults to `scale1000`.

## Accessibility

Top level `name` prop will be set on the `<img>` element as its `alt` attribute.
If src fails to load, applies `aria-label` with provided name and `role` with 'img' to root div element.