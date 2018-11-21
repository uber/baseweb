# Rating Component

The `Rating` component includes two main types:

- `STAR` (default)
- `EMOTICON`

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
        onChange={value => {
          this.setState({ rating: value });
        }} />
    );
  }
}

export default EmoticonExample;
```

## Exports

* `Rating`
* `StyledRoot`
* `StyledStar`
* `StyledEmoticon`
* `StatefulContainer`
* `STATE_CHANGE_TYPE`
* `KIND`

## `Rating` API

* `kind: KIND` - Optional
  The type of `Rating` to display
* `value: number` - Optional
  The current rating value
* `onChange: () => value` - Optional
  Callback that returns a newly selected value

## Presentational components props API

### `StyledStar` and `StyledEmoticon`

* `$isActive: boolean`

## Accessibility

This component will use the `[role="radiogroup"]` attribute with the following attributes for each individual rating item:

- `[role="radio"]`
- `[tabindex=0]`
- `[aria-setsize=5]` - total number of elements within the Rating
- `[aria-checked]` - if the rating is active
- `[aria-posinset]` - position within the Rating
