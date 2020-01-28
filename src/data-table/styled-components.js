/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';

/**
 * Empty Container
 */
export const EmptyState = styled<{}>('div', ({$theme}) => {
  return ({
    ...$theme.typography.font100,
    marginTop: $theme.sizing.scale600,
    marginLeft: $theme.sizing.scale600,
  }: {});
});
EmptyState.displayName = 'StyledEmptyState';
