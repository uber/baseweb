/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Button} from '../button/index.js';
import type {ButtonPropsT} from '../button/types.js';
import {mergeOverrides} from '../helpers/overrides.js';

// ModalButtons should have some margin pre-applied
const overrides = {
  BaseButton: {
    style: ({$theme}) => {
      const marginInlineEnd: string =
        $theme.direction !== 'rtl' ? 'marginRight' : 'marginLeft';
      return {
        ':not(:last-child)': {
          [marginInlineEnd]: $theme.sizing.scale500,
        },
      };
    },
  },
};

const ModalButton = React.forwardRef<ButtonPropsT, HTMLElement>(
  (props, ref) => (
    <Button
      ref={ref}
      {...props}
      overrides={mergeOverrides(overrides, props.overrides)}
    />
  ),
);

export default ModalButton;
