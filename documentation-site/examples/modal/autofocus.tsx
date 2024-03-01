import * as React from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from "baseui/modal";

export default function Example() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen((s) => !s)}>Open Modal</Button>
      <Modal onClose={() => setOpen(false)} isOpen={isOpen}>
        <FocusOnce>
          <ModalHeader>Some Header</ModalHeader>
        </FocusOnce>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            quam nisl, tempor ut varius sit amet, sodales sit amet mauris.
            Aliquam vitae sapien quis eros finibus aliquet.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={() => setOpen(false)}>
            Close
          </ModalButton>
          <ModalButton autoFocus onClick={() => setOpen(false)}>
            Confirm
          </ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
