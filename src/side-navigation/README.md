# Side Navigation Component

The side navigation menu is a list of links that is used for a website navigation. The side navigation can provide a multi-level structure.

## Usage	

```javascript
import * as React from 'react';
import {StatefulNavigation} from 'baseui/side-navigation';

<StatefulNavigation items={[]} />
```

 ### Advanced usage

 ```javascript	
import * as React from 'react';	
import {StatefulNavigation} from 'baseui/side-navigation';	
 export default () => {	
  return (<StatefulNavigation items={[]} />);	
};	
```	

## Exports

* `Navigation`
* `StatefulNavigation`
* `StatefulContainer`
* `StyledRoot`

## `Navigation` API

* `active`
* `onChange`
* `onItemExpand`
* `onItemCollapse`

## Accessibility
