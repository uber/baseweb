/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE, SIZE_DIMENSION, ANCHOR } from './constants';
import type { SharedStylePropsArg, SizeProp, AnchorProp } from './types';
import type { StyleObject } from 'styletron-standard';

function getSizeStyles($size: SizeProp, $anchor: AnchorProp) {
  const styles: StyleObject = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: SIZE_DIMENSION.default,
    height: SIZE_DIMENSION.full,
  };

  if ($anchor === ANCHOR.left || $anchor === ANCHOR.right) {
    // If the anchor is horizontal, set the width
    styles.height = SIZE_DIMENSION.full;
    // @ts-ignore
    if (SIZE[$size]) {
      // @ts-ignore
      styles.width = SIZE_DIMENSION[$size];
    } else if (typeof $size === 'string') {
      styles.width = $size;
    }
  } else {
    // If the anchor is vertical, set the height
    styles.width = SIZE_DIMENSION.full;
    // @ts-ignore
    if (SIZE[$size]) {
      // @ts-ignore
      styles.height = SIZE_DIMENSION[$size];
    } else if (typeof $size === 'string') {
      styles.height = $size;
    }
  }
  return styles;
}

function getAnchorStyles(props: SharedStylePropsArg) {
  const { $anchor, $isVisible, $size } = props;
  const sizeStyles = getSizeStyles($size, $anchor);
  const { left, right, top, bottom } = ANCHOR;
  switch ($anchor) {
    case right: {
      return {
        transform: $isVisible ? 'translateX(0)' : `translateX(${sizeStyles.width})`,
        right: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
        ...sizeStyles,
      };
    }
    case left: {
      return {
        transform: $isVisible ? 'translateX(0)' : `translateX(-${sizeStyles.width})`,
        left: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
        ...sizeStyles,
      };
    }
    case bottom: {
      return {
        transform: $isVisible ? 'translateY(0)' : `translateY(${sizeStyles.height})`,
        left: 0,
        bottom: $isVisible ? '0' : `-${sizeStyles.height}`,
        ...sizeStyles,
      };
    }
    case top: {
      return {
        transform: $isVisible ? 'translateY(0)' : `translateY(-${sizeStyles.height})`,
        left: 0,
        top: $isVisible ? '0' : `-${sizeStyles.height}`,
        ...sizeStyles,
      };
    }
    default: {
      return {};
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledRoot = styled<'div', SharedStylePropsArg>('div', (props) => {
  return {
    position: 'fixed',
    overflow: 'auto',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  };
});

StyledRoot.displayName = 'StyledRoot';

export const StyledBackdrop = styled<'div', SharedStylePropsArg>('div', (props) => {
  const { $animating, $isOpen, $isVisible, $showBackdrop, $theme } = props;
  return {
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
    opacity: $isVisible && $isOpen && $showBackdrop ? 1 : 0,
    ...($animating
      ? {
          transitionProperty: 'opacity',
          transitionDuration: $theme.animation.timing400,
          transitionTimingFunction: $theme.animation.easeOutCurve,
        }
      : null),
  };
});

StyledBackdrop.displayName = 'StyledBackdrop';

// @ts-ignore
export const StyledDrawerContainer = styled<'div', SharedStylePropsArg>('div', (props) => {
  const { $animating, $isOpen, $isVisible, $theme } = props;
  return {
    backgroundColor: $theme.colors.backgroundPrimary,
    borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
    borderTopRightRadius: $theme.borders.surfaceBorderRadius,
    borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
    borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
    ...getAnchorStyles(props),

    // Animation
    opacity: $isVisible && $isOpen ? 1 : 0,
    transitionProperty: $animating ? 'opacity, transform' : null,
    transitionDuration: $animating ? $theme.animation.timing400 : null,
    transitionTimingFunction: $animating ? $theme.animation.easeOutCurve : null,
    display: 'flex',
    position: 'fixed',
  };
});

StyledDrawerContainer.displayName = 'StyledDrawerContainer';

export const StyledDrawerBody = styled<'div', SharedStylePropsArg>('div', (props) => {
  const { $theme } = props;
  return {
    ...$theme.typography.font200,
    color: $theme.colors.contentPrimary,
    marginTop: $theme.sizing.scale900,
    marginBottom: $theme.sizing.scale900,
    marginLeft: $theme.sizing.scale900,
    marginRight: $theme.sizing.scale900,
    overflow: 'auto',
    width: '100%',
  };
});

StyledDrawerBody.displayName = 'StyledDrawerBody';

export const StyledClose = styled<'button', SharedStylePropsArg>('button', (props) => {
  const { $theme, $isFocusVisible } = props;
  const dir: string = $theme.direction === 'rtl' ? 'left' : 'right';
  return {
    // Reset button styles
    background: 'transparent',
    outline: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,

    // colors
    fill: $theme.colors.primary,
    transitionProperty: 'fill, border-color',
    transitionDuration: $theme.animation.timing200,
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    ':hover': {
      fill: $theme.colors.primary600,
    },
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
    },

    // Positioning
    position: 'absolute',
    top: $theme.sizing.scale500,
    [dir]: $theme.sizing.scale500,
    width: $theme.sizing.scale800,
    height: $theme.sizing.scale800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
});

StyledClose.displayName = 'StyledClose';

export const Hidden = styled('div', {
  display: 'none',
});
Hidden.displayName = 'Hidden';
