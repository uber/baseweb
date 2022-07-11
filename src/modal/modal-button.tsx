/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button } from '../button/index';
import type { ButtonPropsT } from '../button/types';
import { mergeOverrides } from '../helpers/overrides';

// ModalButtons should have some margin pre-applied
const overrides = {
  BaseButton: {
    style: ({ $theme }) => {
      const marginInlineEnd: string = $theme.direction !== 'rtl' ? 'marginRight' : 'marginLeft';
      return {
        ':not(:last-child)': {
          [marginInlineEnd]: $theme.sizing.scale500,
        },
      };
    },
  },
};

const ModalButton = React.forwardRef<HTMLElement, ButtonPropsT>((props, ref) => (
  //$FlowExpectedError[cannot-spread-inexact]
  <Button ref={ref} {...props} overrides={mergeOverrides(overrides, props.overrides)} />
));
ModalButton.displayName = 'ModalButton';

export default ModalButton;
