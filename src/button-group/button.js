/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Button as GenericButton} from '../button/index.js';

import {StyledButton} from './styled-components.js';
import type {ButtonPropsT} from './types.js';

export default function Button(props: ButtonPropsT) {
  const {first, last, overrides = {}, selected, ...restProps} = props;
  return (
    <GenericButton
      $first={first}
      $last={last}
      $selected={selected}
      overrides={{BaseButton: StyledButton, ...overrides}}
      {...restProps}
    >
      {props.children}
    </GenericButton>
  );
}

Button.defaultProps = {
  ...GenericButton.defaultProps,
  selected: false,
};
