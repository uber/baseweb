/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import type {BlockPropsT} from './types';
import {StyledBlock} from './styled-components';
import {getOverrides} from '../helpers/overrides';

function Block({
  children,
  as,
  overrides,
  color,
  font,
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  display,
  flex,
  justifyContent,
  justifySelf,
  position,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  overflow,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  flexWrap,
  left,
  top,
  right,
  bottom,
  ...other
}: BlockPropsT) {
  // $FlowFixMe
  const [BaseBlock, baseBlockProps] = getOverrides(
    // $FlowFixMe
    overrides.Block,
    StyledBlock,
  );

  return (
    <BaseBlock
      $as={as}
      $color={color}
      $font={font}
      $alignContent={alignContent}
      $alignItems={alignItems}
      $alignSelf={alignSelf}
      $flexDirection={flexDirection}
      $display={display}
      $flex={flex}
      $justifyContent={justifyContent}
      $justifySelf={justifySelf}
      $position={position}
      $width={width}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      $height={height}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      $overflow={overflow}
      $margin={margin}
      $marginTop={marginTop}
      $marginRight={marginRight}
      $marginBottom={marginBottom}
      $marginLeft={marginLeft}
      $padding={padding}
      $paddingTop={paddingTop}
      $paddingRight={paddingRight}
      $paddingBottom={paddingBottom}
      $paddingLeft={paddingLeft}
      $flexWrap={flexWrap}
      $left={left}
      $top={top}
      $right={right}
      $bottom={bottom}
      {...other}
      {...baseBlockProps}
    >
      {children}
    </BaseBlock>
  );
}

Block.defaultProps = {
  overrides: {},
  as: 'div',
};

export default Block;
