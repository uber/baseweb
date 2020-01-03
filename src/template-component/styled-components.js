/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedStylePropsT>('div', props => {
  const {$prop, $theme} = props;
  return {
    color: $prop ? $theme.colors.accent : $theme.colors.positive400,
    cursor: 'pointer',
  };
});
