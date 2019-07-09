/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives as lightThemePrimitives} from './light-theme-primitives.js';
import {primitives as darkThemePrimitives} from './dark-theme-primitives.js';
import {LightThemeMove} from './light-theme-with-move.js';
import {DarkThemeMove} from './dark-theme-with-move.js';
import {DarkTheme} from './dark-theme.js';

export const LightTheme = createTheme(lightThemePrimitives, {
  name: 'light-theme',
});

export {
  createTheme,
  LightThemeMove,
  lightThemePrimitives,
  darkThemePrimitives,
  DarkTheme,
  DarkThemeMove,
};

export * from './types';
