/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron, styled} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  InnerXXSmallAnchor as StyledInnerXXSmallAnchor,
  OuterXXSmallAnchor as StyledOuterXXSmallAnchor,
  InnerXSmallAnchor as StyledInnerXSmallAnchor,
  OuterXSmallAnchor as StyledOuterXSmallAnchor,
  PinHead as StyledPinHead,
  RelativeContainer,
} from './styled-components.js';
import {
  PINHEAD_DIMENSIONS,
  PINHEAD_TYPES,
  PINHEAD_SIZES_SHAPES,
  NEEDLE_HEIGHTS,
  LABEL_SIZES,
} from './constants.js';
import BadgeEnhancer from './badge-enhancer.js';
import LabelEnhancer from './label-enhancer.js';
import type {PinHeadPropsT, PinHeadSizeT} from './types.js';

export const _ContentItem = styled<{
  $color: string,
  $height: number,
  $size: PinHeadSizeT,
}>('div', ({$theme, $color, $height, $size}) => {
  return {
    ...$theme.typography[LABEL_SIZES[$size]],
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: `${$height}px`,
    height: `${$height}px`,
    color: $color,
  };
});

const PinHead = ({
  size = PINHEAD_SIZES_SHAPES.medium,
  label = '',
  startEnhancer: StartEnhancer,
  endEnhancer: EndEnhancer,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
  anchorType,
  needle,
  labelEnhancerContent,
  labelEnhancerPosition,
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  badgeEnhancerSize,
  badgeEnhancerColor,
  badgeEnhancerBackground,
  badgeEnhancerContent,

  overrides = {},
}: PinHeadPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, primaryA},
  } = theme;

  color = color || backgroundPrimary;
  background = background || primaryA;

  const activeElements = [label, StartEnhancer, EndEnhancer].filter(x => x);
  const gridTemplateColumns = activeElements.map(() => 'auto').join(' ');
  const forceCircle = activeElements.length === 1 && !label;
  const {height, icon} = PINHEAD_DIMENSIONS[size];

  const [PinHead, pinHeadProps] = getOverrides(
    overrides.PinHead,
    StyledPinHead,
  );
  const [ContentItem, contentItemProps] = getOverrides(
    overrides.PinHeadContent,
    _ContentItem,
  );

  const [InnerXXSmallAnchor, innerXXSmallAnchorProps] = getOverrides(
    overrides.InnerAnchor,
    StyledInnerXXSmallAnchor,
  );
  const [OuterXXSmallAnchor, outerXXSmallAnchorProps] = getOverrides(
    overrides.OuterAnchor,
    StyledOuterXXSmallAnchor,
  );

  const [InnerXSmallAnchor, innerXSmallAnchorProps] = getOverrides(
    overrides.InnerAnchor,
    StyledInnerXSmallAnchor,
  );
  const [OuterXSmallAnchor, outerXSmallAnchorProps] = getOverrides(
    overrides.OuterAnchor,
    StyledOuterXSmallAnchor,
  );

  const badge = (
    <BadgeEnhancer
      markerType={type}
      pinHeadSize={size}
      badgeEnhancerSize={badgeEnhancerSize}
      badgeEnhancerColor={badgeEnhancerColor}
      badgeEnhancerBackground={badgeEnhancerBackground}
      badgeEnhancerContent={badgeEnhancerContent}
      overrides={overrides}
    />
  );
  if (
    type === PINHEAD_TYPES.fixed &&
    (size === PINHEAD_SIZES_SHAPES.xxSmallCircle ||
      size === PINHEAD_SIZES_SHAPES.xxSmallSquare)
  ) {
    const round = size === PINHEAD_SIZES_SHAPES.xxSmallCircle;
    return (
      <OuterXXSmallAnchor
        $round={round}
        $background={background}
        $size={height}
        {...outerXXSmallAnchorProps}
      >
        <InnerXXSmallAnchor
          $color={color}
          $round={round}
          $size={icon}
          {...innerXXSmallAnchorProps}
        />
      </OuterXXSmallAnchor>
    );
  }

  if (
    type === PINHEAD_TYPES.fixed &&
    (size === PINHEAD_SIZES_SHAPES.xSmallSquare ||
      size === PINHEAD_SIZES_SHAPES.xSmallCircle)
  ) {
    const round = size === PINHEAD_SIZES_SHAPES.xSmallCircle;
    return (
      <RelativeContainer>
        {badge}
        <OuterXSmallAnchor
          $round={round}
          $background={background}
          $size={height}
          {...outerXSmallAnchorProps}
        >
          <InnerXSmallAnchor
            $color={color}
            $round={round}
            $size={icon}
            {...innerXSmallAnchorProps}
          />
        </OuterXSmallAnchor>
      </RelativeContainer>
    );
  }

  return (
    <RelativeContainer>
      <LabelEnhancer
        labelEnhancerContent={labelEnhancerContent}
        labelEnhancerPosition={labelEnhancerPosition}
        labelEnhancerColor={labelEnhancerColor}
        labelEnhancerStrokeColor={labelEnhancerStrokeColor}
        needleHeight={NEEDLE_HEIGHTS[needle]}
        size={size}
        overrides={overrides}
      />
      {badge}
      <PinHead
        $background={background}
        $height={height}
        $gridTemplateColumns={gridTemplateColumns}
        $forceCircle={forceCircle}
        $type={type}
        {...pinHeadProps}
      >
        {StartEnhancer && (
          <ContentItem
            $height={height}
            $color={color}
            $size={size}
            {...contentItemProps}
          >
            <StartEnhancer size={icon} />
          </ContentItem>
        )}
        {label && (
          <ContentItem
            $height={height}
            $color={color}
            $size={size}
            {...contentItemProps}
          >
            {label}
          </ContentItem>
        )}
        {EndEnhancer && (
          <ContentItem
            $height={height}
            $color={color}
            $size={size}
            {...contentItemProps}
          >
            <EndEnhancer size={icon} />
          </ContentItem>
        )}
      </PinHead>
    </RelativeContainer>
  );
};
export default PinHead;
