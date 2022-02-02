/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {
  BADGE_ENHANCER_STYLES,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  LABEL_SIZES,
} from './constants.js';

import type {
  AnchorPositionsT,
  LabelEnhancerPositionT,
  BadgeEnhancerSizeT,
  BadgePositionT,
  PinHeadSizeT,
} from './types.js';

export const getAnchorTransform = (
  anchor: AnchorPositionsT,
  anchorSize: number,
) =>
  ({
    [FLOATING_MARKER_ANCHOR_POSITIONS.none]: ``,
    [FLOATING_MARKER_ANCHOR_POSITIONS.topLeft]: `translate(${anchorSize}px, ${anchorSize}px)`,
    [FLOATING_MARKER_ANCHOR_POSITIONS.topRight]: `translate(-100%, ${anchorSize}px)`,
    [FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft]: `translate(${anchorSize}px, -100%)`,
    [FLOATING_MARKER_ANCHOR_POSITIONS.bottomRight]: `translate(-100%, -100%)`,
  }[anchor]);

export const DragShadowContainer = styled<{
  $height: number,
  $width: number,
  $dragging: boolean,
}>('div', ({$theme, $height, $width, $dragging}) => ({
  width: `${$width}px`,
  height: `${$height}px`,
  opacity: $dragging ? 1 : 0,
  visibility: $dragging ? 'visible' : 'hidden',
  transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
  position: 'relative',
  boxShadow: $theme.lighting.shadow600,
}));

export const DragShadow = styled<{
  $background: string,
  $width: number,
}>('div', ({$theme, $background, $width}) => ({
  backgroundColor: $background,
  borderRadius: '50%',
  width: `${$width}px`,
  height: '4px',
  position: 'absolute',
  bottom: 0,
}));

export const Needle = styled<{
  $background?: string,
  $height: number,
}>('div', ({$theme, $background, $height}) => ({
  backgroundColor: $background,
  width: '4px',
  height: `${$height}px`,
  boxShadow: $theme.lighting.shadow600,
}));

export const FloatingMarkerRoot = styled<{
  $size: number,
}>('div', ({$size}) => ({
  position: 'relative',
  height: `${$size}px`,
  width: `${$size}px`,
}));

export const FloatingMarkerPinHeadContainer = styled<{
  $anchor: AnchorPositionsT,
  $anchorSize: number,
}>('div', ({$theme, $anchor, $anchorSize}) => ({
  position: 'absolute',
  transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
  transform: getAnchorTransform($anchor, $anchorSize),
}));

export const FloatingMarkerAnchorContainer = styled<{}>('div', () => ({
  position: 'absolute',
}));

