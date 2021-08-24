/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Block} from '../block/index.js';
import Needle from './needle.js';
import {NEEDLE_SIZES, PINHEAD_SIZES} from './constants.js';
import PinHead from './pin-head.js';
import DragShadow from './drag-shadow.js';
import type {FixedMarkerPropsT} from './types.js';
import {PINHEAD_TYPES} from './constants.js';

const FixedMarker = ({
  size = PINHEAD_SIZES.medium,
  needle = NEEDLE_SIZES.medium,
  label,
  startEnhancer,
  endEnhancer,
  color,
  background,
  dragging,
}: FixedMarkerPropsT) => {
  const [css, theme] = useStyletron();
  const {
    colors: {backgroundInversePrimary, primaryB},
    animation: {timing300, easeOutCurve},
  } = theme;

  color = color || primaryB;
  background = background || backgroundInversePrimary;

  const pinHeadTransformOnDrag = Object.keys(NEEDLE_SIZES)
    .filter(x => x !== 'none')
    .includes(needle);

  const dragShadowHeight = 4;
  const dragShadowMarginTop = 6;
  return (
    <Block
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      })}
    >
      <Block
        className={css({
          transform: `translateY(${
            pinHeadTransformOnDrag && dragging
              ? '0px'
              : `${dragShadowMarginTop + dragShadowHeight}px`
          })`,
          transition: `${timing300} ${easeOutCurve} all`,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        })}
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
      </Block>
      {pinHeadTransformOnDrag && (
        <DragShadow
          background={background}
          dragging={dragging}
          height={dragShadowMarginTop + dragShadowHeight}
        />
      )}
    </Block>
  );
};

export default FixedMarker;
