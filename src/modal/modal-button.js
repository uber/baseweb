/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {defaultProps} from '../button/default-props.js';
import {Button} from '../button/index.js';
import type {ButtonPropsT} from '../button/types.js';
import {mergeOverrides} from '../helpers/overrides.js';

// ModalButtons should have some margin pre-applied
const overrides = {
  BaseButton: {
    style: ({$theme}) => ({
      marginLeft: $theme.sizing.scale500,
    }),
  },
};

export default class ModalButton extends React.Component<ButtonPropsT> {
  static defaultProps = defaultProps;

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
