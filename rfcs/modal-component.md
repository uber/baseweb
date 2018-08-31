# Modal Component

### Exports

- `Modal`
- `ModalHeader`
- `ModalBody`
- `ModalFooter`
- `StyledRoot`
- `StyledBackdrop`
- `StyledDialog`
- `StyledDialogInner`
- `StyledHeader`
- `StyledBody`
- `StyledFooter`
- `StyledFooterAction`
- `StyledClose`
- `SIZE`
- `ROLE`

### <Modal/> API

- `children: React.node | ({close: fn}) => React.node` - Required
  Modal content. The children-as-function API may be preferable for performance reasons (wont render until opened) and also gives users access to a `close()` callback that they can add to buttons
- `isOpen: boolean` - Required
  Controls whether the modal is visible or not
- `closeable: boolean` - Optional, Defaults to `true`
  Whether the modal should be closeable by the user (either via escape, backdrop click, etc). You can set this to `false` if your modal has an action that the user _must_ take before closing.
- `onClose: (source: CloseSource) => void` - Optional
  A callback that is invoked when the modal will close. Callback is passed a constant identifying what triggered the close.
- `size: SIZE.{small|medium|large|full|cover|auto}|string|number`, Defaults to SIZE.default
  Controls the size of the modal (primarily width). Can be a SIZE constant or css `width` property value.
- `aria-labelledby: string` - Optional, Default to ''
  If specified, will be passed to the dialog element
- `aria-describedby: string` - Optional, Defaults to ''
  If specified, will be passed to the dialog element
- `aria-label: string` - Optional, Defaults to ''
  If specified, will be passed to the dialog element (described the modal for screen readers)
- `id: string` - Optional, Defaults to ''
  If specified, will be passed to the dialog element
- `role: 'dialog'|'alertdialog'|string` - Optional, Defaults to 'dialog'
  Which accessibility role this modal should have
- `mountNode: HTMLElement | React.Ref` - Optional, Defaults to document.body
  Where to mount the modal
- `overrides: {Root, Backdrop, Dialog, DialogInner, Close}` - Optional
  Overrides for presentational components. See "Presentational Components Props API" below.
  - `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

### <ModalHeader/> API

ModalHeader is just a styled component with spacing / typography

- `$style: () => {} | {}` - Optional
  Style overrides object or function

### <ModalBody/> API

ModalBody is just a styled component with the correct spacing

- `$style: () => {} | {}` - Optional
  Style overrides object or function

### <ModalFooter/> API

ModalBody is just a styled component with spacing and top border

- `$style: () => {} | {}` - Optional
  Style overrides object or function

### <ModalButton/> API

ModalButton is just a normal BaseUI button with margin already applied
See <Button/> docs for available props and usage.

### SIZE Constant

- `compact` - 400px width
- `default` - 550px width
- `full` - Span full viewport, minus some margin
- `auto` - Based on content width

### CLOSE_SOURCE Constant

- `close_button`
- `escape`
- `backdrop`

### Presentational Components Props API

Next properties are passed to every presentational (styled) component

- `$isOpen: boolean`
- `$size: string|number`
- `$role: string`
- `$closeable: boolean`
- `$theme: theme`

More props likely TBA as development continues

### Usage

Basic usage:

```javascript
import * as React from 'react';
import {Modal, SIZE} from 'baseui/modal';

class App extends React.Component {
  state = {
    open: true,
  };
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
```

### Key Design Decisions

- Modal content will not render server side. This is because portals don't exist server-side, and realistically your page shouldn't be loading with a modal open.

### Accesibility

Good read: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html

- Upon opening, first focusable item in modal will receive focus (form input, footer button, etc)
- Dialog element will `aria-modal="true"`
- Explicitly expose props for role, aria-labeledby, aria-describedby, id, to encourage good a11y practices
- `Tab` key will move between focusable items (form inputs, footer buttons, etc). According to best practices, tabbing past the last focusable item should loop back to the first focusable item.
- `Escape` key will close the modal
- Click on backdrop (anywhere outside dialog) will hide modal
- Background will not be scrollable while modal is open (position: fixed)
- Focus should ideally be transitioned back to last focused element upon closing

### Possible Future Props

The following props could be useful in the future but are low priority for V1

- `backdrop: boolean` - Set to false to not show a transparent backdrop
- `onOpenComplete: function` - handler after opening (after animation, etc)
- `onCloseComplete: function` - handler after closing (after animation, etc)
- `autofocus: boolean` - Set to false if modal shouldn't autofocus on its content
- `enforceFocus: boolean` - Set to false if we should force focus to stay in modal
- `usePortal: boolean` - Set to false to not use a portal, and just mount as direct child
- `disableRestoreFocus: boolean` - Set to false to not restore focus to previous element on close
- `keepMounted` - Keep children in DOM but not visible (could be good for SEO)
