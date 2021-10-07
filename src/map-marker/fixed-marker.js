/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  PINHEAD_TYPES,
  NEEDLE_SIZES,
  NEEDLE_HEIGHTS,
  PINHEAD_SIZES,
  dragShadowHeight,
  dragShadowMarginTop,
  dragShadowWidth,
} from './constants.js';
import PinHead from './pin-head.js';
import {
  FixedMarkerDragContainer as StyledFixedMarkerDragContainer,
  FixedMarkerRoot as StyledRoot,
  Needle as StyledNeedle,
  DragShadow as StyledDragShadow,
  DragShadowContainer as StyledDragShadowContainer,
} from './styled-components.js';
import type {
  FixedMarkerPropsT,
  NeedlePropsT,
  DragShadowPropsT,
} from './types.js';

const Needle = ({size, background, overrides = {}}: NeedlePropsT) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return (
    <Needle
      $background={background}
      $height={NEEDLE_HEIGHTS[size]}
      {...needleProps}
    />
  );
};

const DragShadow = ({
  background,
  dragging,
  height,
  overrides = {},
}: DragShadowPropsT) => {
  const [DragShadowContainer, dragShadowContainerProps] = getOverrides(
    overrides.DragShadowContainer,
    StyledDragShadowContainer,
  );
  const [DragShadow, dragShadowProps] = getOverrides(
    overrides.DragShadow,
    StyledDragShadow,
  );

  return (
    <DragShadowContainer
      $width={dragShadowWidth}
      $height={height}
      $dragging={dragging}
      {...dragShadowContainerProps}
    >
      <DragShadow
        $width={dragShadowWidth}
        $background={background}
        {...dragShadowProps}
      />
    </DragShadowContainer>
  );
};

const FixedMarker = ({
  size = PINHEAD_SIZES.medium,
  needle = NEEDLE_SIZES.medium,
  label,
  startEnhancer,
  endEnhancer,
  color,
  background,
  dragging = false,
  overrides = {},
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundInversePrimary, primaryB},
  } = theme;

  color = color || primaryB;
  background = background || backgroundInversePrimary;

  const doesPinHeadTransformOnDrag = needle !== NEEDLE_SIZES.none;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [
    FixedMarkerDragContainer,
    fixedMarkerDragContainerProps,
  ] = getOverrides(overrides.DragContainer, StyledFixedMarkerDragContainer);
  return (
    <Root data-baseweb="fixed-map-marker" {...rootProps}>
      <FixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={doesPinHeadTransformOnDrag && dragging}
        {...fixedMarkerDragContainerProps}
      >
        <PinHead
          size={size}
          label={label}
          {...(startEnhancer ? {startEnhancer} : {})}
          {...(endEnhancer ? {endEnhancer} : {})}
          color={color}
          background={background}
          type={PINHEAD_TYPES.fixed}
          overrides={overrides}
        />
        <Needle size={needle} background={background} overrides={overrides} />
      </FixedMarkerDragContainer>
      {doesPinHeadTransformOnDrag && (
        <DragShadow
          background={background}
          dragging={dragging}
          height={dragShadowMarginTop + dragShadowHeight}
          overrides={overrides}
        />
      )}
    </Root>
  );
};

export default FixedMarker;
