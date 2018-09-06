# Foo Component

Delete this line and any sections, exports, props, etc below where applicable.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Foo} from 'baseui/foo';

export default () => <Foo prop={true} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Foo} from 'baseui/foo';

export default () => {
  return
    <Foo
      prop={true}
      onMagic={()=>{console.log('some magic happened')}}
      overrides={{
        Bar: props => <CustomBar>Click me</CustomBar>,
      }}
    />;
}
```

## Exports

* `Foo`
* `StatefulFoo`
* `StatefulContainer`
* `StyledRoot`
* `StyledBody`
* `CONSTANT`

## `Foo` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## `StatefulFoo` API

* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop
* `prop: type` - Optional|Required
  Description of prop

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$prop: type`
* `$prop: type`
* `$prop: type`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
