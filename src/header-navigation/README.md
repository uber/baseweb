# Header Navigation Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {HeaderNavigation, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Button, KIND} from 'baseui/button';

export default () => <HeaderNavigation>
  <NavigationList align="left">
    <NavigationItem><span>Uber</span></NavigationItem>
    <NavigationItem><a href="/a">Link One</a></NavigationItem>
    <NavigationItem><a href="/b">Link Two</a></NavigationItem>
  </NavigationList>
  <NavigationList align="right">
    <NavigationItem><Button onClick={() => console.log('clicked')} kind={KIND.primary}>Get started</Button></NavigationItem>
  </NavigationList>
</HeaderNavigation>;
```

### Advanced usage

```javascript
import * as React from 'react';
import {HeaderNavigation, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList} from 'baseui/header-navigation';
import {Button, KIND} from 'baseui/button';
import {StatefulMenu as Menu} from 'baseui/menu';
const ITEMS = [{label: 'menu item 1'}, {label: 'menu item 2'}];

export default (props) => <HeaderNavigation
  overrides={{
   Root: {
     style: {
        justifyContent: 'space-between'
     }
   }
  }}>
  <NavigationList align="left">
      <NavigationItem>
          <span>Menu</span>
          {props.isExpandMenu && <Menu items={ITEMS} />}
      </NavigationItem>
  </NavigationList>
  <NavigationList align="center">
    <NavigationItem><a href="/a">Link One</a></NavigationItem>
    <NavigationItem><a href="/b">Link Two</a></NavigationItem>
  </NavigationList>
</HeaderNavigation>;
```

## Exports

* `HeaderNavigation`
* `StyledNavigationItem`
* `StyledNavigationList`
* `StyledRoot`
* `ALIGN`

## `HeaderNavigation` API

* `children?: React.Node = null`
  * All the children of header navigation. It accepts any components, but it is useful to use `NavigationList` and `NavigationItem` to align and follow style guides.

## `StyledNavigationList` API

* `align: $Values<ALIGN> = undefined`
  * Alignment of elements inside of navigation list.
* `children?: React.Node = null`
  * All the children of NavigationList.

## `StyledNavigationItem` API

* `children?: React.Node = null`
  * All the children of NavigationItem.

## `ALIGN` Constant

* `right`
* `left`
* `center`

## Accessibility

* Use `nav` tag for root element.
* Use `role="navigation"`
