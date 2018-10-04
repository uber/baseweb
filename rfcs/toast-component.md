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
          Body: props => <CustomContainer {...props} />,
        }}
      >
      This a dismissable info notification that is hidden after 5 seconds automatically.
      </Toast>
      <Toast
        closeable={false}
        kind={KIND.positive}
      >
      {({dismiss}) => {
        return (
          <div>
            This is a success notification with an action button
            <button onClick={() => {
              console.log('Action button clicked');
              dismiss();
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
* `StyledBody`
* `StyledSvg`
* `KIND`

## `Toast` API

* `children: React.node | ({dismiss}) => React.node` - Required
  Toast notification content. The children-as-function receives a `dissmiss` method that can be called to dismiss the notification and can be used as a handler for an action inside the toast content
* `closeable: boolean` - Optional. Defaults to true
  When set to true a close button is displayed and the notification can be dismissed by a user
* `kind: 'info' | 'positive' | 'warning' | 'negative'` - Optional. Defaults to 'info'
  Defines the type of notification
* `onClose: function` - Optional
  A callback function called when a notification is dismissed
  `onBlur: function` - Optional
  A callback function called when the notification's Body element gets a `blur` event
  `onFocus: function` - Optional
  A callback function called when the notification's Body element gets a `focus` event
  `onMouseEnter: function` - Optional
  A callback function called when the notification's Body element gets a `mouseenter` event
  `onMouseLeave: function` - Optional
  A callback function called when the notification's Body element gets a `mouseleave` event
* `overrides: {Body, Svg}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `autoHideDuration: number` - Optional. Defaults to 0
  The number of milliseconds to wait before automatically dismissing a notification. This behavior is disabled when the value is set to 0

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$kind: type`
* `$theme: theme`

## KIND Constant

* `info` - Generally used for messages with an informational context
* `positive` - Generally used as a confirmation of a succesful action or operation  
* `warning` - Generally used for messages with an warning context
* `negative` - Generally used as a notification of an error happened as a result of an action or operation

## Dependencies

* none

## Accessibility

* Toast notification container element will have `role="alert"` set on it
* When multiple alerts are displayed and positioned relative to the browser window they won't overlap but displayed in a column way, latest notifications are displayed at the initial position of a chosen placement
* When a notification is set to be dissmissed automatically after a provided `autoHideDuration` time hovering or focusing the notification will prevend the notification from disappearing and reset the timeout to the initial `autoHideDuration` value
* Think about handling a case where the number of notifications is more than a screen can fit, possible solution is to have the notifications that overflow hidden (older notifications) or have the column of notifications scrollable
