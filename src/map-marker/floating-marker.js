/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import PinHead from './pin-head.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  FloatingMarkerRoot as StyledRoot,
  FloatingMarkerAnchorContainer as StyledFloatingMarkerAnchorContainer,
  FloatingMarkerPinHeadContainer as StyledFloatingMarkerPinHeadContainer,
} from './styled-components.js';
import type {FloatingMarkerPropsT} from './types.js';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  PINHEAD_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
  anchorSize,
} from './constants.js';

const FloatingMarker = ({
  color,
  background,
  label,
  size = PINHEAD_SIZES.medium,
  anchor = FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft,
  endEnhancer,
  startEnhancer,
  anchorType = FLOATING_MARKER_ANCHOR_TYPES.circle,
  overrides = {},
}: FloatingMarkerPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, backgroundInversePrimary, primaryA, primaryB},
  } = theme;
  color = color || primaryA;
  background = background || backgroundPrimary;

  const anchorPinHeadSize =
    anchorType === FLOATING_MARKER_ANCHOR_TYPES.circle
      ? PINHEAD_SIZES.xSmallCircle
      : PINHEAD_SIZES.xSmallSquare;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [
    FloatingMarkerPinHeadContainer,
    floatingMarkerPinHeadContainerProps,
  ] = getOverrides(
    overrides.PinHeadContainer,
    StyledFloatingMarkerPinHeadContainer,
  );

  const [
    FloatingMarkerAnchorContainer,
    floatingMarkerAnchorContainerProps,
  ] = getOverrides(
    overrides.AnchorContainer,
    StyledFloatingMarkerAnchorContainer,
  );
  return (
    <Root data-baseweb="floating-map-marker" {...rootProps}>
      <FloatingMarkerPinHeadContainer
        $anchor={anchor}
        $anchorSize={anchorSize}
        {...floatingMarkerPinHeadContainerProps}
      >
        <PinHead
          size={size}
          color={color}
          background={background}
          type={PINHEAD_TYPES.floating}
          label={label}
          startEnhancer={startEnhancer}
          endEnhancer={endEnhancer}
          overrides={overrides}
        />
      </FloatingMarkerPinHeadContainer>
      {anchor !== FLOATING_MARKER_ANCHOR_POSITIONS.none && (
        <FloatingMarkerAnchorContainer {...floatingMarkerAnchorContainerProps}>
          <PinHead
            size={anchorPinHeadSize}
            color={primaryB}
            background={backgroundInversePrimary}
            type={PINHEAD_TYPES.fixed}
            overrides={overrides}
          />
        </FloatingMarkerAnchorContainer>
      )}
    </Root>
  );
};

export default FloatingMarker;
