# Modal Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Modal, SIZE} from 'baseui/modal';

class App extends React.Component {
  state = {
    open: true,
  };
  render() {
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({open: true})}>Open</Button>
        <Modal
          isOpen={this.state.open}
          close={() => this.setState({open: false})}
        >
          {({close}) => (
            <>
              <ModalHeader>Whatsup!</ModalHeader>
              <ModalBody>This is a modal</ModalBody>
              <ModalFooter>
                <ModalButton kind="tertiary" onClick={close}>
                  Close
                </ModalButton>
                <ModalButton kind="primary" onClick={this.submit}>
                  Let’s Go
                </ModalButton>
              </ModalFooter>
            </>
          )}
        </Modal>
      </React.Fragment>
    );
  }
}
```

## Exports

* `Modal`
* `ModalHeader`
* `ModalBody`
* `ModalFooter`
* `StyledRoot`
* `StyledBackdrop`
* `StyledDialogContainer`
* `StyledDialog`
* `StyledHeader`
* `StyledBody`
* `StyledFooter`
* `StyledFooterAction`
* `StyledClose`
* `SIZE`
* `ROLE`

## `Modal` API

* `children: React.node | () => React.node` - Required
  Modal content. The children-as-function API may be preferable for performance reasons (wont render until opened)
* `isOpen: boolean` - Required
  Controls whether the modal is visible or not
* `closeable: boolean` - Optional, Defaults to `true`
  Whether the modal should be closeable by the user (either via escape, backdrop click, etc). You can set this to `false` if your modal has an action that the user _must_ take before closing.
* `onClose: (source: CloseSource) => void` - Optional
  A callback that is invoked when the modal will close. Callback is passed a constant identifying what triggered the close.
* `size: SIZE.{default|full|auto}|string|number`, Defaults to SIZE.default
  Controls the size of the modal (primarily width). Can be a SIZE constant or css `width` property value.
* `role: 'dialog'|'alertdialog'|string` - Optional, Defaults to 'dialog'
  Which accessibility role this modal should have
* `mountNode: HTMLElement` - Optional, Defaults to document.body
  Where to mount the modal
* `autofocus: boolean`, Defaults to true
  Set to false if modal shouldn't autofocus on its content. Moving focus into a newly opened modal is important for accessibility purposes. If you set this to false, you should manually trigger focus on another element in the modal.
* `overrides: {Root, Backdrop, Dialog, DialogContainer, Close}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

## `ModalHeader` API

ModalHeader is just a styled component with spacing / typography

* `$style: () => {} | {}` - Optional
  Style overrides object or function

## `ModalBody` API

ModalBody is just a styled component with the correct spacing

* `$style: () => {} | {}` - Optional
  Style overrides object or function

## `ModalFooter` API

ModalBody is just a styled component with spacing and top border

* `$style: () => {} | {}` - Optional
  Style overrides object or function

## `ModalButton` API

ModalButton is just a normal BaseUI button with margin already applied
See `Button` docs for available props and usage.

## SIZE Constant

* `compact` - 400px width
* `default` - 550px width
* `full` - Span full viewport, minus some margin
* `auto` - Based on content width

## CLOSE_SOURCE Constant

* `close_button`
* `escape`
* `backdrop`

## Presentational Components Props API

Next properties are passed to every presentational (styled) component

* `$isOpen: boolean`
* `$size: string|number`
* `$role: string`
* `$closeable: boolean`
* `$theme: theme`

More props likely TBA as development continues

### Key Design Decisions

* Modal content will not render server side. This is because portals don't exist server-side, and realistically your page shouldn't be loading with a modal open.

### Accesibility

Good read on [dialogs here](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html).

* Upon opening, focus will be transferred to the dialog itself (unless `autofocus` is set to false)
* Dialog element will have `aria-modal="true"`
* Explicitly expose a `role` prop to control whether `dialog` or `alertdialog` is used.
* `Tab` key will move between focusable items (form inputs, footer buttons, etc). User should not be able to tab to items outside of modal – lucky for us most modern browsers seem to enforce this by default now for role dialog or aria-modal.
* `Escape` key will close the modal
* Click on backdrop (anywhere outside dialog) will hide modal
* Background will not be scrollable while modal is open (position: fixed)
* Focus should ideally be transitioned back to last focused element upon closing
* If a ModalTitle child is found, apply an id to the ModalTitle and set aria-labeledby on the dialog
* Customer can use overrides to apply extra aria props to specific elements if needed
* Support mutliple modals via an overlay manager

### Possible Future Props

The following props could be useful in the future but are low priority for V1

* `backdrop: boolean` - Set to false to not show a transparent backdrop
* `onOpenComplete: function` - handler after opening (after animation, etc)
* `onCloseComplete: function` - handler after closing (after animation, etc)
* `enforceFocus: boolean` - Set to false if we should force focus to stay in modal
* `usePortal: boolean` - Set to false to not use a portal, and just mount as direct child
* `disableRestoreFocus: boolean` - Set to false to not restore focus to previous element on close
* `keepMounted` - Keep children in DOM but not visible (could be good for SEO)
