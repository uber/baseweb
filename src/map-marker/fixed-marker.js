/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {PINHEAD_TYPES, NEEDLE_SIZES, PINHEAD_SIZES} from './constants.js';
import Needle from './needle.js';
import PinHead from './pin-head.js';
import DragShadow from './drag-shadow.js';
import {
  StyledFixedMarkerDragContainer,
  StyledFixedMarkerRoot,
} from './styled-components.js';
import type {FixedMarkerPropsT} from './types.js';

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

  const pinHeadTransformOnDrag = Object.keys(NEEDLE_SIZES)
    .filter(x => x !== 'none')
    .includes(needle);

  const dragShadowHeight = 4;
  const dragShadowMarginTop = 6;
  return (
    <StyledFixedMarkerRoot data-baseweb="icon">
      <StyledFixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={pinHeadTransformOnDrag && dragging}
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
      {pinHeadTransformOnDrag && (
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
