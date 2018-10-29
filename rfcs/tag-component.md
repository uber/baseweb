# Tag Component

## Usage

### Basic usage

```js
import {Tag} from 'baseui/tag';

export default () => {
  return (
    <Tag>I am a tag!</Tag>
  );
}
```

### Advanced usage

```js
import {Tag, Root, Action} from 'baseui/tag';
import {styled} from 'baseui';

const CustomRoot = styled(Root, {
  textColor: 'red',
});

const CustomAction = styled(Action, {
  backgroundColor: 'green',
});

export default () => {
  return (
    <div>
      <Tag
        onActionClick={({event, children}) => {}}
        disabled={false}
        overrides={{
          Root: CustomRoot,
          Action: CustomAction,
        }}
      >
        I am Tag
      </Tag>
    </div>
  );
};
```

## Exports

* `Tag`
* `StyledRoot`
* `StyledAction`

## `Tag` API

* `color: STYLE.primary(theme.colors.primary) | STYLE.warning(theme.colors.warning) | STYLE.positive(theme.colors.positive) | STYLE.negative(theme.colors.negative)`:
  the color theme to be applied to a Tag. Default is `STYLE.primary`.
* `children: React$Node`:
  Component or String value for label of tag. Default is empty string
* `disabled: boolean`:
  Disable control from being changed
* `overrides: {Root: (props: {[string]: any}) => React$Node, Action: (props: {[string]: any}) => React$Node}`
  * Custom `Action` button.
  * `Root` wrapper element for the whole tag control to apply styles
* `onActionClick: func(({event, children}) => void)`:
  handler for events on Action button element (default is Cross). `children` provides which actual Tag was clicked
