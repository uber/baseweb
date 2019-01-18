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
    color: $theme.colors.mono1000,
    width: '100%',
  };
});
Root.displayName = 'StyledRoot';

export const List = styled('ul', ({$isDragged}: StylePropsT) => {
  return {
    padding: 0,
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
              border: `2px solid ${$theme.colors.primary100}`,
              color: $theme.colors.primary,
            }
          : {},
      padding: $theme.sizing.scale600,
      margin: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      listStyle: 'none',
      cursor: $isDragged ? 'grabbing' : 'grab',
      backgroundColor: $theme.colors.mono100,
      boxShadow: $isDragged ? '0px 2px 6px rgba(39, 110, 241, 0.32)' : null,
      border:
        $isDragged || $isSelected
          ? `2px solid ${$theme.colors.primary}`
          : '2px solid transparent',
    };
  },
);
List.displayName = 'StyledItem';

export const DragHandle = styled('div', ({$theme}) => ({
  marginRight: $theme.sizing.scale600,
  marginLeft: 0,
  padding: 0,
  width: $theme.sizing.scale800,
  display: 'flex',
  alignItems: 'center',
}));
DragHandle.displayName = 'StyledDragHandle';

export const CloseHandle = styled('button', ({$theme}) => ({
  border: 'none',
  padding: 0,
  overflow: 'visible',
  cursor: 'pointer',
  background: 'transparent',
  marginLeft: $theme.sizing.scale600,
  width: $theme.sizing.scale800,
  display: 'flex',
  alignItems: 'center',
}));
CloseHandle.displayName = 'StyledCloseHandle';

export const Label = styled('div', ({$theme}) => ({
  flexGrow: 1,
  marginLeft: 0,
  padding: 0,
  ...$theme.typography.font400,
}));
Label.displayName = 'StyledLabel';
