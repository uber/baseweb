# Spinner

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => {
  return
    <Spinner
      variant={Spinner.VARIANT.INDETERMINATE}
      size={10}
    />;
};
```

## Exports

* `Spinner`

## `Spinner` API

* `value: ?number` - Optional
  The value of the progress indicator for the determinate and static variants. Value between `0` and `100`, defaults to `0`.
* `size: ?number` - Optional
  The size of the circle. Defaults to `44`.
* `color: ?string` - Optional
  The color to be used for the spinner
* `backgroundColor: ?string` - Optional
  The color to be used for the background circle

## Accessibility

The following attribute should be applied to the element: `role="progressbar"`. To learn more check out the [MDN ProgressBar Role] article

[MDN ProgressBar Role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role
