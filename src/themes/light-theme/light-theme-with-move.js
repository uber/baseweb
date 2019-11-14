/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import deepMerge from '../../utils/deep-merge.js';
import {LightTheme} from './light-theme.js';
import {
  typography as moveTypography,
  fontTokens as moveFontTokens,
} from '../move-theme/typography.js';
import getTypography from '../shared/typography.js';

import type {ThemeT} from '../../styles/types.js';

export const LightThemeMove: ThemeT = deepMerge(
  {
    name: 'light-theme-with-move',
    typography: deepMerge(getTypography(moveFontTokens), moveTypography),
  },
  LightTheme,
);
