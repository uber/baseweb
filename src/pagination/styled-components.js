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
  ...$theme.typography.font350,
}));

export const StyledMaxLabel = styled<{}>('span', ({$theme}) => {
  const left: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  const right: string =
    $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';

  return {
    [left]: $theme.sizing.scale300,
    [right]: $theme.sizing.scale600,
  };
});

export const StyledDropdownContainer = styled<{}>('div', ({$theme}) => {
  const left: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  const right: string =
    $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';

  return {
    position: 'relative',
    [left]: $theme.sizing.scale600,
    [right]: $theme.sizing.scale300,
  };
});
