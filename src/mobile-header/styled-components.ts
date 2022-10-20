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
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  ...($type === TYPE.floating
    ? { backgroundColor: 'transparent' }
    : { backgroundColor: $theme.colors.backgroundPrimary }),
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledNavContainer = styled<'div', { $hasTextContent: boolean; $type: Type }>(
  'div',
  ({ $hasTextContent, $type }) =>
    $hasTextContent && $type === TYPE.fixed
      ? {}
      : {
          paddingLeft: '8px',
        }
);
StyledNavContainer.displayName = 'StyledNavContainer';

// TODO: this name is cumbersome
export const StyledAdditionalButtonsContainer = styled<'div', {}>('div', ({}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gridColumn: '3 / 4',
}));
StyledAdditionalButtonsContainer.displayName = 'StyledAdditionalButtonsContainer';

// TODO: should this be StyledTitleContainer?
export const StyledTitle = styled<'div', { $expanded: boolean }>(
  'div',
  ({ $theme, $expanded = false }) => ({
    alignSelf: 'center',
    ...($expanded ? $theme.typography.DisplayXSmall : $theme.typography.LabelLarge),
    ...($expanded
      ? {
          gridColumn: '1 / 4',
          gridRow: 2,
          paddingLeft: '16px',
        }
      : {}),
    // truncate long titles
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  })
);
StyledTitle.displayName = 'StyledTitle';
