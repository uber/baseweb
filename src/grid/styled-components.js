/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {styled} from '../styles/index.js';
import {getMediaQueries} from '../helpers/responsive-helpers.js';
import {BEHAVIOR} from './constants.js';

import type {
  SoftResponsiveT,
  GridPropsT,
  CellPropsT,
  StyledGridPropsT,
  StyledCellPropsT,
} from './types.js';

// defaults
const GRID_COLUMNS = [4, 8, 12];
const GRID_GUTTERS = [16, 36, 36];
const GRID_MARGINS = [16, 36, 64];
const GRID_MAX_WIDTH = 1280;

export function Grid({
  align,
  behavior,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridMargins,
  gridMaxWidth,
}: GridPropsT) {
  return (
    <StyledGrid
      $behavior={behavior}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
      $align={align}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          $gridColumns: gridColumns,
          $gridGutters: gridGutters,
          $gridGaps: gridGaps,
        }),
      )}
    </StyledGrid>
  );
}

export const StyledGrid = styled<StyledGridPropsT>(
  'div',
  ({
    $align,
    $behavior = BEHAVIOR.fixed,
    $gridGutters = GRID_GUTTERS,
    $gridMargins = GRID_MARGINS,
    $gridMaxWidth = GRID_MAX_WIDTH,
    $theme,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const gridStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        return {
          ...acc,
          [cur]: {
            paddingLeft: `${getResponsiveNumber($gridMargins, idx) -
              getResponsiveNumber($gridGutters, idx) / 2 -
              0.5}px`,
            paddingRight: `${getResponsiveNumber($gridMargins, idx) -
              getResponsiveNumber($gridGutters, idx) / 2 -
              0.5}px`,
            alignItems: getResponsiveValue($align, idx),
          },
        };
      },
      {
        paddingLeft: `${getResponsiveNumber($gridMargins, 0) -
          getResponsiveNumber($gridGutters, 0) / 2 -
          0.5}px`,
        paddingRight: `${getResponsiveNumber($gridMargins, 0) -
          getResponsiveNumber($gridGutters, 0) / 2 -
          0.5}px`,
        alignItems: getResponsiveValue($align, 0),
      },
    );
    return {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth:
        $behavior === BEHAVIOR.fixed
          ? `${$gridMaxWidth +
              2 * getResponsiveNumber($gridMargins, Infinity) -
              1}px`
          : null,
      ...gridStyles,
    };
  },
);

export function Cell({
  align,
  children,
  order,
  skip,
  span,
  $gridColumns,
  $gridGutters,
  $gridGaps,
}: CellPropsT) {
  return (
    <StyledCell
      $align={align}
      $order={order}
      $skip={skip}
      $span={span}
      $gridColumns={$gridColumns}
      $gridGutters={$gridGutters}
      $gridGaps={$gridGaps}
    >
      {children}
    </StyledCell>
  );
}

export const StyledCell = styled<StyledCellPropsT>(
  'div',
  ({
    $align,
    $gridColumns = GRID_COLUMNS,
    $gridGaps = 0,
    $gridGutters = GRID_GUTTERS,
    $order,
    $skip = [0, 0, 0],
    $span = [1, 1, 1],
    $theme,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const cellStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        if (getResponsiveNumber($span, idx) === 0) {
          return {
            ...acc,
            [cur]: {
              width: '0',
              paddingLeft: '0',
              paddingRight: '0',
              marginLeft: '0',
              marginRight: '0',
              display: 'none',
            },
          };
        }
        return {
          ...acc,
          [cur]: {
            display: 'block',
            width: `${(100 / getResponsiveNumber($gridColumns, idx)) *
              Math.min(
                getResponsiveNumber($span, idx),
                getResponsiveNumber($gridColumns, idx),
              )}%`,
            marginLeft: `${(100 / getResponsiveNumber($gridColumns, idx)) *
              Math.min(
                getResponsiveNumber($skip, idx),
                getResponsiveNumber($gridColumns, idx) - 1,
              )}%`,
            paddingLeft: getResponsiveNumber($gridGutters, idx) / 2 + 'px',
            paddingRight: getResponsiveNumber($gridGutters, idx) / 2 + 'px',
            marginBottom: getResponsiveNumber($gridGaps, idx) + 'px',
            alignSelf: getResponsiveValue($align, idx),
            order: getResponsiveNumber($order, idx),
          },
        };
      },
      {
        width: '100%',
        paddingLeft: getResponsiveNumber($gridGutters, 0) / 2 + 'px',
        paddingRight: getResponsiveNumber($gridGutters, 0) / 2 + 'px',
        marginBottom: getResponsiveNumber($gridGaps, 0) + 'px',
        alignSelf: getResponsiveValue($align, 0),
        order: getResponsiveValue($order, 0),
      },
    );
    return {
      boxSizing: 'border-box',
      ...cellStyles,
    };
  },
);

function getResponsiveNumber<T>(
  responsive: SoftResponsiveT<T>,
  i: number,
): number {
  const res = getResponsiveValue(responsive, i);
  return typeof res === 'number' ? res : 0;
}

function getResponsiveValue<T>(responsive: SoftResponsiveT<T>, i: number): ?T {
  if (!responsive) {
    return null;
  }
  if (!Array.isArray(responsive)) {
    return responsive;
  }
  if (responsive[i] === null || typeof responsive[i] === 'number') {
    return responsive[i];
  }
  return responsive[i] || responsive[responsive.length - 1];
}
