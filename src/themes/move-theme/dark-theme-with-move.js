/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../../styles/types.js';
import deepMerge from '../../utils/deep-merge.js';
import {DarkTheme} from '../dark-theme/dark-theme.js';
import getTypography from '../shared/typography.js';
import {
  fontTokens as moveFontTokens,
  typography as moveTypography,
} from './typography.js';

export const DarkThemeMove: ThemeT = deepMerge({}, DarkTheme, {
  name: 'dark-theme-with-move',
  // For the move theme we need to override typography values
  // in the default darkTheme with a font values that reference
  // our custom font family. In addition to it we want to replace some
  // of the fonts with an additional secondary font that specified
  // in `moveTypography`. For it we'll get the typhography value built
  // with a custom font using `getTypograhy` helper and extend the result
  // value with the customized set of fonts that reference a secondary font
  typography: deepMerge(getTypography(moveFontTokens), moveTypography),
});
