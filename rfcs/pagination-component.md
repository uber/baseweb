# Pagination Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulPagination} from 'baseui/pagination';

export default () => <StatefulPagination numPages={6} />;
```

## Exports

* `Pagination`
* `StatefulPagination`
* `StatefulContainer`
* `StyledRoot`
* `StyledMaxLabel`
* `StyledDropdownContainer`
* `StyledDropdownMenu`
* `StyledDropdownButton`
* `STATE_CHANGE_TYPE`

## Pagination API

* `currentPage: number` - Required
  The current page
* `numPages: number` - Required
  Max number of pages
* `labels: {prevButton, nextButton, preposition}`
  Set of labels to use for the buttons and preposition, defaults to
    `{prevButton: 'Prev', nextButton: 'Next', preposition: 'of'}`
* `overrides: {PrevButton, NextButton, DropdownContainer, DropdownMenu, DropdownButton}` - Optional
  Presentational override props, all are `React.ComponentType<*> | {component, props, style}`
* `onPrevClick: ({event}) => void` - Optional
  Callback for prev button click
* `onNextClick: ({event}) => void` - Optional
  Callback for next button click
* `onPageChange: ({nextPage, prevPage}) => void` - Optional
  Callback for when page changes

## StatefulContainer API

* `children: ({currentPage, onPageChange}) => React.Node` - Required
* `numPages: number` - Required
  Max number of pages
* `stateReducer: (changeType, changes, currentState) => Object`
  State reducer function
* `initialState: {currentPage: number}` - Optional
  The initial state
* `onPageChange: (nextPage, prevPage) => void` - Optional
  Callback for when page changes

## StatefulPagination API

`StatefulContainer` API and the following

* All properties of the StatefulContainer except `children` function
* `labels: {prevButton, nextButton, preposition}`
  Set of labels to use for the buttons and preposition, defaults to
    `{prevButton: 'Prev', nextButton: 'Next', preposition: 'of'}`
* `overrides: {PrevButton, NextButton, DropdownContainer, DropdownMenu, DropdownButton}` - Optional
  Presentational override props, all are `React.ComponentType<*> | {component, props, style}`
* `onPrevClick: (event) => void` - Optional
  Callback for prev button click
* `onNextClick: (event) => void` - Optional
  Callback for next button click

### Accessibility

How can this component be used via keyboard controls?

`Tab` should be used to move focus among the focus-able elements (button, dropdown)
`Escape` should be used to close the dropdown once opened
`Up / Down Arrow Keys` are used to navigate the options in the dropdown
