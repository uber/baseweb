/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import { styled } from '../styles/index.js';
import { getMediaQueries } from '../helpers/responsive-helpers.js';
import { BEHAVIOR } from './constants.js';
import type {
  ResponsiveT,
  StyledGridPropsT,
  StyledGridWrapperPropsT,
  StyledCellPropsT,
} from './types.js';

export const StyledGridWrapper = styled<StyledGridWrapperPropsT>(
  'div',
  ({
    $theme,
    $behavior = BEHAVIOR.fixed,
    $gridMargins = $theme.grid.margins,
    $gridMaxWidth = $theme.grid.maxWidth,
    $gridUnit = $theme.grid.unit,
  }) => ({
    margin: 'auto',
    maxWidth:
      $behavior === BEHAVIOR.fixed
        ? `${$gridMaxWidth + 2 * getResponsiveNumber($gridMargins, Infinity) - 1}${$gridUnit}`
        : null,
  })
);

export const StyledGrid = styled<StyledGridPropsT>(
  'div',
  ({
    $theme,
    $align = null,
    $behavior = BEHAVIOR.fixed,
    $gridGutters = $theme.grid.gutters,
    $gridMargins = $theme.grid.margins,
    $gridMaxWidth = $theme.grid.maxWidth,
    $gridUnit = $theme.grid.unit,
  }) => {
    const mediaQueries = getMediaQueries($theme.breakpoints);
    const gridStyles = mediaQueries.reduce(
      (acc, cur, idx) => {
        return {
          ...acc,
          [cur]: {
            paddingLeft: `${getResponsiveNumber($gridMargins, idx)}${$gridUnit}`,
            paddingRight: `${getResponsiveNumber($gridMargins, idx)}${$gridUnit}`,
            marginLeft: `-${getResponsiveNumber($gridGutters, idx) / 2}${$gridUnit}`,
            marginRight: `-${getResponsiveNumber($gridGutters, idx) / 2}${$gridUnit}`,
            alignItems: getResponsiveValue($align, idx),
          },
        };
      },
      {
        paddingLeft: `${getResponsiveNumber($gridMargins, 0)}${$gridUnit}`,
        paddingRight: `${getResponsiveNumber($gridMargins, 0)}${$gridUnit}`,
        marginLeft: `-${getResponsiveNumber($gridGutters, 0) / 2}${$gridUnit}`,
        marginRight: `-${getResponsiveNumber($gridGutters, 0) / 2}${$gridUnit}`,
        alignItems: getResponsiveValue($align, 0),
      }
    );
    return {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth:
        $behavior === BEHAVIOR.fixed
          ? `${$gridMaxWidth + 2 * getResponsiveNumber($gridMargins, Infinity) - 1}${$gridUnit}`
          : null,
      ...gridStyles,
    };
  }
);

export const StyledCell = styled<StyledCellPropsT>(
  'div',
  ({
    $theme,
    $align = null,
    $order = null,
    $gridColumns = $theme.grid.columns,
    $gridGaps = $theme.grid.gaps,
    $gridGutters = $theme.grid.gutters,
    $gridUnit = $theme.grid.unit,
    $skip = [0, 0, 0],
    $span = [1, 1, 1],
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
            width: `calc(${
              (100 / getResponsiveNumber($gridColumns, idx)) *
              Math.min(getResponsiveNumber($span, idx), getResponsiveNumber($gridColumns, idx))
            }% - ${getResponsiveNumber($gridGutters, idx)}${$gridUnit})`,
            marginLeft: `calc(${
              (100 / getResponsiveNumber($gridColumns, idx)) *
              Math.min(getResponsiveNumber($skip, idx), getResponsiveNumber($gridColumns, idx) - 1)
            }% + ${getResponsiveNumber($gridGutters, idx) / 2}${$gridUnit})`,
            marginRight: `${getResponsiveNumber($gridGutters, idx) / 2}${$gridUnit}`,
            marginBottom: `${getResponsiveNumber($gridGaps, idx)}${$gridUnit}`,
            alignSelf: getResponsiveValue($align, idx),
            order: getResponsiveNumber($order, idx),
          },
        };
      },
      {
        width: '100%',
        marginLeft: `${getResponsiveNumber($gridGutters, 0) / 2}${$gridUnit}`,
        marginRight: `${getResponsiveNumber($gridGutters, 0) / 2}${$gridUnit}`,
        marginBottom: `${getResponsiveNumber($gridGaps, 0)}${$gridUnit}`,
        alignSelf: getResponsiveValue($align, 0),
        order: getResponsiveNumber($order, 0),
      }
    );
    return {
      boxSizing: 'border-box',
      ...cellStyles,
    };
  }
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
