/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import deepMerge from '../utils/deep-merge.js';
import lightColorTokens from './light-theme/color-tokens.js';
import lightGetSemanticColors from './light-theme/color-semantic-tokens.js';
import lightGetColorComponentTokens from './light-theme/color-component-tokens.js';
import lightGetDeprecatedSemanticColors from './light-theme/color-deprecated-semantic-tokens.js';
import darkColorTokens from './dark-theme/color-tokens.js';
import darkGetSemanticColors from './dark-theme/color-semantic-tokens.js';
import darkGetColorComponentTokens from './dark-theme/color-component-tokens.js';
import darkGetDeprecatedSemanticColors from './dark-theme/color-deprecated-semantic-tokens.js';
import darkBorders from './dark-theme/borders.js';
import lighting from './shared/lighting.js';
import sharedBorders from './shared/borders.js';
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
  // Used to override default values and theme properties derived from primitives.
  overrides?: {},
  // Options for generating the final theme object.
  options?: {isDark?: boolean} = {},
): ThemeT {
  const {primaryFontFamily, ...primitiveColorTokens} = primitives;
  const {colors, borders} = deriveColorsAndBorders(
    primitiveColorTokens,
    options.isDark,
  );
  const theme = {
    colors,
    animation,
    breakpoints,
    borders,
    direction: 'auto',
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography: primaryFontFamily
      ? // have to check if primaryFontFamily override is passed in
        // and use it to build the typography theme value
        // otherwise the default primaryFontFamily value is used
        getTypography({primaryFontFamily})
      : getTypography(),
    // TODO(#2318) Remove in v10, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}

function deriveColorsAndBorders(primitiveColorTokens, isDark = false) {
  // The following vary depending on if the theme is light or dark.
  let defaultColorTokens;
  let getColorComponentTokens;
  let getDeprecatedSemanticColors;
  let getSemanticColors;
  let borders;

  if (isDark) {
    defaultColorTokens = darkColorTokens;
    getColorComponentTokens = darkGetColorComponentTokens;
    getDeprecatedSemanticColors = darkGetDeprecatedSemanticColors;
    getSemanticColors = darkGetSemanticColors;
    borders = darkBorders;
  } else {
    defaultColorTokens = lightColorTokens;
    getColorComponentTokens = lightGetColorComponentTokens;
    getDeprecatedSemanticColors = lightGetDeprecatedSemanticColors;
    getSemanticColors = lightGetSemanticColors;
    borders = sharedBorders;
  }

  // Override default color tokens with passed in primitive color tokens.
  const colorTokens = {...defaultColorTokens, ...primitiveColorTokens};

  return {
    colors: {
      ...colorTokens,
      ...getColorComponentTokens(colorTokens),
      ...getDeprecatedSemanticColors(colorTokens),
      ...getSemanticColors(colorTokens),
    },
    borders,
  };
}
