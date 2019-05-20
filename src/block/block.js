/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import type {BlockPropsT} from './types.js';
import {StyledBlock} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

function Block({
  children,
  as,
  overrides,
  color,
  backgroundColor,
  font,
  alignContent,
  alignItems,
  alignSelf,
  flexDirection,
  display,
  flex,
  grid,
  gridArea,
  gridAutoColumns,
  gridAutoFlow,
  gridAutoRows,
  gridColumn,
  gridColumnEnd,
  gridColumnGap,
  gridColumnStart,
  gridGap,
  gridRow,
  gridRowEnd,
  gridRowGap,
  gridRowStart,
  gridTemplate,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  justifyContent,
  justifyItems,
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
  placeContent,
  placeItems,
  placeSelf,
  flexWrap,
  left,
  top,
  right,
  bottom,
  ...restProps
}: BlockPropsT) {
  const [BaseBlock, baseBlockProps] = getOverrides(
    // $FlowFixMe
    overrides.Block,
    StyledBlock,
  );

  return (
    <BaseBlock
      $as={as}
      $color={color}
      $backgroundColor={backgroundColor}
      $font={font}
      $alignContent={alignContent}
      $alignItems={alignItems}
      $alignSelf={alignSelf}
      $flexDirection={flexDirection}
      $display={display}
      $flex={flex}
      $grid={grid}
      $gridArea={gridArea}
      $gridAutoColumns={gridAutoColumns}
      $gridAutoFlow={gridAutoFlow}
      $gridAutoRows={gridAutoRows}
      $gridColumn={gridColumn}
      $gridColumnEnd={gridColumnEnd}
      $gridColumnGap={gridColumnGap}
      $gridColumnStart={gridColumnStart}
      $gridGap={gridGap}
      $gridRow={gridRow}
      $gridRowEnd={gridRowEnd}
      $gridRowGap={gridRowGap}
      $gridRowStart={gridRowStart}
      $gridTemplate={gridTemplate}
      $gridTemplateAreas={gridTemplateAreas}
      $gridTemplateColumns={gridTemplateColumns}
      $gridTemplateRows={gridTemplateRows}
      $justifyContent={justifyContent}
      $justifyItems={justifyItems}
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
      $placeContent={placeContent}
      $placeItems={placeItems}
      $placeSelf={placeSelf}
      $flexWrap={flexWrap}
      $left={left}
      $top={top}
      $right={right}
      $bottom={bottom}
      data-baseweb="block"
      {...restProps}
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
