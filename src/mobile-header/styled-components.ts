/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { TYPE } from './constants';
import type { Type } from './types';

export const StyledRoot = styled<'div', { $type: Type }>('div', ({ $theme, $type }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  ...($type === TYPE.floating
    ? { backgroundColor: 'transparent', pointerEvents: 'none' }
    : { backgroundColor: $theme.colors.backgroundPrimary }),
}));
StyledRoot.displayName = 'StyledRoot';

export const StyledNavContainer = styled<'div', { $hasTextContent: boolean; $type: Type }>(
  'div',
  ({ $hasTextContent, $type, $theme }) => {
    const floatingPadding =
      $theme.direction === 'rtl'
        ? { paddingRight: $theme.sizing.scale300 }
        : { paddingLeft: $theme.sizing.scale300 };

    return {
      pointerEvents: 'auto',
      ...($hasTextContent && $type === TYPE.fixed ? {} : floatingPadding),
    };
  }
);
StyledNavContainer.displayName = 'StyledNavContainer';

export const StyledActionButtonsContainer = styled<'div', {}>('div', ({}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gridColumn: '3 / 4',
  pointerEvents: 'auto',
}));
StyledActionButtonsContainer.displayName = 'StyledActionButtonsContainer';

export const StyledTitle = styled<'div', { $expanded: boolean }>(
  'div',
  ({ $theme, $expanded = false }) => ({
    alignSelf: 'center',
    justifyContent: 'flex-start',
    ...($expanded ? $theme.typography.DisplayXSmall : $theme.typography.LabelLarge),
    ...($expanded
      ? {
          gridColumn: '1 / 4',
          gridRow: 2,
          paddingLeft: $theme.sizing.scale600,
        }
      : {}),
    // truncate long titles
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  })
);
StyledTitle.displayName = 'StyledTitle';
