# Top Navigation Silhouette

This silhouette provides proper styles for wrapper element to be used as Top Navigation. By default element has no visual styles.
Silhouettes comply with Base UI grid layout, so they are responsive to resizing and stretching, changing sizes, fonts, etc

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {TopNavigation} from 'baseui/silhouette/top-navigation';
import {Button} from 'baseui/button';

export default () => (
  <TopNavigation>
    <Button>Menu</Button>
    <span>Uber</span>
  </TopNavigation>
  );
```

### Advanced usage

```javascript
import * as React from 'react';
import {TopNavigation} from 'baseui/silhouette/top-navigation';
import {Button} from 'baseui/button';

export default () => {
  return
    <TopNavigation
      height={12}
      overrides={{
        Root: {
          style: {
            backgroundColor: 'blue',
          }
        }
      }}
    >
    <Button>Menu</Button>
    <span>Uber</span>
</TopNavigation>;
}
```

## Exports

* `TopNavigation`
* `StyledRoot`

## `TopNavigation` API

* `height: number` - Optional
  Is number of rows as height of navigation in our grid system. Default is 9 rows.
* `overrides: {Root}` - Optional
  * `Root: ReactComponent` - Optional. DOM element representing top navigation

## Dependencies

This element dependes on `Block` element of this framework

## Accessibility

Use `nav` tag for root element.
Use `role="navigation"`
