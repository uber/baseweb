# Autocomplete (0 to 1 version)

Some of the API here is inspired by [Downshift](https://github.com/paypal/downshift). See bottom of doc for reasons why we are not using Downshift directly (at least in this version of the RFC).

## User Story

The Autocomplete component should complete the following user/dev stories:

> Given a list of items, I want to be able to type into a text input to filter through them, have the filtered items displayed back to me, navigate up and down that displayed list using my keyboard, and select or deselect item(s) from that list of filtered items.

## Exported Components

* `Autocomplete`
* `StatefulContainer`
* `StyledAutocomplete`
* `StyledRoot`
* `StyledInput`
* `StyledResultList`
* `StyledResult`

## Default Internal Structure

The default exported `Autocomplete` component will have roughly the following structure

```js
<StatefulContainer>
  <StyledRoot>
    <StyledInput />
    <ResultList>
      <Result />
    </ResultList>
  </StyledRoot>
</StatefulContainer>
```

`Autocomplete` will be implemented using `MenuList` by default to render the `ResultList` and `Result`. This allows us to push all dropdown interaction concerns to `MenuList` and a user can be instructed to swap in another component for `MenuList` if he/she needs additional functionalities.

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

Function used to get the string value for each item. This is the string that the autocomplete logic will work with; can also be used as label

#### `mode (optional)`

```
string: 'single' | 'multiple'
```

Defaults to `single` - determine if the user will be allowed to only select a single or multiple items

#### `initialState (optional)`

```js
{
  // currently selected items
  selectedItems: Array<Object>,
  // whether dropdown list is shown or not
  isOpen: boolean,
  // current input query
  query: string
}
```

Used to set initial state for the component. All the component's state can be controlled via props as well.

#### `controlledState (optional)`

```js
{
  selectedItem: Object,
  isOpen: boolean,
  query: string
}
```

Used to manually set and keep a piece of state

#### `stateReducer (optional)`

```js
(type: string, nextState: Object, currentState: Object) => Object;
```

State reducer to intercept state changes and return new internal state

#### `onInputChange (optional)`

```js
(event: Object) => any;
```

On input query change; will be called after internal logic

#### `onInputFocus (optional)`

```js
(event: Object) => any;
```

On input focus; will be called after internal logic

#### `onInputBlur (optional)`

```js
(event: Object) => any;
```

On input blur; will be called after internal logic

#### `onItemSelect (optional)`

```js
(selectedItem: ?Object) => any;
```

Called when an item is selected

#### `onClickOutside (optional)`

```js
() => any;
```

When controlling `isOpen` state, it's useful to know when the user has clicked outside of the Autocomplete component to potentially set/unset the dropdown list. This function allows users to do that

## Autocomplete API

Everything from `StatefulContainer` and

#### `components (optional)`

```js
{
  Root: React.ComponentType<*>,
  Input: React.ComponentType<*>,
  ResultList: React.ComponentType<*>,
  Result: React.ComponentType<*>,
  SearchIcon: React.ComponentType<*>,
  CloseIcon: React.ComponentType<*>
}
```

Component injection prop, can be used to override any or all of the internal components

## Render Props API

These are props passed down to the render prop, or children-as-a-function function, for advanced usages (and also used internally for the preconstructed Autocomplete)

#### `filteredItems`

```js
Array<Object>
```

Filtered list of the original items, based on current query

#### `isOpen`

```js
boolean;
```

Whether dropdown list should be shown

#### `selectedItem`

```js
Object;
```

Selected item

#### `query`

```js
string;
```

Current input query

#### `getItemString`

```js
(item: Object) => string;
```

The user-passed-in function to get an item's string value

#### `getInputProps`

```js
() => ({onChange: Function, onBlur: Function, onFocus: Function});
```

Minimal set of props that should be passed into an input component. Any hooks should be using the top level `onInputChange`, `onInputBlur`, `onInputFocus`. This is simply exposing this so users can apply to their own input. This is a function so we can ensure that it is called.

## StyledAutocomplete API

All of Render Props API and the following component props

#### `Root`

#### `Input`

#### `ResultList`

#### `Result`

#### `SearchIcon`

#### `CloseIcon`

## Keybindings

We will also support the following keybindings

#### Escape

Will close the dropdown list

## Accessibility

I will be following the autocomplete accessibility wai-aria best practices shown [here](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html)

## Implementation

This is what the internal implementation of `Autocomplete`, using `MenuList`, might look like.

```js
import {MenuList} from './menu-list';

function Autocomplete({
  items,
  getItemString,
  components: {Root, Input, ResultList, Result},
}) {
  return (
    <Root>
      <Input />
      <MenuList
        components={{
          List: ResultList,
          ListItem: Result,
        }}
      />
    </Root>
  );
}
```

## Sample Usage

#### Drop-in Case

```js
import {Autocomplete, withStyle} from 'base-ui';

const StyledAutocompleteRoot = withStyle(Autocomplete.Root, {
  display: 'inline-flex',
});

function MyComponent() {
  return (
    <AutoComplete
      items={[]}
      components={{
        Root: StyledAutocompleteRoot,
      }}
    />
  );
}
```

#### Advanced Children-as-a-Function Case

```js
import {StatefulAutocompleteContainer} from 'base-ui';

function MyComponent() {
  return (
    <StatefulAutocompleteContainer items={[]}>
      {({isOpen, getInputProps, filteredItems, getItemString}) => {
        return (
          <div id="my-new-container">
            <input {...getInputProps()} />
            {isOpen &&
              filteredItems.map(item => <span>{getItemString(item)}</span>)}
          </div>
        );
      }}
    </StatefulAutocompleteContainer>
  );
}
```

## Why Not Use [Downshift](https://github.com/paypal/downshift)?

Downshift has a lot of benefits, including WAI-ARIA optimization, and fluid keybindings. But it requires a weird ref-binding to the root component to work, see [here](https://github.com/paypal/downshift#getrootprops). I have not been able to get it to work well with our structure of providing `StatefulContainers` on top of rendered props. An alternative here is that we could provide an out-of-the-box solution using Downshift and delegate any advanced users to just use Downshift directly.
