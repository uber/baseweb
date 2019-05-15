/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
}: {
  $theme: ThemeT,
  flexGridColumnCount: number,
  flexGridColumnGap: ScaleT,
  flexGridRowGap: ScaleT,
}): StyleOverrideT => {
  // 0px needed for calc() to behave properly
  flexGridColumnGap =
    $theme.sizing[flexGridColumnGap] || flexGridColumnGap || '0px';
  flexGridRowGap = $theme.sizing[flexGridRowGap] || flexGridRowGap || '0px';
  const widthCalc = `(100% - (${flexGridColumnCount} - 1) * ${flexGridColumnGap}) / ${flexGridColumnCount}`;
  return {
    width: `calc(${widthCalc})`,
    ...[...Array(flexGridColumnCount).keys()].reduce(
      (acc, i) => ({
        // Iterate over each column i for 0 <= i < flexGridColumnCount
        ...acc,
        [`:nth-child(${flexGridColumnCount}n-${i})`]: {
          // Add flexGridColumnGap except at end of row
          marginRight: i && flexGridColumnGap,
          // Add flexGridRowGap below in general
          marginBottom: flexGridRowGap,
        },
        [`:nth-child(${flexGridColumnCount}n-${i}):last-child`]: {
          // Add space to make up for missing columns if row ends early
          marginRight: `calc(${i} * (${flexGridColumnGap} + ${widthCalc}))`,
        },
        ...[...Array(i + 1).keys()].reduce(
          (acc, j) => ({
            // Iterate over each column j for 0 <= j <= i
            ...acc,
            [`:nth-child(${flexGridColumnCount}n-${i}):nth-last-child(${j +
              1})`]: {
              // Remove flexGridRowGap below for last row items
              marginBottom: 0,
            },
          }),
          {},
        ),
      }),
      {},
    ),
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
  $theme,
}: {
  $flexGridColumnCount?: ResponsiveT<number>,
  $flexGridColumnGap?: ResponsiveT<ScaleT>,
  $flexGridRowGap?: ResponsiveT<ScaleT>,
  $theme: ThemeT,
}): StyleOverrideT => {
  const baseFlexGridItemStyle = {flexGrow: 1};
  const mediaQueries = getMediaQueries($theme.breakpoints);

  // Get the length of the longest responsive array
  const maxResponsiveLength = Math.max(
    ...[$flexGridColumnCount, $flexGridColumnGap, $flexGridRowGap].map(
      r => (Array.isArray(r) ? r.length : 0),
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
    let mediaQuery;
    if (i === 0) {
      // Custom max-width media query for mobile needed so :nth-child styles
      // don't conflict
      mediaQuery = getMediaQuery({
        'max-width': `${$theme.breakpoints.small - 1}px`,
      });
    } else {
      mediaQuery = mediaQueries[i - 1];
    }
    if (mediaQuery) {
      acc[mediaQuery] = flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: flexGridColumnCountValue || 1,
        flexGridColumnGap: flexGridColumnGapValue || 0,
        flexGridRowGap: flexGridRowGapValue || 0,
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
      data-baseweb="flex-grid-item"
      {...restProps}
    >
      {children}
    </Block>
  );
};

export default FlexGridItem;
