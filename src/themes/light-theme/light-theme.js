/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colors from './color-tokens.js';
import getColorComponentTokens from './color-component-tokens.js';
import getDeprecatedSemanticColors from './color-deprecated-semantic-tokens.js';
import typography from '../shared/typography.js';
import breakpoints from '../shared/breakpoints.js';
import mediaQuery from '../shared/media-query.js';
import sizing from '../shared/sizing.js';
import lighting from '../shared/lighting.js';
import borders from '../shared/borders.js';
import animation from '../shared/animation.js';

import type {ThemeT} from '../../styles/types.js';

export const LightTheme: ThemeT = {
  name: 'light-theme',
  colors: {
    ...colors,
    ...getColorComponentTokens(),
    ...getDeprecatedSemanticColors(),
  },
  typography: typography(),
  breakpoints,
  mediaQuery,
  sizing,
  lighting,
  borders,
  animation,
  direction: 'auto',
  // TODO(#2318) Remove it in the next major version.
  // Do not use.
  zIndex: {
    modal: 2000,
  },
};
