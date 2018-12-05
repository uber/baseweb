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

* `current?: number = 0`
  * Defines the current active step index.
* `overrides: {Root} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `Step` and `NumberedStep` API

* `title?: React.Node = null`
  * The title of the Step.
* `isActive?: boolean = false`
  * Defines if the step is currently active.
* `isCompleted?: boolean = false`
  * Defines if the step is completed.
* `isLast?: boolean = false`
  * Defines if the step is the last item displayed.
* `overrides?: {Root, Icon, InnerIcon, Tail, Content, Title, Description} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Icon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `InnerIcon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Tail?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Content?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Title?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Description?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `children?: (props: Props) => React.Node = null`

## Presentational components props API

`StyledProgressSteps`, `StyledStep`, `StyledIcon`, `StyledInnerIcon`, `StyledContent`,
`StyledContentTitle`, `StyledContentTail`, `StyledContentDescription` `StyledNumberStep`,
`StyledNumberIcon`, `StyledNumberContentTail`

These properties are passed to every presentational (styled) component that is exported:

* `$isActive: boolean`
* `$isCompleted: boolean`
* `$theme: theme`
