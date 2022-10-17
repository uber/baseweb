/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';

export const StyledRoot = styled<'div', {}>('div', ({}) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr 1fr',
}));

export const StyledNavContainer = styled<'div', {}>('div', ({}) => ({
  marginLeft: '8px',
}));

export const StyledAdditionalButtonsContainer = styled<'div', {}>('div', ({}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const StyledTitle = styled<'div', { $expanded: boolean }>(
  'div',
  ({ $theme, $expanded = false }) => ({
    ...($expanded ? $theme.typography.DisplayXSmall : $theme.typography.LabelLarge),
    display: 'flex',
    alignItems: 'center',
  })
);
