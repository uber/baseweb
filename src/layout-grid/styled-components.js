/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import {getMediaQueries} from '../helpers/responsive-helpers.js';
import {BEHAVIOR} from './constants.js';
import type {ResponsiveT, StyledGridPropsT, StyledCellPropsT} from './types.js';

const DEFAULT_GRID_COLUMNS = [4, 8, 12];
const DEFAULT_GRID_GUTTERS = [16, 36, 36];
const DEFAULT_GRID_MARGINS = [16, 36, 64];
const DEFAULT_GRID_MAX_WIDTH = 1280;

export const StyledGrid = styled<StyledGridPropsT>(
  'div',
  ({
    $align = null,
    $behavior = BEHAVIOR.fixed,
    $gridGutters = DEFAULT_GRID_GUTTERS,
    $gridMargins = DEFAULT_GRID_MARGINS,
    $gridMaxWidth = DEFAULT_GRID_MAX_WIDTH,
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

export const StyledCell = styled<StyledCellPropsT>(
  'div',
  ({
    $align = null,
    $gridColumns = DEFAULT_GRID_COLUMNS,
    $gridGaps = 0,
    $gridGutters = DEFAULT_GRID_GUTTERS,
    $order = null,
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
        order: getResponsiveNumber($order, 0),
      },
    );
    return {
      boxSizing: 'border-box',
      ...cellStyles,
    };
  },
);

function getResponsiveNumber<T>(responsive: ResponsiveT<T>, i: number): number {
  const res = getResponsiveValue(responsive, i);
  return typeof res === 'number' ? res : 0;
}

function getResponsiveValue<T>(responsive: ResponsiveT<T>, i: number): ?T {
  if (!responsive) {
    return null;
  }
  if (!Array.isArray(responsive)) {
    return responsive;
  }
  if (typeof responsive[i] === 'undefined') {
    return responsive[responsive.length - 1];
  }
  return responsive[i];
}
