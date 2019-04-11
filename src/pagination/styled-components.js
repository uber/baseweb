/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {StyledBaseButton} from '../button/index.js';

export const StyledRoot = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const StyledMaxLabel = styled('span', ({$theme}) => ({
  ...$theme.typography.font300,
  marginLeft: $theme.sizing.scale300,
  marginRight: $theme.sizing.scale600,
}));

export const StyledDropdownContainer = styled('div', ({$theme}) => ({
  position: 'relative',
  marginLeft: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale300,
}));

export const StyledDropdownMenu = styled(StyledList, ({$theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  overflow: 'auto',
  maxHeight: '200px',
  // top: 'auto',
  marginTop: $theme.sizing.scale300,
  marginBottom: $theme.sizing.scale300,
  // left: 0,
  // right: 0,
  // zIndex: 1,
}));

export const StyledDropdownButton = styled(StyledBaseButton, ({$theme}) => ({
  color: $theme.colors.foreground,
  minWidth: `calc(${$theme.sizing.scale1600} + ${$theme.sizing.scale400})`,
}));
