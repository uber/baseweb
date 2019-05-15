/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {StyledBaseButton} from '../button/index.js';

export const Root = styled('nav', {
  display: 'flex',
  alignItems: 'center',
});

export const MaxLabel = styled('span', ({$theme}) => ({
  ...$theme.typography.font300,
  marginLeft: $theme.sizing.scale300,
  marginRight: $theme.sizing.scale600,
}));

export const DropdownContainer = styled('div', ({$theme}) => ({
  position: 'relative',
  marginLeft: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale300,
}));

export const DropdownMenu = styled(StyledList, ({$theme}) => ({
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '200px',
  top: 'auto',
  marginTop: $theme.sizing.scale300,
  left: 0,
  right: 0,
  zIndex: 1,
}));

export const DropdownButton = styled(StyledBaseButton, ({$theme}) => ({
  color: $theme.colors.foreground,
  minWidth: `calc(${$theme.sizing.scale1600} + ${$theme.sizing.scale400})`,
}));
