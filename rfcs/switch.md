# Switch Component

### Exports

* `StatefulSwitch`
* `StatefulContainer`
* `StyledLabel`
* `StyledRoot`
* `StyledSwitch`

### `Switch` API

* `checked: ?boolean`:
  check or uncheck the control. Default is `false`.
* `autoFocus: boolean`:
  make the control focused (active). Default is `false`
* `label: string`:
  String value for the label of the Switch. Default is empty string
* `disabled: boolean`:
  Disable control from being changed
* `isError: boolean`:
  Sets control into isError state. Default is `false`
* `components: {Root: (props: {[string]: any}) => React$Node, Node, StyledLabel: (props: {[string]: any}) => React$Node, StyledSwitch: (props: {[string]: any}) => React$Node}`
  * `Label` to render. Optional.
  * `StyledSwitch` may replace the original functionality of the Switch. If provided should follow the same interface and logic or may break the whole component
* `onChange: func`:
  handler for events on trigger element

### `StatefulSwitchContainer` API

* `initialState: {}`
  Initial state of an uncontrolled popover component.
  * `checked` - an initial checked state. Check or uncheck the control. Default is `false`.
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: func` should return `Switch` instance with standard or customized inner elements. It makes sense only for `StatefulSwitchContainer` and is ignored by `StatefulSwitch`
* `disabled: boolean`:
  Disable control from being changed
* `onChange: func`:
  handler for events on trigger element

### Usage

```js
import {StatefulSwitch, StyledSwitch, StyledLabel} from './index';

import {withStyle} from 'styletron-react';

const CustomSwitch = withStyle(StyledSwitch, {
  textColor: 'red',
});

const CustomLabel = withStyle(StyledLabel, {
  textColor: 'blue',
});

export default () => {
  return (
    <div>
      <StatefulSwitch
        initialState={{
          checked: true,
        }}
        disabled={false}
        onChange={this.onSwitchChange}
      >
        {childrenProps => {
          return (
            <CustomSwitch
              {...childrenProps}
              components={{
                Label: <CustomLabel>Click me</CustomLabel>,
              }}
            />
          );
        }}
      </StatefulSwitch>
      <StatefulSwitch onChange={this.onSwitchChange} />
    </div>
  );
};
```
