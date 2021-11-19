/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled, withWrapper } from '../styles';
import { OPTION_LIST_SIZE } from './constants';

type StyledPropsT = {
  $disabled?: boolean;
  $isFocused?: boolean;
  $isFocusVisible?: boolean;
  $isHighlighted?: boolean;
  $size?: keyof typeof OPTION_LIST_SIZE;
};

export const StyledList = styled<'ul', StyledPropsT>('ul', ({ $theme, $isFocusVisible }) => {
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
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    },
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

export const StyledEmptyState = styled<'li', StyledPropsT>('li', (props) => {
  const { $theme, $size } = props;
  return {
    ...($size === OPTION_LIST_SIZE.compact ? $theme.typography.font100 : $theme.typography.font200),
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

export const StyledOptgroupHeader = styled('li', (props) => {
  const paddingX = props.$theme.sizing.scale300;
  const paddingY = props.$theme.sizing.scale200;
  return {
    ...props.$theme.typography.font250,
    color: props.$theme.colors.contentPrimary,
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingRight: paddingX,
    paddingLeft: paddingX,
  };
});
export const StyledListItemAnchor = styled<'a', StyledPropsT>('a', (props) => {
  return {
    display: 'block',
    color: getFontColor(props),
  };
});
export const StyledListItemElement = styled<'li', StyledPropsT>('li', (props) => {
  const { $disabled, $theme, $size } = props;
  return {
    ...($size === OPTION_LIST_SIZE.compact ? $theme.typography.font100 : $theme.typography.font200),
    position: 'relative',
    display: 'block',
    color: getFontColor(props),
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: getBackgroundColor(props),
    transitionProperty: 'color, background-color',
    transitionDuration: $theme.animation.timing200,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    marginBottom: 0,
    paddingTop:
      $size === OPTION_LIST_SIZE.compact ? $theme.sizing.scale100 : $theme.sizing.scale300,
    paddingBottom:
      $size === OPTION_LIST_SIZE.compact ? $theme.sizing.scale100 : $theme.sizing.scale300,
    paddingRight:
      $size === OPTION_LIST_SIZE.compact ? $theme.sizing.scale900 : $theme.sizing.scale600,
    paddingLeft:
      $size === OPTION_LIST_SIZE.compact ? $theme.sizing.scale900 : $theme.sizing.scale600,
    ':focus': {
      outline: 'none',
    },
  };
});

export const StyledListItem = withWrapper(
  StyledListItemElement,
  (Styled) =>
    function StyledListItem({ item, ...restProps }) {
      return <Styled {...restProps} />;
    }
);

export const StyledListItemProfile = styled<'li', StyledPropsT>('li', ({ $theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale800,
  paddingLeft: $theme.sizing.scale800,
  transitionProperty: 'color, background-color',
  transitionDuration: $theme.animation.timing200,
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

export const StyledProfileLabelsContainer = styled<'div', StyledPropsT>(
  'div',
  ({ $theme: { direction, sizing } }) => ({
    alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    ...(direction === 'rtl' ? { marginRight: sizing.scale600 } : { marginLeft: sizing.scale600 }),
  })
);

export const StyledProfileTitle = styled<'h6', StyledPropsT>('h6', ({ $theme }) => ({
  ...$theme.typography.font350,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

export const StyledProfileSubtitle = styled<'p', StyledPropsT>('p', ({ $theme }) => ({
  ...$theme.typography.font200,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

export const StyledProfileBody = styled<'p', StyledPropsT>('p', ({ $theme }) => ({
  ...$theme.typography.font100,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));
