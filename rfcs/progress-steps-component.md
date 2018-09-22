# Progress Steps Component

Progress steps are used for multi-step flows where indicating the number of steps in a process is important.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {ProgressSteps} from 'baseui/progress-steps';

export default () => {
  return (
    <ProgressSteps current={2}>
      <Step title="Step 1" />
      <Step title="Step 2" />
      <Step title="Step 3" />
    </ProgressSteps>
  );
}
```

### Advanced usage

```javascript
import * as React from 'react';
import {ProgressSteps, StyledNumberedStep} from 'baseui/progress-steps';

export default () => {
  const overrides ={
    Step: props => <StyledNumberedStep {...props}/>,
    StepTitle: props => <CustomTitle {...props} />,
  };
  return
    <ProgressSteps
      onClick={(idx)=>{console.log(`step ${idx} is clicked`)}}
    >
      <Step title="Step 1" overrides={overrides} />
      <Step title="Step 2"  overrides={overrides}>Some subtitle here</Step>
    </ProgressSteps>;
}
```

## Exports

* `ProgressSteps`
* `Step`
* `StyledRoot`
* `StyledDefaultStep`
* `StyledNumberedStep`
* `StyledStepConnector`
* `StyledStepTitle`
* `StyledStepSubtitle`
* `StyledStepText`
* `ORIENTATION`

## `ProgressSteps` API

* `current: type` - Optional, Defaults to 0
  Defines the current active step index
* `onClick: (index) => {}` - Optional
  A callback that is invoked when a Step component gets a click event  
* `orientation: ORIENTATION.horizontal | ORIENTATION.vertical` - Optional, Defaults to `ORIENTATION.vertical`
  Defines the layout flow direction
* `overrides: {Root, Step, StepConnector, StepTitle}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

## `Step` API

* `disabled: boolean` - Optional
  Defines if the step is disabled
* `isActive: boolean` - Optional
  Defines if the step is currently active
* `isCompleted: boolean` - Optional
  Defines if the step is completed

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$isActive: boolean`
* `$isCompleted: boolean`
* `$orientation: ORIENTATION.horizontal | ORIENTATION.vertical`
* `$theme: theme`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?
