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
          Body: CustomContainer,
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
* `TYPE`
* `PLACEMENT`

## `Toast` API

* `children: React.node | ({dismiss}) => React.node` - Required
  Toast notification content. The children-as-function receives a `dissmiss` method that can be called to dismiss the notification and can be used as a handler for an action inside the toast content
* `closeable: boolean` - Optional. Defaults to true
  When set to true a close button is displayed and the notification can be dismissed by a user
* `kind: KIND.info | KIND.positive | KIND.warning | KIND.negative` - Optional. Defaults to 'info'
  Defines the notification kind
* `notificationType: TYPE.toast | TYPE.inline` - Optional. Defaults to `TYPE.toast`
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
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `autoHideDuration: number` - Optional. Defaults to 0
  The number of milliseconds to wait before automatically dismissing a notification. This behavior is disabled when the value is set to 0

## Toast Presentational components props API

These properties are passed to every Toast's presentational (styled) component that is exported:

* `$kind: KindTypeT`
* `$type: NotificationTypeT`
* `$closeable: boolean`,
* `$isHidden: boolean`,
* `$isAnimating: boolean`,
* `$theme: theme`

## KIND Constant

* `info` - Generally used for messages with an informational context
* `positive` - Generally used as a confirmation of a successful action or operation
* `warning` - Generally used for messages with an warning context
* `negative` - Generally used as a notification of an error happened as a result of an action or operation

## `ToasterContainer` API

* `placement: PLACEMENT.inline | PLACEMENT.topLeft | PLACEMENT.top | PLACEMENT.topRight | PLACEMENT.bottomRight | PLACEMENT.bottom | PLACEMENT.bottomLeft` - Optional. Defaults to 'top'
  Position of a toast notification container relative to the browser window
* `usePortal: boolean` - Optional. Defaults to `true`
  Defines if the portal is used to append a container to the `body` element. In both cases the container is positioned `fixed`
* `overrides: {Root, Body, CloseIcon}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `autoHideDuration: number` - Optional. Defaults to 0
  The number of milliseconds to wait before automatically dismissing a notification. This behavior is disabled when the value is set to 0

## Toaster Presentational components props API

These properties are passed to every presentational (styled) component of a Toaster:

* `$placement: PlacementTypeT`

## PLACEMENT Constant

* `topLeft` - defines position of toasts relative to the browser window
* `top` - defines position of toasts relative to the browser window
* `topRight` - defines position of toasts relative to the browser window
* `bottomRight` - defines position of toasts relative to the browser window
* `bottom` - defines position of toasts relative to the browser window
* `bottomLeft` - defines position of toasts relative to the browser window

## `toaster` API

* `show: (children: React.Node, props: $Shape<ToastPropsT>): ?React.Key => {}`
  Creates a Toast and renders it in the `ToasterContainer`. `toaster.show()` can only be called on the client side. `<ToasterContainer />` must be mounted before any `toaster.show()` call
* `info: (children: React.Nade, props: $Shape<ToastPropsT>): ?React.Key => {}`
  Creates a `KIND.info` type Toast and renders it in the `ToasterContainer`. `toaster.info()` can only be called on the client side. `ToasterContainer` must be mounted before any `toaster.info()` call
* `positive: (children: React.Nade, props: $Shape<ToastPropsT>): ?React.Key => {}`
  Creates a `KIND.positive` type Toast and renders it in the `ToasterContainer`. `toaster.positive()` can only be called on the client side. `ToasterContainer` must be mounted before any `toaster.positive()` call
* `warning: (children: React.Nade, props: $Shape<ToastPropsT>): ?React.Key => {}`
  Creates a `KIND.warning` type Toast and renders it in the `ToasterContainer`. `toaster.warning()` can only be called on the client side. `ToasterContainer` must be mounted before any `toaster.warning()` call
* `negative: (children: React.Nade, props: $Shape<ToastPropsT>): ?React.Key => {}`
  Creates a `KIND.negative` type Toast and renders it in the `ToasterContainer`. `toaster.negative()` can only be called on the client side. `ToasterContainer` must be mounted before any `toaster.negative()` call
* `update: (key: React.Key, props: $Shape<ToastPropsT>): void => {}`
  Updated an earlier created Toast.
* `clear: (key?: React.Key): void => {}`,
  Dismissed a specific Toast or clears all rendered toasts if no toast key is passed.

## Dependencies

* none

## Accessibility

* Toast notification container element will have `role="alert"` set on it
* When multiple alerts are displayed and positioned relative to the browser window they won't overlap but displayed in a column way, latest notifications are displayed at the initial position of a chosen placement
* When a notification is set to be dismissed automatically after a provided `autoHideDuration` time hovering or focusing the notification will prevent the notification from disappearing and reset the timeout to the initial `autoHideDuration` value
