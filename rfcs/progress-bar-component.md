# Progress Bar Component

Progress bar is used to indicate a progress towards the completion of a task.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

export default () => <ProgressBar value={55} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

export default () => {
  return
    <ProgressBar
      value={value}
      getProgressLabel={(value) => `${value}% Loaded`}
      overrides={{
        Label: CustomLabel,
      }}
    />;
}
```

## Exports

* `ProgressBar`
* `StyledRoot`
* `StyledBar`
* `StyledBarProgress`
* `StyledLabel`

## `ProgressBar` API

* `getProgressLabel: (value, successValue) => node` - Optional
  The function that returns a progress bar label to display
* `overrides: {Root, Bar, BarProgress, Label}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `successValue: number` - Optional, Defaults to 100
  A custom completion value
* `showLabel: boolean` - Optional. Default is `false`
  If set to false, label is hidden and `getProgressLabel` is ignored.
* `value: number` - Required
  The value between `0` and `100 | successValue` of the progress indicator.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$successValue: number`
* `$value: number`
* `$theme: theme`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

* ProgressBar has a `role="progressbar"` and `aria-valuenow={number}` set
