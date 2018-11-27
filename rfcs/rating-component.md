# Rating Components

The `Rating` pattern includes 2 main components:

* `StarRating` - custom number of items
* `EmoticonRating` - fixed number of items

## Usage

### Basic usage (Star)

```javascript
import * as React from 'react';
import {StarRating} from 'baseui/rating';

export default () => <StarRating />;
```

### Advanced usage (Emoticon)

```javascript
import * as React from 'react';
import {EmoticonRating} from 'baseui/rating';

class EmoticonExample extends React.Component {
  state = {
    rating: 1
  };

  render() {
    return (
      <EmoticonRating
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

* `StarRating`
* `EmoticonRating`
* `StyledRoot`
* `StyledStar`
* `StyledEmoticon`

## `StarRating` API

* `value: number` - Optional
  The current rating value
* `numItems: number` - Optional
  The total number of items to display
* `onChange: ({value}) => void` - Optional
  Callback that returns a newly selected value
* `overrides: {}` - Optional
  * `Root: ?React.ComponentType` component to use for root Rating styling
  * `Item: ?React.ComponentType` component to use for star ratings

## `EmoticonRating` API

* `value: number` - Optional
  The current rating value
* `onChange: ({value}) => void` - Optional
  Callback that returns a newly selected value
* `overrides: {}` - Optional
  * `Root: ?React.ComponentType` component to use for root Rating styling
  * `Item: ?React.ComponentType` component to use for star ratings

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
