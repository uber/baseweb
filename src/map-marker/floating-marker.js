/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Block} from '../block/index.js';
import PinHead from './pin-head.js';
import {getAnchorTransform} from './styled-components.js';
import type {FloatingMarkerPropsT} from './types.js';
import {
  ANCHOR_POSITIONS,
  PINHEAD_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from './constants.js';
const FloatingMarker = ({
  color,
  background,
  label,
  size = PINHEAD_SIZES.medium,
  anchor = ANCHOR_POSITIONS.bottomLeft,
  endEnhancer,
  startEnhancer,
  anchorType = FLOATING_MARKER_ANCHOR_TYPES.round,
}: FloatingMarkerPropsT) => {
  const [css, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, backgroundInversePrimary, primaryA, primaryB},
    animation: {timing300, easeOutCurve},
  } = theme;
  color = color || primaryA;
  background = background || backgroundPrimary;

  const anchorSize = 16;
  return (
    <Block
      className={css({
        position: 'relative',
      })}
    >
      <Block
        className={css({
          position: 'absolute',
          transition: `${timing300} ${easeOutCurve} all`,
          transform: getAnchorTransform(anchor, anchorSize),
        })}
      >
        <PinHead
          size={size}
          color={color}
          background={background}
          type={PINHEAD_TYPES.floating}
          label={label}
          startEnhancer={startEnhancer}
          endEnhancer={endEnhancer}
        />
      </Block>
      {anchor !== 'none' && (
        <Block
          className={css({
            position: 'absolute',
          })}
        >
          <PinHead
            size={`x-small-${anchorType}`}
            color={primaryB}
            background={backgroundInversePrimary}
            type={PINHEAD_TYPES.fixed}
          />
        </Block>
      )}
    </Block>
  );
};

export default FloatingMarker;
