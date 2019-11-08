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

// defaults
const GRID_COLUMNS = [4, 8, 12];
const GRID_MARGINS = [16, 36, 64];
const GRID_GUTTERS = [16, 36, 36];
const GRID_MAX_WIDTH = 1280;

export function Grid({
  align,
  children,
  behavior,
  gridColumns,
  gridMargins,
  gridGutters,
  gridGaps,
  gridMaxWidth,
}) {
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

export const StyledGrid = styled(
  'div',
  ({
    $align,
    $behavior = BEHAVIOR.fixed,
    $theme,
    $gridMargins = GRID_MARGINS,
    $gridGutters = GRID_GUTTERS,
    $gridMaxWidth = GRID_MAX_WIDTH,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const gridStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        return {
          ...acc,
          [cur]: {
            paddingLeft: `${getResponsiveValue($gridMargins, idx) -
              getResponsiveValue($gridGutters, idx) / 2 -
              0.5}px`,
            paddingRight: `${getResponsiveValue($gridMargins, idx) -
              getResponsiveValue($gridGutters, idx) / 2 -
              0.5}px`,
            alignItems: getResponsiveValue($align, idx),
          },
        };
      },
      {
        paddingLeft: `${getResponsiveValue($gridMargins, 0) -
          getResponsiveValue($gridGutters, 0) / 2 -
          0.5}px`,
        paddingRight: `${getResponsiveValue($gridMargins, 0) -
          getResponsiveValue($gridGutters, 0) / 2 -
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
              2 * getResponsiveValue($gridMargins, Infinity) -
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
}) {
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

export const StyledCell = styled(
  'div',
  ({
    $align,
    $order,
    $skip = [0, 0, 0],
    $span = [1, 1, 1],
    $theme,
    // Grid passes these down
    $gridColumns = GRID_COLUMNS,
    $gridGutters = GRID_GUTTERS,
    $gridGaps = 0,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const cellStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        if (getResponsiveValue($span, idx) === 0) {
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
            width: `${(100 / getResponsiveValue($gridColumns, idx)) *
              Math.min(
                getResponsiveValue($span, idx),
                getResponsiveValue($gridColumns, idx),
              )}%`,
            marginLeft: `${(100 / getResponsiveValue($gridColumns, idx)) *
              Math.min(
                getResponsiveValue($skip, idx),
                getResponsiveValue($gridColumns, idx) - 1,
              )}%`,
            paddingLeft: getResponsiveValue($gridGutters, idx) / 2 + 'px',
            paddingRight: getResponsiveValue($gridGutters, idx) / 2 + 'px',
            marginBottom: getResponsiveValue($gridGaps, idx) + 'px',
            alignSelf: getResponsiveValue($align, idx),
            order: getResponsiveValue($order, idx),
          },
        };
      },
      {
        width: '100%',
        paddingLeft: getResponsiveValue($gridGutters, 0) / 2 + 'px',
        paddingRight: getResponsiveValue($gridGutters, 0) / 2 + 'px',
        marginBottom: getResponsiveValue($gridGaps, 0) + 'px',
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

export const getResponsiveValue = (responsive, i) => {
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
};
