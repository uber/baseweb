# Pagination Component

Component used to navigate between pages.

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

## `Pagination` API

* `currentPage: number` - Required
  * The current page.
* `numPages: number` - Required
  * Max number of pages.
* `labels?: {prevButton, nextButton, preposition} = {prevButton: 'Prev', nextButton: 'Next', preposition: 'of'}`
  * Set of labels to use for the buttons and preposition.
* `overrides?: {PrevButton, NextButton, DropdownContainer, DropdownMenu, DropdownButton}`
  * `PrevButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `NextButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownMenu?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `onPrevClick?: ({event: SyntheticEvent<>}) => void = () => {}`
  * Callback for prev button click.
* `onNextClick?: ({event: SyntheticEvent<>}) => void = () => {}`
  * Callback for next button click.
* `onPageChange?: ({nextPage: number, prevPage: number}) => void = () => {}`
  * Callback for when page changes.

## `StatefulContainer` API

* `children: ({currentPage: number, onPageChange: number}) => React.Node`
* `numPages: number`
  * Max number of pages.
* `stateReducer?: (changeType: $Values<STATE_CHANGE_TYPE>, changes: {currentPage: number}, {currentPage: number}) => {currentPage: number}`
  * State reducer function.
* `initialState?: {currentPage: number} = {currentPage: 1}`
  * The initial state.
* `onPageChange?: (nextPage: number, prevPage: number) => void = () => {}`
  * Callback for when page changes.

## `StatefulPagination` API

* All properties of the StatefulContainer except `children` function
* `labels?: {prevButton, nextButton, preposition} = {prevButton: 'Prev', nextButton: 'Next', preposition: 'of'}`
  * Set of labels to use for the buttons and preposition.
* `overrides?: {PrevButton, NextButton, DropdownContainer, DropdownMenu, DropdownButton}`
  * `PrevButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `NextButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownMenu?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `onPrevClick?: (event: SyntheticEvent<>) => void = () => {}`
  * Callback for prev button click.
* `onNextClick?: (event: SyntheticEvent<>) => void = () => {}`
  * Callback for next button click.

## `STATE_CHANGE_TYPE` Constant

* `changePage`

### Accessibility

How can this component be used via keyboard controls?

`Tab` should be used to move focus among the focus-able elements (button, dropdown)
`Escape` should be used to close the dropdown once opened
`Up / Down Arrow Keys` are used to navigate the options in the dropdown
