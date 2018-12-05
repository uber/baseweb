/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

/**
 * Main component container element
 */
export const Root = styled('div', (props: SharedStylePropsT) => {
  const {$prop, $theme} = props;
  return {
    color: $prop ? $theme.colors.primary400 : $theme.colors.positive400,
    cursor: 'pointer',
  };
});
Root.displayName = 'StyledRoot';
