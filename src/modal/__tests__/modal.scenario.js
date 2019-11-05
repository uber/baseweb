/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
} from '../index.js';

export const name = 'modal';

export const component = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)} className="open-modal-button">
        Open Modal
      </Button>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        size={SIZE.default}
      >
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={() => setIsOpen(false)}
            data-e2e="cancel-button"
          >
            Cancel
          </ModalButton>
          <ModalButton onClick={() => setIsOpen(false)}>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
