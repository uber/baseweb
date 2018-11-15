# Progress Steps Component

Progress steps are used for multi-step flows where indicating the number of steps in a process is important.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {ProgressSteps, Step} from 'baseui/progress-steps';

export default () => {
  return (
    <ProgressSteps current={1}>
        <Step title="Create Account">
          Example content
        </Step>
        <Step title="Add Users">
          Example content
        </Step>
      </ProgressSteps>
  );
}
```

### Numbered Step Usage

```javascript
import * as React from 'react';
import {ProgressSteps, NumberedStep} from 'baseui/progress-steps';

export default () => {
  return (
    <ProgressSteps current={1}>
      <NumberedStep title="Create Account">
        Example content
      </NumberedStep>
      <NumberedStep title="Add Users">
        Example content
      </NumberedStep>
    </ProgressSteps>
  );
}
```

## Exports

* `ProgressSteps`
* `Step`
* `NumberedStep`
* `StyledProgressSteps`
* `StyledStep`
* `StyledIcon`
* `StyledInnerIcon`
* `StyledContent`
* `StyledContentTitle`
* `StyledContentTail`
* `StyledContentDescription`
* `StyledNumberStep`
* `StyledNumberIcon`
* `StyledNumberContentTail`

## `ProgressSteps` API

* `current: number` - Optional, Defaults to 0
  Defines the current active step index
* `overrides: {Root}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

## `Step` and `NumberedStep` API

* `title: React.Node` - Optional
  The title of the Step
* `isActive: boolean` - Optional
  Defines if the step is currently active
* `isCompleted: boolean` - Optional
  Defines if the step is completed
* `isLast: boolean` - Optional
  Defines if the step is the last item displayed
* `overrides: {Root, Icon, InnerIcon, Tail, Content, Title, Description}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `children: (props: Props) => React.Node` - Optional

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$theme: theme`
* `$isActive: boolean`
* `$isCompleted: boolean`
