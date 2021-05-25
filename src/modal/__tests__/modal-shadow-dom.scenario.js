/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {Modal, ModalBody } from '../index.js';
import renderInWebComponent from '../../helpers/renderInWebComponent';

renderInWebComponent('modal-scenario', () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)} className="open-modal-button">
        Open Modal
      </Button>
      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        overrides={{Backdrop: {props: {'data-e2e': 'backdrop'}}}}
        closeable={true}
      >
        <ModalBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
});

export default function Scenario() {
  return (
      <modal-scenario></modal-scenario>
  );
}
