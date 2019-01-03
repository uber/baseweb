/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {OPTION_LIST_SIZE} from './constants.js';

import type {ThemeT} from '../styles/index.js';

type StyledPropsT = {
  $theme: ThemeT,
  $isHighlighted?: boolean,
  $size?: $Keys<typeof OPTION_LIST_SIZE>,
};

export const List = styled('ul', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: '0',
  paddingRight: '0',
  backgroundColor: $theme.colors.backgroundAlt,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
}));
List.displayName = 'StyledList';

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted, $size}: StyledPropsT) => ({
    ...($size === OPTION_LIST_SIZE.compact
      ? $theme.typography.font200
      : $theme.typography.font300),
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.foreground,
    cursor: 'pointer',
    backgroundColor: $isHighlighted
      ? $theme.colors.menuFillHover
      : 'transparent',
    transitionProperty: 'color, background-color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      backgroundColor: $theme.colors.menuFillHover,
    },
    paddingTop:
      $size === OPTION_LIST_SIZE.compact
        ? $theme.sizing.scale100
        : $theme.sizing.scale300,
    paddingBottom:
      $size === OPTION_LIST_SIZE.compact
        ? $theme.sizing.scale100
        : $theme.sizing.scale300,
    paddingRight:
      $size === OPTION_LIST_SIZE.compact
        ? $theme.sizing.scale900
        : $theme.sizing.scale600,
    paddingLeft:
      $size === OPTION_LIST_SIZE.compact
        ? $theme.sizing.scale900
        : $theme.sizing.scale600,
  }),
);
ListItem.displayName = 'StyledListItem';

export const ListItemProfile = styled('li', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale800,
  paddingLeft: $theme.sizing.scale800,
  transitionProperty: 'color, background-color',
  transitionDuration: $theme.animation.timing100,
  transitionTimingFunction: $theme.animation.easeOutCurve,
  ':hover': {
    backgroundColor: $theme.colors.menuFillHover,
  },
}));
ListItemProfile.displayName = 'StyledListItemProfile';

export const ProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
ProfileImgContainer.displayName = 'StyledProfileImgContainer';

export const ProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});
ProfileImg.displayName = 'StyledProfileImg';

export const ProfileLabelsContainer = styled('div', ({$theme}) => ({
  marginLeft: $theme.sizing.scale600,
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
}));
ProfileLabelsContainer.displayName = 'StyledProfileLabelsContainer';

export const ProfileTitle = styled('h6', ({$theme}) => ({
  ...$theme.typography.font450,
  color: $theme.colors.foreground,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));
ProfileTitle.displayName = 'StyledProfileTitle';

export const ProfileSubtitle = styled('p', ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.foreground,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));
ProfileSubtitle.displayName = 'StyledProfileSubtitle';

export const ProfileBody = styled('p', ({$theme}) => ({
  ...$theme.typography.font200,
  color: $theme.colors.foregroundAlt,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));
ProfileBody.displayName = 'StyledProfileBody';
