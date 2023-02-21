/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';

export const StyledRoot = styled<'div', {}>('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: $theme.sizing.scale300,
  width: '100%',
  paddingTop: $theme.sizing.scale600,
  paddingRight: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  backgroundColor: $theme.colors.backgroundPrimary,
  container: 'root / inline-size',
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledActionContainer = styled<'div', {}>('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: $theme.sizing.scale300,
  '@container root (min-width: 600px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
StyledActionContainer.displayName = 'StyledActionContainer';

export const StyledActionSubContainer = styled<'div', { $reverseWhenWide }>(
  'div',
  ({ $reverseWhenWide, $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: $theme.sizing.scale300,
    '@container root (min-width: 600px)': {
      flexDirection: $reverseWhenWide ? 'row-reverse' : 'row',
    },
  })
);
StyledActionSubContainer.displayName = 'StyledActionSubContainer';
