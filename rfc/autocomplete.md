# Autocomplete (0 to 1 version)

Some of the API here is inspired by [Downshift](https://github.com/paypal/downshift). See bottom of doc for reasons why we are not using Downshift directly (at least in this version of the RFC).

## User Story

The Autocomplete component should complete the following user/dev stories:

> Given a list of items, I want to be able to type into a text input to filter through them, have the filtered items displayed back to me, navigate up and down that displayed list using my keyboard, and select an item from that list of filtered items.

## Exported Components

* `Autocomplete`
* `StatefulContainer`
* `StyledAutocomplete`
  * `StyledAutocomplete.Root`
  * `StyledAutocomplete.Input`
  * `StyledAutocomplete.ResultList`
  * `StyledAutocomplete.Result`

## Default Internal Structure

The default exported `Autocomplete` component will have roughly the following structure

```js
<StatefulContainer>
  <StyledAutocomplete.Root>
    <StyledAutocomplete.Input />
    <StyledAutocomplete.ResultList>
      <StyledAutocomplete.Result />
    </StyledAutocomplete.ResultList>
  </StyledAutocomplete.Root>
</StatefulContainer>
```

## Autocomplete | StatefulContainer API

#### `items (required)`

```js
Array<Object>
```

List of items

#### `getItemLabel (required)`

```js
(item: Object) => string;
```

Function used to get the label for each item. This is the string that the autocomplete logic will work with

Component injection prop, can be used to override any or all of the internal components

#### `initialState (optional)`

```js
{
  // currently selected item
  selectedItem: Object,
  // whether dropdown list is shown or not
  isOpen: boolean,
  // highlighted item's index if applicable
  highlightedIndex: number,
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
  highlightedIndex: number,
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
(prevSelectedItem: ?Object, selectedItem: ?Object) => any;
```

Called when an item is selected

#### `onOuterClick (optional)`

```js
() => any;
```

When controlling `isOpen` state, it's useful to know when the user has clicked outside of the Autocomplete component to potentially set/unset the dropdown list. This function allows users to do that

## Autocomplete API

Everything from StatefulContainer and

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

#### `highlightedIndex`

```js
number;
```

Index of highlighted item if applicable

#### `query`

```js
string;
```

Current input query

#### `getItemLabel`

```js
(item: Object) => string;
```

The user-passed-in function to get an item's label

#### `getInputProps`

```js
() => ({onChange: Function, onBlur: Function, onFocus: Function});
```

Minimal set of props that should be passed into an input component. Any hooks should be using the top level `onInputChange`, `onInputBlur`, `onInputFocus`. This is simply exposing this so users can apply to their own input. This is a function so we can ensure that it is called.

#### `getItemProps`

```js
(item: Object) => Object;
```

Function to get props for each rendered item. This will have some defaults needed for keyboard bindings to work properly. Every rendered item should call this. This is a function to ensure that it is used.

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

#### KeyDown / KeyUp

Will cycle down / up the dropdown list, highlighting items as needed

#### Enter

Select the currently highlighted item; if no item is highlighted, select the first item in the dropdown list

## Accessibility

I will be following the autocomplete accessibility wai-aria best practices shown [here](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html)

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
      {({isOpen, getInputProps, getItemProps, filteredItems, getItemLabel}) => {
        return (
          <div id="my-new-container">
            <input {...getInputProps()} />
            {isOpen &&
              filteredItems.map(item => (
                <span {...getItemProps(item)}>{getItemLabel(item)}</span>
              ))}
          </div>
        );
      }}
    </StatefulAutocompleteContainer>
  );
}
```

## Why Not Use [Downshift](https://github.com/paypal/downshift)?

Downshift has a lot of benefits, including WAI-ARIA optimization, and fluid keybindings. But it requires a weird ref-binding to the root component to work, see [here](https://github.com/paypal/downshift#getrootprops). I have not been able to get it to work well with our structure of providing `StatefulContainers` on top of rendered props. An alternative here is that we could provide an out-of-the-box solution using Downshift and delegate any advanced users to just use Downshift directly.
