# Menu List

## User Story

> Given an array of items, I want to render them as a list, navigate through it using keyboard bindings, and receive feedback when I select (via pointer select or Enter) an item.

## Exported Components

* `MenuList`
* `StatefulContainer`
* `StyledMenuList`
* `StyledList`
* `StyledListItem`

## Default Internal Structure

The default exported `MenuList` will have the following internal structure

```js
<StatefulContainer>
  <StyledList>
    <StyledListItem />
  </StyledList>
</StatefulContainer>
```

## StatefulContainer API

#### `items (required)`

```js
Array<Object>
```

List of items

#### `getItemString (required)`

```js
(item: Object) => string;
```

Function used to get the string label for each item.

#### `initialState (optional)`

```js
{
  highlightedIndex: number;
}
```

Used to set initial state for the component. All the component's state can be controlled via props as well.

#### `stateReducer (optional)`

```js
(type: string, nextState: Object, currentState: Object) => Object;
```

State reducer to intercept state changes and return new internal state

#### `onItemSelect (optional)`

```js
(selectedItem: ?Object) => any;
```

## MenuList API

All of `StatefulContainer` API and the following

#### `components (optional)`

```js
{
  List: React.ComponentType<*>,
  ListItem: React.ComponentType<*>,
}
```

Component injection prop, can be used to override any or all of the internal components

## Render Props API

These are props passed down to the render prop, or children-as-a-function function, for advanced usages (and also used internally for the preconstructed `MenuList`)

#### `items`

```js
Array<Object>
```

List of items

#### `getItemString`

```js
(item: Object) => string;
```

Function used to get the string label for each item.

#### `highlightedIndex`

```js
number;
```

Index of highlighted item if applicable

#### `getRequiredItemProps`

```js
(item: Object) => ({key: string, id: string});
```

Function to get props for each rendered item. This will have some defaults needed for keyboard bindings to work properly. Every rendered item should call this. This is a function to ensure that it is used.

## Keybindings

This menu list will support the following keybindings

#### KeyDown / KeyUp

Will cycle down / up the menu list, highlighting items as needed

#### Enter

Select the currently highlighted item; if no item is highlighted, select the first item in the menu list

## Accessibility

I will be following WAI-ARIA best practices as stated [here](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html)
