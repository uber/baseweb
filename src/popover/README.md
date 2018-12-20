# Popover Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulPopover} from 'baseui/popover';

export default () => {
  const popoverContent = <div>Hello world</div>;
  return (
    <StatefulPopover
      placement="topLeft"
      content={popoverContent}
    >
      <span>Click me!</span>
    </StatefulPopover>
  );
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {StatefulPopover, StyledBody} from 'baseui/popover';

export default () => {
  const popoverContent = <div>Hello world</div>;
  return (
    <StatefulPopover
      placement="topLeft"
      triggerType="hover"
      content={({close}) => (
        <div>
          <h2>Hello world</h2>
          <button onClick={close}>Close</button>
        </div>
      )}
      overrides={{
        Body: {
          style: {borderColor: 'red'},
        },
      }}
    >
      <span>Hover me!</span>
    </StatefulPopover>
  );
};
```

## Exports

* `StatefulPopover`
* `Popover`
* `StatefulContainer`
* `StyledArrow`
* `StyledBody`
* `StyledInner`
* `StyledPadding`
* `ACCESSIBILITY_TYPE`
* `PLACEMENT`
* `TRIGGER_TYPE`
* `STATE_CHANGE_TYPE`

## `StatefulPopover` API

* `placement?: PLACEMENT[string] = PLACEMENT.auto`
  * How to position the popover relative to the target.
* `content?: React.Node | ({close: () => void}) => React.Node = null`
  * Content to render within the popover when it's shown.
* `children: React.Node` - Required.
  * Content that should trigger the popover to be shown (also acts as the anchor against which the popover will be positioned).
* `triggerType?: TRIGGER_TYPE[string] = TRIGGER_TYPE.click`
  * Whether to toggle the popover when trigger is clicked or hovered.
* `showArrow?: boolean = false`
  * Whether or not to show the arrow pointing from the popover to the trigger.
* `dismissOnClickOutside?: boolean = true`
  * Whether to hide the popover when the user clicks anywhere outside the trigger/popover.
* `dismissOnEsc?: boolean = true`
  * Whether to hide the popover when the user presses the escape key.
* `initialState?: {isOpen: boolean} = {isOpen: false}`
  * Initial state of an uncontrolled popover component.
* `stateReducer?: (type: STATE_CHANGE_TYPE, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `changes` - a new state changes that will be set
  * `currentState` - current full state of the component
* `onOpen?: () => {}`
  * Event handler when popover is shown.
* `onClose?: () => {}`
  * Event handler when popover is hidden.
* `onMouseEnterDelay?: number = 200`
  * Number of milliseconds to wait before showing the popover after mousing enters the trigger element (for triggerType `hover`).
* `onMouseLeaveDelay?: number = 200`
  * Number of milliseconds to wait before hiding the popover after the mouse leaves the trigger element (for triggerType `hover`).
* `accessibilityType?: ACCESSIBILITY_TYPE[string] = ACCESSIBILITY_TYPE.menu`
  * Controls how this popover behaves for screen readers and other assistive devices. See the A11Y section at the bottom of this document for more details.
* `overrides?: {Arrow, Body, Inner} = {}`
  * `Arrow?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Body?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Inner?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `Popover` API

* `isOpen?: boolean = false`
  * Whether or not to show the popover.
* `placement?: PLACEMENT[string] = PLACEMENT.auto`
  * How to position the popover relative to the target.
* `content?: React.Node | () => React.Node = null`
  * Content to render within the popover when it's shown.
* `children: React.Node` - Required.
  * Content that should trigger the popover to be shown (also acts as the anchor against which the popover will be positioned).
* `triggerType?: TRIGGER_TYPE[string] = TRIGGER_TYPE.click`
  * Whether to toggle the popover when trigger is clicked or hovered.
* `showArrow?: boolean = false`
  * Whether or not to show the arrow pointing from the popover to the trigger.
* `onClick: Event => void = null`
  * Handler for click events on trigger element.
* `onMouseEnter: () => void = null`
  * Handler for mouseenter events on trigger element.
* `onMouseLeave: () => void = null`
  * Handler for mouseleave events on trigger element.
* `onFocus: () => void = null`
  * Handler for focus events on trigger element.
* `onBlur: () => void = null`
  * Handler for blur events on trigger element.
* `onClickOutside: () => void = null`
  * Handler for clicks outside the anchor/popover elements.
* `onEsc: () => void = null`
  * Handler for 'Escape' keypress events.
* `onMouseEnterDelay?: number = 200`
  * Number of milliseconds to wait before showing the popover after mousing enters the trigger element (for triggerType `hover`).
* `onMouseLeaveDelay?: number = 200`
  * Number of milliseconds to wait before hiding the popover after the mouse leaves the trigger element (for triggerType `hover`).
* `accessibilityType?: ACCESSIBILITY_TYPE[string] = ACCESSIBILITY_TYPE.menu`
  * Controls how this popover behaves for screen readers and other assistive devices. See the A11Y section at the bottom of this document for more details.
* `overrides?: {Arrow, Body, Inner} = {}`
  * `Arrow?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Body?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Inner?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `StatefulContainer` API

Useful if you want the same behavior as a popover with your own rendering behavior. Supports same props as `StatefulPopover` with one change:

* `children: (popoverProps) => React.Node` - Required
  * The function passed as children will receive the props that would normally be passed to `Popover`, but you can use them to render whatever content you'd like.

## `StyledPadding` API

This is just a regular utility styled component that allows you to easily add padding in your popover.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledBody`, `StyledArrow`, `StyledInner`, `StyledPadding`

* `$isOpen: boolean`
  * Propagated from the parent.
* `$iAnimating: boolean`
  * `true` if the popover should currently be animating in or out.
* `$arrowOffset: {top: number, left: number}`
  * Object of numeric top/left pixel positions to offset arrow.
* `$popoverOffset: {top?: number | null, left?: number | null}`
  * Object of numeric top/left pixel positions to offset popover.
* `$showArrow: boolean`
  * Propagated from the parent.
* `$placement: PLACEMENT[string]`
  * Runtime placement (may differ from placement prop if popover would have overflowed viewport).
* `$ref: React.Ref<*>`
  * React ref for the popover element (should be passed down to dom element).

## `ACCESSIBILITY_TYPE` Constant

* `none`
* `menu`
* `tooltip`

## `PLACEMENT` Constant

* `auto`
* `topLeft`
* `top`
* `topRight`
* `rightTop`
* `right`
* `rightBottom`
* `bottomRight`
* `bottom`
* `bottomLeft`
* `leftBottom`
* `left`
* `leftTop`

## `TRIGGER_TYPE` Constant

* `click`
* `hover`

## `STATE_CHANGE_TYPE` Constant

* `open`
* `close`

## Implementation Details

### Dependencies

* popper.js - Handles all the logic around positioning, detecting overflow, arrow placement, etc.

### Adding handlers to the trigger

In order to trigger the popover the user has to click (or hover) on a trigger element. There are a couple strategies to set up these event handlers that have varying trade-offs:

1. **Wrapper** - We add a wrapper `<div>` or `<span>` around the passed in trigger element(s) and attach the necessary events. This gives us full control of events, but what's a good default `display` property? People might want their trigger to be display block, inline, or as a flex child, so we'd have to provide a prop or style override to control this.
2. **cloneElement** - Internally we call React.cloneElement on the `children` that the user passes in, and attach `onClick`, `onFocus`, etc event handlers. This avoids adding a wrapper DOM element but has other downside – (1) can't pass a string as child, (2) child passed in must accept arbitrary props, which is fine for DOM primitives but might get tricky when passing another component as the trigger.
3. **Child-as-function** - Instead of passing react elements through children, we could have users pass a function instead. This function would receive a props object with event handlers like `onClick`, `onFocus`, etc that they need to explicitly wire up (simplest case is spread into component props).

All the various libraries (atlaskit, antd, material etc) have different approaches here, so there's not really an accepted best practice.

The design in this RFC is based on #2 (`cloneElement`) as it seems like the solution that Just Works® the most. There may also be room for a hybrid approach – such as only adding a wrapper element if the user passes a string as the child. Thoughts are welcome here.

### Portals

For reliable rendering we need to append the popover to the body (instead of in the DOM where the popover is rendered). We will use [React 16's portals](https://reactjs.org/docs/portals.html) for this.

### Manually triggering close event

Imagine a simple "Share" popover:

```javascript
  <StatefulPopover
    content={
      <div>
        <ShareUrl/><Button onClick={onCopy}>Copy</Button>
      </div>
    }
  >
    <Button>Share</Button>
  </StatefulPopover>
```

Let's say we want the popover to close after the user clicks "Copy". In theory we could use the non-stateful `<Popover>` component and manage the state ourselves, passing the `isOpen` prop accordingly. However this complicates things significantly for the user – they may have to handle keyboard controls, on-click-outside, esc, etc on their own to properly set the `isOpen` prop.

A better approach is probably to accept `content` as a render prop that receives a `close` method:

```javascript
  <StatefulPopover
    content={({close}) => (
      <div>
        <ShareUrl/>
        <Button onClick={() => { onCopy(); close(); }}>Copy</Button>
      </div>
    )}
  >
    <Button>Share</Button>
  </StatefulPopover>
```

We could also support a component injection API, where the component you inject is explicitly passed a `close` prop:

```javascript
const PopoverContent = ({close}) => (
  <Button onClick={close}>Close</Button>
);

export default () => (
  <StatefulPopover overrides={{Content: PopoverContent}}>
    <Button>Share</Button>
  </StatefulPopover>
)
```

### Default styles

The popover element has zero padding by default. There are many valid use cases for both padded and non-padded popovers, so we've chosen to start with zero padding and provide an optional `StyledPadding` instead of forcing users to override styles and reset padding to zero.

When using the `Tooltip` component, padding is added by default.

## Accessibility

### Keyboard controls

* The anchor will be focusable and user can tab to it using their keyboard.
* When triggerType="hover" focusing on the anchor will open the tooltip automatically
* When triggerType="click" a focused tooltip can be triggered via spacebar (assuming the anchor is a button)
* Both the escape key and clicking outside the popover will close it

### A11y attributes (aria, etc)

Unfortunately there is no single accepted best practice for popovers – I encourage you to go inspect the DOM of various Google, Facebook, Twitter, etc products and see just how much the approaches differ. The truth is that the accessibility strategy depends on the purpose of the popover. – is it displaying static content? form elements? a menu with a list of items? These all require a different approach, and it's difficult for us to determine this purpose at runtime and automatically apply the appropriate strategy. Accordingly, we will try to provide a sane default and allow users to override if needed.

We'll support a prop `accessibilityType: 'none' | 'menu' | 'tooltip'` that defaults to `menu`

When used as a `menu`, the anchor will have `aria-haspopup="true" aria-expanded="true" aria-controls="popover-id"` and the popover will have `id="popover-id"`

When used as a `tooltip`, the anchor will have `id="jzowpv-anchor" aria-describedby="jzowpv-popover"` and the popover will have `id="jzowpv-popover" aria-ownedby="jzowpv-anchor" role="tooltip"` (note that `jzowpv` is a random uuid generated at runtime).

When `accessibilityType` is set to `none`, nothing will be added so the user can do whatever they wish.

If we find other common use cases we can add different `accessibilityType`s over time.

More reading on popover accessibility:
* [Long-standing Bootstrap popover accessibility issue](https://github.com/twbs/bootstrap/issues/18618)
* [Stack Overflow: what can aria-haspopup be used for?](https://stackoverflow.com/questions/20380488/accessibility-what-can-aria-haspopup-be-used-for)
* [Level Access: Expanding the use of aria-haspopup](https://www.levelaccess.com/expanding-the-use-of-the-aria-haspopup-property/)
* [Why aria-controls is supposedly bad](http://www.heydonworks.com/article/aria-controls-is-poop)
* [Using the aria-owns attribute](https://tink.uk/using-the-aria-owns-attribute/)
* [W3 wai-aria menu button example](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html)
* [W3 wai-aria role="tooltip"](https://www.w3.org/TR/wai-aria-1.1/#tooltip)
* [W3 wai-aria role="dialog"](https://www.w3.org/TR/wai-aria-1.1/#dialog)
