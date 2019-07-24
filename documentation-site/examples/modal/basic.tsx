import * as React from 'react';
import {Button} from 'baseui/button';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

interface IRenderChildrenProps {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

class ModalStateContainer extends React.Component<
  {
    isInitiallyOpen: boolean;
    children: (args: IRenderChildrenProps) => React.ReactNode;
  },
  {isOpen: boolean}
> {
  static defaultProps = {
    isInitiallyOpen: false,
  };
  state = {
    isOpen: this.props.isInitiallyOpen,
  };
  toggle = (open: boolean = !this.state.isOpen) => {
    this.setState({
      isOpen: !!open,
    });
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
    });
  }
}

export default () => (
  <ModalStateContainer>
    {({open, close, isOpen}) => (
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
            <ModalButton onClick={close}>Okay</ModalButton>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )}
  </ModalStateContainer>
);
