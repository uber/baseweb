/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import animation from './shared/animation.js';
import borders from './shared/borders.js';
import breakpoints from './shared/breakpoints.js';
import darkBorders from './dark-theme/borders.js';
import deepMerge from '../utils/deep-merge.js';
import getColors from './shared/colors.js';
import getTypography from './shared/typography.js';
import grid from './shared/grid.js';
import lighting from './shared/lighting.js';
import mediaQuery from './shared/media-query.js';
import sizing from './shared/sizing.js';

import type {PrimitivesT} from './types.js';
import type {ThemeT} from '../styles/types.js';

export default function createTheme(
  // Used to derive various theme properties.
  primitives?: $Shape<PrimitivesT> = {},
  // Used to override default theme property values derived from primitives.
  overrides?: {},
  // Options for deriving the final theme object.
  options?: {isDark?: boolean} = {},
): ThemeT {
  // Extract font family from primitives.
  const {primaryFontFamily, ...customColorTokens} = primitives;
  const {isDark = false} = options;
  const theme = {
    animation,
    borders: isDark ? darkBorders : borders,
    breakpoints,
    colors: getColors(customColorTokens, isDark),
    direction: 'auto',
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography: primaryFontFamily
      ? getTypography({primaryFontFamily})
      : getTypography(),
    // TODO(#2318) Remove in v10, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}
