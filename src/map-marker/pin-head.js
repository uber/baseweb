/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import * as ReactIs from 'react-is';
import {useStyletron, styled} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  InnerXSmallAnchor as StyledInnerXSmallAnchor,
  OuterXSmallAnchor as StyledOuterXSmallAnchor,
  PinHead as StyledPinHead,
} from './styled-components.js';
import {
  PINHEAD_DIMENSIONS,
  PINHEAD_TYPES,
  PINHEAD_SIZES_SHAPES,
} from './constants.js';
import type {PinHeadPropsT, PinHeadSizeT} from './types.js';

export const _ContentItem = styled<{
  $color: string,
  $height: number,
  $size: PinHeadSizeT,
}>('div', ({$theme, $color, $height, $size}) => {
  const match = {
    [PINHEAD_SIZES_SHAPES.xSmallCircle]: 'LabelSmall',
    [PINHEAD_SIZES_SHAPES.xSmallSquare]: 'LabelSmall',
    [PINHEAD_SIZES_SHAPES.small]: 'LabelSmall',
    [PINHEAD_SIZES_SHAPES.medium]: 'LabelMedium',
    [PINHEAD_SIZES_SHAPES.large]: 'LabelLarge',
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

function RenderNode(props) {
  const {component, ...restProps} = props;
  const Component = component;
  if (!Component) {
    return null;
  }
  if (typeof Component === 'string') {
    return Component;
  }
  if (ReactIs.isValidElementType(Component)) {
    // $FlowFixMe
    return <Component {...restProps} />;
  }
  return React.cloneElement(Component, restProps);
}

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
    (size === PINHEAD_SIZES_SHAPES.xSmallSquare ||
      size === PINHEAD_SIZES_SHAPES.xSmallCircle)
  ) {
    const round = size === PINHEAD_SIZES_SHAPES.xSmallCircle;
    return (
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
        <ContentItem
          $height={height}
          $color={color}
          $size={size}
          {...contentItemProps}
        >
          {/* <StartEnhancer /> */}
          <RenderNode component={StartEnhancer} size={`${icon}px`} />
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
          {/* <EndEnhancer /> */}
          <RenderNode component={EndEnhancer} size={`${icon}px`} />
        </ContentItem>
      )}
    </PinHead>
  );
};
export default PinHead;
