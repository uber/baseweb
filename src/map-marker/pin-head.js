/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Label1, Label2, Label3} from '../typography/index.js';
import {useStyletron} from '../styles/index.js';
import {
  StyledInnerXSmallAnchor,
  StyledOuterXSmallAnchor,
  StyledPinHead,
} from './styled-components.js';
import {PINHEAD_DIMENSIONS, PINHEAD_TYPES, PINHEAD_SIZES} from './constants.js';
import type {PinHeadPropsT, ItemPropsT} from './types.js';

const Item = ({children, color, size = 48}: ItemPropsT) => {
  const [css] = useStyletron();
  const props = {
    color,
    className: css({
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: `${size}px`,
      height: `${size}px`,
      color,
    }),
  };
  switch (size) {
    case 24:
      return <Label3 {...props}>{children}</Label3>;
    case 36:
      return <Label2 {...props}>{children}</Label2>;
    default:
      return <Label1 {...props}>{children}</Label1>;
  }
};

const PinHead = ({
  size = PINHEAD_SIZES.medium,
  label = '',
  startEnhancer = null,
  endEnhancer = null,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
  anchorType,
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
  const {height, icon} = PINHEAD_DIMENSIONS[size];
  if (
    type === PINHEAD_TYPES.fixed &&
    (size === PINHEAD_SIZES.xSmallSquare || size === PINHEAD_SIZES.xSmallCircle)
  ) {
    const round = size === PINHEAD_SIZES.xSmallCircle;
    return (
      <StyledOuterXSmallAnchor
        $round={round}
        $background={background}
        $size={height}
      >
        <StyledInnerXSmallAnchor $color={color} $round={round} $size={icon} />
      </StyledOuterXSmallAnchor>
    );
  }
  return (
    <StyledPinHead
      $background={background}
      $height={height}
      $gridTemplateColumns={gridTemplateColumns}
      $forceCircle={forceCircle}
      $type={type}
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
