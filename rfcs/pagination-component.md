# Pagination Component

### Exports

* `Pagination`
* `StatefulPagination`
* `StatefulContainer`
* `StyledBackButton`
* `StyledNextButton`

### Pagination API

* `numPages: number` - Required
  Max number of pages
* `currentPage: number` - Required
  The current page
* `prepositionLabel: string` - Optional
  Defaults to "of"
* `overrides: {PrevButton, NextButton, Select}` - Optional
  Presentational override props, all are `React.ComponentType<*> | {component, props, style}`

### StatefulPagination API

* `numPages: number` - Required
  Max number of pages
* `initialState: {currentPage: number}` - Optional
  The initial state
* `prepositionLabel: string` - Optional
  Defaults to "of"
* `overrides: {PrevButton, NextButton, Select}` - Optional
  Presentational override props, all are `React.ComponentType<*> | {component, props, style}`

### Usage

Basic usage:

```javascript
import * as React from 'react';
import {Pagination} from 'baseui/paginate';

export default () => <Pagination currentPage= />;
```

### Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
