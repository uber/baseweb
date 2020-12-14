/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {SIZE, SIZE_DIMENSION, ANCHOR} from './constants.js';
import type {SharedStylePropsArgT, SizePropT, AnchorPropT} from './types.js';

function getSizeStyles($size: SizePropT, $anchor: AnchorPropT) {
  const styles = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: SIZE_DIMENSION.default,
    height: SIZE_DIMENSION.full,
  };

  if ($anchor === ANCHOR.left || $anchor === ANCHOR.right) {
    // If the anchor is horizontal, set the width
    styles.height = SIZE_DIMENSION.full;
    if (SIZE[$size]) {
      styles.width = SIZE_DIMENSION[$size];
    } else if (typeof $size === 'string') {
      styles.width = $size;
    }
  } else {
    // If the anchor is vertical, set the height
    styles.width = SIZE_DIMENSION.full;
    if (SIZE[$size]) {
      styles.height = SIZE_DIMENSION[$size];
    } else if (typeof $size === 'string') {
      styles.height = $size;
    }
  }
  return styles;
}

function getAnchorStyles(props: SharedStylePropsArgT) {
  const {$anchor, $isVisible, $size} = props;
  const sizeStyles = getSizeStyles($size, $anchor);
  const {left, right, top, bottom} = ANCHOR;
  switch ($anchor) {
    case right: {
      return {
        transform: $isVisible
          ? 'translateX(0)'
          : `translateX(${sizeStyles.width})`,
        right: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
        ...sizeStyles,
      };
    }
    case left: {
      return {
        transform: $isVisible
          ? 'translateX(0)'
          : `translateX(-${sizeStyles.width})`,
        left: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
        ...sizeStyles,
      };
    }
    case bottom: {
      return {
        transform: $isVisible
          ? 'translateY(0)'
          : `translateY(${sizeStyles.height})`,
        left: 0,
        bottom: $isVisible ? '0' : `-${sizeStyles.height}`,
        ...sizeStyles,
      };
    }
    case top: {
      return {
        transform: $isVisible
          ? 'translateY(0)'
          : `translateY(-${sizeStyles.height})`,
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

export const StyledRoot = styled<SharedStylePropsArgT>('div', props => {
  return {
    position: 'fixed',
    overflow: 'auto',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  };
});

export const StyledBackdrop = styled<SharedStylePropsArgT>('div', props => {
  const {$animating, $isOpen, $isVisible, $theme} = props;
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
    opacity: $isVisible && $isOpen ? 1 : 0,
    ...($animating
      ? {
          transitionProperty: 'opacity',
          transitionDuration: $theme.animation.timing400,
          transitionTimingFunction: $theme.animation.easeOutCurve,
        }
      : null),
  };
});

export const StyledDrawerContainer = styled<SharedStylePropsArgT>(
  'div',
  props => {
    const {$animating, $isOpen, $isVisible, $theme} = props;
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
      transitionTimingFunction: $animating
        ? $theme.animation.easeOutCurve
        : null,
      display: 'flex',
      position: 'fixed',
    };
  },
);

export const StyledDrawerBody = styled<SharedStylePropsArgT>('div', props => {
  const {$theme} = props;
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

export const StyledClose = styled<SharedStylePropsArgT>('button', props => {
  const {$theme, $isFocusVisible} = props;
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

export const Hidden = styled('div', {
  display: 'none',
});
