/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles/index.js';
import {OPTION_LIST_SIZE} from './constants.js';
import type {ItemT} from './types.js';
import type {StyletronComponent} from '../styles/styled.js';

type StyledPropsT = {
  $disabled?: boolean,
  $isFocused?: boolean,
  $isHighlighted?: boolean,
  $size?: $Keys<typeof OPTION_LIST_SIZE>,
};

export const StyledList = styled<StyledPropsT>('ul', ({$theme}) => {
  return {
    backgroundColor: $theme.colors.menuFill,
    position: 'relative',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: $theme.sizing.scale300,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: 0,
    paddingRight: 0,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    boxShadow: $theme.lighting.shadow600,
    overflow: 'auto',
  };
});

function getFontColor(props) {
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

function getBackgroundColor(props) {
  if (props.$disabled) {
    return 'transparent';
  }

  if (props.$isHighlighted) {
    return props.$theme.colors.menuFillHover;
  }

  return 'transparent';
}

export const StyledEmptyState = styled<StyledPropsT>('li', props => {
  const {$theme, $size} = props;
  return {
    ...($size === OPTION_LIST_SIZE.compact
      ? $theme.typography.font100
      : $theme.typography.font200),
    position: 'relative',
    display: 'block',
    color: $theme.colors.menuFontDisabled,
    textAlign: 'center',
    cursor: 'not-allowed',
    backgroundColor: 'transparent',
    marginBottom: 0,
    paddingTop: $theme.sizing.scale800,
    paddingBottom: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800,
    paddingLeft: $theme.sizing.scale800,
  };
});

export const StyledOptgroupHeader = styled<{}>('li', props => {
  const paddingX = props.$theme.sizing.scale300;
  const paddingY = props.$theme.sizing.scale200;
  return {
    ...props.$theme.typography.font250,
    color: props.$theme.colors.colorPrimary,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingRight: paddingX,
    paddingLeft: paddingX,
  };
});

export const StyledListItemElement = styled<StyledPropsT>('li', props => {
  const {$disabled, $theme, $size} = props;
  return {
    ...($size === OPTION_LIST_SIZE.compact
      ? $theme.typography.font100
      : $theme.typography.font200),
    position: 'relative',
    display: 'block',
    color: getFontColor(props),
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: getBackgroundColor(props),
    transitionProperty: 'color, background-color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    marginBottom: 0,
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

export const StyledListItem = ((React.forwardRef<
  {item: ItemT, ...$Exact<StyledPropsT>},
  // eslint-disable-next-line flowtype/no-weak-types
  any,
>(
  ({item, ...restProps}, ref) => (
    <StyledListItemElement ref={ref} {...restProps} />
  ),
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<StyledPropsT>);
StyledListItem.__STYLETRON__ = StyledListItemElement.__STYLETRON__;
StyledListItem.displayName = 'StyledListItem';

export const StyledListItemProfile = styled<StyledPropsT>('li', ({$theme}) => ({
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

export const StyledProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
  borderBottomLeftRadius: '50%',
});

export const StyledProfileLabelsContainer = styled<StyledPropsT>(
  'div',
  ({$theme}) => ({
    marginLeft: $theme.sizing.scale600,
    alignSelf: $theme.direction === 'rtl' ? 'flex-end' : 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  }),
);

export const StyledProfileTitle = styled<StyledPropsT>('h6', ({$theme}) => ({
  ...$theme.typography.font350,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

export const StyledProfileSubtitle = styled<StyledPropsT>('p', ({$theme}) => ({
  ...$theme.typography.font200,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

export const StyledProfileBody = styled<StyledPropsT>('p', ({$theme}) => ({
  ...$theme.typography.font100,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));
