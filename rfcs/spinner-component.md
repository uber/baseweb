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
* `VARIANT`

## `Spinner` API

* `variant: 'determinate' | 'indeterminate' | 'static'`
   The variant to use. Use indeterminate when there is no progress value. Defaults to `indeterminate`.
* `value: ?number` - Optional
  The value of the progress indicator for the determinate and static variants. Value between `0` and `100`, defaults to `0`.
