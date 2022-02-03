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
  PINHEAD_SIZES_SHAPES,
  LABEL_ENHANCER_POSITIONS,
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
  size = PINHEAD_SIZES_SHAPES.medium,
  needle = NEEDLE_SIZES.medium,
  label,
  startEnhancer,
  endEnhancer,
  color,
  background,
  dragging = false,
  overrides = {},
  labelEnhancerContent = null,
  labelEnhancerPosition = LABEL_ENHANCER_POSITIONS.bottom,
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  badgeEnhancerSize = null,
  badgeEnhancerColor = null,
  badgeEnhancerBackground = null,
  badgeEnhancerContent = null,
  ...restProps
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundInversePrimary, primaryB},
  } = theme;

  color = color || primaryB;
  background = background || backgroundInversePrimary;

  const doesPinHeadTransformOnDrag =
    needle !== NEEDLE_SIZES.none &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallCircle &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallSquare;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledFixedMarkerRoot);
  const [
    FixedMarkerDragContainer,
    fixedMarkerDragContainerProps,
  ] = getOverrides(overrides.DragContainer, StyledFixedMarkerDragContainer);

  const renderNeedle =
    needle !== NEEDLE_SIZES.none &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallCircle &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallSquare;
  if (!renderNeedle) {
    console.warn(
      `Needles cannot be rendered with ${PINHEAD_SIZES_SHAPES.xxSmallCircle} or ${PINHEAD_SIZES_SHAPES.xxSmallSquare} pin heads`,
    );
  }

  return (
    <Root data-baseweb="fixed-map-marker" {...restProps} {...rootProps}>
      <FixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={doesPinHeadTransformOnDrag && !dragging}
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
          badgeEnhancerSize={badgeEnhancerSize}
          badgeEnhancerColor={badgeEnhancerColor}
          badgeEnhancerBackground={badgeEnhancerBackground}
          badgeEnhancerContent={badgeEnhancerContent}
          labelEnhancerContent={labelEnhancerContent}
          labelEnhancerPosition={labelEnhancerPosition}
          labelEnhancerColor={labelEnhancerColor}
          labelEnhancerStrokeColor={labelEnhancerStrokeColor}
          needle={needle}
        />
        {renderNeedle && (
          <Needle size={needle} background={background} overrides={overrides} />
        )}
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
