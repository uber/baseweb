/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Button} from '../button';
import type {ButtonPropsT} from '../button/types';
import {mergeOverrides} from '../helpers/overrides';

// ModalButtons should have some margin pre-applied
const overrides = {
  BaseButton: {
    style: ({$theme}) => ({
      marginLeft: $theme.sizing.scale500,
    }),
  },
};

export default class ModalButton extends React.Component<ButtonPropsT> {
  static defaultProps = Button.defaultProps;

  render() {
    return (
      <Button
        {...this.props}
        overrides={mergeOverrides(overrides, this.props.overrides)}
      >
        {this.props.children}
      </Button>
    );
  }
}
