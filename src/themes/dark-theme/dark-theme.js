/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colors from './color-tokens.js';
import getSemanticColors from './color-semantic-tokens.js';
import getColorComponentTokens from './color-component-tokens.js';
import getDeprecatedSemanticColors from './color-deprecated-semantic-tokens.js';
import getTypography from '../shared/typography.js';
import animation from '../shared/animation.js';
import breakpoints from '../shared/breakpoints.js';
import borders from '../shared/borders.js';
import grid from '../shared/grid.js';
import lighting from '../shared/lighting.js';
import mediaQuery from '../shared/media-query.js';
import sizing from '../shared/sizing.js';

import type {ThemeT} from '../../styles/types.js';

export const DarkTheme: ThemeT = {
  name: 'dark-theme',
  colors: {
    ...colors,
    ...getColorComponentTokens(),
    ...getDeprecatedSemanticColors(),
    ...getSemanticColors(),
  },
  animation,
  breakpoints,
  borders,
  direction: 'auto',
  grid,
  lighting,
  mediaQuery,
  sizing,
  typography: getTypography(),
  // TODO(#2318) Remove it in the next v10 major version.
  // Do not use.
  zIndex: {
    modal: 2000,
  },
};
