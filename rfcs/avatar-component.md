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
  * `Avatar: ?React.ComponentType` component to use for Avatar image styling
* `size: string` - Optional. Defaults to `scale1000`
  Defines the width of the image. Should be an option from the $theme.sizing list otherwise, will use default.
* `src: string` - Required
  Image to display.

## `StatefulAvatarContainer` API

* All props of a `Avatar` component. Handles displaying fallback color if provided src image fails to load.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$size: string`
  Sets img width. Provided value should map to an option in $theme.sizing. If not found, defaults to `scale1000`.

## Accessibility

Top level `name` prop will be set on the `<img>` element as its `alt` attribute.