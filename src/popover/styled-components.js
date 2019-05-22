/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {ARROW_WIDTH} from './constants.js';
import {
  getPopoverMarginStyles,
  getArrowPositionStyles,
  getStartPosition,
  getEndPosition,
} from './utils.js';
import type {SharedStylePropsT} from './types.js';

/**
 * Main popover container element that gets positioned next to the anchor
 */
export function getBodyStyles(props: SharedStylePropsT) {
  const {
    $isOpen,
    $isAnimating,
    $placement,
    $popoverOffset,
    $showArrow,
    $theme,
  } = props;

  const borderRadius = $theme.borders.useRoundedCorners
    ? $theme.borders.radius300
    : '0px';

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: $theme.colors.background,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    boxShadow: $theme.lighting.shadow600,
    transitionProperty: 'opacity,transform',
    transitionDuration: $isAnimating ? '0.1s' : '0s',
    transitionTimingFunction: $isOpen
      ? $theme.animation.easeOutCurve
      : $theme.animation.easeInCurve,
    opacity: $isAnimating && $isOpen ? 1 : 0,
    transform:
      $isAnimating && $isOpen
        ? getEndPosition($popoverOffset)
        : getStartPosition($popoverOffset, $placement, $showArrow),
    ...getPopoverMarginStyles($showArrow, $placement),
  };
}

export const Body = styled('div', getBodyStyles);

/**
 * Arrow shown between the popover and the anchor element
 */
export function getArrowStyles(props: SharedStylePropsT) {
  const {$arrowOffset, $placement, $theme} = props;
  return {
    backgroundColor: $theme.colors.backgroundAlt,
    boxShadow: $theme.lighting.shadow600,
    width: `${ARROW_WIDTH}px`,
    height: `${ARROW_WIDTH}px`,
    transform: 'rotate(45deg)',
    position: 'absolute',
    ...getArrowPositionStyles($arrowOffset, $placement),
  };
}

export const Arrow = styled('div', getArrowStyles);

/**
 * Extra div that holds the popover content. This extra element
 * is needed for the arrow–the arrow is just a 45deg rotated div,
 * and rendering this extra element on top with a solid background
 * clips the part of the arrow that extends into the popover.
 */
export function getInnerStyles({$theme}: SharedStylePropsT) {
  const borderRadius = $theme.borders.useRoundedCorners
    ? $theme.borders.radius300
    : '0px';
  return {
    backgroundColor: $theme.colors.backgroundAlt,
    color: $theme.colors.foreground,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    position: 'relative',
  };
}

export const Inner = styled('div', getInnerStyles);

/**
 * A drop-in component that provides the recommended padding
 * for popovers. Mostly a convenience for users so they don't
 * have to define this themselves.
 */
export const Padding = styled('div', {
  paddingLeft: '12px',
  paddingTop: '12px',
  paddingRight: '12px',
  paddingBottom: '12px',
});
