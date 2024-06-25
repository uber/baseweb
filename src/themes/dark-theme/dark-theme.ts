/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import foundationColors from './color-foundation-tokens';
import primitiveColors from '../../tokens/color-primitive-tokens';
import getSemanticColors from './color-semantic-tokens';
import getComponentColors from './color-component-tokens';
import borders from './borders';
import lighting from '../shared/lighting';
import typography from '../shared/typography';
import animation from '../shared/animation';
import breakpoints from '../shared/breakpoints';
import grid from '../shared/grid';
import mediaQuery from '../shared/media-query';
import sizing from '../shared/sizing';

import type { Theme } from '../../styles/types';

export const DarkTheme: Theme = {
  name: 'dark-theme',
  colors: {
    ...foundationColors,
    ...primitiveColors,
    ...getComponentColors(),
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
  typography,
  // TODO(#2318) Remove it in the next v11 major version.
  // Do not use.
  zIndex: {
    modal: 2000,
  },
};
