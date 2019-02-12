# Slider Component

Represents control with sliding axis to choose a single value or range between min and max value.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default () => <Slider value={[50]} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {StatefulSlider} from 'baseui/slider';
import {styled} from 'styletron-react';

const CustomThumb = styled('div', {
  color: 'red',
  borderRadius: '5px',
});

export default () => {
  return <StatefulSlider
    min={-100}
    max={100}
    step={5}
    initialState={{value: [-20, 20]}}
    onChange={({value}) => {console.log((value)}}
    overrides={{
      Thumb: CustomThumb,
    }}
  />
}
```

## Exports

* `Slider`
* `StatefulSlider`
* `StatefulContainer`
* `StyledRoot`
* `StyledTrack`
* `StyledInnerTrack`
* `StyledTick`
* `StyledTickBar`
* `StyledThumb`
* `StyledInnerThumb`

## `Slider` API

* `value: Array<number>` - Required.
  * Selected points chosen on axis. It can be a single point (one thumb) or 2 points array (range thumbs).
* `step?: number`,
* `min?: number`,
* `max?: number`,
* `disabled?: boolean = false`
* `overrides?: {Root, Axis, StyledTick, Thumb} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Track?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `InnerTrack?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`  
  * `Tick?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `TickBar?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Thumb?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `InnerThumb?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `onChange?: ({value}) => void = () => {}`
  * Handler for events on trigger element, each time thumbs change selection, which is passed in `value`.

## `StatefulSlider` API

* `initialState?: {value?: Point | Array<Point>} = {}`
  * Initial state of an uncontrolled slider component.
    * `value` - an initial state of selected points on axis. It can be a single point (one thumb) or 2 points array (range thumbs).
* `stateReducer?: (type: string, nextState: {}, currentState: {}, event: SyntheticInputEvent<HTMLInputEvent>) => nextState`
  * A state change handler.
    * `type` - state change type
    * `nextState` - a new state changes that will be set
    * `currentState` - current full state of the component
* `step?: number`
* `min?: number`
* `max?: number`
* `disabled?: boolean = false`:
  * Disable control from being changed.
* `onChange?: ({value}) => void = () => {}`

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

`StyledRoot`, `StyledTrack`, , `StyledInnerTrack`, `StyledTick`, `StyledThumb`, `StyledInnerThumb`, `StyledTickBar`, `StyledAxisRange`

* `$disabled: boolean`
  * Disable control from being changed.
* `$min: number`
* `$max: number`
* `$step: number`
* `$isDragged: boolean`
* `$thumbIndex: number`
  * For `Thumb` and `InnerThumb` only. Index of thumb, which is rendered (0 for first thumb and 1 for second thumb).

## Accessibility

Should support keyboard hotkeys: `tab` - to switch between thumbs, `left` and `bottom` to decrease value of thumb, `right` and `up` to increase thumb value on axis
Accessibility best practices for this component (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `role=slider`)
