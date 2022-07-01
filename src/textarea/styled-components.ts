/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled, type ThemeT } from '../styles/index.js';
import {
  getInputStyles,
  getInputContainerStyles,
  getRootStyles,
} from '../input/styled-components.js';
import type { SharedStylePropsT } from './types.js';

export const StyledTextAreaRoot = styled<SharedStylePropsT>(
  'div',
  (props: SharedStylePropsT & { $theme: ThemeT }) => {
    return getRootStyles({ $positive: false, ...props, $hasIconTrailing: false });
  }
);

export const StyledTextareaContainer = styled<SharedStylePropsT>(
  'div',
  (props: SharedStylePropsT & { $theme: ThemeT }) => ({
    ...getInputContainerStyles({ $positive: false, ...props }),
  })
);

export const StyledTextarea = styled<SharedStylePropsT>(
  'textarea',
  (props: SharedStylePropsT & { $theme: ThemeT }) => ({
    ...getInputStyles(props),
    resize: 'none',
  })
);
