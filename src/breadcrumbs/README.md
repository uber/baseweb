# Breadcrumbs Component

The `Breadcrumbs` component is used to display links to the parent pages of the current page in hierarchical order.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Breadcrumbs} from 'baseui/breadcrumbs';
import {StyledLink as Link} from 'baseui/link';

export default () => (
  <Breadcrumbs>
    <Link href="#">Parent Page</Link>
    <Link href="#">Sub-Parent Page</Link>
    <span>Current Page</span>
  </Breadcrumbs>
);
```

## Exports

* `Breadcrumbs`
* `StyledRoot`
* `StyledSeparator`
* `StyledIcon`

## `Breadcrumbs` API

* `overrides?: {Root, Separator, Icon} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for Root container styling.
  * `Separator?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for separating element.
  * `Icon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Component to use for the separator icon.

## Accessibility

This component is built to the [WAI-ARIA 1.1 Breadcrumb Spec](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb).
