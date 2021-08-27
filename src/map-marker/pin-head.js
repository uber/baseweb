/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {PINHEAD_SIZES, PINHEAD_TYPES, PINHEAD_SIZE} from './constants.js';
import Item from './pin-head-item.js';
import {
  StyledInnerXSmallAnchor,
  StyledOuterXSmallAnchor,
  StyledPinHead,
} from './styled-components.js';

import type {PinHeadPropsT} from './types.js';

const PinHead = ({
  size = PINHEAD_SIZES.medium,
  label = '',
  startEnhancer = null,
  endEnhancer = null,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
}: PinHeadPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, primaryA},
  } = theme;

  color = color || backgroundPrimary;
  background = background || primaryA;

  const activeElements = [label, startEnhancer, endEnhancer].filter(x => x);
  const gridTemplateColumns = activeElements.map(() => 'auto').join(' ');
  const forceCircle = activeElements.length === 1 && !label;
  //$FlowFixMe
  const {height, icon} = PINHEAD_SIZE[size];

  if (type === 'fixed' && size.includes('x-small')) {
    const round = size.includes('round');
    return (
      <StyledOuterXSmallAnchor round={round} background={background}>
        <StyledInnerXSmallAnchor color={color} round={round} />
      </StyledOuterXSmallAnchor>
    );
  }

  return (
    <StyledPinHead
      background={background}
      height={height}
      gridTemplateColumns={gridTemplateColumns}
      forceCircle={forceCircle}
      type={type}
    >
      {startEnhancer && (
        <Item size={height} color={color}>
          {React.cloneElement(startEnhancer, {size: `${icon}px`}, null)}
        </Item>
      )}
      {label && (
        <Item size={height} color={color}>
          {label}
        </Item>
      )}
      {endEnhancer && (
        <Item size={height} color={color}>
          {React.cloneElement(endEnhancer, {size: `${icon}px`}, null)}
        </Item>
      )}
    </StyledPinHead>
  );
};
export default PinHead;
