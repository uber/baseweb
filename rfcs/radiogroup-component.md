# RadioGroup Component

## Usage

### Basic usage

```js
import * as React from 'react';
import {Radio, StatefulRadioGroup} from 'baseui/radio';

export default () => {
  return
    <StatefulRadioGroup>
      <Radio value="first">First</Radio>
      <Radio value="second">Second</Radio>
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
        <Radio
          value="First"
          overrides={{
            Root: props => <div>Some custom root</div>,
            Label: props => <CustomLabel>Click me</CustomLabel>,
            RadioMark: props => <CustomRadioMark {...props} />,
          }}
        >
          First choice
        </Radio>
        <Radio
          value="Second"
          overrides={{
            Root: props => <div>Some custom root</div>,
            Label: props => <CustomLabel>Click me</CustomLabel>,
            RadioMark: props => <CustomRadioMark {...props} />,
          }}
        >
          Second choice
        </Radio>
      </StatefulRadioGroup>
    </div>
  );
};
```

## Exports

* `StatefulRadioGroup`
* `StatefulRadioGroupContainer`
* `RadioGroup`
* `Radio`
* `RadioMark`
* `Label`
* `Input`
* `Root`

## `RadioGroup` API

* `name?: string`:
  String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string
* `value?: string`:
  The value of radio button, which is preselected.
* `autoFocus?: ?boolean`:
  Set to be focused (active) on selected\checked radio. Default is `undefined`
* `disabled?: boolean`:
  Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them.
* `children: Array<React$Node>`
  As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package.
* `required?: boolean`:
  Set if the control is required to be checked. Default is `false`
* `isError?: boolean`:
  Sets radio group into error state. Default is `false`
* `align: 'vertical' | 'horizontal'`:
  How to position radio buttons in the group. Default is `vertical`
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the radio itself. Default is `right`
* `onChange: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onMouseEnter: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onMouseLeave: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onFocus: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onBlur: func`:
  handler for events on trigger element. Second argument provides index of radio button

## `StatefulRadioGroupContainer` API

* `initialState: {}`
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
  * `children: func` should return `RadioGroup` instance with standard or customized inner elements. It makes sense only for `StatefulRadioGroupContainer` and is ignored by `StatefulRadioGroup`
  * `disabled: boolean`:
* `name?: string`:
  String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string
* `value?: string`:
  The value of radio button, which is preselected.
* `autoFocus?: ?boolean`:
  Set to be focused (active) on selected\checked radio. Default is `undefined`
* `disabled?: boolean`:
  Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them.
* `children: Array<React$Node>`
  As `children` in React native approach represents radio buttons inside of Radio Group. Can use `Radio` from this package.
* `required?: boolean`:
  Set if the control is required to be checked. Default is `false`
* `isError?: boolean`:
  Sets radio group into error state. Default is `false`
* `align: 'vertical' | 'horizontal'`:
  How to position radio buttons in the group. Default is `vertical`
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the radio itself. Default is `right`
* `onChange: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onMouseEnter: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onMouseLeave: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onFocus: func`:
  handler for events on trigger element. Second argument provides index of radio button
* `onBlur: func`:
  handler for events on trigger element. Second argument provides index of radio button

## `Radio` API

* `Radio: ?boolean`:
  check or uncheck the control. Default is `false`.
* `children: React$Node`:
  Component or String value for label of checkbox. Default is empty string
* `disabled: boolean`:
  Disable control from being changed
* `isError: boolean`:
  Sets control into isError state. Default is `false`
* `components: {Root: (props: {[string]: any}) => React$Node, RadioMark: (props: {[string]: any}) => React$Node, Label: (props: {[string]: any}) => React$Node, , Input: (props: {[string]: any}) => React$Node}`

  * `Label` to render. Optional.
  * Custom `RadioMark` (exact control). If used, most of handlers may not work.
  * `Root` wrapper element for the whole radio control to apply styles
  * `Input` may replace original functionality of radio. If provided should follow the same interface and logic or may break the whole component
