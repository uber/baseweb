import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

interface Props {
  isInitiallyOpen: boolean;
  children: (args: {
    open: () => any;
    close: () => any;
    isOpen: boolean;
    isConfirmationOpen: boolean;
    toggleConfirm: (open?: boolean, cb?: () => any) => any;
  }) => React.ReactNode;
}

interface State {
  isOpen: boolean;
  isConfirmationOpen: boolean;
}

class ModalStateContainer extends React.Component<Props, State> {
  static defaultProps = {
    isInitiallyOpen: false,
  };
  state = {
    isOpen: this.props.isInitiallyOpen,
    isConfirmationOpen: false,
  };
  toggle = (open = !this.state.isOpen) => {
    this.setState({
      isOpen: open,
    });
  };
  toggleConfirm = (
    open = !this.state.isConfirmationOpen,
    cb: () => any = () => {},
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
        <Modal onClose={close} isOpen={isConfirmationOpen}>
          <ModalHeader>Confirm</ModalHeader>
          <ModalBody>Confirm closing all.</ModalBody>
          <ModalFooter>
            <ModalButton onClick={() => toggleConfirm(false)}>
              No
            </ModalButton>
            <ModalButton
              onClick={() => {
                toggleConfirm(false, close);
              }}
            >
              Yes
            </ModalButton>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )}
  </ModalStateContainer>
);
