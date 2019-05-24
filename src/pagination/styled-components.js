/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => ({
  display: 'flex',
  alignItems: 'center',
  color: $theme.colors.backgroundInv,
  ...$theme.typography.font450,
}));

export const StyledMaxLabel = styled<{}>('span', ({$theme}) => ({
  marginLeft: $theme.sizing.scale300,
  marginRight: $theme.sizing.scale600,
}));

export const StyledDropdownContainer = styled<{}>('div', ({$theme}) => ({
  position: 'relative',
  marginLeft: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale300,
}));
