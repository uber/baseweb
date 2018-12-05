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
* `COLOR_STYLE_KEYS`
* `KIND`

## `Tag` API

* `color?: $Values<KIND> | string = '#000'`:
  * The color theme to be applied to a Tag. Default is `KIND.primary`.
* `children: React.Node`:
  * Component or String value for label of tag. Default is empty string.
* `disabled?: boolean = false`:
  * Disable control from being changed.
* `overrides?: {Root, Action} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Wrapper element for the whole tag control to apply styles.
  * `Action?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Element rendered to the right of child content.
* `onActionClick: (event: SyntheticEvent<HTMLElement>, children: React.Node) => void = () => {}`:
  * Handler for events on Action button element. `children` provides which Tag was clicked.

## `COLOR_STYLE_KEYS` Constant

* `primary`
* `warning`
* `positive`
* `negative`

## `KIND` Constant

* `primary`
* `warning`
* `positive`
* `negative`
* `custom`
