/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {SIZE, SIZE_DIMENSION, ANCHOR} from './constants.js';
import type {SharedStylePropsArgT, SizePropT, AnchorPropT} from './types.js';

type SizeStylesT = {|
  maxWidth: string,
  maxHeight: string,
  width: string,
  height: string,
|};
function getSizeStyles($size: SizePropT, $anchor: AnchorPropT): SizeStylesT {
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

type AnchorStylesT = {|
  height?: string,
  maxHeight?: string,
  width?: string,
  maxWidth?: string,
  transform?: string,
  top?: string | 0,
  right?: string | 0,
  bottom?: string | 0,
  left?: string | 0,
|};

function getAnchorStyles(props: SharedStylePropsArgT): AnchorStylesT {
  const {$anchor, $isVisible, $size} = props;
  const sizeStyles = getSizeStyles($size, $anchor);
  const {left, right, top, bottom} = ANCHOR;
  switch ($anchor) {
    case right: {
      return {
        ...sizeStyles,
        transform: $isVisible
          ? 'translateX(0)'
          : `translateX(${sizeStyles.width})`,
        right: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
      };
    }
    case left: {
      return {
        ...sizeStyles,
        transform: $isVisible
          ? 'translateX(0)'
          : `translateX(-${sizeStyles.width})`,
        left: $isVisible ? 0 : `-${sizeStyles.width}`,
        top: 0,
      };
    }
    case bottom: {
      return {
        ...sizeStyles,
        transform: $isVisible
          ? 'translateY(0)'
          : `translateY(${sizeStyles.height})`,
        left: 0,
        bottom: $isVisible ? '0' : `-${sizeStyles.height}`,
      };
    }
    case top: {
      return {
        ...sizeStyles,
        transform: $isVisible
          ? 'translateY(0)'
          : `translateY(-${sizeStyles.height})`,
        left: 0,
        top: $isVisible ? '0' : `-${sizeStyles.height}`,
      };
    }
    default: {
      return Object.freeze({});
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
      backgroundColor: $theme.colors.backgroundAlt,
      borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
      borderTopRightRadius: $theme.borders.surfaceBorderRadius,
      borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
      borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
      ...getAnchorStyles(props),

      // Animation
      opacity: $isVisible && $isOpen ? 1 : 0,
      ...($animating
        ? {
            transitionProperty: 'opacity, transform',
            transitionDuration: $theme.animation.timing400,
            transitionTimingFunction: $theme.animation.easeOutCurve,
          }
        : null),
      display: 'flex',
      position: 'fixed',
    };
  },
);

export const StyledDrawerBody = styled<SharedStylePropsArgT>('div', props => {
  const {$theme} = props;
  return {
    ...$theme.typography.font200,
    color: $theme.colors.foreground,
    marginTop: $theme.sizing.scale900,
    marginBottom: $theme.sizing.scale900,
    marginLeft: $theme.sizing.scale900,
    marginRight: $theme.sizing.scale900,
    overflow: 'auto',
    width: '100%',
  };
});

export const StyledClose = styled<SharedStylePropsArgT>('button', props => {
  const {$theme} = props;
  const direction: string = $theme.direction === 'rtl' ? 'left' : 'right';
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
    transitionDuration: $theme.animation.timing100,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    ':hover': {
      fill: $theme.colors.primary600,
    },
    ':focus': {
      fill: $theme.colors.primary600,
      borderColor: $theme.colors.primary,
    },

    // Positioning
    position: 'absolute',
    top: $theme.sizing.scale500,
    [direction]: $theme.sizing.scale500,
    width: $theme.sizing.scale800,
    height: $theme.sizing.scale800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };
});
