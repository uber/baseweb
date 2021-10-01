/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
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
  StyledFixedMarkerDragContainer,
  StyledFixedMarkerRoot,
  StyledNeedle,
  StyledDragShadow,
  StyledDragShadowContainer,
} from './styled-components.js';
import type {
  FixedMarkerPropsT,
  NeedlePropsT,
  DragShadowPropsT,
} from './types.js';

const Needle = ({size, background}: NeedlePropsT) => (
  <StyledNeedle $background={background} $height={NEEDLE_HEIGHTS[size]} />
);

const DragShadow = ({background, dragging, height}: DragShadowPropsT) => {
  return (
    <StyledDragShadowContainer
      $width={dragShadowWidth}
      $height={height}
      $dragging={dragging}
    >
      <StyledDragShadow $width={dragShadowWidth} $background={background} />
    </StyledDragShadowContainer>
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
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundInversePrimary, primaryB},
  } = theme;

  color = color || primaryB;
  background = background || backgroundInversePrimary;

  const doesPinHeadTransformOnDrag = needle !== NEEDLE_SIZES.none;

  return (
    <StyledFixedMarkerRoot data-baseweb="fixed-map-marker">
      <StyledFixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={doesPinHeadTransformOnDrag && dragging}
      >
        <PinHead
          size={size}
          label={label}
          startEnhancer={startEnhancer}
          endEnhancer={endEnhancer}
          color={color}
          background={background}
          type={PINHEAD_TYPES.fixed}
        />
        <Needle size={needle} background={background} />
      </StyledFixedMarkerDragContainer>
      {doesPinHeadTransformOnDrag && (
        <DragShadow
          background={background}
          dragging={dragging}
          height={dragShadowMarginTop + dragShadowHeight}
        />
      )}
    </StyledFixedMarkerRoot>
  );
};

export default FixedMarker;
