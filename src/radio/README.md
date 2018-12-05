# RadioGroup Component

A radio control that is used to select a single option from set.

## Usage

### Basic usage

```js
import * as React from 'react';
import {Radio, StatefulRadioGroup} from 'baseui/radio';

export default () => {
  return
    <StatefulRadioGroup>
      <StyledRadio value="first">First</Radio>
      <StyledRadio value="second">Second</Radio>
    </StatefulRadioGroup>;
};
```

### Advanced usage

```js
import * as React from 'react';
import {StatefulRadioGroup, RadioMark, Label, Radio} from 'baseui/radio';
import {withStyle} from 'styletron-react';

const CustomLabel = withStyle(Label, {
  textColor: 'blue',
});

const CustomRadioMark = withStyle(RadioMark, {
  textColor: 'green',
});

export default () => {
  return (
    <div>
      <StatefulRadioGroup
        name="BestGroupEver"
        align="horizontal"
        labelPlacement="left"
        onMouseEnter={this.onRadioGroupHover}
        onChange={this.onRadioGroupChange}
      >
        <StyledRadio
          value="First"
          overrides={{
            Label: CustomLabel,
            RadioMark: CustomRadioMark,
          }}
        >
          First choice
        </StyledRadio>
        <StyledRadio
          value="Second"
          overrides={{
            Label: CustomLabel,
            RadioMark: CustomRadioMark,
          }}
        >
          Second choice
        </StyledRadio>
      </StatefulRadioGroup>
    </div>
  );
};
```

## Exports

* `StatefulRadioGroup`
* `StatefulRadioGroupContainer`
* `RadioGroup`
* `StyledRoot`
* `StyledLabel`
* `StyledInput`
* `StyledRadio`
* `StyledRadioMark`
* `StyledRadioMarkInner`
* `StyledRadioMarkOuter`
* `StyledRadioGroupRoot`

## `RadioGroup` API

* `name?: string = <random string>`:
  * String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string.
* `value?: string = undefined`:
  * The value of radio button, which is preselected.
* `autoFocus?: boolean = undefined`:
  * Set to be focused (active) on selected\checked radio.
* `disabled?: boolean = false`:
  * Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them.
* `children: Array<React.Node>`
  * As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package.
* `required?: boolean = false`:
  * Set if the control is required to be checked.
* `isError?: boolean = false`:
  * Sets radio group into error state.
* `align: 'vertical' | 'horizontal' = 'vertical'`:
  * How to position radio buttons in the group.
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left' = 'right'`:
  * How to position the label relative to the radio itself.
* `onChange?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for change events on trigger element.
* `onMouseEnter?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * handler for mouseenter events on trigger element.
* `onMouseLeave?: func = () => {}`:
  * handler for mouseleave events on trigger element.
* `onFocus?: func = () => {}`:
  * handler for focus events on trigger element.
* `onBlur?: func = () => {}`:
  * handler for blur events on trigger element.

## `StatefulRadioGroupContainer` API

* `initialState: {value?: string} = {}`
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: ({autoFocus?: boolean, overrides?: {}, onChange: SyntheticInputEvent<HTMLInputEvent>}) => React.Node`
  * should return `RadioGroup` instance with standard or customized inner elements. It makes sense only for `StatefulRadioGroupContainer` and is ignored by `StatefulRadioGroup`
* `disabled?: boolean = false`:
* `name?: string = <random string>`:
  * String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string
* `value?: string = undefined`:
  * The value of radio button, which is preselected.
* `autoFocus?: boolean = false`:
  * Set to be focused (active) on selected\checked radio.
* `disabled?: boolean = false`:
  * Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them.
* `children: Array<React.Node>`
  * As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package.
* `required?: boolean = false`:
  * Set if the control is required to be checked.
* `isError?: boolean = false`:
  * Sets radio group into error state.
* `align: 'vertical' | 'horizontal' = 'vertical'`:
  * How to position radio buttons in the group.
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left' = 'right'`:
  * How to position the label relative to the radio itself.
* `onChange?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for change events on trigger element.
* `onMouseEnter?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * handler for mouseenter events on trigger element.
* `onMouseLeave?: func = () => {}`:
  * handler for mouseleave events on trigger element.
* `onFocus?: func = () => {}`:
  * handler for focus events on trigger element.
* `onBlur?: func = () => {}`:
  * handler for blur events on trigger element.

## `Radio` API

* `checked?: boolean = false`:
  * Check or uncheck the control.
* `children: React.Node = ''`:
  * Component or String value for label of checkbox.
* `disabled?: boolean = false`:
  * Disable control from being changed.
* `isError?: boolean = false`:
  * Sets control into isError state.
* `overrides?: {Root, Checkmark, Label, Input} = {}`
  * `Label?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Customizes the label element.
  * `Checkmark?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Customizes the checkmark element. Note: If used, many handlers may not work.
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Wrapper element for the whole checkbox control including label.
  * `Input?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Replaces default functionality of checkbox. If provided, must maintain the same interface and logic or may break the whole component.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledRoot`, `StyledLabel`, `StyledInput`, `StyledRadio`, `StyledRadioMark`
`StyledRadioMarkInner`, `StyledRadioMarkOuter`, `StyledRadioGroupRoot`

* `$checked?: boolean = false`
  * Renders UI in 'checked' state.
* `$disabled?: boolean = false`
  * Renders UI in 'disabled' state.
* `$isError?: boolean = false`
  * Renders UI in 'error' state.
* `$isFocused?: boolean = false`
  * Renders UI in 'focus' state.
* `$isHovered?: boolean = false`
  * Renders UI in 'hover' state.
* `$labelPlacement?: 'top' | 'right' | 'bottom' | 'left' = 'right'`
  * Determines label position in relation to input element.
* `$theme: theme`
