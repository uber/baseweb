/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => ({
  display: 'flex',
  alignItems: 'center',
  color: $theme.colors.backgroundInversePrimary,
  ...$theme.typography.font350,
}));

export const StyledMaxLabel = styled<{}>('span', ({$theme}) => ({
  [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
    .scale300,
  [$theme.direction === 'rtl' ? 'marginLeft' : 'marginRight']: $theme.sizing
    .scale600,
}));

export const StyledDropdownContainer = styled<{}>('div', ({$theme}) => ({
  position: 'relative',
  [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
    .scale600,
  [$theme.direction === 'rtl' ? 'marginLeft' : 'marginRight']: $theme.sizing
    .scale300,
}));
