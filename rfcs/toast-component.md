# Toast Notification Component

Toast notifications are used to display a brief alert, warning, or confirmation message or a banner.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Toast} from 'baseui/toast';

export default () => <Toast>This is a notification message.</Toast>;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Toast} from 'baseui/toast';

export default () => {
  return (
    <React.Fragment>
      <Toast
        onClose={()=>{console.log('Toast notification was dismissed.')}}
        autoHideDuration={5000}
        overrides={{
          Body: props => <CustomContainer>{props.children}</CustomContainer>,
        }}
      >
      This a dismissable info notification that is hidden after 5 seconds automatically.
      </Toast>
      <Toast
        closeable={false}
        kind={KIND.error}
      >
      {({dismiss}) => {
        return (
          <div>
            This is an error notification with an action button
            <button onClick={() => {
              dismiss();
              console.log('Action button clicked');
            }}>
              Take action
            </button>
          </div>
        );
      }}
      </Toast>
    </React.Fragment>
  );
}
```

## Exports

* `Toast`
* `StyledRoot`
* `StyledBody`
* `StyledCloseButton`
* `KIND`
* `PLACEMENT`

## `Toast` API

* `children: React.node | ({dismiss}) => React.node` - Required
  Toast notification content. The children-as-function receives a `dissmiss` method that can be called to dismiss the notification and can be used as a handler for an action inside the toast content
* `closeable: boolean` - Optional. Defaults to true
  When set to true a close button is displayed and the notification can be dismissed by a user
* `kind: 'info' | 'success' | 'warning' | 'error'` - Optional. Defaults to 'info'
  Defines the type of notification
* `onClose: function` - Optional
  A callback function called when a notification is dismissed
* `overrides: {Root, Body, CloseButton}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `placement: 'inline' | 'topLeft' | 'top' | 'topRight' | 'bottomRight' | 'bottom' | 'bottomLeft'` - Optional. Defaults to 'top'
  Position of a toast notification relative to the browser window. If set to 'inline' a notitication is positioned according to a normal flow of the document
* `autoHideDuration: number` - Optional. Defaults to 0
  The number of milliseconds to wait before automatically dismissing a notification. This behavior is disabled when the value is set to 0

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$kind: type`
* `$theme: theme`

## KIND Constant

* `info` - Generally used for messages with an informational context
* `success` - Generally used as a confirmation of a succesful action or operation  
* `warning` - Generally used for messages with an warning context
* `error` - Generally used as a notification of an error happened as a result of an action or operation

## PLACEMENT Constant

* `inline` - positioned according to a normal flow of the document
* `topLeft` - positioned relative to the browser window
* `top` - positioned relative to the browser window
* `topRight` - positioned relative to the browser window
* `bottomRight` - positioned relative to the browser window
* `bottom` - positioned relative to the browser window
* `bottomLeft` - positioned relative to the browser window

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

* Toast notification container element will have `role="alert"` set on it
* When multiple alerts are displayed and positioned relative to the browser window they won't overlap but displayed in a column way, latest notifications are displayed at the initial position of a chosen placement
* When a notification is set to be dissmissed automatically after a provided `autoHideDuration` time hovering or focusing the notification will prevend the notification from disappearing and reset the timeout to the initial `autoHideDuration` value
* Think about handling a case where the number of notifications is more than a screen can fit, possible solution is to have the notifications that overflow hidden (older notifications) or have the column of notifications scrollable
