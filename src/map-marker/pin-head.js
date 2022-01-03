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
  BadgeEnhancer as StyledBadgeEnhancer,
  RelativeContainer,
  StrokedLabel,
  StrokedLabelContainer,
} from './styled-components.js';
import {
  PINHEAD_DIMENSIONS,
  PINHEAD_TYPES,
  PINHEAD_SIZES_SHAPES,
  BADGE_ENHANCER_SIZES,
  BADGE_ENHANCER_POSITIONS,
  BADGE_ENHANCER_CONTENT_SIZE,
  NEEDLE_HEIGHTS,
  LABEL_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from './constants.js';
import type {PinHeadPropsT, PinHeadSizeT, BadgeComponentT} from './types.js';

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

const LabelEnhancer = ({
  labelEnhancerContent,
  labelEnhancerPosition,
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  needleHeight,
  size,
}) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, primaryA},
  } = theme;

  if (
    !labelEnhancerPosition ||
    labelEnhancerPosition === LABEL_ENHANCER_POSITIONS.none
  ) {
    return null;
  }

  if (!labelEnhancerContent) {
    return null;
  }

  labelEnhancerColor = labelEnhancerColor || primaryA;
  labelEnhancerStrokeColor = labelEnhancerStrokeColor || backgroundPrimary;
  return (
    <StrokedLabelContainer
      $position={labelEnhancerPosition}
      $labelOffset={needleHeight}
    >
      <RelativeContainer>
        <StrokedLabel
          $color={labelEnhancerColor}
          $strokeColor={labelEnhancerStrokeColor}
          $size={size}
        >
          {labelEnhancerContent}
        </StrokedLabel>
      </RelativeContainer>
    </StrokedLabelContainer>
  );
};

const Badge = ({
  pinHeadSize,
  markerType,
  badgeEnhancerSize = null,
  badgeEnhancerColor = null,
  badgeEnhancerBackground = null,
  badgeEnhancerContent = null,
  overrides = {},
}: BadgeComponentT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundAccent, primaryB},
  } = theme;

  if (
    badgeEnhancerSize === null ||
    badgeEnhancerSize == BADGE_ENHANCER_SIZES.none
  ) {
    return null;
  }
  if (
    badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall &&
    !badgeEnhancerContent
  ) {
    console.warn(
      `Badges (except for size ${badgeEnhancerSize !==
        BADGE_ENHANCER_SIZES.xSmall} must contain content`,
    );
    return null;
  }
  if (markerType === PINHEAD_TYPES.floating) {
    console.warn(`Badges can only be rendered on fixed markers`);
    return null;
  }
  const position = BADGE_ENHANCER_POSITIONS[pinHeadSize][badgeEnhancerSize];
  if (!position) {
    console.warn(
      `Badge size ${badgeEnhancerSize} cannot be rendered with pinhead size ${pinHeadSize}`,
    );
    return null;
  }
  //TODO: force circle on large badges with only 1 item / content

  //TODO: set rules here that badge enhancer small must only include 1 icon and be size 10
  // if (
  //   badgeEnhancerSize === BADGE_ENHANCER_SIZES.small &&
  //   badgeEnhancerContent.length > 1
  // ) {
  //   console.warn(
  //     `Badge size ${BADGE_ENHANCER_SIZES.small} can only render an icon`,
  //   );
  //   return null;
  // }

  badgeEnhancerBackground = badgeEnhancerBackground || backgroundAccent;
  badgeEnhancerColor = badgeEnhancerColor || primaryB;
  const BadgeEnhancerContent = badgeEnhancerContent;

  if (badgeEnhancerSize === BADGE_ENHANCER_SIZES.medium) {
    console.log(<BadgeEnhancerContent />);
  }

  const [BadgeEnhancer, badgeEnhancerProps] = getOverrides(
    overrides.BadgeEnhancer,
    StyledBadgeEnhancer,
  );

  return (
    <BadgeEnhancer
      $size={badgeEnhancerSize}
      $position={position}
      $color={badgeEnhancerColor}
      $background={badgeEnhancerBackground}
      {...badgeEnhancerProps}
    >
      {badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && (
        <BadgeEnhancerContent
          size={BADGE_ENHANCER_CONTENT_SIZE[badgeEnhancerSize]}
        />
      )}
    </BadgeEnhancer>
  );
};

const PinHead = ({
  size = PINHEAD_SIZES_SHAPES.medium,
  label = '',
  startEnhancer: StartEnhancer,
  endEnhancer: EndEnhancer,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
  anchorType,
  overrides = {},
  labelEnhancerContent = null,
  labelEnhancerPosition = 'bottom',
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  badgeEnhancerSize = null,
  badgeEnhancerColor = null,
  badgeEnhancerBackground = null,
  badgeEnhancerContent = null,
  needle,
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
    <Badge
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
