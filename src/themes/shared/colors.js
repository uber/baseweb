/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import lightColorTokens from '../light-theme/color-tokens.js';
import getLightSemanticColorTokens from '../light-theme/color-semantic-tokens.js';
import getLightComponentColorTokens from '../light-theme/color-component-tokens.js';
import getLightDeprecatedSemanticColorTokens from '../light-theme/color-deprecated-semantic-tokens.js';
import darkColorTokens from '../dark-theme/color-tokens.js';
import getDarkSemanticColorTokens from '../dark-theme/color-semantic-tokens.js';
import getDarkComponentColorTokens from '../dark-theme/color-component-tokens.js';
import getDarkDeprecatedSemanticColorTokens from '../dark-theme/color-deprecated-semantic-tokens.js';

import type {PartialColorTokensT} from '../types.js';

export default function getColors(
  customColorTokens: PartialColorTokensT,
  isDark: boolean = false,
) {
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

  const colorTokens = {...defaultColorTokens, ...customColorTokens};

  return {
    ...colorTokens,
    ...getComponentColorTokens(colorTokens),
    ...getDeprecatedSemanticColorTokens(colorTokens),
    ...getSemanticColorTokens(colorTokens),
  };
}
