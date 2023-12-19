import React, {useState} from 'react';
import {Button} from 'baseui/button';
import {StatefulSelect} from 'baseui/select';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>
          <StatefulSelect
            options={[
              {id: 'AliceBlue', color: '#F0F8FF'},
              {id: 'AntiqueWhite', color: '#FAEBD7'},
              {id: 'Aqua', color: '#00FFFF'},
              {id: 'Aquamarine', color: '#7FFFD4'},
              {id: 'Azure', color: '#F0FFFF'},
              {id: 'Beige', color: '#F5F5DC'},
            ]}
            labelKey="id"
            valueKey="color"
            onChange={(event) => console.log(event)}
          />
        </ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Okay
          </ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