export const FixedMarkerRoot = styled<{}>('div', () => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const FixedMarkerDragContainer = styled<{
  $translateAmount: number,
  $performTranslate: boolean,
}>('div', ({$theme, $translateAmount, $performTranslate}) => {
  return {
    transform: `translateY(${
      $performTranslate ? `${$translateAmount}px` : '0px'
    })`,
    transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };
});

export const OuterXXSmallAnchor = styled<{
  $round: boolean,
  $background: string,
  $size: number,
}>('div', ({$theme, $round, $background, $size}) => ({
  backgroundColor: $background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
  boxShadow: $theme.lighting.shadow600,
}));

export const InnerXXSmallAnchor = styled<{
  $round: boolean,
  $color: string,
  $size: number,
}>('div', ({$round, $color, $size}) => ({
  backgroundColor: $color,
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
}));

export const OuterXSmallAnchor = styled<{
  $round: boolean,
  $background: string,
  $size: number,
}>('div', ({$theme, $round, $background, $size}) => ({
  backgroundColor: $background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
  boxShadow: $theme.lighting.shadow600,
}));

export const InnerXSmallAnchor = styled<{
  $round: boolean,
  $color: string,
  $size: number,
}>('div', ({$round, $color, $size}) => ({
  backgroundColor: $color,
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
}));

export const PinHead = styled<{
  $height: number,
  $background: string,
  $gridTemplateColumns: string,
  $type: string,
  $forceCircle: boolean,
}>(
  'div',
  ({
    $theme,
    $height,
    $background,
    $gridTemplateColumns,
    $type,
    $forceCircle,
  }) => {
    const sharedStyles = {
      fixed: {
        padding: '0px 12px',
        borderRadius: `${$height}px`,
      },
      floating: {
        padding: '0px 8px',
      },
    };

    return {
      backgroundColor: $background,
      height: `${$height}px`,
      display: 'grid',
      gridTemplateColumns: $gridTemplateColumns,
      gap: '8px',
      boxShadow: $theme.lighting.shadow600,
      whiteSpace: 'nowrap',
      ...sharedStyles[$type],
      ...($forceCircle && {
        width: `${$height}px`,
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }),
    };
  },
);

export const LabelEnhancerContainer = styled<{
  $label: string,
}>('div', ({$label, $theme}) => {
  return {
    position: 'relative',
  };
});

export const StrokedLabelContainer = styled<{
  $position: LabelEnhancerPositionT,
  $labelOffset: number,
}>('div', ({$position, $theme, $labelOffset}) => {
  const staticLabelOffset = 4;
  const positions = {
    top: {
      left: `calc(50% + ${staticLabelOffset}px)`,
      bottom: '100%',
      alignItems: 'flex-end',
      justifyContent: 'center',
      textAlign: 'center',
    },
    bottom: {
      left: '50%',
      top: `calc(100% + ${staticLabelOffset}px + ${$labelOffset}px)`,
      alignItems: 'flex-start',
      justifyContent: 'center',
      textAlign: 'center',
    },
    right: {
      left: `calc(100% + ${staticLabelOffset}px)`,
      top: '50%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    left: {
      right: `calc(100% + ${staticLabelOffset}px)`,
      top: '50%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      textAlign: 'right',
    },
    none: {},
  };
  return {
    position: 'absolute',
    width: '0px',
    height: '0px',
    pointerEvents: 'none',
    display: 'flex',
    ...positions[$position],
  };
});

export const StrokedLabel = styled<{
  $color: string,
  $strokeColor: string,
  $stroked: boolean,
  $position: LabelEnhancerPositionT,
  $size: PinHeadSizeT,
}>('div', ({$theme, $color, $strokeColor, $size}) => {
  const strokeWidth = 1.5;

  const textShadow = `-${strokeWidth}px -${strokeWidth}px 0 ${$strokeColor},
    0 -${strokeWidth}px 0 ${$strokeColor},
    ${strokeWidth}px -${strokeWidth}px 0 ${$strokeColor},
    ${strokeWidth}px 0 0 ${$strokeColor},
    ${strokeWidth}px ${strokeWidth}px 0 ${$strokeColor},
    0 ${strokeWidth}px 0 ${$strokeColor},
   -${strokeWidth}px ${strokeWidth}px 0 ${$strokeColor},
   -${strokeWidth}px 0 0 ${$strokeColor}`;

  return {
    display: 'flex',
    ...$theme.typography[LABEL_SIZES[$size]],
    color: $color,
    transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
    textShadow,
    pointerEvents: 'auto',
    width: 'max-content',
    maxWidth: '200px',
  };
});

export const BadgeEnhancer = styled<{
  $size: BadgeEnhancerSizeT,
  $position: BadgePositionT,
  $background: string,
  $color: string,
}>('div', ({$theme, $size, $position, $background, $color}) => {
  const {x, y} = $position;
  return {
    position: 'absolute',
    ...$theme.typography.LabelSmall,
    backgroundColor: $background,
    color: $color,
    boxSizing: 'border-box',
    right: 0,
    transform: `translate(calc(100% + ${x}px), ${y}px)`,

    transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
    ...BADGE_ENHANCER_STYLES[$size],
  };
});

export const RelativeContainer = styled<{}>('div', () => {
  return {
    position: 'relative',
  };
});
