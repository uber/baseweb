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

export const getListStyles = ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
  paddingTop: $theme.sizing.scale200,
  paddingBottom: $theme.sizing.scale200,
  paddingLeft: $theme.sizing.scale400,
  paddingRight: $theme.sizing.scale400,
});

export const getListItemStyles = ({
  $theme,
  $isHighlighted,
}: StyledListItemPropsT) => ({
  ...$theme.typography.font400,
  position: 'relative',
  display: 'block',
  color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
  margin: 0,
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: $theme.animation.timing100,
  transitionTimingFunction: $theme.animation.easeOutCurve,
  ':hover': {
    color: $theme.colors.primary400,
  },
});

export const List = styled('ul', getListStyles);

export const ListItem = styled('li', getListItemStyles);
