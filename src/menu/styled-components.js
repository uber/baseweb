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
  $disabled?: boolean,
  $theme: ThemeT,
  $isFocused?: boolean,
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
  overflow: 'auto',
}));

function getFontColor(props: StyledPropsT) {
  if (props.$disabled) {
    return props.$theme.colors.menuFontDisabled;
  }

  if (props.$isHighlighted && props.$isFocused) {
    return props.$theme.colors.menuFontHighlighted;
  }

  if (props.$isHighlighted && !props.$isFocused) {
    return props.$theme.colors.menuFontSelected;
  }

  return props.$theme.colors.menuFontDefault;
}

function getBackgroundColor(props: StyledPropsT) {
  if (props.$disabled) {
    return 'transparent';
  }

  if (props.$isHighlighted) {
    return props.$theme.colors.menuFillHover;
  }

  return 'transparent';
}

export const ListItem = styled('li', (props: StyledPropsT) => {
  const {$disabled, $theme, $size} = props;
  return {
    ...($size === OPTION_LIST_SIZE.compact
      ? $theme.typography.font200
      : $theme.typography.font300),
    position: 'relative',
    display: 'block',
    color: getFontColor(props),
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: getBackgroundColor(props),
    transitionProperty: 'color, background-color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    marginBottom: '0',
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
    ':focus': {
      outline: 'none',
    },
  };
});

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

export const ProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});

export const ProfileLabelsContainer = styled('div', ({$theme}) => ({
  marginLeft: $theme.sizing.scale600,
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
}));

export const ProfileTitle = styled('h6', ({$theme}) => ({
  ...$theme.typography.font450,
  color: $theme.colors.foreground,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));

export const ProfileSubtitle = styled('p', ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.foreground,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));

export const ProfileBody = styled('p', ({$theme}) => ({
  ...$theme.typography.font200,
  color: $theme.colors.foregroundAlt,
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
}));
