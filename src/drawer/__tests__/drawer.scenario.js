/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {Drawer, SIZE, ANCHOR} from '../index.js';

export const name = 'drawer';

type DrawerStateContainerPropsT = {
  isInitiallyOpen: boolean,
  children: ({
    toggle: (open?: boolean) => void,
    open: () => void,
    close: () => void,
    isOpen: boolean,
  }) => React.Node,
};

type DrawerStateContainerStateT = {
  isOpen: boolean,
};

class DrawerStateContainer extends React.Component<
  DrawerStateContainerPropsT,
  DrawerStateContainerStateT,
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
  <DrawerStateContainer isInitiallyOpen>
    {({open, close, isOpen}) => (
      <React.Fragment>
        <Button onClick={open} className="open-drawer-button">
          Open Drawer
        </Button>
        <Drawer
          animate={false}
          onClose={close}
          isOpen={isOpen}
          size={SIZE.default}
          anchor={ANCHOR.right}
        >
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </Drawer>
      </React.Fragment>
    )}
  </DrawerStateContainer>
);
