/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';

export const StyledRoot = styled<{}>('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: $theme.colors.backgroundInversePrimary,
  ...$theme.typography.font350,
}));

export const StyledMaxLabel = styled<{}>('span', ({ $theme }) => {
  const marginStartDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  const marginEndDir: string = $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
  return {
    [marginStartDir]: $theme.sizing.scale300,
    [marginEndDir]: $theme.sizing.scale600,
  };
});

export const StyledDropdownContainer = styled<{
  $isFocusVisible: boolean;
}>('div', ({ $theme, $isFocusVisible }) => {
  const marginStartDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  const marginEndDir: string = $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';

  return {
    position: 'relative',
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    [marginStartDir]: $theme.sizing.scale600,
    [marginEndDir]: $theme.sizing.scale300,
  };
});
