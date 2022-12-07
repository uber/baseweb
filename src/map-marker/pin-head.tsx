/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  StyledInnerXXSmallAnchor,
  StyledOuterXXSmallAnchor,
  StyledInnerXSmallAnchor,
  StyledOuterXSmallAnchor,
  StyledPinHead,
  RelativeContainer,
  StyledEnhancerSlot,
  StyledLabelSlot,
  StyledLabel,
} from './styled-components';
import {
  PINHEAD_DIMENSIONS,
  PINHEAD_TYPES,
  PINHEAD_SIZES_SHAPES,
  NEEDLE_HEIGHTS,
  NEEDLE_SIZES,
} from './constants';
import BadgeEnhancer from './badge-enhancer';
import LabelEnhancer from './label-enhancer';
import type { PinHeadProps } from './types';

const PinHead = ({
  size = PINHEAD_SIZES_SHAPES.medium,
  label = '',
  secondaryLabel = '',
  startEnhancer: StartEnhancer,
  endEnhancer: EndEnhancer,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  anchorType,
  needle = NEEDLE_SIZES.none,
  labelEnhancerContent,
  labelEnhancerPosition,
  badgeEnhancerSize,
  badgeEnhancerContent,
  overrides = {},
}: PinHeadProps) => {
  const activeElements = [label, StartEnhancer, EndEnhancer].filter((x) => x);
  const gridTemplateColumns = activeElements.map(() => 'auto').join(' ');
  const forceCircle = activeElements.length === 1 && !label;
  const { height, icon } = PINHEAD_DIMENSIONS[size];

  const [PinHead, pinHeadProps] = getOverrides(overrides.PinHead, StyledPinHead);
  const [EnhancerSlot, enhancerSlotProps] = getOverrides(
    overrides.EnhancerSlot,
    StyledEnhancerSlot
  );
  const [LabelSlot, labelSlotProps] = getOverrides(overrides.LabelSlot, StyledLabelSlot);
  const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
  const [SecondaryLabel, secondaryLabelProps] = getOverrides(overrides.SecondaryLabel, StyledLabel);

  const [InnerXXSmallAnchor, innerXXSmallAnchorProps] = getOverrides(
    overrides.InnerAnchor,
    StyledInnerXXSmallAnchor
  );
  const [OuterXXSmallAnchor, outerXXSmallAnchorProps] = getOverrides(
    overrides.OuterAnchor,
    StyledOuterXXSmallAnchor
  );

  const [InnerXSmallAnchor, innerXSmallAnchorProps] = getOverrides(
    overrides.InnerAnchor,
    StyledInnerXSmallAnchor
  );
  const [OuterXSmallAnchor, outerXSmallAnchorProps] = getOverrides(
    overrides.OuterAnchor,
    StyledOuterXSmallAnchor
  );

  const badge = (
    <BadgeEnhancer
      markerType={type}
      pinHeadSize={size}
      badgeEnhancerSize={badgeEnhancerSize}
      badgeEnhancerContent={badgeEnhancerContent}
      overrides={overrides}
    />
  );
  if (
    type === PINHEAD_TYPES.fixed &&
    (size === PINHEAD_SIZES_SHAPES.xxSmallCircle || size === PINHEAD_SIZES_SHAPES.xxSmallSquare)
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
    (size === PINHEAD_SIZES_SHAPES.xSmallSquare || size === PINHEAD_SIZES_SHAPES.xSmallCircle)
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

  const renderSecondaryLabel =
    (size === PINHEAD_SIZES_SHAPES.large || size === PINHEAD_SIZES_SHAPES.medium) && secondaryLabel;

  return (
    <RelativeContainer>
      <LabelEnhancer
        labelEnhancerContent={labelEnhancerContent}
        labelEnhancerPosition={labelEnhancerPosition}
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
          <EnhancerSlot $height={height} $color={color} $size={size} {...enhancerSlotProps}>
            <StartEnhancer size={icon} />
          </EnhancerSlot>
        )}
        {label && (
          <LabelSlot {...labelSlotProps}>
            <Label
              $size={size}
              $renderSecondaryLabel={renderSecondaryLabel}
              $color={color}
              {...labelProps}
            >
              {label}
            </Label>
            {renderSecondaryLabel && (
              <SecondaryLabel
                $size={size}
                $renderSecondaryLabel={renderSecondaryLabel}
                $color={color}
                {...secondaryLabelProps}
              >
                {secondaryLabel}
              </SecondaryLabel>
            )}
          </LabelSlot>
        )}
        {EndEnhancer && (
          <EnhancerSlot $height={height} $color={color} $size={size} {...enhancerSlotProps}>
            <EndEnhancer size={icon} />
          </EnhancerSlot>
        )}
      </PinHead>
    </RelativeContainer>
  );
};
export default PinHead;
