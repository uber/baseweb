/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Breakpoints, Theme } from '../styles';
import type { Responsive } from '../layout-grid';
import type { MediaQueryPageMargins, PageMargins } from './types';

/**
 * Helper function that generates media queries based on breakpoint, e.g.
 * getMediaQuery(720) => '@media screen and (min-width: 720px)'
 */
export const getMediaQuery = (breakpoint: number): string =>
  `@media screen and (min-width: ${breakpoint}px)`;

export const getMediaQueries = (breakpoints: Breakpoints): string[] =>
  Object.keys(breakpoints)
    // @ts-ignore
    .map((key) => breakpoints[key])
    .sort((a, b) => a - b)
    .map(getMediaQuery);

export const getMinimumPageMargins = (margins: Responsive<number>): PageMargins => {
  const margin = Array.isArray(margins) ? margins[0] : margins;
  return {
    paddingInlineStart: `${margin}px`,
    paddingInlineEnd: `${margin}px`,
  };
};

export const getMediaQueryPageMargins = (theme: Theme): MediaQueryPageMargins => {
  const result = {} as MediaQueryPageMargins;
  const mediaQueries = getMediaQueries(theme.breakpoints);
  for (const [index, query] of mediaQueries.entries()) {
    // There is no guarantee grid.margins will have enough margins to satisfy
    // each breakpoint.
    const margin = Array.isArray(theme.grid.margins)
      ? theme.grid.margins[index] ?? theme.grid.margins.at(-1)
      : theme.grid.margins;

    result[query] = { paddingInlineStart: `${margin}px`, paddingInlineEnd: `${margin}px` };
  }
  return result;
};
