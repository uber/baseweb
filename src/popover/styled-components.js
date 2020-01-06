/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import type {
  ArrowStylePropsArgT,
  BodyStylePropsArgT,
  InnerStylePropsArgT,
} from './types.js';
import type {ThemeT} from '../styles/types.js';

/**
 * Main popover container element that gets positioned next to the anchor
 */
export function getBodyStyles(props: BodyStylePropsArgT & {$theme: ThemeT}) {
  const {
    $isOpen,
    $isAnimating,
    $placement,
    $popoverOffset,
    $showArrow,
    $theme,
  } = props;

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: $theme.colors.backgroundPrimary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
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

export const Body = styled<BodyStylePropsArgT>('div', getBodyStyles);

/**
 * Arrow shown between the popover and the anchor element
 */
export function getArrowStyles(props: ArrowStylePropsArgT & {$theme: ThemeT}) {
  const {$arrowOffset, $placement, $theme} = props;
  return {
    backgroundColor: $theme.colors.backgroundPrimary,
    boxShadow: $theme.lighting.shadow600,
    width: `${ARROW_WIDTH}px`,
    height: `${ARROW_WIDTH}px`,
    transform: 'rotate(45deg)',
    position: 'absolute',
    ...getArrowPositionStyles($arrowOffset, $placement),
  };
}

export const Arrow = styled<ArrowStylePropsArgT>('div', getArrowStyles);

/**
 * Extra div that holds the popover content. This extra element
 * is needed for the arrow–the arrow is just a 45deg rotated div,
 * and rendering this extra element on top with a solid background
 * clips the part of the arrow that extends into the popover.
 */
export function getInnerStyles({$theme}: {$theme: ThemeT}) {
  return {
    backgroundColor: $theme.colors.backgroundPrimary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    color: $theme.colors.contentPrimary,
    position: 'relative',
  };
}

export const Inner = styled<InnerStylePropsArgT>('div', getInnerStyles);

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
