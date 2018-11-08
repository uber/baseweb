/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import type {BlockPropsT} from './types';
import {StyledBlock} from './styled-components';

function Block({
  children,
  as,
  color,
  font,
  alignContent,
  alignItems,
  alignSelf,
  direction,
  display,
  flex,
  justifyContent,
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
  wrap,
  ...other
}: BlockPropsT) {
  return (
    <StyledBlock
      $as={as}
      $color={color}
      $font={font}
      $alignContent={alignContent}
      $alignItems={alignItems}
      $alignSelf={alignSelf}
      $direction={direction}
      $display={display}
      $flex={flex}
      $justifyContent={justifyContent}
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
      $wrap={wrap}
      {...other}
    >
      {children}
    </StyledBlock>
  );
}

Block.defaultProps = {
  as: 'div',
  alignContent: 'stretch',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  display: 'block',
  flex: 'shrink',
  justifyContent: 'start',
  position: 'static',
  overflow: 'visible',
  wrap: false,
};

export default Block;
