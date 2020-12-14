/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {BreakpointsT} from '../styles/types.js';

/**
 * Helper function that generates media queries based on breakpoint, e.g.
 * getMediaQuery(720) => '@media screen and (min-width: 720px)'
 */
export const getMediaQuery = (breakpoint: number): string =>
  `@media screen and (min-width: ${breakpoint}px)`;

export const getMediaQueries = (breakpoints: BreakpointsT): string[] =>
  Object.keys(breakpoints)
    .map(key => breakpoints[key])
    .sort((a, b) => a - b)
    .map(getMediaQuery);
