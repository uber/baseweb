/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsArgT} from './types.js';

/**
 * Main component container element
 */
export const Root = styled<SharedStylePropsArgT>('div', ({$theme}) => {
  return {
    width: '100%',
  };
});
Root.displayName = 'StyledRoot';

export const List = styled<SharedStylePropsArgT>('ul', ({$isDragged}) => {
  return ({
    paddingLeft: 0,
    cursor: $isDragged ? 'grabbing' : null,
    pointerEvents: $isDragged ? 'none' : 'auto',
  }: {});
});
List.displayName = 'StyledList';

export const Item = styled<SharedStylePropsArgT>(
  'li',
  ({$isDragged, $isSelected, $theme}) => {
    return ({
      ':hover':
        !$isDragged && !$isSelected
          ? {
              borderTopWidth: '2px',
              borderBottomWidth: '2px',
              borderLeftWidth: '2px',
              borderRightWidth: '2px',
              borderTopStyle: 'solid',
              borderBottomStyle: 'solid',
              borderLeftStyle: 'solid',
              borderRightStyle: 'solid',
              borderTopColor: $theme.colors.primary,
              borderBottomColor: $theme.colors.primary,
              borderLeftColor: $theme.colors.primary,
              borderRightColor: $theme.colors.primary,
            }
          : {},
      paddingTop: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      color: $theme.colors.contentPrimary,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      cursor: $isDragged ? 'grabbing' : 'grab',
      backgroundColor: $theme.colors.backgroundPrimary,
      boxShadow: $isDragged ? '0 2px 6px rgba(0, 0, 0, 0.32)' : null,
      borderTopWidth: '2px',
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopColor:
        $isDragged || $isSelected ? $theme.colors.primary : 'transparent',
      borderBottomColor:
        $isDragged || $isSelected ? $theme.colors.primary : 'transparent',
      borderLeftColor:
        $isDragged || $isSelected ? $theme.colors.primary : 'transparent',
      borderRightColor:
        $isDragged || $isSelected ? $theme.colors.primary : 'transparent',
    }: {});
  },
);
List.displayName = 'StyledItem';

export const DragHandle = styled<SharedStylePropsArgT>('div', ({$theme}) => ({
  [$theme.direction === 'rtl' ? 'marginLeft' : 'marginRight']: $theme.sizing
    .scale600,
  width: $theme.sizing.scale800,
  display: 'flex',
  alignItems: 'center',
}));
DragHandle.displayName = 'StyledDragHandle';

export const CloseHandle = styled<SharedStylePropsArgT>(
  'button',
  ({$theme}) => ({
    border: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    overflow: 'visible',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
      .scale600,
    width: $theme.sizing.scale800,
    display: 'flex',
    alignItems: 'center',
  }),
);
CloseHandle.displayName = 'StyledCloseHandle';

export const Label = styled<SharedStylePropsArgT>('div', ({$theme}) => ({
  flexGrow: 1,
  ...$theme.typography.font300,
}));
Label.displayName = 'StyledLabel';
