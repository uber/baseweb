/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {FLOATING_MARKER_ANCHOR_POSITIONS} from './constants.js';

import type {AnchorPositionsT} from './types.js';

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

export const StyledDragShadowContainer = styled<{
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

export const StyledDragShadow = styled<{
  $background: string,
  $width: number,
}>('div', ({$theme, $background, $width}) => ({
  background: $background,
  borderRadius: '50%',
  width: `${$width}px`,
  height: `${4}px`,
  position: 'absolute',
  bottom: 0,
}));

export const StyledNeedle = styled<{
  $background?: string,
  $height: number,
}>('div', ({$theme, $background, $height}) => ({
  background: $background,
  width: '4px',
  height: `${$height}px`,
  boxShadow: $theme.lighting.shadow600,
}));

export const StyledFloatingMarkerRoot = styled<{}>('div', () => ({
  position: 'relative',
}));

export const StyledFloatingMarkerPinHeadContainer = styled<{
  $anchor: AnchorPositionsT,
  $anchorSize: number,
}>('div', ({$theme, $anchor, $anchorSize}) => ({
  position: 'absolute',
  transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
  transform: getAnchorTransform($anchor, $anchorSize),
}));

export const StyledFloatingMarkerAnchorContainer = styled<{}>('div', () => ({
  position: 'absolute',
}));

export const StyledFixedMarkerRoot = styled<{}>('div', () => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const StyledFixedMarkerDragContainer = styled<{
  $translateAmount: number,
  $performTranslate: boolean,
}>('div', ({$theme, $translateAmount, $performTranslate}) => {
  return {
    transform: `translateY(${
      $performTranslate ? '0px' : `${$translateAmount}px`
    })`,
    transition: `${$theme.animation.timing300} ${$theme.animation.easeOutCurve} all`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };
});

export const StyledOuterXSmallAnchor = styled<{
  $round: boolean,
  $background: string,
  $size: number,
}>('div', ({$theme, $round, $background, $size}) => ({
  background: $background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
  boxShadow: $theme.lighting.shadow600,
}));

export const StyledInnerXSmallAnchor = styled<{
  $round: boolean,
  $color: string,
  $size: number,
}>('div', ({$round, $color, $size}) => ({
  background: $color,
  height: `${$size}px`,
  width: `${$size}px`,
  borderRadius: $round ? '50%' : 0,
}));

export const StyledPinHead = styled<{
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
      background: $background,
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
