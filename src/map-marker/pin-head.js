/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Label1, Label2, Label3} from '../typography/index.js';
import type {ItemPropsT, PinHeadPropsT} from './types.js';
import {PINHEAD_SIZES, PINHEAD_TYPES} from './constants.js';
import {
  StyledInnerXSmallAnchor,
  StyledOuterXSmallAnchor,
  StyledPinHead,
} from './styled-components.js';
const sizes = {
  small: {height: 24, icon: 16},
  medium: {height: 36, icon: 16},
  large: {height: 48, icon: 24},
};

const Item = ({children, color, size}: ItemPropsT) => {
  const [css] = useStyletron();
  const props = {
    color,
    className: css({
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      lineheight: size,
      height: size,
      color,
    }),
  };
  if (size === 24) {
    return <Label3 {...props}>{children}</Label3>;
  } else if (size === 36) {
    return <Label2 {...props}>{children}</Label2>;
  } else {
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

  if (type === 'fixed' && size.includes('x-small')) {
    const round = size.includes('round');
    return (
      <StyledOuterXSmallAnchor round={round} background={background}>
        <StyledInnerXSmallAnchor color={color} round={round} />
      </StyledOuterXSmallAnchor>
    );
  }

  const {height, icon} = sizes[size];

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
