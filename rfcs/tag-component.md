# Tag Component

## Usage

```js
import {Tag, Root, Action} from './index';
import {styled} from '../styles/index';

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
        onActionClick={(event, children) => {}}
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

* `color: STYLE.primary(theme.colors.primary470) | STYLE.warning(theme.colors.warning400) | STYLE.positive(theme.colors.positive400) | STYLE.negative(theme.colors.negative400)`:
  the color theme to be applied to a Tag. Default is `STYLE.primary`.
* `children: React$Node`:
  Component or String value for label of tag. Default is empty string
* `disabled: boolean`:
  Disable control from being changed
* `overrides: {Root: (props: {[string]: any}) => React$Node, Action: (props: {[string]: any}) => React$Node}`
  * Custom `Action` button.
  * `Root` wrapper element for the whole tag control to apply styles
* `onActionClick: func((evt, children) => void)`:
  handler for events on Action button element (default is Cross). `children` provides which actual Tag was clicked
