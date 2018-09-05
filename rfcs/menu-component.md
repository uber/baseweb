# Menu

## User Story

> Given an array of items, I want to render them as a list, navigate through it using keyboard bindings, and receive feedback when I select (via pointer select or Enter) an item.

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

## StatefulContainer API

* `items: Array<any>`
  List of items
* `initialState: {highlightedIndex: number}`
  Used to set initial state for the component. All the component's state can be controlled via props as well.
* `stateReducer: (changeType: string, changes: Object, currentState: Object) => Object`
  State reducer to intercept state changes and return new internal state
* `onItemSelect: (selectedItem: ?Object) => any`

## Render Props API

These are props passed down to the render prop, or children-as-a-function function, for advanced usages (and also used internally for the preconstructed `Menu`)

* `items`
  Same as `StatefulContainer`
* `highlightedIndex: number`
  Index of highlighted item if applicable
* `rootRef: React$ElementRef<*>`
  Ref for the root element
* `getRequiredItemProps: (item: Object) => ({key: string, id: string})`
  Function to get props for each rendered item. This will have some defaults needed for keyboard bindings to work properly. Every rendered item should call this. This is a function to ensure that it is used.

## Menu API

* `items: Array<any>`
  List of items
* `getRequiredItemProps: (item: Object) => ({key: string, id: string})`
  Function to get props for each rendered item. This will have some defaults needed for keyboard bindings to work properly. Every rendered item should call this. This is a function to ensure that it is used.
* `highlightedIndex: number`
  Index of highlighted item if applicable
* `rootRef: React$ElementRef<*>`
  Ref for the root element
* `overrides: {List, Option}`
  Component injection prop, can be used to override any or all of the internal components
  * `List` and `Option` have type `Object | React.ComponentType<*>`

## Option List API

* `item: any`
  Item
* `getItemLabel: (item: any) => string`
  Function used to get the string label for each item
* `overrides: {ListItem}`
  Component injection
  * All of these have type `Object | React.ComponentType<*>`

## Option Profile API

* `item: any`
  Item
* `getProfileItemLabels: (item: Object) => ({title?: string, subtitle?: string, body?: string})`
  Returns an object of three strings for the profile item
* `getProfileItemImg: (item: Object) => string | React.ComponenType<*>`
  Returns either an image source url, or a full React component to render as the image
* `getProfileItemImgText: (item: Object) => string`
  Returns the alt text for the image
* `overrides: {ListItemProfile, ProfileImgContainer, ProfileImg, ProfileLabelsContainer, ProfileTitle, ProfileSubtitle, ProfileBody}`
  Component injection
  * All of these have type `Object | React.ComponentType<*>`

## Keybindings

This menu list will support the following keybindings

### KeyDown / KeyUp

Will cycle down / up the menu list, highlighting items as needed

### Enter

Select the currently highlighted item; if no item is highlighted, select the first item in the menu list

## Accessibility

I will be following WAI-ARIA best practices as stated [here](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html)
