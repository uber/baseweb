# Menu

Displays a list of selectable items.

## Usage

### Basic Usage

```javascript
import {StatefulMenu} from 'baseui/menu';

const ITEMS = [{label: 'item1'}];

function onItemSelect({item}) {...}

export default () => (
  <StatefulMenu items={ITEMS} onItemSelect={onItemSelect} />
);
```

### Advanced Usage

Overriding Default List Item with Profile Item

```javascript
import {StatefulMenu, OptionProfile} from 'baseui/menu';

const PROFILE_ITEMS = [{
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
  imgUrl: 'someImgUrl',
}]

function onItemSelect({item}) {...}

export default () => (
  <StatefulMenu
    items={PROFILE_ITEMS}
    onItemSelect={onItemSelect}
    overrides={{
      Option: {
        component: OptionProfile,
        props: {
          getProfileItemLabels: ({title, subtitle, body}) => ({
            title,
            subtitle,
            body,
          }),
          getProfileItemImg: item => item.imgUrl,
          getProfileItemImgText: item => item.title,
        }
      }
    }}
  />
);
```

You can also choose to completely define the override component outside

```javascript
function OptionProfileOverride(props) {
  return (
    <OptionProfile
      {...props}
      getProfileItemLabels={({title, subtitle, body}) => ({title, subtitle, body})}
      getProfileItemImg={item => item.imgUrl}
      getProfileItemImgText={item => item.title}
    />
  )
}

export default () => (
  <StatefulMenu
    items={PROFILE_ITEMS}
    onItemSelect={onItemSelect}
    overrides={{
      Option: OptionProfileOverride
    }}
  />
);
```

## Exported Components

* `Menu`
* `StatefulContainer`
* `StatefulMenu`
* `OptionList`
* `OptionProfile`
* `StyledList`
* `StyledListItem`
* `StyledListItemProfile`
* `StyledProfileImgContainer`
* `StyledProfileImg`
* `StyledProfileLabelsContainer`
* `StyledProfileTitle`
* `StyledProfileSubtitle`
* `StyledProfileBody`
* `KEY_STRINGS`
* `STATE_CHANGE_TYPES`

## `Menu` API

* `items: Array<any>` - Required.
  * List of menu items.
* `getRequiredItemProps: (item: any, index: number) => ({key: string, id: string}) = () => {}` - Required.
  * Function to get props for each rendered item. This will have some defaults needed for keyboard
    bindings to work properly. Every rendered item should call this. This is a function to ensure
    that it is used.
* `highlightedIndex?: number = null`
  * Index of highlighted item if applicable.
* `rootRef: React$ElementRef<*> = React.createRef<*>()`
  * Ref for the root element.
* `overrides?: {List, Option} = {}`
  * `List?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Option?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `StatefulContainer` API

* `items: Array<any>` - Required.
  * List of items.
* `initialState?: {highlightedIndex: number} = {highlightedIndex: -1}`
  * Initial state of an uncontrolled popover component.
    * `highlightedIndex` - Determines which menu item should render highlighted.
* `stateReducer?: (changeType: $Values<STATE_CHANGE_TYPES>, changes: {highlightedIndex: number}, currentState: {highlightedIndex: number}) => {highlightedIndex: number}`
  * State reducer to intercept state changes and return new internal state
* `onItemSelect?: ({item: ?Object}, event: KeyboardEvent) => void = () => {}`
* `children?: Function = ({items: Array<any>, highlightedIndex: number, rootRef: React$ElementRef<*>, getRequiredItemProps: (item: Object) => ({key: string, id: string})}) => React.Node`

## `OptionList` API

* `item: any` - Required.
  * Item to parse and render.
* `getItemLabel: (item: any) => string = (item) => item.label || ''`
  * Function used to get the string label for each item.
* `overrides?: {ListItem} = {}`
  * `ListItem?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `OptionProfile` API

* `item: any` - Required.
  * Item to parse and render.
* `getProfileItemLabels: (item: any) => ({title?: string, subtitle?: string, body?: string})` - Required.
  * Returns an object of three strings for the profile item.
* `getProfileItemImg: (item: Object) => string | React.ComponentType<*>` - Required.
  * Returns either an image source url, or a full React component to render as the image.
* `getProfileItemImgText: (item: Object) => string` - Required.
  * Returns the alt text for the image
* `overrides?: {ListItemProfile, ProfileImgContainer, ProfileImg, ProfileLabelsContainer, ProfileTitle, ProfileSubtitle, ProfileBody} = {}`
  * `ListItemProfile?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileImgContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileImg?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileLabelsContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileTitle?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileSubtitle?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ProfileBody?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledList`, `StyledListItem`, `StyledListItemProfile`, `StyledProfileImgContainer`,
`StyledProfileImg`, `StyledProfileLabelContainer`, `StyledProfileTitle`, `StyledProfileSubtitle`,
`StyledProfileBody`

* `$isHighlighted?: boolean = false`
  * Renders UI in 'highlighted' state.
* `$size?: $Values<OPTION_LIST_SIZE> = OPTION_LIST_SIZE.default`
  * Renders UI in defined scale.
* `$theme: theme`

## `KEY_STRINGS` Constant

* `moveUp`
* `moveDown`

## `STATE_CHANGE_TYPES` Constant

* `ArrowUp`
* `ArrowDown`
* `Enter`
* `Space`
* `Escape`
* `Backspace`

## Accessibility

### Keybindings

* `KeyDown / KeyUp`
  * Will cycle down / up the menu list, highlighting items as needed
* `Enter`
  * Select the currently highlighted item; if no item is highlighted, select the first item in the menu list

Follows WAI-ARIA best practices as stated [here](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html)
