# Pagination Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulPagination as Pagination} from 'baseui/pagination';

export default () => <Pagination numPages={6} />;
```

## Exports

* `Pagination`
* `StatefulPagination`
* `StatefulContainer`
* `StyledRoot`
* `StyledPrevButton`
* `StyledNextButton`
* `StyledMaxLabel`
* `STATE_CHANGE_TYPE`

## Pagination API

* `numPages: number` - Required
  Max number of pages
* `currentPage: number` - Required
  The current page
* `prepositionLabel: string` - Optional
  Defaults to "of"
* `overrides: {PrevButton, NextButton, Select}` - Optional
  Presentational override props, all are `React.ComponentType<*> | {component, props, style}`
* `onBackClick: (event) => void` - Optional
  Callback for prev button click
* `onNextClick: (event) => void` - Optional
  Callback for next button click

## StatefulContainer API

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

* `prepositionLabel: string` - Optional
  Defaults to "of"
* `overrides: {PrevButton, NextButton, Select}` - Optional
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
