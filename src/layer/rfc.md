# Layers in BaseWeb

## Motivation

Every UI has stackable layers and it's important to have control over how the layers play together. Some the examples of the stackable layers are tooltips, modals, popovers like select dropdowns or menus. The issues that come up along the layers usage are z-index and visibility handling, what layer goes on top. There are many more other layers related issues that include focus management, hover management, keyboard navigation, click events and hotkeys usage.
In the current RFC we want to solve the first two issues (z-index and visibility management) on a component library level.

## Implementation

We intended to introduce `baseui/layers` component that renders all the layers into a host element, instead of the `body` element, using `createPortal`. We will remove usage of z-index property across the library and have layers completely rely on the stacking context.
`Layer` component will be configurable for the cases where it needs to be positioned near a reference element. We'll leverage Popper.js to handle this cases. We can abstract the current popover implementation for it.

In the current state we'll need to migrate the `Pagination` component to have the dropdowns rendered as a new layer.

## Usage

```jsx
// app.js
import * as React from 'react';
import {LayersManager} from 'baseui/layers';
import Root from './root.js';

export default () => (
  <LayersManager>
    <Root>
      <Modal />
      <Popover />
    </Root>
  </LayersManager>
);
```

```jsx
// modal.js
import * as React from 'react';
import {Layer} from 'baseui/layers';

class Modal extends React.Component {
  ...
  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return <Layer>{this.renderModal()}</ Layer>;
  }
}
```

```jsx
// popover.js with the current implemengtation
import * as React from 'react';
import {Layer} from 'baseui/layers';

class Popover extends React.Component {
  ...
  render() {
    if (!this.props.isOpen) {
      return rendered;
    }
    rendered.push(<Layer>{this.renderPopover()}</ Layer>);
    return rendered;
  }
}
```

## Opened questions

- Should we do anything about handling z-index for the elements rendered into a custom node?
