# Top Bar Silhouette

This silhouette provides proper styles for wrapper element to be used as Top Navigation. By default element has no visual styles.
Silhouettes comply with Base UI grid layout, so they are responsive to resizing and stretching, changing sizes, fonts, etc

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {TopBar} from 'baseui/silhouette/top-bar';
import {Button} from 'baseui/button';

export default () => (
  <TopBar>
    <Button>Menu</Button>
    <span>Uber</span>
  </TopBar>
  );
```

### Advanced usage

```javascript
import * as React from 'react';
import {TopBar} from 'baseui/silhouette/top-bar';
import {Button} from 'baseui/button';

export default () => {
  return
    <TopBar
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
</TopBar>;
}
```

## Exports

* `TopBar`
* `StyledRoot`

## `TopBar` API

* `height: number` - Optional
  Is number of rows as height of bar in our grid system. Default is 9 rows.
* `overrides: {Root}` - Optional
  * `Root: ReactComponent` - Optional. DOM element representing top bar

## Dependencies

This element dependes on `Block` element of this framework
