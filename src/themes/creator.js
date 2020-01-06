/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import deepMerge from '../utils/deep-merge.js';
import colorTokens from './light-theme/color-tokens.js';
import getSemanticColors from './light-theme/color-semantic-tokens.js';
import getColorComponentTokens from './light-theme/color-component-tokens.js';
import getDeprecatedSemanticColors from './light-theme/color-deprecated-semantic-tokens.js';
import getTypography from './shared/typography.js';
import animation from './shared/animation.js';
import breakpoints from './shared/breakpoints.js';
import borders from './shared/borders.js';
import grid from './shared/grid.js';
import lighting from './shared/lighting.js';
import mediaQuery from './shared/media-query.js';
import sizing from './shared/sizing.js';

import type {ThemeT} from '../styles/types.js';
import type {PrimitivesT} from './types.js';

export default function createTheme(
  // overrides for colorTokens + primatyFontFamily
  themeBuildingPrimitives: PrimitivesT,
  overrides?: {},
): ThemeT {
  // extract font-family from the themeBuildingPrimitives
  const {primaryFontFamily, ...colors} = themeBuildingPrimitives;
  // color keys in the themeBuildingPrimitives are the same as
  // the colorTokens so we just extend it with overrides
  // passed as an argument
  const colorTokensWithOverrides = {...colorTokens, ...colors};
  const theme = {
    colors: {
      ...colorTokensWithOverrides,
      // get component color tokens based on the colors with overrides
      ...getColorComponentTokens(colorTokensWithOverrides),
      // get deprecated semantic color tokens based on the colors with overrides
      ...getDeprecatedSemanticColors(colorTokensWithOverrides),
      ...getSemanticColors(colorTokensWithOverrides),
    },
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
