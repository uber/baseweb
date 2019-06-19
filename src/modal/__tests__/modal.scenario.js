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

type ModalStateContainerPropsT = {
  isInitiallyOpen: boolean,
  children: ({
    toggle: (open?: boolean) => void,
    open: () => void,
    close: () => void,
    isOpen: boolean,
  }) => React.Node,
};

type ModalStateContainerStateT = {
  isOpen: boolean,
};

class ModalStateContainer extends React.Component<
  ModalStateContainerPropsT,
  ModalStateContainerStateT,
> {
  static defaultProps = {
    isInitiallyOpen: false,
  };
  state = {
    isOpen: this.props.isInitiallyOpen,
  };
  toggle = (open?: boolean = !this.state.isOpen) => {
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
      toggle: this.toggle,
      open: this.open,
      close: this.close,
      setState: this.setState.bind(this),
      ...this.state,
    });
  }
}

export const component = () => (
  <ModalStateContainer isInitiallyOpen>
    {({open, close, isOpen}) => (
      <React.Fragment>
        <Button onClick={open} className="open-modal-button">
          Open Modal
        </Button>
        <Modal onClose={close} isOpen={isOpen} size={SIZE.default}>
          <ModalHeader>Hello world</ModalHeader>
          <ModalBody>
            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
            faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
          </ModalBody>
          <ModalFooter>
            <ModalButton onClick={close} data-e2e="cancel-button">
              Cancel
            </ModalButton>
            <ModalButton onClick={close}>Okay</ModalButton>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )}
  </ModalStateContainer>
);
