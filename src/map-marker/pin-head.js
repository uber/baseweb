/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Label1, Label2, Label3} from '../typography/index.js';
import {useStyletron, styled} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  InnerXSmallAnchor as StyledInnerXSmallAnchor,
  OuterXSmallAnchor as StyledOuterXSmallAnchor,
  PinHead as StyledPinHead,
} from './styled-components.js';
import {PINHEAD_DIMENSIONS, PINHEAD_TYPES, PINHEAD_SIZES} from './constants.js';
import type {PinHeadPropsT, ItemPropsT, PinHeadSizeT} from './types.js';
import {RenderNode} from '../list/list-heading.js';

export const Item = styled<{
  $color: string,
  $height: number,
  $size: PinHeadSizeT,
}>('div', ({$theme, $color, $height, $size}) => {
  const match = {
    [PINHEAD_SIZES.small]: 'LabelSmall',
    [PINHEAD_SIZES.medium]: 'LabelMedium',
    [PINHEAD_SIZES.large]: 'LabelLarge',
  };
  return {
    ...$theme.typography[match[$size]],
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: `${$height}px`,
    height: `${$height}px`,
    color: $color,
  };
});

const PinHead = ({
  size = PINHEAD_SIZES.medium,
  label = '',
  startEnhancer = null,
  endEnhancer = null,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
  anchorType,
  overrides = {},
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

  const StartEnhancer = startEnhancer;
  const EndEnhancer = endEnhancer;

  const [PinHead, pinHeadProps] = getOverrides(
    overrides.PinHead,
    StyledPinHead,
  );
  const [InnerXSmallAnchor, innerXSmallAnchorProps] = getOverrides(
    overrides.InnerAnchor,
    StyledInnerXSmallAnchor,
  );
  const [OuterXSmallAnchor, outerXSmallAnchorProps] = getOverrides(
    overrides.OuterAnchor,
    StyledOuterXSmallAnchor,
  );

  if (
    type === PINHEAD_TYPES.fixed &&
    (size === PINHEAD_SIZES.xSmallSquare || size === PINHEAD_SIZES.xSmallCircle)
  ) {
    const round = size === PINHEAD_SIZES.xSmallCircle;
    return (
      <OuterXSmallAnchor
        $round={round}
        $background={background}
        $size={height}
        {...innerXSmallAnchorProps}
      >
        <InnerXSmallAnchor
          $color={color}
          $round={round}
          $size={icon}
          {...outerXSmallAnchorProps}
        />
      </OuterXSmallAnchor>
    );
  }

  return (
    <PinHead
      $background={background}
      $height={height}
      $gridTemplateColumns={gridTemplateColumns}
      $forceCircle={forceCircle}
      $type={type}
      {...pinHeadProps}
    >
      {StartEnhancer && (
        <Item $height={height} $color={color} $size={size}>
          {/* TODO: Fix me, size prop is not being passed to the element. All icons are 16px */}
          <RenderNode component={StartEnhancer} size={`${icon}px`} />
          {/* {React.cloneElement(startEnhancer, {size: `${icon}px`}, null)} */}
        </Item>
      )}
      {label && (
        <Item $height={height} $color={color} $size={size}>
          {label}
        </Item>
      )}
      {EndEnhancer && (
        <Item $height={height} $color={color} $size={size}>
          {/* TODO: Fix me, size prop is not being passed to the element. All icons are 16px */}
          <RenderNode component={EndEnhancer} size={`${icon}px`} />
          {/* {React.cloneElement(endEnhancer, {size: `${icon}px`}, null)} */}
        </Item>
      )}
    </PinHead>
  );
};
export default PinHead;
