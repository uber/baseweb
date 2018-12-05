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

* `getProgressLabel?: (value, successValue) => React.Node`
  * The function that returns a progress bar label to display.
* `overrides?: {Root, Bar, BarProgress, Label} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Bar?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `BarProgress?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Label?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `successValue?: number = 100`
  * A custom completion value.
* `showLabel?: boolean = false`
  * If set to false, label is hidden and `getProgressLabel` is ignored.
* `value: number` - Required
  * The value between `0` and `100 | successValue` of the progress indicator.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

`StyledRoot`, `StyledBar`, `StyledBarProgress`, `StyledLabel`

* `$successValue: number`
* `$value: number`
* `$theme: theme`

## Accessibility

* ProgressBar has a `role="progressbar"` and `aria-valuenow={number}` set
