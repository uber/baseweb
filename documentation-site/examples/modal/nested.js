// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

class ModalStateContainer extends React.Component<
  {
    isInitiallyOpen: boolean,
    children: ({
      open: () => mixed,
      close: () => mixed,
      isOpen: boolean,
      isConfirmationOpen: boolean,
      toggleConfirm: (open?: boolean, cb?: () => mixed) => mixed,
    }) => React.Node,
  },
  {
    isOpen: boolean,
    isConfirmationOpen: boolean,
  },
> {
  static defaultProps = {
    isInitiallyOpen: false,
  };
  state = {
    isOpen: this.props.isInitiallyOpen,
    isConfirmationOpen: false,
  };
  toggle = (open: boolean = !this.state.isOpen) => {
    this.setState({
      isOpen: open,
    });
  };
  toggleConfirm = (
    open: boolean = !this.state.isConfirmationOpen,
    cb: () => mixed = () => {},
  ) => {
    this.setState(
      {
        isConfirmationOpen: open,
      },
      cb,
    );
  };
  open = () => {
    this.toggle(true);
  };

  close = () => {
    this.toggle(false);
  };
  render() {
    return this.props.children({
      open: this.open,
      close: this.close,
      isOpen: this.state.isOpen,
      isConfirmationOpen: this.state.isConfirmationOpen,
      toggleConfirm: this.toggleConfirm,
    });
  }
}

export default () => (
  <ModalStateContainer>
    {({open, close, isOpen, isConfirmationOpen, toggleConfirm}) => (
      <React.Fragment>
        <Button onClick={open}>Open Modal</Button>
        <Modal onClose={close} isOpen={isConfirmationOpen}>
          <ModalHeader>Confirm</ModalHeader>
          <ModalBody>Confirm closing all.</ModalBody>
          <ModalFooter>
            <ModalButton onClick={() => toggleConfirm(false)}>
              No
            </ModalButton>
            <ModalButton
              onClick={() => {
                toggleConfirm(false);
                close();
              }}
            >
              Yes
            </ModalButton>
          </ModalFooter>
        </Modal>
        <Modal onClose={close} isOpen={isOpen}>
          <ModalHeader>Hello world</ModalHeader>
          <ModalBody>
            Proin ut dui sed metus pharetra hend rerit vel non mi.
            Nulla ornare faucibus ex, non facilisis nisl. Maecenas
            aliquet mauris ut tempus.
          </ModalBody>
          <ModalFooter>
            <ModalButton onClick={close}>Cancel</ModalButton>
            <ModalButton onClick={() => toggleConfirm(true)}>
              Okay
            </ModalButton>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )}
  </ModalStateContainer>
);
