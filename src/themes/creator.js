/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import deepMerge from '../utils/deep-merge.js';
import lightColorTokens from './light-theme/color-tokens.js';
import getLightSemanticColorTokens from './light-theme/color-semantic-tokens.js';
import getLightComponentColorTokens from './light-theme/color-component-tokens.js';
import getLightDeprecatedSemanticColorTokens from './light-theme/color-deprecated-semantic-tokens.js';
import darkColorTokens from './dark-theme/color-tokens.js';
import getDarkSemanticColorTokens from './dark-theme/color-semantic-tokens.js';
import getDarkComponentColorTokens from './dark-theme/color-component-tokens.js';
import getDarkDeprecatedSemanticColorTokens from './dark-theme/color-deprecated-semantic-tokens.js';
import darkBorders from './dark-theme/borders.js';
import lighting from './shared/lighting.js';
import borders from './shared/borders.js';
import getTypography from './shared/typography.js';
import animation from './shared/animation.js';
import breakpoints from './shared/breakpoints.js';
import grid from './shared/grid.js';
import mediaQuery from './shared/media-query.js';
import sizing from './shared/sizing.js';

import type {ThemeT} from '../styles/types.js';
import type {PrimitivesT} from './types.js';

export default function createTheme(
  // Used to derive various theme properties.
  primitives: PrimitivesT,
  // Used to override default theme property values derived from primitives.
  overrides?: {},
  // Options for deriving the final theme object.
  options?: {isDark?: boolean} = {},
): ThemeT {
  const {primaryFontFamily, ...colorTokens} = primitives;
  const theme = {
    animation,
    borders: options.isDark ? darkBorders : borders,
    breakpoints,
    colors: getColors(colorTokens, options.isDark),
    direction: 'auto',
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography: getTypography(primaryFontFamily),
    // TODO(#2318) Remove in v10, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}

function getColors(colorTokens, isDark = false) {
  // The following vary depending on if the theme is light or dark.
  let defaultColorTokens;
  let getComponentColorTokens;
  let getDeprecatedSemanticColorTokens;
  let getSemanticColorTokens;

  if (isDark) {
    defaultColorTokens = darkColorTokens;
    getComponentColorTokens = getDarkComponentColorTokens;
    getDeprecatedSemanticColorTokens = getDarkDeprecatedSemanticColorTokens;
    getSemanticColorTokens = getDarkSemanticColorTokens;
  } else {
    defaultColorTokens = lightColorTokens;
    getComponentColorTokens = getLightComponentColorTokens;
    getDeprecatedSemanticColorTokens = getLightDeprecatedSemanticColorTokens;
    getSemanticColorTokens = getLightSemanticColorTokens;
  }

  return {
    ...defaultColorTokens,
    ...colorTokens,
    ...getComponentColorTokens(colorTokens),
    ...getDeprecatedSemanticColorTokens(colorTokens),
    ...getSemanticColorTokens(colorTokens),
  };
}
