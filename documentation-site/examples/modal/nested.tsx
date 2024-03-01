import * as React from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

interface Props {
  children: (args: {
    isConfirmationOpen: boolean;
    toggleConfirm: (open?: boolean, cb?: () => any) => any;
  }) => React.ReactNode;
}

interface State {
  isConfirmationOpen: boolean;
}

class ModalStateContainer extends React.Component<Props, State> {
  state = {
    isConfirmationOpen: false,
  };
  toggleConfirm = (
    open = !this.state.isConfirmationOpen,
    cb: () => any = () => {},
  ) => {
    this.setState({ isConfirmationOpen: open }, cb);
  };
  render() {
    return this.props.children({
      isConfirmationOpen: this.state.isConfirmationOpen,
      toggleConfirm: this.toggleConfirm,
    });
  }
}

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ModalStateContainer>
      {({ isConfirmationOpen, toggleConfirm }) => (
        <React.Fragment>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <ModalHeader>Hello world</ModalHeader>
            <ModalBody>
              Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
              ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut
              tempus.
            </ModalBody>
            <ModalFooter>
              <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                Cancel
              </ModalButton>
              <ModalButton onClick={() => toggleConfirm(true)}>
                Okay
              </ModalButton>
            </ModalFooter>
          </Modal>
          <Modal
            onClose={() => toggleConfirm(false)}
            isOpen={isConfirmationOpen}
          >
            <ModalHeader>Confirm</ModalHeader>
            <ModalBody>Confirm closing all.</ModalBody>
            <ModalFooter>
              <ModalButton kind="tertiary" onClick={() => toggleConfirm(false)}>
                No
              </ModalButton>
              <ModalButton
                onClick={() => {
                  toggleConfirm(false, () => setIsOpen(false));
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
}
