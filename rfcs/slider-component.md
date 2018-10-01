# Slider Component

Represents control with sliding axis to choose a single value or range between min and max values.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default () => <Slider range={[
  {value: 0, label: '0, min'},
  {value: 100, label: '100, max'}
]} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {StatefulSlider} from 'baseui/slider';

export default () => {
  return <StatefulSlider
    range={[
      {value: 0, label: '0, min'},
      {value: 20, label: '20'},
      {value: 40, label: '40'},
      {value: 60, label: '60'},
      {value: 80, label: '80'},
      {value: 100, label: '100, max'}
    ]}
    initialState={{
      value: [{value: 20, label: '20'}, {value: 40, label: '40'}]
    }}
    onChange={(event, value)=>{console.log(value)}}
    overrides={{
      Thumb: props => <div style={{
        color: 'red',
        borderRadius: '5px',
      }}></div>,
    }}
    />
}
```

## Exports

* `Slider`
* `StatefulSlider`
* `StatefulSliderContainer`
* `StyledRoot`
* `StyledAxis`
* `StyledTick`
* `StyledTickBar`
* `StyledThumb`

## `Slider` API

* `range: Array<Point>` - Required
  All points present on slider axis. First and last point represent min and max value. Each `Point` can be a value itself (for primitive type) or if `Point` is `Object` it should have `value` and `label`. If more than 2 elements are present in array, they represent all ticks on axis and `step` property is ignored.
* `value: Point | Array<Point>` - Required
  Selected points chosen on axis. It can be a single point (one thumb) or 2 points array (range thumbs)
* `step: number` - Optional
  If `range` contains only min and max points (2 elements) step is to shift thumb every time user moves it left or right. If `step` in place `value` for each `Point` should be of primitive type
* `disabled: boolean`:
  Disable control from being changed  
* `overrides: {Root: (props: {[string]: any}) => React$Node, Axis: (props: {[string]: any}) => React$Node, StyledTick: (props: {[string]: any}) => React$Node, Thumb: (props: {[string]: any}) => React$Node}`
  * `Root` container element to render.
  * `Axis` is the range line element to render.
  * `Tick` to render a tick(label) for min, max and optional points on axis and on top of `Thumb`
  * `TickBar` to render a ticks container for min, max and optional points.
  * `Thumb` to render a thumb sliding over axis.
* `onChange: func(event, value)` - Optional
  handler for events on trigger element, each time thumbs change selection, which is passed in `value`

## `StatefulSlider` API

* `initialState: {}`
  Initial state of an uncontrolled slider component.
  * `value: Point | Array<Point>` - an initial state of selected points on axis. It can be a single point (one thumb) or 2 points array (range thumbs)
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `range: {Array<Point>}` - Required
  All points present on slider axis. First and last point represent min and max value. Each `Point` can be a value itself (for primitive type) or if `Point` is `Object` it should have `value` and `label`. If more than 2 elements are present in array, they represent all ticks on axis and `step` property is ignored.
* `step: number` - Optional
  If `range` contains only min and max points (2 elements) step is to shift thumb every time user moves it left or right. If `step` in place `value` for each `Point` should be of primitive type
* `disabled: boolean`:
  Disable control from being changed  
* `onChange: func(event, value)` - Optional
  handler for events on trigger element, each time thumbs change selection, which is passed in `value`

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
  Disable control from being changed
* `$isHovered: boolean`
  If component is hovered
* `$isActive: boolean`
  If component is active
* `$thumbIndex: number`
  For `Thumb` only. Index of thumb, which is rendered (0 for first thumb and 1 for second thumb)

## Accessibility

Should support keyboard hotkeys: `tab` - to switch between thumbs, `left` and `bottom` to decrease value of thumb, `right` and `up` to increase thumb value on axis
Accessibility best practices for this component (`aria-valuenow`, `aria-valuetext`, `aria-valuemin`, `aria-valuemax`, `role=slider`)
