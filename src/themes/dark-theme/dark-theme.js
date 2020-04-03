/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {defaultFontTokens} from '../shared/typography.js';
import createTheme from '../create-theme.js';
import darkColorTokens from './color-tokens.js';

import type {ThemeT} from '../../styles/types.js';
import type {PrimitivesT} from '../types.js';

export const darkThemePrimitives: PrimitivesT = {
  ...darkColorTokens,
  ...defaultFontTokens,
};

export const DarkTheme: ThemeT = createTheme(
  darkThemePrimitives,
  {name: 'dark-theme'},
  {isDark: true},
);
