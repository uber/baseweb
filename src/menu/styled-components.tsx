/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled, withWrapper } from '../styles';
import { OPTION_LIST_SIZE } from './constants';

type StyledProps = {
  $disabled?: boolean;
  $isFocused?: boolean;
  $isFocusVisible?: boolean;
  $isHighlighted?: boolean;
  $size?: keyof typeof OPTION_LIST_SIZE;
};

export const StyledList = styled<'ul', StyledProps>('ul', ({ $theme, $isFocusVisible }) => {
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
      outline: $isFocusVisible ? `3px solid ${$theme.colors.borderAccent}` : 'none',
    },
  };
});

StyledList.displayName = 'StyledList';

// @ts-ignore
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

// @ts-ignore
function getBackgroundColor(props) {
  if (props.$disabled) {
    return 'transparent';
  }

  if (props.$isHighlighted) {
    return props.$theme.colors.menuFillHover;
  }

  return 'transparent';
}

export const StyledEmptyState = styled<'li', StyledProps>('li', (props) => {
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

StyledEmptyState.displayName = 'StyledEmptyState';

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
StyledOptgroupHeader.displayName = 'StyledOptgroupHeader';
export const StyledListItemAnchor = styled<'a', StyledProps>('a', (props) => {
  return {
    display: 'block',
    color: getFontColor(props),
  };
});
StyledListItemAnchor.displayName = 'StyledListItemAnchor';
export const StyledListItemElement = styled<'li', StyledProps & { $isKeyboardFocused?: boolean }>(
  'li',
  (props) => {
    const { $disabled, $theme, $size, $isKeyboardFocused } = props;
    return {
      ...($size === OPTION_LIST_SIZE.compact
        ? $theme.typography.font100
        : $theme.typography.font200),
      boxSizing: 'border-box',
      position: 'relative',
      display: 'block',
      color: getFontColor(props),
      cursor: $disabled ? 'not-allowed' : 'pointer',
      backgroundColor: getBackgroundColor(props),
      transitionProperty: 'color, background-color',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.easeOutCurve,
      borderTopWidth: '2px',
      borderRightWidth: '2px',
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
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
      ':not(:hover)': {
        borderColor: $isKeyboardFocused ? $theme.colors.accent : 'transparent',
      },
    };
  }
);

StyledListItemElement.displayName = 'StyledListItemElement';

// @ts-ignore
export const StyledListItem = withWrapper<typeof StyledListItemElement, { item? }>(
  StyledListItemElement,
  (Styled) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function StyledListItem({ item, ...restProps }) {
      return <Styled {...restProps} />;
    }
);

export const StyledListItemProfile = styled<'li', StyledProps>('li', ({ $theme }) => ({
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

StyledListItemProfile.displayName = 'StyledListItemProfile';

export const StyledProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

StyledProfileImgContainer.displayName = 'StyledProfileImgContainer';

export const StyledProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%',
  borderBottomLeftRadius: '50%',
});

StyledProfileImg.displayName = 'StyledProfileImg';

export const StyledProfileLabelsContainer = styled<'div', StyledProps>(
  'div',
  ({ $theme: { direction, sizing } }) => ({
    alignSelf: direction === 'rtl' ? 'flex-end' : 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    ...(direction === 'rtl' ? { marginRight: sizing.scale600 } : { marginLeft: sizing.scale600 }),
  })
);

StyledProfileLabelsContainer.displayName = 'StyledProfileLabelsContainer';

export const StyledProfileTitle = styled<'h6', StyledProps>('h6', ({ $theme }) => ({
  ...$theme.typography.font350,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

StyledProfileTitle.displayName = 'StyledProfileTitle';

export const StyledProfileSubtitle = styled<'p', StyledProps>('p', ({ $theme }) => ({
  ...$theme.typography.font200,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));

StyledProfileSubtitle.displayName = 'StyledProfileSubtitle';

export const StyledProfileBody = styled<'p', StyledProps>('p', ({ $theme }) => ({
  ...$theme.typography.font100,
  color: $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
}));
StyledProfileBody.displayName = 'StyledProfileBody';

export const StyledMenuDivider = styled<'li', StyledProps>('li', ({ $theme }) => ({
  color: $theme.colors.contentPrimary,
  borderBottomWidth: $theme.borders.border300.borderWidth,
  borderBottomStyle: $theme.borders.border300.borderStyle,
  borderBottomColor: $theme.borders.border300.borderColor,
  marginTop: $theme.sizing.scale100,
  marginBottom: $theme.sizing.scale100,
  marginLeft: $theme.sizing.scale500,
  marginRight: $theme.sizing.scale500,
  listStyle: 'none',
  height: 0,
}));
StyledProfileBody.displayName = 'StyledMenuDivider';

export const VisuallyHiddenStatus = styled<'div', StyledProps>('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1px',
  height: '1px',
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  marginTop: '-1px',
  marginRight: '-1px',
  marginBottom: '-1px',
  marginLeft: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderTopStyle: 'none',
  borderRightStyle: 'none',
  borderBottomStyle: 'none',
  borderLeftStyle: 'none',
});
