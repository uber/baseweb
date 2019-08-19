/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {BreakpointsT} from '../styles/types.js';

/**
 * Helper function that generates media queries based on given parameters
 *
 * E.g.
 * getMediaQuery({'max-width': '1280px', 'min-height': '720px'}, 'and') =>
 *   '@media screen and (max-width: 1280px) and (min-height: 720px)'
 */
export const getMediaQuery = (
  options: {[string]: string},
  booleanOperator: 'AND' | 'OR' = 'OR',
): string => {
  const mediaFeatureSeparator = booleanOperator === 'OR' ? ', ' : ' and ';

  const mediaFeatures = Object.keys(options).map(
    key => `(${key}: ${options[key]})`,
  );

  return `@media screen and ${mediaFeatures.join(mediaFeatureSeparator)}`;
};

export const getMediaQueries = (breakpoints: BreakpointsT): string[] =>
  Object.keys(breakpoints)
    .map(key => breakpoints[key])
    .sort((a, b) => a - b)
    .map(size => getMediaQuery({'min-width': `${size}px`}));
