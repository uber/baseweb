# Notification Component

Inline notifications are used to display a brief alert, warning, confirmation, or info message.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Notification} from 'baseui/notification';

export default () => <Notification>This is a notification message.</Notification>;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Notification, KIND} from 'baseui/notification';

export default () => {
  return (
    <Notification
      kind={KIND.positive}
      overrides={{
        Body: CustomContainer,
      }}
    >
      This a positive notification.
    </Notification>
  );
}
```

## Exports

* `Notification`
* `KIND`

## `Notification` API

* `Notification` component is built on top of the `Toast` component with the default props set as the following:
  * `notificationType: TYPE.inline`
  * `closeable: false`
* Refer to [`Toast` component documentation](https://baseui.design/?selectedKind=Toast&selectedStory=Toast) for detailed API description.

## KIND Constant

* `info` - Generally used for messages with an informational context
* `positive` - Generally used as a confirmation of a successful action or operation
* `warning` - Generally used for messages with an warning context
* `negative` - Generally used as a notification of an error happened as a result of an action or operation
