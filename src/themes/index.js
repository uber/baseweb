/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {LightTheme} from './light-theme/light-theme.js';
import {LightThemeMove} from './move-theme/light-theme-with-move.js';
import lightColorTokens from './light-theme/color-tokens.js';
import {fontTokens} from './shared/typography.js';
import {DarkTheme} from './dark-theme/dark-theme.js';
import {DarkThemeMove} from './move-theme/dark-theme-with-move.js';
import darkColorTokens from './dark-theme/color-tokens.js';

const lightThemePrimitives = {
  ...lightColorTokens,
  ...fontTokens,
};

const darkThemePrimitives = {
  ...darkColorTokens,
  ...fontTokens,
};

export {
  createTheme,
  LightTheme,
  LightThemeMove,
  lightThemePrimitives,
  DarkTheme,
  DarkThemeMove,
  darkThemePrimitives,
  DarkTheme as darkThemeOverrides,
};

export * from './types';
