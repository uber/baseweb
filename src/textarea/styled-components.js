/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {
  getInputStyles,
  getInputContainerStyles,
} from '../input/styled-components.js';
import type {SharedStylePropsT} from './types.js';

export const StyledTextareaContainer = styled('div', props => ({
  ...getInputContainerStyles(props),
}));

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const StyledTextarea = styled<SharedStylePropsT>('textarea', props => ({
  ...getInputStyles(props),
  resize: 'none',
}));
