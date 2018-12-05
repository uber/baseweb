# Tooltip Component

The tooltip component is essentially a more opinionated `Popover`. Implementation-wise it will just be a thin wrapper around a `Popover` with some defaults:

* Darker theme (see Base UI docs)
* `triggerType` default to `'hover'`
* Adds padding to your content by default

Accordingly, the RFC below will direct you to refer back to `src/popover/README.md` in many places.

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

## Exports

* `StatefulTooltip`
* `Tooltip`
* `StatefulContainer`
* `StyledTooltipArrow`
* `StyledTooltipBody`
* `StyledTooltipInner`
* `ACCESSIBILITY_TYPE`
* `PLACEMENT`
* `TRIGGER_TYPE`
* `STATE_CHANGE_TYPE`

## `StatefulTooltip` API

Same props as `StatefulPopover` (see `src/popover/README.md`)

## `Tooltip` API

Same props as `Popover` (see `src/popover/README.md`)

## `StatefulContainer` API

Same props as `Popover` `StatefulContainer` (see `src/popover/README.md`)

## Accessibility

See `src/popover/README.md`

If users passes a string as their content we can maybe also add that as a `title` or similar A11Y attribute on the trigger (if one isn't present already)
