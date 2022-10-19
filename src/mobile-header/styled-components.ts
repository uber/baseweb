/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { TYPE } from './constants';
import type { Type } from './types';

export const StyledRoot = styled<'div', { $type: Type }>('div', ({ $theme, $type }) => ({
  position: 'sticky',
  top: '0',
  boxSizing: 'border-box', // TODO: do you need this?
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  ...($type === TYPE.floating
    ? { backgroundColor: 'transparent' }
    : { backgroundColor: $theme.colors.backgroundPrimary }),
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledNavContainer = styled<'div', {}>('div', ({}) => ({
  paddingLeft: '8px',
}));
StyledNavContainer.displayName = 'StyledNavContainer';

export const StyledAdditionalButtonsContainer = styled<'div', {}>('div', ({}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gridColumn: '3 / 4',
}));
StyledAdditionalButtonsContainer.displayName = 'StyledAdditionalButtonsContainer';

export const StyledTitle = styled<'div', { $expanded: boolean }>(
  'div',
  ({ $theme, $expanded = false }) => ({
    display: 'flex',
    alignItems: 'center',
    ...($expanded ? $theme.typography.DisplayXSmall : $theme.typography.LabelLarge),
    ...($expanded
      ? {
          gridColumn: '1 / 4',
          gridRow: 2,
          paddingLeft: '16px',
          marginTop: '8px',
        }
      : {}),
    // truncate long titles // TODO: this doesn't work 🤔
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  })
);
StyledTitle.displayName = 'StyledTitle';
