# Rating Component

The `Rating` component includes two main types:

* `STAR` (default)
* `EMOTICON`

## Usage

### Basic usage (Star)

```javascript
import * as React from 'react';
import {Rating} from 'baseui/rating';

export default () => <Rating />;
```

### Advanced usage (Emoticon)

```javascript
import * as React from 'react';
import {Rating, KIND} from 'baseui/rating';

class EmoticonExample extends React.Component {
  state = {
    rating: 1
  };

  render() {
    return (
      <Rating
        kind={KIND.EMOTICON}
        value={this.state.rating}
        onChange={({value}) => {
          this.setState({ rating: value });
        }} />
    );
  }
}

export default EmoticonExample;
```

## Exports

* `Rating`
* `StatefulContainer`
* `StyledRoot`
* `StyledStar`
* `StyledEmoticon`
* `STATE_CHANGE_TYPE`
* `KIND`

## `Rating` API

* `kind: KIND` - Optional
  The type of `Rating` to display
* `value: number` - Optional
  The current rating value
* `onChange: ({value}) => void` - Optional
  Callback that returns a newly selected value
* `overrides: {}` - Optional
  * `Root: ?React.ComponentType` component to use for root Rating styling
  * `Star: ?React.ComponentType` component to use for star ratings
  * `Emoticon: ?React.ComponentType` component to use for emoticon ratings

## `StatefulContainer` API

* `children: (props: Props) => React.Node` - Required
* `initialState: {value: number}` - Optional
  Initial state of an uncontrolled input component. - `value` - an initial rating value
* `stateReducer: (type: 'change', nextState: {}, currentState: {}, e: Event) => stateToSet: {}` - Optional
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with
* `onChange: (e: SyntheticEvent<HTMLInputElement>) => void` - Optional
  onChange event handler.

## Presentational components props API

### `StyledStar` and `StyledEmoticon`

* `$isActive: boolean` - whether the current item is active
* `$isSelected: boolean` - whether the current item is hovered/selected
* `$index: number` - the current index of the item

## Accessibility

This component will use the `[role="radiogroup"]` attribute with the following attributes for each individual rating item:

* `[role="radio"]`
* `[tabindex=0]`
* `[aria-setsize=5]` - total number of elements within the Rating
* `[aria-checked]` - if the rating is active
* `[aria-posinset]` - position within the Rating
