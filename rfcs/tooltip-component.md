# Tooltip Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulTooltip} from 'baseui/tooltip';

export default () => (
  <StatefulTooltip content="Lorem ipsum dolor sit amet...">
    <span>Hover me!</span>
  </StatefulTooltip>
);
```

### Advanced usage

```javascript
import * as React from 'react';
import {StatefulTooltip, StyledTooltip} from 'baseui/tooltip';
import {withStyle} from 'styletron-react';

const BigOlTooltip = withStyle(StyledTooltip, {
  width: '500px',
});

export default () => (
  <StatefulTooltip
    content="Lorem ipsum dolor sit amet..."
    overrides={{
      Tooltip: {
        style: {width: '500px'},
      },
    }}
  >
    <span>Hover me!</span>
  </StatefulTooltip>
);
```

The tooltip component is essentially a more opinionated `Popover`. Implementation-wise it will just be a thin wrapper around a `Popover` with some defaults:

* Darker theme (see Base UI docs)
* `triggerType` default to `'hover'`
* Adds padding to your content by default

Accordingly, the RFC below will direct you to refer back to `popover-component.md` in many places.

## Exports

* `StatefulTooltip`
* `Tooltip`
* `StatefulContainer`
* `StyledTooltipArrow`
* `StyledTooltipBody`
* `StyledTooltipInner`

## `StatefulTooltip` API

Same props as `StatefulPopover` (see popover-component.md)

## `Tooltip` API

Same props as `Popover` (see popover-component.md)

## Implementation Details

See popover-component.md

## Accessibility

See popover-component.md

If users passes a string as their content we can maybe also add that as a `title` or similar A11Y attribute on the trigger (if one isn't present already)
