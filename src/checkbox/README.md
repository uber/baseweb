# Checkbox Component

A checkbox control that is used for selecting multiple options from a set.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => {
  return
    <StatefulCheckbox
      checked={props.isEnabled}
      onChange={event => props.setEnabled(event.target.checked)}>
        Enabled
    </StatefulCheckbox>;
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {
  StatefulCheckbox,
  Checkbox,
  StatefulCheckboxContainer,
  Label,
  Checkmark,
} from 'baseui/checkbox';
import {withStyle} from 'styletron-react';

const CustomCheckbox = withStyle(Checkbox, {
  textColor: 'red',
});

const CustomLabel = withStyle(Label, {
  textColor: 'blue',
});

const CustomCheckmark = withStyle(Checkmark, {
  textColor: 'green',
});

export default () => {
  return (
    <div>
      <StatefulCheckboxContainer
        initialState={{
          checked: true,
        }}
        disabled={false}
        labelPlacement="left"
        onMouseEnter={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
      >
        {childrenProps => {
          return (
            <CustomCheckbox
              {...childrenProps}
              overrides={{
                Label: CustomLabel,
                Checkmark: CustomCheckmark,
              }}
            />
          );
        }}
      </StatefulCheckboxContainer>
      <StatefulCheckbox
        labelPlacement="right"
        onMouseEnter={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
      />
    </div>
  );
};
```

## Exports

* `Checkbox`
  * Use this component if you need to manage state yourself.
* `StatefulCheckbox`
  * Use this component if you'd like state to be managed by the component.
* `StatefulCheckboxContainer`
  * Use this component to wrap your own custom UI that can behave like a checkbox.
* `StyledRoot`
* `StyledCheckmark`
* `StyledLabel`
* `StyledInput`
* `STATE_TYPE`
  * State change types used by `StatefulCheckboxContainer`'s `stateReducer`.
* `STYLE_TYPE`
  * Used to display UI as a toggle switch or checkmark.

## `Checkbox` API

* `checked?: boolean = false`
  * Check or uncheck the control.
* `autoFocus?: boolean = false`
  Focus the checkbox on initial render.
* `checkmarkType?: $Values<STYLE_TYPE> = STYLE_TYPE.default`
  * the style to be applied to a checkmark.
* `children?: React.Node = ''`
  * Component or String value for label of checkbox.
* `disabled?: boolean = false`
  * Disable the checkbox from being changed.
* `required?: boolean = false`
  * Marks the checkbox as required.
* `isError?: boolean = false`
  Renders checkbox in errored state.
* `isIndeterminate?: boolean = false`
  Indicates a 'half' state for the checkmark. In this case, `checked` is ignored.
* `overrides?: {Root, Checkmark, Label, Input} = {}`
  * `Label?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Customized the label element.
  * `Checkmark?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Customizes the checkmark element. Note: If used, many handlers may not work.
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Wrapper element for the whole checkbox control including label.
  * `Input?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Replaces default functionality of checkbox. If provided, must maintain the same interface
      and logic or may break the whole component.
* `labelPlacement?: 'top' | 'right' | 'bottom' | 'left' = 'right'`
  * How to position the label relative to the checkbox itself.
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

## `StatefulCheckboxContainer` API

* `initialState?: {checked: boolean, isIndeterminate: boolean} = {checked: false, isIndeterminate: false}`
  * Initial state of an uncontrolled popover component.
    * `checked` - an initial checked state. Check or uncheck the control.
    * `isIndeterminate` - an initial indeterminate state. `checked` takes precedence over this value.
* `stateReducer?: (type: $Values<STATE_TYPE>, nextState: {}, currentState: {}, e: SyntheticInputEvent<HTMLInputElement>) => nextState`
  * A state change handler. Used to override default state transitions.
    * `type` - State change type.
    * `nextState` - A new state, provided by component transition, that will be set.
    * `currentState` - Current state of the component.
* `children: Function = ({checked: boolean, isIndeterminate: boolean, onChange, onMouseEnter, onMouseLeave, onFocus, onBlur}) => React.Node` - Required.
  * should return `Checkbox` instance with standard or customized inner elements. It makes sense only for
    `StatefulCheckboxContainer` and is ignored by `StatefulCheckbox`
* `disabled?: boolean = false`
  * Disable control from being changed.
* `labelPlacement?: 'top' | 'right' | 'bottom' | 'left' = 'right'`
  * How to position the label relative to the checkbox itself.
* `onChange?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for change events on trigger element.
* `onMouseEnter?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for mouseenter events on trigger element.
* `onMouseLeave?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for mouseleave events on trigger element.
* `onFocus?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for focus events on trigger element.
* `onBlur?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for blur events on trigger element.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledCheckmark`, `StyledInput`, `StyledLabel`, `StyledRoot`

* `$checked?: boolean = false`
  * Renders UI in 'checked' state.
* `$checkmarkType?: $Values<STYLE_TYPE> = STYLE_TYPE.default`
  * Renders UI as checkmark or toggle switch.
* `$disabled?: boolean = false`
  * Renders UI in 'disabled' state.
* `$isActive?: boolean = false`
  * Renders UI in 'active' state.
* `$isError?: boolean = false`
  * Renders UI in 'error' state.
* `$isFocused?: boolean = false`
  * Renders UI in 'focus' state.
* `$isHovered?: boolean = false`
  * Renders UI in 'hover' state.
* `$isIndeterminate?: boolean = false`
  * Renders UI in 'indeterminate' state.
* `$labelPlacement?: 'top' | 'right' | 'bottom' | 'left' = 'right'`
  * Determines label position in relation to input element.
* `$theme: theme`

## STATE_TYPE Constant

* `change`

## STYLE_TYPE Constant

* `default`
* `toggle`
