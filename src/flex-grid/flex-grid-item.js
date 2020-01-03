/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../block/index.js';
import {mergeOverrides} from '../helpers/overrides.js';
import {getMediaQueries, getMediaQuery} from '../helpers/responsive-helpers.js';
import type {FlexGridItemPropsT} from './types.js';
import type {ResponsiveT, ScaleT} from '../block/index.js';
import type {StyleOverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/index.js';

export const flexGridItemMediaQueryStyle = ({
  $theme,
  flexGridColumnCount: colCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex: itemIndex,
  flexGridItemCount: itemCount,
}: {
  $theme: ThemeT,
  flexGridColumnCount: number,
  flexGridColumnGap: ScaleT,
  flexGridRowGap: ScaleT,
  flexGridItemIndex: number,
  flexGridItemCount: number,
}): StyleOverrideT => {
  // 0px needed for calc() to behave properly
  const colGap = $theme.sizing[flexGridColumnGap] || flexGridColumnGap || '0px';
  const colGapQuantity = parseFloat(colGap);
  const colGapUnit = colGap.match(/[a-zA-Z]+/)[0];
  const rowGap = $theme.sizing[flexGridRowGap] || flexGridRowGap || '0px';
  const rowGapQuantity = parseFloat(rowGap);
  const widthCalc = `(100% - ${(colCount - 1) *
    colGapQuantity}${colGapUnit}) / ${colCount}`;
  const marginDirection =
    $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
  return {
    // Subtract .5px to avoid rounding issues on IE/Edge
    // See https://github.com/uber/baseweb/pull/1748
    width: `calc(${widthCalc} - .5px)`,
    // Add colGap except at end of row
    [marginDirection]:
      colGapQuantity && ((itemIndex + 1) % colCount !== 0 ? colGap : 0),
    // Add rowGap except at end of column
    marginBottom:
      rowGapQuantity &&
      (~~(itemIndex / colCount) !== ~~((itemCount - 1) / colCount)
        ? rowGap
        : 0),
    // Add space to make up for missing columns if last row ends early
    ...(itemIndex === itemCount - 1 && (itemIndex + 1) % colCount !== 0
      ? {
          [marginDirection]: `calc(${colCount -
            (itemIndex % colCount) -
            1} * (${colGap} + ${widthCalc}))`,
        }
      : {}),
  };
};

export const getResponsiveValue = <T>(
  responsive?: ResponsiveT<T>,
  i: number,
): ?T => {
  if (!responsive) {
    return null;
  }
  if (!Array.isArray(responsive)) {
    return responsive;
  }
  return responsive[i] || responsive[responsive.length - 1];
};

export const flexGridItemStyle = ({
  $flexGridColumnCount,
  $flexGridColumnGap,
  $flexGridRowGap,
  $flexGridItemIndex,
  $flexGridItemCount,
  $theme,
}: {
  $flexGridColumnCount?: ResponsiveT<number>,
  $flexGridColumnGap?: ResponsiveT<ScaleT>,
  $flexGridRowGap?: ResponsiveT<ScaleT>,
  $flexGridItemIndex?: number,
  $flexGridItemCount?: number,
  $theme: ThemeT,
}): StyleOverrideT => {
  const baseFlexGridItemStyle = {flexGrow: 1};
  const mediaQueries = getMediaQueries($theme.breakpoints);

  // Get the length of the longest responsive array
  const maxResponsiveLength = Math.max(
    ...[$flexGridColumnCount, $flexGridColumnGap, $flexGridRowGap].map(r =>
      Array.isArray(r) ? r.length : 0,
    ),
  );

  // No media queries for non-responsive FlexGrids
  if (maxResponsiveLength < 2) {
    return {
      ...baseFlexGridItemStyle,
      ...flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: getResponsiveValue($flexGridColumnCount, 0) || 1,
        flexGridColumnGap: getResponsiveValue($flexGridColumnGap, 0) || 0,
        flexGridRowGap: getResponsiveValue($flexGridRowGap, 0) || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1,
      }),
    };
  }

  // Generate style by iterating up to maxResponsiveLength for each responsive
  // breakpoint. Will end up with styles for one of the following media queries
  // depending on maxResponsiveLength:
  // - {mobile, small}
  // - {mobile, small, medium}
  // - {mobile, small, medium, large}
  return [...Array(maxResponsiveLength).keys()].reduce((acc, i) => {
    const [
      flexGridColumnCountValue,
      flexGridColumnGapValue,
      flexGridRowGapValue,
    ] = [$flexGridColumnCount, $flexGridColumnGap, $flexGridRowGap].map(r =>
      getResponsiveValue(r, i),
    );
    const mediaQuery =
      i === 0
        ? // Custom media query needed so :nth-child styles don't conflict
          getMediaQuery(0)
        : mediaQueries[i - 1];
    if (mediaQuery) {
      acc[mediaQuery] = flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: flexGridColumnCountValue || 1,
        flexGridColumnGap: flexGridColumnGapValue || 0,
        flexGridRowGap: flexGridRowGapValue || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1,
      });
    }
    return acc;
  }, baseFlexGridItemStyle);
};

const FlexGridItem = ({
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex,
  flexGridItemCount,
  ...restProps
}: FlexGridItemPropsT): React.Node => {
  const flexGridItemOverrides = {
    Block: {
      style: flexGridItemStyle,
    },
  };
  const blockOverrides = overrides
    ? mergeOverrides(flexGridItemOverrides, overrides)
    : flexGridItemOverrides;
  return (
    <Block
      as={as}
      overrides={blockOverrides}
      $flexGridColumnCount={flexGridColumnCount}
      $flexGridColumnGap={flexGridColumnGap}
      $flexGridRowGap={flexGridRowGap}
      $flexGridItemIndex={flexGridItemIndex}
      $flexGridItemCount={flexGridItemCount}
      data-baseweb="flex-grid-item"
      {...restProps}
    >
      {children}
    </Block>
  );
};

export default FlexGridItem;
