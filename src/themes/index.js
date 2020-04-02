/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './create-theme.js';
import {LightTheme, lightThemePrimitives} from './light-theme/light-theme.js';
import {LightThemeMove} from './move-theme/light-theme-with-move.js';
import {DarkTheme, darkThemePrimitives} from './dark-theme/dark-theme.js';
import {DarkThemeMove} from './move-theme/dark-theme-with-move.js';

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

export type * from './types.js';
