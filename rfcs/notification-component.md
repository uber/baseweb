# Notification Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Notification} from 'baseui/notification';

export default () => (
  <Notification>
    This is a notification message.
  </Notification>
);
```

### Advanced usage

```javascript
import * as React from 'react';
import {Notification, KIND} from 'baseui/notification';

export default () => (
  <Notification kind={KIND.warning}>
    This is a warning notification message.
  </Notification>
);
```

## Exports

* `Notification`
* `StyledNotification`
* `KIND`

## `Foo` API

* `kind: 'primary' | 'warning' | 'success' | 'error'` - Optional
  The type of Notification styling to show

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$theme: Theme`
* `$kind: 'primary' | 'warning' | 'success' | 'error'`

## Accessibility

This component is built to the [WAI-ARIA Alert Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#alert).
