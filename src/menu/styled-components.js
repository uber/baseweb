/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';

import type {ThemeT} from '../styles';

type StyledPropsT = {
  $theme: ThemeT,
};

type StyledListItemPropsT = {
  $isHighlighted: boolean,
} & StyledPropsT;

export const List = styled('ul', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  margin: 0,
  padding: 0,
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
}));

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted}: StyledListItemPropsT) => ({
    ...$theme.typography.font300,
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
    cursor: 'pointer',
    transitionProperty: 'color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      color: $theme.colors.primary400,
    },
    paddingTop: $theme.sizing.scale300,
    paddingBottom: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    ':first-child': {
      paddingTop: $theme.sizing.scale600,
    },
    ':last-child': {
      paddingBottom: $theme.sizing.scale600,
    },
  }),
);

export const ListItemProfile = styled('li', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  // TODO: verify these styles
  paddingTop: '9px',
  paddingBottom: '9px',
  paddingRight: $theme.sizing.scale800,
  paddingLeft: $theme.sizing.scale800,
  ':first-child': {
    paddingTop: $theme.sizing.scale800,
  },
  ':last-child': {
    paddingBottom: $theme.sizing.scale800,
  },
}));

export const List = styled('ul', getListStyles);

export const ListItem = styled('li', getListItemStyles);
