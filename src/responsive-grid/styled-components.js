/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {styled} from '../styles/index.js';
import {getMediaQueries} from '../helpers/responsive-helpers.js';

const SIZING = {
  fluid: 'fluid',
  fixed: 'fixed',
};

// defaults
const GRID_COLUMNS = [4, 8, 12];
const GRID_MARGINS = [16, 36, 64];
const GRID_GUTTERS = [16, 36, 36];
const GRID_MAX_WIDTH = 1280;
const GRID_ROW_GAPS = 16;

export function Grid({
  children,
  sizing,
  gridColumns,
  gridMargins,
  gridGutters,
  gridRowGaps,
  gridMaxWidth,
  ...props
}) {
  return (
    <StyledGrid
      $sizing={sizing}
      $gridMargins={gridMargins}
      $gridGutters={gridGutters}
      $gridMaxWidth={gridMaxWidth}
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          $gridColumns: gridColumns,
          $gridGutters: gridGutters,
          $gridRowGaps: gridRowGaps,
        }),
      )}
    </StyledGrid>
  );
}

export const StyledGrid = styled(
  'div',
  ({
    $theme,
    $sizing = SIZING.fixed,
    $gridMargins = GRID_MARGINS,
    $gridGutters = GRID_GUTTERS,
    $gridMaxWidth = GRID_MAX_WIDTH,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const paddingStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        return {
          ...acc,
          [cur]: {
            paddingLeft: `${getResponsiveValue($gridMargins, idx) -
              getResponsiveValue($gridGutters, idx) / 2}px`,
            paddingRight: `${getResponsiveValue($gridMargins, idx) -
              getResponsiveValue($gridGutters, idx) / 2}px`,
          },
        };
      },
      {
        paddingLeft: `${getResponsiveValue($gridMargins, 0) -
          getResponsiveValue($gridGutters, 0) / 2}px`,
        paddingRight: `${getResponsiveValue($gridMargins, 0) -
          getResponsiveValue($gridGutters, 0) / 2}px`,
      },
    );
    return {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth:
        $sizing === SIZING.fixed
          ? `${$gridMaxWidth +
              2 * getResponsiveValue($gridMargins, Infinity)}px`
          : null,
      ...paddingStyles,
    };
  },
);

export const StyledCell = styled(
  'div',
  ({
    $theme,
    $skip = [0, 0, 0],
    $span = [1, 1, 1],
    $gridColumns = GRID_COLUMNS,
    $gridGutters = GRID_GUTTERS,
    $gridRowGaps = GRID_ROW_GAPS,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const cellStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        return {
          ...acc,
          [cur]: {
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
            marginBottom: getResponsiveValue($gridRowGaps, idx) + 'px',
            paddingLeft: getResponsiveValue($gridGutters, idx) / 2 + 'px',
            paddingRight: getResponsiveValue($gridGutters, idx) / 2 + 'px',
          },
        };
      },
      {
        width: '100%',
        marginBottom: getResponsiveValue($gridRowGaps, 0) + 'px',
        paddingLeft: getResponsiveValue($gridGutters, 0) / 2 + 'px',
        paddingRight: getResponsiveValue($gridGutters, 0) / 2 + 'px',
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
  return responsive[i] || responsive[responsive.length - 1];
};
