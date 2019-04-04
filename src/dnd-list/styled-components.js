/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {ThemeT} from '../styles/index.js';
import type {SharedStylePropsArgT} from './types.js';
type StylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

/**
 * Main component container element
 */
export const Root = styled('div', ({$theme}: StylePropsT) => {
  return {
    width: '100%',
  };
});
Root.displayName = 'StyledRoot';

export const List = styled('ul', ({$isDragged}: StylePropsT) => {
  return {
    paddingLeft: 0,
    cursor: $isDragged ? 'grabbing' : null,
  };
});
List.displayName = 'StyledList';

export const Item = styled(
  'li',
  ({$isDragged, $isSelected, $theme}: StylePropsT) => {
    return {
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
      color: $theme.colors.colorPrimary,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      cursor: $isDragged ? 'grabbing' : 'grab',
      backgroundColor: $theme.colors.backgroundAlt,
      boxShadow: $isDragged ? '0px 2px 6px rgba(39, 110, 241, 0.32)' : null,
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
    };
  },
);
List.displayName = 'StyledItem';

export const DragHandle = styled('div', ({$theme}) => ({
  marginRight: $theme.sizing.scale600,
  width: $theme.sizing.scale800,
  display: 'flex',
  alignItems: 'center',
}));
DragHandle.displayName = 'StyledDragHandle';

export const CloseHandle = styled('button', ({$theme}) => ({
  border: 'none',
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  overflow: 'visible',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  marginLeft: $theme.sizing.scale600,
  width: $theme.sizing.scale800,
  display: 'flex',
  alignItems: 'center',
}));
CloseHandle.displayName = 'StyledCloseHandle';

export const Label = styled('div', ({$theme}) => ({
  flexGrow: 1,
  ...$theme.typography.font400,
}));
Label.displayName = 'StyledLabel';
