/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import animation from '../shared/animation';
import borders from './borders';
import breakpoints from '../shared/breakpoints';
import deepMerge from '../../utils/deep-merge';
import defaultFoundationColorTokens from './color-tokens';
import { colors as primitiveColorTokens } from '../../tokens';
import getComponentColorTokens from './color-component-tokens';
import getSemanticColorTokens from './color-semantic-tokens';
import typography from '../shared/typography';
import grid from '../shared/grid';
import lighting from '../shared/lighting';
import mediaQuery from '../shared/media-query';
import sizing from '../shared/sizing';

import type { Primitives, FoundationColorTokens } from '../types';
import type { Theme } from '../../styles/types';

export default function createDarkTheme(
  // Used to derive typography and color theme properties
  primitives: Partial<Primitives> = {},
  // Used to override default theme property values derived from primitives
  overrides?: {}
): Theme {
  // Extract font tokens and color tokens from primitives
  const { primaryFontFamily, ...customFoundationColorTokens } = primitives;
  // Assemble color tokens by overriding defaults with custom color tokens
  const foundationColorTokens: FoundationColorTokens = {
    ...defaultFoundationColorTokens,
    ...customFoundationColorTokens,
  };
  const theme = {
    animation,
    borders,
    breakpoints,
    colors: {
      ...primitiveColorTokens,
      ...foundationColorTokens,
      ...getComponentColorTokens(foundationColorTokens),
      ...getSemanticColorTokens(foundationColorTokens),
    },
    direction: 'auto',
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography,
    // TODO(#2318) Remove in v11, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}
