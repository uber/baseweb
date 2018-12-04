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

* `value?: number = -1`
  * The current rating value.
* `numItems?: number = 5`
  * The total number of items to display.
* `onChange?: ({value}) => void = () => {}`
  * Callback that returns a newly selected value.
* `overrides?: {Root, Item} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for root Rating styling.
  * `Item?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for star ratings.

## `EmoticonRating` API

* `value?: number = -1`
  * The current rating value.
* `onChange?: ({value}) => void = () => {}`
  * Callback that returns a newly selected value.
* `overrides?: {Root, Item} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for root Rating styling.
  * `Item?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for emoticon ratings.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledStar`, `StyledEmoticon`

* `$isActive?: boolean = false`
  * Whether the current item is active.
* `$isSelected?: boolean = false`
  * Whether the current item is hovered/selected.
* `$index: number`
  * The current index of the item.

## Accessibility

This component will use the `[role="radiogroup"]` attribute with the following attributes for each individual rating item:

* `[role="radio"]`
* `[tabindex=0]`
* `[aria-setsize=5]` - total number of elements within the Rating
* `[aria-checked]` - if the rating is active
* `[aria-posinset]` - position within the Rating
