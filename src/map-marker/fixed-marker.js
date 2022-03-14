/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron, type ThemeT } from '../styles/index.js';
import { getOverrides } from '../helpers/overrides.js';
import {
  PINHEAD_TYPES,
  NEEDLE_SIZES,
  PINHEAD_SIZES_SHAPES,
  LABEL_ENHANCER_POSITIONS,
  KIND,
  dragShadowHeight,
  dragShadowMarginTop,
} from './constants.js';
import PinHead from './pin-head.js';
import Needle from './needle.js';
import DragShadow from './drag-shadow.js';
import { StyledFixedMarkerDragContainer, StyledFixedMarkerRoot } from './styled-components.js';
import type { FixedMarkerPropsT, KindT } from './types.js';

type Colors = {
  color: string,
  backgroundColor: string,
};

function getColors(kind: KindT, theme: ThemeT): Colors {
  if (kind === KIND.accent) {
    return {
      color: theme.colors.contentInversePrimary,
      backgroundColor: theme.colors.backgroundAccent,
    };
  }
  if (kind === KIND.negative) {
    return {
      color: theme.colors.contentInversePrimary,
      backgroundColor: theme.colors.backgroundNegative,
    };
  }
  return {
    color: theme.colors.contentInversePrimary,
    backgroundColor: theme.colors.backgroundInversePrimary,
  };
}

const FixedMarker = ({
  size = PINHEAD_SIZES_SHAPES.medium,
  needle = NEEDLE_SIZES.medium,
  label,
  startEnhancer,
  endEnhancer,
  kind = KIND.default,
  dragging = false,
  overrides = {},
  labelEnhancerContent = null,
  labelEnhancerPosition = LABEL_ENHANCER_POSITIONS.bottom,
  badgeEnhancerSize = null,
  badgeEnhancerContent = null,
  ...restProps
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();
  const { color, backgroundColor } = getColors(kind, theme);

  const doesPinHeadTransformOnDrag =
    needle !== NEEDLE_SIZES.none &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallCircle &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallSquare;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledFixedMarkerRoot);
  const [FixedMarkerDragContainer, fixedMarkerDragContainerProps] = getOverrides(
    overrides.DragContainer,
    StyledFixedMarkerDragContainer
  );

  const renderNeedle =
    needle !== NEEDLE_SIZES.none &&
    ![PINHEAD_SIZES_SHAPES.xxSmallCircle, PINHEAD_SIZES_SHAPES.xxSmallSquare].includes(size);

  if (__DEV__) {
    if (
      needle !== NEEDLE_SIZES.none &&
      [PINHEAD_SIZES_SHAPES.xxSmallCircle, PINHEAD_SIZES_SHAPES.xxSmallSquare].includes(size)
    ) {
      console.warn(
        `Needles cannot be rendered with ${PINHEAD_SIZES_SHAPES.xxSmallCircle} or ${PINHEAD_SIZES_SHAPES.xxSmallSquare} pin heads`
      );
    }
  }
  const enhancers = {};
  if (startEnhancer) {
    enhancers['startEnhancer'] = startEnhancer;
  }
  if (endEnhancer) {
    enhancers['endEnhancer'] = endEnhancer;
  }
  return (
    <Root data-baseweb="fixed-map-marker" {...rootProps}>
      <FixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={doesPinHeadTransformOnDrag && !dragging}
        {...fixedMarkerDragContainerProps}
      >
        <PinHead
          size={size}
          label={label}
          {...enhancers}
          color={color}
          background={backgroundColor}
          type={PINHEAD_TYPES.fixed}
          overrides={overrides}
          badgeEnhancerSize={badgeEnhancerSize}
          badgeEnhancerContent={badgeEnhancerContent}
          labelEnhancerContent={labelEnhancerContent}
          labelEnhancerPosition={labelEnhancerPosition}
          needle={needle}
        />
        {renderNeedle && (
          <Needle size={needle} background={backgroundColor} overrides={overrides} />
        )}
      </FixedMarkerDragContainer>
      {doesPinHeadTransformOnDrag && (
        <DragShadow
          background={backgroundColor}
          dragging={dragging}
          height={dragShadowMarginTop + dragShadowHeight}
          overrides={overrides}
        />
      )}
    </Root>
  );
};

export default FixedMarker;
